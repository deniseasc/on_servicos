// This is a JavaScript file

//dados pessoais do profissional
 
function validacaoProfissional(){
  var cadastroProfissional = document.forms["cadastroprof"]
  var senha = cadastroProfissional.senha.value;
  var confirmarsenha = cadastroProfissional.confirmarsenha.value;

    if (cadastroProfissional.nome.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (cadastroProfissional.cpf.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (cadastroProfissional.email.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (cadastroProfissional.celular.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (cadastroProfissional.login.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (cadastroProfissional.senha.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (cadastroProfissional.senha.value.length < 6) {
  alert("A senha deve conter no minímo 6 digitos!");
  return false;
  }
   if(senha != confirmarsenha) {
        alert("Senhas diferentes!");
  return false; 
   }
}
// fim dos dados pessoais do profissional//

//endereco profissional
  function validacaoenderecoprof(){
  var enderecoprof = document.forms["enderecoprof"]
    if (enderecoprof.cep.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (enderecoprof.estado.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (enderecoprof.cidade.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (enderecoprof.bairro.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (enderecoprof.endereco.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (enderecoprof.numerocasa.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
  }
//endereco profissional//
//cadastro de serviços

function validacaoservico(){
  var validacaoservico = document.forms["cadastroservico"]
  if(cadastroservico.servico.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (cadastroservico.comentario.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (cadastroservico.profissao.value == "text"){
  alert("Preencha todos os campos!");
  return false;
  }else{    
    alert("Cadastro realizado!");
    return true;
  }
}
