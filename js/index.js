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

$(document).on("click", "#innstillinger-lagre", function (e) {
    alertify.success("Innstillingene ble lagret");
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
    $('#settings-fast-dag').prop('checked', true).checkboxradio("refresh");
});

$(document).on("change", "#week-day", function (e) {
    $('#settings-fast-dag').prop('checked', true).checkboxradio("refresh");
});

$(document).on("click", ".task-done", function (e) {
    var $button = $(this),
        id = $button.closest('div[data-role=page]').attr('id'),
        msg = 'Bra jobba!';
    if ("oppgave3" === id) {
        msg += " Nå er det to måneder til neste gang";
    }
    alertify.success(msg);
    removeOppgave(id);
});

$(document).on("click", ".task-postpone", function (e) {
    var $button = $(this),
        id = $button.closest('div[data-role=page]').attr('id'),
        msg = 'Oppgaven er utsatt. Du får beskjed om den senere.';
    alertify.success(msg);
    removeOppgave(id);
});

$(document).on("click", "a[href=#tildel]", function (e) {
    var $button = $(this),
        id = $button.closest('div[data-role=page]').attr('id');
    removeOppgave(id);
});

$(document).on("click", "#tildel-epost", function (e) {
    e.preventDefault();
    alertify.prompt("Skriv inn e-postadressen", function (e, str) {
        if (e) {
            $.mobile.navigate("#tildelt");
        }
    }, "benediof@gmail.com");
});

function nyAnsatt(name) {
    addOppgave('skjema', 'Yrkesskadeforsikring for ' + name, '', false, 'yrkesskadeforsikring');
    addOppgave('skjema', 'Melde ansettelse til NAV', '17. mars', false, 'aamelding');
    addOppgave('skjema', 'Arbeidskontrakt for ' + name, '4. april', false, 'arbeidskontrakt');
    addOppgave('skjema', 'Tjenestepensjon for ' + name, '', false, 'tjenestepensjon');
    $.mobile.navigate("#oppgaver");
    alertify.success("Du har fått nye oppgaver i forbindelse med ansettelsen");
}

var oppgaverInitialized = false;
$(document).on('pageinit', '#oppgaver', function() {
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

function addOppgave(type, title, frist, done, id) {
    var $li = $('<li/>'),
        $anchor = $('<a href="#' + id + '"/>'),
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
    refreshTasksList();
}

function removeOppgave(id) {
    $("#oppgaver-ul > li a").each(function() {
        $a = $(this);
        if ('#' + id === $a.attr('href')) {
            $li = $a.closest('li');
            $li.remove();
        }
    });
    refreshTasksList();
}

function refreshTasksList() {
    if (oppgaverInitialized) {
        $('#oppgaver-ul').listview('refresh');
    }
    if (0 === $('#oppgaver-ul').find('li').length) {
        $('#oppgaver .empty-list').show();
        setStatus('green');
    } else {
        $('#oppgaver .empty-list').hide();
        setStatus('yellow');
    }
}

function setStatus(color) {
    if ('green' === color) {
        $('img.meter-image').attr('src', 'images/meter_green.png');
        $('div.meter-text-status').text('Alt er i skjønneste orden :)');
        $('.oppgaver-button').attr('src', 'images/buttons/button-oppgaver.png');
    } else if ('yellow' === color) {
        $('img.meter-image').attr('src', 'images/meter_yellow.png');
        $('div.meter-text-status').text('Noe må gjøres snart');
        $('.oppgaver-button').attr('src', 'images/buttons/button-oppgaver-yellow.png');
    } else if ('red' === color) {
        $('img.meter-image').attr('src', 'images/meter_red.png');
        $('div.meter-text-status').text('Noe må gjøres nå!');
        $('.oppgaver-button').attr('src', 'images/buttons/button-oppgaver-red.png');
    }
}