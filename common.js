//------konstante------------------------------------------------
var url = "https://dev.vub.zone/sandbox/router.php";
var projekt = "p_dciciliot";
var perPage = 10;

//------hendlanje link button-a----------------------------------
$("#loginBtn").click(function () {
    $("#container").html(loginForm);
});

$("#logoutBtn").click(function () {
    logout();
});

$("#klijentiBtn").click(function () {
    showKlijenti();
});

$("#gledateljiBtn").click(function () {
    showGledatelji();
});

$("#dvoraneBtn").click(function () {
    showDvorane();
});

$("#filmoviBtn").click(function () {
    showFilmovi();
});

$("#karteBtn").click(function () {
    showKarte();
});

//------------refersh-------------------------------------------------
$(function () {
    refresh();
});

//------------refersh--------------------------------------------------
function refresh() {
    $.ajax({
        type: 'POST',
        url: url,
        data: { "projekt": "p_common", 
                "procedura": "p_refresh" 
              },
        success: function (data) {
            var jsonBody = JSON.parse(data);
            if (jsonBody.h_errcode !== 999){
                var podaci = '<small>ID:' + jsonBody.ID + '<br>' + 'ime prezime:' + jsonBody.ime + ' ' + jsonBody.prezime + '<br>' + 'email:' + jsonBody.email + '</small>';
                $("#podaci").html(podaci);
            }  
        },
        error: function (xhr, textStatus, error) {
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        },
        async: true

    });
}

//----------------------------------------------------------------
function pagination(pageNmb, perPage, count) {
    //ne treba prikazivati ništa
    if (count < perPage) {
        return '';
    } else {
        var quotient = Math.ceil(count / perPage);
    }
    var next = pageNmb + 1;
    var prev = pageNmb - 1;
    var pagination = '<div class="float-right pagination">';

    //treba prikazati previous
    if (pageNmb > 1) {
        pagination += '<ul class="pagination"><li class="page-item "><a class="page-link" onclick="showKorisnici(' + prev + ')" href="javascript:void(0)">‹</a></li>';
    }

    for (i = pageNmb; i < pageNmb + 8; i++) {
        pagination += '<li class="page-item"><a class="page-link" onclick="showKorisnici(' + i + ')" href="javascript:void(0)">' + i + '</a></li>';
    }

    pagination += '<li class="page-item"><a class="page-link"  href="javascript:void(0)">...</a></li>';

    pagination += '<li class="page-item"><a class="page-link" onclick="showKorisnici(' + quotient + ')" href="javascript:void(0)">' + quotient + '</a></li>';

    pagination += '<li class="page-item"><a class="page-link" onclick="showKorisnici(' + next + ')" href="javascript:void(0)">›</a></li>';
    pagination += '</ul></div>';
    return pagination;
}
//-----------ajaxSetup-------------------------------------------------------
$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    }
});