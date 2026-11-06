// Axiom PNL Generator

// DOM Elements
const investedInput = document.getElementById('investedAmount');
const currentInput = document.getElementById('currentPosition');
const usernameInput = document.getElementById('usernameInput');
const coinNameInput = document.getElementById('coinNameInput');
const profilePicInput = document.getElementById('profilePicInput');

const profitDisplay = document.getElementById('profitDisplay');
const percentageDisplay = document.getElementById('percentageDisplay');

const coinNameDisplay = document.getElementById('coinNameDisplay');
const pnlContainer = document.getElementById('pnlContainer');
const pnlText = document.getElementById('pnlText');
const percentageVal = document.getElementById('percentageVal');
const investedVal = document.getElementById('investedVal');
const positionVal = document.getElementById('positionVal');
const profilePicDisplay = document.getElementById('profilePicDisplay');
const pfpBadgeContainer = document.getElementById('pfpBadgeContainer');
const usernameDisplay = document.getElementById('usernameDisplay');
const pnlCard = document.getElementById('pnlCard');
const cardWallpaperLayer = document.getElementById('cardWallpaperLayer');
const cardVideoLayer = document.getElementById('cardVideoLayer');
const cardDarkScrim = document.getElementById('cardDarkScrim');

const controlsPanel = document.getElementById('controlsPanel');
const imageSelectorModule = document.getElementById('imageSelectorModule');
const rippleContainer = document.getElementById('rippleContainer');

