// =========================================================================
// 🍎 CONFIGURATION DES LIGNES (Menu Apple haut)
// Modifiez ici directement les labels, couleurs (#hex) et destinations :
// =========================================================================
const LIGNES_CONFIG = [
    {
        id: 'T1',
        label: 'T1',
        ref: 'T1',
        color: '#00A5C2',
        textColor: '#FFFFFF',
        destinations: [
            { to: 'Chalezeule', label: 'CHALEZEULE' },
            { to: 'Hauts du Chazal', label: 'HAUTS DU CHAZAL' }
        ]
    },
    {
        id: 'T2',
        label: 'T2',
        ref: 'T2',
        color: '#006D78',
        textColor: '#FFFFFF',
        destinations: [
            { to: 'Gare Viotte', label: 'GARE VIOTTE' },
            { to: 'Hauts du Chazal', label: 'HAUT DU CHAZAL' }
        ]
    },
    {
        id: 'L3',
        label: '3',
        ref: 'L3',
        color: '#006AB3',
        textColor: '#FFFFFF',
        destinations: [
            { to: '8 Septembre', label: '8 SEPTEMBRE' },
            { to: 'Temis', label: 'TEMIS' }
        ]
    },
    {
        id: 'L4',
        label: '4',
        ref: 'L4',
        color: '#E2001A',
        textColor: '#FFFFFF',
        destinations: [
            { to: 'Châteaufarine', label: 'CHÂTEAUFARINE' },
            { to: 'Pôle Orchamps', label: 'PÔLE ORCHAMPS' }
        ]
    },
    {
        id: 'L5',
        label: '5',
        ref: 'L5',
        color: '#1FA22E',
        textColor: '#FFFFFF',
        destinations: [
            { to: 'Bregille', label: 'BREGILLE' },
            { to: 'Saint-Claude', label: 'SAINT-CLAUDE' }
        ]
    },
    {
        id: 'L6',
        label: '6',
        ref: 'L6',
        color: '#FFE500',
        textColor: '#1A1A1A',
        destinations: [
            { to: 'Orchamps', label: 'ORCHAMPS' },
            { to: 'Founottes', label: 'FOUNOTTES' }
        ]
    },
    {
        id: '7',
        label: '7',
        ref: '7',
        color: '#A74C21',
        textColor: '#FFFFFF',
        destinations: [
            { to: 'Palente Espace Ind.', label: 'PALENT ZI' },
            { to: 'Hauts du Chazal', label: 'HAUT DU CHAZAL' }
        ]
    },
    {
        id: '8',
        label: '8',
        ref: '8',
        color: '#00396B',
        textColor: '#FFFFFF',
        destinations: [
            { to: 'Espace Valentin', label: 'ESPACE VALENTIN' },
            { to: 'Battant', label: 'BATTANT' }
        ]
    },
    {
        id: '9',
        label: '9',
        ref: '9',
        color: '#F29400',
        textColor: '#FFFFFF',
        destinations: [
            { to: 'Tilleroyes', label: 'TILLEROYES' },
            { to: 'Velotte', label: 'VELOTTE' }
        ]
    },
    {
        id: '10',
        label: '10',
        ref: '10',
        color: '#CECB00',
        textColor: '#1A1A1A',
        destinations: [
            { to: 'Chaffanjon', label: 'CHAFFANJON' },
            { to: 'CHU Minjoz', label: 'CHU MINJOZ' }
        ]
    },
    {
        id: '11',
        label: '11',
        ref: '11',
        color: '#C592BE',
        textColor: '#FFFFFF',
        destinations: [
            { to: 'Combe Saragosse', label: 'COMBE SARAGOSSE' },
            { to: 'Rivotte', label: 'RIVOTTE' }
        ]
    },
    {
        id: '12',
        label: '12',
        ref: '12',
        color: '#7BC6BC',
        textColor: '#1A1A1A',
        destinations: [
            { to: 'Prés de Vaux', label: 'PRÉS DE VAUX' },
            { to: 'Temis', label: 'TEMIS' }
        ]
    },
    {
        id: 'CITA',
        label: 'CI',
        ref: 'CITA',
        color: '#EA5B0C',
        textColor: '#FFFFFF',
        destinations: [
            { to: 'Citadelle', label: 'CITADELLE' },
            { to: 'Chamars', label: 'CHAMARS' }
        ]
    },
    {
        id: 'PlanB',
        label: 'PB',
        ref: 'PlanB',
        color: '#1E191A',
        textColor: '#FFE500',
        destinations: [
            { to: 'Chalezeule', label: 'CHALEZEULE' },
            { to: 'Hauts du Chazal', label: 'HAUT DU CHAZAL' }
        ]
    }
];

