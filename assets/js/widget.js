/**
 * Created by Guillaume on 15/03/2017.
 */
/*** CLOCK ***/
function openClockWidget() {
    $("#content").append(
        '<div id="meteoWid" class="panel panel-default" style="margin-left: 100px;">'+
        '<div class="panel-heading"><img src="assets/img/clock.png" style="width: 20px; margin-right: 5px; margin-top: 0;">Calendar & Date</div>' +
        '<div class="panel-body">' +
        '<div style="text-align:center;">'+
        '<h2>' +
        '<span style="color:gray;">Heure actuelle</span>' +  '<br />' + 'France' +
        '</h2>'+
        '<div class="clock" id="clock">' +
        '<div class="date"></div>'+
        '<div class="time"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');

    displayClock();
    //displayCalendar();
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
    $("#content").append(
        '<div class="panel panel-default" style="margin-left: 500px;">'+
        '<div class="panel-heading"><img src="assets/img/meteo.png" style="width: 20px; margin-right: 5px; margin-top: 0;">Meteo</div>' +
        '<div class="panel-body">' +
        '<form id="formMeteo" class="input-group" style="text-align:center;">'+
        '<input type="text" class="form-control" id="city" placeholder="Entrer une Ville">' +
        '<div class="input-group-addon">' +
        '<button class="glyphicon glyphicon-search" type="submit" onclick="loadMeteo()" style="background-color: transparent; border: 0;"></button>'+
        '</div>' +
        '</form>'+
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
        '<form id="formPhotos" class="input-group" style="text-align:center;">'+
        '<input type="text" class="form-control" id="searchPhoto" placeholder="Recherche de Photos">' +
        '<div class="input-group-addon">' +
        '<button class="glyphicon glyphicon-search" type="submit" onclick="loadPhoto()" style="background-color: transparent; border: 0;"></button>'+
        '</div>' +
        '</form>'+
        '<div id="contentPhoto"></div>' +
        '</div>'+
        '</div>');

}



/*** TWITTER ***/
function openTwitterWidget() {
    $("#content").append(
        '<div class="panel panel-default" style="margin-left: 500px; width: 400px;">'+
        '<div class="panel-heading"><img src="assets/img/twitter.png" style="width: 20px; margin-right: 5px; margin-top: 0;">Twitter</div>' +
        '<div class="panel-body">' +
        '<div id="contentTwitter"><a class="twitter-timeline" data-lang="fr" data-width="400" data-height="400" data-theme="light" data-link-color="#2B7BB9" href="https://twitter.com/MichelBillaud">Tweets by MichelBillaud</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></div>' +
        '</div>'+
        '</div>');
}



/*** YOUTUBE ***/
function openYoutubeWidget() {
    $("#content").append(
        '<div class="panel panel-default" style="margin-left: 500px; width: 400px;">'+
        '<div class="panel-heading"><img src="assets/img/youtube.png" style="width: 20px; margin-right: 5px; margin-top: 0;">Youtube</div>' +
        '<div class="panel-body">' +
        '<form id="formYoutube" class="input-group" style="text-align:center;">'+
        '<input type="text" class="form-control" id="searchYoutube" placeholder="Entrer des mots clefs">' +
        '<div class="input-group-addon">' +
        '<button class="glyphicon glyphicon-search" type="submit" onclick="loadYoutube()" style="background-color: transparent; border: 0;"></button>'+
        '</div>' +
        '</form>'+
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
        '<form id="formMap" class="input-group" style="text-align:center;">'+
        '<input type="text" class="form-control" id="cityMap" placeholder="Choisir la ville de départ vers l\'IUT">' +
        '<div class="input-group-addon">' +
        '<button class="glyphicon glyphicon-search" type="submit" onclick="loadMap()" style="background-color: transparent; border: 0;"></button>'+
        '</div>' +
        '</form>'+
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