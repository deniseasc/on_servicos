//validação de login
function validacaoLogin(){
  var formulariologin = document.forms["formlogin"]
  if (formulariologin.nome.value == ""){
  alert("Digie seu nome de Usuário");
  return false;
  }

  if (formulariologin.senha.value == ""){
  alert("Digite sua Senha");
  return false;
  }

}
 //fim de validação de login//


 //validação do usuário//
 
 //dados pessoais usuario
function validacaoUsuario(){
  var cadastrousuario = document.forms["cadastrousu"]
  if (cadastrousuario.nome.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
  if (cadastrousuario.email.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
  if (cadastrousuario.celular.value.length < 11){
  alert("Digite um Celular válido!");
  return false;
  }
  if (cadastrousuario.login.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
  if (cadastrousuario.senha.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
  if (cadastrousuario.senha.value.length < 6) {
  alert("A senha deve conter no minímo 6 digitos!");
  document.formulario.senha.focus();
  return false;
  }

 

}
//dados pessoais usuario//

//endereco usuario
  function validacaoenderecousuario(){
  var enderecousu = document.forms["enderecousuario"]
  if (enderecousu.cep.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
  if (enderecousu.estado.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
  if (enderecousu.cidade.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
  if (enderecousu.bairro.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
  if (enderecousu.endereco.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
  if (enderecousu.numero.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
  }
//endereco usuario//
//fim da Validação do Cadastro de Usuário

//Validação Cadastro de Profissional//

//dados pessoais do profissional
function validacaoProfissional(){
  var cadastroProfissional = document.forms["cadastroprof"]
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
  document.formulario.senha.focus();
  return false;
  }

}
//fim dos dados pessoais do profissional//
//endereco usuario
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
  if (enderecoprof.numero.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
  }
//endereco profissional//



//cadastro de serviços

function validacaoservico(){
  var validacaoservico = document.forms["cadastroservico"]
  if (validacaoservico.profissao.value == ""){
    alert("Preencha todos os campos!")
    return false;
  }
}



