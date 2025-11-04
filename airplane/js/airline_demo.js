// airline_demo.js
(function(){
  const regUrl = location.origin + location.pathname + '#/register';
  document.getElementById('regUrlTxt').textContent = regUrl;
  const copyQrBtn = document.getElementById('copyQr');
  if (copyQrBtn) {
    copyQrBtn.onclick = () => navigator.clipboard.writeText(regUrl).then(() => alert('コピーしました')).catch(() => prompt('手動でコピーしてください:', regUrl));
  }
  // ...other scripts...
})();