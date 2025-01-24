import ValidateModile from './validateModule.js';

let dialog, cross, sendBtn;
dialog = document.querySelector('#dialog');

if(dialog){
    cross = document.querySelector('.popup_cross');
    

    dialog.addEventListener("click", (event) => {
        openPopup(event);
    });
    
    cross.addEventListener("click", (event) => {
        openPopup(event, 1);
    });

    sendBtn = document.querySelector('.send_request');
}

const popupBtn = document.querySelectorAll('.popupBtn');

popupBtn.forEach((item)=>{
    item.addEventListener("click", (event) => {
        openPopup(1);
    });
})

function openPopup(open, force){
    if(force || open.target == dialog){
        dialog.classList.remove('open');
        document.body.classList.remove('dialog_opened');
        document.body.style.paddingRight = `0px`;
    }else if(open == 1){
        let vw = window.innerWidth - document.body.clientWidth;
        document.documentElement.style.setProperty('$vw', `${vw}px`);
        dialog.classList.add('open');
        document.body.classList.add('dialog_opened');
        document.body.style.paddingRight = `${vw}px`;
        ValidateModile.resetForm();
    }
}

function updateSendButton(setSending){
    if(setSending) sendBtn.classList.add('sending');
    else sendBtn.classList.remove('sending');
}

export default {openPopup, updateSendButton};