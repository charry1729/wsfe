// /* ----------------- Start Document ----------------- */
// (function($){
//     "use strict";
//     $(document).ready(function(){
//     // const SERVER_IP = "3.229.152.95:3001";
//     const SERVER_IP = "localhost:3001";
    
//     /*----------------------------------------------------*/
//     /*  Payments
//     /*----------------------------------------------------*/ 
//     console.log("loaded");
//     console.log("COming");
//     let p=$(".payment")
//     console.log(p);
//     // p.click(e=>{ console.log("coming");console.log(e)});
//     p.click(e=>{
//         e.preventDefault();
//         console.log(e);
//     })

//     function launchBOLT2(amount,hash)
//     {
//         bolt.launch({
//         key: '7TRo5byA',
//         txnid: 'ORD0024122019', 
//         hash: hash,
//         amount: amount,
//         firstname: 'p',
//         email:'priyaswt@gmail.com',
//         phone: '9769749908',
//         productinfo: 'startup',
//         udf5: 'BOLT_KIT_NODE_JS',
//         surl : 'http://localhost:3001/response.html',
//         furl: 'http://localhost:3001/response.html'
//     },{ responseHandler: function(BOLT){
//         console.log( BOLT.response.txnStatus );     
//         if(BOLT.response.txnStatus != 'CANCEL')
//         {
//             alert("status"+BOLT.response.txnStatus);
//             //Salt is passd here for demo purpose only. For practical use keep salt at server side only.
//             var fr = '<form action=\"http://localhost:3001/response.html\" method=\"post\">' +
//             '<input type=\"hidden\" name=\"key\" value=\"'+BOLT.response.key+'\" />' +
//             '<input type=\"hidden\" name=\"salt\" value=\"0XsBRURGf1\" />' +
//             '<input type=\"hidden\" name=\"txnid\" value=\"'+BOLT.response.txnid+'\" />' +
//             '<input type=\"hidden\" name=\"amount\" value=\"'+BOLT.response.amount+'\" />' +
//             '<input type=\"hidden\" name=\"productinfo\" value=\"'+BOLT.response.productinfo+'\" />' +
//             '<input type=\"hidden\" name=\"firstname\" value=\"'+BOLT.response.firstname+'\" />' +
//             '<input type=\"hidden\" name=\"email\" value=\"'+BOLT.response.email+'\" />' +
//             '<input type=\"hidden\" name=\"udf5\" value=\"'+BOLT.response.udf5+'\" />' +
//             '<input type=\"hidden\" name=\"mihpayid\" value=\"'+BOLT.response.mihpayid+'\" />' +
//             '<input type=\"hidden\" name=\"status\" value=\"'+BOLT.response.status+'\" />' +
//             '<input type=\"hidden\" name=\"hash\" value=\"'+BOLT.response.hash+'\" />' +
//             '</form>';
//             var form = jQuery(fr);
//             jQuery('body').append(form);                                
//             form.submit();
//         }
//     },
//         catchException: function(BOLT){
//              alert( BOLT.message );
//         }
//     });
//     }



//     function launchBOLT(amount){
//         $.ajax({
//               url: 'http://localhost:3001',
//               type: 'post',
//               data: JSON.stringify({ 
//                 key: '7TRo5byA',
//                 salt: '0XsBRURGf1',
//                 txnid: 'ORD0024122019',
//                 amount: amount,
//                 pinfo: 'startup',
//                 fname: 'p',
//                 email: 'priyaswt@gmail.com',
//                 mobile: '9769749908',
//                 udf5: 'BOLT_KIT_NODE_JS'
//               }),
//               contentType: "application/json",
//               dataType: 'json',
//               error: function (request, error) {
//         console.log(arguments);
//         alert(" Can't do because: " + error);
//     },
//               success: function(json) {    
//                   alert("json"+json)        
//                 // $('#hash').val(json);    
//                 launchBOLT2(amount,json);        
//               }
//             }); 
//     }

//     // ------------------ End Document ------------------ //
//     });

// })(this.jQuery);

//   