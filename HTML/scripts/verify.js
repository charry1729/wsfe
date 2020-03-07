/* ----------------- Start Document ----------------- */
(function($){
    "use strict";
    $(document).ready(function(){
    const SERVER_IP = "3.229.152.95:3001";
    // const SERVER_IP = "localhost:3001";
    
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
    if(loc[1]){
        let params = getUrlVars();
        let d=$('.verifyCon')[0];
        if(params.id){
            // $('.verifyCon').text('Please wait while verifying');
            console.log($('.verifyCon')[0])
            
            d.innerHTML='<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>Please wait while we are verifying';

            $('.verifyCon').addClass("showele");
            if(params.id && params.hash){
                $.ajax({
                    url: "http://"+SERVER_IP+"/user/verify/",
                    type: "POST",
                    dataType: "json",
                    data: {
                        id:params.id,
                        hash:params.hash,
                    },
                    error: function (data) {
                        // alert('error');
                        console.log("In error");
                        let d=$('.verifyCon')[0];
                        console.log(d.innerHTML);
                        d.innerHTML='<i class="fa fa-warning"></i>Data provided is incorrect';
                        window.popup('Failed to verify',"errorPopup");
                        console.log(data);
                    },
                    success: function (data) { //callback   
                        // console.log('Verified successfull');
                        $('.verifyCon')[0].innerHTML='<i class="fa fa-check" aria-hidden="true"></i>Email Verified '
                        window.popup('Verified successfully','successPopup')
                        setTimeout(()=>{window.location.href = "./my-account.html";},1000)
                    }
        
                });
            }else{
                d.innerHTML='<i class="fa fa-warning"></i>Url is not valid';
                window.popup('Url is not valid',"errorPopup");

            }

        }else{
            $('.verifyCon').addClass('showele');
        }
    }else{
        $(".verifyCon").remove();
        $(".emailCont").addClass('showele');
    }
    
    console.log($('#sendMail'));
    console.log("Attached");
    function lateSync(){
        $('#sendMail').click(()=>{
            function ValidateEmail(mail)
            {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
                {
                    return (true)
                }
                    return (false)
            }
            let email = $("#email")[0].value;
            if(!ValidateEmail(email)){
                window.popup("Not valid email",'errorPopup');
                return;
            }
            $.ajax({
                url: "http://"+SERVER_IP+"/user/sendMail/",
                type: "POST",
                dataType: "json",
                data: {
                    email:email,
                },
                error: function (data) {
                    // alert('error');
                   $(".notify").text(data.responseJSON['message'] || "Failed to send verification mail.Try again later!");
                   $('.notify')[0].style.color="red";
                    window.popup(data.responseJSON['message'] || 'Failed to send verification mail.Try again later!',"errorPopup");
                    console.log(data);
                },
                success: function (data) { //callback   
                    // console.log('Verified successfull');
                    console.log(data)
                    $(".notify").text(data['message'] || "Email sent succesfully! Check your inbox or spam");
                    $('.notify')[0].style.color="#26ae61";
                    window.popup(data['message'] || 'Email sent succesfully','successPopup')
                    // setTimeout(()=>{window.location.href = "./my-account.html";},1000)
                }
    
            });
        })
    }
    setTimeout(lateSync,1000);
    
    // ------------------ End Document ------------------ //
    });

})(this.jQuery);

  