// =========================================================================
// 🗺️ INITIALISATION CARTE LEAFLET
// Cadrage étendu au Nord pour voir Espace Valentin et Châtillon-le-Duc sous le menu
// =========================================================================
const boundsBesanconUrbain = L.latLngBounds(
    [47.195, 5.925], // Sud-Ouest
    [47.320, 6.085]  // Nord-Est étendu (englobe Châtillon-le-Duc et École-Valentin)
);

const map = L.map('map', {
    center: [47.258, 6.020], // Centré légèrement au nord pour dégager Châtillon-le-Duc sous le menu
    zoom: 14,
    minZoom: 13,             // Permet de dézoomer suffisamment pour voir le terminus nord et Châtillon
    maxZoom: 19,
    zoomControl: false,      // Sans boutons + et -
    maxBounds: boundsBesanconUrbain,
    maxBoundsViscosity: 0.9
});

// =========================================================================
// 🌍 GESTION DES FONDS DE PLAN (STANDART / ÉPURÉ)
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

fondStandard.addTo(map);

function setBasemap(type) {
    if (type === 'standard') {
        if (map.hasLayer(fondEpure)) map.removeLayer(fondEpure);
        if (!map.hasLayer(fondStandard)) map.addLayer(fondStandard);
        document.getElementById('btn-bm-standard').classList.add('active');
        document.getElementById('btn-bm-epure').classList.remove('active');
    } else {
        if (map.hasLayer(fondStandard)) map.removeLayer(fondStandard);
        if (!map.hasLayer(fondEpure)) map.addLayer(fondEpure);
        document.getElementById('btn-bm-epure').classList.add('active');
        document.getElementById('btn-bm-standard').classList.remove('active');
    }
}

// =========================================================================
// 🚌 GESTION DU DOCK APPLE & CALQUES
// =========================================================================
const impactLayer = L.layerGroup().addTo(map);
const dirLayers = {};

LIGNES_CONFIG.forEach(cfg => {
    cfg.destinations.forEach(dest => {
        const key = `${cfg.ref}_${dest.to}`;
        dirLayers[key] = L.layerGroup().addTo(map);
    });
});

const dockContainer = document.getElementById('dock-lines');

LIGNES_CONFIG.forEach(cfg => {
    const itemEl = document.createElement('div');
    itemEl.className = 'dock-item';
    itemEl.id = `dock-item-${cfg.id}`;

    // Carré de ligne 60x60px
    const btnEl = document.createElement('button');
    btnEl.type = 'button';
    btnEl.className = 'dock-btn';
    btnEl.id = `btn-line-${cfg.id}`;
    btnEl.style.backgroundColor = cfg.color;
    btnEl.style.color = cfg.textColor;
    btnEl.textContent = cfg.label;
    btnEl.title = `Ligne ${cfg.ref} - Cliquez pour tout activer/désactiver`;

    btnEl.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLineAll(cfg.id);
    });

    // Sous-menu blanc quasi-opaque
    const submenuEl = document.createElement('div');
    submenuEl.className = 'dock-submenu';
    submenuEl.id = `submenu-${cfg.id}`;

    cfg.destinations.forEach(dest => {
        const key = `${cfg.ref}_${dest.to}`;
        const row = document.createElement('label');
        row.className = 'dest-row';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.id = `chk-${cfg.id}-${dest.to.replace(/\s+/g, '_')}`;

        checkbox.addEventListener('change', () => {
            toggleDirection(key, checkbox.checked);
            updateLineButtonState(cfg.id);
        });

        const arrowSpan = document.createElement('span');
        arrowSpan.className = 'dest-arrow-icon';
        arrowSpan.textContent = '▶';

        const textSpan = document.createElement('span');
        textSpan.textContent = dest.label;

        row.appendChild(checkbox);
        row.appendChild(arrowSpan);
        row.appendChild(textSpan);
        submenuEl.appendChild(row);
    });

    const deviationsContainer = document.createElement('div');
    deviationsContainer.className = 'future-deviations-container';
    deviationsContainer.id = `deviations-${cfg.id}`;
    submenuEl.appendChild(deviationsContainer);

    itemEl.appendChild(btnEl);
    itemEl.appendChild(submenuEl);
    dockContainer.appendChild(itemEl);
});

