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
        if (val.nome == str) {
          $.each(val.cidade, function (key_city, val_city) {
            options_cidade += '<option value="' + val_city + '">' + val_city + '</option>';
          });
        }
      });
      $("#cidade").html(options_cidade);

    }).change();

  });

});

//Validar Senha
function validarSenha() {
  var senha = document.getElementById('senha').value;
  var confsenha = document.getElementById('confsenha').value;

  if (senha != "" && confsenha != "" && senha != confsenha) {
    alert('senhas diferentes');
  }
  if (senha == "" && confsenha == "") {
    alert('Digite uma senha');
    return false
  }
  if (senha < 6) {
    alert('A senha deve conter no mínimo 6 dígitos!');
  }
  else {
    return true
  }
}

//Cadastrar Usuário
$(document).on("click", "#btnSalvar", function () {

  var prop = document.getElementById('caminho').files[0];
  var nome_imagem = prop.name;
  var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();

  if (jQuery.inArray(extensao_imagem, ['png', 'jpg', 'jpeg']) == -1) {
    navigator.notification.alert("imagem invalida");
  } else {
    var form_data = new FormData();
    form_data.append("foto", prop);
    form_data.append("nome", $("#nome").val());
    form_data.append("cpf", $("#cpf").val());
    form_data.append("email", $("#email").val());
    form_data.append("celular", $("#celular").val());
    form_data.append("login", $("#login").val());
    form_data.append("senha", $("#senha").val());

    form_data.append("cep", $("#cep").val());
    form_data.append("estado", $("#estado").val());
    form_data.append("cidade", $("#cidade").val());
    form_data.append("bairro", $("#bairro").val());
    form_data.append("rua", $("#rua").val());
    form_data.append("numero", $("#numero").val());
    form_data.append("complemento", $("#complemento").val());

    $.ajax({
      url: "https://onservicos.000webhostapp.com/cadastraUsu.php", //para onde enviar
      method: 'POST',
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      success: function (data) {
        alert("Cadastro realizado com sucesso!");
        location.href = "index.html";
      },
      //se der errado
      error: function (data) {
        alert("Erro ao cadastrar");
      }
    });
  }
});

// $(document).on("click", "#mudarSenha", function () {

//     var form_data = new FormData();
//     form_data.append("senha", $("#senha").val());
//      form_data.append("novasenha", $("#novasenha").val());
//      form_data.append("confsenha", $("#confsenha").val());
//     $.ajax({
//       url: "https://onservicos.000webhostapp.com/cadastraUsu.php", //para onde enviar
//       method: 'POST',
//       data: form_data,
//       contentType: false,
//       cache: false,
//       processData: false,
//       success: function (data) {
//         alert("Cadastro realizado com sucesso!");
//         location.href = "index.html";
//       },
//       //se der errado
//       error: function (data) {
//         alert("Erro ao cadastrar");
//       }
//     });
//   });


//validar CPF
function VerificaCPF () {

		var inputCPF = document.getElementById('cpf');

		if (vercpf(inputCPF.value)) 
		{
			inputCPF.style.border = "2px #0e97a5 solid";
		}
		else 
		{
			errors="1";

			if (errors)
			{
        alert("CPF inválido");
				inputCPF.style.border = "2px red solid";	
			}
		}

	}

	function vercpf (cpf) {

		if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")

			return false;

			add = 0;

		for (i=0; i < 9; i ++)
		{

			add += parseInt(cpf.charAt(i)) * (10 - i);
			rev = 11 - (add % 11);
		}
		if (rev == 10 || rev == 11){
			rev = 0;
		}

		if (rev != parseInt(cpf.charAt(9)))
			return false;
			add = 0;

		for (i = 0; i < 10; i ++)
		{
			add += parseInt(cpf.charAt(i)) * (11 - i);
			rev = 11 - (add % 11);
		}
			if (rev == 10 || rev == 11)
				rev = 0;

			if (rev != parseInt(cpf.charAt(10)))
				return false;
				//alert('O CPF INFORMADO É VÁLIDO.');
				return true;
	}

