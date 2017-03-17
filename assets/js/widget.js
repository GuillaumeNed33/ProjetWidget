/**
 * Created by Guillaume on 15/03/2017.
 */

var existWidgetClock = false;
var existWidgetMeteo = false;
var existWidgetPhotos = false;
var existWidgetTwitter = false;
var existWidgetYoutube = false;
var existWidgetMaps = false;
var existWidgetSport = false;

/*** CLOCK ***/
function openClockWidget() {
    if(existWidgetClock==false) {
        existWidgetClock= true;
        $("#content").append(
            '<div id="clockWid" class="panel panel-default" style="margin-left: 100px;">' +
            '<div class="panel-heading">' +
            '<div class="buttons">' +
            '<a href="#" onclick="closeWidget(\'clockWid\')">' +
            '<img src="assets/img/close.png" onmouseover="this.src=\'assets/img/close_hover.png\';" onmouseout="this.src=\'assets/img/close.png\';">' +
            '</a>'+
            '<a href="#" onclick="reduceWidget(\'clockWid\')">' +
            '<img src="assets/img/reduce.png" onmouseover="this.src=\'assets/img/reduce_hover.png\';" onmouseout="this.src=\'assets/img/reduce.png\';">' +
            '</a>'+
            '<a href="#" onclick="zoomWidget(\'clockWid\')">' +
            '<img src="assets/img/zoom.png" onmouseover="this.src=\'assets/img/zoom_hover.png\';" onmouseout="this.src=\'assets/img/zoom.png\';">' +
            '</a>'+
            '</div>'+
            '<div class="title">' +
            '<img class="logo" src="assets/img/clock.png">Calendar & Date</div></div>' +
            '<div class="panel-body">' +
            '<div style="text-align:center;">' +
            '<h2>' +
            '<span style="color:gray;">Heure actuelle</span>' + '<br />' + 'France' +
            '</h2>' +
            '<div class="clock" id="clock">' +
            '<div class="date"></div>' +
            '<div class="time"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');

        displayClock();
        //displayCalendar();
    }
}

