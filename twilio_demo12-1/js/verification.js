/**
 * Verification functions for the Twilio Omnichannel Demo
 */

/* --- Step 3: 電話発信による認証コード取得 (C) --- */
function startVerificationCallout() {
    if (currentStep < 2) return;
    $('btn-step3').disabled = true;
    $('scenario-c').checked = true;

    // 認証コードを生成 (6桁の乱数)
    verificationCode = Math.floor(100000 + Math.random() * 900000);
    $('callout-code-display').textContent = verificationCode;

    // オペレーター側
    addMessage('operator-chat-log', 'system', 'Twilio電話認証を発信しました。顧客にTwilio発信番号 ' + CALL_NUMBER + ' へ発信を促します。');

    // ユーザー画面を**発信中画面**へ遷移
    showPage('outbound-call-page');
    $('outbound-call-page').querySelector('.calling-number').textContent = CALL_NUMBER;

    setTimeout(() => {
        // 電話が着信・応答し、認証コードが読み上げられたことをシミュレート
        $('outbound-call-page').querySelector('p:first-child').textContent = '📞 通話中... 認証コード：' + verificationCode;
    }, 3000);

    // 認証コードを聞いたら、切断してチャットに戻る
    $('outbound-hangup').onclick = () => {
        hangupOutboundCall(verificationCode);
    };
    currentStep = 3;
}

function hangupOutboundCall(code) {
    // 通話切断
    showPage('chat-page');

    // チャットに次のアクションを促すメッセージを追加
    addMessage('user-chat-log', 'operator', `電話での認証コード（${code}）を覚えましたか？**コードを下のメッセージ入力欄にそのまま入力して送信**してください。`);
    addMessage('operator-chat-log', 'system', `顧客が電話を切断しました。認証コード（${code}）のチャット入力を待ちます。`);

    $('btn-step4').disabled = false;
    currentStep = 4; // 認証コード入力待ちステップへ
}

/* --- Step 4: 認証コード入力完了 (D) --- */
// 認証コード入力チェックのロジックは sendUserMessage() 内で実行される
function completeVerificationLogic() {
    // 認証成功
    addMessage('user-chat-log', 'system', '✅ 認証成功！ご本人様確認が完了しました。');

    // オペレーター側
    $('auth-status').innerHTML = '認証状況: **認証済み**';
    $('auth-status').style.backgroundColor = '#d4edda';
    addMessage('operator-chat-log', 'system', '本人認証（電話認証 → チャット入力）が完了しました。');

    $('btn-step5').disabled = false; // 次のステップへ
    $('scenario-d').checked = true;
    currentStep = 5;
}

function completeVerification() {
    // 管理パネルから手動で認証成功をシミュレートする場合
    if (currentStep !== 4) return;

    // チャットに成功メッセージを追加（sendUserMessageを通さない）
    addMessage('user-chat-log', 'user', verificationCode);
    addMessage('operator-chat-log', 'user', verificationCode);

    completeVerificationLogic();
}