//login usuario
$(document).on('click', '#btnEntrar', function () {
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
    success: function (data) {

      //codigo juliana 
      let acesso = data.usuario.nivel;
      var idUsuario = data.usuario.codigo;
      localStorage.setItem('cdUsuario', idUsuario);

      if (acesso == 1) {
        location.href = "home.html";
      }
      else {
        alert('Usuário');
      }
    },
    //se der errado
    error: function (data) {
      alert("Login ou senha invalidas!");
    }
  });
});

////listar perfil usuario
function preencherPerfil() {
  $.ajax({
    type: "post", //como enviar
    url: "https://onservicos.000webhostapp.com/listarperfil.php",//para onde enviar
    data: 'id=' + localStorage.getItem('cdUsuario'),
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
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
      $("#rua").val(data.perfil.rua);
      $("#numero").val(data.perfil.numero);
      $("#complemento").val(data.perfil.complemento);
      $("#foto").attr('src', 'https://onservicos.000webhostapp.com/'+data.perfil.foto);
      $("#img").attr('src', 'https://onservicos.000webhostapp.com/'+data.perfil.foto);
      $("#perfil").attr('src', 'https://onservicos.000webhostapp.com/'+data.perfil.foto);
    },
    //se der errado
    error: function (data) {
      alert('erro'); 
    }
  });
}

function desabilita() {
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
  $('#rua').prop('readonly', true);
  $('#numero').prop('readonly', true);
  $('#complemento').prop('readonly', true);
  $('#btnProximo').prop('readonly',true);
}

function habilita() {
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
  $('#rua').prop('readonly', false);
  $('#numero').prop('readonly', false);
  $('#complemento').prop('readonly', false);
  $('#btnProximo').prop('readonly',false);
}

//Salvar Alterações do perfil
$(document).on('click', '#salvarEdit', function () {
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
    type: "post", //como enviar
    url: "https://onservicos.000webhostapp.com/editarPerfilusuario.php", //para onde enviar
    data: parametros, //o que enviar
    //se der certo
    success: function (data) {
      alert("Perfil atualizado com sucesso!");
    },
    //se der errado
    error: function (data) {
      alert("Erro ao atualizar");
    }
  });
});
$(document).on('click', '#btnEditar', function () {
  habilita();
})

$(document).on('click', '#btnVoltar', function () {
  desabilita();
})


//INPUT DE PESQUISA
$(document).on('click', '#pesquisa', function () {
  var valorInput = document.getElementById('texto');
  if ((valorInput.value) == "Pedreiro" ||(valorInput.value) == "pedreiro" ) {
    location.href = "xPedreiro.html";
  }
  if ((valorInput.value) == "Pintor" || (valorInput.value) == "pintor"){
    location.href = "xPintor.html";
  }
  if ((valorInput.value) == "Encanador" || (valorInput.value) == "encanador") {
    location.href = "xEncanador.html";
  }
     if ((valorInput.value) == "jardineiro"|| (valorInput.value) == "Jardineiro"){
     location.href = "xJardineiro.html";
  }
     if ((valorInput.value) == "Piscineiro"||(valorInput.value) == "piscineiro"){
     location.href = "xPiscineiro.html";
  }
     if ((valorInput.value) == "marceneiro"||(valorInput.value) == "Marceneiro"){
     location.href = "xMarceneiro.html";
  }
     if ((valorInput.value) == "mecanico"||(valorInput.value) == "Mecanico" || (valorInput.value) =="Mecânico"|| (valorInput.value) =="mecânico"){
     location.href = "xMecanico.html";
  }
     if ((valorInput.value) == "Eletricista"||(valorInput.value) == "eletricista"){
     location.href = "xEletricista.html";
  }
     if ((valorInput.value) == "vidraceiro"||(valorInput.value) == "Vidraceiro"){
     location.href = "xVidraceiro.html";
  }
     if ((valorInput.value) == "Eletrodomésticos"|| (valorInput.value) == "eletrodomésticos"||(valorInput.value) == "técnico eletrodomésticos"||  (valorInput.value) == "Técnico eletrodomésticos" ||(valorInput.value) == "técnico de eletrodomésticos" ||(valorInput.value) == "Técnico de eletrodomésticos"){
     location.href = "xTecnico.html";
  }
     if ((valorInput.value) == "chaveiro"|| (valorInput.value) == "Chaveiro"){
     location.href = "xChaveiro.html";
  }
     if ((valorInput.value) == "Dedetizador"||(valorInput.value) == "dedetizador"){
     location.href = "xDedetizador.html";
  }

})

