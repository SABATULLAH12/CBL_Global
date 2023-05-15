function checkAuth() {     
    var username = $('.userName').val();
    var password = $('.password').val();

    if (username == '' && password == '') {
        alert('Username and Password fields empty');
        return;
    }
    else if (username == '') {
        alert('Username field is empty');
        return;
    }
    else if (password == '') {
        alert('Password field is empty');
        return;
    }

    var request = {};
    request.username = username;
    request.password = password;
   
    $.ajax({
        type: "Post",
        url: AQ.CBL.BaseUrl + "/Login/GetAuthorization",
        data: request,
        
        async: true,
        success: function (data) {
        
            if (data == "1") {
                var user = username.substr(0, username.indexOf('@'));
                sessionStorage.setItem("user", user);
                sessionStorage.setItem("authorized", 1);
                window.location.href = $("#URLHome").val();
            }
            else {
                alert('Invalid Credentials');
                return;
            }
        },
        error: function (e) {
            alert('Invalid Credentials');
            return;
        }
    });

   
    
}
//**********document ready events***********
$(document).ready(function (event) {
    
    $(document).bind('keydown', function (e) {
        if (e.which === 13) {//Authentication on enter key
            checkAuth();
        }
    });

    //$(".password").keypress(function (event) {
    //    var code = event.keyCode || event.which;
    //    if (code == 13) { //Enter keycode
    //        //Do something

    //        checkAuth();
    //    }
       
    //});
});