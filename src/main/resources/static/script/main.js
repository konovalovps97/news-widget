'use strict';

let socket = new SockJS('/ws');
let stompClient = Stomp.over(socket);

stompClient.connect({}, onConnected, onError);

let allNews = [];
let allNewsOnPage = [];

function onError(error) {
}

let colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0',
    '#FFA07A', '#FFC0CB', '#F0E68C', '#FFA07A'
];


function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);
    localStorage.clear();
    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: 'PAVEL', type: 'JOIN'})
    );
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    message.forEach((element) => {
        allNews.push(element)
    });
    var newsBox = document.getElementById('main-box');
    message.forEach(function (element) {
        let date = element.date;
        let div = document.createElement('div');
        div.className = 'card';
        let innerDiv = document.createElement('div');
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
            "            <div class=\"date\">\n" + element.date +
            "            </div>\n" +
            "\n" +
            "            <div class=\"text\">\n" +
            "                " + element.text +
            "            </div>\n" +
            "\n" +
            "            <div class=\"link\">\n" +
            "                <a href=\"https://google.com\">Ссылка на статью</a>\n" +
            "            </div>\n" +
            "\n" +
            "            <div class=\"skill\">" + element.skills + "</div>\n" +
            "\n" +
            "            <div class=\"topic\">" + element.topic + "</div>\n" +
            "        </div>\n";
        newsBox.appendChild(div);
    });

}

document.getElementById('dtOpen').onselect = function (ev) {
    let date = new Date(document.getElementById('dtOpen').value).getTime();

    if (localStorage.getItem('dtClose') === null) {
        let now = new Date();
        document.getElementById('dtClose').value = now.getMonth() + 1 + '/' + now.getDate() + '/' + now.getFullYear();
        localStorage.setItem('dtClose', now.getTime().toString());
    } else {
        if (date > +localStorage.getItem('dtClose')) {
            document.getElementById('dtOpen').value = '01/01/2010';
            alert('error');
            return;
        }
    }
    localStorage.setItem('dtOpen', date.toString());
    filter();
};

document.getElementById('dtClose').onchange = function (ev) {
    let date = new Date(document.getElementById('dtClose').value).getTime();
    if (date == localStorage.getItem('dtClose')) return;
    localStorage.setItem('dtClose', date.toString());
    if (localStorage.getItem('dtOpen') === null) {
        document.getElementById('dtOpen').value = '01/01/2010';
        let autoCreateDateOpen = new Date(document.getElementById('dtOpen').value).getTime();
        localStorage.setItem('dtOpen', autoCreateDateOpen.toString())
    }
    filter();
};

function filter() {
    let result = allNews;
    for (let i = 0; i < localStorage.length; i++) {
        switch (localStorage.key(i)) {
            case 'dtOpen':
            case 'dtClose': {
                allNewsOnPage = allNews.filter(value => {
                    let filterDate = new Date(value.date).getTime();
                    return filterDate > localStorage.getItem('dtOpen') && filterDate < localStorage.getItem('dtClose')}
                );
                console.log(allNewsOnPage);
                i++;
                break;

            }

        }
    }
}


function getAvatarColor(messageSender) {
    let hash = 0;
    for (var i = 0; i < getRandomInt(); i++) {
        hash = 31 * hash + getRandomInt();
    }

    let index = Math.abs(hash % colors.length);
    return colors[index];
}

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(40));
}