//Lista serviços
function listarPedreiro() {

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/servicos/pedreiro.php",//para onde enviar
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
      var itemlista = "";
      $.each(data.profissional, function (i, dados) {
        itemlista += '<div class="box"> <h1>Pontos: '+dados.ponto+' </h1><div class="row"> <div class="circle"> <img src="https://onservicos.000webhostapp.com/' + dados.foto + '"> </div> </div> <div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="' + dados.nome + '"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.servico + '"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.descricao + '"> </div> <div class="col-xs-12"> <labeL>Cidade:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.cidade + '"> </div> </div> <br> <div class="row"> <div class="col-xs-3"><img src="img/favoritar.png" onclick="Favoritar()" id="s1"></div> <div class="col-xs-3"> <img src="img/joiaa2.png" onclick="var codigo = '+dados.codigo+'; recomendar(codigo)" id="j1"> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br> <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <center> <div class="row"> <div class="col-xs-6"> <a href="https://wa.me/55' + dados.celular + '"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="tel:' + dados.celular + '"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </center> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div>';
      });

      $("#pedreiros").html(itemlista);

    },
    //se der errado
    error: function (data) {
      alert(data);
      //navigator.notification.alert(data);
    }
  });

}

//Lista serviços
function listarPintor() {

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/servicos/pintor.php",//para onde enviar
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
      var itemlista = "";
      $.each(data.profissional, function (i, dados) {
        itemlista +=   '<div class="box"> <div class="row"> <div class="circle"> <img src="https://onservicos.000webhostapp.com/' + dados.foto + '"> </div> </div> <div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="' + dados.nome + '"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.servico + '"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.descricao + '"> </div> <div class="col-xs-12"> <labeL>Cidade:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.cidade + '"> </div> </div> <br> <div class="row"> <div class="col-xs-3"><img src="img/favoritar.png" onclick="Favoritar()" id="s1"></div> <div class="col-xs-3"> <img src="img/joiaa2.png" onclick="recomendar()" id="j1"> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br> <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <center> <div class="row"> <div class="col-xs-6"> <a href="https://wa.me/5513996857881"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="tel:' + dados.celular + '"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </center> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div>';
      });

      $("#pintor").html(itemlista);

    },
    //se der errado
    error: function (data) {
      alert(data);
      //navigator.notification.alert(data);
    }
  });

}

//Lista serviços
function listarEncanador() {

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/servicos/encanador.php",//para onde enviar
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
      var itemlista = "";
      $.each(data.profissional, function (i, dados) {
        itemlista +=  '<div class="box"> <div class="row"> <div class="circle"> <img src="https://onservicos.000webhostapp.com/' + dados.foto + '"> </div> </div> <div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="' + dados.nome + '"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.servico + '"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.descricao + '"> </div> <div class="col-xs-12"> <labeL>Cidade:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.cidade + '"> </div> </div> <br> <div class="row"> <div class="col-xs-3"><img src="img/favoritar.png" onclick="Favoritar()" id="s1"></div> <div class="col-xs-3"> <img src="img/joiaa2.png" onclick="recomendar()" id="j1"> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br> <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <center> <div class="row"> <div class="col-xs-6"> <a href="https://wa.me/55' + dados.celular + '"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="tel:' + dados.celular + '"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </center> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div>';
      });

      $("#servicos").html(itemlista);

    },
    //se der errado
    error: function (data) {
      alert(data);
      //navigator.notification.alert(data);
    }
  });

}

