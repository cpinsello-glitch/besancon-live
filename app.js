// =========================================================================
// 🎨 1. CONFIGURATION DES COULEURS OFFICIELLES PAR LIGNE
// Modifiez ici directement le code hexadécimal (#RRGGBB) de chaque ligne :
// =========================================================================
const COULEURS_LIGNES = {
    'T1':    '#00A5C2',
    'T2':    '#006D78',
    'L3':    '#006AB3',
    'L4':    '#E2001A',
    'L5':    '#1FA22E',
    'L6':    '#FFE500',
    '7':     '#A74C21',
    '8':     '#00396B',
    '9':     '#F29400',
    '10':    '#CECB00',
    '11':    '#C592BE',
    '12':    '#7BC6BC',
    'CITA':  '#EA5B0C',
    'PlanB': '#1E191A'
};

// =========================================================================
// 🗺️ 2. BORNES STRICTES AU RÉSEAU URBAIN DE BESANÇON
// Dézoomage limité strictement au bassin urbain (rapproché d'un cran : minZoom 14)
// =========================================================================
const boundsBesanconUrbain = L.latLngBounds(
    [47.205, 5.950], // Sud-Ouest (Châteaufarine / Velotte)
    [47.285, 6.070]  // Nord-Est (Chalezeule / Orchamps / Valentin)
);

const map = L.map('map', {
    center: [47.243, 6.024], // Centre-ville (Boucle)
    zoom: 14,
    minZoom: 14,             // Rapproché d'un cran (stoppe au niveau quartier/urbain)
    maxZoom: 19,
    zoomControl: false,      // Boutons + et - supprimés (souris utilisée)
    maxBounds: boundsBesanconUrbain,
    maxBoundsViscosity: 1.0  // Verrouille strictement le défilement dans Besançon
});

// =========================================================================
// 🌍 3. FONDS DE PLAN : STANDARD & ÉPURÉ (100% sans clé API)
// =========================================================================
const fondStandard = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    maxZoom: 19
});

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
// 🚌 4. CALQUES DISTINCTS PAR DIRECTION (ALLER & RETOUR)
// =========================================================================
const impactLayer = L.layerGroup().addTo(map);

// Définition ordonnée des 2 directions par ligne
const directionsConfig = [
    // T1
    { ref: 'T1', to: 'Chalezeule', label: 'T1 ➔ Chalezeule' },
    { ref: 'T1', to: 'Hauts du Chazal', label: 'T1 ➔ Hauts du Chazal' },
    // T2
    { ref: 'T2', to: 'Gare Viotte', label: 'T2 ➔ Gare Viotte' },
    { ref: 'T2', to: 'Hauts du Chazal', label: 'T2 ➔ Hauts du Chazal' },
    // L3
    { ref: 'L3', to: '8 Septembre', label: 'L3 ➔ 8 Septembre' },
    { ref: 'L3', to: 'Temis', label: 'L3 ➔ Temis' },
    // L4
    { ref: 'L4', to: 'Châteaufarine', label: 'L4 ➔ Châteaufarine' },
    { ref: 'L4', to: 'Pôle Orchamps', label: 'L4 ➔ Pôle Orchamps' },
    // L5
    { ref: 'L5', to: 'Bregille', label: 'L5 ➔ Bregille' },
    { ref: 'L5', to: 'Saint-Claude', label: 'L5 ➔ Saint-Claude' },
    // L6
    { ref: 'L6', to: 'Orchamps', label: 'L6 ➔ Orchamps' },
    { ref: 'L6', to: 'Founottes', label: 'L6 ➔ Founottes' },
    // 7
    { ref: '7', to: 'Palente Espace Ind.', label: '7 ➔ Palente Espace Ind.' },
    { ref: '7', to: 'Hauts du Chazal', label: '7 ➔ Hauts du Chazal' },
    // 8
    { ref: '8', to: 'Espace Valentin', label: '8 ➔ Espace Valentin' },
    { ref: '8', to: 'Battant', label: '8 ➔ Battant' },
    // 9
    { ref: '9', to: 'Tilleroyes', label: '9 ➔ Tilleroyes' },
    { ref: '9', to: 'Velotte', label: '9 ➔ Velotte' },
    // 10
    { ref: '10', to: 'Chaffanjon', label: '10 ➔ Chaffanjon' },
    { ref: '10', to: 'CHU Minjoz', label: '10 ➔ CHU Minjoz' },
    // 11
    { ref: '11', to: 'Combe Saragosse', label: '11 ➔ Combe Saragosse' },
    { ref: '11', to: 'Rivotte', label: '11 ➔ Rivotte' },
    // 12
    { ref: '12', to: 'Prés de Vaux', label: '12 ➔ Prés de Vaux' },
    { ref: '12', to: 'Temis', label: '12 ➔ Temis' },
    // CITA
    { ref: 'CITA', to: 'Citadelle', label: 'CITA ➔ Citadelle' },
    { ref: 'CITA', to: 'Chamars', label: 'CITA ➔ Chamars' },
    // PlanB
    { ref: 'PlanB', to: 'Chalezeule', label: 'PlanB ➔ Chalezeule' },
    { ref: 'PlanB', to: 'Hauts du Chazal', label: 'PlanB ➔ Hauts du Chazal' }
];

