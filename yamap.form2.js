var debug=true;
var myselectedPlacemark;
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
myMap.cursors.push('crosshair');
myMap.controls.add(
	new ymaps.control.ZoomControl()  // Добавление элемента управления картой
	); 
myMap.controls
.add('zoomControl')
.add('fullscreenControl');

var filter1Button = new ymaps.control.Button('Все');		
myMap.controls.add(filter1Button, {float: 'right'});		
filter1Button.select();

var filterNextYButton = new ymaps.control.Button('2024');		
myMap.controls.add(filterNextYButton, {float: 'right'});
filterNextYButton.select();
getJSON('db.php',SetPlacemarks);
myMap.events.add('click', ShowCoors,this);
myselectedPlacemark = new ymaps.Placemark([document.getElementById("latitude").value,document.getElementById("longitude").value], { },{preset: 'islands#blueAttentionIcon'});				
myMap.geoObjects.add(myselectedPlacemark);
}

//*****************************
function ShowCoors(e){
//*****************************
if (!myMap.balloon.isOpen()) 
	{
	var coords = e.get('coords');
	myMap.balloon.open(coords, {
		contentHeader:'Добавить выбранные координаты?',
		contentBody:[
			coords[0].toPrecision(6),
			coords[1].toPrecision(6) + '&nbsp; &nbsp; &nbsp; <button onclick="GrabCoords('+coords[0].toPrecision(6)+','+coords[1].toPrecision(6)+')">Да</button>'
			].join(', ') 			
		});
	}
else
	{
	myMap.balloon.close();
	}
}

//*****************************
function GrabCoords(x,y){
//*****************************
document.getElementById("latitude").value=x;
document.getElementById("longitude").value=y;
OnChange();
myMap.balloon.close();
//document.getElementById("Address").value=myselectedPlacemark.getAddressLine();

//getLocalities().length ? myselectedPlacemark.getLocalities() : myselectedPlacemark.getAdministrativeAreas();

//firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas()


}
//*****************************
function OnChange(){
//*****************************
myselectedPlacemark.geometry.setCoordinates([document.getElementById("latitude").value, document.getElementById("longitude").value]);
}

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