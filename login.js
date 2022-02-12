function loginForm() {
    var output = "<br><br><form><div class='form-group'>";
    output += "<label for='inputEmail'>Email adresa</label>";
    output += "<input type='email' class='form-control' id='inputEmail' aria-describedby='emailHelp' placeholder='Enter email'></div>";
    output += "<div class='form-group'><label for='inputPassword'>Password</label>";
    output += "<input type='password' class='form-control' id='inputPassword' placeholder='Password'></div>";
    output += "<button class='btn btn-primary' id='getLogin'>Submit</button></form>";
    return output;
}

//kontrole za unos podataka
//------------------------LOGIN--------------------------------
$(document).on('click', '#getLogin', function () {
    var email = $('#inputEmail').val();
    var password = $('#inputPassword').val();
    if (email == null || email == "") {
        Swal.fire('Molimo unesite email adresu');
    } else if (password == null || password == "") {
        Swal.fire('Molimo unesite zaporku');
    } else {
        login();
    }
})



function login() {
    $.ajax({
        type: 'POST',
        url: url,
        data: {"projekt": projekt, 
               "procedura": "p_login", 
               "username": $('#inputEmail').val(), 
               "password": $('#inputPassword').val()
            },
        success: function (data) {
            var jsonBody = JSON.parse(data);
            var errcod = jsonBody.h_errcod;
            var message = jsonBody.h_message;
        
            if (message == null || message == "", errcod == null || errcod == 0) {
                $("#container").html('');
                refresh();
            } else {
                Swal.fire(message + '.' + errcod);
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

function logout() {
    $.ajax({
        type: 'POST',
        url: url,
        data: { "projekt": "p_common", 
                "procedura": "p_logout" 
            },
        success: function (data) {
            var jsonBody = JSON.parse(data);
            var errcode = jsonBody.h_errcode;
            var message = jsonBody.h_message;

            if (message == null || message == "" || errcode == null) {
                Swal.fire("Greška u obradi podataka, molimo pokušajte ponovno!");
            } else {
                Swal.fire(message + '.' + errcode);
                
            }
            $("#container").html('');
            $("#podaci").html('');
           
        },
        error: function (xhr, textStatus, error) {
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        },
        async: true
    });
}


