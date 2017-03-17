/**
 * Created by Guillaume on 15/03/2017.
 */

/*function setDateAndTime()
{
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/";

    if((currentdate.getMonth()+1)<10)
        datetime = datetime + "0" + (currentdate.getMonth()+1)  + "/";

    else
        datetime = datetime + (currentdate.getMonth()+1) + "/";

    datetime = datetime + currentdate.getFullYear();

    if(currentdate.getHours()<10)
        var hourtime = "0" + currentdate.getHours() + ":";

    else
        var hourtime = currentdate.getHours() + ":";

    if(currentdate.getMinutes()<10)
        hourtime = hourtime + "0" + currentdate.getMinutes() + ":";
    else
        hourtime = hourtime + currentdate.getMinutes() +":";

    if(currentdate.getSeconds()<10)
        hourtime = hourtime + "0" + currentdate.getSeconds();

    else
        hourtime = hourtime + currentdate.getSeconds();

    $("b#dateId").html(datetime);
    $("b#hourId").html(hourtime);
}

function createDateTimeWidget(content)
{
    var divCard = document.createElement("div");
    var divContentCard = document.createElement("div");
    var icon = document.createElement("i");
    var button = document.createElement("a");
    var title = document.createElement("h4");
    var ligne = document.createElement("br");
    var date = document.createElement("h5");
    var hour = document.createElement("h5");

    $(divCard).attr("class","card-panel light-blue darken-4 hoverable");
    //$(divCard).attr("id","dateHourWidget");
    $(divContentCard).attr("class","card-content");
    $(icon).attr("class","material-icons");
    $(button).attr("class","right btn-floating N/A transparent");
    $(button).attr("onClick","deleteWidget('dateHourWidget');")
    $(title).attr("class", "center-align indigo-text text-lighten-5");
    $(date).attr("class","center-align indigo-text text-lighten-5");
    $(hour).attr("class","center-align indigo-text text-lighten-5");

    $(icon).html("clear");
    $(button).append($(icon));
    $(title).html("<b>Date et Heure</b>");
    $(date).html("Date : <b id='dateId'></b>");
    $(hour).html("Heure : <b id='hourId'></b>");

    $(divContentCard).append($(button));
    $(divContentCard).append($(title));
    $(divContentCard).append($(ligne));
    $(divContentCard).append($(date));
    $(divContentCard).append($(ligne));
    $(divContentCard).append($(hour));

    $(divCard).append($(divContentCard));

    $(divCard).fadeIn(0);
    content.append(divCard);
}


function openClockWidget2()
{
    var mainContent = document.getElementById("content");
    var base = document.createElement("div");
    $(base).attr("class", "panel col-md-4");
    var title = document.createElement("div");
    $(title).attr("class", "panel-heading");
    $(title).html("Clock");
    var content = document.createElement("div");
    $(content).attr("id","dateHourWidget");
    $(content).attr("class","panel-body");
    createDateTimeWidget($(content));
    widgetDateHeure=true;
    setInterval("setDateAndTime()",1000);
    $(base).append($(title), $(content));
    $(mainContent).append($(base));
}*/

/*** CLOCK ***/
function openClockWidget() {
    $("#content").append(
        '<div class="panel panel-default" style="margin-left: 100px;">'+
            '<div class="panel-heading"><img src="assets/img/clock.png" style="width: 20px; margin-right: 5px; margin-top: 0;">Calendar & Date</div>' +
            '<div class="panel-body">' +
                '<div style="text-align:center;">'+
                    '<h2>' +
                    '<span style="color:gray;">Heure actuelle</span>' +
                    '<br />' +
                    'France' +
                    '</h2>'+
                    '<iframe src="http://www.zeitverschiebung.net/clock-widget-iframe-v2?language=fr&timezone=Europe%2FParis" width="100%" height="150" frameborder="0" seamless></iframe>' +
                '</div>' +
                /*
            '<div id="calendar"></div>'+
            '<script src="https://www.jqwidgets.com/public/jqwidgets/jqx-all.js"></script>' +
            '<script src="https://www.jqwidgets.com/public/jqwidgets/globalization/globalize.js"></script>' +
            '<script src="https://www.jqwidgets.com/public/jqwidgets/jqx-all.js"></script>' +
            '<link rel="stylesheet" href="https://www.jqwidgets.com/public/jqwidgets/styles/jqx.arctic.css">' +
            '<link rel="stylesheet" href="https://www.jqwidgets.com/public/jqwidgets/styles/jqx.energyblue.css">' +
            '<link rel="stylesheet" href="https://www.jqwidgets.com/public/jqwidgets/styles/jqx.base.css">' +*/
            '</div>' +
        '</div>');
   // $("#calendar").jqxCalendar({theme: "arctic", width:250, height:250});
}



