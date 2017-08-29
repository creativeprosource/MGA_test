/**
 * Created by Dave Bailey.
 */
$( document ).ready(function() {

    // handle form submission
      $('#contact-form').submit(function(e) {
            e.preventDefault(); //Prevent the normal submission action
            HandleFormSubmit(this.id);
        });

    // validate input on change
    $('.formdata').change(function() {
        var validate =  new MakeValidation();
        validate.doValidation($(this));
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




