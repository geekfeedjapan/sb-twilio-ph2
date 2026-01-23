/**
 * Main Application Logic for the Twilio Omnichannel Demo
 */

// グローバル変数の定義
let currentStep = 0;
let verificationCode = null;
let CALL_NUMBER = null;

// デモを初期状態にリセット
function resetDemo() {
    // CALL_NUMBERをここで確実に初期化
    if (!CALL_NUMBER) {
        CALL_NUMBER = $('verification-call-number').value;
    }

    currentStep = 0;
    verificationCode = null;

    // UIリセット
    showPage('login-page');
    $('callout-code-display').textContent = '------';
    $('customer-info-card').style.display = 'none';
    $('operator-chat-log').style.display = 'none';
    $('operator-chat-log').innerHTML = '';
    $('user-chat-log').innerHTML = '';
    $('sms-log').innerHTML = '';
    $('operator-input-area').style.display = 'none';
    $('operator-call-status').style.display = 'none';
    $('auth-status').innerHTML = '認証状況: **未認証**';
    $('auth-status').style.backgroundColor = '#ffdbd3';
    $('channel-title').textContent = '現在のチャネル: なし';
    $('webrtc-status-message').textContent = '接続待機中...';
    $('webrtc-video').textContent = 'WebRTC接続中... (Twilio Video API)';

    // ボタン制御リセット
    $('btn-step1').disabled = false;
    $('btn-step2').disabled = true;
    $('btn-step3').disabled = true;
    $('btn-step4').disabled = true;
    $('btn-step5').disabled = true;
    $('btn-step6').disabled = true;
    $('btn-step7').disabled = true;

    document.querySelectorAll('input[name="scenario"]').forEach(radio => radio.checked = false);
}

/* --- Step 7: 通話切断後のSMS自動送信 --- */
function sendSmsAfterCall() {
    // Twilio SMS送信をシミュレート
    const smsMessage = '本日は住宅ローン繰り上げ返済のご相談ありがとうございました。関連資料として「優遇金利プランのご案内」を添付いたします。ご不明点があれば再度チャットからお問い合わせください。';

    // ユーザー画面をSMSページへ遷移
    showPage('sms-page');

    // SMSログにメッセージを追加
    setTimeout(() => {
        addMessage('sms-log', 'system', smsMessage, true);

        // デモ終了状態へ
        setTimeout(() => {
            // 最終的にリセット
            resetDemo();
        }, 5000);
    }, 1500);

    currentStep = 7;
    $('btn-step7').disabled = true;
}

// 初期化 (ページロード時に実行)
window.onload = resetDemo;
