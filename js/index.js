$(document).on("change", "#kvittering-file-input", function () {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = (day) + "." + (month) + "." + now.getFullYear();
    $('#kvittering-dato').val(today);
    $.mobile.navigate("#kvittering-input");
});

$(document).on("click", "#kvittering-lagre", function (e) {
    var beskrivelse = $('#kvittering-beskrivelse').val(),
        dato = $('#kvittering-dato').val(),
        sum = $('#kvittering-sum').val(),
        $anchor = $('<a><h3>' + beskrivelse + '</h3><p>' + dato + '</p><p>Sum: ' + sum + ',-</p></a>'),
        $li = $('<li/>').append($anchor);
    $('#kvitteringer-ul').prepend($li).listview('refresh');
});