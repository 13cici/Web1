//--------forma za unos filmovi
function insertFormFilmove(page) {
    var output = '<table class="table table-hover"><tbody>';
    output += '<tr><th scope="col">naziv</th><td><input type="text" id="naziv"></td></tr>';
    output += '<tr><th scope="col">trajanje</th><td><input type="text" id="trajanje"></td></tr>';
    output += '<tr><th scope="col">godinaIzdanja</th><td><input type="text" id="godinaIzdanja"></td></tr>';
    output += '<tr><th scope="col">redatelj</th><td><input type="text" id="redatelj"></td></tr>';
    output += '</table>';
    output += '<button type="button" class="btn btn-warning" id="spremiFil">Spremi <i class="fas fa-save"></i></button> ';
    output += '<button type="button" class="btn btn-success" onclick="showFilmovi(' + page + ')">Odustani <i class="fas fa-window-close"></i></button>';
    $("#container").html(output);
}


//-------------------------------------------------------------
function showFilmovi(page) {
    var tablica = '<br><button type="button" style="float:right;" class="btn btn-success" onclick="insertFormFilmove(' + page + ')">Insert <i class="fa fa-download" aria-hidden="true"></i></button><br><br>';
    tablica += '<table class="table table-hover"><tbody><thead><tr>';
    tablica += '<th scope="col">naziv</th><th scope="col">trajanje</th><th scope="col">godinaIzdanja</th><th scope="col">redatelj</th><th scope="col">action</th></tr>';

    if (page == null || page == "") {
        page = 1;
    }

    $.ajax({
        type: 'POST',
        url: url,
        data: {"projekt": projekt, 
               "procedura": "p_get_filmove", 
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
                    tablica += '<tr><td>' + v.naziv + '</td>';
                    tablica += '<td>' + v.trajanje + '</td>';
                    tablica += '<td>' + v.godinaIzdanja + '</td>';
                    tablica += '<td>' + v.redatelj + '</td>';
                    tablica += '<td><button type="button" class="btn btn-primary" onclick="showFilm(' + v.ID + ',' + page + ')">Edit <i class="fas fa-edit"></i></button> ';
                    tablica += '<button type="button" class="btn btn-danger" onclick="delFilm(' + v.ID + ',' + page + ')">Delete <i class="far fa-trash-alt"></i></button></td></tr>';
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
function showFilm(ID, page) {
    var tablica = '<table class="table table-hover"><tbody>';
    $.ajax({
        type: 'POST',
        url: url,
        data: { "projekt": projekt, "procedura": "p_get_filmove", "ID": ID },
        success: function (data) {
            var jsonBody = JSON.parse(data);
            var errcode = jsonBody.h_errcode;
            var message = jsonBody.h_message;

            if (message == null || message == "", errcode == null || errcode == 0) {
                $.each(jsonBody.data, function (k, v) {
                    tablica += '<tr><th scope="col">ID</th><td><input type="text" id="ID" value="' + v.ID + '" readonly></td></tr>';
                    tablica += '<tr><th scope="col">naziv</th><td><input type="text" id="naziv" value="' + v.naziv + '"></td></tr>';
                    tablica += '<tr><th scope="col">trajanje</th><td><input type="text" id="trajanje" value="' + v.trajanje + '"></td></tr>';
                    tablica += '<tr><th scope="col">godinaIzdanja</th><td><input type="text" id="godinaIzdanja" value="' + v.godinaIzdanja + '"></td></tr>';
                    tablica += '<tr><th scope="col">redatelj</th><td><input type="text" id="redatelj" value="' + v.redatelj + '"></td></tr>';
                    tablica += '</table>';
                    tablica += '<button type="button" class="btn btn-warning" id="spremiFil">Spremi <i class="fas fa-save"></i></button> ';
                    tablica += '<button type="button" class="btn btn-success" onclick="showFilm(' + page + ')">Odustani <i class="fas fa-window-close"></i></button>';
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

function isNumber(num) {
    return (typeof num == 'string' || typeof num == 'number') && !isNaN(num - 0) && num !== '';
  };

//-----------------------SAVE FILM---------------------------
$(document).on('click', '#spremiFil', function () {
    var naziv = $('#naziv').val();
    var trajanje = $('#trajanje').val();
    var godinaIzdanja = $('#godinaIzdanja').val();
    var redatelj = $('#redatelj').val();
    var ID = $('#ID').val();

    if (naziv == null || naziv == "") {
        Swal.fire('Molimo unesite naziv filma');
    } else if (trajanje == null || trajanje == "" || !isNumber(trajanje)) {
        Swal.fire('Molimo unesite trajanje filma');
    } else if (godinaIzdanja == null || godinaIzdanja == "" || !isNumber(godinaIzdanja)) {
        Swal.fire('Molimo unesite godinu izdanja filma');
    } else if (redatelj == null || redatelj == "") {
        Swal.fire('Molimo unesite redatelja filma');
    } else {
        $.ajax({
            type: 'POST',
            url: url,
            data: {
                "projekt": projekt,
                "procedura": "p_save_filmove",
                "ID": ID,
                "naziv": naziv,
                "trajanje": trajanje,
                "godinaIzdanja": godinaIzdanja,
                "redatelj": redatelj
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
                showFilmovi();
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

//-------------------Brisanje filma---------------
function delFilm(ID, page){
    Swal.fire({
        title: 'Želite li zaista obrisati film?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Da, obriši film!',
        cancelButtonText: 'Ipak nemoj!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    "projekt": projekt,
                    "procedura": "p_save_filmove",
                    "ID": ID,
                    "action": "delete"
                },
                success: function (data) {
                    var jsonBody = JSON.parse(data);
                    var errcode = jsonBody.h_errcode;
                    var message = jsonBody.h_message;
                    console.log(data);

                    if ((message == null || message == "") && (errcode == null || errcode == 0)) {
                        Swal.fire(
                            'Uspješno ',
                            'ste obrisali film',
                            'success'
                        );
                    } else {
                        Swal.fire(message + '.' + errcode);
                    }
                    refresh();
                    showFilmovi();
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



