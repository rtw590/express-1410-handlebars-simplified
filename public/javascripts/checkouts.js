// Trying this out from documentation
var stripe = Stripe('pk_test_DbRbRpBPRvrpWqrS8WZawjny');

// Original From Tutorial
// Stripe.setPublishableKey('pk_test_DbRbRpBPRvrpWqrS8WZawjny');

var $form = $('#checkout-form');

// Trying From Docs
$form.submit(function (event) {
    console.log('submit happened');
    $('#charge-error').addClass('hidden');
    $form.find('button').prop('disabled', true);
    stripe.createToken(card).then(function(result){
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#name').val()
        // Original
        // name: $('#card-name').val()
    }, stripeResponseHandler);
    return false;
});

// Original Version From Tutorial
// $form.submit(function (event) {
//     console.log('submit happened');
//     $('#charge-error').addClass('hidden');
//     $form.find('button').prop('disabled', true);
//     Stripe.card.createToken({
//         number: $('#card-number').val(),
//         cvc: $('#card-cvc').val(),
//         exp_month: $('#card-expiry-month').val(),
//         exp_year: $('#card-expiry-year').val(),
//         name: $('#name').val()
//         // Original
//         // name: $('#card-name').val()
//     }, stripeResponseHandler);
//     return false;
// });

function stripeResponseHandler(status, response) {
    console.log('stripe handler happened ');
    if (response.error) { // Problem!

        // Show the errors on the form
        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('hidden');
        $form.find('button').prop('disabled', false); // Re-enable submission

    } else { // Token was created!

        // Get the token ID:
        // Original From Tutorial
        var token = response.id;

        // Insert the token into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        // Submit the form:
        $form.get(0).submit();

    }
}