const btnTransparentBg = document.getElementById('btnTransparentBg');
const customMediaUpload = document.getElementById('customMediaUpload');
const volumeControlWrapper = document.getElementById('volumeControlWrapper');
const soundToggleBtn = document.getElementById('soundToggleBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumePercent = document.getElementById('volumePercent');
const volIconHigh = document.getElementById('volIconHigh');
const volIconLow = document.getElementById('volIconLow');
const volIconOff = document.getElementById('volIconOff');
const clearBgBtn = document.getElementById('clearBgBtn');

let currentVolume = 1.0;
let lastNonZeroVolume = 1.0;

let globalAudioCtx = null;
let globalSourceNode = null;
let globalStreamDest = null;
let globalMonitorGain = null;

function ensureAudioGraph() {
    if (!globalAudioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;
        globalAudioCtx = new AudioContextClass();
    }
    if (globalAudioCtx.state === 'suspended') {
        globalAudioCtx.resume().catch(() => {});
    }

    if (!globalSourceNode && cardVideoLayer) {
        try {
            globalSourceNode = globalAudioCtx.createMediaElementSource(cardVideoLayer);
            globalStreamDest = globalAudioCtx.createMediaStreamDestination();
            globalMonitorGain = globalAudioCtx.createGain();

            globalSourceNode.connect(globalStreamDest);
            globalSourceNode.connect(globalMonitorGain);
            globalMonitorGain.connect(globalAudioCtx.destination);
        } catch(err) {
            console.warn('createMediaElementSource error:', err);
        }
    }

    if (globalMonitorGain && globalAudioCtx) {
        const speakerVol = (bgState.isMuted || currentVolume === 0) ? 0 : currentVolume;
        try {
            globalMonitorGain.gain.setValueAtTime(speakerVol, globalAudioCtx.currentTime);
        } catch(e) {}
    }

    return globalStreamDest;
}

const tiktokUrlInput = document.getElementById('tiktokUrlInput');
const loadTiktokBtn = document.getElementById('loadTiktokBtn');
const tiktokStatus = document.getElementById('tiktokStatus');

const downloadMp4Btn = document.getElementById('downloadMp4Btn');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');
const hideUIBtn = document.getElementById('hideUIBtn');
const unhideHint = document.getElementById('unhideHint');
const coinPills = document.querySelectorAll('.coin-pill');
const borderPills = document.querySelectorAll('.border-pill');

// 5 Exact 1:1 Axiom Profile Borders & Crests
const PFP_BORDERS = {
    'cone': {
        name: 'Cone',
        color: '#dc2626',
        badge: 'cone',
        badgeWidth: 18,
        badgeHeight: 20,
        svg: `<svg class="pfp-badge-svg" width="18" height="20" viewBox="0 0 26 28" fill="none">
            <path d="M19.1384 10.3876H6.8623L13.0001 0.00012L19.1384 10.3876Z" fill="#dc2626"/>
            <path d="M26 22.0003L0 22.0003L4.96764 13.5933L21.0324 13.5933L26 22.0003Z" fill="#dc2626"/>
        </svg>`
    },
    'crown': {
        name: 'Crown',
        color: '#eab308',
        badge: 'crown',
        badgeWidth: 28,
        badgeHeight: 20,
        svg: `<svg class="pfp-badge-svg" width="28" height="20" viewBox="0 0 28 20" fill="none">
            <defs>
                <linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="20%" stop-color="#fef08a"/>
                    <stop offset="50%" stop-color="#facc15"/>
                    <stop offset="80%" stop-color="#ca8a04"/>
                    <stop offset="100%" stop-color="#854d0e"/>
                </linearGradient>
            </defs>
            <path d="M 8,20 C 6,17 2.5,13.5 1.5,6 C 3,8.5 4.5,9 6,8 C 7,6 8,3 9,0.5 C 10.5,5 12,8.5 14,9 C 16,8.5 17.5,5 19,0.5 C 20,3 21,6 22,8 C 23.5,9 25,8.5 26.5,6 C 25.5,13.5 22,17 20,20 Z" fill="url(#crownGrad)"/>
            <rect x="7.5" y="17.5" width="13" height="2.5" rx="1.2" fill="#facc15" stroke="#ca8a04" stroke-width="0.8"/>
        </svg>`
    },
    'diamond': {
        name: 'Diamond',
        color: '#38bdf8',
        badge: 'diamond',
        badgeWidth: 18,
        badgeHeight: 26,
        svg: `<svg class="pfp-badge-svg" width="18" height="26" viewBox="0 0 18 26" fill="none">
            <defs>
                <linearGradient id="diaTopL" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="100%" stop-color="#bae6fd"/>
                </linearGradient>
                <linearGradient id="diaTopR" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#e0f2fe"/>
                    <stop offset="100%" stop-color="#38bdf8"/>
                </linearGradient>
                <linearGradient id="diaBotL" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#7dd3fc"/>
                    <stop offset="100%" stop-color="#0284c7"/>
                </linearGradient>
                <linearGradient id="diaBotR" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#38bdf8"/>
                    <stop offset="100%" stop-color="#075985"/>
                </linearGradient>
                <filter id="diaGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <g filter="url(#diaGlow)">
                <polygon points="9,0.5 1,8.5 9,8.5" fill="url(#diaTopL)"/>
                <polygon points="9,0.5 17,8.5 9,8.5" fill="url(#diaTopR)"/>
                <polygon points="1,8.5 9,25.5 9,8.5" fill="url(#diaBotL)"/>
                <polygon points="17,8.5 9,25.5 9,8.5" fill="url(#diaBotR)"/>
                <line x1="9" y1="0.5" x2="9" y2="25.5" stroke="#ffffff" stroke-width="0.9"/>
                <line x1="1" y1="8.5" x2="17" y2="8.5" stroke="rgba(255,255,255,0.75)" stroke-width="0.7"/>
                <polygon points="9,0.5 17,8.5 9,25.5 1,8.5" fill="none" stroke="#7dd3fc" stroke-width="0.8"/>
            </g>
        </svg>`
    },
    'wings': {
        name: 'Wings',
        color: '#93c5fd',
        badge: 'wings',
        badgeWidth: 36,
        badgeHeight: 28,
        svg: `<svg class="pfp-badge-svg" width="36" height="28" viewBox="0 0 36 28" fill="none">
            <defs>
                <linearGradient id="wingGradMainL" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="25%" stop-color="#dbeafe"/>
                    <stop offset="65%" stop-color="#93c5fd"/>
                    <stop offset="100%" stop-color="#2563eb"/>
                </linearGradient>
                <linearGradient id="wingGradMainR" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="25%" stop-color="#dbeafe"/>
                    <stop offset="65%" stop-color="#93c5fd"/>
                    <stop offset="100%" stop-color="#2563eb"/>
                </linearGradient>
                <linearGradient id="wingGradInnerL" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="40%" stop-color="#bae6fd"/>
                    <stop offset="100%" stop-color="#1d4ed8"/>
                </linearGradient>
                <linearGradient id="wingGradInnerR" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="40%" stop-color="#bae6fd"/>
                    <stop offset="100%" stop-color="#1d4ed8"/>
                </linearGradient>
            </defs>
            <!-- Left Secondary / Inner Wing -->
            <path d="M 18,27 C 16,21 13.5,13 11,4 C 9.5,8 8,14 11.5,19 C 13.5,22 16,25 18,27 Z" fill="url(#wingGradInnerL)"/>
            <!-- Right Secondary / Inner Wing -->
            <path d="M 18,27 C 20,21 22.5,13 25,4 C 26.5,8 28,14 24.5,19 C 22.5,22 20,25 18,27 Z" fill="url(#wingGradInnerR)"/>
            <!-- Left Primary / Outer Wing -->
            <path d="M 18,27 C 15.5,20 10.5,10 5,0 C 2.5,6 0.5,10 0.5,13 L 3.5,14.5 C 2.5,17.5 4.5,21 7,23 C 10.5,25 14.5,26.5 18,27 Z" fill="url(#wingGradMainL)"/>
            <!-- Right Primary / Outer Wing -->
            <path d="M 18,27 C 20.5,20 25.5,10 31,0 C 33.5,6 35.5,10 35.5,13 L 32.5,14.5 C 33.5,17.5 31.5,21 29,23 C 25.5,25 21.5,26.5 18,27 Z" fill="url(#wingGradMainR)"/>
            <!-- Center Jewel Base -->
            <polygon points="18,13 13,19.5 18,27 23,19.5" fill="#ffffff" stroke="#93c5fd" stroke-width="0.8"/>
            <polygon points="18,15 14.5,20 18,25.5 21.5,20" fill="#dbeafe"/>
        </svg>`
    },
    'tag': {
        name: 'Tag',
        color: '#c99a58',
        badge: 'tag',
        badgeWidth: 16,
        badgeHeight: 20,
        svg: `<svg class="pfp-badge-svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
            <defs>
                <linearGradient id="tagGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#fef08a"/>
                    <stop offset="45%" stop-color="#d4af37"/>
                    <stop offset="100%" stop-color="#854d0e"/>
                </linearGradient>
                <linearGradient id="tagSlotGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#543c16"/>
                    <stop offset="50%" stop-color="#7a5520"/>
                    <stop offset="100%" stop-color="#9a6e2c"/>
                </linearGradient>
            </defs>
            <rect x="0.5" y="0.5" width="15" height="19" rx="6" fill="url(#tagGrad)" stroke="#fef08a" stroke-width="0.8"/>
            <rect x="5" y="4.5" width="6" height="11" rx="3" fill="url(#tagSlotGrad)" stroke="#543c16" stroke-width="0.8"/>
        </svg>`
    },
    'none': {
        name: 'None',
        color: null,
        badge: null,
        svg: ''
    }
};

let selectedPfpBorder = 'cone';

// Background State: 'transparent' or 'media'
const bgState = {
    mode: 'transparent',
    isVideo: false,
    url: '',
    imageObj: null,
    isMuted: false
};

let isUIHidden = false;

function formatUsername(val) {
    if (!val) return '@luckysta';
    let clean = val.trim();
    if (!clean.startsWith('@')) {
        clean = '@' + clean;
    }
    return clean;
}

// Format numbers
function formatCompactNumber(num) {
    const abs = Math.abs(num);
    if (abs >= 1000000) {
        return (abs / 1000000).toFixed(2) + 'M';
    }
    if (abs >= 1000) {
        return (abs / 1000).toFixed(2) + 'K';
    }
    return abs.toFixed(2);
}

function formatCurrency(amount) {
    const formatted = formatCompactNumber(amount);
    return amount >= 0 ? `+$${formatted}` : `-$${formatted}`;
}

function formatPercentage(percentage) {
    const formatted = Math.abs(percentage).toFixed(2);
    return percentage >= 0 ? `+${formatted}%` : `-${formatted}%`;
}

// Calculate PNL
function calculatePNL() {
    const invested = parseFloat(investedInput.value) || 0;
    const current = parseFloat(currentInput.value) || 0;
    const profit = current - invested;
    const percentage = invested > 0 ? ((profit / invested) * 100) : 0;
    const isProfit = profit >= 0;
    return { invested, current, profit, percentage, isProfit };
}

// Update card and side panel displays
function updateDisplay() {
    const { invested, current, profit, percentage, isProfit } = calculatePNL();

    // Control panel indicators
    profitDisplay.textContent = formatCurrency(profit);
    profitDisplay.className = `calc-value ${isProfit ? 'profit' : 'loss'}`;

    percentageDisplay.textContent = formatPercentage(percentage);
    percentageDisplay.className = `calc-value ${isProfit ? 'profit' : 'loss'}`;

    // Card values
    pnlText.textContent = formatCurrency(profit);
    pnlContainer.className = `pnl-number-container ${isProfit ? 'profit' : 'loss'}`;

    percentageVal.textContent = formatPercentage(percentage);
    percentageVal.className = `stat-value val-percentage ${isProfit ? 'profit' : 'loss'}`;

    investedVal.textContent = `$${formatCompactNumber(invested)}`;
    positionVal.textContent = `$${formatCompactNumber(current)}`;

    pnlCard.classList.toggle('profit', isProfit);
    pnlCard.classList.toggle('loss', !isProfit);

    applyBackgroundMode();
}

function applyBackgroundMode() {
    const cardWrapper = document.querySelector('.card-wrapper');

    if (bgState.mode === 'transparent') {
        pnlCard.classList.add('transparent-theme');
        if (cardWrapper) cardWrapper.classList.add('transparent-active');

        if (cardVideoLayer) {
            cardVideoLayer.pause();
            cardVideoLayer.removeAttribute('src');
            cardVideoLayer.load();
            cardVideoLayer.style.display = 'none';
        }
        if (cardWallpaperLayer) {
            cardWallpaperLayer.style.backgroundImage = 'none';
        }
        if (cardDarkScrim) {
            cardDarkScrim.style.display = 'none';
        }

        btnTransparentBg.classList.add('active');
        clearBgBtn.style.display = 'none';
        if (downloadMp4Btn) downloadMp4Btn.style.display = 'none';
    } else {
        pnlCard.classList.remove('transparent-theme');
        if (cardWrapper) cardWrapper.classList.remove('transparent-active');
        btnTransparentBg.classList.remove('active');
        clearBgBtn.style.display = 'inline-flex';

        if (bgState.isVideo) {
            if (cardWallpaperLayer) cardWallpaperLayer.style.backgroundImage = 'none';
            if (cardVideoLayer) {
                cardVideoLayer.style.display = 'block';
                cardVideoLayer.playsInline = true;
                cardVideoLayer.setAttribute('playsinline', '');
                cardVideoLayer.setAttribute('webkit-playsinline', '');

                const srcChanged = cardVideoLayer.src !== bgState.url;
                if (srcChanged) {
                    cardVideoLayer.src = bgState.url;
                    try { cardVideoLayer.load(); } catch(e) {}
                }

                // Autoplay on iOS WebKit requires starting muted
                cardVideoLayer.muted = true;
                const playPromise = cardVideoLayer.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        if (!bgState.isMuted && currentVolume > 0) {
                            cardVideoLayer.muted = false;
                            cardVideoLayer.volume = currentVolume;
                        }
                    }).catch(() => {
                        // Keep muted playback if unmuted failed
                        cardVideoLayer.muted = true;
                        cardVideoLayer.play().catch(() => {});
                    });
                }
            }
            if (downloadMp4Btn) downloadMp4Btn.style.display = 'inline-flex';
            updateVolumeUI(bgState.isMuted ? 0 : Math.round(currentVolume * 100));
        } else {
            if (cardVideoLayer) {
                cardVideoLayer.pause();
                cardVideoLayer.removeAttribute('src');
                try { cardVideoLayer.load(); } catch(e) {}
                cardVideoLayer.style.display = 'none';
            }
            if (cardWallpaperLayer) {
                cardWallpaperLayer.style.backgroundImage = `url('${bgState.url}')`;
            }
            if (downloadMp4Btn) downloadMp4Btn.style.display = 'none';
        }

        if (cardDarkScrim) {
            cardDarkScrim.style.display = 'block';
        }
    }
}

