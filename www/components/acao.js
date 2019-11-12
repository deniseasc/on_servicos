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
////listar perfil usuario
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
          $("#foto").attr('src',data.perfil.foto);
      },
      //se der errado
      error: function(data){
          alert('erro');
      }
  });
}

//Lista serviços
function listarServico(){

   $.ajax({
        type:"POST", //como enviar
        url:"https://onservicos.000webhostapp.com/listaServico.php",//para onde enviar
        dataType:'json',//o que enviar
        //se der certo
        success: function(data)
        {
          var itemlista = "";
          $.each(data.profissional,function(i,dados){
            itemlista += '<div class="box"> <div class="row"><div class="circle" value="'+dados.foto+'"> </div></div><div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="'+dados.nome+'"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text"style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="'+dados.servico+'"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="'+dados.descricao+'"> </div> </div> <br> <div class="row"> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br>  <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal" > <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <div class="row"> <div class="col-xs-6"> <a href="tel:'+dados.celular+'"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="https://wa.me/5513996857881?text=sua%20mensagem"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div> </center>';
          });

          $("#servicos").html(itemlista);

        },
        //se der errado
        error: function(data)
        {
          alert(data);
          //navigator.notification.alert(data);
        }
    });  
      
}

//Salvar Alterações do perfil
$(document).on('click','#salvarEdit', function(){
  var parametros = {
      "codigo": localStorage.getItem('cdUsuario'),
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
      url:"https://onservicos.000webhostapp.com/editarPerfilusuario.php", //para onde enviar
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