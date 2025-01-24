import ValidateModile from './validateModule.js';
import popupModule from './popupModule.js';

function submitHandler(e) {
    e.preventDefault();

    var data = new FormData(this);

    let res = ValidateModile.validate(data, this);

    if(res.notValidMsg.length){
        ValidateModile.update(res);
        return false;
    }
  
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          console.log("SUCCESS", this);
          let responseText = JSON.parse(this.responseText);
          if(responseText.status === 'success'){
            ValidateModile.status(responseText);
            setTimeout(()=>{
                ValidateModile.resetForm();
                popupModule.openPopup(e, 1);
            }, 5000)
          }else{
            ValidateModile.status(responseText, 1);
            popupModule.updateSendButton();
          }
          
      }else if(this.readyState === XMLHttpRequest.DONE && this.status === 404){
        console.log('Error', e);
      }
    }
    
    request.open(this.method, 'http://localhost:3000/user', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    popupModule.updateSendButton(1);
    request.send(data);
    request.onload = function(){
        popupModule.updateSendButton();
    }
}
  
document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", submitHandler);
    form.querySelectorAll('.form-input').forEach(field => {
        field.addEventListener("keyup", (e) => {
            e.target.classList.remove('not-valid');
        });
    })
}
    
);

export default {};