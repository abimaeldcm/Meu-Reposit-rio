/**
 * Formulário de Contato - Validação e Envio
 * Versão melhorada com mensagens em português e melhor UX
 */
jQuery(document).ready(function($) {
  "use strict";

  // Regex para validação de email
  var emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

  // Função para mostrar mensagens de erro
  function showError(element, message) {
    var validationDiv = element.next('.validation');
    validationDiv.html(message).show('blind');
    element.addClass('is-invalid');
  }

  // Função para limpar erros
  function clearError(element) {
    var validationDiv = element.next('.validation');
    validationDiv.html('').hide();
    element.removeClass('is-invalid');
  }

  // Validação de formulário
  $('form.contactForm').submit(function(e) {
    e.preventDefault();
    
    var form = $(this);
    var f = form.find('.form-group');
    var ferror = false;
    
    // Limpar erros anteriores
    form.find('.validation').html('').hide();
    form.find('.is-invalid').removeClass('is-invalid');
    $('#sendmessage').removeClass('show');
    $('#errormessage').removeClass('show');

    // Validar inputs
    f.children('input, textarea').each(function() {
      var input = $(this);
      var rule = input.attr('data-rule');
      var msg = input.attr('data-msg');
      var ierror = false;

      if (rule !== undefined) {
        var pos = rule.indexOf(':');
        var exp = pos >= 0 ? rule.substr(pos + 1, rule.length) : '';
        rule = pos >= 0 ? rule.substr(0, pos) : rule;

        switch (rule) {
          case 'required':
            if (input.val().trim() === '') {
              ierror = true;
              showError(input, msg || 'Este campo é obrigatório');
            } else {
              clearError(input);
            }
            break;

          case 'minlen':
            if (input.val().length < parseInt(exp)) {
              ierror = true;
              showError(input, msg || 'Por favor, insira pelo menos ' + exp + ' caracteres');
            } else {
              clearError(input);
            }
            break;

          case 'email':
            if (!emailExp.test(input.val())) {
              ierror = true;
              showError(input, msg || 'Por favor, insira um e-mail válido');
            } else {
              clearError(input);
            }
            break;

          case 'checked':
            if (!input.is(':checked')) {
              ierror = true;
              showError(input, msg || 'Por favor, marque esta opção');
            } else {
              clearError(input);
            }
            break;

          case 'regexp':
            var regex = new RegExp(exp);
            if (!regex.test(input.val())) {
              ierror = true;
              showError(input, msg || 'Formato inválido');
            } else {
              clearError(input);
            }
            break;
        }

        if (ierror) {
          ferror = true;
        }
      }
    });

    // Se houver erros, não enviar
    if (ferror) {
      $('#errormessage').html('Por favor, corrija os erros no formulário.').addClass('show');
      return false;
    }

    // Preparar dados para envio
    var formData = form.serialize();
    var action = form.attr('action') || 'contactform/contactform.php';

    // Desabilitar botão de envio
    var submitBtn = form.find('button[type="submit"]');
    var originalText = submitBtn.html();
    submitBtn.prop('disabled', true).html('Enviando...');

    // Enviar via AJAX
    $.ajax({
      type: "POST",
      url: action,
      data: formData,
      success: function(msg) {
        submitBtn.prop('disabled', false).html(originalText);
        
        if (msg.trim() === 'OK' || msg.toLowerCase().includes('sucesso')) {
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          form[0].reset();
          form.find('.validation').html('').hide();
          form.find('.is-invalid').removeClass('is-invalid');
          
          // Scroll para mensagem de sucesso
          $('html, body').animate({
            scrollTop: $("#sendmessage").offset().top - 100
          }, 500);
        } else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").html(msg || 'Ocorreu um erro ao enviar a mensagem. Tente novamente.').addClass("show");
        }
      },
      error: function() {
        submitBtn.prop('disabled', false).html(originalText);
        $("#sendmessage").removeClass("show");
        $("#errormessage").html('Erro de conexão. Por favor, tente novamente mais tarde.').addClass("show");
      }
    });

    return false;
  });

  // Limpar erros ao digitar
  $('form.contactForm input, form.contactForm textarea').on('input', function() {
    var input = $(this);
    if (input.hasClass('is-invalid')) {
      clearError(input);
      $('#errormessage').removeClass('show');
    }
  });
});
