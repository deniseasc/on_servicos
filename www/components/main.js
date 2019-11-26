$(function(){
	var open = true;
	var windowSize = $(window)[0].innerWidth;

	var targetSizeMenu = (windowSize <= 400) ? 200 : 300;

	if(windowSize > 768){
		$('.menu').animate({'width':'0','padding':'0'});
		$('.content,header').css({'width':'100%'});
		$('.content,header').animate({'left':'0'},function(){
			open = false;
		});
	}

  /* Click menu */
	$('.menu-btn').click(function(){
    /* Se menu aberto */
		if(open){
      /* Menu fecha */
			$('.menu').animate({'width':'0','padding':'0'});
			$('.content,header').css({'width':'100%'});
			$('.content,header').animate({'left':'0'},function(){
				open = false;
			});
      /* Menu fecha */
    }
    /* Se menu fechado */
    else{
      /* Menu abre */
			$('.menu').css({'display':'block'});
			$('.menu').animate({'width':targetSizeMenu+'px','padding':'10px'});
			//$('.content,header').css({'width':'calc(100% - 300px)'});/*Comenta pra esconder o botao sair*/
			$('.content,header').animate({'left':targetSizeMenu+'px'},function(){
				open = true;
			});
      /* Menu abre */
		}
    /* Se menu fechado */
	});
  /* Click menu*/

  /* Click body */
	$('.box-content').click(function(){
    /* Se menu aberto */
		if(open){
      /* Menu fecha */
			$('.menu').animate({'width':'0','padding':'0'});
			$('.content,header').css({'width':'100%'});
			$('.content,header').animate({'left':'0'},function(){
      /* Menu fecha */
				open = false;
			});
		}
    /* Se menu aberto */
	})
  /* Click menu*/

})

// //Excluir Serviço
// $(document).on("click","#btnExcluir",function(){
//     $.ajax({
//         type:"POST", //como enviar
//         url:"https://onservicos.000webhostapp.com/excluirServico.php",//para onde enviar
//         data:"id="+$("#codigo").val(),
//         //se der certo
//         success: function(data){
//             navigator.notification.alert(data);
//             location.reload();//recarrega a pagina
//         },
//         //se der errado
//         error: function(data){
//              navigator.notification.alert(data);
//         }
//     }); 
// });

//Alterar Senha
$(document).on("click", "#alteraSenha", function(){

  // $ajax({

  // });
});