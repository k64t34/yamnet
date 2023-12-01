var debug=true;
//*****************************
var getJSON = function(url, callback) { //https://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript
//*****************************	
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;	  
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};
//*****************************
window.onload = function() {
//*****************************
ymaps.ready(init); 
var myMap;
}	
//*****************************
function init() {
//*****************************
myMap = new ymaps.Map("map", {
	center: [44.042565, 43.069006], // Координаты центра карты
	zoom: 12, // Scale
	controls: []
},
{suppressMapOpenBlock: true}); 

myMap.controls.add(
	new ymaps.control.ZoomControl()  // Добавление элемента управления картой
); 

/*myPlacemark = new ymaps.Placemark([44.027111, 43.073238], { // Координаты метки объекта
	balloonContent: "<div class='ya_map'>12.11.2023</div>" // Подсказка метки
}, {
	preset: "twirl#redDotIcon" // Тип метки
});		
myMap.geoObjects.add(myPlacemark); // Добавление метки
myPlacemark.balloon.open(); // Открытие подсказки метки*/

/*myPlacemark2 = new ymaps.Placemark([44.025133, 43.071600], { },{preset: 'islands#redAttentionCircleIcon'});				
myMap.geoObjects.add(myPlacemark2); // Добавление метки*/

/*myPlacemark3 = new ymaps.Placemark([44.027111, 43.073238], { },{preset: 'islands#redAttentionCircleIcon'});		
myMap.geoObjects.add(myPlacemark3); // Добавление метки*/

/*myPlacemark4 = new ymaps.Placemark([44.023913, 43.072126], { },{preset: 'islands#redAttentionCircleIcon'});				
myMap.geoObjects.add(myPlacemark4); // Добавление метки*/

/*myPlacemark5 = new ymaps.Placemark([44.025309, 43.074248], { },{preset: 'islands#redAttentionCircleIcon'});		
myMap.geoObjects.add(myPlacemark5); // Добавление метки

myPlacemark6 = new ymaps.Placemark([44.017693, 43.070012], { balloonContent: "<div class='ya_map'>Дата обращения 04.02.2021<br> Отремонтирована 25.04.2021<br><img  src= &quot;https://cdn.obyasnyaem.ru/upload/iblock/33f/645qa33mo06c72kdiizn3bm6ul1x9z83/TASS_54034596.jpg &quot; alt=&quot;https://cdn.obyasnyaem.ru/upload/iblock/33f/645qa33mo06c72kdiizn3bm6ul1x9z83/TASS_54034596.jpg&quot;></div>"},{preset: 'islands#greenAutoCircleIcon'});
myMap.geoObjects.add(myPlacemark6); // Добавление метки
<!--Icon collection yandex map	https://yandex.ru/dev/jsapi-v2-1/doc/ru/v2-1/ref/reference/option.presetStorage-->
*/
myMap.controls
.add('zoomControl')
.add('fullscreenControl');

var firstButton = new ymaps.control.Button('Добавить');		
myMap.controls.add(firstButton, {float: 'left'});		
firstButton.events.add(["click"], function (event) {
	window.location.href = 'https://forms.yandex.ru/cloud/655a3ab5eb6146590ae4d25f/';			
	});		


var filter1Button = new ymaps.control.Button('Все');		
myMap.controls.add(filter1Button, {float: 'right'});		
filter1Button.select();

var filterNextYButton = new ymaps.control.Button('2024');		
myMap.controls.add(filterNextYButton, {float: 'right'});
filterNextYButton.select();

/*var filter2Button =   new ymaps.control.Button({
data: {
	// Зададим текст и иконку для кнопки.
	//content: "Показать отремонтированные участки",
	// Иконка имеет размер 16х16 пикселей.
	image: 'Sign4.png'        
}
});
myMap.controls.add(filter2Button, 
	{position: 
		{
		left: 0,
		button: 0
		}
	}	
);*/

getJSON('db.php',SetPlacemarks);

//**********************************************************
myMap.events.add('click', function (e) {
//**********************************************************	
	if (!myMap.balloon.isOpen()) {
		var coords = e.get('coords');
		myMap.balloon.open(coords, {
			contentHeader:'Событие!',
			contentBody:'<p>Кто-то щелкнул по карте.</p>' +
				'<p>Координаты щелчка: ' + [
				coords[0].toPrecision(6),
				coords[1].toPrecision(6)
				].join(', ') + '</p>',
			contentFooter:'<sup>Щелкните еще раз</sup>'
		});
	}
	else {
		myMap.balloon.close();
	}
});
//**********************************************************
// Обработка события, возникающего при щелчке
// правой кнопки мыши в любой точке карты.
// При возникновении такого события покажем всплывающую подсказку
// в точке щелчка.
myMap.events.add('contextmenu', function (e) {
	myMap.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
});
//**********************************************************    
// Скрываем хинт при открытии балуна.
myMap.events.add('balloonopen', function (e) {
	myMap.hint.close();
});

};

//*****************************
function SetPlacemarks(err, data) {
//*****************************
if (err !== null)
	{
    alert('Ошибка получения данных: Ответ от сервера ' + err);
    }
else if( data == null) 
	{
	alert('Ошибка получения данных: сервер не предоставил данных ');	
	}
else     
  {    
   for (let i in data.Placemark) 
	{	
	myPlacemark = new ymaps.Placemark([data.Placemark[i].latitude,data.Placemark[i].longitude], { },{preset: 'islands#redAttentionCircleIcon'});				
	myMap.geoObjects.add(myPlacemark); // Добавление метки
	}	
  }
}