// Création des groupes de calques
const dirLayers = {};
const overlays = {
    "🔴 Cortège / 🚧 Travaux": impactLayer
};

function badge(color) {
    return `<span class="legend-dot" style="background:${color}"></span>`;
}

directionsConfig.forEach(item => {
    const key = `${item.ref}_${item.to}`;
    const layer = L.layerGroup().addTo(map);
    dirLayers[key] = layer;

    const color = COULEURS_LIGNES[item.ref] || '#888';
    const overlayLabel = `${badge(color)} <b>${item.ref}</b> <span class="dest-arrow">➔</span> ${item.to}`;
    overlays[overlayLabel] = layer;
});

// 📍 EMPLACEMENT DU TABLEAU DES LIGNES :
// Modifiez 'topleft' par 'bottomleft', 'topright' ou 'bottomright' si vous souhaitez le déplacer
L.control.layers(baseMaps, overlays, {
    position: 'topleft',
    collapsed: false
}).addTo(map);

// =========================================================================
// 📥 5. CHARGEMENT ET DISTRIBUTION PRÉCISE ALLER / RETOUR
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
                if (ref === 'Citadelle') ref = 'CITA';
                if (ref === 'Plan B' || ref === 'Plan B Tram') ref = 'PlanB';

                const isTram = ['T1', 'T2'].includes(ref);
                const isNavette = ['CITA', 'PlanB'].includes(ref);

                const color = COULEURS_LIGNES[ref] || '#8e8e93';
                const weight = isTram ? 5 : 4;
                const opacity = 0.92;

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
                if (ref === 'Citadelle') ref = 'CITA';
                if (ref === 'Plan B' || ref === 'Plan B Tram') ref = 'PlanB';

                const to = p.to || "";
                layer.bindTooltip(`<b>[${ref}] ➔ ${to}</b><br><small>${p.name || ''}</small>`, { sticky: true });

                const key = `${ref}_${to}`;
                if (dirLayers[key]) {
                    dirLayers[key].addLayer(layer);
                } else {
                    const foundKey = Object.keys(dirLayers).find(k => k.startsWith(`${ref}_`));
                    if (foundKey) dirLayers[foundKey].addLayer(layer);
                }
            }
        });
    })
    .catch(err => {
        console.warn("Information : Chargement TC non disponible, carte active :", err);
    });

// =========================================================================
// 🚨 6. TRACÉS HAUTE PRÉCISION : CORTÈGE 10PX & VRAIS HACHURÉS TRAVAUX 10PX
// =========================================================================
let currentDrawMode = 'cortege'; // 'cortege' ou 'travaux'

// Injection du motif SVG de vraies hachures diagonales à 45° pour les travaux
function initTravauxPattern() {
    const svg = document.querySelector('.leaflet-pane svg');
    if (!svg) {
        setTimeout(initTravauxPattern, 300);
        return;
    }
    let defs = svg.querySelector('defs');
    if (!defs) {
        defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        svg.insertBefore(defs, svg.firstChild);
    }
    if (!document.getElementById('travaux-pattern')) {
        const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        pattern.setAttribute('id', 'travaux-pattern');
        pattern.setAttribute('width', '16');
        pattern.setAttribute('height', '16');
        pattern.setAttribute('patternUnits', 'userSpaceOnUse');
        pattern.setAttribute('patternTransform', 'rotate(45)');
        pattern.innerHTML = `
            <rect width="16" height="16" fill="#000000" />
            <rect width="8" height="16" fill="#ffe500" />
        `;
        defs.appendChild(pattern);
    }
}
setTimeout(initTravauxPattern, 400);

