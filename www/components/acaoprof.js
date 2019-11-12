// This is a JavaScript file
//Select ESTADOS/CIDADES
$(document).ready(function () {
			$.getJSON('estados_cidades.json', function (data) {
				var items = [];
				var options = '<option value="">Escolha...</option>';	
				$.each(data, function (key, val) {
					options += '<option value="' + val.nome + '">' + val.nome + '</option>';
				});					
				$("#estado").html(options);				
				
				$("#estado").change(function () {				
				
					var options_cidade = '';
					var str = "";					
					
					$("#estado option:selected").each(function () {
						str += $(this).text();
					});
					
					$.each(data, function (key, val) {
						if(val.nome == str) {							
							$.each(val.cidade, function (key_city, val_city) {
								options_cidade += '<option value="' + val_city + '">' + val_city + '</option>';
							});							
						}
					});
					$("#cidade").html(options_cidade);
					
				}).change();		
			
			});
		
		});

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

//Salvar Alterações do perfil
$(document).on('click','#btnSalvar', function(){
  var parametros = {
      "codigo": localStorage.getItem('cdProf'),
      "nome": $("#nome").val(),
      "cpf": $("#cpf").val(),
      "email": $("#email").val(),
      "celular": $("#celular").val(),
      "login": $("#login").val(),

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
      url:"https://onservicos.000webhostapp.com/atualizarperfilprofissional.php", //para onde enviar
      data:parametros, //o que enviar
      //se der certo
      success: function(data){
         alert("Perfil atualizado com sucesso!");
      },
      //se der errado
      error: function(data){
        alert("Erro ao atualizar");
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
      // data: localStorage.setItem('cdProf'),
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

//Perfil
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

//Serviço Cadastrado
function listarServico(){

   $.ajax({
        type:"POST", //como enviar
        url:"https://onservicos.000webhostapp.com/exibeServ.php",//para onde enviar
        data:'codigo='+localStorage.getItem('cdProf'),
        dataType:'json',//o que enviar
        //se der certo
        success: function(data)
        {
          var itemlista = "";

          $.each(data.profissional,function(i,dados){
            itemlista += '<div class="box"> <div class="row"> <div class="col-xs-12"> <labeL>Profissão:</labeL> <input type="text" id="profissao" value="'+dados.profissao+'" readonly> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" id="servico" value="'+dados.servico+'" readonly> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL><br> <input type="text" id="descricao" value="'+dados.descricao+'" readonly> </div> <div class="col-xs-12"> <labeL>Dias em que trabalha:</labeL> </div> </div><br><div class="row"> <div class="col-xs-6"> <button class="btn btn-info btn-block" id="editarServ">Editar</button> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnExcluir" onclick="var codigo = '+dados.codigo+'; deletarServico(codigo); ">Excluir</button> </div> </div> </div><br>';
          });
          //  <div class="row"> <div class="col-xs-1"> <input type="checkbox" id="seg" value="Segunda">S </div> <div class="col-xs-1"> <input type="checkbox" id="ter" value="Terça">T </div> <div class="col-xs-1"> <input type="checkbox" id="qua" value="Quarta">Q </div> <div class="col-xs-1"> <input type="checkbox" id="qui" value="Quinta">Q </div> <div class="col-xs-1"> <input type="checkbox" id="sex" value="Sexta">S </div> <div class="col-xs-1"> <input type="checkbox" id="sab" value="Sábado">S </div> <div class="col-xs-1"> <input type="checkbox" id="dom" value="Domingo">D </div> </div> 
          $("#lista").html(itemlista);

        },
        //se der errado
        error: function(data)
        {
          alert(data);
          //navigator.notification.alert(data);
        }
    });  
      
}



// function salvarContato(botao) {
//   var parametros = {
//       "codigo": localStorage.getItem('cdProf'),
//       "nome": $("#nome").val(),
//       "cpf": $("#cpf").val(),

//     };
//     $.ajax({
//       type:"post", //como enviar
//       url:"https://onservicos.000webhostapp.com/atualizarperfilprofissional.php", //para onde enviar
//       data:parametros, //o que enviar
//       //se der certo
//       success: function(data){
//          alert("Perfil atualizado com sucesso!");
//       },
//       //se der errado
//       error: function(data){
//         alert("Erro ao atualizar");
//       }
//     });
    
//   botao.setAttribute("onclick","vincularContato(this);");
// }



// function verifica(str){

//   if(str.match(/Segunda/))
//   { 
//     console.log('checked'); 
//   }

// }

function deletarServico(codigo){
  confirm("Deseja excluir?");
  if(confirm){
    $.ajax({
        type:"POST", //como enviar
        url:"https://onservicos.000webhostapp.com/excluirServico.php",//para onde enviar
        data:'id='+codigo,
        //se der certo
        success: function(data)
        {
          location.reload();
        },
        //se der errado
        error: function(data)
        {
          alert(data);
          //navigator.notification.alert(data);
        }
    }); 
  }
}

//Salvar Alterações do perfil
$(document).on('click','#btnSalvar', function(){
  var parametros = {
      "codigo": localStorage.getItem('cdProf'),
      "profissao": $("#profissao").val(),
      "servico": $("#servico").val(),
      "descricao": $("#descricao").val(),
    };
    $.ajax({
      type:"post", //como enviar
      url:"https://https://onservicos.000webhostapp.com/editarServico.php", //para onde enviar
      data:parametros, //o que enviar
      //se der certo
      success: function(data){
         alert("Perfil atualizado com sucesso!");
      },
      //se der errado
      error: function(data){
        alert("Erro ao atualizar");
      }
    });
});

$(document).on('click','#editarServ',function(){
  habilitaServ();
});

$(document).on('click','#btnEditar',function(){
  habilita();
})

$(document).on('click','#btnVoltar',function(){
  desabilita();
})

function desabilita(){
  $('#nome').prop('readonly', true);
  $('#cpf').prop('readonly', true);
  $('#celular').prop('readonly', true);
  $('#email').prop('readonly', true);
  $('#login').prop('readonly', true);
  $('#senha').prop('readonly', true);
  $('#cep').prop('readonly', true);
  $('#estado').prop('readonly', true);
  $('#cidade').prop('readonly', true);
  $('#bairro').prop('readonly', true);
  $('#endereco').prop('readonly', true);
  $('#numero').prop('readonly', true);
  $('#complemento').prop('readonly', true);
  $('#profissao').prop('readonly', true);
  $('#servico').prop('readonly', true);
  $('#descricao').prop('readonly', true);
}

function habilita(){
  $('#nome').prop('readonly', false);
  $('#cpf').prop('readonly', false);
  $('#celular').prop('readonly', false);
  $('#email').prop('readonly', false);
  $('#login').prop('readonly', false);
  $('#senha').prop('readonly', false);
  $('#cep').prop('readonly', false);
  $('#estado').prop('readonly', false);
  $('#cidade').prop('readonly', false);
  $('#bairro').prop('readonly', false);
  $('#endereco').prop('readonly', false);
  $('#numero').prop('readonly', false);
  $('#complemento').prop('readonly', false);
}
 function habilitaServ(){
  $('#profissao').prop('readonly', false);
  $('#servico').prop('readonly', false);
  $('#descricao').prop('readonly', false);
 }
  function desabilitaServ(){
  $('#profissao').prop('readonly', true);
  $('#servico').prop('readonly', true);
  $('#descricao').prop('readonly', true);
 }

//navegação páginas
function homeProf(){
  location.href = "homeProf.html";
}
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
function addServico(){
  location.href = "addServico.html";
}