function displayClock() {
    $(document).ready(function() {
        $("div#clock").simpleClock(1);
    });
    (function ($) {
        $.fn.simpleClock = function ( utc_offset ) {
            var weekdays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
            var months = ["Jan", "Fév", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
            var clock = this; function getTime() {
                var date = new Date();
                var nowUTC = date.getTime() + date.getTimezoneOffset()*60*1000;
                date.setTime( nowUTC + (utc_offset*60*60*1000) );
                var hour = date.getHours();
                return {
                    day: weekdays[date.getDay()],
                    date: date.getDate(),
                    month: months[date.getMonth()],
                    year: date.getFullYear(),
                    hour: appendZero(hour),
                    minute: appendZero(date.getMinutes()),
                    second: appendZero(date.getSeconds())
                };
            }
            function appendZero(num) {
                if (num < 10) {
                    return "0" + num;
                }
                return num;
            }

            function refreshTime(clock_id) {
                var now = getTime();
                clock = $.find('#'+clock_id);
                $(clock).find('.date').html(now.day + ', ' + now.date + '. ' + now.month + ' ' + now.year);
                $(clock).find('.time').html("<span class='hour'>" + now.hour + "</span>:<span class='minute'>" + now.minute + "</span>:<span class='second'>" + now.second + "</span>");
                /* if ( typeof(suffix) != "undefined") {
                 $(clock).find('.time').append('<strong>'+ suffix +'</strong>');
                 }*/
            }
            var clock_id = $(this).attr('id');
            refreshTime(clock_id);
            setInterval( function() {
                refreshTime(clock_id) }, 1000);
        };
    })(jQuery);
}

function displayCalendar() {

}



/*** METEO ***/
function openMeteoWidget() {
    if(existWidgetMeteo == false) {
        existWidgetMeteo = true;
        $("#content").append(
            '<div id="meteoWid" class="panel panel-default" style="margin-left: 500px;">' +
            '<div class="panel-heading">'+
            '<div class="buttons">' +
            '<a href="#" onclick="closeWidget(\'meteoWid\')">' +
            '<img src="assets/img/close.png" onmouseover="this.src=\'assets/img/close_hover.png\';" onmouseout="this.src=\'assets/img/close.png\';">' +
            '</a>'+
            '<a href="#" onclick="reduceWidget(\'meteoWid\')">' +
            '<img src="assets/img/reduce.png" onmouseover="this.src=\'assets/img/reduce_hover.png\';" onmouseout="this.src=\'assets/img/reduce.png\';">' +
            '</a>'+
            '<a href="#" onclick="zoomWidget(\'meteoWid\')">' +
            '<img src="assets/img/zoom.png" onmouseover="this.src=\'assets/img/zoom_hover.png\';" onmouseout="this.src=\'assets/img/zoom.png\';">' +
            '</a>'+
            '</div>'+
            '<div class="title">' +
            '<img class="logo" src="assets/img/meteo.png">Meteo</div></div>' +
            '<div class="panel-body">' +
            '<form id="formMeteo" class="input-group" style="text-align:center;">' +
            '<input type="text" class="form-control" id="city" placeholder="Entrer une Ville">' +
            '<div class="input-group-addon">' +
            '<button class="glyphicon glyphicon-search" type="submit" onclick="loadMeteo()" style="background-color: transparent; border: 0;"></button>' +
            '</div>' +
            '</form>' +
            '<div id="contentMeteo"></div>' +
            '</div>' +
            '</div>');
    }
}

function loadMeteo() {
    $('#contentMeteo').empty();
    var city=document.getElementById("city");
    var url="http://api.openweathermap.org/data/2.5/weather?q="+city.value+"&APPID=2a8f14dc6f4630e4a6df0cfb24c3e785";

    $.getJSON(url,function(data){
        var icone = data.weather[0].icon;
        var temperature = data.main.temp;
        var desc = data.weather[0].description;
        temperature= parseFloat(temperature);
        parseInt(temperature);
        temperature =parseInt(temperature-273.15);
        temperature = temperature.toString();
        $('#contentMeteo').append('<h2 id="temp">' + temperature + '°</h2>');
        $('#contentMeteo').append('<h3>' + desc + '</h3>');
        $('#contentMeteo').append("<img src='http://openweathermap.org/img/w/"+ icone + ".png' />");

    })
}



/*** PHOTO ***/
function openPhotoWidget() {
    if(existWidgetPhotos == false) {
        existWidgetPhotos = true;
        $("#content").append(
            '<div id="photoWid" class="panel panel-default" style="margin-left: 500px; width: 400px;">' +
            '<div class="panel-heading">'+
            '<div class="buttons">' +
            '<a href="#" onclick="closeWidget(\'photoWid\')">' +
            '<img src="assets/img/close.png" onmouseover="this.src=\'assets/img/close_hover.png\';" onmouseout="this.src=\'assets/img/close.png\';">' +
            '</a>'+
            '<a href="#" onclick="reduceWidget(\'photoWid\')">' +
            '<img src="assets/img/reduce.png" onmouseover="this.src=\'assets/img/reduce_hover.png\';" onmouseout="this.src=\'assets/img/reduce.png\';">' +
            '</a>'+
            '<a href="#" onclick="zoomWidget(\'photoWid\')">' +
            '<img src="assets/img/zoom.png" onmouseover="this.src=\'assets/img/zoom_hover.png\';" onmouseout="this.src=\'assets/img/zoom.png\';">' +
            '</a>'+
            '</div>'+
            '<div class="title">' +
            '<img class="logo" src="assets/img/photo.png">Photos</div></div>' +
            '<div class="panel-body">' +
            '<form id="formPhotos" class="input-group" style="text-align:center;">' +
            '<input type="text" class="form-control" id="searchPhoto" placeholder="Recherche de Photos">' +
            '<div class="input-group-addon">' +
            '<button class="glyphicon glyphicon-search" type="submit" onclick="loadPhoto()" style="background-color: transparent; border: 0;"></button>' +
            '</div>' +
            '</form>' +
            '<div id="contentPhoto" style="margin-top: 20px;"></div>' +
            '</div>' +
            '</div>');
    }
}

function loadPhoto() {
    var link = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    $.getJSON( link, {
        tags: $("#searchPhoto").val(),
        tagmode: "any",
        format: "json"
    }).done(function (data) {
        var img_link = data.items[0].media.m;
        $("#contentPhoto").html("");
        $("#contentPhoto").append(
            '<center>' +
            '<img src="'+ img_link + '" style="max-width: 250px;">' +
            '</center>');
    });
}



/*** TWITTER ***/
function openTwitterWidget() {
    if(existWidgetTwitter == false) {
        existWidgetTwitter = true;
        $("#content").append(
            '<div id="twitterWid" class="panel panel-default" style="margin-left: 500px; width: 400px;">' +
            '<div class="panel-heading">'+
            '<div class="buttons">' +
            '<a href="#" onclick="closeWidget(\'twitterWid\')">' +
            '<img src="assets/img/close.png" onmouseover="this.src=\'assets/img/close_hover.png\';" onmouseout="this.src=\'assets/img/close.png\';">' +
            '</a>'+
            '<a href="#" onclick="reduceWidget(\'twitterWid\')">' +
            '<img src="assets/img/reduce.png" onmouseover="this.src=\'assets/img/reduce_hover.png\';" onmouseout="this.src=\'assets/img/reduce.png\';">' +
            '</a>'+
            '<a href="#" onclick="zoomWidget(\'twitterWid\')">' +
            '<img src="assets/img/zoom.png" onmouseover="this.src=\'assets/img/zoom_hover.png\';" onmouseout="this.src=\'assets/img/zoom.png\';">' +
            '</a>'+
            '</div>'+
            '<div class="title">' +
            '<img class="logo" src="assets/img/twitter.png">Twitter</div></div>' +
            '<div class="panel-body">' +
            '<div id="contentTwitter"><a class="twitter-timeline" data-lang="fr" data-width="400" data-height="400" data-theme="light" data-link-color="#2B7BB9" href="https://twitter.com/MichelBillaud">Tweets by MichelBillaud</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></div>' +
            '</div>' +
            '</div>');
    }
}



/*** YOUTUBE ***/
function openYoutubeWidget() {
    if(existWidgetYoutube == false) {
        existWidgetYoutube = true;
        $("#content").append(
            '<div id="youtubeWid" class="panel panel-default" style="margin-left: 500px; width: 400px;">' +
            '<div class="panel-heading">'+
            '<div class="buttons">' +
            '<a href="#" onclick="closeWidget(\'youtubeWid\')">' +
            '<img src="assets/img/close.png" onmouseover="this.src=\'assets/img/close_hover.png\';" onmouseout="this.src=\'assets/img/close.png\';">' +
            '</a>'+
            '<a href="#" onclick="reduceWidget(\'youtubeWid\')">' +
            '<img src="assets/img/reduce.png" onmouseover="this.src=\'assets/img/reduce_hover.png\';" onmouseout="this.src=\'assets/img/reduce.png\';">' +
            '</a>'+
            '<a href="#" onclick="zoomWidget(\'youtubeWid\')">' +
            '<img src="assets/img/zoom.png" onmouseover="this.src=\'assets/img/zoom_hover.png\';" onmouseout="this.src=\'assets/img/zoom.png\';">' +
            '</a>'+
            '</div>'+
            '<div class="title">' +
            '<img class="logo" src="assets/img/youtube.png">Youtube</div></div>' +
            '<div class="panel-body">' +
            '<form id="formYoutube" class="input-group" style="text-align:center;">' +
            '<input type="text" class="form-control" id="searchYoutube" placeholder="Entrer des mots clefs">' +
            '<div class="input-group-addon">' +
            '<button class="glyphicon glyphicon-search" type="submit" onclick="loadYoutube()" style="background-color: transparent; border: 0;"></button>' +
            '</div>' +
            '</form>' +
            '<div id="contentYoutube"></div>' +
            '</div>' +
            '</div>');
    }
}

function loadYoutube() {
    var video = document.getElementById('contentYoutube');
    $(video).empty();
    var res= '<center><iframe style="margin-top: 15px;" id="playerYoutube" type="text/html" width="300" height="230" src="http://www.youtube.com/embed?listType=search&list='+ document.getElementById('searchYoutube').value +'" frameborder="0" /></center>';
    $(video).append(res);
}



/*** MAPS ***/
function openMapWidget() {
    if(existWidgetMaps == false) {
        existWidgetMaps = true;
        $("#content").append(
            '<div id="mapWid" class="panel panel-default" style="margin-left: 500px; width: 400px;">' +
            '<div class="panel-heading">' +
            '<div class="buttons">' +
            '<a href="#" onclick="closeWidget(\'mapWid\')">' +
            '<img src="assets/img/close.png" onmouseover="this.src=\'assets/img/close_hover.png\';" onmouseout="this.src=\'assets/img/close.png\';">' +
            '</a>'+
            '<a href="#" onclick="reduceWidget(\'mapWid\')">' +
            '<img src="assets/img/reduce.png" onmouseover="this.src=\'assets/img/reduce_hover.png\';" onmouseout="this.src=\'assets/img/reduce.png\';">' +
            '</a>'+
            '<a href="#" onclick="zoomWidget(\'mapWid\')">' +
            '<img src="assets/img/zoom.png" onmouseover="this.src=\'assets/img/zoom_hover.png\';" onmouseout="this.src=\'assets/img/zoom.png\';">' +
            '</a>'+
            '</div>'+
            '<div class="title">' +
            '<img class="logo" src="assets/img/map.png">Google Maps</div></div>' +
            '<center class="panel-body">' +
            '<form id="formMap" class="input-group" style="text-align:center;">' +
            '<input type="text" class="form-control" id="cityMap" placeholder="Choisir la ville de départ vers l\'IUT">' +
            '<div class="input-group-addon">' +
            '<button class="glyphicon glyphicon-search" type="submit" onclick="loadMap()" style="background-color: transparent; border: 0;"></button>' +
            '</div>' +
            '</form>' +
            '<div id="contentMap" style="margin-top: 25px;height: 300px; width: 300px;"></div>' +
            '</center></div>' +
            '</div>');
        loadMap();
    }
}

/*** CLE API GOOGLE = AIzaSyB9uYrVlWePmplmCxu_J2qGcbPRS3xte_g ***/
function loadMap() {
    var iut = new google.maps.LatLng(44.791144, -0.608849);
    var myLatLng = {lat: 44.791144, lng: -0.608849};

    var myOptions = {
        zoom      : 14,
        center    : iut,
        mapTypeId : google.maps.MapTypeId.TERRAIN,
        maxZoom   : 20
    };


    var map = new google.maps.Map(document.getElementById('contentMap'), myOptions);


    var direction = new google.maps.DirectionsRenderer({
        map  : map
    });
    $('#contentMap').append('<center>');
    var origine = document.getElementById("cityMap").value;
    if(origine==null || origine=="") {
        var marker = new google.maps.Marker({
            map: map,
            position: myLatLng,
            title: 'IUT Informatique de Bordeaux'
        });
    }

    var request = {
        origin: origine,
        destination: iut,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            direction.setDirections(response);
        }
    });
}



