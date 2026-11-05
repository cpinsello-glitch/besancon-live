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

// 3. Fond de plan épuré et contrasté (sans clé API)
// Ce style atténue le décor et met en avant la trame viaire et les noms d'axes
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
    className: 'map-tiles-muted' // Classe CSS pour désaturer et épurer le fond
}).addTo(map);

// 4. Groupes de calques TC
const tramLayer = L.layerGroup();
const busLianesLayer = L.layerGroup(); // L3 à L6
const busAutresLayer = L.layerGroup();  // Toutes les autres lignes

fetch('data/reseau_tc.geojson')
    .then(res => res.json())
    .then(data => {
        if (!data.features) return;

        // Palette de repérage rapide
        const lianesColors = {
            'L3': '#0080ff',
            'L4': '#ff0055',
            'L5': '#ffaa00',
            'L6': '#00bb77'
        };

        L.geoJSON(data, {
            style: function (feature) {
                const p = feature.properties || {};
                const ref = p.ref || "";
                const isTram = p.route === 'tram';

                // Style Tramway
                if (isTram) {
                    return { color: '#00e5ff', weight: 5, opacity: 0.9 };
                }
                // Style Lianes (Lignes majeures)
                if (lianesColors[ref]) {
                    return { color: lianesColors[ref], weight: 4, opacity: 0.85 };
                }
                // Style Autres lignes de bus
                return { color: '#8e8e93', weight: 2.5, opacity: 0.6, dashArray: '4, 4' };
            },
            onEachFeature: function (feature, layer) {
                const p = feature.properties || {};
                const ref = p.ref ? `[${p.ref}] ` : '';
                const name = p.name || "Ligne";
                layer.bindTooltip(`<b>${ref}${name}</b>`, { sticky: true });

                if (p.route === 'tram') {
                    tramLayer.addLayer(layer);
                } else if (p.ref && ['L3', 'L4', 'L5', 'L6'].includes(p.ref)) {
                    busLianesLayer.addLayer(layer);
                } else {
                    busAutresLayer.addLayer(layer);
                }
            }
        });

        // Par défaut, afficher les trams et les lignes fortes
        tramLayer.addTo(map);
        busLianesLayer.addTo(map);
    })
    .catch(err => console.warn("Erreur GeoJSON:", err));

// Sélecteur de calques affinable pour régulation
const overlays = {
    "Tramways (T1, T2)": tramLayer,
    "Lianes majeures (L3 à L6)": busLianesLayer,
    "Autres lignes de bus": busAutresLayer
};
L.control.layers(null, overlays, { position: 'topleft', collapsed: false }).addTo(map);

// 5. Outils de tracé Leaflet-Geoman
let currentColor = '#ff3b30';
let selectedLayer = null; // Mémorise la forme actuellement sélectionnée

map.pm.addControls({
    position: 'topleft',
    drawMarker: true,
    drawPolyline: true,
    drawPolygon: true,
    drawCircle: false,
    drawRectangle: false,
    editMode: true,
    dragMode: true,
    removalMode: true
});

// Appliquer la couleur aux futurs tracés
function applyDrawStyle() {
    map.pm.setPathOptions({
        color: currentColor,
        fillColor: currentColor,
        fillOpacity: 0.45,
        weight: 8
    });
}
applyDrawStyle();

// Clic sur un bouton de couleur du HUD
function setDrawColor(color, btn) {
    currentColor = color;
    applyDrawStyle();

    // Met en valeur le bouton actif dans le menu
    document.querySelectorAll('.btn-color').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // SI une ligne/zone est déjà sélectionnée sur la carte, on change sa couleur immédiatement !
    if (selectedLayer) {
        selectedLayer.setStyle({
            color: currentColor,
            fillColor: currentColor
        });
    }
}

// Quand une nouvelle forme est créée
map.on('pm:create', function (e) {
    const layer = e.layer;
    layer._manualImpact = true;

    // Appliquer le style au tracé qui vient d'être fait
    layer.setStyle({
        color: currentColor,
        fillColor: currentColor,
        fillOpacity: 0.45,
        weight: 8
    });

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    layer.bindPopup(`<b>Zone impactée</b><br>Signalée à: ${timeString}`);

    // Clic sur le tracé pour le sélectionner et pouvoir changer sa couleur via les boutons
    layer.on('click', function () {
        selectedLayer = layer;
    });
});

// Réinitialiser la sélection si on clique dans le vide sur la carte
map.on('click', function () {
    selectedLayer = null;
});

function clearAllShapes() {
    if (confirm("Supprimer tous les tracés de manifestation en cours ?")) {
        map.eachLayer(layer => {
            if (layer._drawnByGeoman || layer._manualImpact) {
                map.removeLayer(layer);
            }
        });
        selectedLayer = null;
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