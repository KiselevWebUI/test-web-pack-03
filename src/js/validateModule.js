const PhoneMask = require('@zoibana/phonemask');

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

new PhoneMask('#phone');

function resetForm(){
    document.querySelector('form').reset();
    document.querySelector('#form-title-error').innerHTML = '';
    document.querySelector('#form-title-error').classList.remove('error');
}

function validate(data, form) {
    //console.log('data', data, form);
    let field = null;
    let notValidObject = {obj:{}, notValidMsg: ''};
    document.querySelector('#form-title-error').classList.remove('error');
    for (var pair of data.entries()) {
        field = document.querySelector('#' + pair[0]);
        if(field){
            field.classList.remove('not-valid');
            document.querySelector('#' + pair[0] + '-alert').innerHTML = '';
        }
        if(field && field.getAttribute('mandatory') == '1' &&  pair[1] === ''){
            field.classList.add('not-valid')
            //console.log('mandatory', pair[0] + ", " + pair[1])
            notValidObject.obj[pair[0]] = 'не заполнено поле "' + [pair[0]] + '"';
            notValidObject.notValidMsg = 'Не валидное заполненеие полей';
        }
        if(pair[1] !== '' && field.getAttribute('validation') == 'email'){
            //console.log('EMAIL_REGEXP.test(pair[1])', pair[1], EMAIL_REGEXP.test(pair[1]))
            if(!EMAIL_REGEXP.test(pair[1])) {
                field.classList.add('not-valid');
                notValidObject.obj[pair[0]] = 'не валидный email в поле "' + [pair[0]] + '"';
                notValidObject.notValidMsg = 'Не валидное заполненеие полей';
            }
        }
    }
    return notValidObject;
}

function update(res){
    //console.log('update: res', res)
    let hash = res.obj;
    for(let i in hash){
        //console.log(document.querySelector('#' + i + '-alert'))
        document.querySelector('#' + i + '-alert').innerHTML = hash[i];
        document.querySelector('#' + i).classList.add('not-valid');
    }
    //console.log('Update')
}

function status(res, error){
    //console.log('status: res', res);
    document.querySelector('#form-title-error').innerHTML = res.msg;
    if(error){
        document.querySelector('#form-title-error').classList.add('error');
        update({obj: res.fields});
    }
}

export default { validate, update, status, resetForm };