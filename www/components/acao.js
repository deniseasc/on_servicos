// This is a JavaScript file

// $(document).ready(function(){

//   if(localStorage.getItem('codProf') != ''){
//     location.href="homeProf.html";
//   }

// })

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

      //codigo juliana 
      let acesso = data.usuario.nivel;
      var idUsuario = data.usuario.codigo;
      localStorage.setItem('cdUsuario', idUsuario);
      // var oi = '<div class="box"><!-- Box 2--><div class="row"><div class="col-xs-12"><labeL>Serviços que realiza:</labeL><input type="text" disabled placeholder="Reformas em geral"></div><div class="col-xs-12"><labeL>Descrição:</labeL><br><input type="text" disabled placeholder="Trabalho até as 17h"></div><div class="col-xs-12"><labeL>Dias em que trabalha:</labeL><input type="text" disabled placeholder="Todos os dias"></div></div><br><div class="row"><div class="col-xs-6"><button class="btn btn-info btn-block" id="editar">Editar</button></div>';
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
////CODIGO JULIANA
function preencherPerfil(){
  $.ajax({
      type:"post", //como enviar
      url:"https://onservicos.000webhostapp.com/listarperfil.php",//para onde enviar
      data:'id='+localStorage.getItem('cdUsuario'),
      dataType:'json',//o que enviar
      //se der certo
      success: function(data){
          $("#nome").val(data.perfil.nome);
          $("#cpf").val(data.perfil.cpf);
          $("#celular").val(data.perfil.celular);
          $("#email").val(data.perfil.email);
          $("#login").val(data.perfil.login);
          $("#senha").val(data.perfil.senha);
          $("#cep").val(data.perfil.cep);
          $("#estado").val(data.perfil.estado);
          $("#cidade").val(data.perfil.cidade);
          $("#bairro").val(data.perfil.bairro);
          $("#endereco").val(data.perfil.endereco);
          $("#numero").val(data.perfil.numero);
          $("#complemento").val(data.perfil.complemento);
      },
      //se der errado
      error: function(data){
          alert('erro');
      }
  });
}
//BOTÕES COM REDIRECIONAMENTO
function home(){
  location.href = "home.html";
}

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