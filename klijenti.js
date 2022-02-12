//--------forma za unos klijenta
function insertFormKlijenti(page) {
    var output = '<table class="table table-hover"><tbody>';
    output += '<tr><th scope="col">ime</th><td><input type="text" id="IME"></td></tr>';
    output += '<tr><th scope="col">prezime</th><td><input type="text" id="PREZIME"></td></tr>';
    output += '<tr><th scope="col">email</th><td><input type="email" id="EMAIL"></td></tr>';
    output += '<tr><th scope="col">OIB</th><td><input type="text" id="OIB"></td></tr>';
    output += '<tr><th scope="col">Ovlasti</th><td><input type="text" id="OVLASTI"></td></tr>';
    output += '<tr><th scope="col">Spol</th><td><input type="text" id="SPOL"></td></tr>';
    output += '<tr><th scope="col">Zaporka</th><td><input type="text" id="PASSWORD"></td></tr>';
    output += '</table>';
    output += '<button type="button" class="btn btn-warning" id="spremiKli">Spremi <i class="fas fa-save"></i></button> ';
    output += '<button type="button" class="btn btn-success" onclick="showKlijenti(' + page + ')">Odustani <i class="fas fa-window-close"></i></button>';
    $("#container").html(output);
}


//-------------------------------------------------------------
function showKlijenti(page) {
    var tablica = '<br><button type="button" style="float:right;" class="btn btn-success" onclick="insertFormKlijenti(' + page + ')">Insert <i class="fa fa-download" aria-hidden="true"></i></button><br><br>';
    tablica += '<table class="table table-hover"><tbody><thead><tr>';
    tablica += '<th scope="col">ime</th><th scope="col">prezime</th><th scope="col">OIB</th>';
    tablica += '<th scope="col">email</th><th scope="col">spol</th>'
    tablica += '<th scope="col">ovlasti</th><th scope="col">action</th></tr>';

    if (page == null || page == "") {
        page = 1;
    }

    $.ajax({
        type: 'POST',
        url: url,
        data: {"projekt": projekt, 
               "procedura": "p_get_klijenti", 
               "perPage": perPage, 
               "page": page 
            },
        success: function (data) {
            var jsonBody = JSON.parse(data);
            var errcode = jsonBody.h_errcode;
            var message = jsonBody.h_message;
            var count = jsonBody.count;


            if (message == null || message == "", errcode == null || errcode == 0) {
                $.each(jsonBody.data, function (k, v) {
                    tablica += '<tr><td>' + v.IME + '</td>';
                    tablica += '<td>' + v.PREZIME + '</td>';
                    tablica += '<td>' + v.OIB + '</td>';
                    tablica += '<td>' + v.EMAIL + '</td>';
                    tablica += '<td>' + v.SPOL + '</td>';
                    tablica += '<td>' + v.OVLASTI + '</td>';
                    tablica += '<td><button type="button" class="btn btn-primary" onclick="showKlijent(' + v.ID + ',' + page + ')">Edit <i class="fas fa-edit"></i></button> ';
                    tablica += '<button type="button" class="btn btn-danger" onclick="delKlijent(' + v.ID + ',' + page + ')">Delete <i class="far fa-trash-alt"></i></button></td></tr>';
                });
                tablica += '</tbody></table>';
                tablica += pagination(page, perPage, count);
                $("#container").html(tablica);
            } else {
                if (errcode == 999) {
                    $("#container").html(loginForm);
                } else {
                    Swal.fire(message + '.' + errcode);
                }
            }
            refresh();
        },
        error: function (xhr, textStatus, error) {
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        },
        async: true

    });
}
//-----------------------------------------------------------------------------
function showKlijent(ID, page) {
    var tablica = '<table class="table table-hover"><tbody>';
    $.ajax({
        type: 'POST',
        url: url,
        data: { "projekt": projekt, "procedura": "p_get_klijenti", "ID": ID },
        success: function (data) {
            var jsonBody = JSON.parse(data);
            var errcode = jsonBody.h_errcode;
            var message = jsonBody.h_message;

            if (message == null || message == "", errcode == null || errcode == 0) {
                $.each(jsonBody.data, function (k, v) {
                    tablica += '<tr><th scope="col">ID</th><td><input type="text" id="ID" value="' + v.ID + '" readonly></td></tr>';
                    tablica += '<tr><th scope="col">ime</th><td><input type="text" id="IME" value="' + v.IME + '"></td></tr>';
                    tablica += '<tr><th scope="col">prezime</th><td><input type="text" id="PREZIME" value="' + v.PREZIME + '"></td></tr>';
                    tablica += '<tr><th scope="col">email</th><td><input type="text" id="EMAIL" value="' + v.EMAIL + '"></td></tr>';
                    tablica += '<tr><th scope="col">OIB</th><td><input type="text" id="OIB" value="' + v.OIB + '"></td></tr>';
                    tablica += '<tr><th scope="col">Ovlasti</th><td><input type="text" id="OVLASTI" value="' + v.OVLASTI + '"></td></tr>';
                    tablica += '<tr><th scope="col">Spol</th><td><input type="text" id="SPOL" value="' + v.SPOL + '"></td></tr>';
                    tablica += '</table>';
                    tablica += '<button type="button" class="btn btn-warning" id="spremiKli">Spremi <i class="fas fa-save"></i></button> ';
                    tablica += '<button type="button" class="btn btn-success" onclick="showKlijenti(' + page + ')">Odustani <i class="fas fa-window-close"></i></button>';
                });
                $("#container").html(tablica);
            } else {
                if (errcode == 999) {
                    $("#container").html(loginForm);
                } else {
                    Swal.fire(message + '.' + errcode);
                }
            }
            refresh();
        },
        error: function (xhr, textStatus, error) {
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        },
        async: true

    });
}

