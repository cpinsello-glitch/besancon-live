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
    center: [47.250, 6.020],
    zoom: 14,
    minZoom: 13,
    maxZoom: 19,
    zoomControl: false,
    maxBounds: boundsBesanconUrbain,
    maxBoundsViscosity: 0.9
});

map.createPane('stopsPane');
map.getPane('stopsPane').style.zIndex = 650;

map.createPane('deviationsPane');
map.getPane('deviationsPane').style.zIndex = 670;

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
// 🚌 GESTION DU DOCK APPLE & CALQUES (TOUT DÉCOCHÉ PAR DÉFAUT)
// =========================================================================
const impactLayer = L.layerGroup().addTo(map);
const deviationsLayer = L.layerGroup().addTo(map);
const dirLayers = {};
const rawLineCoords = {}; // Stocke les points GPS des lignes normales pour le découpage propre

LIGNES_CONFIG.forEach(cfg => {
    cfg.destinations.forEach(dest => {
        const key = `${cfg.ref}_${dest.to}`;
        dirLayers[key] = L.layerGroup();
    });
});

const dockContainer = document.getElementById('dock-lines');

LIGNES_CONFIG.forEach(cfg => {
    const itemEl = document.createElement('div');
    itemEl.className = 'dock-item';
    itemEl.id = `dock-item-${cfg.id}`;

    const btnEl = document.createElement('button');
    btnEl.type = 'button';
    btnEl.className = 'dock-btn is-inactive';
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
        checkbox.checked = false;
        checkbox.id = `chk-${cfg.id}-${dest.to.replace(/\s+/g, '_')}`;

        checkbox.addEventListener('change', () => {
            toggleDirection(key, checkbox.checked);
            updateLineButtonState(cfg.id);
        });

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

function setLineState(lineId, shouldBeActive) {
    const cfg = LIGNES_CONFIG.find(l => l.id === lineId);
    if (!cfg) return;

    cfg.destinations.forEach(d => {
        const cb = document.getElementById(`chk-${cfg.id}-${d.to.replace(/\s+/g, '_')}`);
        if (cb) {
            cb.checked = shouldBeActive;
            toggleDirection(`${cfg.ref}_${d.to}`, shouldBeActive);
        }
    });
    updateLineButtonState(lineId);
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
        if (cb && !cb.disabled) {
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
// 📥 CHARGEMENT DONNÉES TC, ARRÊTS & DÉVIATIONS (AVEC PERSISTANCE LOCALE)
// =========================================================================
let allDeviationsConfig = null;

// Initialisation de la persistance locale pour donner un accès complet en écriture
function loadDeviationsConfig(fallbackData) {
    try {
        const localSaved = localStorage.getItem('besancon_live_deviations');
        if (localSaved) {
            const parsed = JSON.parse(localSaved);
            if (parsed && Array.isArray(parsed.zones) && parsed.zones.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.warn("Erreur lecture localStorage déviations :", e);
    }
    return fallbackData;
}

Promise.all([
    fetch('data/reseau_tc.geojson').then(r => r.json()),
    fetch('data/lignes_arrets.json').then(r => r.json()),
    fetch('data/deviations.json').then(r => r.json()).catch(() => null)
]).then(([tcData, arretsParLigne, devData]) => {
    allDeviationsConfig = loadDeviationsConfig(devData);

    if (allDeviationsConfig && allDeviationsConfig.zones) {
        renderZonesList(allDeviationsConfig.zones);
    }

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

        // Stockage des coordonnées brutes ordonnées pour découpage
        const coordsList = [];
        if (feature.geometry.type === 'LineString') {
            feature.geometry.coordinates.forEach(c => coordsList.push(c));
        } else if (feature.geometry.type === 'MultiLineString') {
            feature.geometry.coordinates.forEach(sub => sub.forEach(c => coordsList.push(c)));
        }
        rawLineCoords[key] = coordsList;

        // 1. TRACÉ OFFICIEL DE LA LIGNE
        const lineLayer = L.geoJSON(feature, {
            style: {
                color: color,
                weight: isTram ? 5 : 4,
                opacity: 0.95,
                dashArray: isNavette ? '6, 6' : null
            }
        });
        targetLayer.addLayer(lineLayer);
        targetLayer._mainLineLayer = lineLayer;
        targetLayer._lineColor = color;
        targetLayer._isTram = isTram;

        // 2. ARRÊTS SPÉCIFIQUES & STRICTS
        const lineData = arretsParLigne[key];
        if (lineData && Array.isArray(lineData.stops)) {
            lineData.stops.forEach(st => {
                const stopMarker = L.circleMarker([st.lat, st.lon], {
                    radius: 6.5,
                    fillColor: color,
                    stroke: false,
                    fillOpacity: 1.0,
                    pane: 'stopsPane'
                });

                stopMarker.bindTooltip(cleanStopName(st.name), {
                    direction: 'top',
                    offset: [0, -6],
                    className: 'station-tooltip',
                    sticky: true
                });

                targetLayer.addLayer(stopMarker);
            });
        }

        // 3. BADGE DE TERMINUS
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
// ⚠️ GESTION DU PANNEAU LATÉRAL DROIT : ZONES D'IMPACT & DÉVIATIONS
// =========================================================================
const activeZonesSet = new Set();
let currentlyEditingZoneId = null;
let tempCapturedDeviationCoords = null;

function toggleDeviationPanel(forceState) {
    const panel = document.getElementById('deviation-panel');
    if (!panel) return;
    if (typeof forceState === 'boolean') {
        if (forceState) panel.classList.add('open');
        else panel.classList.remove('open');
    } else {
        panel.classList.toggle('open');
    }
}

function renderZonesList(zones) {
    const container = document.getElementById('zones-list');
    if (!container) return;
    container.innerHTML = '';

    zones.forEach(zone => {
        const row = document.createElement('div');
        row.className = 'zone-item-row';
        row.id = `zone-row-${zone.id}`;

        const info = document.createElement('div');
        info.className = 'zone-info-block';
        info.innerHTML = `
            <span class="zone-title">${zone.nom}</span>
            <span class="zone-desc">${zone.description}</span>
        `;

        const switchLabel = document.createElement('label');
        switchLabel.className = 'zone-toggle-switch';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `chk-zone-${zone.id}`;
        input.checked = activeZonesSet.has(zone.id);

        input.addEventListener('change', () => {
            setZoneActive(zone.id, input.checked);
        });

        const slider = document.createElement('span');
        slider.className = 'slider-round';

        switchLabel.appendChild(input);
        switchLabel.appendChild(slider);

        row.appendChild(info);
        row.appendChild(switchLabel);
        container.appendChild(row);
    });
}

function setZoneActive(zoneId, isActive) {
    if (!allDeviationsConfig || !Array.isArray(allDeviationsConfig.zones)) return;
    const zone = allDeviationsConfig.zones.find(z => z.id === zoneId);
    if (!zone) return;

    const row = document.getElementById(`zone-row-${zoneId}`);
    const chk = document.getElementById(`chk-zone-${zoneId}`);
    if (chk) chk.checked = isActive;

    if (isActive) {
        activeZonesSet.add(zoneId);
        if (row) row.classList.add('is-active');
    } else {
        activeZonesSet.delete(zoneId);
        if (row) row.classList.remove('is-active');
    }

    // Gestion du maintien des lignes impactées : TOUTE LA LIGNE RESTE VISIBLE
    if (Array.isArray(zone.lignesImpactees)) {
        zone.lignesImpactees.forEach(ligne => {
            const cfg = LIGNES_CONFIG.find(l => l.id === ligne.ref);
            if (!cfg) return;

            const btn = document.getElementById(`btn-line-${cfg.id}`);

            cfg.destinations.forEach(d => {
                const key = `${cfg.ref}_${d.to}`;
                const chkDest = document.getElementById(`chk-${cfg.id}-${d.to.replace(/\s+/g, '_')}`);
                const rowDest = chkDest ? chkDest.closest('.dest-row') : null;

                if (isActive) {
                    // La ligne doit être affichée pour voir tout le tracé non impacté
                    if (!map.hasLayer(dirLayers[key])) {
                        map.addLayer(dirLayers[key]);
                    }
                    if (chkDest) {
                        chkDest.checked = true;
                    }
                    if (rowDest) {
                        if (!rowDest.querySelector('.deviation-badge-dock')) {
                            const badge = document.createElement('span');
                            badge.className = 'deviation-badge-dock';
                            badge.textContent = 'DÉVIÉE';
                            rowDest.appendChild(badge);
                        }
                    }
                } else {
                    if (rowDest) {
                        const badge = rowDest.querySelector('.deviation-badge-dock');
                        if (badge) badge.remove();
                    }
                }
            });

            if (btn) {
                if (isActive) {
                    btn.classList.remove('is-inactive');
                    btn.style.borderColor = '#f59e0b';
                } else {
                    btn.style.borderColor = '#ffffff';
                    updateLineButtonState(cfg.id);
                }
            }
        });
    }

    const devBtn = document.getElementById('btn-deviations');
    if (devBtn) {
        if (activeZonesSet.size > 0) devBtn.classList.add('has-active-zone');
        else devBtn.classList.remove('has-active-zone');
    }

    renderDeviationsOnMap();
    renderZoneDetailsPanel();
}

// Fonction de projection pour découper la ligne entre le point de déviation et de retour
function findClosestPointIndex(coords, pt) {
    let minDistSq = 1e9;
    let bestIdx = 0;
    for (let i = 0; i < coords.length; i++) {
        const dx = coords[i][0] - pt[0];
        const dy = coords[i][1] - pt[1];
        const distSq = dx * dx + dy * dy;
        if (distSq < minDistSq) {
            minDistSq = distSq;
            bestIdx = i;
        }
    }
    return bestIdx;
}

function renderDeviationsOnMap() {
    deviationsLayer.clearLayers();
    if (activeZonesSet.size === 0 || !allDeviationsConfig) return;

    allDeviationsConfig.zones.forEach(zone => {
        if (!activeZonesSet.has(zone.id)) return;

        // 1. Tracer le polygone d'impact (halo ambre/rouge)
        if (Array.isArray(zone.polygon) && zone.polygon.length > 2) {
            const latLngs = zone.polygon.map(coord => [coord[1], coord[0]]);
            const poly = L.polygon(latLngs, {
                color: '#d97706',
                fillColor: '#f59e0b',
                fillOpacity: 0.28,
                weight: 2.5,
                dashArray: '6, 6',
                pane: 'deviationsPane'
            });
            poly.bindPopup(`<b>⚠️ Zone d'impact active</b><br>${zone.nom}`);
            deviationsLayer.addLayer(poly);
        }

        // 2. Pour chaque ligne impactée
        if (Array.isArray(zone.lignesImpactees)) {
            zone.lignesImpactees.forEach(ligne => {
                // S'assurer que le calque normal de la ligne est affiché
                setLineState(ligne.ref, true);

                // A. TRONÇON D'ORIGINE IMPACTÉ : POINTILLÉS ESTOMPÉS À 50%
                if (Array.isArray(ligne.tronconBloqueOrigine) && ligne.tronconBloqueOrigine.length > 1) {
                    const blockedLatLngs = ligne.tronconBloqueOrigine.map(c => [c[1], c[0]]);

                    // Ligne en pointillés estompés à 50% entre le point de déviation et le point de retour
                    const blockedLine = L.polyline(blockedLatLngs, {
                        color: ligne.color,
                        weight: 5,
                        opacity: 0.50, // Estompé à 50%
                        dashArray: '6, 8',
                        lineCap: 'butt',
                        lineJoin: 'round',
                        pane: 'deviationsPane'
                    });
                    blockedLine.bindPopup(`<b>🚫 Tronçon Gare Viotte interrompu</b><br>Ligne ${ligne.ref} déviée (estompé à 50%)`);
                    deviationsLayer.addLayer(blockedLine);
                }

                // B. TRACÉ DE DÉVIATION : LIGNE CONTINUE PLEINE ET NETTE
                if (Array.isArray(ligne.directions)) {
                    ligne.directions.forEach(dir => {
                        if (Array.isArray(dir.coordsDeviation) && dir.coordsDeviation.length > 1) {
                            const devLatLngs = dir.coordsDeviation.map(c => [c[1], c[0]]);

                            const casingLine = L.polyline(devLatLngs, {
                                color: '#ffffff',
                                weight: 8,
                                opacity: 0.95,
                                lineCap: 'round',
                                lineJoin: 'round',
                                pane: 'deviationsPane'
                            });

                            const mainDevLine = L.polyline(devLatLngs, {
                                color: ligne.color,
                                weight: 5,
                                opacity: 1.0,
                                dashArray: null, // Ligne continue nette
                                lineCap: 'round',
                                lineJoin: 'round',
                                pane: 'deviationsPane'
                            });

                            mainDevLine.bindPopup(`
                                <b>🔄 Déviation Ligne ${ligne.ref} (${dir.to})</b><br>
                                <b>Itinéraire :</b> ${dir.itineraire}<br>
                                🛑 <b>Dernier arrêt :</b> ${dir.dernierArret}<br>
                                ✅ <b>Reprise :</b> ${dir.prochainArret}
                            `);

                            deviationsLayer.addLayer(casingLine);
                            deviationsLayer.addLayer(mainDevLine);
                        }

                        // Pastille rouge pour arrêt non desservi
                        if (dir.arretsNonDesservis && dir.arretsNonDesservis.includes("Gare Viotte")) {
                            const stopViotteIcon = L.divIcon({
                                className: 'leaflet-missed-stop-icon',
                                html: `<div style="background:#dc2626; color:#fff; width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:12px; border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.4);">✕</div>`,
                                iconAnchor: [11, 11]
                            });
                            const missedMarker = L.marker([47.246176, 6.022169], {
                                icon: stopViotteIcon,
                                pane: 'stopsPane'
                            }).bindTooltip("Arrêt Gare Viotte NON DESSERVI", {
                                direction: 'top',
                                offset: [0, -10],
                                className: 'station-tooltip',
                                sticky: true
                            });
                            deviationsLayer.addLayer(missedMarker);
                        }
                    });
                }
            });
        }
    });
}

function renderZoneDetailsPanel() {
    const container = document.getElementById('zone-details-container');
    if (!container) return;
    container.innerHTML = '';

    if (activeZonesSet.size === 0 || !allDeviationsConfig) return;

    allDeviationsConfig.zones.forEach(zone => {
        if (!activeZonesSet.has(zone.id)) return;

        zone.lignesImpactees.forEach(ligne => {
            const card = document.createElement('div');
            // Cartes pliées par défaut à l'affichage
            card.className = 'deviation-line-card collapsed';

            let directionsHtml = '';
            ligne.directions.forEach(dir => {
                directionsHtml += `
                    <div class="direction-deviation-box">
                        <div class="direction-header-title">
                            <span>Sens ${dir.to}</span>
                        </div>
                        <div class="stop-indicator-row">
                            <span class="indicator-label">🛑 Dernier arrêt :</span>
                            <span class="indicator-val-stop">${dir.dernierArret}</span>
                        </div>
                        <div class="stop-indicator-row">
                            <span class="indicator-label">❌ Non desservi :</span>
                            <span class="indicator-val-missed">${dir.arretsNonDesservis.join(', ')}</span>
                        </div>
                        <div class="stop-indicator-row">
                            <span class="indicator-label">✅ Prochain arrêt :</span>
                            <span class="indicator-val-stop">${dir.prochainArret}</span>
                        </div>
                        <div class="stop-indicator-row">
                            <span class="indicator-label">🛣️ Itinéraire bis :</span>
                            <span class="indicator-val-route">${dir.itineraire}</span>
                        </div>
                    </div>
                `;
            });

            const clientInfoHtml = `
                <div class="client-info-box">
                    <div class="info-box-title">
                        <span>📢 Message Information Voyageurs (SAEIV / SMS)</span>
                    </div>
                    <div class="info-textarea-display" id="info-text-${zone.id}-${ligne.ref}">${ligne.texteInfoClient}</div>
                    <button type="button" class="btn-copy-info" onclick="copyClientInfo('info-text-${zone.id}-${ligne.ref}', this)">
                        <span>📋</span> Copier l'information client
                    </button>
                </div>
            `;

            card.innerHTML = `
                <div class="line-card-header" onclick="this.parentElement.classList.toggle('collapsed')" title="Cliquer pour déplier/replier cette ligne">
                    <div class="header-left-group">
                        <span class="line-badge-lg" style="background-color:${ligne.color}; color:${ligne.textColor};">${ligne.label}</span>
                        <span class="line-status-alert">DÉVIATION EN COURS</span>
                    </div>
                    <div class="header-right-group">
                        <span class="chevron-toggle">▶</span>
                    </div>
                </div>
                <div class="line-card-content">
                    ${directionsHtml}
                    ${clientInfoHtml}
                </div>
            `;

            container.appendChild(card);
        });
    });
}

function copyClientInfo(textElementId, btnEl) {
    const el = document.getElementById(textElementId);
    if (!el) return;
    const textToCopy = el.innerText || el.textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            triggerCopySuccess(btnEl);
        }).catch(() => {
            fallbackCopy(textToCopy, btnEl);
        });
    } else {
        fallbackCopy(textToCopy, btnEl);
    }
}

function fallbackCopy(text, btnEl) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        triggerCopySuccess(btnEl);
    } catch (e) {
        console.warn('Copie manuelle nécessaire', e);
    }
    document.body.removeChild(ta);
}

function triggerCopySuccess(btnEl) {
    if (!btnEl) return;
    const originalHtml = btnEl.innerHTML;
    btnEl.classList.add('copied');
    btnEl.innerHTML = `<span>✅</span> Information copiée !`;
    setTimeout(() => {
        btnEl.classList.remove('copied');
        btnEl.innerHTML = originalHtml;
    }, 2500);
}

// =========================================================================
// 📝 ACCÈS EN ÉCRITURE : ÉDITEUR MULTI-LIGNES DE ZONE D'IMPACT
// =========================================================================
let currentEditorLignes = [];
let drawingLigneIndex = null;

function escapeHtml(str) {
    if (typeof str !== 'string') return str || '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function syncEditorInputs() {
    currentEditorLignes.forEach((lig, idx) => {
        const dEl = document.getElementById(`edit-dernier-${idx}`);
        const pEl = document.getElementById(`edit-prochain-${idx}`);
        const aEl = document.getElementById(`edit-arrets-non-${idx}`);
        const iEl = document.getElementById(`edit-itineraire-${idx}`);
        const mEl = document.getElementById(`edit-message-${idx}`);

        if (dEl) lig.dernierArret = dEl.value.trim();
        if (pEl) lig.prochainArret = pEl.value.trim();
        if (aEl) {
            lig.arretsNonDesservis = aEl.value.split(',').map(s => s.trim()).filter(s => s.length > 0);
        }
        if (iEl) lig.itineraire = iEl.value.trim();
        if (mEl) lig.texteInfoClient = mEl.value.trim();
    });
}

function renderEditorLignesContainer() {
    const container = document.getElementById('editor-lignes-container');
    if (!container) return;
    container.innerHTML = '';

    if (currentEditorLignes.length === 0) {
        container.innerHTML = `<div style="font-size:12px; color:#6b7280; font-style:italic; padding:6px 0;">Aucune ligne associée à cette zone pour le moment. Sélectionnez une ligne ci-dessous et cliquez sur "Ajouter cette ligne".</div>`;
        return;
    }

    currentEditorLignes.forEach((lig, idx) => {
        const card = document.createElement('div');
        card.className = 'editor-ligne-card';

        const nbPts = Array.isArray(lig.coordsDeviation) ? lig.coordsDeviation.length : 0;
        const statusText = nbPts > 0 ? `✅ ${nbPts} points enregistrés` : 'Aucun tracé spécifique (cliquez pour dessiner)';

        card.innerHTML = `
            <div class="editor-ligne-header">
                <span class="editor-ligne-badge" style="background:${lig.color}; color:${lig.textColor};">${lig.label || lig.ref}</span>
                <button type="button" class="btn-remove-ligne" onclick="removeLigneFromEditor(${idx})" title="Retirer cette ligne du secteur">✕ Retirer</button>
            </div>

            <div class="form-row-2">
                <div class="form-group">
                    <label>Dernier arrêt desservi :</label>
                    <input type="text" id="edit-dernier-${idx}" value="${escapeHtml(lig.dernierArret || '')}" placeholder="Ex: Voirin">
                </div>
                <div class="form-group">
                    <label>Premier arrêt repris :</label>
                    <input type="text" id="edit-prochain-${idx}" value="${escapeHtml(lig.prochainArret || '')}" placeholder="Ex: Isenbart">
                </div>
            </div>

            <div class="form-group">
                <label>Arrêt(s) non desservi(s) :</label>
                <input type="text" id="edit-arrets-non-${idx}" value="${escapeHtml(Array.isArray(lig.arretsNonDesservis) ? lig.arretsNonDesservis.join(', ') : (lig.arretsNonDesservis || ''))}" placeholder="Ex: Gare Viotte">
            </div>

            <div class="form-group">
                <label>Itinéraire de contournement :</label>
                <input type="text" id="edit-itineraire-${idx}" value="${escapeHtml(lig.itineraire || '')}" placeholder="Ex: Place Leclerc > Av. Edgar Faure > Av. Foch">
            </div>

            <div class="draw-trace-box">
                <button type="button" class="btn-draw-deviation" onclick="startDrawingForLigneIndex(${idx})">
                    ✏️ Tracer ou modifier le contournement de la ligne ${lig.label || lig.ref}
                </button>
                <span id="trace-status-${idx}" class="trace-status">${statusText}</span>
            </div>

            <div class="form-group">
                <label>Message Info Voyageurs (SAEIV / SMS) :</label>
                <textarea id="edit-message-${idx}" rows="3" placeholder="Texte prédéfini pour l'information voyageurs...">${escapeHtml(lig.texteInfoClient || '')}</textarea>
            </div>
        `;

        container.appendChild(card);
    });
}

function addLigneToEditor() {
    syncEditorInputs();
    const sel = document.getElementById('select-add-ligne-choice');
    if (!sel) return;
    const ref = sel.value;

    if (currentEditorLignes.some(l => l.ref === ref)) {
        alert(`La ligne ${ref} est déjà ajoutée dans ce secteur.`);
        return;
    }

    const cfgLigne = LIGNES_CONFIG.find(l => l.id === ref) || { label: ref, color: '#006AB3', textColor: '#FFFFFF' };
    currentEditorLignes.push({
        ref: ref,
        label: cfgLigne.label,
        color: cfgLigne.color,
        textColor: cfgLigne.textColor,
        dernierArret: '',
        prochainArret: '',
        arretsNonDesservis: [],
        itineraire: '',
        coordsDeviation: [],
        texteInfoClient: `⚠️ INFO TRAFIC GINKO - Ligne ${cfgLigne.label}\nEn raison d'un blocage de secteur, la ligne est déviée.\nArrêt(s) non desservi(s) : ...\nReport aux arrêts : ...`,
        directions: []
    });

    renderEditorLignesContainer();
}

function removeLigneFromEditor(index) {
    syncEditorInputs();
    currentEditorLignes.splice(index, 1);
    renderEditorLignesContainer();
}

function startDrawingForLigneIndex(index) {
    syncEditorInputs();
    drawingLigneIndex = index;
    const lig = currentEditorLignes[index];
    const nomLigne = lig ? (lig.label || lig.ref) : '';

    alert(`Tracez maintenant la déviation pour la ligne ${nomLigne} à la souris sur la carte.\nCliquez sur chaque virage de la rue, puis double-cliquez pour terminer le tracé.`);
    toggleDeviationPanel(false);

    map.pm.enableDraw('Line', {
        snappable: true,
        snapDistance: 20
    });

    const onDrawCreated = function (e) {
        const layer = e.layer;
        if (layer && layer.getLatLngs) {
            const rawPts = layer.getLatLngs();
            const coords = rawPts.map(pt => [
                Math.round(pt.lng * 100000) / 100000,
                Math.round(pt.lat * 100000) / 100000
            ]);

            if (drawingLigneIndex !== null && currentEditorLignes[drawingLigneIndex]) {
                currentEditorLignes[drawingLigneIndex].coordsDeviation = coords;
            }

            map.removeLayer(layer);
            map.off('pm:create', onDrawCreated);
            drawingLigneIndex = null;

            toggleDeviationPanel(true);
            renderEditorLignesContainer();
        }
    };

    map.once('pm:create', onDrawCreated);
}

function openZoneEditor(zoneIdToEdit) {
    const viewList = document.getElementById('view-zones-list');
    const viewEdit = document.getElementById('view-zone-editor');
    if (!viewList || !viewEdit) return;

    currentlyEditingZoneId = zoneIdToEdit || null;
    drawingLigneIndex = null;

    viewList.style.display = 'none';
    viewEdit.style.display = 'block';

    const titleEl = document.getElementById('editor-title-label');
    const nomInput = document.getElementById('edit-zone-nom');
    const descInput = document.getElementById('edit-zone-desc');

    currentEditorLignes = [];

    if (zoneIdToEdit && allDeviationsConfig) {
        const zone = allDeviationsConfig.zones.find(z => z.id === zoneIdToEdit);
        if (zone) {
            titleEl.textContent = `Modifier : ${zone.nom}`;
            nomInput.value = zone.nom || '';
            descInput.value = zone.description || '';

            if (Array.isArray(zone.lignesImpactees)) {
                zone.lignesImpactees.forEach(l => {
                    const firstDir = (l.directions && l.directions[0]) ? l.directions[0] : {};
                    currentEditorLignes.push({
                        ref: l.ref,
                        label: l.label,
                        color: l.color,
                        textColor: l.textColor,
                        dernierArret: firstDir.dernierArret || '',
                        prochainArret: firstDir.prochainArret || '',
                        arretsNonDesservis: Array.isArray(firstDir.arretsNonDesservis) ? [...firstDir.arretsNonDesservis] : [],
                        itineraire: firstDir.itineraire || '',
                        coordsDeviation: Array.isArray(firstDir.coordsDeviation) ? [...firstDir.coordsDeviation] : [],
                        texteInfoClient: l.texteInfoClient || '',
                        tronconBloqueOrigine: l.tronconBloqueOrigine || []
                    });
                });
            }
            renderEditorLignesContainer();
            return;
        }
    }

    // Nouvelle zone vierge
    titleEl.textContent = 'Nouveau secteur d’impact';
    nomInput.value = '';
    descInput.value = '';
    currentEditorLignes = [];
    renderEditorLignesContainer();
}

function editCurrentSelectedZone() {
    const firstActive = activeZonesSet.values().next().value;
    const targetId = firstActive || (allDeviationsConfig && allDeviationsConfig.zones[0] ? allDeviationsConfig.zones[0].id : null);
    if (targetId) {
        openZoneEditor(targetId);
    } else {
        openZoneEditor(null);
    }
}

function closeZoneEditor() {
    const viewList = document.getElementById('view-zones-list');
    const viewEdit = document.getElementById('view-zone-editor');
    if (!viewList || !viewEdit) return;

    viewEdit.style.display = 'none';
    viewList.style.display = 'block';
    currentlyEditingZoneId = null;
    drawingLigneIndex = null;
}

function saveZoneFromEditor(event) {
    if (event) event.preventDefault();
    syncEditorInputs();

    if (!allDeviationsConfig) {
        allDeviationsConfig = { zones: [] };
    }

    const nom = document.getElementById('edit-zone-nom').value.trim();
    const desc = document.getElementById('edit-zone-desc').value.trim();

    if (!nom) {
        alert("Veuillez renseigner un nom pour le secteur.");
        return;
    }

    let targetZone = null;
    if (currentlyEditingZoneId) {
        targetZone = allDeviationsConfig.zones.find(z => z.id === currentlyEditingZoneId);
    }

    if (!targetZone) {
        const newId = 'zone_' + Date.now();
        targetZone = {
            id: newId,
            nom: nom,
            description: desc,
            polygon: [
                [6.0205, 47.2468],
                [6.0235, 47.2468],
                [6.0240, 47.2452],
                [6.0210, 47.2450]
            ],
            lignesImpactees: []
        };
        allDeviationsConfig.zones.push(targetZone);
    } else {
        targetZone.nom = nom;
        targetZone.description = desc;
    }

    // Reconstitution des lignes impactées
    targetZone.lignesImpactees = currentEditorLignes.map(lig => {
        const cfgLigne = LIGNES_CONFIG.find(l => l.id === lig.ref) || { label: lig.ref, color: lig.color || '#006AB3', textColor: lig.textColor || '#FFFFFF' };
        const dest1 = (cfgLigne.destinations && cfgLigne.destinations[0]) ? cfgLigne.destinations[0].to : "Aller";
        const dest2 = (cfgLigne.destinations && cfgLigne.destinations[1]) ? cfgLigne.destinations[1].to : "Retour";

        const usedCoords = lig.coordsDeviation || [];

        return {
            ref: lig.ref,
            label: cfgLigne.label,
            color: cfgLigne.color,
            textColor: cfgLigne.textColor,
            texteInfoClient: lig.texteInfoClient,
            tronconBloqueOrigine: lig.tronconBloqueOrigine || [],
            directions: [
                {
                    to: dest1,
                    dernierArret: lig.dernierArret,
                    prochainArret: lig.prochainArret,
                    arretsNonDesservis: lig.arretsNonDesservis,
                    itineraire: lig.itineraire,
                    coordsDeviation: usedCoords
                },
                {
                    to: dest2,
                    dernierArret: lig.prochainArret,
                    prochainArret: lig.dernierArret,
                    arretsNonDesservis: lig.arretsNonDesservis,
                    itineraire: lig.itineraire,
                    coordsDeviation: Array.isArray(usedCoords) ? [...usedCoords].reverse() : []
                }
            ]
        };
    });

    // Sauvegarde immédiate dans localStorage (accès direct en écriture)
    try {
        localStorage.setItem('besancon_live_deviations', JSON.stringify(allDeviationsConfig));
    } catch (e) {
        console.warn("Erreur sauvegarde localStorage :", e);
    }

    renderZonesList(allDeviationsConfig.zones);
    renderDeviationsOnMap();
    renderZoneDetailsPanel();
    closeZoneEditor();

    alert("Zone d'impact et ensemble de ses lignes enregistrées avec succès !");
}

// =========================================================================
// 🚨 OUTILS DE TRACÉ (CORTÈGE 10PX & TRAVAUX 10PX SUITE NOIR / JAUNE)
// =========================================================================
let currentDrawMode = 'cortege';

map.pm.addControls({
    position: 'topleft',
    drawPolyline: true,
    drawMarker: true,
    drawPolygon: false,
    drawCircle: false,
    drawRectangle: false,
    editMode: false,
    rotateMode: false,
    dragMode: false,
    cutPolygon: false,
    removalMode: true
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
        if (layer.setStyle) {
            layer.setStyle({
                color: '#000000',
                weight: 10,
                opacity: 1.0,
                dashArray: null,
                lineCap: 'butt',
                lineJoin: 'miter'
            });

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

window.addEventListener('resize', () => {
    map.invalidateSize();
});
setTimeout(() => {
    map.invalidateSize();
}, 250);