// Configuration Leaflet-Geoman (rotate et edit layers masqués)
map.pm.addControls({
    position: 'topleft',
    drawPolyline: true,    // 📏 Tracé
    drawMarker: true,      // 📍 Marqueur
    drawPolygon: false,    // ❌ Masqué
    drawCircle: false,     // ❌ Masqué
    drawRectangle: false,  // ❌ Masqué
    editMode: false,       // ❌ Masqué
    rotateMode: false,     // ❌ Masqué
    dragMode: false,       // ❌ Masqué
    cutPolygon: false,     // ❌ Masqué
    removalMode: true      // 🗑️ Poubelle pour supprimer au clic
});

// Nettoyage synchronisé des sur-couches travaux si suppression par l'outil corbeille
map.on('pm:remove', function (e) {
    if (e.layer && e.layer._travauxStripe) {
        impactLayer.removeLayer(e.layer._travauxStripe);
    }
});

// Appliquer le style au tracé actif
function applyDrawStyle() {
    if (currentDrawMode === 'cortege') {
        map.pm.setPathOptions({
            color: '#ff3b30',
            fillColor: '#ff3b30',
            fillOpacity: 0.45,
            weight: 10,
            dashArray: null,
            lineCap: 'round',
            lineJoin: 'round'
        });
    } else {
        // Mode Travaux : Bords carrés stricts (lineCap: 'butt' -> aucun effet saucisse)
        map.pm.setPathOptions({
            color: '#ffe500',
            fillColor: '#ffe500',
            fillOpacity: 0.45,
            weight: 10,
            dashArray: '16, 16',
            lineCap: 'butt',
            lineJoin: 'miter'
        });
    }
}
applyDrawStyle();

// Clic sur l'un des boutons de mode (Cortège / Travaux)
function setDrawMode(mode) {
    currentDrawMode = mode;
    applyDrawStyle();

    document.querySelectorAll('.btn-mode').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`btn-mode-${mode}`);
    if (btn) btn.classList.add('active');
}

// Gestion de la création d'une forme avec Geoman
map.on('pm:create', function (e) {
    const layer = e.layer;
    layer._manualImpact = true;
    layer._mode = currentDrawMode;
    layer._createdAt = new Date().toISOString();

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (currentDrawMode === 'cortege') {
        // Tracé rouge solide 10px
        if (layer.setStyle) {
            layer.setStyle({
                color: '#ff3b30',
                fillColor: '#ff3b30',
                fillOpacity: 0.45,
                weight: 10,
                dashArray: null,
                lineCap: 'round',
                lineJoin: 'round'
            });
        }
        layer.bindPopup(`<b>🔴 Cortège / Axe bloqué (10px)</b><br><small>Signalé à: ${timeString}</small>`);
        impactLayer.addLayer(layer);
    } else {
        // Tracé Travaux 10px : Vrais hachurés nets carrés (lineCap: 'butt' strict, sans arrondi)
        if (layer.setStyle) {
            layer.setStyle({
                color: '#000000',
                weight: 10,
                opacity: 1.0,
                lineCap: 'butt',
                lineJoin: 'miter',
                className: 'travaux-zebra-line'
            });

            if (layer.getLatLngs) {
                // Hachures jaunes rectangulaires nettes
                const yellowStripe = L.polyline(layer.getLatLngs(), {
                    color: '#ffe500',
                    weight: 10,
                    dashArray: '16, 16',
                    opacity: 1.0,
                    lineCap: 'butt',
                    lineJoin: 'miter'
                });
                layer._travauxStripe = yellowStripe;
                impactLayer.addLayer(yellowStripe);
            }
        }
        layer.bindPopup(`<b>🚧 Zone de travaux (10px)</b><br><small>Signalé à: ${timeString}</small>`);
        impactLayer.addLayer(layer);
    }
});

// Effacer tous les tracés de manifestation et travaux
function clearAllShapes() {
    if (confirm("Supprimer tous les tracés (cortège et travaux) ?")) {
        impactLayer.clearLayers();
    }
}

// Redimensionnement automatique de la carte
window.addEventListener('resize', () => {
    map.invalidateSize();
});
setTimeout(() => {
    map.invalidateSize();
}, 250);
