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
const previewDeviationLayer = L.layerGroup().addTo(map); // Prévisualisation en direct avant validation
const dirLayers = {};
const rawLineCoords = {}; // Stocke les points GPS des lignes normales pour le découpage propre

// =========================================================================
// ✋ RACCOURCI BARRE D'ESPACE : MAIN DE DÉPLACEMENT DE LA CARTE (PAN)
// =========================================================================
let isSpacePanActive = false;

window.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    const tag = activeEl ? activeEl.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || (activeEl && activeEl.isContentEditable)) {
        return;
    }
    if (e.code === 'Space' && !isSpacePanActive) {
        e.preventDefault();
        isSpacePanActive = true;
        const container = map.getContainer();
        container.style.cursor = 'grab';
        map.dragging.enable();
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        isSpacePanActive = false;
        const container = map.getContainer();
        container.style.cursor = '';
    }
});

map.on('mousedown', () => {
    if (isSpacePanActive) {
        map.getContainer().style.cursor = 'grabbing';
    }
});

map.on('mouseup', () => {
    if (isSpacePanActive) {
        map.getContainer().style.cursor = 'grab';
    }
});

LIGNES_CONFIG.forEach(cfg => {
    cfg.destinations.forEach(dest => {
        const key = `${cfg.ref}_${dest.to}`;
        dirLayers[key] = L.layerGroup();
    });
});

const dockContainer = document.getElementById('dock-lines');
// 
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
                parsed.zones.forEach(z => {
                    if (Array.isArray(z.lignesImpactees)) {
                        z.lignesImpactees.forEach(l => {
                            delete l.tronconBloqueOrigine;
                        });
                    }
                });
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

    try {
        const savedActive = localStorage.getItem('besancon_live_active_zones');
        if (savedActive) {
            const arr = JSON.parse(savedActive);
            if (Array.isArray(arr)) {
                arr.forEach(zid => activeZonesSet.add(zid));
            }
        }
    } catch (e) {}

    if (allDeviationsConfig && allDeviationsConfig.zones) {
        renderZonesList(allDeviationsConfig.zones);
        if (activeZonesSet.size > 0) {
            renderDeviationsOnMap();
            renderZoneDetailsPanel();
        }
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
// 📡 SYNCHRONISATION MULTI-ÉCRANS TEMPS RÉEL & CONTRÔLE DE SESSION MAÎTRE
// =========================================================================
const mySessionId = 'Poste-' + Math.floor(1000 + Math.random() * 9000);
let isMaster = false;
let currentMasterInfo = null; // { id: 'Poste-1234', timestamp: Date.now() }
let masterHeartbeatInterval = null;
let masterCheckInterval = null;

// Mode Administrateur (création/modification/suppression avec PIN 4 chiffres)
let isAdmin = false;
const ADMIN_PIN_DEFAULT = "1234";

// Synchronisation multi-écrans : BroadcastChannel local (0ms) + MQTT over WebSocket
const SYNC_TOPIC_STATE = "besancon-live/ginko/v1/state";
const SYNC_TOPIC_MASTER = "besancon-live/ginko/v1/master";
let syncBroadcastChannel = null;
let mqttClient = null;

function showSyncToast(text) {
    const toast = document.getElementById('sync-toast');
    const toastText = document.getElementById('sync-toast-text');
    if (!toast || !toastText) return;
    toastText.textContent = text;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

// --- GESTION DU CODE PIN ADMIN ---
function openAdminPinModal() {
    const modal = document.getElementById('modal-admin-pin');
    const input = document.getElementById('input-admin-pin');
    const err = document.getElementById('pin-error-msg');
    if (!modal) return;
    if (err) err.style.display = 'none';
    if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 120);
    }
    modal.style.display = 'flex';
}

function closeAdminPinModal() {
    const modal = document.getElementById('modal-admin-pin');
    if (modal) modal.style.display = 'none';
}

function submitAdminPin(event) {
    if (event) event.preventDefault();
    const input = document.getElementById('input-admin-pin');
    const err = document.getElementById('pin-error-msg');
    const pinVal = input ? input.value.trim() : '';

    if (pinVal === ADMIN_PIN_DEFAULT) {
        isAdmin = true;
        closeAdminPinModal();
        updateAdminUI();
        showSyncToast("🔓 Mode Administrateur déverrouillé.");
    } else {
        if (err) err.style.display = 'block';
        if (input) {
            input.value = '';
            input.focus();
        }
    }
}

function toggleAdminAccess() {
    if (isAdmin) {
        isAdmin = false;
        updateAdminUI();
        closeZoneEditor();
        showSyncToast("🔒 Mode Administrateur verrouillé.");
    } else {
        openAdminPinModal();
    }
}

function updateAdminUI() {
    const btnAdmin = document.getElementById('btn-admin-access');
    const btnAdd = document.getElementById('btn-add-zone');
    const btnEditActive = document.getElementById('btn-edit-active-zone');

    if (btnAdmin) {
        if (isAdmin) {
            btnAdmin.innerHTML = '🔓 Admin actif <span style="font-size:9px; opacity:0.8;">[Quitter]</span>';
            btnAdmin.classList.add('is-logged');
            btnAdmin.title = "Cliquer pour quitter le mode Administrateur";
        } else {
            btnAdmin.innerHTML = '🔒 Admin';
            btnAdmin.classList.remove('is-logged');
            btnAdmin.title = "Accès administrateur (Code PIN 4 chiffres)";
        }
    }

    if (btnAdd) {
        // Visible uniquement en mode admin avec son + jaune
        btnAdd.style.display = isAdmin ? 'inline-flex' : 'none';
    }

    if (btnEditActive) {
        btnEditActive.style.display = isAdmin ? 'inline-block' : 'none';
    }

    if (allDeviationsConfig && allDeviationsConfig.zones) {
        renderZonesList(allDeviationsConfig.zones);
    }
}