// Reset background to transparent
function setTransparentBackground() {
    bgState.mode = 'transparent';
    bgState.isVideo = false;
    bgState.url = '';
    bgState.imageObj = null;

    if (tiktokStatus) {
        tiktokStatus.textContent = '';
        tiktokStatus.className = 'tiktok-status-msg';
    }
    if (tiktokUrlInput) {
        tiktokUrlInput.value = '';
    }

    applyBackgroundMode();
}

// Update volume & sound button UI
function updateVolumeUI(val) {
    const num = Math.round(Number(val));
    if (volumeSlider) {
        volumeSlider.value = num;
        volumeSlider.style.background = `linear-gradient(to right, #3b82f6 0%, #60a5fa ${num}%, rgba(255, 255, 255, 0.15) ${num}%, rgba(255, 255, 255, 0.15) 100%)`;
    }
    if (volumePercent) {
        volumePercent.textContent = `${num}%`;
    }

    const isMuted = num === 0 || bgState.isMuted;
    if (soundToggleBtn) {
        soundToggleBtn.classList.toggle('muted', isMuted);
    }

    if (volIconHigh && volIconLow && volIconOff) {
        if (isMuted) {
            volIconHigh.style.display = 'none';
            volIconLow.style.display = 'none';
            volIconOff.style.display = 'block';
        } else if (num <= 50) {
            volIconHigh.style.display = 'none';
            volIconLow.style.display = 'block';
            volIconOff.style.display = 'none';
        } else {
            volIconHigh.style.display = 'block';
            volIconLow.style.display = 'none';
            volIconOff.style.display = 'none';
        }
    }
}

// Set page volume (0..100)
function setPageVolume(val) {
    const num = Math.min(Math.max(Number(val), 0), 100);
    currentVolume = num / 100;

    if (currentVolume > 0) {
        lastNonZeroVolume = currentVolume;
        bgState.isMuted = false;
        if (cardVideoLayer) {
            cardVideoLayer.muted = false;
            cardVideoLayer.volume = currentVolume;
        }
    } else {
        bgState.isMuted = true;
        if (cardVideoLayer) {
            cardVideoLayer.muted = true;
            cardVideoLayer.volume = 0;
        }
    }

    if (globalMonitorGain && globalAudioCtx) {
        try {
            globalMonitorGain.gain.setValueAtTime(bgState.isMuted ? 0 : currentVolume, globalAudioCtx.currentTime);
        } catch(e) {}
    }

    updateVolumeUI(num);

    try {
        localStorage.setItem('axiom-pnl-volume', num);
    } catch(e) {}
}

// Toggle sound / mute
function toggleSound() {
    if (bgState.isMuted || currentVolume === 0) {
        const restoreNum = Math.round((lastNonZeroVolume || 1.0) * 100);
        setPageVolume(restoreNum);
    } else {
        lastNonZeroVolume = currentVolume > 0 ? currentVolume : 1.0;
        bgState.isMuted = true;
        if (globalMonitorGain && globalAudioCtx) {
            try {
                globalMonitorGain.gain.setValueAtTime(0, globalAudioCtx.currentTime);
            } catch(e) {}
        }
        if (cardVideoLayer) {
            cardVideoLayer.muted = true;
        }
        updateVolumeUI(0);
    }
}

// Handle Custom Media Upload (Image, GIF, MP4, WebM, MOV)
function handleMediaUpload(file) {
    if (!file) return;

    const fileType = (file.type || '').toLowerCase();
    const fileName = (file.name || '').toLowerCase();
    const isVideo = fileType.startsWith('video/') ||
                    fileType === 'video/quicktime' ||
                    fileType === 'video/mp4' ||
                    /\.(mp4|webm|mov|m4v|ogg|qt)$/i.test(fileName);

    if (isVideo) {
        if (bgState.url && bgState.url.startsWith('blob:')) {
            try { URL.revokeObjectURL(bgState.url); } catch(e) {}
        }
        const videoUrl = URL.createObjectURL(file);
        bgState.mode = 'media';
        bgState.isVideo = true;
        bgState.url = videoUrl;
        bgState.isMuted = currentVolume === 0;
        bgState.imageObj = null;

        if (tiktokStatus) {
            tiktokStatus.textContent = `Loaded video: ${file.name || 'video'}`;
            tiktokStatus.className = 'tiktok-status-msg success';
        }

        applyBackgroundMode();
    } else {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            const img = new Image();
            img.onload = () => {
                if (bgState.url && bgState.url.startsWith('blob:')) {
                    try { URL.revokeObjectURL(bgState.url); } catch(err) {}
                }
                bgState.mode = 'media';
                bgState.isVideo = false;
                bgState.url = dataUrl;
                bgState.imageObj = img;
                bgState.isMuted = true;

                if (tiktokStatus) {
                    tiktokStatus.textContent = `Loaded image: ${file.name || 'image'}`;
                    tiktokStatus.className = 'tiktok-status-msg success';
                }

                applyBackgroundMode();
            };
            img.src = dataUrl;
        };
        reader.readAsDataURL(file);
    }
}

// Fetch video as local Blob to prevent CORS / tainted canvas issues
async function fetchVideoAsBlob(videoUrl) {
    // 1. Direct fetch
    try {
        const res = await fetch(videoUrl, { mode: 'cors' });
        if (res.ok) {
            const blob = await res.blob();
            if (blob.size > 1000) return blob;
        }
    } catch(e) {}

    // 2. CORS Proxy 1
    try {
        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(videoUrl)}`);
        if (res.ok) {
            const blob = await res.blob();
            if (blob.size > 1000) return blob;
        }
    } catch(e) {}

    // 3. CORS Proxy 2
    try {
        const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(videoUrl)}`);
        if (res.ok) {
            const blob = await res.blob();
            if (blob.size > 1000) return blob;
        }
    } catch(e) {}

    return null;
}

