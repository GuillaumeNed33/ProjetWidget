/**
 * Created by Thomas on 13/03/2017.
 */

/*** FUNCTION WINDOW ***/
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function loadDate() {
    var dayNames = ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."]
    var newDate = new Date();
    newDate.setDate(newDate.getDate());
    $('#date').html(dayNames[newDate.getDay()] + " " + formatAMPM(newDate));
}

function changeSize() {
    var finder = document.getElementById("finder");
    if($(window).width() >= 768) {
        $('#finder').html("Finder");
    }
    else {
        $('#finder').html("");
    }
}

window.setInterval(loadDate,10000);
window.setInterval(changeSize,1);
$(document).ready(function () {
    loadDate();
    changeSize();
})