// This is a JavaScript file

//Cadastro Profissional
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
        alert("Erro ao cadastrar");
      }
    });
});

//Login Profissional
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
      let codigo = data.profissional.codigo;
      localStorage.setItem('cdProf', codigo);


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

//Cadastro Serviço
$(document).on('click','#btnFinalizar', function(){

  var dias = "";
  if( $('#seg').is(':checked')){
    dias += " "+$('#seg:checked').val();
  }
  if( $('#ter').is(':checked')){
    dias += " "+$('#ter:checked').val();
  }
  if( $('#qua').is(':checked')){
    dias += " "+$('#qua:checked').val();
  }
  if( $('#qui').is(':checked')){
    dias += " "+$('#qui:checked').val();
  }
  if( $('#sex').is(':checked')){
    dias += " "+$('#sex:checked').val();
  }
  if( $('#sab').is(':checked')){
    dias += " "+$('#sab:checked').val();
  }
  if( $('#dom').is(':checked')){
    dias += " "+$('#dom:checked').val();
  }

  alert(dias);

  var parametros = {
      "profissao": $("option:selected", ("#profissao")).val(),
      "especialidade": $("#especialidade").val(),
      "descricao": $("#descricao").val(),
      "dias": dias,
      "codigo": localStorage.getItem('cdProf')

    };
    $.ajax({
      type:"post", //como enviar
      url:"https://onservicos.000webhostapp.com/cadastraServ.php", //para onde enviar
      data:parametros, //o que enviar
      //se der certo
      success: function(data){
         alert("Cadastro realizado com sucesso!");
         location.href="homeProf.html";
      },
      //se der errado
      error: function(data){
        alert("Erro ao cadastrar");
      }
    });
});

function preencherPerfil(){
  $.ajax({
      type:"post", //como enviar
      url:"https://onservicos.000webhostapp.com/perfilProf.php",//para onde enviar
      data:'id='+localStorage.getItem('cdProf'),
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


// function listarServico(){
//    $.ajax({
//         type:"post", //como enviar
//         url:"https://onservicos.000webhostapp.com/exibeServ.php",//para onde enviar
//         dataType:"json",
//         //se der certo
//         success: function(data){
//             var itemlista = "";
            // $.each(data.profissao,function(i,dados){
            //   itemlista += '<div class="box"><!-- Box 2--><div class="row"><div class="col-xs-12"><labeL>Serviços que realiza:</labeL><input type="text" disabled value="'+data.profissao.servico+'" placeholder="Reformas em geral"></div><div class="col-xs-12"><labeL>Descrição:</labeL><br><input type="text" disabled value="'+data.profissao.descricao+'" placeholder="Trabalho até as 17h"></div><div class="col-xs-12"><labeL>Dias em que trabalha:</labeL><input type="text" disabled value="'+data.profissao.dias+'" placeholder="Todos os dias"></div></div><br><div class="row"><div class="col-xs-6"><button class="btn btn-info btn-block" id="editar">Editar</button></div>'; 
            // });
        //$("#lista").html(itemlista);
//         },
//         //se der errado
//         error: function(data){
//              navigator.notification.alert(data);
//         }
//     });    
// }

function perfil(){
  location.href = "perfilProf.html";
}

function pedreiro(){
  location.href = "listaserv.html";
}
function voltar(){
  location.href = "homeProf.html";
}
function cadastraServico(){
  location.href = "addServico.html";
}