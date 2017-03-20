/**
 * Created by Guillaume on 15/03/2017.
 */
var nbWidget = 0;
const columnOne = "#columnOne";
const columnTwo = "#columnTwo";
const columnThree = "#columnThree";
var columnActive = columnOne;
var existWidgetClock = false;
var existWidgetMeteo = false;
var existWidgetPhotos = false;
var existWidgetTwitter = false;
var existWidgetYoutube = false;
var existWidgetMaps = false;
var existWidgetSport = false;

var extendWidgetClock = true;
var extendWidgetMeteo = true;
var extendWidgetPhotos = true;
var extendWidgetTwitter = true;
var extendWidgetYoutube = true;
var extendWidgetMaps = true;
var extendWidgetSport = true;

/*** COMMON WIDGET ***/
function widgetHeader(id) {
    nbWidget += 1;
    if(nbWidget>1)
        columnActive = columnTwo;
    if(nbWidget > 3)
        columnActive = columnThree;

    var tmp = '<div class="panel-heading"> ' +
        '<div class="pull-left">' +
        '<a href="#" onclick="closeWidget(\''+ id+ '\')">' +
        '<img class="icons" src="assets/img/close.png" onmouseover="this.src=\'assets/img/close_hover.png\';" onmouseout="this.src=\'assets/img/close.png\';">' +
        '</a>' +
        '<a href="#" onclick="reduceWidget(\''+ id+ '\')">' +
        '<img class="icons" src="assets/img/reduce.png" onmouseover="this.src=\'assets/img/reduce_hover.png\';" onmouseout="this.src=\'assets/img/reduce.png\';">' +
        '</a>' +
        '<a href="#" onclick="zoomWidget(\''+ id+ '\')">' +
        '<img class="icons" src="assets/img/zoom.png" onmouseover="this.src=\'assets/img/zoom_hover.png\';" onmouseout="this.src=\'assets/img/zoom.png\';">' +
        '</a>' +
        '</div>';
    return tmp;
}

