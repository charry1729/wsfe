/* ----------------- Start Document ----------------- */
(function($){
    "use strict";
    $(document).ready(function(){
    // const SERVER_IP = "3.229.152.95:3001";
    const SERVER_IP = "localhost:3001";

    function ValidateEmail(mail)
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
            // alert("You have entered an invalid email address!")
            return (false)
    }
    
    /*----------------------------------------------------*/
    /*  Login and register
    /*----------------------------------------------------*/ 
    function loginFunc() {
        let email = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        if(!ValidateEmail(email)){
            window.popup('Email is not valid','errorPopup');
            return;
        }
        if( !(email && password)){
            console.log('Data is not given');
            return;
        }
        email = email.split('@')[0]+'@' + email.split('@')[1].toLowerCase();

        $.ajax({
            url: "http://"+SERVER_IP+"/user/login/",
            type: "POST",
            dataType: "json",
            data: {
                email: email,
                password: password,
            },
            error: function (data) {
                // alert('error');
                if(! data.responseJSON){
                    window.popup("Something went wrong","errorPopup");
                    return;
                }
                if(data.responseJSON['verified']===false){
                    window.popup('Verify your email to login',"errorPopup");
                }else{
                    let mes= data.responseJSON['message'] || "Something went wrong";
                    window.popup(mes,"errorPopup");
                }
                console.log(data);

            },
            success: function (data) { //callback   
                console.log('login successfull');

                if (typeof (Storage) != undefined) {
                    // Store
                    localStorage.setItem('sessionInfo',JSON.stringify(data));
                    window.location.href = "./index.html";
                    // Retrieve
                    // document.getElementById("result").innerHTML = localStorage.getItem("token");
                } else {
                    // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
                }
            }
        });
    }
    // Login
    $("#login").click(loginFunc);
    $("#tab1").keypress(function(e){
        if(e.which==13){
            loginFunc();
        }
    });

    function isEmail(email){
        if(! ValidateEmail(email)){
            window.popup('Entered mail is not valid',"errorPopup");
            return false
            // return;
        }
        const eList = ["gmail.com", "yahoo.com", "hotmail.com", "aol.com", "hotmail.co.uk", "hotmail.fr", "msn.com", "yahoo.fr", "wanadoo.fr", "orange.fr", "comcast.net", "yahoo.co.uk", "yahoo.com.br", "yahoo.co.in", "live.com", "rediffmail.com", "free.fr", "gmx.de", "web.de", "yandex.ru", "ymail.com", "libero.it", "outlook.com", "uol.com.br", "bol.com.br", "mail.ru", "cox.net", "hotmail.it", "sbcglobal.net", "sfr.fr", "live.fr", "verizon.net", "live.co.uk", "googlemail.com", "yahoo.es", "ig.com.br", "live.nl", "bigpond.com", "terra.com.br", "yahoo.it", "neuf.fr", "yahoo.de", "alice.it", "rocketmail.com", "att.net", "laposte.net", "facebook.com", "bellsouth.net", "yahoo.in", "hotmail.es", "charter.net", "yahoo.ca", "yahoo.com.au", "rambler.ru", "hotmail.de", "tiscali.it", "shaw.ca", "yahoo.co.jp", "sky.com", "earthlink.net", "optonline.net", "freenet.de", "t-online.de", "aliceadsl.fr", "virgilio.it", "home.nl", "qq.com", "telenet.be", "me.com", "yahoo.com.ar", "tiscali.co.uk", "yahoo.com.mx", "voila.fr", "gmx.net", "mail.com", "planet.nl", "tin.it", "live.it", "ntlworld.com", "arcor.de", "yahoo.co.id", "frontiernet.net", "hetnet.nl", "live.com.au", "yahoo.com.sg", "zonnet.nl", "club-internet.fr", "juno.com", "optusnet.com.au", "blueyonder.co.uk", "bluewin.ch", "skynet.be", "sympatico.ca", "windstream.net", "mac.com", "centurytel.net", "chello.nl", "live.ca", "aim.com", "bigpond.net.au"];
        let givenMail = email.toLowerCase().split('@')[1];
        if(eList.indexOf(givenMail)===-1){
            return true;
        }else{
            window.popup('Recruiter signup requires company email',"errorPopup");
            return false;
        }
    }
    

    function registerFunc() {
        let username = document.getElementById("username2").value;
        let email = document.getElementById("email2").value;
        let password = document.getElementById("password1").value;
        let rep_password = document.getElementById('password2').value;
        let selected = document.getElementById('userType').selectedIndex;
        let userType = selected == 0 ? 'applicant' : 'recruiter';
        if( !(email && password && username && rep_password)){
            console.log('Data is not given');
            // alert('Enter all the fields');
            window.popup('Enter all the fields',"errorPopup");
            return;
        }
        if( userType=="recruiter" && ! isEmail(email)){
            return;
        }else{
            if(!ValidateEmail(email)){
                window.popup("Email entered is not valid","errorPopup");
                return;
            }
        }
        if(password != rep_password){
            // alert("Passwords did'nt match!!");
            window.popup('Passwords didn\'nt match','errorPopup');
            return;
        }
        email = email.split('@')[0]+ '@' + email.split('@')[1].toLowerCase();

        $.ajax({
            url: "http://"+SERVER_IP+"/user/signup/",
            type: "POST",
            dataType: "json",
            data: {
                username :username,
                email: email,
                password: password,
                type: userType,
            },
            error: function (data) {
                // alert('error');
                window.popup('Regiter Failed',"errorPopup");
                console.log(data);
            },
            success: function (data) { //callback   
                console.log('signup successfull');
                setTimeout(()=>{window.location.href = "./verify.html?success";},1000);
                
            }

        });

    }
    // Signup
    $("#register").click(registerFunc);
    $("#tab2").keypress(function(e){
        if(e.which==13){
            registerFunc();
        }
    });
    // ------------------ End Document ------------------ //
    });

})(this.jQuery);

  