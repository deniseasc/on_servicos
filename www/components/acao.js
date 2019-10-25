// This is a JavaScript file
// Cadastrar usuário
$(document).on('click','#btnSalvar', function(){
  var parametros = {
      "nome": $("#nome").val(),
      "cpf": $("#cpf").val(),
      "email": $("#email").val(),
      "celular": $("#celular").val(),
      "login": $("#login").val(),
      "senha": $("#senha").val(),

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
      url:"https://onservicos.000webhostapp.com/cadastra.php", //para onde enviar
      data:parametros, //o que enviar
      //se der certo
      success: function(data){
         alert("Cadastro realizado com sucesso!");
         location.href="index.html";
      },
      //se der errado
      error: function(data){
        alert("Erro ao cadastrar");
      }
    });
});

//login usuario
$(document).on('click','#btnEntrar', function(){
  var parametros = {
    "login": $("#login").val(),
    "senha": $("#senha").val(),
  };

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/loginUsu.php", //para onde enviar
    data: parametros, //o que enviar
    dataType: 'json',
    //se der certo
    success: function(data)
    {
      let acesso = data.usuario.nivel;

      if (acesso == 1){
        location.href="home.html";
      }else{
        alert('Usuário');
      }
    },
    //se der errado
    error: function(data)
    {
      alert("Login ou senha invalidas!");
    }
  });
});