// Resolve TikTok URL
async function resolveTikTok(rawUrl) {
    const url = rawUrl.trim();
    if (!url) return;

    // Direct MP4 / Video link
    if (/\.(mp4|webm|mov)($|\?)/i.test(url)) {
        tiktokStatus.textContent = 'Loading video stream...';
        tiktokStatus.className = 'tiktok-status-msg loading';
        loadTiktokBtn.disabled = true;

        const blob = await fetchVideoAsBlob(url);
        const resolvedUrl = blob ? URL.createObjectURL(blob) : url;

        bgState.mode = 'media';
        bgState.isVideo = true;
        bgState.url = resolvedUrl;
        bgState.isMuted = false;
        applyBackgroundMode();

        tiktokStatus.textContent = 'Video loaded with sound!';
        tiktokStatus.className = 'tiktok-status-msg success';
        loadTiktokBtn.disabled = false;
        return;
    }

    tiktokStatus.textContent = 'Fetching TikTok video...';
    tiktokStatus.className = 'tiktok-status-msg loading';
    loadTiktokBtn.disabled = true;

    try {
        // 1. TikWM API
        const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        let videoSrc = null;
        if (data && data.code === 0 && data.data) {
            videoSrc = data.data.play || data.data.wmplay || data.data.music;
        }

        // 2. Fallback API
        if (!videoSrc) {
            const fbRes = await fetch(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`);
            const fbData = await fbRes.json();
            if (fbData && fbData.video && fbData.video.noWatermark) {
                videoSrc = fbData.video.noWatermark;
            }
        }

        if (!videoSrc) {
            throw new Error('Could not extract video stream.');
        }

        tiktokStatus.textContent = 'Downloading video stream...';

        // Fetch as blob for 100% same-origin canvas support
        const blob = await fetchVideoAsBlob(videoSrc);
        const finalUrl = blob ? URL.createObjectURL(blob) : videoSrc;

        bgState.mode = 'media';
        bgState.isVideo = true;
        bgState.url = finalUrl;
        bgState.isMuted = currentVolume === 0;

        applyBackgroundMode();

        tiktokStatus.textContent = 'TikTok loaded with sound!';
        tiktokStatus.className = 'tiktok-status-msg success';
    } catch(err) {
        console.error('TikTok resolve error:', err);
        tiktokStatus.textContent = 'Failed to load TikTok. Paste direct MP4 link or upload file.';
        tiktokStatus.className = 'tiktok-status-msg error';
    } finally {
        loadTiktokBtn.disabled = false;
    }
}

// Profile border switcher
function setPfpBorder(borderKey) {
    selectedPfpBorder = borderKey;
    const borderConfig = PFP_BORDERS[borderKey] || PFP_BORDERS['cone'];

    const pfpFrame = document.getElementById('pfpFrame');
    const pfpBadgeCrest = document.getElementById('pfpBadgeCrest');

    if (pfpFrame) {
        if (borderConfig.color) {
            pfpFrame.classList.remove('no-border');
            pfpFrame.style.borderColor = borderConfig.color;
        } else {
            pfpFrame.classList.add('no-border');
        }
    }

    if (pfpBadgeCrest) {
        pfpBadgeCrest.className = `pfp-badge-crest crest-${borderKey}`;
        pfpBadgeCrest.innerHTML = borderConfig.svg || '';
    }

    borderPills.forEach(pill => {
        pill.classList.toggle('active', pill.dataset.border === borderKey);
    });

    try {
        localStorage.setItem('axiom-pnl-pfp-border', borderKey);
    } catch(e) {}
}

// Toggle UI
function toggleUI(show) {
    isUIHidden = !show;
    if (isUIHidden) {
        controlsPanel.classList.add('hidden');
        imageSelectorModule.classList.add('hidden');
        if (rippleContainer) rippleContainer.style.display = 'none';
        unhideHint.classList.add('visible');
    } else {
        controlsPanel.classList.remove('hidden');
        imageSelectorModule.classList.remove('hidden');
        if (rippleContainer) rippleContainer.style.display = 'block';
        unhideHint.classList.remove('visible');
    }
}

// Draw Native Vector Overlay Layers on any Canvas
function drawOverlayOnCanvas(ctx, w, h, pfpImg) {
    const { isProfit } = calculatePNL();

    // 1. Axiom White Pyramid Logo (Top-Left only)
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.translate(30, 26);
    const logoScale = 54 / 36;
    ctx.scale(logoScale, logoScale);

    ctx.beginPath();
    ctx.moveTo(24.1384, 17.3876);
    ctx.lineTo(11.8623, 17.3876);
    ctx.lineTo(18.0001, 7.00012);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(31, 29.0003);
    ctx.lineTo(5, 29.0003);
    ctx.lineTo(9.96764, 20.5933);
    ctx.lineTo(26.0324, 20.5933);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 2. Top-Right: AXIOM only (44px, font 400)
    ctx.save();
    ctx.textBaseline = 'top';
    ctx.font = "400 44px 'Inter', 'Geist', sans-serif";
    ctx.fillStyle = '#ffffff';
    const axiomWidth = ctx.measureText('AXIOM').width;
    const brandRightEdge = w - 36;
    const brandStartX = brandRightEdge - axiomWidth;
    ctx.fillText('AXIOM', brandStartX, 34);
    ctx.restore();

    // 3. Coin Name (x=38, y=96)
    ctx.save();
    let coinFontSize = 42;
    ctx.font = `400 ${coinFontSize}px 'Geist', sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    while (ctx.measureText(coinNameDisplay.textContent).width > 480 && coinFontSize > 22) {
        coinFontSize -= 2;
        ctx.font = `400 ${coinFontSize}px 'Geist', sans-serif`;
    }
    ctx.fillText(coinNameDisplay.textContent, 38, 96 + (42 - coinFontSize) * 0.3);
    ctx.restore();

    // 4. PNL Amount Box (Ostre kąty - 1:1, x=34, y=156, w=386, h=75)
    ctx.save();
    const boxX = 34;
    const boxY = 156;
    const boxW = 386;
    const boxH = 75;

    ctx.fillStyle = isProfit ? '#2edda8' : '#ec397a';
    ctx.fillRect(boxX, boxY, boxW, boxH);

    ctx.font = "700 50px 'Geist', 'Inter', sans-serif";
    ctx.fillStyle = '#0a0d14';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText(pnlText.textContent, boxX + 22, boxY + (boxH / 2));
    ctx.restore();

    // 5. Stats Table (PNL, Invested, Position: x=56, y=286, 326, 366 - font 400)
    ctx.save();
    const statsX = 56;
    const statsW = 364;
    const statsRows = [
        { label: 'PNL', val: percentageVal.textContent, color: isProfit ? '#2edda8' : '#ec397a', y: 286 },
        { label: 'Invested', val: investedVal.textContent, color: '#ffffff', y: 326 },
        { label: 'Position', val: positionVal.textContent, color: '#ffffff', y: 366 }
    ];

    statsRows.forEach(row => {
        ctx.font = "400 22px 'Inter', 'Geist', sans-serif";
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        ctx.fillText(row.label, statsX, row.y);

        ctx.font = "400 24px 'Geist', 'Inter', sans-serif";
        ctx.fillStyle = row.color;
        ctx.textAlign = 'right';
        ctx.fillText(row.val, statsX + statsW, row.y);
    });
    ctx.restore();

    // 6. Profile Section (x=31, y=414, pfpSize=46)
    ctx.save();
    const pfpX = 31;
    const pfpY = 414;
    const pfpSize = 46;
    const borderConfig = PFP_BORDERS[selectedPfpBorder] || PFP_BORDERS['cone'];

    if (borderConfig.color) {
        const frameRadius = 6;
        const borderWidth = 2;
        const borderInset = borderWidth / 2;
        const pad = 2;

        // Dark background fill
        ctx.fillStyle = '#080b11';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(pfpX, pfpY, pfpSize, pfpSize, frameRadius);
        else ctx.rect(pfpX, pfpY, pfpSize, pfpSize);
        ctx.fill();

        // Outer rounded border stroke
        ctx.strokeStyle = borderConfig.color;
        ctx.lineWidth = borderWidth;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(pfpX + borderInset, pfpY + borderInset, pfpSize - borderWidth, pfpSize - borderWidth, frameRadius - 0.5);
        else ctx.rect(pfpX + borderInset, pfpY + borderInset, pfpSize - borderWidth, pfpSize - borderWidth);
        ctx.stroke();

        // Avatar image inside with sharp corners (ostre rogi: 0px radius), mathematically centered
        if (pfpImg && pfpImg.naturalWidth > 0) {
            const innerOffset = borderWidth + pad; // exactly 4px margin on all 4 sides
            const innerX = pfpX + innerOffset;
            const innerY = pfpY + innerOffset;
            const innerSize = pfpSize - (innerOffset * 2); // 38x38 square
            ctx.save();
            ctx.beginPath();
            ctx.rect(innerX, innerY, innerSize, innerSize); // Sharp 90-degree corners
            ctx.clip();
            ctx.drawImage(pfpImg, innerX, innerY, innerSize, innerSize);
            ctx.restore();
        }

        // Top Crest attached to the top border line
        const topEdgeY = pfpY;
        const bXCenter = pfpX + (pfpSize / 2);

        if (borderConfig.badge === 'cone') {
            // Smaller Red Axiom Logo with increased border gap
            const cW = 18;
            const scale = 18 / 26;
            const logoH = 22 * scale;
            const borderGap = 3.8;
            const cTop = topEdgeY - borderGap - logoH;

            ctx.save();
            ctx.translate(bXCenter - (cW / 2), cTop);
            ctx.scale(scale, scale);
            ctx.fillStyle = '#dc2626';

            // Top Triangle (exact Axiom logo vector)
            ctx.beginPath();
            ctx.moveTo(19.1384, 10.3876);
            ctx.lineTo(6.8623, 10.3876);
            ctx.lineTo(13.0001, 0.00012);
            ctx.closePath();
            ctx.fill();

            // Bottom Trapezoid (exact Axiom logo vector)
            ctx.beginPath();
            ctx.moveTo(26, 22.0003);
            ctx.lineTo(0, 22.0003);
            ctx.lineTo(4.96764, 13.5933);
            ctx.lineTo(21.0324, 13.5933);
            ctx.closePath();
            ctx.fill();

            ctx.restore();

        } else if (borderConfig.badge === 'crown') {
            const cW = 28, cH = 20;
            const cLeft = bXCenter - (cW / 2);
            const cTop = topEdgeY - cH + 1;

            ctx.save();
            ctx.translate(cLeft, cTop);
            const crownGrad = ctx.createLinearGradient(0, 0, 0, cH);
            crownGrad.addColorStop(0, '#fffbeb');
            crownGrad.addColorStop(0.2, '#fef08a');
            crownGrad.addColorStop(0.5, '#facc15');
            crownGrad.addColorStop(0.8, '#ca8a04');
            crownGrad.addColorStop(1, '#854d0e');
            ctx.fillStyle = crownGrad;

            ctx.beginPath();
            ctx.moveTo(8, 20);
            ctx.bezierCurveTo(6, 17, 2.5, 13.5, 1.5, 6);
            ctx.bezierCurveTo(3, 8.5, 4.5, 9, 6, 8);
            ctx.bezierCurveTo(7, 6, 8, 3, 9, 0.5);
            ctx.bezierCurveTo(10.5, 5, 12, 8.5, 14, 9);
            ctx.bezierCurveTo(16, 8.5, 17.5, 5, 19, 0.5);
            ctx.bezierCurveTo(20, 3, 21, 6, 22, 8);
            ctx.bezierCurveTo(23.5, 9, 25, 8.5, 26.5, 6);
            ctx.bezierCurveTo(25.5, 13.5, 22, 17, 20, 20);
            ctx.closePath();
            ctx.fill();

            // Diadem rim
            ctx.fillStyle = '#facc15';
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(7.5, 17.5, 13, 2.5, 1.2);
            else ctx.rect(7.5, 17.5, 13, 2.5);
            ctx.fill();
            ctx.strokeStyle = '#ca8a04';
            ctx.lineWidth = 0.8;
            ctx.stroke();

            ctx.restore();

        } else if (borderConfig.badge === 'diamond') {
            const dW = 18, dH = 26;
            const dLeft = bXCenter - (dW / 2);
            const dTop = topEdgeY - dH + 1;

            ctx.save();
            ctx.shadowColor = 'rgba(56, 189, 248, 0.75)';
            ctx.shadowBlur = 8;

            // 1. Top-Left Facet
            const gTopL = ctx.createLinearGradient(dLeft, dTop, dLeft + 9, dTop + 8.5);
            gTopL.addColorStop(0, '#ffffff');
            gTopL.addColorStop(1, '#bae6fd');
            ctx.fillStyle = gTopL;
            ctx.beginPath();
            ctx.moveTo(dLeft + 9, dTop + 0.5);
            ctx.lineTo(dLeft + 1, dTop + 8.5);
            ctx.lineTo(dLeft + 9, dTop + 8.5);
            ctx.closePath();
            ctx.fill();

            // 2. Top-Right Facet
            const gTopR = ctx.createLinearGradient(dLeft + 18, dTop, dLeft + 9, dTop + 8.5);
            gTopR.addColorStop(0, '#e0f2fe');
            gTopR.addColorStop(1, '#38bdf8');
            ctx.fillStyle = gTopR;
            ctx.beginPath();
            ctx.moveTo(dLeft + 9, dTop + 0.5);
            ctx.lineTo(dLeft + 17, dTop + 8.5);
            ctx.lineTo(dLeft + 9, dTop + 8.5);
            ctx.closePath();
            ctx.fill();

            // 3. Bottom-Left Facet
            const gBotL = ctx.createLinearGradient(dLeft + 1, dTop + 8.5, dLeft + 9, dTop + 25.5);
            gBotL.addColorStop(0, '#7dd3fc');
            gBotL.addColorStop(1, '#0284c7');
            ctx.fillStyle = gBotL;
            ctx.beginPath();
            ctx.moveTo(dLeft + 1, dTop + 8.5);
            ctx.lineTo(dLeft + 9, dTop + 25.5);
            ctx.lineTo(dLeft + 9, dTop + 8.5);
            ctx.closePath();
            ctx.fill();

            // 4. Bottom-Right Facet
            const gBotR = ctx.createLinearGradient(dLeft + 17, dTop + 8.5, dLeft + 9, dTop + 25.5);
            gBotR.addColorStop(0, '#38bdf8');
            gBotR.addColorStop(1, '#075985');
            ctx.fillStyle = gBotR;
            ctx.beginPath();
            ctx.moveTo(dLeft + 17, dTop + 8.5);
            ctx.lineTo(dLeft + 9, dTop + 25.5);
            ctx.lineTo(dLeft + 9, dTop + 8.5);
            ctx.closePath();
            ctx.fill();

            // Facet Divider lines
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(dLeft + 9, dTop + 0.5);
            ctx.lineTo(dLeft + 9, dTop + 25.5);
            ctx.stroke();

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(dLeft + 1, dTop + 8.5);
            ctx.lineTo(dLeft + 17, dTop + 8.5);
            ctx.stroke();

            // Outer Facet Rim
            ctx.strokeStyle = '#7dd3fc';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(dLeft + 9, dTop + 0.5);
            ctx.lineTo(dLeft + 17, dTop + 8.5);
            ctx.lineTo(dLeft + 9, dTop + 25.5);
            ctx.lineTo(dLeft + 1, dTop + 8.5);
            ctx.closePath();
            ctx.stroke();

            ctx.restore();

        } else if (borderConfig.badge === 'wings') {
            const wW = 36, wH = 28;
            const wLeft = bXCenter - (wW / 2);
            const wTop = topEdgeY - wH + 1;

            ctx.save();
            ctx.translate(wLeft, wTop);

            // Left inner wing gradient
            const gInnerL = ctx.createLinearGradient(11, 4, 18, 27);
            gInnerL.addColorStop(0, '#ffffff');
            gInnerL.addColorStop(0.4, '#bae6fd');
            gInnerL.addColorStop(1, '#1d4ed8');
            ctx.fillStyle = gInnerL;
            ctx.beginPath();
            ctx.moveTo(18, 27);
            ctx.bezierCurveTo(16, 21, 13.5, 13, 11, 4);
            ctx.bezierCurveTo(9.5, 8, 8, 14, 11.5, 19);
            ctx.bezierCurveTo(13.5, 22, 16, 25, 18, 27);
            ctx.closePath();
            ctx.fill();

            // Right inner wing gradient
            const gInnerR = ctx.createLinearGradient(25, 4, 18, 27);
            gInnerR.addColorStop(0, '#ffffff');
            gInnerR.addColorStop(0.4, '#bae6fd');
            gInnerR.addColorStop(1, '#1d4ed8');
            ctx.fillStyle = gInnerR;
            ctx.beginPath();
            ctx.moveTo(18, 27);
            ctx.bezierCurveTo(20, 21, 22.5, 13, 25, 4);
            ctx.bezierCurveTo(26.5, 8, 28, 14, 24.5, 19);
            ctx.bezierCurveTo(22.5, 22, 20, 25, 18, 27);
            ctx.closePath();
            ctx.fill();

            // Left outer wing gradient
            const gMainL = ctx.createLinearGradient(5, 0, 18, 27);
            gMainL.addColorStop(0, '#ffffff');
            gMainL.addColorStop(0.25, '#dbeafe');
            gMainL.addColorStop(0.65, '#93c5fd');
            gMainL.addColorStop(1, '#2563eb');
            ctx.fillStyle = gMainL;
            ctx.beginPath();
            ctx.moveTo(18, 27);
            ctx.bezierCurveTo(15.5, 20, 10.5, 10, 5, 0);
            ctx.bezierCurveTo(2.5, 6, 0.5, 10, 0.5, 13);
            ctx.lineTo(3.5, 14.5);
            ctx.bezierCurveTo(2.5, 17.5, 4.5, 21, 7, 23);
            ctx.bezierCurveTo(10.5, 25, 14.5, 26.5, 18, 27);
            ctx.closePath();
            ctx.fill();

            // Right outer wing gradient
            const gMainR = ctx.createLinearGradient(31, 0, 18, 27);
            gMainR.addColorStop(0, '#ffffff');
            gMainR.addColorStop(0.25, '#dbeafe');
            gMainR.addColorStop(0.65, '#93c5fd');
            gMainR.addColorStop(1, '#2563eb');
            ctx.fillStyle = gMainR;
            ctx.beginPath();
            ctx.moveTo(18, 27);
            ctx.bezierCurveTo(20.5, 20, 25.5, 10, 31, 0);
            ctx.bezierCurveTo(33.5, 6, 35.5, 10, 35.5, 13);
            ctx.lineTo(32.5, 14.5);
            ctx.bezierCurveTo(33.5, 17.5, 31.5, 21, 29, 23);
            ctx.bezierCurveTo(25.5, 25, 21.5, 26.5, 18, 27);
            ctx.closePath();
            ctx.fill();

            // Center jewel
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(18, 13);
            ctx.lineTo(13, 19.5);
            ctx.lineTo(18, 27);
            ctx.lineTo(23, 19.5);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#93c5fd';
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Inner jewel facet
            ctx.fillStyle = '#dbeafe';
            ctx.beginPath();
            ctx.moveTo(18, 15);
            ctx.lineTo(14.5, 20);
            ctx.lineTo(18, 25.5);
            ctx.lineTo(21.5, 20);
            ctx.closePath();
            ctx.fill();

            ctx.restore();

        } else if (borderConfig.badge === 'tag') {
            const tW = 16, tH = 20;
            const tLeft = bXCenter - (tW / 2);
            const tTop = topEdgeY - tH + 1;

            // Outer loop
            const tagGrad = ctx.createLinearGradient(tLeft, tTop, tLeft + tW, topEdgeY + 1);
            tagGrad.addColorStop(0, '#fef08a');
            tagGrad.addColorStop(0.45, '#d4af37');
            tagGrad.addColorStop(1, '#854d0e');
            ctx.fillStyle = tagGrad;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(tLeft + 0.5, tTop + 0.5, 15, 19, 6);
            else ctx.rect(tLeft + 0.5, tTop + 0.5, 15, 19);
            ctx.fill();
            ctx.strokeStyle = '#fef08a';
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Inner slot - warm recessed bronze/gold metallic core (NO black)
            const tagSlotGrad = ctx.createLinearGradient(0, tTop + 4.5, 0, tTop + 15.5);
            tagSlotGrad.addColorStop(0, '#543c16');
            tagSlotGrad.addColorStop(0.5, '#7a5520');
            tagSlotGrad.addColorStop(1, '#9a6e2c');
            ctx.fillStyle = tagSlotGrad;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(tLeft + 5, tTop + 4.5, 6, 11, 3);
            else ctx.rect(tLeft + 5, tTop + 4.5, 6, 11);
            ctx.fill();
            ctx.strokeStyle = '#543c16';
            ctx.lineWidth = 0.8;
            ctx.stroke();
        }

    } else {
        // No border: clean avatar with sharp corners
        if (pfpImg && pfpImg.naturalWidth > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(pfpX, pfpY, pfpSize, pfpSize);
            ctx.clip();
            ctx.drawImage(pfpImg, pfpX, pfpY, pfpSize, pfpSize);
            ctx.restore();
        }
    }

    ctx.font = "400 35px 'Geist', 'Inter', sans-serif";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    const displayUser = formatUsername(usernameDisplay.textContent);
    ctx.fillText(displayUser, pfpX + pfpSize + 12, pfpY + (pfpSize / 2));
    ctx.restore();

    // 7. Promo Footer Under Profile: Save 10% on fees  [ikona] axiom.trade
    ctx.save();
    const promoX = 36;
    const promoY = 482;
    const centerY = promoY + 8;
    const promoFont = "400 14px 'Geist', sans-serif";

    ctx.font = promoFont;
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';

    // 1. Text: Save 10% on fees (two spaces before icon)
    const promoText1 = 'Save 10% on fees  ';
    ctx.fillText(promoText1, promoX, centerY);
    const text1Width = ctx.measureText(promoText1).width;

    // 2. Icon: Feather/Lucide wireframe globe (exact SVG path)
    const iconGap = 7;
    const iconSize = 15;
    const iconX = promoX + text1Width + iconGap;
    const iconTop = centerY - (iconSize / 2);

    ctx.save();
    ctx.translate(iconX, iconTop);
    ctx.scale(iconSize / 24, iconSize / 24);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.0;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Outer circle (r=10 at 12,12)
    ctx.beginPath();
    ctx.arc(12, 12, 10, 0, Math.PI * 2);
    ctx.stroke();

    // Horizontal equator
    ctx.beginPath();
    ctx.moveTo(2, 12);
    ctx.lineTo(22, 12);
    ctx.stroke();

    // Meridian ellipse
    ctx.beginPath();
    ctx.ellipse(12, 12, 4.8, 10, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 3. Text: axiom.trade
    const domainX = iconX + iconSize + iconGap;
    ctx.fillText('axiom.trade', domainX, centerY);
    ctx.restore();
}

// Preload Profile Avatar
async function preloadPfp() {
    if (!profilePicDisplay || !profilePicDisplay.src) return null;
    const img = new Image();
    if (!profilePicDisplay.src.startsWith('data:') && window.location.protocol !== 'file:') {
        img.crossOrigin = 'anonymous';
    }
    await new Promise(r => {
        img.onload = r;
        img.onerror = r;
        img.src = profilePicDisplay.src;
        if (img.complete && img.naturalWidth > 0) r();
    });
    return img;
}

// High-Res Native Vector Canvas Capture (2x Scale: 1680x1140)
async function captureCard() {
    try {
        await document.fonts.ready;
    } catch(e) {}

    const scale = 2;
    const w = 960;
    const h = 540;
    const canvas = document.createElement('canvas');
    canvas.width = w * scale;
    canvas.height = h * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    const pfpImg = await preloadPfp();

    // 1. Background layer
    let drawnVideo = false;
    if (bgState.mode !== 'transparent') {
        if (bgState.isVideo && cardVideoLayer && cardVideoLayer.videoWidth > 0) {
            try {
                ctx.save();
                const vw = cardVideoLayer.videoWidth;
                const vh = cardVideoLayer.videoHeight;
                const vScale = Math.max(w / vw, h / vh);
                const sw = w / vScale;
                const sh = h / vScale;
                const sx = (vw - sw) / 2;
                const sy = (vh - sh) / 2;
                ctx.drawImage(cardVideoLayer, sx, sy, sw, sh, 0, 0, w, h);

                const scrim = ctx.createLinearGradient(0, 0, w, 0);
                scrim.addColorStop(0, 'rgba(5, 8, 15, 0.88)');
                scrim.addColorStop(0.48, 'rgba(5, 8, 15, 0.65)');
                scrim.addColorStop(0.85, 'rgba(5, 8, 15, 0.15)');
                scrim.addColorStop(1, 'rgba(5, 8, 15, 0.1)');
                ctx.fillStyle = scrim;
                ctx.fillRect(0, 0, w, h);
                ctx.restore();
                drawnVideo = true;
            } catch(e) {
                console.warn('Video draw warning:', e);
            }
        } else if (bgState.url) {
            const bgImg = bgState.imageObj || new Image();
            if (!bgState.imageObj) {
                if (!bgState.url.startsWith('data:') && window.location.protocol !== 'file:') {
                    bgImg.crossOrigin = 'anonymous';
                }
                await new Promise((resolve) => {
                    bgImg.onload = resolve;
                    bgImg.onerror = resolve;
                    bgImg.src = bgState.url;
                    if (bgImg.complete && bgImg.naturalWidth > 0) resolve();
                });
            }

            if (bgImg.naturalWidth > 0) {
                ctx.save();
                const imgScale = Math.max(w / bgImg.naturalWidth, h / bgImg.naturalHeight);
                const sw = w / imgScale;
                const sh = h / imgScale;
                const sx = (bgImg.naturalWidth - sw) / 2;
                const sy = (bgImg.naturalHeight - sh) / 2;
                ctx.drawImage(bgImg, sx, sy, sw, sh, 0, 0, w, h);

                const scrim = ctx.createLinearGradient(0, 0, w, 0);
                scrim.addColorStop(0, 'rgba(5, 8, 15, 0.88)');
                scrim.addColorStop(0.48, 'rgba(5, 8, 15, 0.65)');
                scrim.addColorStop(0.85, 'rgba(5, 8, 15, 0.15)');
                scrim.addColorStop(1, 'rgba(5, 8, 15, 0.1)');
                ctx.fillStyle = scrim;
                ctx.fillRect(0, 0, w, h);
                ctx.restore();
            }
        }
    }

    // Check if canvas is tainted by cross-origin video
    let isTainted = false;
    try {
        ctx.getImageData(0, 0, 1, 1);
    } catch(err) {
        isTainted = true;
    }

    if (isTainted) {
        // If tainted, build fresh clean canvas without tainted element to guarantee export success
        const cleanCanvas = document.createElement('canvas');
        cleanCanvas.width = w * scale;
        cleanCanvas.height = h * scale;
        const cleanCtx = cleanCanvas.getContext('2d');
        cleanCtx.scale(scale, scale);

        // Dark background fallback
        cleanCtx.fillStyle = '#0a0d14';
        cleanCtx.fillRect(0, 0, w, h);

        drawOverlayOnCanvas(cleanCtx, w, h, pfpImg);
        return cleanCanvas;
    }

    drawOverlayOnCanvas(ctx, w, h, pfpImg);
    return canvas;
}

// Record & Export MP4 Video (Ultra-HD 16:9 High-Bitrate with Full Audio)
async function recordAndDownloadMp4() {
    if (!cardVideoLayer || !bgState.isVideo) return;

    try {
        downloadMp4Btn.disabled = true;
        downloadMp4Btn.textContent = 'Recording MP4...';

        // 1. Ensure audio routing graph is connected and running
        const audioDest = ensureAudioGraph();
        if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
            await globalAudioCtx.resume().catch(() => {});
        }

        // Unmute video element so PCM audio feeds into mediaSourceNode
        cardVideoLayer.muted = false;
        cardVideoLayer.volume = 1.0;
        if (globalMonitorGain && globalAudioCtx) {
            const speakerVol = (bgState.isMuted || currentVolume === 0) ? 0 : currentVolume;
            try {
                globalMonitorGain.gain.setValueAtTime(speakerVol, globalAudioCtx.currentTime);
            } catch(e) {}
        }

        const recScale = 2; // Ultra-HD 16:9 Full HD Resolution: 1920x1080
        const recWidth = 960;
        const recHeight = 540;
        const recCanvas = document.createElement('canvas');
        recCanvas.width = recWidth * recScale;
        recCanvas.height = recHeight * recScale;
        const recCtx = recCanvas.getContext('2d');
        recCtx.scale(recScale, recScale);
        recCtx.imageSmoothingEnabled = true;
        recCtx.imageSmoothingQuality = 'high';

        const pfpImg = await preloadPfp();

        // 2. Capture canvas stream at 30 FPS (rock solid across iOS WebKit & Android Blink)
        let canvasStream = null;
        try {
            canvasStream = recCanvas.captureStream(30);
        } catch(streamErr) {
            console.warn('captureStream failed:', streamErr);
        }

        // Fallback: If browser cannot capture canvas stream, download raw MP4 directly
        if (!canvasStream) {
            triggerDirectDownload(bgState.url, `axiom-pnl-${Date.now()}.mp4`);
            downloadMp4Btn.textContent = 'Downloaded MP4!';
            setTimeout(() => {
                downloadMp4Btn.disabled = false;
                downloadMp4Btn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="23 7 16 12 23 17 23 7"/>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                    Download MP4
                `;
            }, 1800);
            return;
        }

        // 3. Create combined MediaStream with both video and audio tracks
        const combinedStream = new MediaStream();
        const vTracks = canvasStream.getVideoTracks();
        if (vTracks.length > 0) {
            combinedStream.addTrack(vTracks[0]);
        }

        if (audioDest) {
            const aTracks = audioDest.stream.getAudioTracks();
            if (aTracks.length > 0) {
                combinedStream.addTrack(aTracks[0]);
            }
        }

        // Fallback: if Web Audio destination didn't provide track, try captureStream
        if (combinedStream.getAudioTracks().length === 0) {
            try {
                const rawStream = cardVideoLayer.captureStream ? cardVideoLayer.captureStream() :
                                  cardVideoLayer.mozCaptureStream ? cardVideoLayer.mozCaptureStream() : null;
                if (rawStream) {
                    const fallbackTracks = rawStream.getAudioTracks();
                    if (fallbackTracks.length > 0) combinedStream.addTrack(fallbackTracks[0]);
                }
            } catch(e) {}
        }

        // 4. Determine supported MIME type (video/mp4 for iOS Safari)
        const mimeCandidates = [
            'video/mp4;codecs=avc1,mp4a.40.2',
            'video/mp4',
            'video/webm;codecs=vp9,opus',
            'video/webm;codecs=vp8,opus',
            'video/webm'
        ];
        let mimeType = 'video/mp4';
        if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported) {
            const found = mimeCandidates.find(m => MediaRecorder.isTypeSupported(m));
            if (found) mimeType = found;
        }

        const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
        const recorder = new MediaRecorder(combinedStream, {
            mimeType: mimeType,
            videoBitsPerSecond: 10000000 // 10 Mbps crisp, smooth mobile-optimized bitrate
        });

        const chunks = [];
        recorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) chunks.push(e.data);
        };

        const targetDuration = Math.min(Math.max(cardVideoLayer.duration || 5, 3), 10);

        function drawCurrentFrame() {
            if (cardVideoLayer.readyState >= 2) {
                recCtx.save();
                const vw = cardVideoLayer.videoWidth || recWidth;
                const vh = cardVideoLayer.videoHeight || recHeight;
                const vScale = Math.max(recWidth / vw, recHeight / vh);
                const sw = recWidth / vScale;
                const sh = recHeight / vScale;
                const sx = (vw - sw) / 2;
                const sy = (vh - sh) / 2;
                recCtx.drawImage(cardVideoLayer, sx, sy, sw, sh, 0, 0, recWidth, recHeight);

                const scrim = recCtx.createLinearGradient(0, 0, recWidth, 0);
                scrim.addColorStop(0, 'rgba(5, 8, 15, 0.88)');
                scrim.addColorStop(0.48, 'rgba(5, 8, 15, 0.65)');
                scrim.addColorStop(0.85, 'rgba(5, 8, 15, 0.15)');
                scrim.addColorStop(1, 'rgba(5, 8, 15, 0.1)');
                recCtx.fillStyle = scrim;
                recCtx.fillRect(0, 0, recWidth, recHeight);
                recCtx.restore();
            }
            drawOverlayOnCanvas(recCtx, recWidth, recHeight, pfpImg);
        }

        // Synchronize and settle video decoder before starting recorder to eliminate 1-2s initial glitch
        cardVideoLayer.pause();
        await new Promise((resolve) => {
            if (Math.abs(cardVideoLayer.currentTime) < 0.05) {
                resolve();
            } else {
                let resolved = false;
                const done = () => {
                    if (!resolved) {
                        resolved = true;
                        cardVideoLayer.removeEventListener('seeked', done);
                        resolve();
                    }
                };
                cardVideoLayer.addEventListener('seeked', done, { once: true });
                cardVideoLayer.currentTime = 0;
                setTimeout(done, 300);
            }
        });

        // Pre-paint first frame onto canvas so captureStream starts with an active valid keyframe
        drawCurrentFrame();

        // Start playback and wait for initial playback frame decoding to engage
        await cardVideoLayer.play().catch(() => {});
        await new Promise((resolve) => {
            let resolved = false;
            const done = () => {
                if (!resolved) {
                    resolved = true;
                    cardVideoLayer.removeEventListener('timeupdate', done);
                    resolve();
                }
            };
            cardVideoLayer.addEventListener('timeupdate', done, { once: true });
            setTimeout(done, 150);
        });

        // Start recorder synchronized from active playback
        recorder.start(500);

        let recording = true;
        const startTime = performance.now();

        function renderFrame() {
            if (!recording) return;

            drawCurrentFrame();

            const elapsed = (performance.now() - startTime) / 1000;
            const progress = Math.min(Math.round((elapsed / targetDuration) * 100), 99);
            downloadMp4Btn.textContent = `Recording (${progress}%)...`;

            if (elapsed >= targetDuration || cardVideoLayer.ended) {
                recording = false;
                if (cardVideoLayer) {
                    cardVideoLayer.muted = bgState.isMuted;
                    cardVideoLayer.volume = currentVolume;
                }
                try {
                    recorder.stop();
                } catch(e) {}
            } else {
                requestAnimationFrame(renderFrame);
            }
        }

        recorder.onstop = () => {
            if (cardVideoLayer) {
                cardVideoLayer.muted = bgState.isMuted;
                cardVideoLayer.volume = currentVolume;
            }

            const blob = new Blob(chunks, { type: mimeType });
            const url = URL.createObjectURL(blob);
            triggerDirectDownload(url, `axiom-pnl-${Date.now()}.${ext}`, blob);

            downloadMp4Btn.classList.add('success');
            downloadMp4Btn.textContent = 'Downloaded MP4!';
            setTimeout(() => {
                downloadMp4Btn.classList.remove('success');
                downloadMp4Btn.disabled = false;
                downloadMp4Btn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="23 7 16 12 23 17 23 7"/>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                    Download MP4
                `;
            }, 1800);
        };

        requestAnimationFrame(renderFrame);

    } catch(err) {
        console.error('MP4 recording error:', err);
        if (bgState.url) {
            triggerDirectDownload(bgState.url, `axiom-video-${Date.now()}.mp4`);
        }
        downloadMp4Btn.disabled = false;
        downloadMp4Btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
            Download MP4
        `;
    }
}

function triggerDirectDownload(url, filename, blob) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        document.body.removeChild(link);
    }, 200);
}

// Download Card (PNG or MP4 based on mode or button click)
async function downloadCard() {
    if (bgState.isVideo) {
        recordAndDownloadMp4();
        return;
    }

    try {
        downloadBtn.textContent = 'Generating...';
        const canvas = await captureCard();
        const link = document.createElement('a');
        link.download = `axiom-pnl-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        downloadBtn.classList.add('success');
        downloadBtn.innerHTML = `Downloaded!`;
        setTimeout(() => {
            downloadBtn.classList.remove('success');
            downloadBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download PNG
            `;
        }, 1500);
    } catch(e) {
        console.error(e);
        downloadBtn.textContent = 'Download PNG';
    }
}

// Copy Card to Clipboard
async function copyCard() {
    try {
        copyBtn.textContent = 'Copying...';
        const canvas = await captureCard();

        canvas.toBlob(async (blob) => {
            try {
                if (navigator.clipboard && window.ClipboardItem) {
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                    copyBtn.classList.add('success');
                    copyBtn.innerHTML = `Copied!`;
                    setTimeout(() => {
                        copyBtn.classList.remove('success');
                        copyBtn.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                            Copy
                        `;
                    }, 1500);
                } else {
                    throw new Error('Clipboard API not supported');
                }
            } catch(err) {
                console.warn(err);
                downloadCard();
            }
        }, 'image/png');
    } catch(e) {
        console.error(e);
        copyBtn.textContent = 'Copy';
    }
}

