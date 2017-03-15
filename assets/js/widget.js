/**
 * Created by Guillaume on 15/03/2017.
 */

/** Fonction qui permet de recuperer la date et l heure actuelle ainsi que de les afficher dans les balises d'id dateId et timeId **/
function setDateAndTime()
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
}

function openClockWidget() {
$("#content").append('<div class="panel panel-default">'+
'<div class="panel-heading"><img src="assets/img/clock.png" style="width: 20px; margin-right: 5px; margin-top: 0;">Calendar & Date</div>' +
    '<div class="panel-body">' + 'Voici mon Horloge ' + '</div>' +
'</div>');
}

function openMeteoWidget() {

}

function openPhotoWidget() {

}

function openTwitterWidget() {

}

function openYoutubeWidget() {

}

function openMapWidget() {

}

function openSportWidget() {

}

function DeleteWidget() {

}