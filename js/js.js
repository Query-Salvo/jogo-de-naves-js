function start() {
    $("#inicio").hide()

    $("#fundo").append("<div id='jogador'></div>");
    $("#fundo").append("<div id='inimigo1'></div>");
    $("#fundo").append("<div id='inimigo2'></div>");
    $("#fundo").append("<div id='amigo'></div>");

    //variaveis
    var jogo = {}
    var velocidade =5;
    var podeAtirar = true;
    var fimdejogo=false;
    var posicaoY = parseInt(Math.random() * 334);
    var TECLA = {
        W: 87,
        S: 83,
        D: 68
        }
    jogo.pressionou = [];
    

    
    //verifica-teclas

    $(document).keydown(function(e) {
        jogo.pressionou[e.which] = true;
    }); 

    $(document).keyup(function(e) {
        jogo.pressionou[e.which] = false;
    }); 

    //loop

    jogo.timer = setInterval(loop,30);

    function loop () {
        movefundo();
        movejogador();
        moveinimigo2();
        moveinimigo1();
        moveamigo();
        colisao();
    } 

    function movefundo () {
        esquerda = parseInt($("#fundo").css("background-position"))
        $("#fundo").css("background-position", esquerda-1)
    }

    function movejogador () {
        if(jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo-10)
            if (topo <=0) {
                $("#jogador").css("top", topo+1)
            }
        }
        if(jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo+10)
            if (topo >=580) {
                $("#jogador").css("top", topo-1)
            }
        }
        if(jogo.pressionou[TECLA.D]) {
            disparo();
        }
    }
    function moveinimigo2() {

        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left",posicaoX-velocidade);
        $("#inimigo2s").css("top",posicaoY);
            
            if (posicaoX<=0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo2").css("left",694);
            $("#inimigo2").css("top",posicaoY);
                
            }
    }

    function moveinimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
	$("#inimigo1").css("left",posicaoX-3);
				
		if (posicaoX<=0) {
			
		$("#inimigo1").css("left",775);
					
		}
    }
    function moveamigo() {
	
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX+1);
                    
            if (posicaoX>906) {
                
            $("#amigo").css("left",0);
                        
            }
        }
    
        function disparo() {
	
            if (podeAtirar==true) {
                
            podeAtirar=false;
            
            topo = parseInt($("#jogador").css("top"))
            posicaoX= parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 190;
            topoTiro=topo+37;
            $("#fundo").append("<div id='disparo'></div");
            $("#disparo").css("top",topoTiro);
            $("#disparo").css("left",tiroX);
            
            var tempoDisparo=window.setInterval(executaDisparo, 30);
            
            } //Fecha podeAtirar
         
                   function executaDisparo() {
                posicaoX = parseInt($("#disparo").css("left"));
                $("#disparo").css("left",posicaoX+15); 
        
                        if (posicaoX>900) {
                                
                    window.clearInterval(tempoDisparo);
                    tempoDisparo=null;
                    $("#disparo").remove();
                    podeAtirar=true;
                            
                           }
            } // Fecha executaDisparo()
        } // Fecha disparo()
        function colisao() {
            var colisao1 = ($("#jogador").collision($("#inimigo1")));
            var colisao2 = ($("#jogador").collision($("#inimigo2")));
            var colisao3 = ($("#disparo").collision($("#inimigo1")));
            var colisao4 = ($("#disparo").collision($("#inimigo2")));
            var colisao5 = ($("#jogador").collision($("#amigo")));
            var colisao6 = ($("#inimigo2").collision($("#amigo")));
                
                if (colisao2.length>0) {
                    
                inimigo2X = parseInt($("#inimigo2").css("left"));
                inimigo2Y = parseInt($("#inimigo2").css("top"));
                explosao1(inimigo2X,inimigo2Y);
            
                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo2").css("left",694);
                $("#inimigo2").css("top",posicaoY);
                }
                if (colisao1.length>0) {
	
                    inimigo1X = parseInt($("#inimigo1").css("left"));
                    inimigo1Y = parseInt($("#inimigo1").css("top"));
                    explosao1(inimigo1X,inimigo1Y);
                            
                    $("#inimigo1").remove();
                        
                    //reposicionaInimigo1();
                        
                    }	
            
                    if (colisao3.length>0) {
		
		
                        inimigo1X = parseInt($("#inimigo1").css("left"));
                        inimigo1Y = parseInt($("#inimigo1").css("top"));
                            
                        explosao1(inimigo1X,inimigo1Y);
                        $("#disparo").css("left",950);
                            
                        posicaoY = parseInt(Math.random() * 334);
                        $("#inimigo1").css("left",694);
                        $("#inimigo1").css("top",posicaoY);
                            
                        }            
            }
            function explosao1(inimigo2X,inimigo2Y) {
                $("#fundo").append("<div id='explosao1'></div");
                $("#explosao1").css("background-image", "url(img/explosao.png)");
                var div=$("#explosao1");
                div.css("top", inimigo2Y);
                div.css("left", inimigo2X);
                div.animate({width:200, opacity:0}, "slow");
                
                var tempoExplosao=window.setInterval(removeExplosao, 1000);
                
                    function removeExplosao() {
                        
                        div.remove();
                        window.clearInterval(tempoExplosao);
                        tempoExplosao=null;
                        
                    }
                    
                }
                
                
}






