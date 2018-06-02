(function () { 

var _amount;
var _item;
var _qty=1; 

$('#paymentModal').on('show.bs.modal', function (e) {
 var productName = $(e.relatedTarget).attr("data-product");
 var paypalCharge = (($(e.relatedTarget).attr("data-price")*0.029)+15).toFixed(2) ;
 var price = parseFloat($(e.relatedTarget).attr("data-price"))+ parseFloat(paypalCharge);
 var normalPrice = parseFloat($(e.relatedTarget).attr("data-price"));
 

 $("#paymentModal input[type='number']").blur(function(){
    _item[0].quantity =$("#paymentModal input[type='number']").val();
    _amount.total = $("#paymentModal input[type='number']").val() * price; 
    $("#gcashModal .amount").html(normalPrice*_item[0].quantity);
})

_amount= { total:price, currency: 'PHP'};
_item = [{
    name: productName,
    description: productName,
    quantity:_qty,
    price: price,
    currency: 'PHP'
    }]
 
    $("#paymentModal .modal-title").html("Payment Confirmation for a <strong>" +productName+"</strong>");
    $(".paypal-charges").html("<i>An additional of <strong>₱" +paypalCharge+"</strong> for Paypal Charges.</i>");
    $("#gcashModal .amount").html(normalPrice*_item[0].quantity);
    $("#gcashModal .event").html(productName);
})

$('#paymentModal').on('hidden.bs.modal', function (e) {
    $("#paymentModal input[type='number']").val(1);
  })





    paypal.Button.render({

        env: Global_ENV, // Or 'sandbox'

        client: {
            sandbox:    'AWk7qTJWf50AfkNmv5fXlMVuzTqYogjSTWZV7dAMERJAQAqg3tdgkM5fdbCiT_6hz5LLXmfWSC9212xn',
            production: 'AXLsANRhjCEbEWnY1kN8Etl4xJ8aysmJcFBsUCkbjTNl_z-Uq4oY6ihIqUJuSjfEUH4PNIMCkLLS8V0p'
        },

        style: {
          label: 'pay',
          size:  'medium',    // small | medium | large | responsive
          shape: 'rect',     // pill | rect
          color: 'blue',     // gold | blue | silver | black
          tagline: false    
      },
        commit: true, // Show a 'Pay Now' button

        payment: function(data, actions) {
          
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: _amount,
                            item_list: {
                                items: _item
                            }
                        }
                        
                        
                    ]
                   }
                   
            });
        },

        onAuthorize: function(data, actions) {
          
             return actions.payment.execute().then(function(payment) {

            //     // The payment is complete!
            //     // You can now show a confirmation message to the customer

            $('#paymentModal').modal('hide');
            $("#paymentModal input[type='number']").val(1);
            var name  = payment.payer.payer_info['first_name'] +" " + payment.payer.payer_info['last_name'];
            var price = payment.transactions[0].amount["total"] +" " + payment.transactions[0].amount["currency"];
            $('#afterPaymentModal').modal({backdrop: 'static', keyboard: false});
            $('#afterPaymentModal').modal('show');
            $('#afterPaymentModal .modal-title').html('Payment Successful!');
            $('#afterPaymentModal .modal-body .content').html("<p><strong>In a few minutes, you will recieve an email from Paypal, please present that on the day of use!</strong><br><br> Transaction ID :"+payment.id+"<br>Name: "+name+"<br/>Total Amount: "+price+" </p>");
             });
            // window.location.href("/paymentsuccess?=name"+_payment.payer.payer_info['first_name']+"&")
        },
        onError: function(err) {
          console.log(err);
          $('#paymentModal').modal('hide');
          alert("Something went wrong! Please email marketing@builtable.co")
          // Show an error page here, when an error occurs
      }

    }, '#paypal-button');



 }());

