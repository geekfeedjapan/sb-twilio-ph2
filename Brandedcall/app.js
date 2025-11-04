// ===== プリセット =====
const PRESETS = [
{ company: "JCBカード", reason: "不正利用確認", callerId: "03-1234-5678" },
{ company: "JCBカード", reason: "未納督促確認", callerId: "03-9876-5432" },
{ company: "SBI証券", reason: "認証中", callerId: "0120-123-456" },
{ company: "ソフトバンク", reason: "料金プランのご案内", callerId: "0800-111-222" },
];


// ===== 状態 =====
let callState = "idle"; // idle | dialing | ringing | connected | ended
let timers = [];
let channel = "LINE通話";


// ===== 要素取得 =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));


// Admin inputs
const elCompany = $("#company");
const elReason = $("#reason");
const elCallerId = $("#callerId");
const elCalleeName = $("#calleeName");
const elCalleePhone = $("#calleePhone");
const elSecureBadge = $("#secureBadge");


const elLogBox = $("#logBox");
const elPresetChips = $("#preset-chips");


// Tabs
const tabs = $$(".tab");
const adminView = $("#admin-view");
const userView = $("#user-view");


// User phone UI
const elStateLabel = $("#stateLabel");
const elSubline = $("#subline");
const elBrandCompany = $("#brandCompany");
const elBrandReason = $("#brandReason");
const elToName = $("#toName");
const elToPhone = $("#toPhone");
const elSecureWrap = $("#secureWrap");
const elStateText = $("#stateText");
const elDotPulse = $("#dotPulse");
const elCardTitle = $("#cardTitle");
const elCardNumber = $("#cardNumber");
const elBrandAvatar = $("#brandAvatar");


// Buttons
const btnStart = $("#btnStart");
const btnEnd = $("#btnEnd");
const btnReset = $("#btnReset");


// Segmented control (channel)
$$('.seg-btn').forEach(btn => {
btn.addEventListener('click', () => {
$$('.seg-btn').forEach(b => b.classList.remove('is-active'));
btn.classList.add('is-active');
channel = btn.dataset.channel;
render();
});
});


// ===== Util =====
const digitsOnly = (s) => s.replace(/[^0-9]/g, '');
const phoneFormat = (s) => {
const d = digitsOnly(s);
if (d.length <= 3) return d;
if (d.length <= 7) return `${d.slice(0,3)}-${d.slice(3)}`;
if (d.length <= 11) return `${d.slice(0,3)}-${d.slice(3,7)}-${d.slice(7)}`;
return s;
};


const log = (msg) => {
const time = new Date().toLocaleTimeString('ja-JP', { hour12: false });
const line = document.createElement('div');
line.textContent = `${time} ${msg}`;
elLogBox.prepend(line);
};


const setState = (s) => {
callState = s;
render();
};


const clearTimers = () => { timers.forEach(t => clearTimeout(t)); timers = []; };


// ===== Render =====
function render() {
// Brand area
elBrandCompany.textContent = elCompany.value || '';
elBrandReason.textContent = elReason.value || '';
elSubline.textContent = `${channel} - 発信番号 ${elCallerId.value || ''}`;
elCardTitle.textContent = `${elBrandCompany.textContent}　${elBrandReason.textContent}`;
elCardNumber.textContent = `発信番号 ${elCallerId.value || ''}`;
elToName.textContent = elCalleeName.value || '';
elToPhone.textContent = elCalleePhone.value || '';


// Avatar initials
const parts = (elCompany.value || '').trim().split(/\s+/);
const pick = (t) => (t?.[0] || '').toUpperCase();
elBrandAvatar.textContent = (pick(parts[0]) + pick(parts[parts.length-1])) || 'CO';


// Secure badge
elSecureWrap.style.display = elSecureBadge.checked ? 'inline-flex' : 'none';


// State indicators
const labels = { idle: '待機中', dialing: '発信中…', ringing: '着信中…', connected: '通話中', ended: '終了' };
elStateLabel.textContent = labels[callState];
elStateText.textContent = labels[callState];
elDotPulse.style.display = (callState === 'dialing' || callState === 'ringing') ? 'inline-flex' : 'none';
}


// ===== Events =====
[elCompany, elReason, elCallerId, elCalleeName, elCalleePhone, elSecureBadge].forEach(el => {
el.addEventListener('input', () => {
if (el === elCallerId || el === elCalleePhone) {
el.value = phoneFormat(el.value);
}
render();
});
});


// Presets
function mountPresets() {
PRESETS.forEach(p => {
const chip = document.createElement('button');
chip.className = 'chip';
chip.textContent = `${p.company}／${p.reason}`;
chip.addEventListener('click', () => {
elCompany.value = p.company;
elReason.value = p.reason;
elCallerId.value = p.callerId;
render();
});
elPresetChips.appendChild(chip);
});
}


// Tabs
tabs.forEach(t => {
t.addEventListener('click', () => {
tabs.forEach(x => x.classList.remove('is-active'));
t.classList.add('is-active');
const view = t.dataset.view;
if (view === 'admin') {
adminView.classList.add('is-visible'); userView.classList.remove('is-visible');
} else {
userView.classList.add('is-visible'); adminView.classList.remove('is-visible');
}
});
});


// Flow controls
btnStart.addEventListener('click', () => {
if (callState !== 'idle' && callState !== 'ended') return;
elLogBox.innerHTML = '';
log('発信開始（企業→ユーザー）');
setState('dialing');
timers.push(setTimeout(() => {
setState('ringing');
log('ユーザー端末側で着信表示');
timers.push(setTimeout(() => {
setState('connected');
log('通話開始');
}, 1800));
}, 1000));
});


btnEnd.addEventListener('click', () => {
clearTimers();
if (callState === 'connected') log('通話終了');
setState('ended');
});


btnReset.addEventListener('click', () => {
clearTimers();
elLogBox.innerHTML = '';
setState('idle');
});


// 初期化
(function init(){
// phoneFormat 初期化
elCallerId.value = phoneFormat(elCallerId.value);
elCalleePhone.value = phoneFormat(elCalleePhone.value);
mountPresets();
render();
})();