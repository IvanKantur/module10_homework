const btn = document.querySelector('.btn');
const geo = document.getElementById('geoloc');
const status111 = document.getElementById('status111');
const mapLink = document.getElementById('map-link');
const chatBody = document.querySelector('.chat-body');


window.addEventListener('DOMContentLoaded', () => {

    // Функция, выводящая текст об ошибке
const error = () => {
    const text = 'Невозможно получить ваше местоположение';
    serverMessage(text);
}
    
  // Функция, срабатывающая при успешном получении геолокации
  const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    const mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    console.log(mapLink);
    geoposition(mapLink);
  }
  
  geo.addEventListener('click', () => {
    if (!navigator.geolocation) {
      const falure= 'Geolocation не поддерживается вашим браузером';
      serverMessage(falure);
    } else {
      const succ = 'Определение местоположения…';
      navigator.geolocation.getCurrentPosition(success, error);
      serverMessage(succ);
    }
  });


    websocket = new WebSocket('wss://echo-ws-service.herokuapp.com/');
    websocket.onopen = function(e) {
        sendMessage("Соединение установлено, начинайте общение");
    };
    websocket.onclose = function(e) {
        sendMessage("Диалог окончен");
        // textMessage.value = '';
    };
    websocket.onmessage = function(e) {
        
        console.log(e.data);
        serverMessage(e.data);
    };
    websocket.onerror = function(e) {
        sendMessage('Ошибка');
    };

    function serverMessage(message){
        let newMessage = document.createElement('div');
        newMessage.classList.add('servMessage');
        newMessage.innerHTML = `<p classs='parag'>Ответ: ${message}</p> `;
        chatBody.appendChild(newMessage);
    }

    function sendMessage(message){
        let newMessage = document.createElement('div');
        newMessage.classList.add('myMessage');
        newMessage.innerHTML = `<p classs='parag'>${message}</p> `;
        chatBody.appendChild(newMessage);
        
    }
    function geoposition(latitude, longitude){
        let newGeo = document.createElement('a');
        newGeo.classList.add('myMessage');
        // // const ssilka = document.createElement('a')
        // newGeo.i
        newGeo.setAttribute("href", `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
        newGeo.setAttribute("target", "_blanK");
        newGeo.textContent= 'Ваше местоположение:';
        chatBody.appendChild(newGeo);
    }




    btn.addEventListener('click', () => {
        const inputValue = document.getElementById('inp').value;
        const textMessage = inputValue.toString();
        if ((textMessage.trim().length == 0)||(!textMessage)) { //проверка на пустой input
            return
        } else {        
            sendMessage(inputValue);
            websocket.send(inputValue);
        }
        
        

        document.getElementById('inp').value = ' ';
    })

    // geo.addEventListener('click', ()=>{
        
    // })


    
})