function toggleDirection(key, isVisible) {
    const layer = dirLayers[key];
    if (!layer) return;
    if (isVisible) {
        if (!map.hasLayer(layer)) map.addLayer(layer);
    } else {
        if (map.hasLayer(layer)) map.removeLayer(layer);
    }
}

function toggleLineAll(lineId) {
    const cfg = LIGNES_CONFIG.find(l => l.id === lineId);
    if (!cfg) return;

    const checkboxes = cfg.destinations.map(d => {
        return document.getElementById(`chk-${cfg.id}-${d.to.replace(/\s+/g, '_')}`);
    });

    const anyActive = checkboxes.some(cb => cb && cb.checked);
    const targetState = !anyActive;

    checkboxes.forEach((cb, idx) => {
        if (cb) {
            cb.checked = targetState;
            const dest = cfg.destinations[idx];
            toggleDirection(`${cfg.ref}_${dest.to}`, targetState);
        }
    });

    updateLineButtonState(lineId);
}

function updateLineButtonState(lineId) {
    const cfg = LIGNES_CONFIG.find(l => l.id === lineId);
    if (!cfg) return;

    const checkboxes = cfg.destinations.map(d => {
        return document.getElementById(`chk-${cfg.id}-${d.to.replace(/\s+/g, '_')}`);
    });

    const anyChecked = checkboxes.some(cb => cb && cb.checked);
    const btn = document.getElementById(`btn-line-${lineId}`);
    if (btn) {
        if (anyChecked) {
            btn.classList.remove('is-inactive');
        } else {
            btn.classList.add('is-inactive');
        }
    }
}

// =========================================================================
// 📥 CHARGEMENT GEOJSON DU RÉSEAU TC
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

                const cfg = LIGNES_CONFIG.find(l => l.ref === ref);
                const color = cfg ? cfg.color : '#8e8e93';
                const isTram = ['T1', 'T2'].includes(ref);
                const isNavette = ['CITA', 'PlanB'].includes(ref);

                return {
                    color: color,
                    weight: isTram ? 5 : 4,
                    opacity: 0.92,
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
        console.warn("Information : Chargement TC non disponible :", err);
    });

// =========================================================================
// 📍 MATÉRIALISATION DES ARRÊTS (POINTS BLANCS VISIBLES + TOOLTIP NOIR 12 SANS BOLD)
// =========================================================================
const stationsLayer = L.layerGroup().addTo(map);

fetch('data/arrets.geojson')
    .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    })
    .then(data => {
        if (!data || !Array.isArray(data.features)) return;

        data.features.forEach(f => {
            const coords = f.geometry.coordinates; // [lon, lat]
            const p = f.properties || {};
            const stopName = p.name || "Arrêt";

            // Point rond un peu plus gros que le trait (rayon 5.5px, bord noir net)
            const marker = L.circleMarker([coords[1], coords[0]], {
                radius: 5.5,
                fillColor: '#ffffff',
                color: '#1a1a1a',
                weight: 2,
                fillOpacity: 1.0
            });

            // Nom de station visible au survol en noir 12 (sans bold) avec fond blanc transparent
            marker.bindTooltip(stopName, {
                direction: 'top',
                offset: [0, -6],
                className: 'station-tooltip',
                sticky: true
            });

            stationsLayer.addLayer(marker);
        });
    })
    .catch(err => {
        console.warn("Notice arrêts :", err);
    });

// =========================================================================
// 🚨 OUTILS DE TRACÉ (CORTÈGE 10PX & TRAVAUX 10PX HACHURÉ SANS ARRONDI)
// =========================================================================
let currentDrawMode = 'cortege';

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

// Configuration Leaflet-Geoman (Bord gauche centré verticalement)
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

map.on('pm:remove', function (e) {
    if (e.layer && e.layer._travauxStripe) {
        impactLayer.removeLayer(e.layer._travauxStripe);
    }
});

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

function setDrawMode(mode) {
    currentDrawMode = mode;
    applyDrawStyle();

    document.querySelectorAll('.draw-mode-option input').forEach(inp => {
        inp.checked = (inp.id === `radio-${mode}`);
    });
}

map.on('pm:create', function (e) {
    const layer = e.layer;
    layer._manualImpact = true;
    layer._mode = currentDrawMode;
    layer._createdAt = new Date().toISOString();

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (currentDrawMode === 'cortege') {
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