//Lista serviços
function listarJardineiro() {

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/servicos/jardineiro.php",//para onde enviar
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
      var itemlista = "";
      $.each(data.profissional, function (i, dados) {
        itemlista +=  '<div class="box"> <div class="row"> <div class="circle"> <img src="https://onservicos.000webhostapp.com/' + dados.foto + '"> </div> </div> <div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="' + dados.nome + '"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.servico + '"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.descricao + '"> </div> <div class="col-xs-12"> <labeL>Cidade:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.cidade + '"> </div> </div> <br> <div class="row"> <div class="col-xs-3"><img src="img/favoritar.png" onclick="Favoritar()" id="s1"></div> <div class="col-xs-3"> <img src="img/joiaa2.png" onclick="recomendar()" id="j1"> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br> <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <center> <div class="row"> <div class="col-xs-6"> <a href="https://wa.me/55' + dados.celular + '"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="tel:' + dados.celular + '"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </center> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div>';
      });

      $("#servicos").html(itemlista);

    },
    //se der errado
    error: function (data) {
      alert(data);
      //navigator.notification.alert(data);
    }
  });

}

//Lista serviços
function listarPiscineiro() {

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/servicos/piscineiro.php",//para onde enviar
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
      var itemlista = "";
      $.each(data.profissional, function (i, dados) {
        itemlista += '<div class="box"> <div class="row"> <div class="circle"> <img src="https://onservicos.000webhostapp.com/' + dados.foto + '"> </div> </div> <div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="' + dados.nome + '"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.servico + '"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.descricao + '"> </div> <div class="col-xs-12"> <labeL>Cidade:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.cidade + '"> </div> </div> <br> <div class="row"> <div class="col-xs-3"><img src="img/favoritar.png" onclick="Favoritar()" id="s1"></div> <div class="col-xs-3"> <img src="img/joiaa2.png" onclick="recomendar()" id="j1"> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br> <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <center> <div class="row"> <div class="col-xs-6"> <a href="https://wa.me/55' + dados.celular + '"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="tel:' + dados.celular + '"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </center> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div>'
      });

      $("#servicos").html(itemlista);

    },
    //se der errado
    error: function (data) {
      alert(data);
      //navigator.notification.alert(data);
    }
  });

}


//Lista serviços
function listarMarceneiro() {

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/servicos/marceneiro.php",//para onde enviar
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
      var itemlista = "";
      $.each(data.profissional, function (i, dados) {
        itemlista +=  '<div class="box"> <div class="row"> <div class="circle"> <img src="https://onservicos.000webhostapp.com/' + dados.foto + '"> </div> </div> <div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="' + dados.nome + '"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.servico + '"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.descricao + '"> </div> <div class="col-xs-12"> <labeL>Cidade:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.cidade + '"> </div> </div> <br> <div class="row"> <div class="col-xs-3"><img src="img/favoritar.png" onclick="Favoritar()" id="s1"></div> <div class="col-xs-3"> <img src="img/joiaa2.png" onclick="recomendar()" id="j1"> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br> <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <center> <div class="row"> <div class="col-xs-6"> <a href="https://wa.me/55' + dados.celular + '"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="tel:' + dados.celular + '"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </center> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div>';
      });

      $("#servicos").html(itemlista);

    },
    //se der errado
    error: function (data) {
      alert(data);
      //navigator.notification.alert(data);
    }
  });

}

