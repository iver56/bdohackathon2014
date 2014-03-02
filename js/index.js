$(document).on("change", "#kvittering-file-input", function () {
    $('#kvittering-dato').val(getDateToday());
    $.mobile.navigate("#kvittering-input");
});

$(document).on("click", "#kvittering-lagre", function (e) {
    var beskrivelse = $('#kvittering-beskrivelse').val(),
        dato = $('#kvittering-dato').val(),
        sum = $('#kvittering-sum').val();
    addKvittering(beskrivelse, dato, sum);
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
    /*<a href="#">
        <table>
            <tr>
                <td>
                    <img class="task-icon" src="images/task-icons/task-mva.png">
                    </td>
                    <td>
                        <h3>Omsetningsoppgave</h3>
                    </td>
                    <td>
                        <div class="check">
                            <img src="images/check.png">
                            </div>
                        </td>
                    </tr>
                </table>
            </a>*/
    var $li = $('<li/>'),
        $anchor = $('<a/>'),
        $table = $('<table/>'),
        $tr = $('<tr/>'),
        $td1 = $('<td><img class="task-icon" src="images/task-icons/task-' + type + '.png"></td>'),
        $td2 = $('<td><h3>' + title + '</h3></td>'),
        $td3 = (done
            ? $('<td><div class="check"><img src="images/check.png"></div></td>')
            : $('<td><div class="date-text">' + frist + '</div></td>')
        );
    $li.append(
        $anchor.append(
            $table.append(
                $tr.append($td1).append($td2).append($td3)
            )
        )
    );
    $('#oppgaver-ul').prepend($li).listview('refresh');
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