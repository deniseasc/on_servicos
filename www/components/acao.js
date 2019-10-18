// This is a JavaScript file
// Cadastrar

 var nome = "";
 var email = "";
 var cpf = "";
 var celular = "";
 var login = "";
 var senha = "";

$(document).on('click','#btnSalvar', function(){
  alert(nome);
  var parametros = {
      "cep": $("#cep").val(),
      "estado": $("#estado").val(),
      "cidade": $("#cidade").val(),
      "bairro": $("#bairro").val(),
      "rua": $("#rua").val(),
      "numero": $("#numero").val(),
      "complemento": $("#complemento").val()
    };
    $.ajax({
      type:"post", //como enviar
      url:"https://ju3ds2.000webhostapp.com/cadastra.php", //para onde enviar
      data:parametros, //o que enviar
      //se der certo
      success: function(data){
         $("#cep").val("");
         $("#estado").val("");
         $("#cidade").val("");
         $("#bairro").val("");
         $("#rua").val("");
         $("#numero").val("");
         $("#complemento").val("");
      },
      //se der errado
      error: function(data){
        navigator.notification.alert("deu erro");
      }
    });
});
