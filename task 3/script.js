const btnSend = document.querySelector('.j-btn-send');
const btnPosition = document.querySelector('.j-btn-position');
const input = document.querySelector('.input');
const chat = document.querySelector('.chat');

// const wsUri = "wss://socketsbay.com/wss/v2/1/demo/";
const wsUri = "wss://ws.postman-echo.com/raw";

const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    mapLink = document.createElement("a");
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Гео-Позиция';
    mapLink.target = "_blank";
    let row = document.createElement("div");
    row.style.display = 'flex';
    row.style.justifyContent = 'end';
    let div = document.createElement("div");
    div.classList.add('request', 'chatmessages');
    div.appendChild(mapLink);
    row.appendChild(div);
    chat.appendChild(row);
};

const error = () => {
    writeToChat1('Невозможно получить ваше местоположение');
};

let websocket;
websocket = new WebSocket(wsUri);
websocket.onopen = function(evt) {
    writeToChat2('<span style="color: green;">CONNECTED</span>');
};
websocket.onmessage = function(evt) {
    writeToChat2(evt.data);
};
websocket.onerror = function(evt) {
    writeToChat2(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
};

function writeToChat1(message) {
  let row = document.createElement("div");
  row.style.display = 'flex';
  row.style.justifyContent = 'end';
  let pre = document.createElement("div");
  pre.classList.add('request', 'chatmessages');
  pre.innerHTML = message;
  row.appendChild(pre);
  chat.appendChild(row);
};

function writeToChat2(message) {
    let row = document.createElement("div");
    row.style.display = 'flex';
    row.style.justifyContent = 'start';
    let pre = document.createElement("div");
    pre.classList.add('answer', 'chatmessages');
    pre.innerHTML = message;
    row.appendChild(pre);
    chat.appendChild(row);
  };

btnSend.addEventListener('click', () => {
  let message = input.value;
  input.value = '';
  writeToChat1(message);
  websocket.send(message);
});

btnPosition.addEventListener('click', () => {
    if (!navigator.geolocation) {
        writeToChat1('Geolocation не поддерживается вашим браузером');
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
  });
