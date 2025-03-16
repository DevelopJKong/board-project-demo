const button = document.getElementById('auth');
const authNum = document.getElementById('authNum');
const authText = document.getElementById('authText');
const authFailText = document.getElementById('authFailText');
const phoneNum = document.getElementById('inputPhoneNum');

const subButton = document.getElementById('createUser');
const createForm = document.getElementById('createForm');

function _requestAuthentication() {
  const IMP = window.IMP;
  IMP.init('#{shopPidCode}');
  IMP.certification(
    {
      merchant_uid: `merchant_#{Date.now()}`,
      m_redirect_url: `#{isHeroku ? domain : devDomain}/payments/success/mobile`,
      popup: false,
    },
    async function (rsp) {
      if (rsp.success) {
        const data = await (
          await fetch('#{isHeroku ? domain : devDomain}/users/certifications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imp_uid: rsp.imp_uid,
            }),
          })
        ).json();

        try {
          if (data.status === 'success') {
            authText.style.display = 'block';
            authText.innerText = data.message;
            authFailText.innerText = '';
            phoneNum.disabled = true;
          } else {
            authFailText.style.display = 'block';
            authFailText.innerText = data.message;
            authNum.value = '';
            phoneNum.value = '';
            phoneNum.innerText = '';
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        authNum.value = '';
        phoneNum.value = '';
        phoneNum.innerText = '';
        authText.style.display = 'none';
        alert('인증에 실패하였습니다. 에러 내용: ' + rsp.error_msg);
      }
    },
  );
}

subButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (!phoneNum.value) {
    alert('핸드폰 번호를 입력해주세요');
    return;
  }
  createForm.submit();
});

button.addEventListener('click', (event) => {
  event.preventDefault();
  if (!phoneNum.value) {
    alert('핸드폰 번호를 입력해주세요');
    return;
  }
  authNum.value = phoneNum.value;
  _requestAuthentication();
});
