const itemList = document.querySelector('.item-list');
const itemListBtn = document.querySelector('.modal__btn');
const userId = location.pathname.split('/').reverse()[0];
const downloadLink = document.querySelector('.download__link');
if (userId === '#{loggedInUser._id}') {
  itemListBtn.classList.remove('none');
} else {
  itemList.remove();
  itemListBtn.remove();
}

let isShow = true;

const _onClick = () => {
  if (isShow) {
    document.body.style.overflow = 'hidden';
    itemList.classList.remove('none');
    isShow = false;
  } else {
    document.body.style.overflow = 'unset';
    itemList.classList.add('none');
    isShow = true;
  }
};
const _onRefund = () => {
  if (userId !== '#{loggedInUser._id}') {
    alert('본인이 아니면 환불하실수 없습니다');
    location.href = '/';
    return;
  }
  const check = confirm('환불을 진행하시겠습니까?');
  if (check) {
    document.body.style.overflow = 'unset';
    itemList.classList.add('none');
    isShow = true;
  }
};
const _onDownload = () => {
  downloadLink.click();
};
