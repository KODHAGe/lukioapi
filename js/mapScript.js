// Piirretään yksi (1) kpl lukiovertailukarttaa.
// Copyright 2013 STT-Lehtikuva

// luetaan kartan muuttjat urlista (pituuspiiri, leveyspiiri, zoomausaste)
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


var alZoom = getUrlVars()["zoom"];
var alLat = getUrlVars()["lat"];
var alLong = getUrlVars()["lon"];

// jos muuttujia ei ole määritelty urlissa, käytetään oletusarvoja

if (alZoom==undefined || alZoom.length <= 0)
{
var alZoom = 6;
}
if (alLat==undefined || alLat.length <= 0)
{
var alLat = 62.241222;
}
if (alLong==undefined || alLong.length <= 0)
{
var alLong = 25.742411;
}


// Luodaan kartta #map-diviin ja asetetaan alkulat -long ja -zoom
var map = L.map('map').setView([    
alLat,alLong], alZoom);

// Lisätään MapQuest karttakerros; footeriin attriuutio käyttöehtojen mukaisesti
          L.tileLayer('http://otile4.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy;  <a href="www.openstreetmap.org/copyright">OpenStreetMap</a> — Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'
          }).addTo(map);

// Luodaan AwesomeMarkers-pluginilla ikoneja aseteltavaksi kartalle (tähän jotain hienompaa?)
var redMarker = L.AwesomeMarkers.icon({
  icon: 'empty', 
  color: 'red'
})

var orangeMarker = L.AwesomeMarkers.icon({
  icon: 'empty', 
  color: 'orange'
})

var greenMarker = L.AwesomeMarkers.icon({
  icon: 'empty', 
  color: 'green'
})

var darkgreenMarker = L.AwesomeMarkers.icon({
  icon: 'empty', 
  color: 'darkgreen'
})

/*var cadetblueMarker = L.AwesomeMarkers.icon({
  icon: 'empty', 
  color: 'cadetblue'
})

var blueMarker = L.AwesomeMarkers.icon({
  icon: 'empty', 
  color: 'blue'
})

var darkblueMarker = L.AwesomeMarkers.icon({
  icon: 'empty', 
  color: 'darkblue'
})*/

$.getJSON( "http://localhost:6565/lukio", function( data ) {
    $.each(data, function( i, item) {
        console.log(item.result);
	var val = parseFloat(item.result);
    var markerType;
        
    if (val >= 0.2) {
    console.log("green")
	markerType = greenMarker;
	} else if (val >= -0.2 && val <= 0.2) {
    console.log("orange")
	markerType = orangeMarker;
	} else if (val < -0.2) {
    console.log("red")
	markerType = redMarker;
	}
	
	/*
	if (val >= 0.2) {
	markerType = blueMarker;
	} else if (val >= -0.2 && val <= 0.2) {
	markerType = darkblueMarker;
	} else if (val < -0.2) {
	markerType = cadetblueMarker;
	}
    */
    console.log(redMarker);

    L.marker([item.lat,item.lon],{icon:markerType}).addTo(map).bindPopup("<h2>"+item.schoolName+"<h2>");
    });
});

// Poimitaan erillisessä .js:ssä tallennettu lukiodata ja piirretään markerit kartalle sen mukaisesti
// Parhaat lukiot (muutos > 0.5) saavat kirkkaan vihreän, puolenvälin ylittävät (muutos > 0) tumman vihreän, puolenvälin alittavat (muutos < 0) oranssin ja huonoiten pärjänneet (muutos < -0.5) punaisen merkin.
/*for (var i = 0; i < mapdata.length; i++) {
	var markerType;
	var val = parseFloat((mapdata[i][3]).replace(/,/, '.'));;
	
	if (val >= 0.2) {
	markerType = greenMarker;
	} else if (val >= -0.2 && val <= 0.2) {
	markerType = orangeMarker;
	} else if (val < -0.2) {
	markerType = redMarker;
	}
	
	
	if (val >= 0.2) {
	markerType = blueMarker;
	} else if (val >= -0.2 && val <= 0.2) {
	markerType = darkblueMarker;
	} else if (val < -0.2) {
	markerType = cadetblueMarker;
	}
	
	
	L.marker([mapdata[i][1],mapdata[i][2]], {icon:markerType}).addTo(map).bindPopup(mapdata[i][5]+" <a href='index.html?zoom=12&lat="+mapdata[i][1]+"&lon="+mapdata[i][2]+"'>Linkki tähän kouluun.</a><br/><br/><iframe src='http://www.facebook.com/plugins/like.php?href=http://09695811.net/lukiovertailu/index.html?zoom=12&lat="+mapdata[i][1]+"&lon="+mapdata[i][2]+"&amp;send=false&amp;layout=button_count&amp;width=150&amp;show_faces=false&amp;font=arial&amp;colorscheme=light&amp;action=like&amp;height=21&amp;appId=167389803437269' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:150px; height:21px;' allowTransparency='true'></iframe><br/><iframe allowtransparency='true' frameborder='0' scrolling='no' src='https://platform.twitter.com/widgets/tweet_button.html?url=http://09695811.net/lukiovertailu/index.html?zoom=12&lat="+mapdata[i][1]+"&lon="+mapdata[i][2]+"' style='width:130px; height:20px;'></iframe>");
	}*/
    