//Lista serviços
function listarMecanico() {

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/servicos/mecanico.php",//para onde enviar
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
      var itemlista = "";
      $.each(data.profissional, function (i, dados) {
        itemlista +=  '<div class="box"> <div class="row"> <div class="circle"> <img src="https://onservicos.000webhostapp.com/' + dados.foto + '"> </div> </div> <div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="' + dados.nome + '"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.servico + '"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.descricao + '"> </div> <div class="col-xs-12"> <labeL>Cidade:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.cidade + '"> </div> </div> <br> <div class="row"> <div class="col-xs-3"><img src="img/favoritar.png" onclick="Favoritar()" id="s1"></div> <div class="col-xs-3"> <img src="img/joiaa2.png" onclick="recomendar()" id="j1"> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br> <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <center> <div class="row"> <div class="col-xs-6"> <a href="https://wa.me/55' + dados.celular + '"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="tel:' + dados.celular + '"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </center> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div>';
      });

      $("#servicos").html(itemlista);

    },
    //se der errado
    error: function (data) {
      alert(data);
      //navigator.notification.alert(data);
    }
  });

}

//Lista serviços
function listarEletricista() {

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/servicos/eletricista.php",//para onde enviar
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
      var itemlista = "";
      $.each(data.profissional, function (i, dados) {
        itemlista +=  '<div class="box"> <div class="row"> <div class="circle"> <img src="https://onservicos.000webhostapp.com/' + dados.foto + '"> </div> </div> <div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="' + dados.nome + '"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.servico + '"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.descricao + '"> </div> <div class="col-xs-12"> <labeL>Cidade:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.cidade + '"> </div> </div> <br> <div class="row"> <div class="col-xs-3"><img src="img/favoritar.png" onclick="Favoritar()" id="s1"></div> <div class="col-xs-3"> <img src="img/joiaa2.png" onclick="recomendar()" id="j1"> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br> <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <center> <div class="row"> <div class="col-xs-6"> <a href="https://wa.me/55' + dados.celular + '"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="tel:' + dados.celular + '"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </center> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div>';
      });

      $("#servicos").html(itemlista);

    },
    //se der errado
    error: function (data) {
      alert(data);
      //navigator.notification.alert(data);
    }
  });

}

//Lista serviços
function listarVidraceiro() {

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/servicos/vidraceiro.php",//para onde enviar
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
      var itemlista = "";
      $.each(data.profissional, function (i, dados) {
        itemlista +=  '<div class="box"> <div class="row"> <div class="circle"> <img src="https://onservicos.000webhostapp.com/' + dados.foto + '"> </div> </div> <div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="' + dados.nome + '"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.servico + '"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.descricao + '"> </div> <div class="col-xs-12"> <labeL>Cidade:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.cidade + '"> </div> </div> <br> <div class="row"> <div class="col-xs-3"><img src="img/favoritar.png" onclick="Favoritar()" id="s1"></div> <div class="col-xs-3"> <img src="img/joiaa2.png" onclick="recomendar()" id="j1"> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br> <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <center> <div class="row"> <div class="col-xs-6"> <a href="https://wa.me/55' + dados.celular + '"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="tel:' + dados.celular + '"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </center> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div>';
      });

      $("#servicos").html(itemlista);

    },
    //se der errado
    error: function (data) {
      alert(data);
      //navigator.notification.alert(data);
    }
  });

}

//Lista serviços
function listarTecnico() {

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/servicos/eletrodomestico.php",//para onde enviar
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
      var itemlista = "";
      $.each(data.profissional, function (i, dados) {
        itemlista +=  '<div class="box"> <div class="row"><div class="circle"> <img src="https://onservicos.000webhostapp.com/' + dados.foto + '"> </div> </div> <div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="' + dados.nome + '"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.servico + '"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.descricao + '"> </div> <div class="col-xs-12"> <labeL>Cidade:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.cidade + '"> </div> </div> <br> <div class="row"> <div class="col-xs-3"><img src="img/favoritar.png" onclick="Favoritar()" id="s1"></div> <div class="col-xs-3"> <img src="img/joiaa2.png" onclick="recomendar()" id="j1"> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br> <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <center> <div class="row"> <div class="col-xs-6"> <a href="https://wa.me/55' + dados.celular + '"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="tel:' + dados.celular + '"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </center> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div>';
      });

      $("#servicos").html(itemlista);

    },
    //se der errado
    error: function (data) {
      alert(data);
      //navigator.notification.alert(data);
    }
  });

}

