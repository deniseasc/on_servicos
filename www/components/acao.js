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
      url:"https://onservicos.000webhostapp.com/cadastraUsu.php", //para onde enviar
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
        }
        else
        {
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



$(document).on("change","#listaperfil",function(){
  var parametro ={
    "codigo":$("option:codigo",("#listaperfil")).val()
  }
  $.ajax({
      type:"post", //como enviar
      url:"https://onservicos.000webhostapp.com/listarperfil.php",//para onde enviar
      data:parametro,
      dataType:'json',//o que enviar
      //se der certo
      success: function(data){
          $("#nome").val(data.usuario.nome);
          $("#email").val(data.usuario.email);
          $("#senha").val(data.usuario.senha);
          $("#celular").val(data.usuario.celular);
      },
      //se der errado
      error: function(data){
          navigator.notification.alert(data);
      }
  });
});


//////////////BOTÕES COM REDIRECIONAMENTO
function perfil(){
  location.href = "perfil.html";
}

function pedreiro(){
  location.href = "listaserv.html";
}

function pintor(){
  location.href = "listaserv.html";
}

function encanador(){
  location.href = "listaserv.html";
}

function jardineiro(){
  location.href = "listaserv.html";
}

function piscineiro(){
  location.href = "listaserv.html";
}

function mais(){
  location.href = "maisServicos.html";
}

function voltarHome(){
  location.href = "home.html";
}

function marceneiro(){
  location.href = "listaserv.html";
}

function mecanico(){
  location.href = "listaserv.html";
}

function eletricista(){
  location.href = "listaserv.html";
}

function vidraceiro(){
  location.href = "listaserv.html";
}

function tecnico(){
  location.href = "listaserv.html";
}

function chaveiro(){
  location.href = "listaserv.html";
}

function dedetizador(){
  location.href = "listaserv.html";
}