// --- CONTRÔLE DE SESSION MAÎTRE / LECTURE SEULE ---
function initSessionControl() {
    const myIdEl = document.getElementById('session-my-id');
    if (myIdEl) myIdEl.textContent = mySessionId;

    updateSessionUI();

    // Surveillance expiration du verrou maître (si inactif depuis > 6,5s)
    masterCheckInterval = setInterval(() => {
        if (!isMaster && currentMasterInfo) {
            const elapsed = Date.now() - currentMasterInfo.timestamp;
            if (elapsed > 6500) {
                console.log("Verrou maître expiré : libération automatique.");
                currentMasterInfo = null;
                updateSessionUI();
                showSyncToast("ℹ️ Contrôle principal libéré (Poste inactif).");
            }
        }
    }, 1500);

    window.addEventListener('beforeunload', () => {
        if (isMaster) {
            releaseMasterRole();
        }
    });
}

function updateSessionUI() {
    const dot = document.getElementById('session-dot');
    const statusText = document.getElementById('session-status-text');
    const btnToggle = document.getElementById('btn-master-toggle');
    if (!dot || !statusText || !btnToggle) return;

    if (isMaster) {
        dot.className = 'session-dot dot-master';
        statusText.textContent = "👑 Session Maître (Vous pilotez l'affichage)";
        btnToggle.className = 'btn-master-toggle is-master';
        btnToggle.innerHTML = "🔓 Libérer la main";
        btnToggle.disabled = false;
        btnToggle.title = "Libérer la main pour permettre à un autre poste de piloter";
    } else if (currentMasterInfo && currentMasterInfo.id !== mySessionId) {
        dot.className = 'session-dot dot-locked';
        statusText.textContent = `🔒 Contrôlé par ${currentMasterInfo.id}`;
        btnToggle.className = 'btn-master-toggle is-disabled';
        btnToggle.innerHTML = "🔒 Main occupée";
        btnToggle.disabled = true;
        btnToggle.title = `Le poste ${currentMasterInfo.id} détient actuellement la main exclusive`;
    } else {
        dot.className = 'session-dot dot-readonly';
        statusText.textContent = "Session en lecture seule (Contrôle libre)";
        btnToggle.className = 'btn-master-toggle';
        btnToggle.innerHTML = "👑 Prendre la main";
        btnToggle.disabled = false;
        btnToggle.title = "Prendre la main pour piloter l'affichage sur tous les écrans connectés";
    }
}

function toggleMasterRole() {
    if (isMaster) {
        releaseMasterRole();
    } else {
        claimMasterRole();
    }
}

function claimMasterRole() {
    if (currentMasterInfo && currentMasterInfo.id !== mySessionId && (Date.now() - currentMasterInfo.timestamp < 6500)) {
        alert(`Le poste « ${currentMasterInfo.id} » détient actuellement la main exclusive.\nVous devez attendre qu'il libère la main ou ferme sa session.`);
        return;
    }

    isMaster = true;
    currentMasterInfo = { id: mySessionId, timestamp: Date.now() };
    updateSessionUI();

    broadcastMasterMessage('claim');

    if (masterHeartbeatInterval) clearInterval(masterHeartbeatInterval);
    masterHeartbeatInterval = setInterval(() => {
        if (isMaster) {
            broadcastMasterMessage('heartbeat');
        }
    }, 2500);

    showSyncToast("👑 Vous avez pris la main ! Vos actions pilotent tous les écrans.");
}

function releaseMasterRole() {
    if (!isMaster) return;
    isMaster = false;
    currentMasterInfo = null;

    if (masterHeartbeatInterval) {
        clearInterval(masterHeartbeatInterval);
        masterHeartbeatInterval = null;
    }

    broadcastMasterMessage('release');
    updateSessionUI();
    showSyncToast("ℹ️ Main libérée. Session revenue en lecture seule.");
}

function broadcastMasterMessage(action) {
    const msg = {
        action: action,
        masterId: mySessionId,
        timestamp: Date.now()
    };

    if (syncBroadcastChannel) {
        try {
            syncBroadcastChannel.postMessage({ type: 'sync_master', data: msg });
        } catch (e) {}
    }

    if (mqttClient && mqttClient.connected) {
        try {
            mqttClient.publish(SYNC_TOPIC_MASTER, JSON.stringify(msg), { qos: 1, retain: action !== 'release' });
        } catch (e) {}
    }
}

function handleIncomingMasterMessage(msg) {
    if (!msg || msg.masterId === mySessionId) return;

    if (msg.action === 'claim' || msg.action === 'heartbeat') {
        currentMasterInfo = { id: msg.masterId, timestamp: msg.timestamp || Date.now() };
        if (isMaster) {
            isMaster = false;
            if (masterHeartbeatInterval) clearInterval(masterHeartbeatInterval);
        }
        updateSessionUI();
    } else if (msg.action === 'release') {
        if (currentMasterInfo && currentMasterInfo.id === msg.masterId) {
            currentMasterInfo = null;
            updateSessionUI();
        }
    }
}

