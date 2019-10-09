// This is a JavaScript file

// Cadastrar
$(document).on("click","#cadastraDados",function(){
    var parametros = {
      "nome": $("#nome").val(),
      "email": $("#email").val(),
      "celular": $("#celular").val(),
      "login": $("#login").val(),
      "senha": $("#senha").val()
    };
    $.ajax({
      type:"post", //como enviar
      url:"https://ju3ds2.000webhostapp.com/onserv/cadastra.php", //para onde enviar
      data:parametros, //o que enviar
      //se der certo
      success: function(data){
        navigator.notification.alert(data);
        $("#nome").val("");
        $("#email").val("");
        $("#celular").val("");
        $("#login").val("");
        $("#senha").val("");
      },
      //se der errado
      error: function(data){
        navigator.notification.alert(data);
      }
    });
});
// // Cadastrar



//endereco

$(document).on("click","#cadastraEnd",function(){
    var parametros = {
      "cep": $("#cep").val(),
      "estado": $("#estado").val(),
      "cidade": $("#cidade").val(),
      "bairro": $("#bairro").val(),
      "logradouro": $("#logradouro").val(),
      "numero": $("#numero").val(),
      "complemento": $("#complemento").val(),
    };

    $.ajax({
      type:"post", //como enviar
      url:"https://bd-barcode-soaresmju.c9users.io/cadastra.php", //para onde enviar
      data:parametros, //o que enviar
      //se der certo
      success: function(data){
        navigator.notification.alert(data);
        $("#cep").val("");
        $("#estado").val("");
        $("#cidade").val("");
        $("#bairro").val("");
        $("#logradouro").val("");
        $("#numero").val("");
        $("#complemento").val("");
      },
      //se der errado
      error: function(data){
        navigator.notification.alert(data);
      }
    });
});

//endereco


//servico

$(document).on("click","#cadastraServ",function(){
    var parametros = {
      "servico": $("#servico").val(),
      "detalhes": $("#comentario").val(),
      "dias": $("#semana").val(),
    };
    

    $.ajax({
      type:"post", //como enviar
      url:"https://bd-barcode-soaresmju.c9users.io/cadastra.php", //para onde enviar
      data:parametros, //o que enviar
      //se der certo
      success: function(data){
        navigator.notification.alert(data);
        $("#servico").val("");
        $("#detalhes").val("");
        $("#dias").val("");
      },
      //se der errado
      error: function(data){
        navigator.notification.alert(data);
      }
    });
});
//servico








