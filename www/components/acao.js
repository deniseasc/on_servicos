  // Validação de Login
function Login() {
  var done=0;
  var usuario = document.getElementsByName('usuario')[0].value;
  usuario=usuario.toLowerCase();
  var senha= document.getElementsByName('senha')[0].value;
  senha=senha.toLowerCase();
  if (usuario=="profissional" && senha=="123456") {
    window.location="homeProf.html";
    done=1;
  }
  if (usuario=="usuario" && senha=="123456") {
    window.location="home.html";
    done=1;
  }
  if (done==0) { alert("Dados incorretos, tente novamente");
  }
}

// Fim validação de login

//fim de validação de login//


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
    if (cadastrousuario.celular.value > 11){
  alert("Digite um celular válido!");
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

// function checarEmail(){
// if( document.forms[0].email.value=="" 
//    || document.forms[0].email.value.indexOf('@')==-1 
//      || document.forms[0].email.value.indexOf('.')==-1 )
// 	{
// 	  alert( "Informe um e-mail válido!" );
// 	  return false;
// 	}
// }