/*** SPORT ***/
function openSportWidget() {
    if(existWidgetSport==false) {
        existWidgetSport=true;
        $("#content").append(
            '<div id="sportWid" class="panel panel-default" style="margin-left: 500px;">' +
            '<div class="panel-heading">'+
            '<div class="buttons">' +
            '<a href="#" onclick="closeWidget(\'sportWid\')">' +
            '<img src="assets/img/close.png" onmouseover="this.src=\'assets/img/close_hover.png\';" onmouseout="this.src=\'assets/img/close.png\';">' +
            '</a>'+
            '<a href="#" onclick="reduceWidget(\'sportWid\')">' +
            '<img src="assets/img/reduce.png" onmouseover="this.src=\'assets/img/reduce_hover.png\';" onmouseout="this.src=\'assets/img/reduce.png\';">' +
            '</a>'+
            '<a href="#" onclick="zoomWidget(\'sportWid\')">' +
            '<img src="assets/img/zoom.png" onmouseover="this.src=\'assets/img/zoom_hover.png\';" onmouseout="this.src=\'assets/img/zoom.png\';">' +
            '</a>'+
            '</div>'+
            '<div class="title">' +
            '<img class="logo" src="assets/img/sport.png">Sport</div></div>' +
            '<div class="panel-body">' +
            '<div id="contentSport"></div>' +
            '</div>' +
            '</div>');
        loadSportResult();
    }
}

