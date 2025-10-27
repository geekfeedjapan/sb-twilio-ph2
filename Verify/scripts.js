document.getElementById('btn-send-otp').addEventListener('click', function() {
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
});

document.getElementById('btn-change-info').addEventListener('click', function() {
    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';
});

document.getElementById('btn-next').addEventListener('click', function() {
    alert('顧客情報入力画面へ遷移します。PKCVにより安全な通信が保証されています。');
});