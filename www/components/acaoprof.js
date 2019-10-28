// This is a JavaScript file

//dados pessoais do profissional
$(document).on('click','#btnSalvar2', function(){
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
      url:"https://onservicos.000webhostapp.com/cadastraProf.php", //para onde enviar
      data:parametros, //o que enviar
      //se der certo
      success: function(data){
         alert("Cadastro realizado com sucesso!");
         location.href="loginProfissional.html";
      },
      //se der errado
      error: function(data){
        alert("erro ao cadastrar");
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
    url: "https://onservicos.000webhostapp.com/loginProf.php", //para onde enviar
    data: parametros, //o que enviar
    dataType: 'json',
    //se der certo
    success: function(data)
    {
      let acesso = data.profissional.nivel;

      if (acesso == 2){
        location.href="homeProf.html";
      }else{
        alert('Profissional');
      }
    },
    //se der errado
    error: function(data)
    {
      alert("Login ou senha inválidas!");
    }
  });
});

function pedreiro(){
  location.href = "listaserv.html";
}