// Copy CA
function copyCA() {
    const caValEl = document.getElementById('caValue');
    if (!caValEl) return;
    const caValue = caValEl.textContent;
    if (caValue === 'coming soon') return;
    navigator.clipboard.writeText(caValue).then(() => {
        const caBox = document.getElementById('caBox');
        if (caBox) caBox.classList.add('copied');
        const orig = caValEl.textContent;
        caValEl.textContent = 'Copied!';
        setTimeout(() => {
            if (caBox) caBox.classList.remove('copied');
            caValEl.textContent = orig;
        }, 1500);
    });
}

// Initialize LocalStorage
function loadSavedData() {
    try {
        const savedUsername = localStorage.getItem('axiom-pnl-username');
        const defaultUser = formatUsername(savedUsername || '@luckysta');
        usernameInput.value = defaultUser;
        usernameDisplay.textContent = defaultUser;

        const savedBorder = localStorage.getItem('axiom-pnl-pfp-border');
        if (savedBorder && PFP_BORDERS[savedBorder]) {
            setPfpBorder(savedBorder);
        } else {
            setPfpBorder('cone');
        }

        const savedVol = localStorage.getItem('axiom-pnl-volume');
        const initialVol = savedVol !== null ? Number(savedVol) : 100;
        setPageVolume(initialVol);
    } catch(e) {}

    const defaultPfp = (typeof AXIOM_ASSETS !== 'undefined' && AXIOM_ASSETS.default_pfp) ? AXIOM_ASSETS.default_pfp : 'assets/pfp.jpg';
    profilePicDisplay.src = defaultPfp;
    profilePicDisplay.style.display = 'block';
}

