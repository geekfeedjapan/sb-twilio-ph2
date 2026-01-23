/**
 * WebRTC functions for the Twilio Omnichannel Demo
 */

/* --- Step 5: WebRTC移行の促し (E) --- */
function promptWebRTC() {
    if (currentStep < 5) return;
    $('btn-step5').disabled = true;
    $('scenario-e').checked = true;

    const webrtcPrompt = '繰り上げ返済の試算について、より詳細な画面を共有し、顔を見ながらご説明します。WebRTC（ビデオ通話）に切り替えましょう。';

    // チャットに追加
    addMessage('operator-chat-log', 'operator', webrtcPrompt);
    addMessage('user-chat-log', 'operator', webrtcPrompt);

    // WebRTC開始を促すリンクやボタンをシミュレート
    setTimeout(() => {
        const webrtcLink = document.createElement('div');
        webrtcLink.innerHTML = '<p style="text-align:center; margin-top:15px;"><button style="background:#dc3545; color:white; border:none; padding:10px 20px; border-radius:5px;" onclick="startWebRTC(); return false;">📹 ビデオ通話を開始する</button></p>';
        $('user-chat-log').appendChild(webrtcLink);
        $('user-chat-log').scrollTop = $('user-chat-log').scrollHeight;
    }, 1000);

    $('btn-step6').disabled = false; // 次のステップへ
    currentStep = 6;
}

/* --- Step 6: WebRTC通話開始 (F) --- */
function startWebRTC() {
    if (currentStep < 5) return;

    // ユーザー画面をWebRTCページへ遷移
    showPage('webrtc-page');
    $('webrtc-status-message').textContent = 'WebRTC接続中...';

    // オペレーター側
    $('operator-call-status').style.display = 'block';
    $('operator-call-status').innerHTML = '<p>📹 WebRTCビデオ通話 着信中</p><button style="background:#2e8b57; color:white; border:none; padding:10px 20px; margin-top:10px;" onclick="answerWebRTC()">応答</button>';
    $('channel-title').textContent = '現在のチャネル: WebRTCビデオ通話 (Twilio Video)';

    $('btn-step6').disabled = true;
    $('scenario-f').checked = true;
}

function answerWebRTC() {
    // オペレーターが応答ボタンをクリック
    $('operator-call-status').innerHTML = '<p style="color:#28a745; font-weight:bold;">📹 ビデオ通話中 (画面共有・顧客情報連携済み)</p><button onclick="hangupWebRTC()" style="background:#dc3545; color:white; border:none; padding:8px 15px; margin-top:10px; border-radius:4px;">通話終了</button>';

    // ユーザー側
    $('webrtc-status-message').textContent = '通話開始... オペレーターが応答しました。';
    $('webrtc-video').textContent = 'オペレーターの映像と画面共有がここに表示されます。';

    $('btn-step7').disabled = false; // 次のステップへ
}

function hangupWebRTC() {
    // 通話終了処理
    $('operator-call-status').style.display = 'none';
    $('channel-title').textContent = '現在のチャネル: 通話終了';

    // ユーザー側
    showPage('chat-page'); // WebRTC終了後、チャット画面に戻る
    addMessage('user-chat-log', 'system', 'ビデオ通話が終了しました。');

    // SMS自動送信ステップへ移行
    sendSmsAfterCall();
}
