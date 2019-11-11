var socket = new SockJS('/ws');
stompClient = Stomp.over(socket);

stompClient.connect({}, onConnected, onError);


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}

function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: 'PAVEL', type: 'JOIN'})
    );
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    var newsBox = document.getElementById('main-box');
    var div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = "        <div class=\"card-head\">\n" +
        "            <div class=\"head\">Заголовок новости</div>\n" +
        "            <div class=\"informed\">\n" +
        "                <label>\n" +
        "                    <input type=\"checkbox\">\n" +
        "                </label>\n" +
        "                Не Ознакомлен\n" +
        "            </div>\n" +
        "            <div class=\"\">Скиллы</div>\n" +
        "            <div class=\"\">Тема</div>\n" +
        "\n" +
        "        </div>\n" +
        "        <div class=\"card-body\">\n" +
        "            <div class=\"date\">\n" +
        "                12-01-2020\n" +
        "            </div>\n" +
        "\n" +
        "            <div class=\"text\">\n" +
        "                Текст (от лат. textus — ткань; сплетение, сочетание) — зафиксированная на каком-либо материальном\n" +
        "                носителе человеческая мысль; в общем плане связная и полная последовательность символов.\n" +
        "            </div>\n" +
        "\n" +
        "            <div class=\"link\">\n" +
        "                <a href=\"https://google.com\">Ссылка на статью</a>\n" +
        "            </div>\n" +
        "\n" +
        "            <div class=\"skill\">Тестовый скилл</div>\n" +
        "\n" +
        "            <div class=\"topic\">Тестовая тема</div>\n" +
        "        </div>\n";
    newsBox.appendChild(div);
}

