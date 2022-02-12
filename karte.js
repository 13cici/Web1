//--------forma za unos karta
function insertFormKarte(page) {
    var output = '<table class="table table-hover"><tbody>';
    output += '<tr><th scope="col">gledatelj</th><td><input type="text" id="gledatelj"></td></tr>';
    output += '<tr><th scope="col">dvorana</th><td><input type="text" id="dvorana"></td></tr>';
    output += '<tr><th scope="col">film</th><td><input type="text" id="film"></td></tr>';
    output += '<tr><th scope="col">vrijeme</th><td><input type="text" id="vrijeme"></td></tr>';
    output += '</table>';
    output += '<button type="button" class="btn btn-warning" id="spremiKar">Spremi <i class="fas fa-save"></i></button> ';
    output += '<button type="button" class="btn btn-success" onclick="showKarte(' + page + ')">Odustani <i class="fas fa-window-close"></i></button>';
    $("#container").html(output);
}


//-------------------------------------------------------------
function showKarte(page) {
    var tablica = '<br><button type="button" style="float:right;" class="btn btn-success" onclick="insertFormKarte(' + page + ')">Insert <i class="fa fa-download" aria-hidden="true"></i></button><br><br>';
    tablica += '<table class="table table-hover"><tbody><thead><tr>';
    tablica += '<th scope="col">gledatelj</th><th scope="col">dvorana</th><th scope="col">film</th><th scope="col">vrijeme</th><th scope="col">action</th></tr>';

    if (page == null || page == "") {
        page = 1;
    }

    $.ajax({
        type: 'POST',
        url: url,
        data: {"projekt": projekt, 
               "procedura": "p_get_karte", 
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
                    tablica += '<tr><td>' + v.gledatelj + '</td>';
                    tablica += '<td>' + v.dvorana + '</td>';
                    tablica += '<td>' + v.film + '</td>';
                    tablica += '<td>' + v.vrijeme + '</td>';
                    tablica += '<td><button type="button" class="btn btn-primary" onclick="showKarta(' + v.ID + ',' + page + ')">Edit <i class="fas fa-edit"></i></button> ';
                    tablica += '<button type="button" class="btn btn-danger" onclick="delKarta(' + v.ID + ',' + page + ')">Delete <i class="far fa-trash-alt"></i></button></td></tr>';
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
function showKarta(ID, page) {
    var tablica = '<table class="table table-hover"><tbody>';
    $.ajax({
        type: 'POST',
        url: url,
        data: { "projekt": projekt, "procedura": "p_get_karte", "ID": ID },
        success: function (data) {
            var jsonBody = JSON.parse(data);
            var errcode = jsonBody.h_errcode;
            var message = jsonBody.h_message;

            if (message == null || message == "", errcode == null || errcode == 0) {
                $.each(jsonBody.data, function (k, v) {
                    tablica += '<tr><th scope="col">ID</th><td><input type="text" id="ID" value="' + v.ID + '" readonly></td></tr>';
                    tablica += '<tr><th scope="col">gledatelj</th><td><input type="text" id="gledatelj" value="' + v.gledatelj + '"></td></tr>';
                    tablica += '<tr><th scope="col">dvorana</th><td><input type="text" id="dvorana" value="' + v.dvorana + '"></td></tr>';
                    tablica += '<tr><th scope="col">film</th><td><input type="text" id="film" value="' + v.film + '"></td></tr>';
                    tablica += '<tr><th scope="col">vrijeme</th><td><input type="text" id="vrijeme" value="' + v.vrijeme + '"></td></tr>';
                    tablica += '</table>';
                    tablica += '<button type="button" class="btn btn-warning" id="spremiKar">Spremi <i class="fas fa-save"></i></button> ';
                    tablica += '<button type="button" class="btn btn-success" onclick="showKarta(' + page + ')">Odustani <i class="fas fa-window-close"></i></button>';
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

//-----------------------SAVE KARTU---------------------------
$(document).on('click', '#spremiKar', function () {
    var gledatelj = $('#gledatelj').val();
    var dvorana = $('#dvorana').val();
    var film = $('#film').val();
    var vrijeme = $('#vrijeme').val();
    var ID = $('#ID').val();

    if (gledatelj == null || gledatelj == "") {
        Swal.fire('Molimo unesite gledatelja');
    } else if (dvorana == null || dvorana == "") {
        Swal.fire('Molimo unesite dvoranu');
    } else if (film == null || film == "") {
        Swal.fire('Molimo unesite film');
    } else if (vrijeme == null || vrijeme == "") {
        Swal.fire('Molimo unesite vrijeme');
    } else {
        $.ajax({
            type: 'POST',
            url: url,
            data: {
                "projekt": projekt,
                "procedura": "p_save_karte",
                "ID": ID,
                "gledatelj": gledatelj,
                "dvorana": dvorana,
                "film": film,
                "vrijeme": vrijeme
            },
            success: function (data) {
                var jsonBody = JSON.parse(data);
                var errcode = jsonBody.h_errcode;
                var message = jsonBody.h_message;
                console.log(data);

                if ((message == null || message == "") && (errcode == null || errcode == 0)) {
                    Swal.fire('Uspješno se unijeli kartu');
                } else {
                    Swal.fire(message + '.' + errcode);
                }
                refresh();
                showKarte();
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

//-------------------Brisanje karte---------------
function delKarta(ID, page){
    Swal.fire({
        title: 'Želite li zaista obrisati kartu?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Da, obriši kartu!',
        cancelButtonText: 'Ipak nemoj!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    "projekt": projekt,
                    "procedura": "p_save_karte",
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
                            'ste obrisali kartu',
                            'success'
                        );
                    } else {
                        Swal.fire(message + '.' + errcode);
                    }
                    refresh();
                    showKarte();
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