//Lista serviços
function listarChaveiro() {

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/servicos/chaveiro.php",//para onde enviar
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
      var itemlista = "";
      $.each(data.profissional, function (i, dados) {
        itemlista +=  '<div class="box"> <div class="row"> <div class="circle"> <img src="https://onservicos.000webhostapp.com/' + dados.foto + '"> </div> </div> <div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="' + dados.nome + '"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.servico + '"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.descricao + '"> </div> <div class="col-xs-12"> <labeL>Cidade:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.cidade + '"> </div> </div> <br> <div class="row"> <div class="col-xs-3"><img src="img/favoritar.png" onclick="Favoritar()" id="s1"></div> <div class="col-xs-3"> <img src="img/joiaa2.png" onclick="recomendar()" id="j1"> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br> <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <center> <div class="row"> <div class="col-xs-6"> <a href="https://wa.me/55' + dados.celular + '"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="tel:' + dados.celular + '"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </center> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div>';
      });

      $("#servicos").html(itemlista);

    },
    //se der errado
    error: function (data) {
      alert(data);
      //navigator.notification.alert(data);
    }
  });

}

//Lista serviços
function listarDedetizador() {

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/servicos/dedetizador.php",//para onde enviar
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
      var itemlista = "";
      $.each(data.profissional, function (i, dados) {
        itemlista +=  '<div class="box"> <div class="row"> <div class="circle"> <img src="https://onservicos.000webhostapp.com/' + dados.foto + '"> </div> </div> <div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="' + dados.nome + '"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.servico + '"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.descricao + '"> </div> <div class="col-xs-12"> <labeL>Cidade:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.cidade + '"> </div> </div> <br> <div class="row"> <div class="col-xs-3"><img src="img/favoritar.png" onclick="Favoritar()" id="s1"></div> <div class="col-xs-3"> <img src="img/joiaa2.png" onclick="recomendar()" id="j1"> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br> <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <center> <div class="row"> <div class="col-xs-6"> <a href="https://wa.me/55' + dados.celular + '"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="tel:' + dados.celular + '"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </center> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div>';
      });

      $("#servicos").html(itemlista);

    },
    //se der errado
    error: function (data) {
      alert(data);
      //navigator.notification.alert(data);
    }
  });

}

