const http = require("http");
const fs = require("fs");

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); 
  }
 
http.createServer(async (request, response) => {
       
    if(request.url == "/user"){

        await wait(5000);
          
          let body = ""; 

          for await (const chunk of request) {
            body += chunk;
          }

        let userName = "";
 
        const exp = /Content-Disposition: form-data; name="([^\"]+)\"\r\n\r\n(\w*)/g;
        let formElement;
        while ((formElement = exp.exec(body))){
            paramName = formElement[1];
            paramValue = formElement[2]; 
            if(paramName === "name") userName = paramValue;
        }
        response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        if(userName === 'user'){
            response.end(`{"status": "error", "msg": "Неудачная попытка", "fields": {"name": "Имя нужно вводить реальное"}}`);
        }
        else{
            response.end(`{"status": "success", "msg": "Ваша заявка успешно отправлена"}`);
        }
        
    }
    else{
        fs.readFile("index.html", (_, data) => response.end(data));
    }
}).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));