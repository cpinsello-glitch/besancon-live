// 1. Définition des bornes géographiques strictes de Besançon
const boundsBesancon = L.latLngBounds(
    [47.190, 5.920], // Sud-Ouest
    [47.300, 6.100]  // Nord-Est
);

// 2. Initialisation de la carte Leaflet
const map = L.map('map', {
    center: [47.243, 6.024], // Centre-ville (Boucle)
    zoom: 14,
    minZoom: 13,
    maxZoom: 19,
    maxBounds: boundsBesancon,
    maxBoundsViscosity: 1.0 // Verrouillage strict du défilement
});

// 3. Fond de plan OpenStreetMap France (gratuit, sans clé API, rues très détaillées)
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 20
}).addTo(map);

// 4. Groupes de calques TC
const tramLayer = L.layerGroup();
const busLayer = L.layerGroup();

// Chargement du fichier GeoJSON local
fetch('data/reseau_tc.geojson')
    .then(res => {
        if (!res.ok) throw new Error("Fichier GeoJSON introuvable ou vide");
        return res.json();
    })
    .then(data => {
        if (!data.features || data.features.length === 0) return;

        L.geoJSON(data, {
            style: function (feature) {
                const isTram = feature.properties && feature.properties.route === 'tram';
                return {
                    color: isTram ? '#007aff' : '#5856d6',
                    weight: isTram ? 5 : 3,
                    opacity: 0.8,
                    dashArray: isTram ? null : '6, 6'
                };
            },
            onEachFeature: function (feature, layer) {
                const p = feature.properties || {};
                const lineName = p.name || p.ref || "Ligne TC";
                layer.bindTooltip(`<b>${lineName}</b>`, { sticky: true });

                if (p.route === 'tram') {
                    tramLayer.addLayer(layer);
                } else {
                    busLayer.addLayer(layer);
                }
            }
        });

        tramLayer.addTo(map);
        busLayer.addTo(map);
    })
    .catch(err => {
        console.warn("Notice TC:", err.message);
    });

// Menu de contrôle des couches
const overlays = {
    "Lignes Tramway": tramLayer,
    "Lignes Principales Bus": busLayer
};
L.control.layers(null, overlays, { position: 'topleft', collapsed: false }).addTo(map);

// 5. Outils de tracé Leaflet-Geoman
let currentColor = '#ff3b30';

map.pm.addControls({
    position: 'topleft',
    drawMarker: true,
    drawPolyline: true, // Tracé de rue
    drawPolygon: true,  // Blocage de carrefour ou place
    drawCircle: false,
    drawRectangle: false,
    editMode: true,
    dragMode: true,
    removalMode: true
});

function applyDrawStyle() {
    map.pm.setPathOptions({
        color: currentColor,
        fillColor: currentColor,
        fillOpacity: 0.45,
        weight: 9
    });
}
applyDrawStyle();

function setDrawColor(color, btn) {
    currentColor = color;
    applyDrawStyle();
    document.querySelectorAll('.btn-color').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

map.on('pm:create', function (e) {
    const layer = e.layer;
    layer._manualImpact = true;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    layer.bindPopup(`<b>Zone impactée</b><br>Signalée à: ${timeString}`);
});

function clearAllShapes() {
    if (confirm("Supprimer tous les tracés de manifestation en cours ?")) {
        map.eachLayer(layer => {
            if (layer._drawnByGeoman || layer._manualImpact) {
                map.removeLayer(layer);
            }
        });
    }
}

function exportSituation() {
    const drawnData = [];
    map.eachLayer(layer => {
        if ((layer._drawnByGeoman || layer._manualImpact) && layer.toGeoJSON) {
            drawnData.push(layer.toGeoJSON());
        }
    });
    const blob = new Blob([JSON.stringify(drawnData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `situation_besancon_${Date.now()}.json`;
    a.click();
}