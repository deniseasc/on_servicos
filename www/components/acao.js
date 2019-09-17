//validação de login
function validacaoLogin(){
  var formulariologin = document.forms["formlogin"]
  if (formulariologin.nome.value == ""){
  alert("Digite seu nome de Usuário");
  return false;
  }

  if (formulariologin.senha.value == ""){
  alert("Digite sua Senha");
  return false;
  }
    return true
}
  // Validação de Login
function Login() {
   var done=0;
  var usuario = document.getElementsByName('usuario')[0].value;
  usuario=usuario.toLowerCase();
  var senha= document.getElementsByName('senha')[0].value;
  senha=senha.toLowerCase();
  if (usuario=="usuario" && senha=="123456") {
    window.location="home.html";
    done=1;
  }
   if (usuario=="profissional" && senha=="123456") {
    window.location="homeProf.html";
    done=1;
  }
  if (done==0) { alert("Dados incorretos, tente novamente!"); }
}
// Fim validação de login

}//fim de validação de login//


 //validação do usuário//
 
 //dados pessoais usuario
 function validacaoUsuario(){
  var cadastrousuario = document.forms["cadastrousu"]
  var senha = cadastrousuario.senha.value;
  var confirmarsenha = cadastrousuario.confirmarsenha.value;
  
  if (cadastrousuario.nome.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (cadastrousuario.email.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (cadastrousuario.celular.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (cadastrousuario.login.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (senha == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (confirmarsenha == ""){
  alert("Preencha todos os campos!");
  return false;
  }
    if (cadastrousuario.senha.value.length < 6) {
  alert("A senha deve conter no minímo 6 digitos!");
  document.formulario.senha.focus();
  return false;
  }
   if(senha != confirmarsenha) {
        alert("Senhas diferentes!");
  return false; 
   }
}//fim dos dados pessoais usuario//

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
}//fim do endereco usuario//
//fim da Validação do Cadastro de Usuário


//Validação Cadastro de Profissional//

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
  document.formulario.senha.focus();
  return false;
  }
   if(senha != confirmarsenha) {
        alert("Senhas diferentes!");
  return false; 
   }

}
//fim dos dados pessoais do profissional//

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

