// =========================================================================
// 🎨 1. CONFIGURATION DES COULEURS PAR LIGNE
// Modifiez ici directement le code hexadécimal (#RRGGBB) pour chaque ligne :
// =========================================================================
const COULEURS_LIGNES = {
    // --- TRAMWAYS ---
    'T1': '#00b4d8',       // Turquoise vif
    'T2': '#0077b6',       // Bleu océan

    // --- LIANES MAJEURES (Bus à haute fréquence) ---
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
    'Plan B Tram': '#fb8500'  // Orange tramway de substitution
};

// =========================================================================
// 🗺️ 2. BORNES STRICTES AU RÉSEAU URBAIN DE BESANÇON
// Dézoomage limité strictement au bassin urbain (pas d'alentours)
// =========================================================================
const boundsBesanconUrbain = L.latLngBounds(
    [47.200, 5.940], // Sud-Ouest (Châteaufarine / Velotte)
    [47.295, 6.075]  // Nord-Est (Chalezeule / Orchamps / Valentin)
);

const map = L.map('map', {
    center: [47.243, 6.024], // Centre-ville (Boucle)
    zoom: 14,
    minZoom: 13,             // Limite maxi en dézoomant : uniquement l'urbain
    maxZoom: 19,
    maxBounds: boundsBesanconUrbain,
    maxBoundsViscosity: 1.0  // Verrouille strictement le défilement dans Besançon
});

// =========================================================================
// 🌍 3. CHOIX DE FONDS DE PLAN (Visibilité & Contrastes)
// =========================================================================
const fondOSMStandard = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    maxZoom: 19
});

const fondSombre = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
});

const fondClair = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
});

const fondOSMFrance = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap France',
    maxZoom: 19
});

// Fond par défaut : Sombre (met en valeur maximale le tracé rouge et les lignes TC)
fondSombre.addTo(map);

const baseMaps = {
    "Sombre (Contraste élevé)": fondSombre,
    "OpenStreetMap Standard": fondOSMStandard,
    "Clair Épuré": fondClair,
    "OpenStreetMap France": fondOSMFrance
};

// =========================================================================
// 🚌 4. GROUPES DE CALQUES DU RÉSEAU TC
// =========================================================================
const tramLayer = L.layerGroup();
const busLianesLayer = L.layerGroup();
const busLignesLayer = L.layerGroup();
const navettesLayer = L.layerGroup();
const manifestationLayer = L.layerGroup();

// Calques affichés par défaut
tramLayer.addTo(map);
busLianesLayer.addTo(map);
busLignesLayer.addTo(map);
navettesLayer.addTo(map);
manifestationLayer.addTo(map);

const overlays = {
    "🔴 Cortège Manifestation": manifestationLayer,
    "Tramways (T1, T2)": tramLayer,
    "Lianes majeures (L3 à L6)": busLianesLayer,
    "Lignes de bus (7 à 12)": busLignesLayer,
    "Navette Citadelle & Plan B": navettesLayer
};

L.control.layers(baseMaps, overlays, { position: 'topleft', collapsed: false }).addTo(map);

// =========================================================================
// 📥 5. CHARGEMENT ET FILTRAGE STRICT DES LIGNES DEMANDÉES
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
                const ref = p.ref || "";
                const isTram = ['T1', 'T2'].includes(ref) || p.route === 'tram';
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
                const ref = p.ref ? `[${p.ref}] ` : '';
                const name = p.name || "Ligne TC";
                layer.bindTooltip(`<b>${ref}${name}</b>`, { sticky: true });

                const refKey = p.ref || "";
                if (['T1', 'T2'].includes(refKey) || p.route === 'tram') {
                    tramLayer.addLayer(layer);
                } else if (['L3', 'L4', 'L5', 'L6'].includes(refKey)) {
                    busLianesLayer.addLayer(layer);
                } else if (['7', '8', '9', '10', '11', '12'].includes(refKey)) {
                    busLignesLayer.addLayer(layer);
                } else if (['Citadelle', 'Plan B Tram', 'Plan B'].includes(refKey)) {
                    navettesLayer.addLayer(layer);
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

// Forcer le tracé rouge
map.pm.setPathOptions({
    color: ROUGE_MANIF,
    fillColor: ROUGE_MANIF,
    fillOpacity: 0.40,
    weight: 7
});

// Événement à la création d'un tracé de cortège
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
