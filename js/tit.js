let apiurl = "https://rfrk.ru/tit/formResponse";
let number = window.location.search.split("?")[1];
document.getElementById("number").innerText = number;
document.getElementById("prev").href = "?" + (parseInt(number) - 1);
document.getElementById("next").href = "?" + (parseInt(number) + 1);
//
function func(url, number, status) {
  //
  var token = "5430048154:AAEFptLp8IdbKirOYJzzM3ekyTd2ibVLMNc";
  var chat_id = "190404167";
  var link = `https://goshva.github.io/qrConstr/?${number}`;
  var link = `http://localhost:1313/?${number}`;
  //var msg = `${link} from ${getCookie('@')}`
  var msg = `${number}in stus${status} from ${getCookie("@")}`;
  var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${msg}&parse_mode=html`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //window.location.href = link;
    });
  //
  return fetch(url, {
    headers: {
      accept: "application/xml, text/xml, */*; q=0.01",
      "accept-language":
        "en,ru;q=0.9,es;q=0.8,zh;q=0.7,th;q=0.6,en-US;q=0.5,an;q=0.4,und;q=0.3",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer: "https://rfrk.ru/tit/?" + number,
    referrerPolicy: "strict-origin-when-cross-origin",
    body:
      "entry.1134586381=" +
      number +
      "&entry.1496506828=" +
      status +
      "&entry.807958025=12312&entry.703388132=3123",
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
}

function add() {
  func(apiurl, number, "1")
    .then((data) => alert("Кормушка пополнена"))
    .catch(function (error) {
      console.log("request failed", error);
    });
}
document.getElementById("add").addEventListener("click", add);

function empted() {
  func(apiurl, number, "0")
    .then((data) => alert("Высылаем волонтера"))
    .catch(function (error) {
      console.log("request failed", error);
    });
}
document.getElementById("empted").addEventListener("click", empted);
//
const url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSnEkO8XAkvqrdI1W8Iv9WKOQRWzNLlCJ9GmmvUSSu1VacORxo3VX3UiXvzOgkq8hqSpOGsHwhApfkr/pub?gid=1675273004&single=true&output=csv";
let feeders = [];
fetch(url)
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    feeders = data.split(/\r?\n/);
    ymaps.ready(init);
  });
//yandex baloons

function init() {
  var myMap = new ymaps.Map(
    "map",
    {
      // center: [43.89645442, 42.73835063],
      center: [43.9002, 42.738],
      zoom: 15,
    },
    {}
  );
  feeders.forEach(function (value, i) {
    partset = value.split(",");
    const lat = parseFloat(partset[2].split('"')[1]);
    const lon = parseFloat(partset[3]);
    myMap.behaviors.disable("scrollZoom");
    if (number == i) {
      myMap.setCenter([lat, lon], 17, {
        checkZoomRange: true,
      });
    }
    myMap.behaviors.disable("scrollZoom");
    myMap.geoObjects.add(
      new ymaps.Placemark(
        [lat, lon],
        {
          balloonContent: partset[1],
          iconCaption: i,
        },
        {
          preset: "islands#blueCircleDotIconWithCaption",
          iconCaptionMaxWidth: "50",
        }
      )
    );
  });
}

// cooke stuff
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(key) {
  var user = getCookie(key);
  if (user != "") {
    //alert("Welcome again " + user);
    setCookie(user, 0, 30);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 30);
    }
  }
}

var test_items = document.querySelectorAll(".test");
var result = document.getElementById("result");

for (var i = 0; i < test_items.length; i++) {
  test_items[i].addEventListener(
    "click",
    function () {
      //
      e.preventDefault();
      console.log(this);
      if (getCookie("@") == "") {
        var from = prompt("@?").toLowerCase();
        setCookie("@", from, 365);
      }

      //
    },
    false
  );
}
