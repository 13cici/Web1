//--------forma za unos gledatelji
function insertFormGledatelje(page) {
    var output = '<table class="table table-hover"><tbody>';
    output += '<tr><th scope="col">ime</th><td><input type="text" id="ime"></td></tr>';
    output += '<tr><th scope="col">prezime</th><td><input type="text" id="prezime"></td></tr>';
    output += '</table>';
    output += '<button type="button" class="btn btn-warning" id="spremiGle">Spremi <i class="fas fa-save"></i></button> ';
    output += '<button type="button" class="btn btn-success" onclick="showGledatelji(' + page + ')">Odustani <i class="fas fa-window-close"></i></button>';
    $("#container").html(output);
}


//-------------------------------------------------------------
function showGledatelji(page) {
    var tablica = '<br><button type="button" style="float:right;" class="btn btn-success" onclick="insertFormGledatelje(' + page + ')">Insert <i class="fa fa-download" aria-hidden="true"></i></button><br><br>';
    tablica += '<table class="table table-hover"><tbody><thead><tr>';
    tablica += '<th scope="col">ime</th><th scope="col">prezime</th><th scope="col">action</th></tr>';

    if (page == null || page == "") {
        page = 1;
    }

    $.ajax({
        type: 'POST',
        url: url,
        data: {"projekt": projekt, 
               "procedura": "p_get_gledatelje", 
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
                    tablica += '<tr><td>' + v.ime + '</td>';
                    tablica += '<td>' + v.prezime + '</td>';
                    tablica += '<td><button type="button" class="btn btn-primary" onclick="showGledatelj(' + v.ID + ',' + page + ')">Edit <i class="fas fa-edit"></i></button> ';
                    tablica += '<button type="button" class="btn btn-danger" onclick="delGledatelj(' + v.ID + ',' + page + ')">Delete <i class="far fa-trash-alt"></i></button></td></tr>';
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
function showGledatelj(ID, page) {
    var tablica = '<table class="table table-hover"><tbody>';
    $.ajax({
        type: 'POST',
        url: url,
        data: { "projekt": projekt, "procedura": "p_get_gledatelje", "ID": ID },
        success: function (data) {
            var jsonBody = JSON.parse(data);
            var errcode = jsonBody.h_errcode;
            var message = jsonBody.h_message;

            if (message == null || message == "", errcode == null || errcode == 0) {
                $.each(jsonBody.data, function (k, v) {
                    tablica += '<tr><th scope="col">ID</th><td><input type="text" id="ID" value="' + v.ID + '" readonly></td></tr>';
                    tablica += '<tr><th scope="col">ime</th><td><input type="text" id="ime" value="' + v.ime + '"></td></tr>';
                    tablica += '<tr><th scope="col">prezime</th><td><input type="text" id="prezime" value="' + v.prezime + '"></td></tr>';
                    tablica += '</table>';
                    tablica += '<button type="button" class="btn btn-warning" id="spremiGle">Spremi <i class="fas fa-save"></i></button> ';
                    tablica += '<button type="button" class="btn btn-success" onclick="showGledatelji(' + page + ')">Odustani <i class="fas fa-window-close"></i></button>';
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

//-----------------------SAVE GLEDATELJA---------------------------
$(document).on('click', '#spremiGle', function () {
    var ime = $('#ime').val();
    var prezime = $('#prezime').val();
    var ID = $('#ID').val();

    if (ime == null || ime == "") {
        Swal.fire('Molimo unesite ime gledatelja');
    } else if (prezime == null || prezime == "") {
        Swal.fire('Molimo unesite prezime gledatelja');
    } else {
        $.ajax({
            type: 'POST',
            url: url,
            data: {
                "projekt": projekt,
                "procedura": "p_save_gledatelje",
                "ID": ID,
                "ime": ime,
                "prezime": prezime
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
                showGledatelji();
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

//-------------------Brisanje gledatelja---------------
function delGledatelj(ID, page){
    Swal.fire({
        title: 'Želite li zaista obrisati gledatelja?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Da, obriši gledatelja!',
        cancelButtonText: 'Ipak nemoj!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    "projekt": projekt,
                    "procedura": "p_save_gledatelje",
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
                            'ste obrisali gledatelja',
                            'success'
                        );
                    } else {
                        Swal.fire(message + '.' + errcode);
                    }
                    refresh();
                    showGledatelji();
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