//Lista serviços
function listarFavoritos() {

  $.ajax({
    type: "POST", //como enviar
    url: "https://onservicos.000webhostapp.com/servicos/pedreiro.php",//para onde enviar
    dataType: 'json',//o que enviar
    //se der certo
    success: function (data) {
      var itemlista = "";
      $.each(data.profissional, function (i, dados) {
        itemlista +=  '<div class="box"> <div class="row"> <div class="circle"> <img src="https://onservicos.000webhostapp.com/' + dados.foto + '"> </div> </div> <div class="row"> <div class="col-xs-12"> <labeL>Profissional:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold;  background-color: #e7e9eb;" disabled value="' + dados.nome + '"> </div> <div class="col-xs-12"> <labeL>Serviços que realiza:</labeL> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5; font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.servico + '"> </div> <div class="col-xs-12"> <labeL>Descrição:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.descricao + '"> </div> <div class="col-xs-12"> <labeL>Cidade:</labeL> <br> <input type="text" style="border: none;border-bottom: solid 3px #0e97a5;  font-weight: bold; background-color: #e7e9eb;" disabled value="' + dados.cidade + '"> </div> </div> <br> <div class="row"> <div class="col-xs-3"><img src="img/favoritar.png" onclick="Favoritar()" id="s1"></div> <div class="col-xs-3"> <img src="img/joiaa2.png" onclick="recomendar()" id="j1"> </div> <div class="col-xs-6"> <button class="btn btn-danger btn-block" id="btnContatar" data-toggle="modal" data-target="#modalExemplo">Contatar</button> </div> </div> </div><br> <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <br><br><br><br><br><br><br><br><br> <div class="modal-dialog" role="document"> <div class="modal-content" id="modal"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Contatar Profissional</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body" id="modal-dentro"> <center> <div class="row"> <div class="col-xs-6"> <a href="https://wa.me/55' + dados.celular + '"><img src="img/WhatsApp-icone.png" id="imgModal" alt=""></a> </div> <div class="col-xs-6"><a href="tel:' + dados.celular + '"><img src="img/agenda.png" id="imgModal" alt=""></a></div> </div> </center> </div> <div class="modal-footer"> <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">Fechar</button> </div> </div> </div> </div>';
      });

      $("#favoritos").html(itemlista);

    },
    //se der errado
    error: function (data) {
      alert(data);
      //navigator.notification.alert(data);
    }
  });

}
// function Favoritar() {
//    $.ajax({
//     type: "post", //como enviar
//     url: "https://onservicos.000webhostapp.com/favoritar.php",//para onde enviar
//     "codigo": localStorage.getItem('codigo'),
//     "usuario":localStorage.getItem('cdUsuario'), 
//     dataType: 'json',//o que enviar
//     success: function(data){
//     alert("FUNFOU ESSE CARAIO!");
//       },
//     //se der errado
//     error: function (data) {
//       alert('erro');
//     }
//    })
// }

//Recomendar
function recomendar(id) {
  $.ajax({
    type: "post", //como enviar
    url: "https://onservicos.000webhostapp.com/recomendar.php",//para onde enviar
    // data: "codigo": id,
    //se der certo
    success: function (data) {
      alert(data);
    },
    //se der errado
    error: function (data) {
      alert(data);
    }
  });
}

//  var url = window.location;
//  url = url.toString()
//  url = url.split("xPedreiro.html");
//  url = url[0];

//  var j1 = document.getElementById("j1").src;
//  var recomenda = 0;

// if (recomenda == 0){ 
//  if (j1 == url + "img/joiaa2.png") {
//  document.getElementById("j1").src = "img/joiaa.png";
//  recomenda = 1;
//  } 
// }
// else (recomenda == 1)
//  if (j1 == url + "img/joiaa.png") {
//  document.getElementById("j1").src = "img/joiaa2.png";
//  recomenda = 0;
//  } 
// }

//BOTÕES COM REDIRECIONAMENTO
function home() {
  location.href = "home.html";
}

function perfil() {
  location.href = "perfil.html";
}

function pedreiro() {
  location.href = "xPedreiro.html";
}

function pintor() {
  location.href = "xPintor.html";
}

function encanador() {
  location.href = "xEncanador.html";
}

function jardineiro() {
  location.href = "xJardineiro.html";
}

function piscineiro() {
  location.href = "listaserv.html";
}

function mais() {
  location.href = "maisServicos.html";
}

function voltarHome() {
  location.href = "home.html";
}

function marceneiro() {
  location.href = "xMarceneiro.html";
}

function mecanico() {
  location.href = "xMecanico.html";
}

function eletricista() {
  location.href = "xEletricista.html";
}

function vidraceiro() {
  location.href = "xVidraceiro.html";
}

function tecnico() {
  location.href = "xTecnico.html";
}

function chaveiro() {
  location.href = "xChaveiro.html";
}

function dedetizador() {
  location.href = "xDedetizador.html";
}
function favoritos() {
  location.href = "favoritos.html";
}

// function pesquisa() {
//   if (pesquisa = value == "Pedreiro") {
//     location.href("xPedreiro.html")
//   }
// }