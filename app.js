// =========================================================================
// 🎨 1. CONFIGURATION DES COULEURS PAR LIGNE
// Modifiez ici directement le code hexadécimal (#RRGGBB) de chaque ligne :
// =========================================================================
const COULEURS_LIGNES = {
    // --- TRAMWAYS ---
    'T1': '#00b4d8',       // Turquoise vif
    'T2': '#0077b6',       // Bleu océan

    // --- LIANES MAJEURES (Bus fréquents) ---
    'L3': '#03045e',       // Bleu nuit
    'L4': '#d90429',       // Rouge magenta Ginko
    'L5': '#f77f00',       // Orange vif
    'L6': '#2a9d8f',       // Vert émeraude

    // --- LIGNES DE BUS URBAINES (7 à 12) ---
    '7':  '#7209b7',       // Violet
    '8':  '#f72585',       // Rose vif
    '9':  '#ffb703',       // Jaune d'or
    '10': '#4cc9f0',       // Bleu azur
    '11': '#b5179e',       // Pourpre
    '12': '#588157',       // Vert sauge

    // --- NAVETTES & SPÉCIAL ---
    'Citadelle':   '#e76f51', // Terre de Sienne / Ocre
    'Plan B Tram': '#fb8500'  // Orange substitution tramway
};

// =========================================================================
// 🗺️ 2. BORNES STRICTES AU RÉSEAU URBAIN DE BESANÇON
// Dézoomage limité strictement au bassin urbain (sans les alentours)
// =========================================================================
const boundsBesanconUrbain = L.latLngBounds(
    [47.200, 5.940], // Sud-Ouest (Châteaufarine / Velotte)
    [47.295, 6.075]  // Nord-Est (Chalezeule / Orchamps / Valentin)
);

const map = L.map('map', {
    center: [47.243, 6.024], // Centre-ville (Boucle)
    zoom: 14,
    minZoom: 13,             // Limite stricte en dézoomant : uniquement l'urbain
    maxZoom: 19,
    maxBounds: boundsBesanconUrbain,
    maxBoundsViscosity: 1.0  // Verrouille strictement le défilement dans Besançon
});

// =========================================================================
// 🌍 3. CHOIX DE FONDS DE PLAN SANS CLÉ API (Visibilité & Contrastes)
// =========================================================================
// 1) OSM Sombre : Inversion CSS directe des tuiles OSM (aucun filigrane, 0 clé, zoom 19)
const fondOSMSombre = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    maxZoom: 19,
    className: 'tiles-dark'
});

// 2) OSM Standard : Tuiles OpenStreetMap officielles directes
const fondOSMStandard = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    maxZoom: 19
});

// 3) OSM Gris Épuré : Niveaux de gris reposants sans saturation
const fondOSMGris = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    maxZoom: 19,
    className: 'tiles-grayscale'
});

// 4) Esri Canvas Sombre : Carte rasterisée sombre officielle Esri (sans clé)
const fondEsriDark = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 16
});

// 5) Esri Canvas Clair : Carte rasterisée grise claire officielle Esri (sans clé)
const fondEsriLight = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 16
});

// Fond par défaut : OSM Sombre (contraste optimal pour le tracé rouge)
fondOSMSombre.addTo(map);

const baseMaps = {
    "OSM Sombre (Contraste élevé)": fondOSMSombre,
    "OSM Standard (Clair officiel)": fondOSMStandard,
    "OSM Gris Épuré (Minimaliste)": fondOSMGris,
    "Esri Canvas Sombre": fondEsriDark,
    "Esri Canvas Clair": fondEsriLight
};

// =========================================================================
// 🚌 4. CALQUES INDIVIDUELS : UNE COCHE PAR LIGNE SANS FUSION
// =========================================================================
const manifestationLayer = L.layerGroup().addTo(map);

// Calques individuels par ligne
const lineLayers = {
    'T1': L.layerGroup().addTo(map),
    'T2': L.layerGroup().addTo(map),
    'L3': L.layerGroup().addTo(map),
    'L4': L.layerGroup().addTo(map),
    'L5': L.layerGroup().addTo(map),
    'L6': L.layerGroup().addTo(map),
    '7':  L.layerGroup().addTo(map),
    '8':  L.layerGroup().addTo(map),
    '9':  L.layerGroup().addTo(map),
    '10': L.layerGroup().addTo(map),
    '11': L.layerGroup().addTo(map),
    '12': L.layerGroup().addTo(map),
    'Citadelle': L.layerGroup().addTo(map),
    'Plan B Tram': L.layerGroup().addTo(map)
};

// Générateur de puce de couleur pour le menu
function badge(color) {
    return `<span class="legend-dot" style="background:${color}"></span>`;
}

