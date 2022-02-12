//--------forma za unos dvorane
function insertFormDvorane(page) {
    var output = '<table class="table table-hover"><tbody>';
    output += '<tr><th scope="col">oznaka</th><td><input type="text" id="oznaka"></td></tr>';
    output += '<tr><th scope="col">brojSjedala</th><td><input type="text" id="brojSjedala"></td></tr>';
    output += '</table>';
    output += '<button type="button" class="btn btn-warning" id="spremiDvo">Spremi <i class="fas fa-save"></i></button> ';
    output += '<button type="button" class="btn btn-success" onclick="showDvorane(' + page + ')">Odustani <i class="fas fa-window-close"></i></button>';
    $("#container").html(output);
}


//-------------------------------------------------------------
function showDvorane(page) {
    var tablica = '<br><button type="button" style="float:right;" class="btn btn-success" onclick="insertFormDvorane(' + page + ')">Insert <i class="fa fa-download" aria-hidden="true"></i></button><br><br>';
    tablica += '<table class="table table-hover"><tbody><thead><tr>';
    tablica += '<th scope="col">oznaka</th><th scope="col">brojSjedala</th><th scope="col">action</th></tr>';

    if (page == null || page == "") {
        page = 1;
    }

    $.ajax({
        type: 'POST',
        url: url,
        data: {"projekt": projekt, 
               "procedura": "p_get_dvorane", 
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
                    tablica += '<tr><td>' + v.oznaka + '</td>';
                    tablica += '<td>' + v.brojSjedala + '</td>';
                    tablica += '<td><button type="button" class="btn btn-primary" onclick="showDvorana(' + v.ID + ',' + page + ')">Edit <i class="fas fa-edit"></i></button> ';
                    tablica += '<button type="button" class="btn btn-danger" onclick="delDvorana(' + v.ID + ',' + page + ')">Delete <i class="far fa-trash-alt"></i></button></td></tr>';
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
function showDvorana(ID, page) {
    var tablica = '<table class="table table-hover"><tbody>';
    $.ajax({
        type: 'POST',
        url: url,
        data: { "projekt": projekt, "procedura": "p_get_dvorane", "ID": ID },
        success: function (data) {
            var jsonBody = JSON.parse(data);
            var errcode = jsonBody.h_errcode;
            var message = jsonBody.h_message;

            if (message == null || message == "", errcode == null || errcode == 0) {
                $.each(jsonBody.data, function (k, v) {
                    tablica += '<tr><th scope="col">ID</th><td><input type="text" id="ID" value="' + v.ID + '" readonly></td></tr>';
                    tablica += '<tr><th scope="col">oznaka</th><td><input type="text" id="oznaka" value="' + v.oznaka + '"></td></tr>';
                    tablica += '<tr><th scope="col">brojSjedala</th><td><input type="text" id="brojSjedala" value="' + v.brojSjedala + '"></td></tr>';
                    tablica += '</table>';
                    tablica += '<button type="button" class="btn btn-warning" id="spremiDvo">Spremi <i class="fas fa-save"></i></button> ';
                    tablica += '<button type="button" class="btn btn-success" onclick="showDvorana(' + page + ')">Odustani <i class="fas fa-window-close"></i></button>';
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

//-----------------------SAVE DVORANU---------------------------
$(document).on('click', '#spremiDvo', function () {
    var oznaka = $('#oznaka').val();
    var brojSjedala = $('#brojSjedala').val();
    var ID = $('#ID').val();

    if (oznaka == null || oznaka == "") {
        Swal.fire('Molimo unesite oznaku dvorane');
    } else if (brojSjedala == null || brojSjedala == "") {
        Swal.fire('Molimo unesite broj sjedala dvorane');
    } else {
        $.ajax({
            type: 'POST',
            url: url,
            data: {
                "projekt": projekt,
                "procedura": "p_save_dvorane",
                "ID": ID,
                "oznaka": oznaka,
                "brojSjedala": brojSjedala
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
                showDvorane();
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

//-------------------Brisanje dvorane---------------
function delDvorana(ID, page){
    Swal.fire({
        title: 'Želite li zaista obrisati dvoranu?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Da, obriši dvoranu!',
        cancelButtonText: 'Ipak nemoj!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    "projekt": projekt,
                    "procedura": "p_save_dvorane",
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
                            'ste obrisali dvoranu',
                            'success'
                        );
                    } else {
                        Swal.fire(message + '.' + errcode);
                    }
                    refresh();
                    showDvoranu();
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