// --- SYNCHRONISATION EN TEMPS RÉEL (AFFICHAGE UNIQUE) ---
function broadcastAppState() {
    const payload = {
        sender: mySessionId,
        timestamp: Date.now(),
        allDeviationsConfig: allDeviationsConfig,
        activeZones: Array.from(activeZonesSet)
    };

    try {
        localStorage.setItem('besancon_live_deviations', JSON.stringify(allDeviationsConfig));
        localStorage.setItem('besancon_live_active_zones', JSON.stringify(payload.activeZones));
    } catch (e) {}

    if (syncBroadcastChannel) {
        try {
            syncBroadcastChannel.postMessage({ type: 'sync_state', data: payload });
        } catch (e) {}
    }

    if (mqttClient && mqttClient.connected) {
        try {
            mqttClient.publish(SYNC_TOPIC_STATE, JSON.stringify(payload), { qos: 1, retain: true });
        } catch (e) {}
    }
}

function handleIncomingStateUpdate(data) {
    if (!data || data.sender === mySessionId) return;

    if (data.allDeviationsConfig && Array.isArray(data.allDeviationsConfig.zones)) {
        allDeviationsConfig = data.allDeviationsConfig;
        try {
            localStorage.setItem('besancon_live_deviations', JSON.stringify(allDeviationsConfig));
        } catch (e) {}
    }

    if (Array.isArray(data.activeZones)) {
        activeZonesSet.clear();
        data.activeZones.forEach(id => activeZonesSet.add(id));
        try {
            localStorage.setItem('besancon_live_active_zones', JSON.stringify(data.activeZones));
        } catch (e) {}
    }

    if (allDeviationsConfig && allDeviationsConfig.zones) {
        renderZonesList(allDeviationsConfig.zones);
    }
    renderDeviationsOnMap();
    renderZoneDetailsPanel();

    showSyncToast(`⚡ Affichage synchronisé en direct (${data.sender})`);
}

function initRealtimeSync() {
    // 1. Synchronisation BroadcastChannel (inter-onglets local 0ms)
    try {
        if ('BroadcastChannel' in window) {
            syncBroadcastChannel = new BroadcastChannel('besancon_live_sync_channel');
            syncBroadcastChannel.onmessage = (event) => {
                const msg = event.data;
                if (!msg) return;
                if (msg.type === 'sync_state') handleIncomingStateUpdate(msg.data);
                if (msg.type === 'sync_master') handleIncomingMasterMessage(msg.data);
            };
        }
    } catch (e) {
        console.warn("BroadcastChannel non disponible :", e);
    }

    // 2. Synchronisation MQTT over WebSocket (multi-PC)
    if (typeof mqtt !== 'undefined') {
        const brokerUrl = 'wss://broker.emqx.io:8084/mqtt';
        try {
            mqttClient = mqtt.connect(brokerUrl, {
                clientId: mySessionId + '_' + Math.random().toString(16).substring(2, 8),
                clean: true,
                connectTimeout: 6000,
                reconnectPeriod: 3000
            });

            mqttClient.on('connect', () => {
                console.log("Connecté au broker de synchronisation temps réel MQTT");
                mqttClient.subscribe([SYNC_TOPIC_STATE, SYNC_TOPIC_MASTER], { qos: 1 });
            });

            mqttClient.on('message', (topic, message) => {
                try {
                    const parsed = JSON.parse(message.toString());
                    if (topic === SYNC_TOPIC_STATE) {
                        handleIncomingStateUpdate(parsed);
                    } else if (topic === SYNC_TOPIC_MASTER) {
                        handleIncomingMasterMessage(parsed);
                    }
                } catch (err) {
                    console.warn("Erreur message sync MQTT :", err);
                }
            });

            mqttClient.on('error', (err) => {
                console.warn("Erreur MQTT :", err);
            });
        } catch (e) {
            console.warn("Initialisation MQTT impossible :", e);
        }
    }
}