/*** CLOCK ***/
function openClockWidget() {
    if(existWidgetClock==false) {
        existWidgetClock= true;
        $(columnActive).append(
            '<div id="clockWid" class="panel draggable center-block panel-default">' +
            widgetHeader("clockWid") +
            '<div class="title">' +
            '<img class="logo" src="assets/img/clock.png">' +
            '<span>Calendar & Date</span></div></div>' +
            '<div id="collapseClock" class="panel-collapse collapse">'+
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
            '</div>' +
            '</div>');
        $('#collapseClock').collapse('show');
        displayClock();
        $( function() {
            $( ".draggable" ).draggable();
        } );
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

/*** METEO ***/
function openMeteoWidget() {
    if(existWidgetMeteo == false) {
        existWidgetMeteo = true;
        $(columnActive).append(
            '<div id="meteoWid" class="panel draggable center-block panel-default">' +
            widgetHeader("meteoWid") +
            '<div class="title">' +
            '<img class="logo" src="assets/img/meteo.png">' +
            'Meteo</div></div>' +
            '<div id="collapseMeteo" class="panel-collapse collapse">'+
            '<div class="panel-body">' +
            '<div id="formMeteo" class="input-group" style="text-align:center;">' +
            '<input type="text" class="form-control" id="city" placeholder="Entrer une Ville" onkeypress="validFormMeteo(event)">' +
            '<div class="input-group-addon">' +
            '<button class="glyphicon glyphicon-search" onclick="loadMeteo()" style="background-color: transparent; border: 0;"></button>' +
            '</div>' +
            '</div>' +
            '<div id="contentMeteo"></div>' +
            '</div>' +
            '</div>' +
            '</div>');
        $('#collapseMeteo').collapse('show');
        $( function() {
            $( ".draggable" ).draggable();
        } );
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
        $("#contentMeteo").append('<h2 id="temp">' + temperature + '°C</h2>' +
            '<h3>' + desc + '</h3>' +
            '<img src="http://openweathermap.org/img/w/' + icone + '.png" />');

    })
}

/*** PHOTO ***/
function openPhotoWidget() {
    if(existWidgetPhotos == false) {
        existWidgetPhotos = true;
        $(columnActive).append(
            '<div id="photoWid" class="panel draggable center-block panel-default">' +
            widgetHeader("photoWid") +
            '<div class="title">' +
            '<img class="logo" src="assets/img/photo.png">' +
            'Photos</div></div>' +
            '<div id="collapsePhoto" class="panel-collapse collapse">'+
            '<div class="panel-body">' +
            '<div id="formPhotos" class="input-group" style="text-align:center;">' +
            '<input type="text" class="form-control" id="searchPhoto" placeholder="Recherche de Photos" onkeypress="validFormPhoto(event)">' +
            '<div class="input-group-addon">' +
            '<button class="glyphicon glyphicon-search" onclick="loadPhoto()" style="background-color: transparent; border: 0;"></button>' +
            '</div>' +
            '</div>' +
            '<div id="contentPhoto" style="margin-top: 20px;"></div>' +
            '</div>' +
            '</div>' +
            '</div>');
        $('#collapsePhoto').collapse('show');
        $( function() {
            $( ".draggable" ).draggable();
        } );
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
    if (existWidgetTwitter == false) {
        existWidgetTwitter = true;
        $(columnActive).append(
            '<div id="twitterWid" class="panel draggable center-block panel-default">' +
            widgetHeader("twitterWid") +
            '<div class="title">' +
            '<img class="logo" src="assets/img/twitter.png">' +
            'Twitter</div></div>' +
            '<div id="collapseTwitter" class="panel-collapse collapse">' +
            '<div class="panel-body">' +
            '<div id="contentTwitter"></div>' +
            '<a class="twitter-timeline" data-lang="fr" data-width="400" data-height="400" data-theme="light" data-link-color="#2B7BB9" href="https://twitter.com/MichelBillaud">Tweets by MichelBillaud</a>' +
            '<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></div>' +
            '</div>' +
            '</div>' +
            '</div>');
        $('#collapseTwitter').collapse('show');
        $( function() {
            $( ".draggable" ).draggable();
        } );
    }
}

/*** YOUTUBE ***/
function openYoutubeWidget() {
    if(existWidgetYoutube == false) {
        existWidgetYoutube = true;
        $(columnActive).append(
            '<div id="youtubeWid" class="panel draggable center-block panel-default">' +
            widgetHeader("youtubeWid") +
            '<div class="title">' +
            '<img class="logo" src="assets/img/youtube.png">' +
            'Youtube</div></div>' +
            '<div id="collapseYoutube" class="panel-collapse collapse">'+
            '<div class="panel-body">' +
            '<div id="formYoutube" class="input-group" style="text-align:center;">' +
            '<input type="text" class="form-control" id="searchYoutube" placeholder="Entrer des mots clefs" onkeypress="validFormYoutube(event)">' +
            '<div class="input-group-addon">' +
            '<button class="glyphicon glyphicon-search" onclick="loadYoutube()" style="background-color: transparent; border: 0;"></button>' +
            '</div>' +
            '</div>' +
            '<div id="contentYoutube"></div>' +
            '</div>' +
            '</div>' +
            '</div>');
        $('#collapseYoutube').collapse('show');
        $( function() {
            $( ".draggable" ).draggable();
        } );
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
        $(columnActive).append(
            '<div id="mapWid" class="panel draggable center-block panel-default">' +
            widgetHeader("mapWid") +
            '<div class="title">' +
            '<img class="logo" src="assets/img/map.png">' +
            'Google Maps</div></div>' +
            '<div id="collapseMaps" class="panel-collapse collapse">'+
            '<center class="panel-body">' +
            '<div id="formMap" class="input-group" style="text-align:center;">' +
            '<input type="text" class="form-control" id="cityMap" placeholder="Choisir la ville de départ vers l\'IUT" onkeypress="validFormMaps(event)">' +
            '<div class="input-group-addon">' +
            '<button class="glyphicon glyphicon-search" onclick="loadMap()" style="background-color: transparent; border: 0;"></button>' +
            '</div>' +
            '</div>' +
            '<div id="contentMap" style="margin-top: 25px;height: 300px; width: 300px;"></div>' +
            '</center></div>' +
            '</div>' +
            '</div>');
        $('#collapseMaps').collapse('show');
        loadMap();
        $( function() {
            $( ".draggable" ).draggable();
        } );
    }
}

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
        $(columnActive).append(
            '<div id="sportWid" class="panel draggable center-block panel-default">' +
            widgetHeader("sportWid") +
            '<div class="title">' +
            '<img class="logo" src="assets/img/sport.png">' +
            'Sport</div></div>' +
            '<div id="collapseSport" class="panel-collapse collapse">'+
            '<div class="panel-body">' +
            '<div id="contentSport"></div>' +
            '</div>' +
            '</div>' +
            '</div>');
        $('#collapseSport').collapse('show');
        loadSportResult();
        $( function() {
            $( ".draggable" ).draggable();
        } );
    }
}

