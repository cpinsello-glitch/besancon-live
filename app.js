// 1. Définition des bornes géographiques de la métropole de Besançon
const boundsBesancon = L.latLngBounds(
    [47.120, 5.750], // Sud-Ouest (Grand Besançon)
    [47.380, 6.250]  // Nord-Est (Grand Besançon)
);

// 2. Initialisation de la carte Leaflet
const map = L.map('map', {
    center: [47.243, 6.024], // Centre-ville (Boucle de Besançon)
    zoom: 14,
    minZoom: 11,
    maxZoom: 19,
    maxBounds: boundsBesancon,
    maxBoundsViscosity: 0.8
});

// 3. Fond de plan OpenStreetMap direct (sans CARTO, sans clé API)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    maxZoom: 19,
    className: 'map-tiles-muted'
}).addTo(map);

// 4. Groupes de calques Leaflet
const tramLayer = L.layerGroup();
const busLianesLayer = L.layerGroup();      // L3 à L6
const busAutresLayer = L.layerGroup();       // Lignes complémentaires
const manifestationLayer = L.layerGroup();   // Tracés en direct (Geoman)

// Calques affichés par défaut sur la carte
tramLayer.addTo(map);
busLianesLayer.addTo(map);
manifestationLayer.addTo(map);

// Sélecteur de calques (cocher/décocher)
const overlays = {
    "Tramways (T1, T2)": tramLayer,
    "Lianes majeures (L3 à L6)": busLianesLayer,
    "Autres lignes de bus": busAutresLayer,
    "Tracés Manifestation (En direct)": manifestationLayer
};
L.control.layers(null, overlays, { position: 'topleft', collapsed: false }).addTo(map);

// 5. Chargement résilient des données TC (GeoJSON)
fetch('data/reseau_tc.geojson')
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
    })
    .then(data => {
        if (!data || !Array.isArray(data.features)) {
            console.warn("Données TC : aucun objet 'features' valide trouvé.");
            return;
        }

        // Palette des Lianes majeures
        const lianesColors = {
            'L3': '#0077b6', // Bleu
            'L4': '#d90429', // Rouge
            'L5': '#f77f00', // Orange
            'L6': '#2a9d8f'  // Vert
        };

        L.geoJSON(data, {
            style: function (feature) {
                const p = feature.properties || {};
                const ref = p.ref || "";
                const isTram = p.route === 'tram' || ['T1', 'T2'].includes(ref);
                const isLiane = ['L3', 'L4', 'L5', 'L6'].includes(ref) || p.category === 'liane';

                // Style Tramway
                if (isTram) {
                    return { color: '#00b4d8', weight: 5, opacity: 0.95 };
                }
                // Style Lianes majeures
                if (isLiane) {
                    const color = lianesColors[ref] || '#0077b6';
                    return { color: color, weight: 4, opacity: 0.9 };
                }
                // Style Autres lignes de bus
                return { color: '#6c757d', weight: 2.5, opacity: 0.65, dashArray: '4, 4' };
            },
            onEachFeature: function (feature, layer) {
                const p = feature.properties || {};
                const ref = p.ref ? `[${p.ref}] ` : '';
                const name = p.name || "Ligne TC";
                layer.bindTooltip(`<b>${ref}${name}</b>`, { sticky: true });

                const isTram = p.route === 'tram' || ['T1', 'T2'].includes(p.ref);
                const isLiane = ['L3', 'L4', 'L5', 'L6'].includes(p.ref) || p.category === 'liane';

                if (isTram) {
                    tramLayer.addLayer(layer);
                } else if (isLiane) {
                    busLianesLayer.addLayer(layer);
                } else {
                    busAutresLayer.addLayer(layer);
                }
            }
        });
    })
    .catch(err => {
        // En cas d'erreur ou d'absence de données, le fond OpenStreetMap et les outils restent 100% actifs
        console.warn("Notice TC : données non disponibles, carte OSM active.", err);
    });

// 6. Outils de tracé Leaflet-Geoman pour marquer les manifestations en direct
let currentColor = '#ff3b30'; // Par défaut : rouge (bloqué)
let selectedLayer = null;      // Forme sélectionnée

// Initialisation des outils de dessin Geoman
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

// Appliquer la couleur et le style aux tracés
function applyDrawStyle() {
    map.pm.setPathOptions({
        color: currentColor,
        fillColor: currentColor,
        fillOpacity: 0.45,
        weight: 6
    });
}
applyDrawStyle();

// Clic sur un bouton de couleur du HUD (Rouge / Orange / Vert)
function setDrawColor(color, btn) {
    currentColor = color;
    applyDrawStyle();

    document.querySelectorAll('.btn-color').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Si une forme est actuellement sélectionnée, mise à jour immédiate de sa couleur
    if (selectedLayer) {
        if (selectedLayer.setStyle) {
            selectedLayer.setStyle({
                color: currentColor,
                fillColor: currentColor
            });
        }
        selectedLayer._drawColor = currentColor;
    }
}

// Gestion de la création d'une forme Geoman
map.on('pm:create', function (e) {
    const layer = e.layer;
    layer._manualImpact = true;
    layer._drawColor = currentColor;
    layer._createdAt = new Date().toISOString();

    if (layer.setStyle) {
        layer.setStyle({
            color: currentColor,
            fillColor: currentColor,
            fillOpacity: 0.45,
            weight: 6
        });
    }

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let label = "Axe impacté";
    if (currentColor === '#ff3b30') label = "🔴 Axe bloqué / Tête de cortège";
    else if (currentColor === '#ff9500') label = "🟠 Ralentissement / Risque fort";
    else if (currentColor === '#34c759') label = "🟢 Axe libéré / Voie fluide";

    layer.bindPopup(`<b>${label}</b><br><small>Signalé à: ${timeString}</small>`);

    // Ajout systématique au calque de manifestation (pour pouvoir le cocher/décocher)
    manifestationLayer.addLayer(layer);

    // Clic pour sélectionner la forme
    layer.on('click', function (ev) {
        L.DomEvent.stopPropagation(ev);
        selectedLayer = layer;
    });
});

// Réinitialiser la sélection si on clique sur la carte
map.on('click', function () {
    selectedLayer = null;
});

// Effacer tous les tracés
function clearAllShapes() {
    if (confirm("Supprimer tous les tracés de manifestation en cours ?")) {
        manifestationLayer.clearLayers();
        selectedLayer = null;
    }
}

// Exporter les données de la manifestation
function exportSituation() {
    const features = [];
    manifestationLayer.eachLayer(layer => {
        if (layer.toGeoJSON) {
            const geojson = layer.toGeoJSON();
            geojson.properties = geojson.properties || {};
            geojson.properties.color = layer._drawColor || currentColor;
            geojson.properties.timestamp = layer._createdAt || new Date().toISOString();
            features.push(geojson);
        }
    });

    const exportData = {
        type: "FeatureCollection",
        timestamp: new Date().toISOString(),
        features: features
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `situation_besancon_${Date.now()}.json`;
    a.click();
}

// Ajustement réactif de la carte Leaflet
window.addEventListener('resize', () => {
    map.invalidateSize();
});
setTimeout(() => {
    map.invalidateSize();
}, 250);
