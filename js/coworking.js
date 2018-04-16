(function () { 

  var _amount;
var _item;


$('#paymentModal').on('show.bs.modal', function (e) {
 var productName = $(e.relatedTarget).attr("data-product");
 var price = $(e.relatedTarget).attr("data-price");
    _amount= { total:price, currency: 'PHP'};
_item = [{
    name: productName,
    description: productName,
    quantity: '1',
    price: price,
    currency: 'PHP'
    }]
 
    $("#paymentModal .modal-title").html("Payment Confirmation for a <strong>" +productName+"</strong>");
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

