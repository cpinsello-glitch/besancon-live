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

// Fonction de calcul de proximité d'un arrêt avec les coordonnées d'un tracé
function isStopNearCoords(stopLon, stopLat, coordsList, threshold = 0.0012) {
    const threshSq = threshold * threshold;
    for (let i = 0; i < coordsList.length; i++) {
        const dx = stopLon - coordsList[i][0];
        const dy = stopLat - coordsList[i][1];
        if (dx * dx + dy * dy < threshSq) return true;
    }
    return false;
}

// =========================================================================
// 📥 CHARGEMENT SIMULTANÉ LIGNES TC & ARRÊTS
// =========================================================================
Promise.all([
    fetch('data/reseau_tc.geojson').then(r => r.json()),
    fetch('data/arrets.geojson').then(r => r.json())
]).then(([tcData, arretsData]) => {
    if (!tcData || !Array.isArray(tcData.features)) return;
    const allStops = arretsData && Array.isArray(arretsData.features) ? arretsData.features : [];

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

        // 1. TRACÉ DE LA LIGNE (SANS BULLE AU SURVOL DE LA LIGNE)
        const lineLayer = L.geoJSON(feature, {
            style: {
                color: color,
                weight: isTram ? 5 : 4,
                opacity: 0.92,
                dashArray: isNavette ? '6, 6' : null
            }
        });
        targetLayer.addLayer(lineLayer);

        // Aplatissement des coordonnées du tracé pour associer les arrêts
        const lineCoords = [];
        if (feature.geometry.type === 'LineString') {
            feature.geometry.coordinates.forEach(c => lineCoords.push(c));
        } else if (feature.geometry.type === 'MultiLineString') {
            feature.geometry.coordinates.forEach(subLine => {
                subLine.forEach(c => lineCoords.push(c));
            });
        }

        // 2. MATÉRIALISATION DES ARRÊTS DE LA LIGNE (ROND 13PX COULEUR LIGNE SANS CONTOUR)
        allStops.forEach(st => {
            const linesStr = st.properties.lines || "";
            const servesLine = linesStr.includes(ref) || (ref === 'PlanB' && linesStr.includes('T1'));

            if (servesLine) {
                const sLon = st.geometry.coordinates[0];
                const sLat = st.geometry.coordinates[1];

                // Vérifie si l'arrêt se situe sur le tracé de cette direction
                if (isStopNearCoords(sLon, sLat, lineCoords)) {
                    const stopMarker = L.circleMarker([sLat, sLon], {
                        radius: 6.5,          // Diamètre 13px
                        fillColor: color,     // Couleur de la ligne
                        stroke: false,        // Sans contour
                        fillOpacity: 1.0,
                        pane: 'stopsPane'     // Visible par-dessus le tracé de la ligne
                    });

                    // Nom de station visible au survol en noir 12 (sans bold) avec fond blanc transparent
                    stopMarker.bindTooltip(st.properties.name || "Arrêt", {
                        direction: 'top',
                        offset: [0, -6],
                        className: 'station-tooltip',
                        sticky: true
                    });

                    targetLayer.addLayer(stopMarker);
                }
            }
        });

        // 3. BADGE AU TERMINUS AVEC LE NOM (STYLE DU MENU : ▶ TERMINUS)
        if (lineCoords.length > 0) {
            const destObj = cfg ? cfg.destinations.find(d => d.to === to) : null;
            const destLabel = destObj ? destObj.label : to;

            // Détection de l'extrémité terminus (dernier point ou premier selon l'orientation)
            let termCoord = lineCoords[lineCoords.length - 1];

            // Recherche si un arrêt correspond exactement au nom du terminus pour un ancrage parfait
            const termStop = allStops.find(st => {
                const sName = (st.properties.name || "").toLowerCase();
                const dName = to.toLowerCase();
                return sName.includes(dName) || dName.includes(sName);
            });

            if (termStop) {
                termCoord = [termStop.geometry.coordinates[0], termStop.geometry.coordinates[1]];
            }

            const terminusIcon = L.divIcon({
                className: 'leaflet-terminus-icon',
                html: `<div class="terminus-badge" style="border-color:${color};"><span class="terminus-arrow" style="color:${color};">▶</span> ${destLabel}</div>`,
                iconAnchor: [0, 0]
            });

            const terminusMarker = L.marker([termCoord[1], termCoord[0]], {
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