// Initialisations immédiates et au chargement complet
initSessionControl();
initRealtimeSync();
document.addEventListener('DOMContentLoaded', () => {
    initSessionControl();
    updateAdminUI();
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

        const actionsRight = document.createElement('div');
        actionsRight.style.display = 'flex';
        actionsRight.style.alignItems = 'center';
        actionsRight.style.gap = '8px';

        // Bouton modifier réservé au mode admin
        if (isAdmin) {
            const btnEdit = document.createElement('button');
            btnEdit.type = 'button';
            btnEdit.className = 'btn-text-edit';
            btnEdit.innerHTML = '✏️';
            btnEdit.title = 'Modifier ce secteur';
            btnEdit.style.padding = '4px 6px';
            btnEdit.onclick = (e) => {
                e.stopPropagation();
                openZoneEditor(zone.id);
            };
            actionsRight.appendChild(btnEdit);
        }

        const switchLabel = document.createElement('label');
        switchLabel.className = 'zone-toggle-switch';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `chk-zone-${zone.id}`;
        input.checked = activeZonesSet.has(zone.id);

        input.addEventListener('change', (e) => {
            if (!isMaster) {
                e.preventDefault();
                input.checked = activeZonesSet.has(zone.id);
                showSyncToast("⚠️ Session en lecture seule. Prenez la main (👑) pour piloter l'affichage.");
                return;
            }
            setZoneActive(zone.id, input.checked);
        });

        const slider = document.createElement('span');
        slider.className = 'slider-round';

        switchLabel.appendChild(input);
        switchLabel.appendChild(slider);
        actionsRight.appendChild(switchLabel);

        row.appendChild(info);
        row.appendChild(actionsRight);
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

    // Diffusion immédiate de l'affichage unique sur tous les écrans
    if (isMaster) {
        broadcastAppState();
    }
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

    // Ensemble des clés de direction impactées : ex. "L3_8 Septembre"
    const deviatedDirKeys = new Set();

    if (activeZonesSet.size > 0 && allDeviationsConfig) {
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

            // 2. Traitement de chaque ligne impactée
            if (Array.isArray(zone.lignesImpactees)) {
                zone.lignesImpactees.forEach(ligne => {
                    const cfg = LIGNES_CONFIG.find(l => l.id === ligne.ref);
                    if (!cfg) return;

                    // S'assurer que le calque de la ligne est actif sur le dock
                    setLineState(ligne.ref, true);

                    if (Array.isArray(ligne.directions)) {
                        ligne.directions.forEach(dir => {
                            const key = `${ligne.ref}_${dir.to}`;
                            deviatedDirKeys.add(key);

                            const rawCoords = rawLineCoords[key];

                            // A. DÉCOUPAGE PROPRE SUR LA VRAIE ROUTE (Supprime le tracé normal sur la section bloquée)
                            if (Array.isArray(dir.coordsDeviation) && dir.coordsDeviation.length > 1 && Array.isArray(rawCoords) && rawCoords.length > 2) {
                                const ptStart = dir.coordsDeviation[0];
                                const ptEnd = dir.coordsDeviation[dir.coordsDeviation.length - 1];

                                const idxA = findClosestPointIndex(rawCoords, ptStart);
                                const idxB = findClosestPointIndex(rawCoords, ptEnd);
                                const iStart = Math.min(idxA, idxB);
                                const iEnd = Math.max(idxA, idxB);

                                // 1. Tronçon SAIN AVANT déviation (continu normal)
                                if (iStart > 0) {
                                    const segBefore = rawCoords.slice(0, iStart + 1).map(c => [c[1], c[0]]);
                                    deviationsLayer.addLayer(L.polyline(segBefore, {
                                        color: ligne.color,
                                        weight: 4.5,
                                        opacity: 0.95,
                                        pane: 'deviationsPane'
                                    }));
                                }

                                // 2. Tronçon BLOQUÉ SUR LA VRAIE ROUTE (pointillés estompés à 50%)
                                const segBlocked = rawCoords.slice(iStart, iEnd + 1).map(c => [c[1], c[0]]);
                                if (segBlocked.length > 1) {
                                    deviationsLayer.addLayer(L.polyline(segBlocked, {
                                        color: ligne.color,
                                        weight: 5,
                                        opacity: 0.50, // Estompé à 50%
                                        dashArray: '6, 8', // Pointillés réguliers
                                        lineCap: 'butt',
                                        lineJoin: 'round',
                                        pane: 'deviationsPane'
                                    }).bindPopup(`<b>🚫 Tronçon neutralisé (${ligne.label} vers ${dir.to})</b><br>Déviation en cours via itinéraire bis`));
                                }

                                // 3. Tronçon SAIN APRÈS reprise (continu normal)
                                if (iEnd < rawCoords.length - 1) {
                                    const segAfter = rawCoords.slice(iEnd).map(c => [c[1], c[0]]);
                                    deviationsLayer.addLayer(L.polyline(segAfter, {
                                        color: ligne.color,
                                        weight: 4.5,
                                        opacity: 0.95,
                                        pane: 'deviationsPane'
                                    }));
                                }

                                // 4. CONTOURNEMENT DE DÉVIATION (ligne continue nette avec halo blanc)
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
                                    dashArray: null,
                                    lineCap: 'round',
                                    lineJoin: 'round',
                                    pane: 'deviationsPane'
                                });

                                mainDevLine.bindPopup(`
                                    <b>🔄 Déviation Ligne ${ligne.ref} (vers ${dir.to})</b><br>
                                    <b>Itinéraire :</b> ${dir.itineraire || 'Contournement'}<br>
                                    🛑 <b>Dernier arrêt :</b> ${dir.dernierArret || '-'}<br>
                                    ✅ <b>Reprise :</b> ${dir.prochainArret || '-'}
                                `);

                                deviationsLayer.addLayer(casingLine);
                                deviationsLayer.addLayer(mainDevLine);
                            }

                            // Pastille rouge pour arrêt(s) non desservi(s)
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

    // Gestion du masquage de l'itinéraire d'origine pour les directions déviées
    Object.keys(dirLayers).forEach(key => {
        const layerGroup = dirLayers[key];
        if (layerGroup && layerGroup._mainLineLayer) {
            if (deviatedDirKeys.has(key)) {
                // Direction déviée : on masque complètement le tracé normal plein pour éviter toute superposition
                layerGroup._mainLineLayer.setStyle({ opacity: 0 });
            } else {
                // Direction normale : tracé plein d'origine
                layerGroup._mainLineLayer.setStyle({ opacity: 0.95 });
            }
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
            card.className = 'deviation-line-card collapsed';

            let directionsHtml = '';
            if (Array.isArray(ligne.directions)) {
                ligne.directions.forEach(dir => {
                    directionsHtml += `
                        <div class="direction-deviation-box">
                            <div class="direction-header-title">
                                <span>Sens vers ${escapeHtml(dir.to)}</span>
                            </div>
                            <div class="stop-indicator-row">
                                <span class="indicator-label">🛑 Dernier arrêt :</span>
                                <span class="indicator-val-stop">${escapeHtml(dir.dernierArret || '-')}</span>
                            </div>
                            <div class="stop-indicator-row">
                                <span class="indicator-label">❌ Non desservi :</span>
                                <span class="indicator-val-missed">${escapeHtml(Array.isArray(dir.arretsNonDesservis) ? dir.arretsNonDesservis.join(', ') : (dir.arretsNonDesservis || '-'))}</span>
                            </div>
                            <div class="stop-indicator-row">
                                <span class="indicator-label">✅ Prochain arrêt :</span>
                                <span class="indicator-val-stop">${escapeHtml(dir.prochainArret || '-')}</span>
                            </div>
                            <div class="stop-indicator-row">
                                <span class="indicator-label">🛣️ Itinéraire bis :</span>
                                <span class="indicator-val-route">${escapeHtml(dir.itineraire || '-')}</span>
                            </div>
                        </div>
                    `;
                });
            }

            const clientInfoHtml = `
                <div class="client-info-box">
                    <div class="info-box-title">
                        <span>📢 Message Information Voyageurs (SAEIV / SMS)</span>
                    </div>
                    <div class="info-textarea-display" id="info-text-${zone.id}-${ligne.ref}">${escapeHtml(ligne.texteInfoClient || '')}</div>
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

// =========================================================================
// 📝 ACCÈS EN ÉCRITURE : ÉDITEUR MULTI-LIGNES AVEC CHOIX ALLER / RETOUR
// =========================================================================
let currentEditorLignes = [];
let drawingTarget = null; // { lineIndex: 0, dirKey: 'aller' }

function escapeHtml(str) {
    if (typeof str !== 'string') return str || '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function updateDeviationPreview() {
    previewDeviationLayer.clearLayers();
    if (!currentEditorLignes || currentEditorLignes.length === 0) return;

    currentEditorLignes.forEach(lig => {
        ['aller', 'retour'].forEach(dirKey => {
            const d = lig[dirKey];
            if (d && d.enabled && Array.isArray(d.coordsDeviation) && d.coordsDeviation.length > 1) {
                const latLngs = d.coordsDeviation.map(c => [c[1], c[0]]);

                const casing = L.polyline(latLngs, {
                    color: '#ffffff',
                    weight: 8,
                    opacity: 0.95,
                    lineCap: 'round',
                    lineJoin: 'round',
                    pane: 'deviationsPane'
                });

                const mainLine = L.polyline(latLngs, {
                    color: lig.color,
                    weight: 5,
                    opacity: 1.0,
                    lineCap: 'round',
                    lineJoin: 'round',
                    pane: 'deviationsPane'
                }).bindPopup(`<b>👁️ Aperçu Déviation</b><br>Ligne ${lig.label} (${d.label})<br>${d.itineraire || ''}`);

                previewDeviationLayer.addLayer(casing);
                previewDeviationLayer.addLayer(mainLine);
            }
        });
    });
}

function syncEditorInputs() {
    currentEditorLignes.forEach((lig, idx) => {
        ['aller', 'retour'].forEach(dirKey => {
            const d = lig[dirKey];
            if (!d) return;

            const dEl = document.getElementById(`edit-dernier-${dirKey}-${idx}`);
            const pEl = document.getElementById(`edit-prochain-${dirKey}-${idx}`);
            const aEl = document.getElementById(`edit-arrets-${dirKey}-${idx}`);
            const iEl = document.getElementById(`edit-iti-${dirKey}-${idx}`);

            if (dEl) d.dernierArret = dEl.value.trim();
            if (pEl) d.prochainArret = pEl.value.trim();
            if (aEl) {
                d.arretsNonDesservis = aEl.value.split(',').map(s => s.trim()).filter(s => s.length > 0);
            }
            if (iEl) d.itineraire = iEl.value.trim();
        });

        const mEl = document.getElementById(`edit-message-${idx}`);
        if (mEl) lig.texteInfoClient = mEl.value.trim();
    });
}

function toggleDirChoice(lineIdx, dirKey, isChecked) {
    syncEditorInputs();
    if (currentEditorLignes[lineIdx] && currentEditorLignes[lineIdx][dirKey]) {
        currentEditorLignes[lineIdx][dirKey].enabled = isChecked;
    }
    updateDeviationPreview();
    renderEditorLignesContainer();
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

        // Bloc Aller
        let allerHtml = '';
        if (lig.aller.enabled) {
            const nbPtsAller = Array.isArray(lig.aller.coordsDeviation) ? lig.aller.coordsDeviation.length : 0;
            const statusAller = nbPtsAller > 0 ? `✅ ${nbPtsAller} points enregistrés (visible sur la carte)` : 'Aucun tracé (cliquez pour dessiner)';

            allerHtml = `
                <div class="dir-block-card">
                    <div class="dir-block-title">
                        <span>Sens Aller ➔ Vers ${escapeHtml(lig.aller.label)}</span>
                    </div>
                    <div class="form-row-2">
                        <div class="form-group">
                            <label>Dernier arrêt desservi :</label>
                            <input type="text" id="edit-dernier-aller-${idx}" value="${escapeHtml(lig.aller.dernierArret || '')}" placeholder="Ex: Voirin">
                        </div>
                        <div class="form-group">
                            <label>Premier arrêt repris :</label>
                            <input type="text" id="edit-prochain-aller-${idx}" value="${escapeHtml(lig.aller.prochainArret || '')}" placeholder="Ex: Isenbart">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Arrêt(s) non desservi(s) :</label>
                        <input type="text" id="edit-arrets-aller-${idx}" value="${escapeHtml(Array.isArray(lig.aller.arretsNonDesservis) ? lig.aller.arretsNonDesservis.join(', ') : (lig.aller.arretsNonDesservis || ''))}" placeholder="Ex: Gare Viotte">
                    </div>
                    <div class="form-group">
                        <label>Itinéraire emprunté :</label>
                        <input type="text" id="edit-iti-aller-${idx}" value="${escapeHtml(lig.aller.itineraire || '')}" placeholder="Ex: Place Leclerc > Av. Edgar Faure > Av. Foch">
                    </div>
                    <div class="draw-trace-box">
                        <button type="button" class="btn-draw-deviation" onclick="startDrawingForLigneDir(${idx}, 'aller')">
                            ✏️ Tracer le contournement [Aller vers ${escapeHtml(lig.aller.label)}] à la souris
                        </button>
                        <span id="trace-status-aller-${idx}" class="trace-status">${statusAller}</span>
                    </div>
                </div>
            `;
        }

        // Bloc Retour
        let retourHtml = '';
        if (lig.retour.enabled) {
            const nbPtsRetour = Array.isArray(lig.retour.coordsDeviation) ? lig.retour.coordsDeviation.length : 0;
            const statusRetour = nbPtsRetour > 0 ? `✅ ${nbPtsRetour} points enregistrés (visible sur la carte)` : 'Aucun tracé (cliquez pour dessiner)';

            retourHtml = `
                <div class="dir-block-card">
                    <div class="dir-block-title">
                        <span>Sens Retour ➔ Vers ${escapeHtml(lig.retour.label)}</span>
                    </div>
                    <div class="form-row-2">
                        <div class="form-group">
                            <label>Dernier arrêt desservi :</label>
                            <input type="text" id="edit-dernier-retour-${idx}" value="${escapeHtml(lig.retour.dernierArret || '')}" placeholder="Ex: Isenbart">
                        </div>
                        <div class="form-group">
                            <label>Premier arrêt repris :</label>
                            <input type="text" id="edit-prochain-retour-${idx}" value="${escapeHtml(lig.retour.prochainArret || '')}" placeholder="Ex: Voirin">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Arrêt(s) non desservi(s) :</label>
                        <input type="text" id="edit-arrets-retour-${idx}" value="${escapeHtml(Array.isArray(lig.retour.arretsNonDesservis) ? lig.retour.arretsNonDesservis.join(', ') : (lig.retour.arretsNonDesservis || ''))}" placeholder="Ex: Gare Viotte">
                    </div>
                    <div class="form-group">
                        <label>Itinéraire emprunté :</label>
                        <input type="text" id="edit-iti-retour-${idx}" value="${escapeHtml(lig.retour.itineraire || '')}" placeholder="Ex: Av. Foch > Av. Edgar Faure > Place Leclerc">
                    </div>
                    <div class="draw-trace-box">
                        <button type="button" class="btn-draw-deviation" onclick="startDrawingForLigneDir(${idx}, 'retour')">
                            ✏️ Tracer le contournement [Retour vers ${escapeHtml(lig.retour.label)}] à la souris
                        </button>
                        <span id="trace-status-retour-${idx}" class="trace-status">${statusRetour}</span>
                    </div>
                </div>
            `;
        }

        let warningNoDir = (!lig.aller.enabled && !lig.retour.enabled) ? `
            <div style="font-size:11.5px; color:#dc2626; font-weight:700; background:#fee2e2; padding:6px 10px; border-radius:6px;">
                ⚠️ Cochez au moins l'Aller et/ou le Retour ci-dessus pour définir la déviation.
            </div>
        ` : '';

        card.innerHTML = `
            <div class="editor-ligne-header">
                <span class="editor-ligne-badge" style="background:${lig.color}; color:${lig.textColor};">${lig.label || lig.ref}</span>
                <button type="button" class="btn-remove-ligne" onclick="removeLigneFromEditor(${idx})" title="Retirer cette ligne du secteur">✕ Retirer</button>
            </div>

            <!-- Choix individuel Aller et/ou Retour -->
            <div class="dir-selection-bar">
                <span style="font-size:11px; font-weight:800; color:#4b5563;">Sens dévié(s) :</span>
                <label class="dir-checkbox-label">
                    <input type="checkbox" ${lig.aller.enabled ? 'checked' : ''} onchange="toggleDirChoice(${idx}, 'aller', this.checked)">
                    <span>Aller : vers ${escapeHtml(lig.aller.label)}</span>
                </label>
                <label class="dir-checkbox-label">
                    <input type="checkbox" ${lig.retour.enabled ? 'checked' : ''} onchange="toggleDirChoice(${idx}, 'retour', this.checked)">
                    <span>Retour : vers ${escapeHtml(lig.retour.label)}</span>
                </label>
            </div>

            ${warningNoDir}
            ${allerHtml}
            ${retourHtml}

            <div class="form-group">
                <label>Message Info Voyageurs (SAEIV / SMS) :</label>
                <textarea id="edit-message-${idx}" rows="4" placeholder="Texte prédéfini pour l'information voyageurs...">${escapeHtml(lig.texteInfoClient || '')}</textarea>
            </div>
        `;

        container.appendChild(card);
    });

    updateDeviationPreview();
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

    const cfgLigne = LIGNES_CONFIG.find(l => l.id === ref) || { label: ref, color: '#006AB3', textColor: '#FFFFFF', destinations: [] };
    const dest1 = (cfgLigne.destinations && cfgLigne.destinations[0]) ? cfgLigne.destinations[0].to : "Aller";
    const dest1Label = (cfgLigne.destinations && cfgLigne.destinations[0]) ? cfgLigne.destinations[0].label : "ALLER";
    const dest2 = (cfgLigne.destinations && cfgLigne.destinations[1]) ? cfgLigne.destinations[1].to : "Retour";
    const dest2Label = (cfgLigne.destinations && cfgLigne.destinations[1]) ? cfgLigne.destinations[1].label : "RETOUR";

    currentEditorLignes.push({
        ref: ref,
        label: cfgLigne.label,
        color: cfgLigne.color,
        textColor: cfgLigne.textColor,
        aller: {
            enabled: true,
            to: dest1,
            label: dest1Label,
            dernierArret: '',
            prochainArret: '',
            arretsNonDesservis: [],
            itineraire: '',
            coordsDeviation: []
        },
        retour: {
            enabled: true,
            to: dest2,
            label: dest2Label,
            dernierArret: '',
            prochainArret: '',
            arretsNonDesservis: [],
            itineraire: '',
            coordsDeviation: []
        },
        texteInfoClient: `⚠️ INFO TRAFIC GINKO - Ligne ${cfgLigne.label}\nEn raison d'un blocage de secteur, la ligne est déviée.\nArrêt(s) non desservi(s) : ...\nReport aux arrêts : ...`
    });

    renderEditorLignesContainer();
}

function removeLigneFromEditor(index) {
    syncEditorInputs();
    currentEditorLignes.splice(index, 1);
    updateDeviationPreview();
    renderEditorLignesContainer();
}

function startDrawingForLigneDir(index, dirKey) {
    syncEditorInputs();
    drawingTarget = { lineIndex: index, dirKey: dirKey };
    const lig = currentEditorLignes[index];
    const targetDir = lig ? lig[dirKey] : null;
    const destLabel = targetDir ? targetDir.label : '';

    alert(`Tracez maintenant la déviation pour la ligne ${lig.label} (Sens vers ${destLabel}) à la souris sur la carte.\nCliquez sur chaque virage de la rue, puis double-cliquez pour terminer le tracé.`);
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

            if (drawingTarget && currentEditorLignes[drawingTarget.lineIndex]) {
                const curLig = currentEditorLignes[drawingTarget.lineIndex];
                if (curLig[drawingTarget.dirKey]) {
                    curLig[drawingTarget.dirKey].coordsDeviation = coords;
                }
            }

            map.removeLayer(layer);
            map.off('pm:create', onDrawCreated);
            drawingTarget = null;

            // Mise à jour de la prévisualisation en direct sur la carte !
            updateDeviationPreview();

            toggleDeviationPanel(true);
            renderEditorLignesContainer();
            showSyncToast("✅ Tracé capturé et prévisualisé en direct sur la carte.");
        }
    };

    map.once('pm:create', onDrawCreated);
}

function openZoneEditor(zoneIdToEdit) {
    if (!isAdmin) {
        openAdminPinModal();
        return;
    }

    const viewList = document.getElementById('view-zones-list');
    const viewEdit = document.getElementById('view-zone-editor');
    if (!viewList || !viewEdit) return;

    currentlyEditingZoneId = zoneIdToEdit || null;
    drawingTarget = null;

    viewList.style.display = 'none';
    viewEdit.style.display = 'block';

    const titleEl = document.getElementById('editor-title-label');
    const nomInput = document.getElementById('edit-zone-nom');
    const descInput = document.getElementById('edit-zone-desc');
    const deleteBox = document.getElementById('editor-delete-box');

    if (deleteBox) {
        deleteBox.style.display = zoneIdToEdit ? 'block' : 'none';
    }

    currentEditorLignes = [];

    if (zoneIdToEdit && allDeviationsConfig) {
        const zone = allDeviationsConfig.zones.find(z => z.id === zoneIdToEdit);
        if (zone) {
            titleEl.textContent = `Modifier : ${zone.nom}`;
            nomInput.value = zone.nom || '';
            descInput.value = zone.description || '';

            if (Array.isArray(zone.lignesImpactees)) {
                zone.lignesImpactees.forEach(l => {
                    const cfgLigne = LIGNES_CONFIG.find(cfg => cfg.id === l.ref) || { label: l.ref, destinations: [] };
                    const dest1 = (cfgLigne.destinations && cfgLigne.destinations[0]) ? cfgLigne.destinations[0].to : "Aller";
                    const dest1Label = (cfgLigne.destinations && cfgLigne.destinations[0]) ? cfgLigne.destinations[0].label : "ALLER";
                    const dest2 = (cfgLigne.destinations && cfgLigne.destinations[1]) ? cfgLigne.destinations[1].to : "Retour";
                    const dest2Label = (cfgLigne.destinations && cfgLigne.destinations[1]) ? cfgLigne.destinations[1].label : "RETOUR";

                    const foundAller = (l.directions || []).find(d => d.to === dest1);
                    const foundRetour = (l.directions || []).find(d => d.to === dest2);

                    currentEditorLignes.push({
                        ref: l.ref,
                        label: l.label,
                        color: l.color,
                        textColor: l.textColor,
                        aller: {
                            enabled: !!foundAller,
                            to: dest1,
                            label: dest1Label,
                            dernierArret: foundAller ? (foundAller.dernierArret || '') : '',
                            prochainArret: foundAller ? (foundAller.prochainArret || '') : '',
                            arretsNonDesservis: foundAller && Array.isArray(foundAller.arretsNonDesservis) ? [...foundAller.arretsNonDesservis] : [],
                            itineraire: foundAller ? (foundAller.itineraire || '') : '',
                            coordsDeviation: foundAller && Array.isArray(foundAller.coordsDeviation) ? [...foundAller.coordsDeviation] : []
                        },
                        retour: {
                            enabled: !!foundRetour,
                            to: dest2,
                            label: dest2Label,
                            dernierArret: foundRetour ? (foundRetour.dernierArret || '') : '',
                            prochainArret: foundRetour ? (foundRetour.prochainArret || '') : '',
                            arretsNonDesservis: foundRetour && Array.isArray(foundRetour.arretsNonDesservis) ? [...foundRetour.arretsNonDesservis] : [],
                            itineraire: foundRetour ? (foundRetour.itineraire || '') : '',
                            coordsDeviation: foundRetour && Array.isArray(foundRetour.coordsDeviation) ? [...foundRetour.coordsDeviation] : []
                        },
                        texteInfoClient: l.texteInfoClient || ''
                    });
                });
            }
            renderEditorLignesContainer();
            return;
        }
    }

    titleEl.textContent = 'Nouveau secteur d’impact';
    nomInput.value = '';
    descInput.value = '';
    currentEditorLignes = [];
    previewDeviationLayer.clearLayers();
    renderEditorLignesContainer();
}

function editCurrentSelectedZone() {
    if (!isAdmin) {
        openAdminPinModal();
        return;
    }
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

    previewDeviationLayer.clearLayers();
    viewEdit.style.display = 'none';
    viewList.style.display = 'block';
    currentlyEditingZoneId = null;
    drawingTarget = null;
}

function deleteCurrentZoneFromEditor() {
    if (!currentlyEditingZoneId || !allDeviationsConfig) return;
    const targetZone = allDeviationsConfig.zones.find(z => z.id === currentlyEditingZoneId);
    const nomZone = targetZone ? targetZone.nom : "ce secteur";

    if (!confirm(`Confirmer la suppression définitive du secteur d'impact :\n« ${nomZone} » ?\n\nCette action sera immédiatement répercutée sur tous les écrans connectés.`)) {
        return;
    }

    allDeviationsConfig.zones = allDeviationsConfig.zones.filter(z => z.id !== currentlyEditingZoneId);
    activeZonesSet.delete(currentlyEditingZoneId);

    try {
        localStorage.setItem('besancon_live_deviations', JSON.stringify(allDeviationsConfig));
        localStorage.setItem('besancon_live_active_zones', JSON.stringify(Array.from(activeZonesSet)));
    } catch (e) {
        console.warn("Erreur sauvegarde :", e);
    }

    previewDeviationLayer.clearLayers();
    broadcastAppState();

    renderZonesList(allDeviationsConfig.zones);
    renderDeviationsOnMap();
    renderZoneDetailsPanel();
    closeZoneEditor();

    showSyncToast(`🗑️ Secteur « ${nomZone} » supprimé.`);
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

    // Reconstitution des lignes impactées avec directions Aller et/ou Retour
    targetZone.lignesImpactees = currentEditorLignes.map(lig => {
        const directionsArray = [];

        if (lig.aller && lig.aller.enabled) {
            directionsArray.push({
                to: lig.aller.to,
                dernierArret: lig.aller.dernierArret,
                prochainArret: lig.aller.prochainArret,
                arretsNonDesservis: lig.aller.arretsNonDesservis,
                itineraire: lig.aller.itineraire,
                coordsDeviation: lig.aller.coordsDeviation || []
            });
        }

        if (lig.retour && lig.retour.enabled) {
            directionsArray.push({
                to: lig.retour.to,
                dernierArret: lig.retour.dernierArret,
                prochainArret: lig.retour.prochainArret,
                arretsNonDesservis: lig.retour.arretsNonDesservis,
                itineraire: lig.retour.itineraire,
                coordsDeviation: lig.retour.coordsDeviation || []
            });
        }

        return {
            ref: lig.ref,
            label: lig.label,
            color: lig.color,
            textColor: lig.textColor,
            texteInfoClient: lig.texteInfoClient,
            directions: directionsArray
        };
    });

    try {
        localStorage.setItem('besancon_live_deviations', JSON.stringify(allDeviationsConfig));
        localStorage.setItem('besancon_live_active_zones', JSON.stringify(Array.from(activeZonesSet)));
    } catch (e) {
        console.warn("Erreur sauvegarde localStorage :", e);
    }

    previewDeviationLayer.clearLayers();
    broadcastAppState();

    renderZonesList(allDeviationsConfig.zones);
    renderDeviationsOnMap();
    renderZoneDetailsPanel();
    closeZoneEditor();

    showSyncToast("💾 Secteur d'impact enregistré et synchronisé !");
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