// Event Listeners
investedInput.addEventListener('input', updateDisplay);
currentInput.addEventListener('input', updateDisplay);

usernameInput.addEventListener('input', (e) => {
    let val = e.target.value;
    if (val.length > 0 && !val.startsWith('@')) {
        val = '@' + val;
    }
    const formatted = val || '@luckysta';
    usernameDisplay.textContent = formatted;
    try {
        localStorage.setItem('axiom-pnl-username', formatted);
    } catch(err) {}
});

usernameInput.addEventListener('blur', (e) => {
    let val = usernameInput.value.trim();
    if (val && !val.startsWith('@')) {
        val = '@' + val;
    }
    if (!val) val = '@luckysta';
    usernameInput.value = val;
    usernameDisplay.textContent = val;
    try {
        localStorage.setItem('axiom-pnl-username', val);
    } catch(err) {}
});

borderPills.forEach(pill => {
    pill.addEventListener('click', () => {
        setPfpBorder(pill.dataset.border);
    });
});

coinNameInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/^\$+/, '').trim();
    const formatted = val || 'COGE';
    coinNameDisplay.textContent = formatted;
    coinPills.forEach(p => {
        p.classList.toggle('active', p.textContent.toUpperCase() === formatted.toUpperCase());
    });
});

coinPills.forEach(pill => {
    pill.addEventListener('click', () => {
        coinPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cleanName = pill.textContent.replace(/^\$+/, '').trim();
        coinNameInput.value = cleanName;
        coinNameDisplay.textContent = cleanName;
    });
});

profilePicInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
            profilePicDisplay.src = ev.target.result;
            profilePicDisplay.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

hideUIBtn.addEventListener('click', () => toggleUI(false));
unhideHint.addEventListener('click', () => toggleUI(true));

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        toggleUI(isUIHidden);
    }
});

// Background controls
btnTransparentBg.addEventListener('click', () => {
    setTransparentBackground();
});

customMediaUpload.addEventListener('click', () => {
    // Reset value on click so re-selecting same file triggers change,
    // without clearing during the change event which revokes file handles on iOS Safari
    customMediaUpload.value = '';
});

customMediaUpload.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
        handleMediaUpload(file);
    }
});

// Mobile WebKit audio unlock on tap
const unlockMobileAudio = () => {
    if (cardVideoLayer && bgState.isVideo) {
        if (cardVideoLayer.paused) {
            cardVideoLayer.play().catch(() => {});
        }
        if (!bgState.isMuted && currentVolume > 0 && cardVideoLayer.muted) {
            cardVideoLayer.muted = false;
            cardVideoLayer.volume = currentVolume;
        }
    }
};
['touchstart', 'touchend', 'click'].forEach(evt => {
    document.addEventListener(evt, unlockMobileAudio, { passive: true });
});

if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        setPageVolume(e.target.value);
    });
}

