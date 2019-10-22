// This is a JavaScript file
// Cadastrar

 var nome = "";
 var email = "";
 var cpf = "";
 var celular = "";
 var login = "";
 var senha = "";

$(document).on('click','#btnProximo', function(){
  var parametros = {
      "nome": $("#nome").val(),
      "cpf": $("#cpf").val(),
      "email": $("#email").val(),
      "celular": $("#celular").val(),
      "login": $("#login").val(),
      "senha": $("#senha").val(),
      // "cep": $("#cep").val(),
      // "estado": $("#estado").val(),
      // "cidade": $("#cidade").val(),
      // "bairro": $("#bairro").val(),
      // "rua": $("#rua").val(),
      // "numero": $("#numero").val(),
      // "complemento": $("#complemento").val()
    };
    $.ajax({
      type:"post", //como enviar
      url:"https://onservicos.000webhostapp.com/cadastra.php", //para onde enviar
      data:parametros, //o que enviar
      //se der certo
      success: function(data){
         alert("FUNFOUUUUUU!!!!!!!!");
      },
      //se der errado
      error: function(data){
        alert("deu erro");
      }
    });
});

$(document).on('click','#btnEntrar', function(){
  var parametros = {
      "login": $("#login").val(),
      "senha": $("#senha").val(),
    };
    $.ajax({
      type:"post", //como enviar
      url:"https://onservicos.000webhostapp.com/login.php", //para onde enviar
      data:parametros, //o que enviar
      //se der certo
      success: function(data){
        location.href="home.html";
      },
      //se der errado
      error: function(data){
        navigator.notification.alert("Usuário ou Senha inválidos!");
      }
    });
});
