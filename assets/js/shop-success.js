const vbankDate = document.getElementById('vbankDate');
const vbankName = document.getElementById('vbankName');
const vbankNum = document.getElementById('vbankNum');
vbankDate.style.display = 'none';
vbankName.style.display = 'none';
vbankNum.style.display = 'none';

if (sessionStorage.getItem('bank')) {
  const bank = JSON.parse(sessionStorage.getItem('bank'));
  vbankDate.style.display = 'block';
  vbankName.style.display = 'block';
  vbankNum.style.display = 'block';
  vbankDate.innerText = bank.vbank_date;
  vbankName.innerText = bank.vbank_name;
  vbankNum.innerText = bank.vbank_num;
}

function _clearStorage() {
  sessionStorage.clear();
}
