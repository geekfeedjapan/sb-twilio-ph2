/**
 * Chat functions for the Twilio Omnichannel Demo
 */

/* --- Step 1: チャット開始 (A) --- */
function startChat() {
    // ボタンの有効化チェック（念のため）
    if ($('btn-step1').disabled && currentStep !== 0) return;

    showPage('chat-page');
    $('btn-step1').disabled = true;

    // 顧客発話シミュレート
    addMessage('user-chat-log', 'user', '繰り上げ返済について相談したい。');
    addMessage('operator-chat-log', 'user', '繰り上げ返済について相談したい。');

    $('customer-info-card').style.display = 'block';
    $('operator-chat-log').style.display = 'block';
    $('operator-input-area').style.display = 'flex';
    $('channel-title').textContent = '現在のチャネル: Webチャット (Twilio Conversations)';

    // オペレーターが応答
    setTimeout(() => {
        addMessage('user-chat-log', 'operator', '山田様、お問い合わせありがとうございます。担当の佐藤です。');
        addMessage('operator-chat-log', 'operator', '山田様、お問い合わせありがとうございます。担当の佐藤です。');
        $('btn-step2').disabled = false;
        $('scenario-a').checked = true;
    }, 1500);
    currentStep = 1;
}

// ユーザーからのメッセージシミュレート
function sendUserMessage() {
    const input = $('user-chat-input');
    const text = input.value.trim();
    if (text) {
        addMessage('user-chat-log', 'user', text);
        addMessage('operator-chat-log', 'user', `(ユーザー) ${text}`);
        input.value = '';

        // Step 4: 認証コード入力チェックのロジックをここで実行
        if (currentStep === 4 && text === String(verificationCode)) {
            completeVerificationLogic();
        } else if (currentStep === 4) {
            addMessage('operator-chat-log', 'system', `顧客から認証コード(${text})を受領。失敗。正しいコードは${verificationCode}です。`);
            addMessage('user-chat-log', 'system', '認証コードが違います。再度、電話でコードを聞き、正確に入力してください。');
        }
    }
}

// オペレーターからのメッセージシミュレート
function sendOperatorMessage() {
    const input = $('operator-chat-input');
    const text = input.value.trim();
    if (text) {
        addMessage('operator-chat-log', 'operator', text);
        addMessage('user-chat-log', 'operator', `(オペレーター) ${text}`);
        input.value = '';
    }
}

/* --- Step 2: 電話への移行を促す (B) --- */
function promptCallTransition() {
    if (currentStep < 1) return;
    $('btn-step2').disabled = true;
    $('scenario-b').checked = true;

    const promptMsg = '山田様、ご相談内容が重要事項に関わるため、ご本人様確認が必要です。セキュリティ確保のため、一時的に**電話認証プロセス**へ移行します。';

    // チャットに追加
    addMessage('operator-chat-log', 'operator', promptMsg);
    addMessage('user-chat-log', 'operator', promptMsg);

    setTimeout(() => {
        addMessage('user-chat-log', 'operator', `認証コードを取得するため、[電話発信による認証コード取得] ボタンをクリック後、表示される電話番号 (${CALL_NUMBER}) に発信してください。電話で認証コードが読み上げられます。`);
        addMessage('operator-chat-log', 'operator', '認証コードを取得するため、電話認証に進みます。');

        $('btn-step3').disabled = false; // 次のステップへ
    }, 1500);
    currentStep = 2;
}