soundToggleBtn.addEventListener('click', () => {
    toggleSound();
});

clearBgBtn.addEventListener('click', () => {
    setTransparentBackground();
});

loadTiktokBtn.addEventListener('click', () => {
    const url = tiktokUrlInput.value.trim();
    if (url) {
        resolveTikTok(url);
    }
});

tiktokUrlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const url = tiktokUrlInput.value.trim();
        if (url) {
            resolveTikTok(url);
        }
    }
});

downloadMp4Btn.addEventListener('click', recordAndDownloadMp4);
downloadBtn.addEventListener('click', downloadCard);
copyBtn.addEventListener('click', copyCard);

// Dynamic mobile viewport scaler (Optimized for iPhone 16 Pro 402x874pt)
function updateMobileScale() {
    const cardWrapper = document.querySelector('.card-wrapper');
    const container = document.getElementById('cardScaleContainer');
    if (!cardWrapper) return;

    if (window.innerWidth <= 1024) {
        const padding = 24;
        const availableW = Math.min(window.innerWidth - padding, 960);
        const scale = availableW / 960;
        cardWrapper.style.transform = `scale(${scale})`;
        cardWrapper.style.transformOrigin = 'top center';
        if (container) {
            container.style.height = `${540 * scale}px`;
            container.style.width = '100%';
        }
    } else {
        cardWrapper.style.transform = '';
        cardWrapper.style.transformOrigin = '';
        if (container) {
            container.style.height = '540px';
            container.style.width = '960px';
        }
    }
}

window.addEventListener('resize', updateMobileScale);
window.addEventListener('orientationchange', () => setTimeout(updateMobileScale, 100));
window.addEventListener('load', updateMobileScale);
document.addEventListener('DOMContentLoaded', updateMobileScale);

// Boot
loadSavedData();
setTransparentBackground();
updateDisplay();
updateMobileScale();
