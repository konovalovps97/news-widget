'use strict';

var socket = new SockJS('/ws');
var stompClient = Stomp.over(socket);

stompClient.connect({}, onConnected, onError);


function onError(error) {
}

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0',
    '#FFA07A', '#FFC0CB', '#F0E68C', '#FFA07A'
];


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
    console.log(message);

    var newsBox = document.getElementById('main-box');
    message.forEach(function () {
        var div = document.createElement('div');
        div.className = 'card';
        var innerDiv = document.createElement('div');
        innerDiv.className = 'card-head';
        innerDiv.style.backgroundColor = getAvatarColor();
        innerDiv.innerHTML = "<div class=\"head\">Заголовок новости</div>\n" +
            "            <div class=\"informed\">\n" +
            "                <label>\n" +
            "                    <input type=\"checkbox\">\n" +
            "                </label>\n" +
            "                Не Ознакомлен\n" +
            "            </div>\n" +
            "            <div class=\"\">Скиллы</div>\n" +
            "            <div class=\"\">Тема</div>\n";

        div.appendChild(innerDiv);
        div.innerHTML +=
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
    });

}

function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < getRandomInt(); i++) {
        hash = 31 * hash + getRandomInt();
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
}

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(40));
}


document.getElementById('dtOpen').onchange = function (ev) {
    var date = new Date(document.getElementById('dtOpen').value).getTime();
    localStorage.setItem('dtOpen', date.toString());
};

document.getElementById('dtClose').onchange = function (ev) {
    var date = new Date(document.getElementById('dtClose').value).getTime();
    localStorage.setItem('dtClose', date.toString());
    alert(localStorage.getItem('dtOpen'));
    if (localStorage.getItem('dtOpen') === null) {
        document.getElementById('dtOpen').value = '01/01/2010';
        var autoCreateDateOpen = new Date( document.getElementById('dtOpen').value).getTime();
        localStorage.setItem('dtOpen', autoCreateDateOpen.toString())
    }
};

function filter() {

}