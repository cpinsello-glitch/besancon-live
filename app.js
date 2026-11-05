// =========================================================================
// 🎨 1. CONFIGURATION DES COULEURS PAR LIGNE
// Modifiez ici directement le code hexadécimal (#RRGGBB) de chaque ligne :
// =========================================================================
const COULEURS_LIGNES = {
    // --- TRAMWAYS ---
    'T1': '#00b4d8',       // T1 (Turquoise)
    'T2': '#0077b6',       // T2 (Bleu)

    // --- LIANES MAJEURES ---
    'L3': '#03045e',       // L3 (Bleu nuit)
    'L4': '#d90429',       // L4 (Rouge magenta)
    'L5': '#28a745',       // L5 (Verte)
    'L6': '#ffd000',       // L6 (Jaune)

    // --- LIGNES DE BUS URBAINES (7 à 12) ---
    '7':  '#ff7900',       // 7 (Orange)
    '8':  '#0066cc',       // 8 (Bleu)
    '9':  '#ff9900',       // 9 (Orange)
    '10': '#70e000',       // 10 (Vert pomme)
    '11': '#9d4edd',       // 11 (Pourpre)
    '12': '#48cae4',       // 12 (Bleu clair)

    // --- NAVETTES ---
    'Citadelle': '#ff6200', // Citadelle (Orange)
    'Plan B':    '#e63946'  // Plan B (Rouge orangé)
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
// 🌍 3. FONDS DE PLAN : UNIQUEMENT STANDARD & ÉPURÉ (100% sans clé API)
// =========================================================================
// 1) Standard : Tuiles OpenStreetMap officielles directes
const fondStandard = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    maxZoom: 19
});

// 2) Épuré : OpenStreetMap en niveaux de gris neutres (sans clé, sans filigrane)
const fondEpure = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    maxZoom: 19,
    className: 'tiles-grayscale'
});

// Fond par défaut : Standard
fondStandard.addTo(map);

const baseMaps = {
    "Standard": fondStandard,
    "Épuré": fondEpure
};

// =========================================================================
// 🚌 4. CALQUES INDIVIDUELS LIGNE PAR LIGNE SANS FUSION
// =========================================================================
const manifestationLayer = L.layerGroup().addTo(map);

// Calques distincts pour chaque ligne
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
    'Plan B':    L.layerGroup().addTo(map)
};

// Pastille colorée pour chaque ligne
function badge(color) {
    return `<span class="legend-dot" style="background:${color}"></span>`;
}

// Libellés simplifiés (juste le nom court : T1, L4, 7, 10, Plan B, etc.)
const overlays = {
    "🔴 Cortège": manifestationLayer,
    [`${badge(COULEURS_LIGNES['T1'])} T1`]: lineLayers['T1'],
    [`${badge(COULEURS_LIGNES['T2'])} T2`]: lineLayers['T2'],
    [`${badge(COULEURS_LIGNES['L3'])} L3`]: lineLayers['L3'],
    [`${badge(COULEURS_LIGNES['L4'])} L4`]: lineLayers['L4'],
    [`${badge(COULEURS_LIGNES['L5'])} L5`]: lineLayers['L5'],
    [`${badge(COULEURS_LIGNES['L6'])} L6`]: lineLayers['L6'],
    [`${badge(COULEURS_LIGNES['7'])} 7`]: lineLayers['7'],
    [`${badge(COULEURS_LIGNES['8'])} 8`]: lineLayers['8'],
    [`${badge(COULEURS_LIGNES['9'])} 9`]: lineLayers['9'],
    [`${badge(COULEURS_LIGNES['10'])} 10`]: lineLayers['10'],
    [`${badge(COULEURS_LIGNES['11'])} 11`]: lineLayers['11'],
    [`${badge(COULEURS_LIGNES['12'])} 12`]: lineLayers['12'],
    [`${badge(COULEURS_LIGNES['Citadelle'])} Citadelle`]: lineLayers['Citadelle'],
    [`${badge(COULEURS_LIGNES['Plan B'])} Plan B`]: lineLayers['Plan B']
};

// 📍 EMPLACEMENT DU TABLEAU DES LIGNES :
// Modifiez 'topleft' par 'bottomleft', 'topright' ou 'bottomright' si vous souhaitez le déplacer
const layerControl = L.control.layers(baseMaps, overlays, {
    position: 'topleft',
    collapsed: false
}).addTo(map);

// Injection de boutons "Tout cocher" / "Tout décocher" directement dans le panneau de calques
const controlContainer = layerControl.getContainer();
const overlaysContainer = controlContainer.querySelector('.leaflet-control-layers-overlays');
if (overlaysContainer) {
    const quickBar = document.createElement('div');
    quickBar.className = 'layers-quick-actions';
    quickBar.innerHTML = `
        <button type="button" class="btn-toggle-all" onclick="toggleAllLines(true)">Tout cocher</button>
        <button type="button" class="btn-toggle-all" onclick="toggleAllLines(false)">Tout décocher</button>
    `;
    overlaysContainer.parentNode.insertBefore(quickBar, overlaysContainer);
}

// Fonction globale pour tout cocher / tout décocher d'un coup
function toggleAllLines(enable) {
    Object.keys(lineLayers).forEach(ref => {
        const layer = lineLayers[ref];
        if (enable) {
            if (!map.hasLayer(layer)) map.addLayer(layer);
        } else {
            if (map.hasLayer(layer)) map.removeLayer(layer);
        }
    });

    // Synchronisation visuelle des cases à cocher du menu Leaflet
    document.querySelectorAll('.leaflet-control-layers-overlays input[type="checkbox"]').forEach(input => {
        const span = input.nextElementSibling;
        const text = span ? span.textContent : '';
        // Conserve le calque du cortège intact lors du masquage des bus/trams
        if (!text.includes('Cortège')) {
            input.checked = enable;
        }
    });
}

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
                if (ref === 'Plan B Tram') ref = 'Plan B';

                const isTram = ['T1', 'T2'].includes(ref);
                const isLiane = ['L3', 'L4', 'L5', 'L6'].includes(ref);
                const isNavette = ['Citadelle', 'Plan B'].includes(ref);

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
                if (ref === 'Plan B Tram') ref = 'Plan B';

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
// 🚨 6. OUTILS DE TRACÉ ÉPURÉS POUR LE CORTÈGE DE MANIFESTATION
// =========================================================================
const ROUGE_MANIF = '#ff3b30';

// Configuration ciblée de Leaflet-Geoman (outils inutiles désactivés pour épurer)
map.pm.addControls({
    position: 'topleft',
    drawPolyline: true,    // 📏 Tracé du cortège / axes de rues
    drawMarker: true,      // 📍 Marqueur ponctuel (blocage / tête de cortège)
    drawPolygon: false,    // ❌ Polygone désactivé pour simplifier
    drawCircle: false,     // ❌ Cercle désactivé
    drawRectangle: false,  // ❌ Rectangle désactivé
    editMode: true,        // ✏️ Mode édition (modifier les sommets)
    dragMode: false,       // ❌ Déplacement désactivé pour éviter les fausses manipulations
    cutPolygon: false,     // ❌ Découpe désactivée
    removalMode: true      // 🗑️ Poubelle pour supprimer un tracé au clic
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