//-----------------------SAVE KORISNIK---------------------------
$(document).on('click', '#spremiKli', function () {
    var IME = $('#IME').val();
    var PREZIME = $('#PREZIME').val();
    var EMAIL = $('#EMAIL').val();
    var OIB = $('#OIB').val();
    var OVLASTI = $('#OVLASTI').val();
    var SPOL = $('#SPOL').val();
    var ZAPORKA = $('#PASSWORD').val();
    var ID = $('#ID').val();

    if (IME == null || IME == "") {
        Swal.fire('Molimo unesite ime korisnika');
    } else if (PREZIME == null || PREZIME == "") {
        Swal.fire('Molimo unesite prezime korisnika');
    } else if (EMAIL == null || EMAIL == "") {
        Swal.fire('Molimo unesite email korisnika');
    } else if (OIB == null || OIB == "") {
        Swal.fire('Molimo unesite OIB korisnika');
    } else if (OVLASTI == null || OVLASTI == "") {
        Swal.fire('Molimo unesite ovlasti korisnika');
    } else if (SPOL == null || SPOL == "") {
        Swal.fire('Molimo unesite spol korisnika');
    } else if ((ZAPORKA == null || ZAPORKA == "") && (ID == null || ID == "")) {
        Swal.fire('Molimo unesite zaporku korisnika');
    } else {
        $.ajax({
            type: 'POST',
            url: url,
            data: {
                "projekt": projekt,
                "procedura": "p_save_klijenti",
                "ID": ID,
                "IME": IME,
                "PREZIME": PREZIME,
                "EMAIL": EMAIL,
                "OIB": OIB,
                "OVLASTI": OVLASTI,
                "SPOL": SPOL,
                "ZAPORKA": ZAPORKA
            },
            success: function (data) {
                var jsonBody = JSON.parse(data);
                var errcode = jsonBody.h_errcode;
                var message = jsonBody.h_message;
                console.log(data);

                if ((message == null || message == "") && (errcode == null || errcode == 0)) {
                    Swal.fire('Uspješno se unijeli korisnika');
                } else {
                    Swal.fire(message + '.' + errcode);
                }
                refresh();
                showKlijenti();
            },
            error: function (xhr, textStatus, error) {
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
            },
            async: true
        });
    }
})

//-------------------Brisanje klijenta---------------
function delKlijent(ID, page){
    Swal.fire({
        title: 'Želite li zaista obrisati klijenta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Da, obriši klijenta!',
        cancelButtonText: 'Ipak nemoj!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    "projekt": projekt,
                    "procedura": "p_save_klijenti",
                    "ID": ID,
                    "ACTION": "delete"
                },
                success: function (data) {
                    var jsonBody = JSON.parse(data);
                    var errcode = jsonBody.h_errcode;
                    var message = jsonBody.h_message;
                    console.log(data);

                    if ((message == null || message == "") && (errcode == null || errcode == 0)) {
                        Swal.fire(
                            'Uspješno ',
                            'ste obrisali klijenta',
                            'success'
                        );
                    } else {
                        Swal.fire(message + '.' + errcode);
                    }
                    refresh();
                    showKlijenti();
                },
                error: function (xhr, textStatus, error) {
                    console.log(xhr.statusText);
                    console.log(textStatus);
                    console.log(error);
                },
                async: true
            });
        }
    })
}