/*** METEO ***/
function openMeteoWidget() {
    $("#content").append(
        '<div class="panel panel-default" style="margin-left: 500px;">'+
            '<div class="panel-heading"><img src="assets/img/meteo.png" style="width: 20px; margin-right: 5px; margin-top: 0;">Meteo</div>' +
            '<div class="panel-body">' +
                '<div id="formMeteo" class="input-group" style="text-align:center;">'+
                    '<input type="text" class="form-control" id="city" placeholder="Entrer une Ville">' +
                    '<div class="input-group-addon">' +
                        '<button class="glyphicon glyphicon-search" type="submit" onclick="loadMeteo()" style="background-color: transparent; border: 0;"></button>'+
                    '</div>' +
                '</div>'+
                '<div id="contentMeteo"></div>' +
            '</div>'+
        '</div>');

}
function loadMeteo() {
    $('#contentMeteo').empty();
    var city=document.getElementById("city");
    var url="http://api.openweathermap.org/data/2.5/weather?q="+city.value+"&APPID=2a8f14dc6f4630e4a6df0cfb24c3e785";

    $.getJSON(url,function(data){
        var icone = data.weather[0].icon;
        var temperature = data.main.temp;
        temperature= parseFloat(temperature);
        parseInt(temperature);
        temperature =parseInt(temperature-273.15);
        temperature = temperature.toString();
        $('#contentMeteo').append("Temps : <img src='http://openweathermap.org/img/w/"+ icone + ".png' /><br/><br/>");
        $('#contentMeteo').append('Température : ' + temperature + '°C<br>');
    })
}



/*** PHOTO ***/
function openPhotoWidget() {
    //27844e5b0b4a97b0621bd50aa2d424c3 cle
    //f9200d08f9caf63e secret
    $("#content").append(
        '<div class="panel panel-default" style="margin-left: 500px; width: 400px;">'+
            '<div class="panel-heading"><img src="assets/img/photo.png" style="width: 20px; margin-right: 5px; margin-top: 0;">Photos</div>' +
            '<div class="panel-body">' +
                '<div id="formPhotos" class="input-group" style="text-align:center;">'+
                    '<input type="text" class="form-control" id="searchPhoto" placeholder="Recherche de Photos">' +
                    '<div class="input-group-addon">' +
                        '<button class="glyphicon glyphicon-search" type="submit" onclick="loadPhoto()" style="background-color: transparent; border: 0;"></button>'+
                    '</div>' +
                '</div>'+
            '<div id="contentPhoto"></div>' +
            '</div>'+
        '</div>');

}



/*** TWITTER ***/
function openTwitterWidget() {

}



/*** YOUTUBE ***/
function openYoutubeWidget() {
    $("#content").append(
        '<div class="panel panel-default" style="margin-left: 500px; width: 400px;">'+
            '<div class="panel-heading"><img src="assets/img/youtube.png" style="width: 20px; margin-right: 5px; margin-top: 0;">Youtube</div>' +
            '<div class="panel-body">' +
                '<div id="formYoutube" class="input-group" style="text-align:center;">'+
                    '<input type="text" class="form-control" id="searchYoutube" placeholder="Entrer des mots clefs">' +
                    '<div class="input-group-addon">' +
                        '<button class="glyphicon glyphicon-search" type="submit" onclick="loadYoutube()" style="background-color: transparent; border: 0;"></button>'+
                    '</div>' +
                '</div>'+
                '<div id="contentYoutube"></div>' +
            '</div>'+
        '</div>');
}

function loadYoutube() {
    var video = document.getElementById('contentYoutube');
    $(video).empty();
    var res= '<center><iframe style="margin-top: 15px;" id="playerYoutube" type="text/html" width="300" height="230" src="http://www.youtube.com/embed?listType=search&list='+ document.getElementById('searchYoutube').value +'" frameborder="0" /></center>';
    $(video).append(res);
}



/*** MAPS ***/
function openMapWidget() {
    $("#content").append(
        '<div class="panel panel-default" style="margin-left: 500px; width: 400px;">'+
            '<div class="panel-heading"><img src="assets/img/map.png" style="width: 20px; margin-right: 5px; margin-top: 0;">Google Maps</div>' +
            '<div class="panel-body">' +
                '<div id="formMap" class="input-group" style="text-align:center;">'+
                    '<input type="text" class="form-control" id="cityMap" placeholder="Choisir la ville de départ vers l\'IUT">' +
                    '<div class="input-group-addon">' +
                        '<button class="glyphicon glyphicon-search" type="submit" onclick="loadMap()" style="background-color: transparent; border: 0;"></button>'+
                    '</div>' +
                '</div>'+
                '<div id="contentMap"></div>' +
            '</div>'+
        '</div>');
}

function loadMap() {
    $('#contentMap').append(
        '<script async defer' +
            'src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB9uYrVlWePmplmCxu_J2qGcbPRS3xte_g&callback=initMap">' +
        '</script>');

    map = new google.maps.Map(document.getElementById('contentMap'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
    /*** CLE API GOOGLE = AIzaSyB9uYrVlWePmplmCxu_J2qGcbPRS3xte_g ***/
  //  google.maps.event.addDomListener(window, 'load', initialize);
}

function initialize() {
    var myOptions = {
        zoom: 15,
        center: new google.maps.LatLng(40.73, -73.98),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
}


/*** SPORT ***/
function openSportWidget() {

}

/*** SUPPRESSION ***/
function DeleteWidget() {

}