// Menu des calques avec coche individuelle par ligne et pastille de couleur
const overlays = {
    "🔴 Cortège Manifestation": manifestationLayer,
    [`${badge(COULEURS_LIGNES['T1'])} Tram T1`]: lineLayers['T1'],
    [`${badge(COULEURS_LIGNES['T2'])} Tram T2`]: lineLayers['T2'],
    [`${badge(COULEURS_LIGNES['L3'])} Liane L3`]: lineLayers['L3'],
    [`${badge(COULEURS_LIGNES['L4'])} Liane L4`]: lineLayers['L4'],
    [`${badge(COULEURS_LIGNES['L5'])} Liane L5`]: lineLayers['L5'],
    [`${badge(COULEURS_LIGNES['L6'])} Liane L6`]: lineLayers['L6'],
    [`${badge(COULEURS_LIGNES['7'])} Ligne 7`]: lineLayers['7'],
    [`${badge(COULEURS_LIGNES['8'])} Ligne 8`]: lineLayers['8'],
    [`${badge(COULEURS_LIGNES['9'])} Ligne 9`]: lineLayers['9'],
    [`${badge(COULEURS_LIGNES['10'])} Ligne 10`]: lineLayers['10'],
    [`${badge(COULEURS_LIGNES['11'])} Ligne 11`]: lineLayers['11'],
    [`${badge(COULEURS_LIGNES['12'])} Ligne 12`]: lineLayers['12'],
    [`${badge(COULEURS_LIGNES['Citadelle'])} Citadelle`]: lineLayers['Citadelle'],
    [`${badge(COULEURS_LIGNES['Plan B Tram'])} Plan B Tram`]: lineLayers['Plan B Tram']
};

L.control.layers(baseMaps, overlays, { position: 'topleft', collapsed: false }).addTo(map);

// =========================================================================
// 📥 5. CHARGEMENT ET DISTRIBUTION DANS LES CALQUES INDIVIDUELS
// =========================================================================
fetch('data/reseau_tc.geojson')
    .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
    })
    .then(data => {
        if (!data || !Array.isArray(data.features)) return;

        L.geoJSON(data, {
            style: function (feature) {
                const p = feature.properties || {};
                let ref = p.ref || "";
                if (ref === '6') ref = 'L6';
                if (ref === 'Plan B') ref = 'Plan B Tram';

                const isTram = ['T1', 'T2'].includes(ref);
                const isLiane = ['L3', 'L4', 'L5', 'L6'].includes(ref);
                const isNavette = ['Citadelle', 'Plan B Tram'].includes(ref);

                const color = COULEURS_LIGNES[ref] || '#8e8e93';
                const weight = isTram ? 5 : (isLiane ? 4 : (isNavette ? 3.5 : 3));
                const opacity = isTram ? 0.95 : 0.88;

                return {
                    color: color,
                    weight: weight,
                    opacity: opacity,
                    dashArray: isNavette ? '6, 6' : null
                };
            },
            onEachFeature: function (feature, layer) {
                const p = feature.properties || {};
                let ref = p.ref || "";
                if (ref === '6') ref = 'L6';
                if (ref === 'Plan B') ref = 'Plan B Tram';

                const name = p.name || `Ligne ${ref}`;
                layer.bindTooltip(`<b>[${ref}] ${name}</b>`, { sticky: true });

                // Ajout au calque spécifique de la ligne
                if (lineLayers[ref]) {
                    lineLayers[ref].addLayer(layer);
                }
            }
        });
    })
    .catch(err => {
        console.warn("Information : Chargement TC non disponible, carte OSM active :", err);
    });

// =========================================================================
// 🚨 6. OUTILS DE TRACÉ ROUGE POUR LE CORTÈGE DE MANIFESTATION
// =========================================================================
const ROUGE_MANIF = '#ff3b30';

// Configuration de Leaflet-Geoman
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

// Style de tracé rouge
map.pm.setPathOptions({
    color: ROUGE_MANIF,
    fillColor: ROUGE_MANIF,
    fillOpacity: 0.40,
    weight: 7
});

// Événement lors de la création d'un tracé Geoman
map.on('pm:create', function (e) {
    const layer = e.layer;
    layer._manualImpact = true;
    layer._createdAt = new Date().toISOString();

    if (layer.setStyle) {
        layer.setStyle({
            color: ROUGE_MANIF,
            fillColor: ROUGE_MANIF,
            fillOpacity: 0.40,
            weight: 7
        });
    }

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    layer.bindPopup(`<b>🔴 Cortège / Axe bloqué</b><br><small>Signalé à: ${timeString}</small>`);

    // Ajout direct au calque de manifestation
    manifestationLayer.addLayer(layer);
});

// Effacer tous les tracés de manifestation
function clearAllShapes() {
    if (confirm("Supprimer tous les tracés du cortège en cours ?")) {
        manifestationLayer.clearLayers();
    }
}

// Exporter les tracés au format GeoJSON
function exportSituation() {
    const features = [];
    manifestationLayer.eachLayer(layer => {
        if (layer.toGeoJSON) {
            const geojson = layer.toGeoJSON();
            geojson.properties = geojson.properties || {};
            geojson.properties.color = ROUGE_MANIF;
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
    a.download = `cortege_besancon_${Date.now()}.json`;
    a.click();
}

// Redimensionnement automatique de la carte
window.addEventListener('resize', () => {
    map.invalidateSize();
});
setTimeout(() => {
    map.invalidateSize();
}, 250);