function loadSportResult() {
    //key : 71af22e447bd4255b615b0332ba9d661
    $.ajax({
        headers: { 'X-Auth-Token': '71af22e447bd4255b615b0332ba9d661' },
        url: 'http://api.football-data.org/v1/fixtures?timeFrame=n1',
        dataType: 'json',
        type: 'GET',
    }).done(function(response) {
        // do something with the response, e.g. isolate the id of a linked resource
        var regex = /.*?(\d+)$/; // the ? makes the first part non-greedy
        var res = regex.exec(response.fixtures[0]._links.awayTeam.href);
        var teamId = res[1];
        console.log(teamId);
    });
}



/*** SUPPRESSION ***/
function DeleteWidget() {
    existWidgetClock = false;
    existWidgetMeteo = false;
    existWidgetPhotos = false;
    existWidgetTwitter = false;
    existWidgetYoutube = false;
    existWidgetMaps = false;
    existWidgetSport = false;

    var content = document.getElementById("content");
    $(content).html("");

}

function closeWidget(id) {
    switch (id) {
        case "clockWid":
            existWidgetClock = false;
            break;
        case "meteoWid":
            existWidgetMeteo = false;
            break;
        case "photoWid":
            existWidgetPhotos = false;
            break;
        case "twitterWid":
            existWidgetTwitter = false;
            break;
        case "youtubeWid":
            existWidgetYoutube = false;
            break;
        case "mapWid":
            existWidgetMaps = false;
            break;
        case "sportWid":
            existWidgetSport = false;
            break;
        default:
            break;
    }
    var wid = document.getElementById(id);
    $(wid).fadeOut(0);
    $(wid).empty();
    wid.parentNode.removeChild(wid);

}

function reduceWidget(id) {

}

function zoomWidget(id) {

}