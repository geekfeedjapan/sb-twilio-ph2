/**
 * Utility functions for the Twilio Omnichannel Demo
 */

// DOM要素のキャッシュ関数
const $ = id => document.getElementById(id);

// 画面切り替え関数
function showPage(pageId) {
    document.querySelectorAll('.app-page').forEach(page => {
        page.classList.remove('active-page');
    });
    $(pageId).classList.add('active-page');
}

// チャット/SMSメッセージ追加ヘルパー
function addMessage(logId, sender, text, isSms = false) {
    const log = $(logId);
    const div = document.createElement('div');

    if (isSms) {
        // SMS画面用
        div.classList.add('sms-message-bubble');
        div.textContent = text;
        const timeDiv = document.createElement('div');
        timeDiv.classList.add('sms-time');
        timeDiv.textContent = new Date().toLocaleTimeString();
        log.appendChild(div);
        log.appendChild(timeDiv);
    } else {
        // チャット画面用
        div.classList.add('chat-message');
        if (sender === 'user') {
            div.classList.add('user-msg');
        } else if (sender === 'operator') {
            div.classList.add('operator-msg');
        } else if (sender === 'system') {
            div.classList.add('system-msg');
        }
        div.textContent = text;
        log.appendChild(div);
    }

    log.scrollTop = log.scrollHeight;
}
