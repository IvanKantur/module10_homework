const btn = document.querySelector('.btn');
const inp = document.querySelector('.inp').value;

btn.addEventListener('click', () => {

    const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com');

    alert(`Ширина экрана : ${width} px. Высота экрана : ${height} px`);
})