'use strict';

class customLogin {
  constructor() {
    this._changeDefaultErrorMessage();

    this._initLogin();
  }

  _initLogin() {
    jQuery('form#custom-login, form#custom-register').on('submit', function (e) {
      if (!jQuery(this).valid()) return false;
      jQuery('p.status', this).show().text(diza_ajax_auth_object.loadingmessage);
      var action = 'ajaxlogin';
      var username = jQuery('form#custom-login #cus-username').val();
      var password = jQuery('form#custom-login #cus-password').val();
      var rememberme = jQuery('#cus-rememberme').is(':checked') ? true : false;
      var email = '';
      var security = diza_ajax_auth_object.login_nonce;

      if (jQuery(this).attr('id') == 'custom-register') {
        action = 'ajaxregister';
        username = jQuery('#signonname').val();
        password = jQuery('#signonpassword').val();
        email = jQuery('#signonemail').val();
        security = diza_ajax_auth_object.register_nonce;
      }

      var self = jQuery(this);
      jQuery.ajax({
        type: 'POST',
        dataType: 'json',
        url: diza_ajax_auth_object.ajaxurl,
        data: {
          'action': action,
          'username': username,
          'password': password,
          'email': email,
          'rememberme': rememberme,
          'security': security
        },
        success: function (data) {
          jQuery('p.status', self).text(data.message);

          if (data.loggedin == true) {
            jQuery('p.status', self).addClass('successful');
            document.location.reload();
          } else {
            jQuery('p.status', self).addClass('wrong');
          }
        }
      });
      e.preventDefault();
    });
    if (jQuery("#custom-register").length) jQuery("#custom-register").validate({
      rules: {
        password2: {
          equalTo: '#signonpassword'
        }
      }
    });else if (jQuery("#custom-login").length) jQuery("#custom-login").validate();
  }

  _changeDefaultErrorMessage() {
    jQuery.extend(jQuery.validator.messages, {
      required: diza_ajax_auth_object.validate.required,
      remote: diza_ajax_auth_object.validate.remote,
      email: diza_ajax_auth_object.validate.email,
      url: diza_ajax_auth_object.validate.url,
      date: diza_ajax_auth_object.validate.date,
      dateISO: diza_ajax_auth_object.validate.dateISO,
      number: diza_ajax_auth_object.validate.number,
      digits: diza_ajax_auth_object.validate.digits,
      creditcard: diza_ajax_auth_object.validate.creditcard,
      equalTo: diza_ajax_auth_object.validate.equalTo,
      accept: diza_ajax_auth_object.validate.accept,
      maxlength: jQuery.validator.format(diza_ajax_auth_object.validate.maxlength),
      minlength: jQuery.validator.format(diza_ajax_auth_object.validate.minlength),
      rangelength: jQuery.validator.format(diza_ajax_auth_object.validate.rangelength),
      range: jQuery.validator.format(diza_ajax_auth_object.validate.range),
      max: jQuery.validator.format(diza_ajax_auth_object.validate.max),
      min: jQuery.validator.format(diza_ajax_auth_object.validate.min)
    });
  }

}

jQuery(document).ready(function ($) {
  new customLogin();
});
