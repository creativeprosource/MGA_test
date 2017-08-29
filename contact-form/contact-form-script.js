/**
 * Created by Dave Bailey.
 */
$( document ).ready(function() {

    // handle form submission
      $('#contact-form').submit(function(e) {
            e.preventDefault(); //Prevent the normal submission action
            var contactForm = new HandleFormSubmit(this.id);// creates and executes a new form handler
        });

    // if state select changes show or hide conformation select
    $('#state-select').change(function(){
        var state=$(this).val();
        if(state == ""){
            $('#confirm-state-wrapper').slideUp(); // hide state confirm input
        }
        else
        {
            $('#selected-state').text(state);
            $('#confirm-state-wrapper').slideDown(); // show state confirm input
        }
    });

    // remove form
    $('#contact-close-button').click(function(){
        $('#modal-block, #modal-container').fadeOut('slow',function() {
            $('#modal-container').html(''); // remove form from DOM
        });
    });

});




