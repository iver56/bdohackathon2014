$(document).on("change", "#kvittering-file-input", function () {
    $('#kvittering-dato').val(getDateToday());
    $.mobile.navigate("#kvittering-input");
});

$(document).on("click", "#kvittering-lagre", function (e) {
    var beskrivelse = $('#kvittering-beskrivelse').val(),
        dato = $('#kvittering-dato').val(),
        sum = $('#kvittering-sum').val();
    addKvittering(beskrivelse, dato, sum);
    alertify.success("Kvitteringen er nå lagret");
});

$(document).on("click", "#ny-ansatt", function (e) {
    e.preventDefault();
    alertify.prompt("Hva heter den nye ansatte?", function (e, str) {
        if (e) {
            nyAnsatt(str);
        }
    }, "");
});

$(document).on("change", "#nth-week-day", function (e) {
    $('#settings-fast-dag').prop('checked', false).checkboxradio("refresh");
});

$(document).on("change", "#week-day", function (e) {
    $('#settings-fast-dag').prop('checked', false).checkboxradio("refresh");
});

function nyAnsatt(name) {
    addOppgave('skjema', 'Opprette yrkesskadeforsikring for ' + name, '', false);
    addOppgave('skjema', 'Melde ansettelse til NAV', '17. mars', false);
    addOppgave('skjema', 'Arbeidskontrakt for ' + name, '4. april', false);
    addOppgave('skjema', 'Tjenestepensjon for ' + name, '', false);
    $.mobile.navigate("#oppgaver");
    alertify.success("Du har fått nye oppgaver i forbindelse med ny ansatt");
}

var oppgaverInitialized = false;
$('#oppgaver').bind('pageinit', function() {
    oppgaverInitialized = true;
});

function getDateToday() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    return (day) + "." + (month) + "." + now.getFullYear();
}

function addKvittering(beskrivelse, dato, sum) {
    var $anchor = $('<a><h3>' + beskrivelse + '</h3><p>' + dato + '</p><p>Sum: ' + sum + ',-</p></a>'),
        $li = $('<li/>').append($anchor);
    $('#kvitteringer-ul').prepend($li).listview('refresh');
}

function addOppgave(type, title, frist, done) {
    var $li = $('<li/>'),
        $anchor = $('<a/>'),
        $table = $('<table/>'),
        $tr = $('<tr/>'),
        $td1 = $('<td><img class="task-icon" src="images/task-icons/task-' + type + '.png"></td>'),
        $td2 = $('<td><h3>' + title + '</h3></td>'),
        $td3 = (done
            ? $('<td><div class="check"><img src="images/check.png"></div></td>')
            : $('<td><div class="date-text">' + frist.replace(' ', '<br>') + '</div></td>')
        );
    $li.append(
        $anchor.append(
            $table.append(
                $tr.append($td1).append($td2).append($td3)
            )
        )
    );
    $('#oppgaver-ul').prepend($li)
    if (oppgaverInitialized) {
        $('#oppgaver-ul').listview('refresh');
    }
}

function setStatus(color) {
    if ('green' === color) {
        $('img.meter-image').attr('src', 'images/meter_green.png');
        $('div.meter-text-status').text('Alt er i skjønneste orden :)');
    } else if ('yellow' === color) {
        $('img.meter-image').attr('src', 'images/meter_yellow.png');
        $('div.meter-text-status').text('Noe må gjøres snart');
    } else if ('red' === color) {
        $('img.meter-image').attr('src', 'images/meter_red.png');
        $('div.meter-text-status').text('Noe må gjøres nå!');
    }
}