function loadSportResult() {
    var BayernId = 5;
    var url = "http://api.football-data.org/v1/teams/" + BayernId.toString();
    $.ajax({
        headers: {'X-Auth-Token': '71af22e447bd4255b615b0332ba9d661'},
        url: 'http://api.football-data.org/v1/teams/' + BayernId,
        dataType: 'json',
        type: 'GET'
    }).done(function (response) {
        $("#contentSport")
            .append("<img src='" + response.crestUrl + "' style='width: 100px; height: 100px; margin: 5px;' class='pull-left'>")
            .append("<h3 class='text-center' style='padding-top: 20px;'>" + response.name + "</h3>")
            .append("<hr>")
            .append("<p class='text-center' style='margin-bottom: 30px;'>Valeur de l'équipe : " + response.squadMarketValue + "</p>");

        $.ajax({
            headers: {'X-Auth-Token': '71af22e447bd4255b615b0332ba9d661'},
            url: response._links.fixtures.href,
            dataType: 'json',
            type: 'GET'
        }).done(function (response) {
            $("#contentSport")
                .append($("<div id='sport1'></div>")
                    .append("<h4 class='text-center' style='font-weight: bold;margin-bottom: 15px;'>Résultat des 3 derniers Matchs</h4>")
                    .append('<table class="table table-hover  table-condensed">' +
                        '<thead><tr><th width="200px" class="text-center">Equipes</th><th width="60px" class="text-center">Score</th><th width="150px" class="text-center">Date</th></tr></thead>' +
                        '<tbody id="resultContent"></tbody>' +
                        '</table>'));

            var fixtures = response.fixtures;
            var nb_match = 0;


            for (var i = response.count - 1; i >= 0 && nb_match < 3; i--) {
                if (fixtures[i].status === "FINISHED") {
                    var fixture = fixtures[i];

                    if((fixture.result.goalsHomeTeam>fixture.result.goalsAwayTeam && fixture.homeTeamName == "FC Bayern München") || (fixture.result.goalsHomeTeam<fixture.result.goalsAwayTeam && fixture.awayTeamName == "FC Bayern München")) {
                        $("#resultContent").append("<tr>" +
                            "<td class='text-center' style='vertical-align: middle'>" + fixture.homeTeamName + "<br> - <br> " + fixture.awayTeamName + "</td>" +
                            "<td class='text-center' style='vertical-align: middle; color: green'><b>" + fixture.result.goalsHomeTeam + " - " + fixture.result.goalsAwayTeam + "</b></td>" +
                            "<td class='text-center' style='vertical-align: middle'>" + fixture.date.substring(0, 10) + "</td></tr>"
                        );                    }
                    else if((fixture.result.goalsHomeTeam<fixture.result.goalsAwayTeam && fixture.homeTeamName == "FC Bayern München") || (fixture.result.goalsHomeTeam>fixture.result.goalsAwayTeam && fixture.awayTeamName == "FC Bayern München")) {
                        $("#resultContent").append("<tr>" +
                            "<td class='text-center' style='vertical-align: middle'>" + fixture.homeTeamName + "<br> - <br> " + fixture.awayTeamName + "</td>" +
                            "<td class='text-center' style='vertical-align: middle; color: red'><b>" + fixture.result.goalsHomeTeam + " - " + fixture.result.goalsAwayTeam + "</b></td>" +
                            "<td class='text-center' style='vertical-align: middle'>" + fixture.date.substring(0, 10) + "</td></tr>"
                        );                    }
                    else {
                        $("#resultContent").append("<tr>" +
                            "<td class='text-center' style='vertical-align: middle'>" + fixture.homeTeamName + "<br> - <br> " + fixture.awayTeamName + "</td>" +
                            "<td class='text-center' style='vertical-align: middle'><b>" + fixture.result.goalsHomeTeam + " - " + fixture.result.goalsAwayTeam + "</b></td>" +
                            "<td class='text-center' style='vertical-align: middle'>" + fixture.date.substring(0, 10) + "</td></tr>"
                        );                    }
                    nb_match++;
                }
            }
        });
    });
}

