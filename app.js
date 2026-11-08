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
            { to: 'Hauts du Chazal', label: 'HAUTS DU CHAZAL' }
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
// =========================================================================
const boundsBesanconUrbain = L.latLngBounds(
    [47.195, 5.925],
    [47.320, 6.085]
);

const map = L.map('map', {
    center: [47.258, 6.020],
    zoom: 14,
    minZoom: 13,
    maxZoom: 19,
    zoomControl: false,
    maxBounds: boundsBesanconUrbain,
    maxBoundsViscosity: 0.9
});

// Plan personnalisé avec z-index élevé pour afficher les points et terminus au-dessus des tracés
map.createPane('stopsPane');
map.getPane('stopsPane').style.zIndex = 650;

// =========================================================================
// 🌍 GESTION DES FONDS DE PLAN (STANDART / ÉPURÉ PAR DÉFAUT)
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

// Affiche la version ÉPURÉE (Noir & Blanc) par défaut
fondEpure.addTo(map);

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

        // Texte de destination direct sans flèche
        const textSpan = document.createElement('span');
        textSpan.textContent = dest.label;

        row.appendChild(checkbox);
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

// Nettoyage des noms d'arrêts (retire les préfixes communaux comme "École-Valentin - ")
function cleanStopName(name) {
    if (!name) return "Arrêt";
    let cleaned = name;
    if (cleaned.includes(' - ')) {
        const parts = cleaned.split(' - ');
        if (parts.length >= 2) {
            cleaned = parts.slice(1).join(' - ');
        }
    }
    return cleaned.replace(/^Besançon\s+/i, '').replace(/["']/g, '').trim();
}

// =========================================================================
// 📥 CHARGEMENT SIMULTANÉ LIGNES TC & ARRÊTS PROJETÉS STRICTS
// =========================================================================
Promise.all([
    fetch('data/reseau_tc.geojson').then(r => r.json()),
    fetch('data/lignes_arrets.json').then(r => r.json())
]).then(([tcData, arretsParLigne]) => {
    if (!tcData || !Array.isArray(tcData.features)) return;

    tcData.features.forEach(feature => {
        const p = feature.properties || {};
        let ref = p.ref || "";
        if (ref === '6') ref = 'L6';
        if (ref === 'Citadelle') ref = 'CITA';
        if (ref === 'Plan B' || ref === 'Plan B Tram') ref = 'PlanB';

        const to = p.to || "";
        const cfg = LIGNES_CONFIG.find(l => l.ref === ref);
        const color = cfg ? cfg.color : '#8e8e93';
        const isTram = ['T1', 'T2'].includes(ref);
        const isNavette = ['CITA', 'PlanB'].includes(ref);

        const key = `${ref}_${to}`;
        const targetLayer = dirLayers[key] || (function () {
            const foundKey = Object.keys(dirLayers).find(k => k.startsWith(`${ref}_`));
            return foundKey ? dirLayers[foundKey] : null;
        })();

        if (!targetLayer) return;

        // 1. TRACÉ OFFICIEL DE LA LIGNE (Sans bulle au survol de la ligne)
        const lineLayer = L.geoJSON(feature, {
            style: {
                color: color,
                weight: isTram ? 5 : 4,
                opacity: 0.95,
                dashArray: isNavette ? '6, 6' : null
            }
        });
        targetLayer.addLayer(lineLayer);

        // 2. ARRÊTS SPÉCIFIQUES & STRICTS (Issus du GTFS, projetés pile sur le tracé)
        const lineData = arretsParLigne[key];
        if (lineData && Array.isArray(lineData.stops)) {
            lineData.stops.forEach(st => {
                const stopMarker = L.circleMarker([st.lat, st.lon], {
                    radius: 6.5,          // Diamètre 13px
                    fillColor: color,     // Couleur exacte de la ligne
                    stroke: false,        // Sans contour
                    fillOpacity: 1.0,
                    pane: 'stopsPane'     // Visible par-dessus le tracé de la ligne
                });

                // Nom de station sans préfixe (ex: "Centre Commercial" au lieu de "École-Valentin - ...")
                stopMarker.bindTooltip(cleanStopName(st.name), {
                    direction: 'top',
                    offset: [0, -6],
                    className: 'station-tooltip',
                    sticky: true
                });

                targetLayer.addLayer(stopMarker);
            });
        }

        // 3. BADGE DE TERMINUS CALIBRÉ SANS FLÈCHE (Contour couleur de la ligne)
        const terminusCoord = lineData && lineData.terminus ? lineData.terminus : null;
        if (terminusCoord) {
            const destObj = cfg ? cfg.destinations.find(d => d.to === to) : null;
            const destLabel = destObj ? destObj.label : to;

            const terminusIcon = L.divIcon({
                className: 'leaflet-terminus-icon',
                html: `<div class="terminus-badge" style="border-color:${color};">${destLabel}</div>`,
                iconAnchor: [0, 0]
            });

            const terminusMarker = L.marker([terminusCoord[1], terminusCoord[0]], {
                icon: terminusIcon,
                pane: 'stopsPane'
            });

            targetLayer.addLayer(terminusMarker);
        }
    });
}).catch(err => {
    console.warn("Erreur chargement données TC et arrêts :", err);
});

// =========================================================================
// 🚨 OUTILS DE TRACÉ (CORTÈGE 10PX & TRAVAUX 10PX SUITE NOIR / JAUNE)
// =========================================================================
let currentDrawMode = 'cortege';

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
        map.removeLayer(e.layer._travauxStripe);
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
        // Prévisualisation travaux : tirets jaunes et noirs
        map.pm.setPathOptions({
            color: '#ffe500',
            fillColor: '#ffe500',
            fillOpacity: 0.45,
            weight: 10,
            dashArray: '15, 15',
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
        // Mode TRAVAUX : Alternance parfaite 10px TRAIT NOIR et TRAIT JAUNE (15px/15px)
        if (layer.setStyle) {
            // Couche inférieure noire continue 10px bords droits
            layer.setStyle({
                color: '#000000',
                weight: 10,
                opacity: 1.0,
                dashArray: null,
                lineCap: 'butt',
                lineJoin: 'miter'
            });

            // Couche supérieure en tirets jaunes 10px (laisse apparaître le noir dans les intervalles)
            if (layer.getLatLngs) {
                const yellowStripe = L.polyline(layer.getLatLngs(), {
                    color: '#ffe500',
                    weight: 10,
                    dashArray: '15, 15',
                    opacity: 1.0,
                    lineCap: 'butt',
                    lineJoin: 'miter',
                    interactive: false
                });
                layer._travauxStripe = yellowStripe;
                yellowStripe.addTo(map);
                impactLayer.addLayer(yellowStripe);
            }
        }
        layer.bindPopup(`<b>🚧 Zone de travaux (10px Zébré Jaune/Noir)</b><br><small>Signalé à: ${timeString}</small>`);
        impactLayer.addLayer(layer);
    }
});

function clearAllShapes() {
    if (confirm("Supprimer tous les tracés (cortège et travaux) ?")) {
        impactLayer.clearLayers();
        map.eachLayer(l => {
            if (l._manualImpact || l._travauxStripe) {
                map.removeLayer(l);
            }
        });
    }
}

// Redimensionnement automatique de la carte
window.addEventListener('resize', () => {
    map.invalidateSize();
});
setTimeout(() => {
    map.invalidateSize();
}, 250);
