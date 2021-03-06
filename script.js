/**
 * Created by Dave Bailey.
 */
$( document ).ready(function() {

    // show contact form on click of button
    $('#contact-button').click(function(){
        $('#modal-block').fadeIn('slow');
        $('#modal-container').load('contact-form/contact-form.html', function(){$('#modal-container').fadeIn('slow');});
    });

});


/*
 HandleFormSubmit is an OOP system to handle any form submission it is used as follows

 var formHandler= new HandleFormSubmit(theFormId; // create a new form handler passing the form's ID

 validation is handled by a comma separated "validate" attribute on the input i.e. validate="required,phone-usa"
 If required, the "required" flag should be the first in the comma separated list.
 a class of "formdata" is required on all inputs to be validated and passed to the server through AJAX to be handled.
*/
function MakeValidation() {
    vi=this;
    vi.nameToMsg = function(str) // converts lowercase, hyphen separated input name to space separated Word Capitalized
    {
        var splitStr = str.toLowerCase().split('-');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    };
    vi.validate = function (item,type) // this does the validation
    {
        var err = 0;
        var name = item.attr('name');
        var value = item.val();
        var msg = "";
        switch (type)
        {
            case 'required':
                if(value == '' || value === undefined) {
                    err = 1;
                    msg = vi.nameToMsg(name)+" is a required field.";
                }
                break;
            case 'phone-usa':
                if(!value.match(/^\d\d\d\-\d\d\d-\d\d\d\d$/)) {
                    err = 1;
                    msg = "Please enter a valid phone number";
                }
                break;
            // Add more validation types below
        }
        if(err > 0){
            item.addClass('invalid');
        }
        $("#"+name+"-err-message").text(msg);
        // console.log( name+' '+value+' '+type+((err != 0)?' ERROR':' OK') );
        return err;
    };
    vi.doValidation = function(item) {
        if(item.attr('validate') === undefined) return 0;
        var errors = 0;
        var err = 0;
        // the validation attribute is a comma separated list of validation types to apply to the input
        var validations = item.attr('validate').split(',');
        validations.forEach(function (type) {
            if (err === 0) {
                item.removeClass('invalid');
                err = vi.validate(item, type);
                errors += err;
            }
        });
        return errors;
    };
}

function HandleFormSubmit(formId) {
    var hfs = this;
    hfs.submit = function (formId) // the main function called to submit a form passing the forms ID
    {
        var form = $('#'+formId);
        var errors = hfs.validateForm(formId);
        if(errors > 0)return;

        var formData = hfs.getFormData(formId);
        console.log(formData);
    /* commented out because there is no back end to handle the AJAX
         $.ajax({
         type: form.attr('method'),
         dataType:'text',
         url: form.attr('action'),
         data:
         {
         model:form.attr('name'),   // "The form name must be the same as the class that will handle saving the data"
         method:'submit', // "Any callable method in the named class"
         params:formData
         // params is optional. It can be a single value (as in this case a single json string)
         // or an array of values in the order of the called method's parameters.
         },
         success:function(data)
         {
    */
        // handle success results
        $('#'+formId+' div.inputs-container').hide();
        $('#'+formId+'-wrapper p.form-text').html("Thank you!<br>We have received your message and will reach out to you as soon as possible");
    /*
         },
         fail: function(){console.log('There was an error saving form data');}
         });
    */
    };
    hfs.validate = new MakeValidation();
    hfs.validateForm = function (formId)
    {
        // validate all form data with a class of "formdata and a validate attribute
        var errors = 0;
        $('#'+formId+' .formdata').each(function() {
            var item = $(this);
            errors += hfs.validate.doValidation(item);
        });
        //console.log('errors='+errors);
        return errors;
    };

    hfs.getFormData = function (formId)
    {
        // gets values from all inputs in form with a class of "formdata" and returns a JSON object
        var data = {}
        $('#'+formId+' .formdata').each(function() {
            var item = $(this);
            data[item.attr('name')] = item.val();
        });
        return JSON.stringify(data);
    };


    // submit the form
    hfs.submit(formId);
}