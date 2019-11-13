'use strict';

let socket = new SockJS('/ws');
let stompClient = Stomp.over(socket);
let newsBox = document.getElementById('news-box');
let status = document.getElementById('inputGroupSelect01');
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
    let message = JSON.parse(payload.body);
    console.log(message);
    message.forEach((element) => {
        element.color = getAvatarColor();
        element.id = allNews.length;
        allNews.push(element)
    });
    addElementOnPage(message);
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
    for (let i = 0; i < localStorage.length; i++) {
        alert(localStorage.key(i));
        switch (localStorage.key(i)) {
            case 'dtOpen':
            case 'dtClose': {
                if (allNewsOnPage.length === 0) {
                    allNewsOnPage = allNews.filter(value => {
                            let filterDate = new Date(value.date).getTime();
                            return filterDate > localStorage.getItem('dtOpen') && filterDate < localStorage.getItem('dtClose')
                        }
                    );
                } else {
                    allNewsOnPage = allNewsOnPage.filter(value => {
                            let filterDate = new Date(value.date).getTime();
                            return filterDate > localStorage.getItem('dtOpen') && filterDate < localStorage.getItem('dtClose')
                        }
                    );
                }
                i++;
                break;
            }
            case 'familiar' : {
                if (allNewsOnPage.length === 0) {
                    allNewsOnPage = allNews.filter(value => {
                            return localStorage.getItem('familiar') === value.familiar.toString();
                        }
                    );
                } else {
                    allNewsOnPage = allNewsOnPage.filter(value => {
                            return localStorage.getItem('familiar') === value.familiar.toString();
                        }
                    );
                }
                break;
            }
            case 'Skill' : {
                break;
            }
            case  'Topic' : {
                break;
            }

        }
        while (newsBox.firstChild) {
            newsBox.removeChild(newsBox.firstChild);
        }
    }
    addElementOnPage(allNewsOnPage);
    document.getElementById('pagin').innerText = '';
    pagination();
}


function getAvatarColor(messageSender) {
    let hash = 0;
    for (let i = 0; i < getRandomInt(); i++) {
        hash = 31 * hash + getRandomInt();
    }

    let index = Math.abs(hash % colors.length);
    return colors[index];
}

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(40));
}


function addElementOnPage(message) {
    message.forEach(function (elemento) {
        let div = document.createElement('div');
        div.className = 'card';
        let innerDiv = document.createElement('div');
        innerDiv.className = 'card-head';
        innerDiv.style.backgroundColor = elemento.color;
        innerDiv.innerHTML = "<div class=\"head\">Заголовок новости</div>\n" +
            "            <div class=\"informed\">\n" +
            "                <label>\n" +
            "                    <input type=\"checkbox\" value=" + 123 + " id=" + "check" + elemento.id + " onchange='changeValue(this.id, this.value)'>\n" +
            "               " +
            "Не Ознакомлен </label>\n" +
            "            </div>\n" +
            "            <div class=\"\">Скиллы</div>\n" +
            "            <div class=\"\">Тема</div>\n";

        div.appendChild(innerDiv);
        div.innerHTML +=
            "        <div class=\"card-body\">\n" +
            "            <div class=\"date\">\n" + elemento.date +
            "            </div>\n" +
            "\n" +
            "            <div class=\"text\">\n" +
            "                " + elemento.text +
            "            </div>\n" +
            "\n" +
            "            <div class=\"link\">\n" +
            "                <a href=\"https://google.com\">Ссылка на статью</a>\n" +
            "            </div>\n" +
            "\n" +
            "            <div class=\"skill\">" + elemento.skills + "</div>\n" +
            "\n" +
            "            <div class=\"topic\">" + elemento.topic + "</div>\n" +
            "        </div>\n";
        newsBox.appendChild(div);
    });
    document.getElementById('pagin').innerText = '';
    pagination();
}

function changeValue(id, news) {
    console.log(news.date);
    alert(123);
    document.getElementById(id).parentElement.parentElement.parentElement.parentElement.style.backgroundColor = '#CDC0BD';
    news.familiar = true;
    document.getElementById(id).parentElement.innerText = 'Ознкаомлен';
}

status.onchange = () => {
    if (status.value === 'Прочитанные') {
        localStorage.setItem('familiar', true.toString());
    } else {
        localStorage.setItem('familiar', false.toString());
    }
    filter();
};

function pagination() {
    //Pagination
    let pageSize = 4;
    let incremSlide = 5;
    let startPage = 0;
    let numberPage = 0;

    let pageCount = $(".card").length / pageSize;
    let totalSlidepPage = Math.floor(pageCount / incremSlide);

    for (var i = 0; i < pageCount; i++) {
        $("#pagin").append('<li><a href="#">' + (i + 1) + '</a></li> ');
        if (i > pageSize) {
            $("#pagin li").eq(i).hide();
        }
    }

    let prev = $("<li/>").addClass("prev").html("Prev").click(function () {
        startPage -= 5;
        incremSlide -= 5;
        numberPage--;
        slide();
    });

    prev.hide();

    let next = $("<li/>").addClass("next").html("Next").click(function () {
        startPage += 5;
        incremSlide += 5;
        numberPage++;
        slide();
    });

    $("#pagin").prepend(prev).append(next);

    $("#pagin li").first().find("a").addClass("current");

    let slide = function (sens) {
        $("#pagin li").hide();

        for (t = startPage; t < incremSlide; t++) {
            $("#pagin li").eq(t + 1).show();
        }
        if (startPage == 0) {
            next.show();
            prev.hide();
        } else if (numberPage == totalSlidepPage) {
            next.hide();
            prev.show();
        } else {
            next.show();
            prev.show();
        }


    };

    let showPage = function (page) {
        $(".card").hide();
        $(".card").each(function (n) {
            if (n >= pageSize * (page - 1) && n < pageSize * page)
                $(this).show();
        });
    };

    showPage(1);
    $("#pagin li a").eq(0).addClass("current");

    $("#pagin li a").click(function () {
        $("#pagin li a").removeClass("current");
        $(this).addClass("current");
        showPage(parseInt($(this).text()));
    });
}