/*** SUPPRESSION ***/
function DeleteWidget() {
    $('#clockWid').empty();
    $('#clockWid').css('animation-name', 'test');
    $('#clockWid').css('animation-duration', '0.2s').fadeOut();

    $('#meteoWid').empty();
    $('#meteoWid').css('animation-name', 'test');
    $('#meteoWid').css('animation-duration', '0.2s').fadeOut();

    $('#photoWid').empty();
    $('#photoWid').css('animation-name', 'test');
    $('#photoWid').css('animation-duration', '0.2s').fadeOut();

    $('#twitterWid').empty();
    $('#twitterWid').css('animation-name', 'test');
    $('#twitterWid').css('animation-duration', '0.2s').fadeOut();

    $('#youtubeWid').empty();
    $('#youtubeWid').css('animation-name', 'test');
    $('#youtubeWid').css('animation-duration', '0.2s').fadeOut();

    $('#mapWid').empty();
    $('#mapWid').css('animation-name', 'test');
    $('#mapWid').css('animation-duration', '0.2s').fadeOut();

    $('#sportWid').empty();
    $('#sportWid').css('animation-name', 'test');
    $('#sportWid').css('animation-duration', '0.2s').fadeOut();

    setTimeout(function(){
        nbWidget = 0;
        columnActive = columnOne;
        existWidgetClock = false;
        existWidgetMeteo = false;
        existWidgetPhotos = false;
        existWidgetTwitter = false;
        existWidgetYoutube = false;
        existWidgetMaps = false;
        existWidgetSport = false;
        $(columnOne).html("");
        $(columnTwo).html("");
        $(columnThree).html("");
    },1000);
}

function closeWidget(id) {
    nbWidget -= 1;
    if(nbWidget<=2)
        columnActive = columnOne;
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
    $(wid).empty();
    $(wid).css('animation-name', 'test');
    $(wid).css('animation-duration', '0.2s').fadeOut();
    setTimeout(function(){
        wid.parentNode.removeChild(wid);
    },100);
}

function reduceWidget(id) {
    switch (id) {
        case "clockWid":
            if (extendWidgetClock) {
                extendWidgetClock = false;
                $('#collapseClock').collapse('hide');
            }
            break;
        case "meteoWid":
            if (extendWidgetMeteo) {
                extendWidgetMeteo = false;
                $('#collapseMeteo').collapse('hide');
            }
            break;
        case "photoWid":
            if (extendWidgetPhotos) {
                extendWidgetPhotos = false;
                $('#collapsePhoto').collapse('hide');
            }
            break;
        case "twitterWid":
            if (extendWidgetTwitter) {
                extendWidgetTwitter = false;
                $('#collapseTwitter').collapse('hide');
            }
            break;
        case "youtubeWid":
            if (extendWidgetYoutube) {
                extendWidgetYoutube = false;
                $('#collapseYoutube').collapse('hide');
            }
            break;
        case "mapWid":
            if (extendWidgetMaps) {
                extendWidgetMaps = false;
                $('#collapseMaps').collapse('hide');
            }
            break;
        case "sportWid":
            if (extendWidgetSport) {
                extendWidgetSport = false;
                $('#collapseSport').collapse('hide');
            }
            break;
        default:
            break;
    }
}

function zoomWidget(id) {
    switch (id) {
        case "clockWid":
            if (!extendWidgetClock) {
                extendWidgetClock = true;
                $('#collapseClock').collapse('show');
            }
            break;
        case "meteoWid":
            if (!extendWidgetMeteo) {
                extendWidgetMeteo = true;
                $('#collapseMeteo').collapse('show');
            }
            break;
        case "photoWid":
            if (!extendWidgetPhotos) {
                extendWidgetPhotos = true;
                $('#collapsePhoto').collapse('show');
            }
            break;
        case "twitterWid":
            if (!extendWidgetTwitter) {
                extendWidgetTwitter = true;
                $('#collapseTwitter').collapse('show');
            }
            break;
        case "youtubeWid":
            if (!extendWidgetYoutube) {
                extendWidgetYoutube = true;
                $('#collapseYoutube').collapse('show');
            }
            break;
        case "mapWid":
            if (!extendWidgetMaps) {
                extendWidgetMaps = true;
                $('#collapseMaps').collapse('show');
            }
            break;
        case "sportWid":
            if (!extendWidgetSport) {
                extendWidgetSport = true;
                $('#collapseSport').collapse('show');
            }
            break;
        default:
            break;
    }
}