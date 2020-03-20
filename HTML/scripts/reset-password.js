/* ----------------- Start Document ----------------- */
(function($){
    "use strict";
    $(document).ready(function(){
    // const SERVER_IP = "3.229.152.95:3001";
    const SERVER_IP = "localhost:3001";
    
    /*----------------------------------------------------*/
    /*  Verify
    /*----------------------------------------------------*/ 
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    const loc = window.location.href.split("?");
    $(".emailCont").addClass('showele');
    let params = getUrlVars();

    function lateSync(){
        $('#reset-btn').click(()=>{
            let pass1 = $("#pass1")[0].value;
            let pass2 = $('#pass2')[0].value;
            if(!pass1){
                window.popup("Invalid password",'errorPopup');
                return;
            }
            if(pass1 != pass2){
                window.popup("Passwords did'nt match",'errorPopup');
            }
            
            $.ajax({
                url: "http://"+SERVER_IP+"/user/reset/password",
                type: "POST",
                dataType: "json",
                data: {
                    // email:email,
                    hash:params['hash'],
                    id:params['id'],
                    new_password: pass1,
                },
                error: function (data) {
                    // alert('error');
                   $(".notify").text(data.responseJSON['message'] || "Failed to reset Password.Try again later!");
                   $('.notify')[0].style.color="red";
                    window.popup(data.responseJSON['message'] || 'Failed to reset password.Try again later!',"errorPopup");
                    console.log(data);
                },
                success: function (data) { //callback   
                    // console.log('Verified successfull');
                    console.log(data)
                    $(".notify").text(data['message'] || "Success");
                    $('.notify')[0].style.color="#26ae61";
                    window.popup(data['message'] || 'Password reset successful','successPopup')
                    // setTimeout(()=>{window.location.href = "./my-account.html";},1000)
                }
    
            });
        })
    }
    setTimeout(lateSync,1000);
    
    // ------------------ End Document ------------------ //
    });

})(this.jQuery);

  