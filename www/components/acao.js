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
  return false;
  }
   if(senha != confirmarsenha) {
        alert("Senhas diferentes!");
  return false; 
   }
 }
//fim dos dados pessoais usuario//

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
    if (enderecousu.numerocasa.value == ""){
  alert("Preencha todos os campos!");
  return false;
  }else{    
    alert("Cadastro realizado!");
    return true;
  }
}   