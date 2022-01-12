var url="localhost"





///////////////////////////////////////////
////Varibles de API REST
var player_profile;
var profileExists0; 
	var profileExists1;
	var profileExists2; 
	var profileExists3; 
	
//Variables WebSockets
var connection = new WebSocket('ws://'+url+':8080/online');
var selectPlayer = new WebSocket('ws://'+url+':8080/selectPlayer');
var movePlayer = new WebSocket('ws://'+url+':8080/movePlayer');
var respawnItemsHandler = new WebSocket('ws://'+url+':8080/itemsRespawn')
//Variables que reciben llamadas de websocket
var online=false;
var pjPropioSelec=false;
var cargoPj='null';
var inputLeft=false;
var inputRight=false;
var inputDown=false;
var inputUp=false;
var inputJump=false;
var inputAttack=false;
var inputSpecial=false;
var rpwGem='null';
var rpwStrawberry='null';
var rpwLemon='null';
var rpwGrape='null';
var rpwShield='null';
var rpwSpeed='null';
var rpwPower='null';
var rpwAmmo='null';
var rpwPistol='null';
var rpwKnife='null';

//Listeners globales de websokects
connection.onmessage = function(msg) {
	  online=true;
//Imprime el mensaje entero largo
console.log(msg);
//imprime solo la data del mensaje que es el cuerpo del mensaje que se manda send
console.log(JSON.parse(msg.data));
	}

	
	connection.onerror = function(e) {
	  console.log("WS error al establecer conexion online");
}
	connection.onclose = function() {
	  console.log("WS Conexión cerrada");
	}
/////////////////////////////////////////Pantalla de Carga//////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class PantallaCarga extends Phaser.Scene{
    constructor(){
        //Loading--> nombre que se le da a la escena
        super({ key: "Loading"});
    }

    preload(){

        this.load.image('BContinuar', './asset/BotonContinuar_prueba.png');
        
        var progressBar = this.add.graphics(400, 300);
        var progressBox = this.add.graphics(400, 300);
        progressBox.fillStyle(0x222222, 0.8);
        //fillRect(x, y, ancho, alto)
        progressBox.fillRect(140, 270, 520, 50);

        //Texto
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading game...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });

        loadingText.setOrigin(0.5, 0.5);



        //Porcentaje de carga
        var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            
    


        this.load.on('progress', function(value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(150, 280, 500 * value, 30);
        });

        this.load.on('complete', function () {
        //loadingText.destroy();
        //percentText.destroy();
        //progressBar.destroy();
        //progressBox.destroy();
        //this.scene.start("PantallaInicio");
         });


        this.load.image('logo', './asset/stormedialogo.png');


         ////////////////////////////Carga de assets de Pantalla de Inicio//////////////////////////////////

        //Carga de fondo, título e imagen
        this.load.image('fondoInicio', './asset/Fondo.png');
        this.load.image('title', './asset/LogoTinyTussle.png');
        this.load.image('start', './asset/Continuar.png');

        ///////////////////////////////////////////////////////////////////////////////////////////////////
		
		
		/////////////////////////Carga de assets de Pantalla de SelecTipoInicio/////////////////////////////

        //Carga de fondo, título e imagen
        this.load.image('fondoSelecIni', './asset/Fondo.png');
        this.load.image('titleSelIni', './asset/LogoTinyTussle.png');
		this.load.image('bCrearPerfil', './asset/botones_api_rest/Crear_perfil.png');
		this.load.image('bCrearPerfilActivado', './asset/botones_api_rest/Crear_perfil(Activado).png');
        this.load.image('bElegirPerfil', './asset/botones_api_rest/Elegir_perfil.png');
		this.load.image('bElegirPerfilActivado', './asset/botones_api_rest/Elegir_perfil(Activado).png');
		this.load.image('bContinuarAnonimo', './asset/botones_api_rest/Cont_invitado.png');
		this.load.image('bContinuarAnonimoActivado', './asset/botones_api_rest/Cont_invitado(Activado).png');

        ///////////////////////////////////////////////////////////////////////////////////////////////////

		
		/////////////////////////Carga de assets de Pantalla de SelecPerfil/////////////////////////////

        //Carga de fondo, título e imagen
        this.load.image('fondoSelecPerfil', './asset/Fondo.png');
		this.load.image('bPerfil1', './asset/botones_api_rest/Boton_vacio.png');
		this.load.image('bPerfil1Activado', './asset/botones_api_rest/Boton_vacio(Activado).png');
        this.load.image('bPerfil2', './asset/botones_api_rest/Boton_vacio.png');
		this.load.image('bPerfil2Activado', './asset/botones_api_rest/Boton_vacio(Activado).png');
		this.load.image('bPerfil3', './asset/botones_api_rest/Boton_vacio.png');
		this.load.image('bPerfil3Activado', './asset/botones_api_rest/Boton_vacio(Activado).png');
		this.load.image('bPerfil4', './asset/botones_api_rest/Boton_vacio.png');
		this.load.image('bPerfil4Activado', './asset/botones_api_rest/Boton_vacio(Activado).png');
		this.load.image('bcont3', './asset/bContinuar.png');
        this.load.image('bcont3Ativado', './asset/bContinuarActivado.png');
		this.load.image('bBorrarPerfil', './asset/botones_api_rest/Borrar_perfil.png');
        this.load.image('bBorrarPerfilActivado', './asset/botones_api_rest/Borrar_perfil(Activado).png');
        ///////////////////////////////////////////////////////////////////////////////////////////////////



        ////////////////////////////Carga de assets de Pantalla de Registro//////////////////////////////////

        //Carga de fondo, título e imagen
        this.load.image('fondoReg', './asset/Fondo.png');
        this.load.image('bcont2', './asset/botones_api_rest/Guardar.png');
        this.load.image('bcont2Ativado', './asset/botones_api_rest/Guardar(Activado).png');
        this.load.image('bVerDatos', './asset/BotonVerDatos.png');
        this.load.image('bVerDatosActivado', './asset/BotonVerDatosActivado.png');

        ///////////////////////////////////////////////////////////////////////////////////////////////////



        ////////////////////////////Carga de assets de Pantalla de Datos////////////////////////////////////

        //Carga de fondo, título e imagen
        this.load.image('fondoDatos', './asset/Fondo.png');
        this.load.image('nombre', './asset/botones_api_rest/Nickname.png');
        this.load.image('score', './asset/botones_api_rest/Puntuacion_max.png');
        this.load.image('PerFavorito', './asset/botones_api_rest/Personaje_usado.png');
        this.load.image('bModificar', './asset/BotonModificar.png');
        this.load.image('bModificarActivado', './asset/BotonModificarActivado.png');

        ///////////////////////////////////////////////////////////////////////////////////////////////////



        //////////////////////////////////Carga de assets del Menú Principal///////////////////////////////

        //Carga de fondo y botones
        this.load.image('fondoMenuPrincipal', './asset/Fondo.png');
        this.load.image('titleMP', './asset/LogoTinyTussle.png');
        this.load.image('bJugarActivado', './asset/JugarActivado.png');
        this.load.image('bJugar', './asset/Jugar.png');
        this.load.image('bControlesActivado', './asset/ControlesActivado.png');
        this.load.image('bControles', './asset/Controles.png');
        this.load.image('bCreditosActivado', './asset/CreditosActivado.png');
        this.load.image('bCreditos', './asset/Creditos.png');
        this.load.image('bVerDatos2', './asset/botones_api_rest/Perfil.png');
        this.load.image('bVerDatosActivado2', './asset/botones_api_rest/Perfi(Activado)l.png');
        this.load.image('backActivo', './asset/AtrasActivado.png');
        this.load.image('back', './asset/Atras.png');
        this.load.image('ayudaActivado', './asset/AyudaActivado.png');
        this.load.image('ayuda', './asset/Ayuda.png');

        /////////////////////////////////////////////////////////////////////////////////////////////////// 



        //////////////////////////////////Carga de assets de Controles//////////////////////////////////////

        //Carga de fondo, título e imagen
        this.load.image('fondoControles', './asset/Fondo.png');
        this.load.image('TitControles', './asset/TextoControles.png');
        this.load.image('explicacion', './asset/GemasYComida.png');
        this.load.image('TitSalto', './asset/Salto.png');
        this.load.image('TitMovimiento', './asset/Movimiento.png');
        this.load.image('TitDispHab', './asset/DisparoyHabilidadEspecial.png');
        this.load.image('teclaEspacio', './asset/SpaceSprite.png');
        this.load.image('teclaMovimiento', './asset/SpriteASDW.png');
        this.load.image('teclaQ', './asset/SpriteQ.png');
        this.load.image('teclaE', './asset/SpriteE.png');
        this.load.image('teclaMovimientoJug2', './asset/SpriteJKLI.png');
        this.load.image('teclaO', './asset/SpriteO.png');
        this.load.image('teclaU', './asset/SpriteU.png');
        this.load.image('teclaShift', './asset/SpriteShift.png');

        ///////////////////////////////////////////////////////////////////////////////////////////////////



        //////////////////////////////////Carga de assets de Créditos/////////////////////////////////////

        //Carga de fondo, título e imagen
        this.load.image('fondoCreditos', './asset/Fondo.png');
        this.load.image('TituloCred', './asset/LogoTinyTussle.png');
        this.load.image('titEquipo', './asset/Stormediateam.png');
        this.load.image('miembros', './asset/MiembrosGrupo.png');
        this.load.image('assetsExternos', './asset/AssetsExternos.png');
        this.load.image('tex1', './asset/tex1Creditos.png');
        this.load.image('tex2', './asset/tex2Creditos.png');
        this.load.image('tex3', './asset/tex3Creditos.png');
        this.load.image('tex4', './asset/tex4Creditos.png');
        this.load.image('tex5', './asset/tex5Creditos.png');
        this.load.image('tex6', './asset/tex6Creditos.png');
        this.load.image('tex7', './asset/tex7Creditos.png');


        ///////////////////////////////////////////////////////////////////////////////////////////////////



        ////////////////////////////////////Carga de assets de Ayuda///////////////////////////////////////
         //Carga de fondo, título e imagen
        this.load.image('fondoAyuda', './asset/Fondo.png');
        this.load.image('titAyuda', './asset/AyudaT.png');
        this.load.image('texto1', './asset/Contactar.png');
        this.load.image('texto2', './asset/Link.png');
        this.load.image('texto3', './asset/unnamed.png');


        ///////////////////////////////////////////////////////////////////////////////////////////////////




        ///////////////////////////Carga de assets de Pantalla de Modo de Juego////////////////////////////

        //Carga de fondos y botones
        this.load.image('fondoModoJuego', './asset/Fondo.png');
        this.load.image('titleMJ', './asset/LogoTinyTussle.png');
        this.load.image('iconoLocal', './asset/IconoJugarLocal.png');
        this.load.image('iconoRed', './asset/IconoJugarRed.png');
        this.load.image('bJugarLinea', './asset/JugarEnLinea.png');
        this.load.image('bJugarLocal', './asset/JugarEnLocal.png');
        this.load.image('bJugarLocalActivado', './asset/JugarEnLocalActivado.png');
        this.load.image('textoLinea', './asset/TextoEnLinea.png');
        this.load.image('textoLocal', './asset/TextoLocal.png');
        

        /////////////////////////////////////////////////////////////////////////////////////////////////// 


        ////////////////////////Carga de assets de Pantalla de Número de Jugadores////////////////////////

        //Carga de fondos y botones
        this.load.image('fondoNumeroJugadores', './asset/Fondo.png');
        this.load.image('titleNJ', './asset/LogoTinyTussle.png');
        this.load.image('textoNJ', './asset/CuantosJugadores.png');
        this.load.image('2JActivo', './asset/2-Jugadores.png');
        this.load.image('2J', './asset/2jugadores.png');
        this.load.image('3J', './asset/3jugadores.png');
        this.load.image('4J', './asset/4jugadores.png');


        /////////////////////////////////////////////////////////////////////////////////////////////////// 



        ////////////////////////////Carga de assets de Pantalla Selección de Personajes////////////////////

        //Carga de fondo y selección de personajes
        this.load.image('fondoPersonajes', './asset/Fondo.png');
        this.load.image('titlePer', './asset/LogoTinyTussle.png');
        this.load.image('BContinuar1', './asset/bContinuar.png');
        this.load.image('BContinuar1Activado', './asset/bContinuarActivado.png');
        this.load.image('selectChilli', './asset/Pink_Monster.png');
        this.load.image('selectBernie', './asset/Owlet_Monster.png');
        this.load.image('selectWasabi', './asset/Dude_Monster.png');
        this.load.image('jugador1', './asset/Jugador1.png');
        this.load.image('jugador2', './asset/Jugador2.png');
        this.load.image('text1', './asset/DescripcionChili.png');
        this.load.image('text2', './asset/DescripcionBernie.png');
        this.load.image('text3', './asset/DescripcionWasabi.png');
        this.load.image('nomChilli', './asset/ChiliNombre.png');
        this.load.image('nomBernie', './asset/BernieNombre.png');
        this.load.image('nomWasabi', './asset/WasabiNombre.png');
        this.load.image('elegirPers', './asset/TextoEleccionPersonaje.png');


        ///////////////////////////////////////////////////////////////////////////////////////////////////  

        ////////////////////////////Carga de assets de Pantalla Selección de Escenario/////////////////////

        //Carga de fondo, titulo e imagen
        this.load.image('fondoMenu1', './asset/Fondo.png');
        this.load.image('textoSelectE', './asset/ElegirMapa.png');
        this.load.image('Campo', './asset/MapaIlumen.png');
        this.load.image('CampoActivado', './asset/IlumenActivado.png');
        this.load.image('Lava', './asset/MapaMolvattTachado.png');
        //this.load.image('LavaActivado', './asset/MolvattActivado.png');
        this.load.image('Oriental', './asset/MapaZauzTachado.png');
        //this.load.image('OrientalActivado', './asset/ZauzActivado.png');
        this.load.image('BContinuar2', './asset/BotonContinuar_prueba.png');

        /////////////////////////////////////////////////////////////////////////////////////////////////// 

        ///////////////////////////Carga de assets del Juego///////////////////////////////////////////////

        //Pausa
        this.load.image('bPausa', './asset/BotonPausa.png');
        this.load.image('bPausaActivado', './asset/BotonPausaActivado.png');

		//Interfaz de la partida
		this.load.image('j1',             'asset/J1.png');
        this.load.image('j2',             'asset/J2.png');
        this.load.image('life_heart',             'asset/Vida.png');
        this.load.image('special_attack_1',             'asset/AtaqueEspecial/AEsp1.png');
        this.load.image('special_attack_2',             'asset/AtaqueEspecial/AEsp2.png');
        this.load.image('special_attack_3',             'asset/AtaqueEspecial/AEsp3.png');
        this.load.image('special_attack_4',             'asset/AtaqueEspecial/AEsp4.png');
        this.load.image('special_attack_5',             'asset/AtaqueEspecial/AEsp5.png');
        this.load.image('special_attack_6',             'asset/AtaqueEspecial/AEsp6.png');
        this.load.image('special_attack_7',             'asset/AtaqueEspecial/AEsp7.png');
        this.load.image('special_attack_8',             'asset/AtaqueEspecial/AEsp8.png');
        this.load.image('special_attack_9',             'asset/AtaqueEspecial/AEsp9.png');
        this.load.image('special_attack_10',             'asset/AtaqueEspecial/AEsp10.png');
        this.load.image('special_attack_11',             'asset/AtaqueEspecial/AEsp11.png');
        this.load.image('shield_bubble',             'asset/bubble_shield.png');
        this.load.image('speed_item',             'asset/feather.png');
        this.load.image('power_item',             'asset/strength.png');
        //Objetos
        this.load.image('gem',             'asset/gem.png');
        this.load.image('pistol_item',             'asset/pistol_icon.png');
        this.load.image('knife_item',             'asset/knife.png');
        this.load.image('shield_item',             'asset/escudo.png');
        this.load.image('shield_bubble',             'asset/bubble_shield.png');
        this.load.image('speed_item',             'asset/feather.png');
        this.load.image('power_item',             'asset/strength.png');
        this.load.image('grape_item',             'asset/grape.png');
        this.load.image('strawberry_item',             'asset/strawberry.png');
        this.load.image('lemon_item',             'asset/lemon.png');
        this.load.image('ammo_item',             'asset/ammo.png');


        //Escenario
        this.load.image('gray',             'asset/FondoEscenario1.png');
        this.load.image('platform_T1',         'asset/PlataformaTipo1.png');
        this.load.image('platform_T1_double',         'asset/PlataformaTipo1_Doble.png');
        this.load.image('platform_T2',         'asset/PlataformaTipo2.png');
        this.load.image('platform_T2_double',         'asset/PlataformaTipo2_Doble.png');
        this.load.image('bullet',           'asset/bullet.png');
        this.load.image('ladder',         'asset/ladder.jpg');
        this.load.image('bg_arboles',         'asset/escenario1/Background arboles.png');
        this.load.image('bg_tierra',         'asset/escenario1/Background tierra.png');
        this.load.image('escalera',         'asset/escenario1/Escalera.png');
        this.load.image('tierra_borde_dch',         'asset/escenario1/Tierra_borde_dch.png');
        this.load.image('tierra_borde_izq',         'asset/escenario1/Tierra_borde_izq.png');
        this.load.image('tierra_centro',         'asset/escenario1/Tierra_centro.png');
        this.load.image('tierra_escalera',         'asset/escenario1/Tierra_escalera.png');
        this.load.image('tierra_esq_3',         'asset/escenario1/Tierra_esq_3.png');
        this.load.image('tierra_esq_4',         'asset/escenario1/Tierra_esq_4.png');
        this.load.image('tierra_esq_inf_dch',         'asset/escenario1/Tierra_esq_inf_dch.png');
        this.load.image('tierra_esq_inf_izq',         'asset/escenario1/Tierra_esq_inf_izq.png');
        this.load.image('tierra_esq_sup_dch',         'asset/escenario1/Tierra_esq_sup_dch.png');
        this.load.image('tierra_esq_sup_izq',         'asset/escenario1/Tierra_esq_sup_izq.png');
        this.load.image('tierra_pared_dch',         'asset/escenario1/Tierra_pared_dch.png');
        this.load.image('tierra_pared_izq',         'asset/escenario1/Tierra_pared_izq.png');
        this.load.image('tierra_suelo_inf',         'asset/escenario1/Tierra_suelo_inf.png');
        this.load.image('tierra_suelo_sup',         'asset/escenario1/Tierra_suelo_sup(new).png');


        //Chilli
        this.load.image('Chilli_profile', 'asset/Pink_Monster_closeUp.png');
        this.load.spritesheet('Chilli_idl', 'asset/Pink_Monster_Idle.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Chilli_run', 'asset/Pink_Monster_Run.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Chilli_run_knife', 'asset/correrCuchilloRosa.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Chilli_run_pistol', 'asset/correrPistolaRosa.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Chilli_jump', 'asset/Pink_Monster_Jump.png', { frameWidth: 32, frameHeight: 31 });
		this.load.spritesheet('Chilli_attack_knife', 'asset/animacionCuchilloRosa.png', { frameWidth: 36, frameHeight: 31 });
        this.load.spritesheet('Chilli_attack_pistol', 'asset/animacionPistolaRosa.png', { frameWidth: 36, frameHeight: 31 });
        this.load.spritesheet('Chilli_hurt', 'asset/Pink_Monster_Hurt.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Chilli_death', 'asset/Pink_Monster_Death.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Chilli_climb', 'asset/Pink_Monster_Climb.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Chilli_run_dust', 'asset/Walk_Run_Push_Dust.png', { frameWidth: 32, frameHeight: 31 });


        //Bernie
        this.load.image('Bernie_profile', 'asset/Owlet_Monster_closeUp.png');
        this.load.spritesheet('Bernie_idl', 'asset/Owlet_Monster_Idle.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Bernie_run', 'asset/Owlet_Monster_Run.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Bernie_run_knife', 'asset/correrCuchilloBlanco.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Bernie_run_pistol', 'asset/correrPistolaBlanco.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Bernie_jump', 'asset/Owlet_Monster_Jump.png', { frameWidth: 32, frameHeight: 31 });
		this.load.spritesheet('Bernie_attack_knife', 'asset/animacionCuchilloBlanco.png', { frameWidth: 36, frameHeight: 31 });
        this.load.spritesheet('Bernie_attack_pistol', 'asset/animacionPistolaBlanco.png', { frameWidth: 36, frameHeight: 31 });        
        this.load.spritesheet('Bernie_hurt', 'asset/Owlet_Monster_Hurt.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Bernie_death', 'asset/Owlet_Monster_Death.png', { frameWidth: 32, frameHeight: 31 });  
        this.load.spritesheet('Bernie_climb', 'asset/Owlet_Monster_Climb.png', { frameWidth: 32, frameHeight: 31 });

        //Wasabi
        this.load.image('Wasabi_profile', 'asset/Dude_Monster_closeUp.png');
        this.load.spritesheet('Wasabi_idl', 'asset/Dude_Monster_Idle.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Wasabi_run', 'asset/Dude_Monster_Run.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Wasabi_run_knife', 'asset/correrCuchilloAzul.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Wasabi_run_pistol', 'asset/correrPistolaAzul.png', { frameWidth: 32, frameHeight: 31 });        
		this.load.spritesheet('Wasabi_jump', 'asset/Dude_Monster_Jump.png', { frameWidth: 32, frameHeight: 31 });
		this.load.spritesheet('Wasabi_attack_knife', 'asset/animacionCuchilloAzul.png', { frameWidth: 36, frameHeight: 31 });
        this.load.spritesheet('Wasabi_attack_pistol', 'asset/animacionPistolaAzul.png', { frameWidth: 36, frameHeight: 31 });
        this.load.spritesheet('Wasabi_hurt', 'asset/Dude_Monster_Hurt.png', { frameWidth: 32, frameHeight: 31 });
        this.load.spritesheet('Wasabi_death', 'asset/Dude_Monster_Death.png', { frameWidth: 32, frameHeight: 31 });  
        this.load.spritesheet('Wasabi_climb', 'asset/Dude_Monster_Climb.png', { frameWidth: 32, frameHeight: 31 });

		//Explosion
        this.load.spritesheet('round_explosion_spsh', 'asset/round_explosion.png', { frameWidth: 100, frameHeight: 100 });
        this.load.image('round_explosion_0', 'asset/AnimacionExplosion/frame0000.png');
        this.load.image('round_explosion_1', 'asset/AnimacionExplosion/frame0001.png');
        this.load.image('round_explosion_2', 'asset/AnimacionExplosion/frame0002.png');
        this.load.image('round_explosion_3', 'asset/AnimacionExplosion/frame0003.png');
        this.load.image('round_explosion_4', 'asset/AnimacionExplosion/frame0004.png');
        this.load.image('round_explosion_5', 'asset/AnimacionExplosion/frame0005.png');
        this.load.image('round_explosion_6', 'asset/AnimacionExplosion/frame0006.png');
        this.load.image('round_explosion_7', 'asset/AnimacionExplosion/frame0007.png');
        this.load.image('round_explosion_8', 'asset/AnimacionExplosion/frame0008.png');
        this.load.image('round_explosion_9', 'asset/AnimacionExplosion/frame0009.png');
        this.load.image('round_explosion_10', 'asset/AnimacionExplosion/frame0010.png');
        this.load.image('round_explosion_11', 'asset/AnimacionExplosion/frame0011.png');
        this.load.image('round_explosion_12', 'asset/AnimacionExplosion/frame0012.png');
        this.load.image('round_explosion_13', 'asset/AnimacionExplosion/frame0013.png');
        this.load.image('round_explosion_14', 'asset/AnimacionExplosion/frame0014.png');
        this.load.image('round_explosion_15', 'asset/AnimacionExplosion/frame0015.png');
        this.load.image('round_explosion_16', 'asset/AnimacionExplosion/frame0016.png');
        this.load.image('round_explosion_17', 'asset/AnimacionExplosion/frame0017.png');
        this.load.image('round_explosion_18', 'asset/AnimacionExplosion/frame0018.png');
        this.load.image('round_explosion_19', 'asset/AnimacionExplosion/frame0019.png');
        this.load.image('round_explosion_20', 'asset/AnimacionExplosion/frame0020.png');
        this.load.image('round_explosion_21', 'asset/AnimacionExplosion/frame0021.png');
        this.load.image('round_explosion_22', 'asset/AnimacionExplosion/frame0022.png');
        this.load.image('round_explosion_23', 'asset/AnimacionExplosion/frame0023.png');
        this.load.image('round_explosion_24', 'asset/AnimacionExplosion/frame0024.png');
        this.load.image('round_explosion_25', 'asset/AnimacionExplosion/frame0025.png');
        this.load.image('round_explosion_26', 'asset/AnimacionExplosion/frame0026.png');
        this.load.image('round_explosion_27', 'asset/AnimacionExplosion/frame0027.png');
        this.load.image('round_explosion_28', 'asset/AnimacionExplosion/frame0028.png');
        this.load.image('round_explosion_29', 'asset/AnimacionExplosion/frame0029.png');
        this.load.image('round_explosion_30', 'asset/AnimacionExplosion/frame0030.png');
        this.load.image('round_explosion_31', 'asset/AnimacionExplosion/frame0031.png');
        this.load.image('round_explosion_32', 'asset/AnimacionExplosion/frame0032.png');
        this.load.image('round_explosion_33', 'asset/AnimacionExplosion/frame0033.png');
        this.load.image('round_explosion_34', 'asset/AnimacionExplosion/frame0034.png');
        this.load.image('round_explosion_35', 'asset/AnimacionExplosion/frame0035.png');
        this.load.image('round_explosion_36', 'asset/AnimacionExplosion/frame0036.png');
        this.load.image('round_explosion_37', 'asset/AnimacionExplosion/frame0037.png');
        this.load.image('round_explosion_38', 'asset/AnimacionExplosion/frame0038.png');
        this.load.image('round_explosion_39', 'asset/AnimacionExplosion/frame0039.png');
        this.load.image('round_explosion_40', 'asset/AnimacionExplosion/frame0040.png');
        this.load.image('round_explosion_41', 'asset/AnimacionExplosion/frame0041.png');
        this.load.image('round_explosion_42', 'asset/AnimacionExplosion/frame0042.png');
        this.load.image('round_explosion_43', 'asset/AnimacionExplosion/frame0043.png');
        this.load.image('round_explosion_44', 'asset/AnimacionExplosion/frame0044.png');
        this.load.image('round_explosion_45', 'asset/AnimacionExplosion/frame0045.png');
        this.load.image('round_explosion_46', 'asset/AnimacionExplosion/frame0046.png');
        this.load.image('round_explosion_47', 'asset/AnimacionExplosion/frame0047.png');
        this.load.image('round_explosion_48', 'asset/AnimacionExplosion/frame0048.png');
        this.load.image('round_explosion_49', 'asset/AnimacionExplosion/frame0049.png');
        this.load.image('round_explosion_50', 'asset/AnimacionExplosion/frame0050.png');
        this.load.image('round_explosion_51', 'asset/AnimacionExplosion/frame0051.png');
        this.load.image('round_explosion_52', 'asset/AnimacionExplosion/frame0052.png');
        this.load.image('round_explosion_53', 'asset/AnimacionExplosion/frame0053.png');
        this.load.image('round_explosion_54', 'asset/AnimacionExplosion/frame0054.png');
        this.load.image('round_explosion_55', 'asset/AnimacionExplosion/frame0055.png');
        this.load.image('round_explosion_56', 'asset/AnimacionExplosion/frame0056.png');
        this.load.image('round_explosion_57', 'asset/AnimacionExplosion/frame0057.png');
        this.load.image('round_explosion_58', 'asset/AnimacionExplosion/frame0058.png');
        this.load.image('round_explosion_59', 'asset/AnimacionExplosion/frame0059.png');
        this.load.image('round_explosion_60', 'asset/AnimacionExplosion/frame0060.png');
        this.load.image('round_explosion_61', 'asset/AnimacionExplosion/frame0061.png');
        this.load.image('round_explosion_62', 'asset/AnimacionExplosion/frame0062.png');
        this.load.image('round_explosion_63', 'asset/AnimacionExplosion/frame0063.png');
        this.load.image('round_explosion_64', 'asset/AnimacionExplosion/frame0064.png');
        this.load.image('round_explosion_65', 'asset/AnimacionExplosion/frame0065.png');
        this.load.image('round_explosion_66', 'asset/AnimacionExplosion/frame0066.png');
        this.load.image('round_explosion_67', 'asset/AnimacionExplosion/frame0067.png');
        this.load.image('round_explosion_68', 'asset/AnimacionExplosion/frame0068.png');
        this.load.image('round_explosion_69', 'asset/AnimacionExplosion/frame0069.png');
        this.load.image('round_explosion_70', 'asset/AnimacionExplosion/frame0070.png');
        


        //Audio - Sound effects
        this.load.audio('pistolFire',       'asset/sound_effects/Shoot 3.wav');
        this.load.audio('powerUp',       'asset/sound_effects/Powerup 3.wav');
        this.load.audio('pickWeapon',       'asset/sound_effects/Select 2.wav');
        this.load.audio('explosion_sfx',       'asset/sound_effects/Explosion 2.wav');
        this.load.audio('hit',       'asset/sound_effects/Hit 3.wav');
        this.load.audio('collect_gem',       'asset/sound_effects/Coin 3.wav');

        //Music
        this.load.audio('backgroundTitleMusic',       'asset/music/Abstraction - Three Red Hearts - Princess Quest (No Boing).wav');
        this.load.audio('backgroundSelectionMusic',       'asset/music/Abstraction - Three Red Hearts - Puzzle Pieces.wav');
        this.load.audio('backgroundBattleMusic1',       'asset/music/Abstraction - Three Red Hearts - Box Jump.wav');
        this.load.audio('backgroundBattleMusic2',       'asset/music/Abstraction - Three Red Hearts - Penguins vs Rabbits.wav');
        this.load.audio('backgroundBattleMusic3',       'asset/music/Abstraction - Three Red Hearts - Pixel War 1.wav');
        this.load.audio('backgroundResultsMusic',       'asset/music/Abstraction - Three Red Hearts - Candy.wav');

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////Carga de assets de Pausa////////////////////////////////////////////
         //Carga de fondo, título e imagen
        this.load.image('fondoPausa', './asset/Fondo.png');
        this.load.image('bResume', './asset/BotonResume.png');
        this.load.image('bResumeActivado', './asset/BotonResumeActivado.png');
        this.load.image('bRestart', './asset/BotonRestart.png');
        this.load.image('bRestartActivado', './asset/BotonRestartActivado.png');
        this.load.image('tituloPausa', './asset/LogoTinyTusslePausa.png');
        

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////



        ///////////////////////////Carga de assets de la Pantalla de Resultados/////////////////////////////////////

        this.load.image('fondoRanking', './asset/Fondo.png');
        this.load.image('podio', './asset/Podio.png');
        this.load.image('bRevancha', './asset/Revancha.png');
        this.load.image('bRevanchaActivado', './asset/RevanchaActivado.png');
        this.load.image('bSalir', './asset/Salir.png');
        this.load.image('bSalirActivado', './asset/SalirActivado.png');

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }



    create(){
        getProfileName(0);
getProfileName(1);
getProfileName(2);
getProfileName(3); 
        this.scene.start('Inicio');
        $("#send").click(function () {
	if(id!=null){
			sendMessage();
		}
			

        });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var fallosServidor = 0;
var errorServidor;
var bg_music_initial_screen;
//////////////////////////////////////////////Pantalla de Inicio////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var enterKey;

class PantallaDeInicio extends Phaser.Scene{
    constructor(){
        //Inicio--> nombre que se le da a la escena
        super({ key: "Inicio"});
    }

    preload(){

        
    }

    create(){

        //Musica
        bg_music_initial_screen = this.sound.add('backgroundTitleMusic');
        bg_music_initial_screen.setLoop(true);
        bg_music_initial_screen.play();
        
        //Fondo de la pantalla de inicio
        this.fondoIni= this.add.image(400, 300, 'fondoMenuPrincipal');
        this.fondoIni.setScale(0.6);

        //Título del juego e instrucción
        this.tit=this.add.image(400, 250, 'title');
        this.tit.setScale(0.6);

        this.texCont = this.add.image(400, 500, 'start');
        this.texCont.setScale(0.6);

		//Inputs
               // $("#nombre").show();

        enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(enterKey)){
	           
            this.scene.start('SelecTipoInicio');
            bg_music_initial_screen.setLoop(false);
            bg_music_initial_screen.stop();
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////Pantalla de SelecTipoInicio///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var bg_music_selection_screen;


class SelecTipoInicio extends Phaser.Scene{
    constructor(){
        //Inicio--> nombre que se le da a la escena
        super({ key: "SelecTipoInicio"});
    }

    preload(){

        
    }

    create(){

       	//Musica
        bg_music_selection_screen = this.sound.add('backgroundSelectionMusic');
        bg_music_selection_screen.setLoop(true);
        bg_music_selection_screen.play();

        //Fondo de la pantalla 
        this.SelecIni= this.add.image(400, 300, 'fondoSelecIni');
        this.SelecIni.setScale(0.6);

        this.titleS = this.add.image(400, 150, 'titleSelIni');
        this.titleS.setScale(0.3);

		this.crearP = this.add.image(400, 350, 'bCrearPerfil').setInteractive();
        this.crearP.setScale(0.3);

		this.crearP.on('pointerover', () => {
            this.crearP = this.add.image(400, 350, 'bCrearPerfilActivado');
            this.crearP.setScale(0.3);
        });
        
        this.crearP.on('pointerout', () => {
            this.crearP = this.add.image(400, 350, 'bCrearPerfil');
            this.crearP.setScale(0.3);
        });
        
        this.crearP.on('pointerdown', () => {
            this.scene.start('Registro');
        });

		this.elegirP = this.add.image(300, 470, 'bElegirPerfil').setInteractive();
        this.elegirP.setScale(0.3);

		this.elegirP.on('pointerover', () => {
            this.elegirP = this.add.image(300, 470, 'bElegirPerfilActivado');
            this.elegirP.setScale(0.3);
        });
        
        this.elegirP.on('pointerout', () => {
            this.elegirP = this.add.image(300, 470, 'bElegirPerfil');
            this.elegirP.setScale(0.3);
        });
        
        this.elegirP.on('pointerdown', () => {
            this.scene.start('SelecPerfil');
        });


		this.contA = this.add.image(500, 470, 'bContinuarAnonimo').setInteractive();
        this.contA.setScale(0.3);

		this.contA.on('pointerover', () => {
            this.contA = this.add.image(500, 470, 'bContinuarAnonimoActivado');
            this.contA.setScale(0.3);
        });
        
        this.contA.on('pointerout', () => {
            this.contA = this.add.image(500, 470, 'bContinuarAnonimo');
            this.contA.setScale(0.3);
        });
        
        this.contA.on('pointerdown', () => {
            this.scene.start('MenuPrincipal');
        });

    }

    update(){
        
        }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var id;
var pj_fav_profile;
var puntuacion_profile;

//////////////////////////////////////Pantalla de SelecPerfil///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var registroActivado;

class SelecPerfil extends Phaser.Scene{
    constructor(){
        //SelecPerfil--> nombre que se le da a la escena
        super({ key: "SelecPerfil"});
    }

    preload(){

        
    }

    create(){
		$("#perfil0").show();
		$("#perfil1").show();
		$("#perfil2").show();
		$("#perfil3").show();

getProfileName(0);
getProfileName(1);
getProfileName(2);
getProfileName(3);    
        //Fondo de la pantalla 
        this.FondoSelecPerfil= this.add.image(400, 300, 'fondoSelecPerfil');
        this.FondoSelecPerfil.setScale(0.6);

		registroActivado = 0;
		
		
		
		this.perfil1 = this.add.image(250, 200, 'bPerfil1').setInteractive();
        this.perfil1.setScale(0.4);

		this.perfil1.on('pointerover', () => {
            this.perfil1 = this.add.image(250, 200, 'bPerfil1Activado');
            this.perfil1.setScale(0.4);
        });
        
        this.perfil1.on('pointerout', () => {
            this.perfil1 = this.add.image(250, 200, 'bPerfil1');
            this.perfil1.setScale(0.4);
        });
        
        this.perfil1.on('pointerdown', () => {
			id=0;
            registroActivado = 1;
        });


		this.perfil2 = this.add.image(550, 200, 'bPerfil2').setInteractive();
        this.perfil2.setScale(0.4);

		this.perfil2.on('pointerover', () => {
            this.perfil2 = this.add.image(550, 200, 'bPerfil2Activado');
            this.perfil2.setScale(0.4);
        });
        
        this.perfil2.on('pointerout', () => {
            this.perfil2 = this.add.image(550, 200, 'bPerfil2');
            this.perfil2.setScale(0.4);
        });
        
        this.perfil2.on('pointerdown', () => {
			id=1;
            registroActivado = 1;
        });

		
		this.perfil3 = this.add.image(250, 400, 'bPerfil3').setInteractive();
        this.perfil3.setScale(0.4);

		this.perfil3.on('pointerover', () => {
            this.perfil3 = this.add.image(250, 400, 'bPerfil3Activado');
            this.perfil3.setScale(0.4);
        });
        
        this.perfil3.on('pointerout', () => {
            this.perfil3 = this.add.image(250, 400, 'bPerfil3');
            this.perfil3.setScale(0.4);
        });
        
        this.perfil3.on('pointerdown', () => {
			id=2;
            registroActivado = 1;
        });

		
		this.perfil4 = this.add.image(550, 400, 'bPerfil4').setInteractive();
        this.perfil4.setScale(0.4);

		this.perfil4.on('pointerover', () => {
            this.perfil4 = this.add.image(550, 400, 'bPerfil4Activado');
            this.perfil4.setScale(0.4);
        });
        
        this.perfil4.on('pointerout', () => {
            this.perfil4 = this.add.image(550, 400, 'bPerfil4');
            this.perfil4.setScale(0.4);
        });
        
        this.perfil4.on('pointerdown', () => {
			id=3;
            registroActivado = 1;
        });

		this.atras3 = this.add.image(75, 50, 'back').setInteractive();
        this.atras3.setScale(0.8);

        this.atras3.on('pointerover', () => {
            this.atras3 = this.add.image(75, 50, 'backActivo');
            this.atras3.setScale(0.8);
        });
        
        this.atras3.on('pointerout', () => {
            this.atras3 = this.add.image(75, 50, 'back');
            this.atras3.setScale(0.8);
        });
        
        this.atras3.on('pointerdown', () => {
	$("#perfil0").hide();
		$("#perfil1").hide();
		$("#perfil2").hide();
		$("#perfil3").hide();
            this.scene.start('SelecTipoInicio');
        });

    }

    update(){
       if(registroActivado === 1){
			this.continuarSP = this.add.image(500, 500, 'bcont3').setInteractive();
        	this.continuarSP.setScale(0.3);

        	this.continuarSP.on('pointerover', () => {
            	this.continuarSP = this.add.image(500, 500, 'bcont3Activado');
            	this.continuarSP.setScale(0.3);
        	});
        
        	this.continuarSP.on('pointerout', () => {
            	this.continuarSP = this.add.image(500, 500, 'bcont3');
            	this.continuarSP.setScale(0.3);
        	});
        
        	this.continuarSP.on('pointerdown', () => {
		$("#perfil0").hide();
		$("#perfil1").hide();
		$("#perfil2").hide();
		$("#perfil3").hide();
     			this.scene.start('MenuPrincipal');
        	});

		this.borrarSP = this.add.image(300, 500, 'bBorrarPerfil').setInteractive();
        	this.borrarSP.setScale(0.3);

        	this.borrarSP.on('pointerover', () => {
            	this.borrarSP = this.add.image(300, 500, 'bBorrarPerfilActivado');
            	this.borrarSP.setScale(0.3);
        	});
        
        	this.borrarSP.on('pointerout', () => {
            	this.borrarSP = this.add.image(300, 500, 'bBorrarPerfil');
            	this.borrarSP.setScale(0.3);
        	});
        
        	this.borrarSP.on('pointerdown', () => {
		borrarPerfil(id);
		getProfileName(0);
getProfileName(1);
getProfileName(2);
getProfileName(3);    
registroActivado=0;
        	});
		}
        }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////Pantalla de Registro////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class Registro extends Phaser.Scene{
    constructor(){
        //Regristo--> nombre que se le da a la escena
        super({ key: "Registro"});
    }

    preload(){   
    }

    create(){


             $("#nombre").show();


        //Fondo de la pantalla de registro
        this.fondoRegi= this.add.image(400, 300, 'fondoReg');
        this.fondoRegi.setScale(0.6);
        


        this.continuar = this.add.image(400, 500, 'bcont2').setInteractive();
        this.continuar.setScale(0.3);

        this.continuar.on('pointerover', () => {
            this.continuar = this.add.image(400, 500, 'bcont2Ativado');
            this.continuar.setScale(0.3);
        });
        
        this.continuar.on('pointerout', () => {
            this.continuar = this.add.image(400, 500, 'bcont2');
            this.continuar.setScale(0.3);
        });
        
        this.continuar.on('pointerdown', () => {
	$("#nombre").hide();
	
	if(profileExists0==false){
			createProfile(0);
			console.log("0json no existe");
id=0;
	}else if(profileExists1==false){
				console.log("1json no existe");

					createProfile(1);
					id=1;

	}else if(profileExists2==false){
					console.log("2json no existe");

					createProfile(2);
					id=2;

	}else if(profileExists3==false){
					console.log("3json no existe");

					createProfile(3);
					id=3;

	}else{
		     this.scene.start('SelecPerfil');
	}
	   console.log(id);
     this.scene.start('MenuPrincipal');
        });

/*
        this.datos = this.add.image(300, 500, 'bVerDatos').setInteractive();
        this.datos.setScale(0.3);

        this.datos.on('pointerover', () => {
            this.datos = this.add.image(300, 500, 'bVerDatosActivado');
            this.datos.setScale(0.3);
        });
        
        this.datos.on('pointerout', () => {
            this.datos = this.add.image(300, 500, 'bVerDatos');
            this.datos.setScale(0.3);
        });
        
        this.datos.on('pointerdown', () => {
	$("#nombre").hide();
createProfile();
            this.scene.start('Datos');
        });*/


        this.atras8 = this.add.image(75, 50, 'back').setInteractive();
        this.atras8.setScale(0.8);

        this.atras8.on('pointerover', () => {
            this.atras8 = this.add.image(75, 50, 'backActivo');
            this.atras8.setScale(0.8);
        });
        
        this.atras8.on('pointerout', () => {
            this.atras8 = this.add.image(75, 50, 'back');
            this.atras8.setScale(0.8);
        });
        
        this.atras8.on('pointerdown', () => {
	$("#nombre").hide();
            this.scene.start('SelecTipoInicio');
        });


    }

    update(){
	
 

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////Pantalla de Datos///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var player_text;
var titScore_text;
var titPersonaje_text;

/*chooseP1 = 'Chilli';
var usosChilli_ = usosChilli_ + 1;*/

class Datos extends Phaser.Scene{
    constructor(){
        //Regristo--> nombre que se le da a la escena
        super({ key: "Datos"});
    }

    preload(){   
    }

    create(){
             $("#modNombre").show();


        //Fondo de la pantalla de registro
        this.fondoD= this.add.image(400, 300, 'fondoDatos');
        this.fondoD.setScale(0.6);
        

        this.titNombre= this.add.image(400, 100, 'nombre');
        this.titNombre.setScale(0.3);
		player_text=	this.add.text(300, this.titNombre.y+20, 'Cargando', { font: '32px Courier', fill: '#ffffff' });

        this.titScore= this.add.image(400, 250, 'score');
        this.titScore.setScale(0.3);
		titScore_text=	this.add.text(400, this.titScore.y+20, 'Cargando', { font: '32px Courier', fill: '#ffffff' });


        this.titPersonaje= this.add.image(400, 450, 'PerFavorito');
        this.titPersonaje.setScale(0.3);
		titPersonaje_text=	this.add.text(350, this.titPersonaje.y+20, 'Cargando', { font: '32px Courier', fill: '#ffffff' });
		
		/*usosC_text=	this.add.text(this.titPersonaje.x, this.titPersonaje.y+40, 'Cargando', { font: '16px Courier', fill: '#ffffff' });
		usos_Chilli();*/
		
		
		this.modificar=false;

        this.atras8 = this.add.image(75, 50, 'back').setInteractive();
        this.atras8.setScale(0.8);

        this.atras8.on('pointerover', () => {
            this.atras8 = this.add.image(75, 50, 'backActivo');
            this.atras8.setScale(0.8);
        });
        
        this.atras8.on('pointerout', () => {
            this.atras8 = this.add.image(75, 50, 'back');
            this.atras8.setScale(0.8);
        });
        
        this.atras8.on('pointerdown', () => {
            //this.scene.start('Registro');
            this.scene.start('MenuPrincipal');

             $("#modNombre").hide();

        });


        this.mod = this.add.image(600, 175, 'bModificar').setInteractive();
        this.mod.setScale(0.25);

        this.mod.on('pointerover', () => {
            this.mod = this.add.image(600, 175, 'bModificarActivado');
            this.mod.setScale(0.25);
        });
        
        this.mod.on('pointerout', () => {
            this.mod = this.add.image(600, 175, 'bModificar');
            this.mod.setScale(0.25);
        });
        
        this.mod.on('pointerdown', () => {
	console.log("modicar down");
            			this.modificar=true;

        });


    }

    update(){
if(player_text.text==='Cargando'){
	$(document).ready(function () {

                $.ajax({

                    type: "GET",
                    url: "http://"+url+":8080/player/name/"+id,
                    dataType: "text"

                }).fail(function () {
			//console.log("error get lista jugadores");

                    fallosServidor += 1;
                    if (fallosServidor > 2) {

                        errorServidor = "Servidor desconectado";
					//console.log(errorServidor);

                    }
                }).done(function (data) {
                    errorServidor = "Servidor conectado";
                    fallosServidor = 0;

                    player_text.setText(data);
                })

            });
}
if(titScore_text.text==='Cargando'){
	$(document).ready(function () {

                $.ajax({

                    type: "GET",
                    url: "http://"+url+":8080/player/maxpuntuacion/"+id,
                    dataType: "text"

                }).fail(function () {
			//console.log("error get lista jugadores");

                    fallosServidor += 1;
                    if (fallosServidor > 2) {

                        errorServidor = "Servidor desconectado";
					//console.log(errorServidor);

                    }
                }).done(function (data) {
                    errorServidor = "Servidor conectado";
                    fallosServidor = 0;

                    titScore_text.setText(data);
					puntuacion_profile=data;
                })

            });
}
if(titPersonaje_text.text==='Cargando'){
	$(document).ready(function () {

                $.ajax({

                    type: "GET",
                    url: "http://"+url+":8080/player/pjfav/"+id,
                    dataType: "text"

                }).fail(function () {
			//console.log("error get lista jugadores");

                    fallosServidor += 1;
                    if (fallosServidor > 2) {

                        errorServidor = "Servidor desconectado";
					//console.log(errorServidor);

                    }
                }).done(function (data) {
                    errorServidor = "Servidor conectado";
                    fallosServidor = 0;

                    titPersonaje_text.setText(data);
					pj_fav_profile=data;
                })

            });
}
	
	if(this.modificar===true){
		console.log("entra a modificar")
		 $(document).ready(function () {


                var data = {

                    name: $("#modNombre").val(),
					
                };
                $.ajax({
	
                    type: "PUT",
                    url: "http://"+url+":8080/player/name/"+id,
                    data: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    dataType:"json"


                }).done(function (data) {
	console.log("nombre devuelto del put "+data);
		//player_text.setText(data);
                }).fail(function(data, textStatus){
					console.log(textStatus);
				});
            });
		$(document).ready(function () {

                $.ajax({

                    type: "GET",
                    url: "http://"+url+":8080/player/name/"+id,
                    dataType: "text"

                }).fail(function () {
			//console.log("error get lista jugadores");

                    fallosServidor += 1;
                    if (fallosServidor > 2) {

                        errorServidor = "Servidor desconectado";
					//console.log(errorServidor);

                    }
                }).done(function (data) {
                    errorServidor = "Servidor conectado";
                    fallosServidor = 0;
					console.log("no,bre devuelto por el segundo get "+data);
                    player_text.setText(data);
                })

            });
			this.modificar=false;

	}

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////Pantalla de Menú Principal/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class MenuPrincipal extends Phaser.Scene{
    constructor(){
        //Inicio--> nombre que se le da a la escena
        super({ key: "MenuPrincipal"});
    }

    preload(){   
    }

    create(){
		//Chat
		if(id!=null){
			getProfileName(id);
		getPuntuacion(id);
		}
		
		updateMessage();
		$("#chat").show();
		$("#message").show();
		$("#send").show();
		

        //Fondo del menú principal
        this.fondoMP= this.add.image(400, 300, 'fondoMenuPrincipal');
        this.fondoMP.setScale(0.6);

        this.title2 = this.add.image(400, 150, 'titleMP');
        this.title2.setScale(0.3);

        this.jug = this.add.image(250, 350, 'bJugar').setInteractive();
        this.jug.setScale(0.3);

        this.jug.on('pointerover', () => {
            this.jug = this.add.image(250, 350, 'bJugarActivado');
            this.jug.setScale(0.3);
        });
        
        this.jug.on('pointerout', () => {
            this.jug = this.add.image(250, 350, 'bJugar');
            this.jug.setScale(0.3);
        });
        
        this.jug.on('pointerdown', () => {
		$("#chat").hide();
		$("#message").hide();
		$("#send").hide();
            this.scene.start('ModoJuego');
        });

        this.control = this.add.image(250, 450, 'bControles').setInteractive();
        this.control.setScale(0.3);

        this.control.on('pointerover', () => {
            this.control = this.add.image(250, 450, 'bControlesActivado');
            this.control.setScale(0.3);
        });
        
        this.control.on('pointerout', () => {
            this.control = this.add.image(250, 450, 'bControles');
            this.control.setScale(0.3);
        });
        
        this.control.on('pointerdown', () => {
		$("#chat").hide();
		$("#message").hide();
		$("#send").hide();
            this.scene.start('Controles');
        });

        this.cred = this.add.image(550, 350, 'bCreditos').setInteractive();
        this.cred.setScale(0.3);

        this.cred.on('pointerover', () => {
            this.cred = this.add.image(550, 350, 'bCreditosActivado');
            this.cred.setScale(0.3);
        });
        
        this.cred.on('pointerout', () => {
            this.cred = this.add.image(550, 350, 'bCreditos');
            this.cred.setScale(0.3);
        });
        
        this.cred.on('pointerdown', () => {
		$("#chat").hide();
		$("#message").hide();
		$("#send").hide();
            this.scene.start('Creditos');
        });

        this.datos2 = this.add.image(550, 450, 'bVerDatos2').setInteractive();
        this.datos2.setScale(0.3);
		
		this.datos2.on('pointerover', () => {
            this.datos2 = this.add.image(550, 450, 'bVerDatosActivado2');
            this.datos2.setScale(0.3);
        });
        
        this.datos2.on('pointerout', () => {
            this.datos2 = this.add.image(550, 450, 'bVerDatos2');
            this.datos2.setScale(0.3);
        });
        
        this.datos2.on('pointerdown', () => {
		$("#chat").hide();
		$("#message").hide();
		$("#send").hide();
            this.scene.start('Datos');
        });


        this.ayud = this.add.image(750, 50, 'ayuda').setInteractive();
        this.ayud.setScale(0.6);

        this.ayud.on('pointerover', () => {
            this.ayud = this.add.image(750, 50, 'ayudaActivado');
            this.ayud.setScale(0.6);
        });
        
        this.ayud.on('pointerout', () => {
            this.ayud = this.add.image(750, 50, 'ayuda');
            this.ayud.setScale(0.6);
        });
        
        this.ayud.on('pointerdown', () => {
		$("#chat").hide();
		$("#message").hide();
		$("#send").hide();
            this.scene.moveBelow('MenuPrincipal');
            this.scene.launch('Ayuda'); 
        });


        this.atras = this.add.image(75, 50, 'back').setInteractive();
        this.atras.setScale(0.8);

        this.atras.on('pointerover', () => {
            this.atras = this.add.image(75, 50, 'backActivo');
            this.atras.setScale(0.8);
        });
        
        this.atras.on('pointerout', () => {
            this.atras = this.add.image(75, 50, 'back');
            this.atras.setScale(0.8);
        });
        
        this.atras.on('pointerdown', () => {
		$("#chat").hide();
		$("#message").hide();
		$("#send").hide();
            this.scene.start('SelecTipoInicio');
        });

    }

    update(){
if(id!=null){

           getProfileName(id);
    }
}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////Pantalla de Controles////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class Controles extends Phaser.Scene{
    constructor(){
        //Inicio--> nombre que se le da a la escena
        super({ key: "Controles"});
    }

    preload(){   
    }

    create(){
        
        //Fondo de la pantalla de controles
        this.fondoCont= this.add.image(400, 300, 'fondoControles');
        this.fondoCont.setScale(0.6);

        this.tituloCont = this.add.image(400, 100, 'TitControles');
        this.tituloCont.setScale(0.6);

        this.expl = this.add.image(275, 300, 'explicacion');
        this.expl.setScale(0.55);

        this.mov = this.add.image(650, 200, 'TitMovimiento');
        this.mov.setScale(0.6);

        this.salt = this.add.image(650, 325, 'TitSalto');
        this.salt.setScale(0.6);

        this.dispHab = this.add.image(570, 450, 'TitDispHab');
        this.dispHab.setScale(0.6);

        this.tEsp = this.add.image(570, 375, 'teclaEspacio');
        this.tEsp.setScale(0.45);

        this.Shi = this.add.image(710, 375, 'teclaShift');
        this.Shi.setScale(0.45);

        this.tMov = this.add.image(580,250, 'teclaMovimiento');
        this.tMov.setScale(0.35);

        this.tMovJug2 = this.add.image(720, 250, 'teclaMovimientoJug2');
        this.tMovJug2.setScale(0.35);

        this.tecQ = this.add.image(450, 500, 'teclaQ');
        this.tecQ.setScale(0.5);

        this.tecE = this.add.image(530, 500, 'teclaE');
        this.tecE.setScale(0.5);

        this.tecO = this.add.image(610, 500, 'teclaO');
        this.tecO.setScale(0.5);

        this.tecU = this.add.image(690, 500, 'teclaU');
        this.tecU.setScale(0.5);



        this.atras6 = this.add.image(75, 50, 'back').setInteractive();
        this.atras6.setScale(0.8);

        this.atras6.on('pointerover', () => {
            this.atras6 = this.add.image(75, 50, 'backActivo');
            this.atras6.setScale(0.8);
        });
        
        this.atras6.on('pointerout', () => {
            this.atras6 = this.add.image(75, 50, 'back');
            this.atras6.setScale(0.8);
        });
        
        this.atras6.on('pointerdown', () => {
            this.scene.start('MenuPrincipal');
        });

    }

    update(){

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////Pantalla de Créditos////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Creditos extends Phaser.Scene{
    constructor(){
        //Creditos--> nombre que se le da a la escena
        super({ key: "Creditos"});
    }

    preload(){   
    }

    create(){
       //Fondo de la pantalla de créditos
        this.fondoCred= this.add.image(400, 300, 'fondoCreditos');
        this.fondoCred.setScale(0.6);

        this.atras7 = this.add.image(75, 50, 'back').setInteractive();
        this.atras7.setScale(0.8);

        this.atras7.on('pointerover', () => {
            this.atras7 = this.add.image(75, 50, 'backActivo');
            this.atras7.setScale(0.8);
        });
        
        this.atras7.on('pointerout', () => {
            this.atras7 = this.add.image(75, 50, 'back');
            this.atras7.setScale(0.8);
        });
        
        this.atras7.on('pointerdown', () => {
            this.scene.start('MenuPrincipal');
        });

        this.titleCred = this.add.image(160, 175, 'TituloCred');
        this.titleCred.setScale(0.2);


        this.nombreEq = this.add.image(160, 275, 'titEquipo');
        this.nombreEq.setScale(0.6);

        this.miem = this.add.image(160, 425, 'miembros');
        this.miem.setScale(0.5);

        this.assetEx = this.add.image(550, 150, 'assetsExternos');
        this.assetEx.setScale(0.6);

        this.ext1 = this.add.image(550, 200, 'tex1');
        this.ext1.setScale(0.4);
        this.ext2 = this.add.image(550, 250, 'tex2');
        this.ext2.setScale(0.4);
        this.ext3 = this.add.image(550, 300, 'tex3');
        this.ext3.setScale(0.4);
        this.ext4 = this.add.image(550, 350, 'tex4');
        this.ext4.setScale(0.4);
        this.ext5 = this.add.image(550, 400, 'tex5');
        this.ext5.setScale(0.4);
        this.ext6 = this.add.image(550, 450, 'tex6');
        this.ext6.setScale(0.4);
        this.ext7 = this.add.image(550, 500, 'tex7');
        this.ext7.setScale(0.4);

    }

    update(){
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////Pantalla de Ayuda//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Ayuda extends Phaser.Scene{
    constructor(){
        //Ayuda--> nombre que se le da a la escena
        super({ key: "Ayuda"});
    }

    preload(){   
    }

    create(){


        this.fondoA = this.add.image(400, 300, 'fondoAyuda');
        this.fondoA.setScale(0.6);

        this.titleAyud = this.add.image(400, 100, 'titAyuda');
        this.titleAyud.setScale(0.6);

        this.atras7 = this.add.image(75, 50, 'back').setInteractive();
        this.atras7.setScale(0.8);

        this.atras7.on('pointerover', () => {
            this.atras7 = this.add.image(75, 50, 'backActivo');
            this.atras7.setScale(0.8);
        });
        
        this.atras7.on('pointerout', () => {
            this.atras7 = this.add.image(75, 50, 'back');
            this.atras7.setScale(0.8);
        });
        
        this.atras7.on('pointerdown', () => {
            this.scene.moveBelow('Ayuda');
            this.scene.stop('Ayuda');
        });

        this.textoContacto = this.add.image(400, 250, 'texto1');
        this.textoContacto.setScale(0.55);

        this.textoDir = this.add.image(400, 400, 'texto2');
        this.textoDir.setScale(0.55);

        this.textoContacto1 = this.add.image(400, 500, 'texto3');
        this.textoContacto1.setScale(0.55);

    }

    update(){
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////Pantalla de Pausa//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var sleepE1 = 'false';
var sleepE2 = 'false';
var sleepE3 = 'false';

class Pausa extends Phaser.Scene{
    constructor(){
        //Ayuda--> nombre que se le da a la escena
        super({ key: "Pausa"});
    }

    preload(){   
    }

    create(){


        this.fondoP = this.add.image(400, 300, 'fondoPausa');
        this.fondoP.setScale(0.6);

        this.titP = this.add.image(400, 200, 'tituloPausa');
        this.titP.setScale(0.55);

        //Continuar partida
        this.contp = this.add.image(250, 450, 'bResume').setInteractive();
        this.contp.setScale(0.35);

        
        this.contp.on('pointerover', () => {
            this.contp = this.add.image(250, 450, 'bResumeActivado');
            this.contp.setScale(0.35);
        });

        this.contp.on('pointerout', () => {
            this.contp = this.add.image(250, 450, 'bResume');
            this.contp.setScale(0.35);
        });

        this.contp.on('pointerdown', () => {
        
            if(sleepE1 === 'true'){
                this.scene.moveAbove('Escenario1');
                this.scene.wake('Escenario1');
                this.scene.stop('Pausa');

            } else if(sleepE2 === 'true'){
                this.scene.moveAbove('Escenario2');
                this.scene.wake('Escenario2');
                this.scene.stop('Pausa');

            } else if(sleepE3 === 'true'){
                this.scene.moveAbove('Escenario3');
                this.scene.wake('Escenario3');
                this.scene.stop('Pausa');
            }
            
            
        });
        

        //Volver a empezar
        this.restart = this.add.image(550, 450, 'bRestart').setInteractive();
        this.restart.setScale(0.35);

        
        this.restart.on('pointerover', () => {
            this.restart = this.add.image(550, 450, 'bRestartActivado');
            this.restart.setScale(0.35);
        });

        this.restart.on('pointerout', () => {
            this.restart = this.add.image(550, 450, 'bRestart');
            this.restart.setScale(0.35);
        });

        this.restart.on('pointerdown', () => {
            this.scene.start('MenuPrincipal');
            
            
        });


    }

    update(){
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////Pantalla de Modo de Juego//////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class PantallaModoJuego extends Phaser.Scene{
    constructor(){
        //Inicio--> nombre que se le da a la escena
        super({ key: "ModoJuego"});
    }

    preload(){   
    }

    create(){
         //Fondo del menú principal
        this.fondoMJ= this.add.image(400, 300, 'fondoModoJuego');
        this.fondoMJ.setScale(0.6);

        this.titleMJuego = this.add.image(400, 150, 'titleMJ');
        this.titleMJuego.setScale(0.3);


        this.ayud2 = this.add.image(750, 50, 'ayuda').setInteractive();
        this.ayud2.setScale(0.6);

        this.ayud2.on('pointerover', () => {
            this.ayud2 = this.add.image(750, 50, 'ayudaActivado');
            this.ayud2.setScale(0.6);
        });
        
        this.ayud2.on('pointerout', () => {
            this.ayud2 = this.add.image(750, 50, 'ayuda');
            this.ayud2.setScale(0.6);
        });
        
        this.ayud2.on('pointerdown', () => {
            this.scene.moveBelow('ModoJuego');
            this.scene.launch('Ayuda'); 
        });


        this.atras2 = this.add.image(75, 50, 'back').setInteractive();
        this.atras2.setScale(0.8);

        this.atras2.on('pointerover', () => {
            this.atras2 = this.add.image(75, 50, 'backActivo');
            this.atras2.setScale(0.8);
        });
        
        this.atras2.on('pointerout', () => {
            this.atras2 = this.add.image(75, 50, 'back');
            this.atras2.setScale(0.8);
        });
        
        this.atras2.on('pointerdown', () => {
            this.scene.start('MenuPrincipal');
        });


        this.IcLocal = this.add.image(200, 300, 'iconoLocal');
        this.IcLocal.setScale(0.4);

         this.IcLinea = this.add.image(600, 300, 'iconoRed');
        this.IcLinea.setScale(0.4);

        this.texLocal = this.add.image(200, 400, 'textoLocal');
        this.texLocal.setScale(0.5);

        this.texLinea = this.add.image(600, 400, 'textoLinea');
        this.texLinea.setScale(0.5);

        this.botLinea = this.add.image(600, 500, 'bJugarLinea').setInteractive();
        this.botLinea.setScale(0.3);
 		this.botLinea.on('pointerdown', () => {
	  		connection.send(JSON.stringify("Estableciendo conexion"));
        this.scene.start('NumeroJugadores');
        });





        this.botLocal = this.add.image(200, 500, 'bJugarLocal').setInteractive();
        this.botLocal.setScale(0.3);

        this.botLocal.on('pointerover', () => {
            this.botLocal = this.add.image(200, 500, 'bJugarLocalActivado');
            this.botLocal.setScale(0.3);
        });
        
        this.botLocal.on('pointerout', () => {
            this.botLocal = this.add.image(200, 500, 'bJugarLocal');
            this.botLocal.setScale(0.3);
        });
        
        this.botLocal.on('pointerdown', () => {
            this.scene.start('NumeroJugadores');
        });

    }

    update(){
		
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////Pantalla Elección Número de Jugadores//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class PantallaNumeroJugadores extends Phaser.Scene{
    constructor(){
        //NumeroJugadores--> nombre que se le da a la escena
        super({ key: "NumeroJugadores"});
    }

    preload(){   
    }

    create(){
        //Fondo de la pantalla de elección de número de jugadores
        this.fondoNJ= this.add.image(400, 300, 'fondoNumeroJugadores');
        this.fondoNJ.setScale(0.6);

        this.titleNJ = this.add.image(400, 150, 'titleNJ');
        this.titleNJ.setScale(0.3);


        this.ayud3 = this.add.image(750, 50, 'ayuda').setInteractive();
        this.ayud3.setScale(0.6);

        this.ayud3.on('pointerover', () => {
            this.ayud3 = this.add.image(750, 50, 'ayudaActivado');
            this.ayud3.setScale(0.6);
        });
        
        this.ayud3.on('pointerout', () => {
            this.ayud3 = this.add.image(750, 50, 'ayuda');
            this.ayud3.setScale(0.6);
        });
        
        this.ayud3.on('pointerdown', () => {
            this.scene.moveBelow('NumeroJugadores');
            this.scene.launch('Ayuda'); 
        });


        this.atras3 = this.add.image(75, 50, 'back').setInteractive();
        this.atras3.setScale(0.8);

        this.atras3.on('pointerover', () => {
            this.atras3 = this.add.image(75, 50, 'backActivo');
            this.atras3.setScale(0.8);
        });
        
        this.atras3.on('pointerout', () => {
            this.atras3 = this.add.image(75, 50, 'back');
            this.atras3.setScale(0.8);
        });
        
        this.atras3.on('pointerdown', () => {
            this.scene.start('ModoJuego');
        });


        this.textoNumJug= this.add.image(400, 300, 'textoNJ');
        this.textoNumJug.setScale(0.5);

        this.DosJugadores= this.add.image(200, 450, '2J').setInteractive();
        this.DosJugadores.setScale(0.4);

        this.DosJugadores.on('pointerover', () => {
            this.DosJugadores = this.add.image(200, 450, '2JActivo');
            this.DosJugadores.setScale(0.4);
        });
        
        this.DosJugadores.on('pointerout', () => {
            this.DosJugadores = this.add.image(200, 450, '2J');
            this.DosJugadores.setScale(0.4);
        });
        
        this.DosJugadores.on('pointerdown', () => {
            this.scene.start('MenuPersonajes');
        });

        this.TresJugadores= this.add.image(400, 450, '3J');
        this.TresJugadores.setScale(0.4);

        this.CuatroJugadores= this.add.image(600, 450, '4J');
        this.CuatroJugadores.setScale(0.4);


    }

    update(){

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////Variables Selección de personajes//////
var chooseP1;
var chooseP2;
var scene4update;

//////////////////////////////////////Pantalla de Selección de Personajes///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class MenuPersonajes extends Phaser.Scene{
    constructor(){
        //MenuPersonajes--> nombre que se le da a la escena
        super({ key: "MenuPersonajes"});
    }

    

    preload(){

    }


    create(){
scene4update=this;
       chooseP1='null';
		chooseP2='null';
		if(!bg_music_selection_screen.isPlaying){
			bg_music_selection_screen.setLoop(true);
        	bg_music_selection_screen.play();
		}

        //Fondo de la pantalla de selección de personaje
        this.fondoPer= this.add.image(400, 300, 'fondoPersonajes');
        this.fondoPer.setScale(0.6);

        this.titlePer = this.add.image(400, 75, 'elegirPers');
        this.titlePer.setScale(0.6);

        this.ayud4 = this.add.image(750, 50, 'ayuda').setInteractive();
        this.ayud4.setScale(0.6);

        this.ayud4.on('pointerover', () => {
            this.ayud4 = this.add.image(750, 50, 'ayudaActivado');
            this.ayud4.setScale(0.6);
        });
        
        this.ayud4.on('pointerout', () => {
            this.ayud4 = this.add.image(750, 50, 'ayuda');
            this.ayud4.setScale(0.6);
        });
        
        this.ayud4.on('pointerdown', () => {
            this.scene.moveBelow('MenuPersonajes');
            this.scene.launch('Ayuda'); 
        });


        this.atras4 = this.add.image(75, 50, 'back').setInteractive();
        this.atras4.setScale(0.8);

        this.atras4.on('pointerover', () => {
            this.atras4 = this.add.image(75, 50, 'backActivo');
            this.atras4.setScale(0.8);
        });
        
        this.atras4.on('pointerout', () => {
            this.atras4 = this.add.image(75, 50, 'back');
            this.atras4.setScale(0.8);
        });
        
        this.atras4.on('pointerdown', () => {
            this.scene.start('NumeroJugadores');
        });



        //Chilli
        this.per1 = this.add.image(150, 400, 'selectChilli').setInteractive();
        this.per1.setScale(1.5);

        this.nombChilli = this.add.image(150, 325, 'nomChilli');
        this.nombChilli.setScale(0.6);

        //Eventos del botón
        this.per1.on('pointerover', () => {
            this.per1.setScale(2);
            if(chooseP1==='Chilli'||chooseP2==='Chilli' ||chooseP1!=='null'&&chooseP2!=='null'){
                if(this.texPer1!=='undefined'){
                this.texPer1.destroy();
                }
            } else{
                this.texPer1 = this.add.image(400, 200, 'text1');
                this.texPer1.setScale(1.4);
            }
        });

        this.per1.on('pointerout', () => {
            this.per1.setScale(1.5);
            this.texPer1.destroy();
        });



        this.per1.on('pointerdown', () => {
	if(!pjPropioSelec){
            if(chooseP1==='null'&&chooseP2==='null'){
				if(online){
					selectPlayer.send(JSON.stringify("Chilli-P1"));
					pjPropioSelec=true;
									cargoPj="player1";
				}
				chooseP1='Chilli';
				this.per1.destroy();
                this.texPer1.destroy();
                this.jug1 = this.add.image(150, 400, 'jugador1');
                this.jug1.setScale(0.4);
                this.per1 = this.add.image(150, 400, 'selectChilli');
                this.per1.setScale(1.6);
				
			}
			if(chooseP2==='null'&&chooseP1!=='Chilli'){
				if(online){
					selectPlayer.send(JSON.stringify("Chilli-P2"));
										pjPropioSelec=true;
				cargoPj="player2";

				}
				chooseP2='Chilli';
                this.per1.destroy();
                this.texPer1.destroy();
                this.jug2 = this.add.image(150, 400, 'jugador2');
                this.jug2.setScale(0.4);
                this.per1 = this.add.image(150, 400, 'selectChilli');
                this.per1.setScale(1.6);
				
                //Botón continuar
                this.bcont1=this.add.image(400, 550, 'BContinuar1').setInteractive();
                this.bcont1.setScale(0.3);

                this.bcont1.on('pointerover', () => {
                    this.bcont1 = this.add.image(400, 550, 'BContinuar1Activado');
                    this.bcont1.setScale(0.3);
                });
        
                this.bcont1.on('pointerout', () => {
                    this.bcont1 = this.add.image(400, 550, 'BContinuar1');
                    this.bcont1.setScale(0.3);
                });
        
                this.bcont1.on('pointerdown', () => {
                    this.scene.start('MenuEscenarios');
                });
			
			}
			}
        });
    

        //Bernie
        this.per2 = this.add.image(400, 400, 'selectBernie').setInteractive();
        this.per2.setScale(1.5);

        this.nombBernie = this.add.image(400, 325, 'nomBernie');
        this.nombBernie.setScale(0.6);

        //Eventos del botón
        this.per2.on('pointerover', () => {
            this.per2.setScale(2);
            
           if(chooseP1==='Bernie'||chooseP2==='Bernie' ||chooseP1!=='null'&&chooseP2!=='null'){
                if(this.texPer2!=='undefined'){
                    this.texPer2.destroy();
                }
                this.texPer2.destroy();
            } else{
                this.texPer2 = this.add.image(400, 200, 'text2');
                this.texPer2.setScale(1.4);
            }
            
        });

        this.per2.on('pointerout', () => {
            this.per2.setScale(1.5);
            this.texPer2.destroy();
        });

        this.per2.on('pointerdown', () => {
	if(!pjPropioSelec){
            if(chooseP1==='null'&&chooseP2==='null'){
				if(online){
					selectPlayer.send(JSON.stringify("Bernie-P1"));
					pjPropioSelec=true;
				cargoPj="player1";

				}
				chooseP1='Bernie';
                this.per2.destroy();
                this.texPer2.destroy()
                this.jug1 = this.add.image(400, 400, 'jugador1');
                this.jug1.setScale(0.4);
                this.per2 = this.add.image(400, 400, 'selectBernie');
                this.per2.setScale(1.6);
				
				
			}
			if(chooseP2==='null'&&chooseP1!=='Bernie'){
				if(online){
					selectPlayer.send(JSON.stringify("Bernie-P2"));
										pjPropioSelec=true;
				cargoPj="player2";

				}
				chooseP2='Bernie';
                this.per2.destroy();
                this.texPer2.destroy();
                this.jug2 = this.add.image(400, 400, 'jugador2');
                this.jug2.setScale(0.4);
                this.per2 = this.add.image(400, 400, 'selectBernie');
                this.per2.setScale(1.6);
				

                //Botón continuar
                this.bcont1=this.add.image(400, 550, 'BContinuar1').setInteractive();
                this.bcont1.setScale(0.3);

                this.bcont1.on('pointerover', () => {
                    this.bcont1 = this.add.image(400, 550, 'BContinuar1Activado');
                    this.bcont1.setScale(0.3);
                });
        
                this.bcont1.on('pointerout', () => {
                    this.bcont1 = this.add.image(400, 550, 'BContinuar1');
                    this.bcont1.setScale(0.3);
                });
        
                this.bcont1.on('pointerdown', () => {
                    this.scene.start('MenuEscenarios');
                });
		  		
			}
			}
         });

        //Wasabi
        this.per3 = this.add.image(650, 400, 'selectWasabi').setInteractive();
        this.per3.setScale(1.5);

        this.nombWasabi = this.add.image(650, 325, 'nomWasabi');
        this.nombWasabi.setScale(0.6);

        //Eventos del botón
        this.per3.on('pointerover', () => {
            this.per3.setScale(2);
            if(chooseP1==='Wasabi'||chooseP2==='Wasabi' ||chooseP1!=='null'&&chooseP2!=='null'){
                if(this.texPer3!=='undefined'){
                    this.texPer3.destroy();
                }
            }else{
                this.texPer3 = this.add.image(400, 200, 'text3');
                this.texPer3.setScale(1.4);
            }

        });

        this.per3.on('pointerout', () => {
            this.per3.setScale(1.5);
            this.texPer3.destroy();
        });

        this.per3.on('pointerdown', () => {
	if(!pjPropioSelec){
            if(chooseP1==='null'&&chooseP2==='null'){
				if(online){
					selectPlayer.send(JSON.stringify("Wasabi-P1"));
					pjPropioSelec=true;
				cargoPj="player1";

				}
				chooseP1='Wasabi';
                this.per3.destroy();
                this.texPer3.destroy();
                this.jug1 = this.add.image(650, 400, 'jugador1');
                this.jug1.setScale(0.4);
                this.per3 = this.add.image(650, 400, 'selectWasabi');
                this.per3.setScale(1.6);
				
			
			}
			if(chooseP2==='null'&&chooseP1!=='Wasabi'){
				if(online){
					selectPlayer.send(JSON.stringify("Wasabi-P2"));
										pjPropioSelec=true;
				cargoPj="player2";

				}
				chooseP2='Wasabi';
                this.per3.destroy();
                this.texPer3.destroy();
                this.jug2 = this.add.image(650, 400, 'jugador2');
                this.jug2.setScale(0.4);
                this.per3 = this.add.image(650, 400, 'selectWasabi');
                this.per3.setScale(1.6);
				
                //Botón continuar
                this.bcont1=this.add.image(400, 550, 'BContinuar1').setInteractive();
                this.bcont1.setScale(0.3);

                this.bcont1.on('pointerover', () => {
                    this.bcont1 = this.add.image(400, 550, 'BContinuar1Activado');
                    this.bcont1.setScale(0.3);
                });
        
                this.bcont1.on('pointerout', () => {
                    this.bcont1 = this.add.image(400, 550, 'BContinuar1');
                    this.bcont1.setScale(0.3);
                });
        
                this.bcont1.on('pointerdown', () => {
                    this.scene.start('MenuEscenarios');
                });
			
			}
			}
        });
    }
	update(){
		if(online){
			selectPlayer.onmessage = function(msg) {
			console.log(JSON.parse(msg.data));
			if(JSON.parse(msg.data)==='Chilli-P1'){
				chooseP1='Chilli';
				scene4update.per1.destroy();
               // scene4update.texPer1.destroy();

                scene4update.jug1 = scene4update.add.image(150, 400, 'jugador1');
                scene4update.jug1.setScale(0.4);
                scene4update.per1 = scene4update.add.image(150, 400, 'selectChilli');
                scene4update.per1.setScale(1.6);
			}
			if(JSON.parse(msg.data)==='Chilli-P2'){
				chooseP2='Chilli';
                scene4update.per1.destroy();
               // scene4update.texPer1.destroy();
                scene4update.jug2 = scene4update.add.image(150, 400, 'jugador2');
                scene4update.jug2.setScale(0.4);
                scene4update.per1 = scene4update.add.image(150, 400, 'selectChilli');
                scene4update.per1.setScale(1.6);

                //Botón continuar
                scene4update.bcont1=scene4update.add.image(400, 550, 'BContinuar1').setInteractive();
                scene4update.bcont1.setScale(0.3);

                scene4update.bcont1.on('pointerover', () => {
                    scene4update.bcont1 = scene4update.add.image(400, 550, 'BContinuar1Activado');
                    scene4update.bcont1.setScale(0.3);
                });
        
                scene4update.bcont1.on('pointerout', () => {
                    scene4update.bcont1 = scene4update.add.image(400, 550, 'BContinuar1');
                    scene4update.bcont1.setScale(0.3);
                });
        
                scene4update.bcont1.on('pointerdown', () => {
                    scene4update.scene.start('MenuEscenarios');
                });
			}
			if(JSON.parse(msg.data)==="Bernie-P1"){
				chooseP1='Bernie';
                scene4update.per2.destroy();
                //scene4update.texPer2.destroy()
                scene4update.jug1 = scene4update.add.image(400, 400, 'jugador1');
                scene4update.jug1.setScale(0.4);
                scene4update.per2 = scene4update.add.image(400, 400, 'selectBernie');
                scene4update.per2.setScale(1.6);

			}
			if(JSON.parse(msg.data)==="Bernie-P2"){
				chooseP2='Bernie';
                scene4update.per2.destroy();
               // scene4update.texPer2.destroy();
                scene4update.jug2 = scene4update.add.image(400, 400, 'jugador2');
                scene4update.jug2.setScale(0.4);
                scene4update.per2 = scene4update.add.image(400, 400, 'selectBernie');
                scene4update.per2.setScale(1.6);


                //Botón continuar
                scene4update.bcont1=scene4update.add.image(400, 550, 'BContinuar1').setInteractive();
                scene4update.bcont1.setScale(0.3);

                scene4update.bcont1.on('pointerover', () => {
                    scene4update.bcont1 = scene4update.add.image(400, 550, 'BContinuar1Activado');
                    scene4update.bcont1.setScale(0.3);
                });
        
                scene4update.bcont1.on('pointerout', () => {
                    scene4update.bcont1 = scene4update.add.image(400, 550, 'BContinuar1');
                    scene4update.bcont1.setScale(0.3);
                });
        
                scene4update.bcont1.on('pointerdown', () => {
                    scene4update.scene.start('MenuEscenarios');
                });
			}
			if(JSON.parse(msg.data)==="Wasabi-P1"){
				chooseP1='Wasabi';
                scene4update.per3.destroy();
               // scene4update.texPer3.destroy();
                scene4update.jug1 = scene4update.add.image(650, 400, 'jugador1');
                scene4update.jug1.setScale(0.4);
                scene4update.per3 = scene4update.add.image(650, 400, 'selectWasabi');
                scene4update.per3.setScale(1.6);

			}
			if(JSON.parse(msg.data)==="Wasabi-P2"){
				chooseP2='Wasabi';
                scene4update.per3.destroy();
                //scene4update.texPer3.destroy();
                scene4update.jug2 = scene4update.add.image(650, 400, 'jugador2');
                scene4update.jug2.setScale(0.4);
                scene4update.per3 = scene4update.add.image(650, 400, 'selectWasabi');
                scene4update.per3.setScale(1.6);

                //Botón continuar
                scene4update.bcont1=scene4update.add.image(400, 550, 'BContinuar1').setInteractive();
                scene4update.bcont1.setScale(0.3);

                scene4update.bcont1.on('pointerover', () => {
                    scene4update.bcont1 = scene4update.add.image(400, 550, 'BContinuar1Activado');
                    scene4update.bcont1.setScale(0.3);
                });
        
                scene4update.bcont1.on('pointerout', () => {
                    scene4update.bcont1 = scene4update.add.image(400, 550, 'BContinuar1');
                    scene4update.bcont1.setScale(0.3);
                });
        
                scene4update.bcont1.on('pointerdown', () => {
                    scene4update.scene.start('MenuEscenarios');
                });
			}
console.log("chooseP1: "+chooseP1);
console.log("chooseP2: "+chooseP2);

	}
		}
		
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////Pantalla de Selección de Escenario///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class MenuEscenarios extends Phaser.Scene{
    constructor(){
        //MenuEscenarios--> nombre que se le da a la escena
        super({ key: "MenuEscenarios"});
    }

    preload(){
    }

    create(){
        //Fondo de la pantalla de selección de escenario
        this.fondoME= this.add.image(400, 300, 'fondoMenu1');
        this.fondoME.setScale(1.6);

        //Texto en forma de imagen
        this.tex1= this.add.image(400, 100, 'textoSelectE');
        this.tex1.setScale(0.6);

        this.ayud5 = this.add.image(750, 50, 'ayuda').setInteractive();
        this.ayud5.setScale(0.6);

        this.ayud5.on('pointerover', () => {
            this.ayud5 = this.add.image(750, 50, 'ayudaActivado');
            this.ayud5.setScale(0.6);
        });
        
        this.ayud5.on('pointerout', () => {
            this.ayud5 = this.add.image(750, 50, 'ayuda');
            this.ayud5.setScale(0.6);
        });
        
        this.ayud5.on('pointerdown', () => {
            this.scene.moveBelow('MenuEscenarios');
            this.scene.launch('Ayuda'); 
        });


        this.atras5 = this.add.image(75, 50, 'back').setInteractive();
        this.atras5.setScale(0.8);

        this.atras5.on('pointerover', () => {
            this.atras5 = this.add.image(75, 50, 'backActivo');
            this.atras5.setScale(0.8);
        });
        
        this.atras5.on('pointerout', () => {
            this.atras5 = this.add.image(75, 50, 'back');
            this.atras5.setScale(0.8);
        });
        
        this.atras5.on('pointerdown', () => {
            this.scene.start('MenuPersonajes');
        });

        this.es1 = this.add.image(150, 300, 'Campo').setInteractive();
        this.es1.setScale(0.5);


        this.es1.on('pointerover', () => {
            this.es1 = this.add.image(150, 300, 'CampoActivado');
            this.es1.setScale(0.5);
        });

        this.es1.on('pointerout', () => {
            this.es1 = this.add.image(150, 300, 'Campo');
            this.es1.setScale(0.5);
        });

        this.es1.on('pointerdown', () => {
            this.scene.start('Escenario1');
            bg_music_selection_screen.setLoop(false);
            bg_music_selection_screen.stop();
        });



        this.es2 = this.add.image(400, 300, 'Lava');
        this.es2.setScale(0.33);

        
        /*this.es2.on('pointerover', () => {
            this.es2 = this.add.image(400, 300, 'LavaActivado');
            this.es2.setScale(0.5);
        });

        this.es2.on('pointerout', () => {
            this.es2 = this.add.image(400, 300, 'Lava');
            this.es2.setScale(0.5);
        });

        this.es2.on('pointerdown', () => {
            this.scene.start('Escenario2');
            bg_music_selection_screen.setLoop(false);
            bg_music_selection_screen.stop();
        });*/


        this.es3 = this.add.image(650, 300, 'Oriental');
        this.es3.setScale(0.33);

        
        /*this.es3.on('pointerover', () => {
            this.es3 = this.add.image(650, 300, 'OrientalActivado');
            this.es3.setScale(0.5);
        });

        this.es3.on('pointerout', () => {
            this.es3 = this.add.image(650, 300, 'Oriental');
            this.es3.setScale(0.5);
        });

        this.es3.on('pointerdown', () => {
            this.scene.start('Escenario3');
            bg_music_selection_screen.setLoop(false);
            bg_music_selection_screen.stop();
        });*/


    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////VARIABLES PANTALLA DE JUEGO////////////////////
var bg_music_battleground_1;
var bg_music_battleground_2;
var bg_music_battleground_3;


class StateMachine {
  constructor(initialState, possibleStates, stateArgs=[]) {
    this.initialState = initialState;
    this.possibleStates = possibleStates;
    this.stateArgs = stateArgs;
    this.state = null;

    // State instances get access to the state machine via this.stateMachine.
    for (const state of Object.values(this.possibleStates)) {
      state.stateMachine = this;
    }
  }

  step() {
    // On the first step, the state is null and we need to initialize the first state.
    if (this.state === null) {
      this.state = this.initialState;
      this.possibleStates[this.state].enter(...this.stateArgs);
    }

    // Run the current state's execute
    this.possibleStates[this.state].execute(...this.stateArgs);
  }

  transition(newState, ...enterArgs) {
    this.state = newState;
    this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);
  }
}

class State {
  enter() {

  }

  execute() {

  }
}


//function
var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    // Bullet Constructor
    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = Phaser.Math.GetSpeed(300, 1);
        this.born = 0;
        this.direction = 0;
		this.damage=1;
       // this.xSpeed = 0;
      //  this.ySpeed = 0;
      //  this.setSize(12, 12, true);
    },

    // Fires a bullet from the player to the reticle
    fire: function (x,y,player_direction)
    {
        this.setPosition(x, y); // Initial position
		this.body.setAllowGravity(false);
 		this.setActive(true);
        this.setVisible(true);
        this.direction =player_direction;
        if (this.direction==='right')
        {
            this.x += 20;
            
        }
        else
        {
            this.x -= 20;
        }

        this.born = 0; // Time since new bullet spawned
    },

    // Updates the position of the bullet each cycle
    update: function (time, delta)
    {
	// Calculate X and y velocity of bullet to moves it from shooter to target
        if (this.direction==='right')
        {
            this.x += this.speed * delta;
            
        }
        else
        {
            this.x -= this.speed * delta;
        }
        this.born += delta;
        if (this.born > 1800)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});

//objects
var player1;
var player1_name;
var text_p1_UI;
var profile_p1_UI;
var spAtk_p1_UI;
var lives_p1_UI;
var text_p2_UI;
var profile_p2_UI;
var spAtk_p2_UI;
var lives_p2_UI;
var player2;
var player_Bullets;
var items_pistol;
var items_knife;
var item_pistol;
var item_knife;
var gems;
var items_power;
var items_speed;
var items_shield;
var items_lemon;
var items_grape;
var items_strawberry;
var items_ammo;
var ladder;
var lastTimeDebuff;
var knifeHitbox= Phaser.GameObjects.Rectangle;
var knifeHitbox2= Phaser.GameObjects.Rectangle;
var blueSpecialAttack_Area= Phaser.GameObjects.Circle;
var blueSpecialAttack_Explosion;

var shield1;
var shield2;
var pinkCopy;
var platforms;

var text_time;
var timedCountdown;
var controlIimedItemRespawn_Gems;
var controlIimedItemRespawn_Fruits;
var controlIimedItemRespawn;
var controlIimedWeaponRespawn;

var timedItemRespawn;
//audio effects
var sound_knife;
var sound_explosion;
var sound_powerup;
var sound_shoot;
var sound_getGem;
var sound_pickupWeapon;

//Inputs Player 1
var respawn_P1=new Phaser.Math. Vector2;
var spaceBar;
var input_A;
var input_D;
var input_W;
var input_S;
var input_E;
var input_Q;

//Inputs Player 2
var respawn_P2=new Phaser.Math. Vector2;
var input_Shift;
var input_J;
var input_I;
var input_K;
var input_L;
var input_O;
var input_U;

var lastTimeConnected=new Date();
var nJug="";
//////////////////////////////////////////Pantalla del Escenario1///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class PantallaEscenario1 extends Phaser.Scene{
    constructor(){
        //Juego--> nombre que se le da a la escena
        super({ key: "Escenario1"});
    }

    

    preload(){
    }


    create(){
	//Background
    this.add.image(400,300, 'bg_arboles');
    this.add.image(400,400, 'bg_tierra');

    //Pausa
    this.paus1 = this.add.image(750, 50, 'bPausa').setInteractive();
        this.paus1.setScale(0.5);

        
        this.paus1.on('pointerover', () => {
            this.paus1 = this.add.image(750, 50, 'bPausaActivado');
            this.paus1.setScale(0.5);
        });

        this.paus1.on('pointerout', () => {
            this.paus1 = this.add.image(750, 50, 'bPausa');
            this.paus1.setScale(0.5);
        });

        this.paus1.on('pointerdown', () => {
            sleepE1 = 'true';
            this.scene.sleep('Escenario1');
            this.scene.launch('Pausa');
            this.scene.moveAbove('Pausa');
        });


    //Musica
    bg_music_battleground_1 = this.sound.add('backgroundBattleMusic1');
    bg_music_battleground_1.setLoop(true);
    bg_music_battleground_1.play();
	sound_knife= this.sound.add('hit');
	sound_explosion= this.sound.add('explosion_sfx');
	sound_powerup= this.sound.add('powerUp');
	sound_shoot= this.sound.add('pistolFire');
	sound_getGem= this.sound.add('collect_gem');
	sound_pickupWeapon= this.sound.add('pickWeapon');

    //Timer
     lastTimeDebuff = 0;
    controlIimedItemRespawn_Gems=0;
    controlIimedItemRespawn_Fruits=0;
    controlIimedItemRespawn=0;
	controlIimedWeaponRespawn=0;
    text_time = this.add.text(32, 32);
    timedCountdown = this.time.delayedCall(75000, onCountDownEvent, [], this); //75000 tiempoo oficial

    timedItemRespawn = new Phaser.Time.TimerEvent({ delay: 4000 });
    this.time.addEvent(timedItemRespawn)
    
    //Plataformas
    platforms = this.physics.add.staticGroup();
	
	platforms.create(720,424,'tierra_esq_sup_izq');
	platforms.create(112,296,'tierra_esq_sup_dch');
	platforms.create(144,552,'tierra_suelo_sup');
	platforms.create(176,552,'tierra_suelo_sup');
	platforms.create(208,552,'tierra_suelo_sup');
	platforms.create(240,552,'tierra_suelo_sup');
	platforms.create(272,552,'tierra_suelo_sup');
	platforms.create(304,552,'tierra_suelo_sup');
	platforms.create(336,552,'tierra_suelo_sup');
	platforms.create(368,552,'tierra_suelo_sup');
	platforms.create(400,552,'tierra_suelo_sup');
	platforms.create(432,552,'tierra_suelo_sup');
	platforms.create(464,552,'tierra_suelo_sup');
	platforms.create(496,552,'tierra_suelo_sup');
	platforms.create(528,552,'tierra_suelo_sup');
	platforms.create(560,552,'tierra_suelo_sup');
	platforms.create(592,552,'tierra_suelo_sup');
	platforms.create(624,552,'tierra_suelo_sup');
	platforms.create(656,552,'tierra_suelo_sup');
	platforms.create(688,552,'tierra_suelo_sup');
	platforms.create(784,424,'tierra_suelo_sup');
	platforms.create(752,424,'tierra_suelo_sup');
	platforms.create(16,296,'tierra_suelo_sup');
	platforms.create(48,296,'tierra_suelo_sup');
	platforms.create(80,296,'tierra_suelo_sup');
	platforms.create(16,168,'tierra_suelo_sup');
	platforms.create(48,168,'tierra_suelo_sup');
	platforms.create(112,168,'tierra_suelo_sup');
	platforms.create(144,168,'tierra_suelo_sup');
	platforms.create(176,168,'tierra_suelo_sup');
	platforms.create(240,424,'tierra_suelo_sup');
	platforms.create(208,424,'tierra_suelo_sup');
	platforms.create(272,424,'tierra_suelo_sup');
	platforms.create(464,424,'tierra_suelo_sup');
	platforms.create(528,424,'tierra_suelo_sup');
	platforms.create(560,424,'tierra_suelo_sup');
	platforms.create(592,424,'tierra_suelo_sup');
	platforms.create(272,296,'tierra_suelo_sup');
	platforms.create(304,296,'tierra_suelo_sup');
	platforms.create(336,296,'tierra_suelo_sup');
	platforms.create(368,296,'tierra_suelo_sup');
	platforms.create(400,296,'tierra_suelo_sup');
	platforms.create(432,296,'tierra_suelo_sup');
	platforms.create(349,102,'tierra_suelo_sup');
	platforms.create(381,102,'tierra_suelo_sup');
	platforms.create(413,102,'tierra_suelo_sup');
	platforms.create(688,200,'tierra_suelo_sup');
	platforms.create(656,200,'tierra_suelo_sup');
	platforms.create(592,200,'tierra_suelo_sup');
	platforms.create(560,200,'tierra_suelo_sup');
	platforms.create(720,520,'tierra_pared_izq');
	platforms.create(720,488,'tierra_pared_izq');
	platforms.create(720,456,'tierra_pared_izq');
	platforms.create(112,520,'tierra_pared_dch');
	platforms.create(112,488,'tierra_pared_dch');
	platforms.create(112,456,'tierra_pared_dch');
	platforms.create(112,424,'tierra_pared_dch');
	platforms.create(112,392,'tierra_pared_dch');
	platforms.create(112,360,'tierra_pared_dch');
	platforms.create(112,328,'tierra_pared_dch');
	platforms.create(112,552,'tierra_esq_3');
	platforms.create(720,552,'tierra_esq_4');
	platforms.create(80,168,'tierra_escalera');
	platforms.create(240,296,'tierra_escalera');
	platforms.create(496,424,'tierra_escalera');
	platforms.create(624,200,'tierra_escalera');
	platforms.create(208,168,'tierra_borde_dch');
	platforms.create(304,424,'tierra_borde_dch');
	platforms.create(624,424,'tierra_borde_dch');
	platforms.create(464,296,'tierra_borde_dch');
	platforms.create(445,102,'tierra_borde_dch');
	platforms.create(720,200,'tierra_borde_dch');
	platforms.create(208,296,'tierra_borde_izq');
	platforms.create(176,424,'tierra_borde_izq');
	platforms.create(432,424,'tierra_borde_izq');
	platforms.create(317,102,'tierra_borde_izq');
	platforms.create(528,200,'tierra_borde_izq');
	platforms.create(16,584,'tierra_centro');
	platforms.create(48,584,'tierra_centro');
	platforms.create(80,584,'tierra_centro');
	platforms.create(112,584,'tierra_centro');
	platforms.create(144,584,'tierra_centro');
	platforms.create(176,584,'tierra_centro');
	platforms.create(208,584,'tierra_centro');
	platforms.create(240,584,'tierra_centro');
	platforms.create(272,584,'tierra_centro');
	platforms.create(304,584,'tierra_centro');
	platforms.create(336,584,'tierra_centro');
	platforms.create(368,584,'tierra_centro');
	platforms.create(400,584,'tierra_centro');
	platforms.create(432,584,'tierra_centro');
	platforms.create(464,584,'tierra_centro');
	platforms.create(496,584,'tierra_centro');
	platforms.create(528,584,'tierra_centro');
	platforms.create(560,584,'tierra_centro');
	platforms.create(592,584,'tierra_centro');
	platforms.create(624,584,'tierra_centro');
	platforms.create(656,584,'tierra_centro');
	platforms.create(688,584,'tierra_centro');
	platforms.create(720,584,'tierra_centro');
	platforms.create(752,584,'tierra_centro');
	platforms.create(784,584,'tierra_centro');
	platforms.create(16,552,'tierra_centro');
	platforms.create(48,552,'tierra_centro');
	platforms.create(80,552,'tierra_centro');
	platforms.create(16,520,'tierra_centro');
	platforms.create(48,520,'tierra_centro');
	platforms.create(80,520,'tierra_centro');
	platforms.create(784,552,'tierra_centro');
	platforms.create(761,552,'tierra_centro');
	platforms.create(784,520,'tierra_centro');
	platforms.create(761,520,'tierra_centro');
	platforms.create(784,488,'tierra_centro');
	platforms.create(761,488,'tierra_centro');
	platforms.create(784,456,'tierra_centro');
	platforms.create(761,456,'tierra_centro');
	platforms.create(16,488,'tierra_centro');
	platforms.create(16,456,'tierra_centro');
	platforms.create(16,424,'tierra_centro');
	platforms.create(16,392,'tierra_centro');
	platforms.create(16,360,'tierra_centro');
	platforms.create(16,328,'tierra_centro');
	platforms.create(48,488,'tierra_centro');
	platforms.create(48,456,'tierra_centro');
	platforms.create(48,424,'tierra_centro');
	platforms.create(48,392,'tierra_centro');
	platforms.create(48,360,'tierra_centro');
	platforms.create(48,328,'tierra_centro');
	platforms.create(80,488,'tierra_centro');
	platforms.create(80,456,'tierra_centro');
	platforms.create(80,424,'tierra_centro');
	platforms.create(80,392,'tierra_centro');
	platforms.create(80,360,'tierra_centro');
	platforms.create(80,328,'tierra_centro');
	platforms.create(752,456,'tierra_centro');
	platforms.create(752,488,'tierra_centro');
	platforms.create(752,520,'tierra_centro');
	platforms.create(752,552,'tierra_centro');
	platforms.create(752,584,'tierra_centro');
	platforms.create(752,616,'tierra_centro');
    //platforms.create(150,350,'platform_T1');
    //platforms.create(650,350,'platform_T1_double');
    //platforms.create(400,580,'platform_T1').setScale(50,3).refreshBody();
    
    //Escaleras
    
    ladder = this.physics.add.group();
	ladder.create(80,264,'escalera');
	ladder.create(80,232,'escalera');
	ladder.create(80,200,'escalera');
	ladder.create(240,328,'escalera');
	ladder.create(240,360,'escalera');
	ladder.create(240,392,'escalera');
	ladder.create(496,456,'escalera');
	ladder.create(496,488,'escalera');
	ladder.create(496,520,'escalera');
	ladder.create(624,392,'escalera');
	ladder.create(624,360,'escalera');
	ladder.create(624,328,'escalera');
	ladder.create(624,296,'escalera');
	ladder.create(624,264,'escalera');
	ladder.create(624,232,'escalera');
     ladder.children.iterate(function (child) {
        //  Give each ladder no gravity
    child.body.setAllowGravity(false);

    });
    //Gemas
    gems = this.physics.add.group();
    
    //Items
    //item_pistol=this.physics.add.sprite(200, 450, 'pistol_item');
    //item_pistol.setCollideWorldBounds(true);
    
    //item_knife=this.physics.add.sprite(300, 450, 'knife_item');
    //item_knife.setCollideWorldBounds(true);
	items_pistol=this.physics.add.group();
	items_knife=this.physics.add.group();
	if (online && cargoPj==='player1'){
		createPistol();
		createKnife();
	}
	else if(!online){
		createPistol();
		createKnife();
	}
	
    items_power=this.physics.add.group();
    items_speed=this.physics.add.group();
    items_shield=this.physics.add.group();
    items_lemon=this.physics.add.group();
    items_grape=this.physics.add.group();
    items_strawberry=this.physics.add.group();
    items_ammo=this.physics.add.group();
    

    //Input 
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    input_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    input_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    input_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    input_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    input_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    input_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    input_Shift= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    input_J=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    input_L=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    input_I=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    input_K=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    input_O=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    input_U=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);


    //Player 1
	respawn_P1.x=300;
	respawn_P1.y=450;
    player1 = this.physics.add.sprite(respawn_P1.x, respawn_P1.y, chooseP1+'_idl');
	player1.setBodySize(player1.width *0.5,player1.height *1);
	player1.tag=1;
if(player_profile!==null){
	player1.name =player_profile;

}else{
		player1.name="default";

}
	player1.life = 20;
	player1.ammo = 10;
	player1.gemsOwned = 0;
	player1.direction='right';
	player1.hitted=false;
	player1.hasPistol=false;
	player1.hasKnife=false;
	player1.debuff=false;
	player1.strengthBoost=false;
	player1.speedBoost=false;
	player1.shieldBoost=false;
	player1.LastStrengthBoost=0;
	player1.LastSpeedBoost=0;
	player1.LastShieldBoost=0;
	player1.onLadder=false;
	player1.invisible=false;
	player1.LastTimeSpecial=0;
	player1.canSpecial=true;
    player1.setCollideWorldBounds(true);
player1_name=	this.add.text(player1.body.center.x, player1.y+20, player1.name, { font: '16px Courier', fill: '#ffffff' });
    //Player 2
	respawn_P2.x=400;
	respawn_P2.y=450;
  	player2 = this.physics.add.sprite(respawn_P2.x, respawn_P2.y, chooseP2+'_idl');
	player2.setBodySize(player2.width *0.5,player2.height *1);
	player2.tag=2;
	player2.life = 20;
	player2.ammo = 10;
	player2.gemsOwned = 0;
	player2.direction='right';
	player2.hitted=false;
	player2.hasPistol=false;
	player2.hasKnife=false;
	player2.debuff=false;
	player2.strengthBoost=false;
	player2.speedBoost=false;
	player2.shieldBoost=false;
	player2.LastStrengthBoost=0;
	player2.LastSpeedBoost=0;
	player2.LastShieldBoost=0;
	player2.onLadder=false;
	player2.invisible=false;
	player2.LastTimeSpecial=0;
	player2.canSpecial=true;
	player2.setCollideWorldBounds(true);
	
	
	player_Bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
	
	
	
	text_p1_UI = this.add.text(230, 562, '', { font: '16px Courier', fill: '#ffffff' });
	text_p1_UI.setDepth(2);
	profile_p1_UI = this.add.image(40, 510, 'j1').setScale(0.3,0.3); 
	profile_p1_UI.setDepth(1);
	var gem_Icon= this.add.image(220, 586, 'gem').setScale(0.6,0.6); 
	gem_Icon.setDepth(1);
	var ammo_Icon= this.add.image(220, 569, 'ammo_item').setScale(0.4,0.3); 
	ammo_Icon.setDepth(1);
	spAtk_p1_UI=this.add.sprite(50, 530, 'special_attack_11').setScale(0.35,0.35);
	spAtk_p1_UI.anims.create({
            key: 'charge',
            frames: [
                { key: 'special_attack_1' , duration: 1500},
                { key: 'special_attack_2' , duration: 1500},
                { key: 'special_attack_3' , duration: 1500},
                { key: 'special_attack_4' , duration: 1500},
                { key: 'special_attack_5' , duration: 1500},
                { key: 'special_attack_6' , duration: 1500},
                { key: 'special_attack_7' , duration: 1500},
                { key: 'special_attack_8' , duration: 1500},
                { key: 'special_attack_9' , duration: 1500},
                { key: 'special_attack_10', duration: 1500},
                { key: 'special_attack_11', duration: 1500 }
            ],
            frameRate: 10,
            repeat: 0
        });
	spAtk_p1_UI.setDepth(1);
	var heartsF1_p1_UI=this.add.group({key: 'life_heart',
        repeat: 9,
        setXY: { x: 20, y:570 , stepX: 20 },
		setScale: { x: 0.5, y:0.5 }
	});
	heartsF1_p1_UI.setDepth(1);
	lives_p1_UI=heartsF1_p1_UI.getChildren();
	var heartsF2_p1_UI=this.add.group({key: 'life_heart',
        repeat: 9,
        setXY: { x: 20, y:585 , stepX: 20 },
		setScale: { x: 0.5, y:0.5 }

	});
	heartsF2_p1_UI.setDepth(1);
	var auxArray=heartsF2_p1_UI.getChildren();
	for( var i=0 ; i<10;i++){
		lives_p1_UI.push(auxArray[i]);
	}
        //  Store some data about this profile:
        profile_p1_UI.setDataEnabled();

        profile_p1_UI.data.set('ammo', player1.ammo);
        profile_p1_UI.data.set('gems', player1.gemsOwned);

        text_p1_UI.setText([
         
            profile_p1_UI.data.get('ammo'),
            profile_p1_UI.data.get('gems') 
        ]);
		profile_p1_UI.on('changedata-gems', function (gameObject, value) {
                text_p1_UI.setText([
                   
            profile_p1_UI.data.get('ammo'),
           profile_p1_UI.data.get('gems') 
                ]);
        });
		profile_p1_UI.on('changedata-ammo', function (gameObject, value) {
                text_p1_UI.setText([
            profile_p1_UI.data.get('ammo'),
            profile_p1_UI.data.get('gems') 
                ]);
        });
	
    text_p2_UI = this.add.text(550, 562, '', { font: '16px Courier', fill: '#ffffff' });
	text_p2_UI.setDepth(2);
	profile_p2_UI = this.add.image(760, 510, 'j2').setScale(0.3,0.3); 
	profile_p2_UI.setDepth(1);
	var gem_Icon= this.add.image(580, 586, 'gem').setScale(0.6,0.6);
	gem_Icon.setDepth(1);
	var ammo_Icon= this.add.image(580, 569, 'ammo_item').setScale(0.4,0.3); 
	ammo_Icon.setDepth(1);
	spAtk_p2_UI=this.add.sprite(750, 530, 'special_attack_11').setScale(0.35,0.35);
	spAtk_p2_UI.anims.create({
            key: 'charge',
            frames: [
                { key: 'special_attack_1' , duration: 1500},
                { key: 'special_attack_2' , duration: 1500},
                { key: 'special_attack_3' , duration: 1500},
                { key: 'special_attack_4' , duration: 1500},
                { key: 'special_attack_5' , duration: 1500},
                { key: 'special_attack_6' , duration: 1500},
                { key: 'special_attack_7' , duration: 1500},
                { key: 'special_attack_8' , duration: 1500},
                { key: 'special_attack_9' , duration: 1500},
                { key: 'special_attack_10' , duration: 1500},
                { key: 'special_attack_11', duration: 1500 }
            ],
            frameRate: 10,
            repeat: 0
        });
	spAtk_p2_UI.setFlipX(true);
	spAtk_p2_UI.setDepth(1);
	var heartsF1_p2_UI=this.add.group({key: 'life_heart',
        repeat: 9,
        setXY: { x: 600, y:570 , stepX: 20 },
		setScale: { x: 0.5, y:0.5 }
	});
	heartsF1_p2_UI.setDepth(1);
		lives_p2_UI= heartsF1_p2_UI.getChildren();

	var heartsF2_p2_UI=this.add.group({key: 'life_heart',
        repeat: 9,
        setXY: { x: 600, y:585 , stepX: 20 },
		setScale: { x: 0.5, y:0.5 }

	});
	heartsF2_p2_UI.setDepth(1);
	var auxAr=heartsF2_p2_UI.getChildren();
	for( var i=0 ; i<10;i++){
		lives_p2_UI.push(auxAr[i]);
	}


        //  Store some data about this profile:
        profile_p2_UI.setDataEnabled();

        
        profile_p2_UI.data.set('ammo', player2.ammo);
        profile_p2_UI.data.set('gems', player2.gemsOwned);

        text_p2_UI.setText([
           
            profile_p2_UI.data.get('ammo'),
            profile_p2_UI.data.get('gems') 
        ]);
		profile_p2_UI.on('changedata-gems', function (gameObject, value) {
                text_p2_UI.setText([
	
             profile_p2_UI.data.get('ammo'),
             profile_p2_UI.data.get('gems') 
                ]);
        });
		
		profile_p2_UI.on('changedata-ammo', function (gameObject, value) {
                text_p2_UI.setText([
                    
             profile_p2_UI.data.get('ammo'),
             profile_p2_UI.data.get('gems') 
                ]);
        });
    //Knife
    knifeHitbox= this.add.rectangle(0,0,10,20, 0xffffff, 0);
    this.physics.add.existing(knifeHitbox);
    knifeHitbox.damage=3;
    knifeHitbox.body.enable=false;
    this.physics.world.remove(knifeHitbox.body);
    knifeHitbox.body.setAllowGravity(false);
    
    knifeHitbox2= this.add.rectangle(0,0,10,20, 0xffffff, 0);
    this.physics.add.existing(knifeHitbox2);
    knifeHitbox2.damage=3;
    knifeHitbox2.body.enable=false;
    this.physics.world.remove(knifeHitbox2.body);
    knifeHitbox2.body.setAllowGravity(false);
    //Circle for explosion
    blueSpecialAttack_Area=this.add.circle(90,90,90, 0xffffff,0.5);
    this.physics.add.existing(blueSpecialAttack_Area);
    blueSpecialAttack_Area.body.enable=false;
    blueSpecialAttack_Area.setVisible(false);
    blueSpecialAttack_Area.body.setAllowGravity(false);
    //Shield
    shield1=  this.physics.add.image(0, 0, 'shield_bubble').setScale(0.05,0.05).refreshBody();;
    shield1.body.enable=false;
    shield1.setVisible(false);
    shield1.body.setAllowGravity(false);
    
    shield2=  this.physics.add.image(0, 0, 'shield_bubble').setScale(0.05,0.05).refreshBody();;
    shield2.body.enable=false;
    shield2.setVisible(false);
    shield2.body.setAllowGravity(false);
    //Copia de Chilli
    if(chooseP1==='Chilli'){
    	pinkCopy= this.physics.add.sprite(0,0, chooseP1+'_idl');
    	pinkCopy.tag=1;
    	}
    else {
    	pinkCopy= this.physics.add.sprite(0,0, chooseP2+'_idl');
    	pinkCopy.tag=2;
    	}
    pinkCopy.body.enable=false;
    pinkCopy.setVisible(false);
    //Create StateMachine
if(online){
	if(cargoPj==='player1'){
		this.stateMachine_player1 = new StateMachine('idle', {
            idle: new IdleStateP1(),
            move: new MoveStateP1(),
            jump: new JumpStateP1(),
    		climb: new ClimbStateP1(),
			attack_knife: new AttackKnifeStateP1(),
            attack_pistol: new AttackPistolStateP1(),
    		getHit: new GetHitStateP1(),
    		death: new DeathStateP1(),
    		invisible: new InvisibleStateP1(),
         }, [this, player1]);
 this.stateMachine_player2 = new StateMachine('idle', {
            idle: new IdleStatePOnline(),
            move: new MoveStatePOnline(),
            jump: new JumpStatePOnline(),
    		climb: new ClimbStatePOnline(),
			attack_knife: new AttackKnifeStatePOnline(),
            attack_pistol: new AttackPistolStatePOnline(),
	   		getHit: new GetHitStatePOnline(),
    		death: new DeathStatePOnline(),
    		invisible: new InvisibleStatePOnline(),
          }, [this, player2]);
	}else{
		this.stateMachine_player1 = new StateMachine('idle', {
            idle: new IdleStateP1(),
            move: new MoveStateP1(),
            jump: new JumpStateP1(),
    		climb: new ClimbStateP1(),
			attack_knife: new AttackKnifeStateP1(),
            attack_pistol: new AttackPistolStateP1(),
    		getHit: new GetHitStateP1(),
    		death: new DeathStateP1(),
    		invisible: new InvisibleStateP1(),
         }, [this, player2]);
 this.stateMachine_player2 = new StateMachine('idle', {
            idle: new IdleStatePOnline(),
            move: new MoveStatePOnline(),
            jump: new JumpStatePOnline(),
    		climb: new ClimbStatePOnline(),
			attack_knife: new AttackKnifeStatePOnline(),
            attack_pistol: new AttackPistolStatePOnline(),
	   		getHit: new GetHitStatePOnline(),
    		death: new DeathStatePOnline(),
    		invisible: new InvisibleStatePOnline(),
          }, [this, player1]);
	}
			
}else{
    this.stateMachine_player1 = new StateMachine('idle', {
            idle: new IdleStateP1(),
            move: new MoveStateP1(),
            jump: new JumpStateP1(),
    		climb: new ClimbStateP1(),
			attack_knife: new AttackKnifeStateP1(),
            attack_pistol: new AttackPistolStateP1(),
    		getHit: new GetHitStateP1(),
    		death: new DeathStateP1(),
    		invisible: new InvisibleStateP1(),
         }, [this, player1]);

    this.stateMachine_player2 = new StateMachine('idle', {
            idle: new IdleStateP2(),
            move: new MoveStateP2(),
            jump: new JumpStateP2(),
    		climb: new ClimbStateP2(),
			attack_knife: new AttackKnifeStateP2(),
            attack_pistol: new AttackPistolStateP2(),
	   		getHit: new GetHitStateP2(),
    		death: new DeathStateP2(),
    		invisible: new InvisibleStateP2(),
          }, [this, player2]);
    }

blueSpecialAttack_Explosion=this.add.sprite(0,0,'round_explosion_0');
blueSpecialAttack_Explosion.DelayTimer=0;
blueSpecialAttack_Explosion.exist=false;
blueSpecialAttack_Explosion.setVisible(false);
/*blueSpecialAttack_Explosion.anims.create({
	key: 'explosion',
        frames: this.anims.generateFrameNumbers('round_explosion', { start: 0, end: 71 }),
        frameRate: 20,
        repeat: 0
});*/
blueSpecialAttack_Explosion.anims.create({
            
	key: 'explosion',
            frames: [
                { key:'round_explosion_0', duration: 1500},
        { key:'round_explosion_1', duration: 50},
        { key:'round_explosion_2', duration: 50},
        { key:'round_explosion_3', duration: 50},
        { key:'round_explosion_4', duration: 50},
        { key:'round_explosion_5', duration: 50},
        { key:'round_explosion_6', duration: 50},
        { key:'round_explosion_7'},
        { key:'round_explosion_8'},
        { key:'round_explosion_9'},
        { key:'round_explosion_10'},
        { key:'round_explosion_11'},
        { key:'round_explosion_12'},
        { key:'round_explosion_13'},
        { key:'round_explosion_14'},
        { key:'round_explosion_15'},
        { key:'round_explosion_16'},
        { key:'round_explosion_17'},
        { key:'round_explosion_18'},
        { key:'round_explosion_19'},
        { key:'round_explosion_20'},
        //{ key:'round_explosion_21'},
        { key:'round_explosion_22'},
       // { key:'round_explosion_23'},
        { key:'round_explosion_24'},
       // { key:'round_explosion_25'},
        { key:'round_explosion_26'},
       // { key:'round_explosion_27'},
        { key:'round_explosion_28'},
       // { key:'round_explosion_29'},
        { key:'round_explosion_30'},
      //  { key:'round_explosion_31'},
        { key:'round_explosion_32'},
       // { key:'round_explosion_33'},
        { key:'round_explosion_34'},
      //  { key:'round_explosion_35'},
        { key:'round_explosion_36'},
       // { key:'round_explosion_37'},
        { key:'round_explosion_38'},
      //  { key:'round_explosion_39'},
        { key:'round_explosion_40'},
      //  { key:'round_explosion_41'},
        { key:'round_explosion_42'},
      //  { key:'round_explosion_43'},
        { key:'round_explosion_44'},
      //  { key:'round_explosion_45'},
        { key:'round_explosion_46'},
      //  { key:'round_explosion_47'},
        { key:'round_explosion_48'},
      //  { key:'round_explosion_49'},
        { key:'round_explosion_50'},
       // { key:'round_explosion_51'},
        { key:'round_explosion_52'},
      //  { key:'round_explosion_53'},
        { key:'round_explosion_54'},
      //  { key:'round_explosion_55'},
        { key:'round_explosion_56'},
     //   { key:'round_explosion_57'},
        { key:'round_explosion_58'},
       // { key:'round_explosion_59'},
        { key:'round_explosion_60'},
      //  { key:'round_explosion_61'},
        { key:'round_explosion_62'},
     //   { key:'round_explosion_63'},
        { key:'round_explosion_64'},
     //   { key:'round_explosion_65'},
        { key:'round_explosion_66'},
     //   { key:'round_explosion_67'},
        { key:'round_explosion_68'},
     //   { key:'round_explosion_69'},
        { key:'round_explosion_70'},
            ],
            frameRate: 10,
            repeat: 0
        });
    //Animaciones player1
	//Idle
	

    player1.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(chooseP1+'_idl', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
	//Run
	

    player1.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers(chooseP1+'_run', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	player1.anims.create({
        key: 'run_knife',
        frames: this.anims.generateFrameNumbers(chooseP1+'_run_knife', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	player1.anims.create({
        key: 'run_pistol',
        frames: this.anims.generateFrameNumbers(chooseP1+'_run_pistol', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	//Jump
	

    player1.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers(chooseP1+'_jump', { start: 3, end: 7 }),
        frameRate: 10,
		repeat:0
    });

	//Attack

   player1.anims.create({
        key: 'attack_knife',
        frames: this.anims.generateFrameNumbers(chooseP1+'_attack_knife', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player1.anims.create({
        key: 'attack_pistol',
        frames: this.anims.generateFrameNumbers(chooseP1+'_attack_pistol', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	 player1.anims.create({
        key: 'hurt',
        frames: this.anims.generateFrameNumbers(chooseP1+'_hurt', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player1.anims.create({
        key: 'death',
        frames: this.anims.generateFrameNumbers(chooseP1+'_death', { start: 0, end: 7 }),
        frameRate: 10,
		repeat:0
    });
	player1.anims.create({
        key: 'climb',
        frames: this.anims.generateFrameNumbers(chooseP1+'_climb', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
	player1.anims.create({
        key: 'invisible',
        frames: this.anims.generateFrameNumbers('Chilli_run_dust', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    //Animaciones player2
	//Idle
	

    player2.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(chooseP2+'_idl', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });
	//Run
    player2.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers(chooseP2+'_run', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	player2.anims.create({
        key: 'run_knife',
        frames: this.anims.generateFrameNumbers(chooseP2+'_run_knife', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	player2.anims.create({
        key: 'run_pistol',
        frames: this.anims.generateFrameNumbers(chooseP2+'_run_pistol', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

	//Jump	
    player2.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers(chooseP2+'_jump', { start: 3, end: 7 }),
        frameRate: 10,
		repeat:0
    });

	//Attack

    player2.anims.create({
        key: 'attack_knife',
        frames: this.anims.generateFrameNumbers(chooseP2+'_attack_knife', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player2.anims.create({
        key: 'attack_pistol',
        frames: this.anims.generateFrameNumbers(chooseP2+'_attack_pistol', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	 player2.anims.create({
        key: 'hurt',
        frames: this.anims.generateFrameNumbers(chooseP2+'_hurt', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player2.anims.create({
        key: 'death',
        frames: this.anims.generateFrameNumbers(chooseP2+'_death', { start: 0, end: 7 }),
        frameRate: 10,
		repeat:0
    });
	player2.anims.create({
        key: 'climb',
        frames: this.anims.generateFrameNumbers(chooseP2+'_climb', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
    player2.anims.create({
        key: 'invisible',
        frames: this.anims.generateFrameNumbers('Chilli_run_dust', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    //Copia
    if(pinkCopy.tag===1){
    pinkCopy.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(chooseP1+'_idl', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
    }else{
	pinkCopy.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(chooseP2+'_idl', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
}
    //Physics
    this.physics.add.collider(player1, platforms, null, checkUp);
    this.physics.add.collider(player2, platforms, null, checkUp);
    this.physics.add.collider(items_pistol, platforms);
    this.physics.add.collider(items_knife, platforms);
    this.physics.add.collider(gems, platforms);
    this.physics.add.collider(items_shield, platforms);
    this.physics.add.collider(items_power, platforms);
    this.physics.add.collider(items_speed, platforms);
    this.physics.add.collider(items_lemon, platforms);
    this.physics.add.collider(items_strawberry, platforms);
    this.physics.add.collider(items_grape, platforms);
    this.physics.add.collider(items_ammo, platforms);

    this.physics.add.collider(player1, player2);
    this.physics.add.overlap(player2, knifeHitbox, PlayerKnifeHitted,null, this);
    this.physics.add.overlap(player1, knifeHitbox2, PlayerKnifeHitted,null, this);
    this.physics.add.overlap(pinkCopy, knifeHitbox, CopyHitted,null, this);
    this.physics.add.overlap(pinkCopy, knifeHitbox2, CopyHitted,null, this);
	if(chooseP1==='Wasabi'){   this.physics.add.overlap(player2, blueSpecialAttack_Area, PlayerExplosionHitted,null, this);}
	else {    this.physics.add.overlap(player1, blueSpecialAttack_Area, PlayerExplosionHitted,null, this);}
    this.physics.add.overlap(player1, items_pistol, getPistol_P1, null, this);
    this.physics.add.overlap(player2, items_pistol, getPistol_P2, null, this);
    this.physics.add.overlap(player1, items_knife, getKnife_P1, null, this);
    this.physics.add.overlap(player2, items_knife, getKnife_P2, null, this);
	this.physics.add.overlap(player1, ladder, checkLadder, null, this);
	this.physics.add.overlap(player2, ladder, checkLadder, null, this);
	
	//objetos
    this.physics.add.overlap(player1, gems, collectGem, null, this);
    this.physics.add.overlap(player2, gems, collectGem, null, this);
	this.physics.add.overlap(player1, items_shield, collectShield, null, this);
    this.physics.add.overlap(player2, items_shield, collectShield, null, this);
	this.physics.add.overlap(player1, items_power, collectPower, null, this);
    this.physics.add.overlap(player2, items_power, collectPower, null, this);
	this.physics.add.overlap(player1, items_speed, collectSpeed, null, this);
    this.physics.add.overlap(player2, items_speed, collectSpeed, null, this);
	this.physics.add.overlap(player1, items_lemon, collectLemon, null, this);
    this.physics.add.overlap(player2, items_lemon, collectLemon, null, this);
	this.physics.add.overlap(player1, items_grape, collectGrape, null, this);
    this.physics.add.overlap(player2, items_grape, collectGrape, null, this);
	this.physics.add.overlap(player1, items_strawberry, collectStrawberry, null, this);
    this.physics.add.overlap(player2, items_strawberry, collectStrawberry, null, this);
	this.physics.add.overlap(player1, items_ammo, collectAmmo, null, this);
    this.physics.add.overlap(player2, items_ammo, collectAmmo, null, this);
	
	//ajax vars
	this.listaJugadores;
        this.mensajeError ;
        this.nJugadores;
    }//create

  update(){
	//PARTIDA ONLINE
	if(online){
		movePlayer.onmessage = function(msg) {
			//console.log("hay pistola"+player1.hasPistol);
			//console.log("hay cuchillo"+player1.hasKnife);
		if(JSON.parse(msg.data)==='left'){inputLeft=true;inputRight=false;}
		if(JSON.parse(msg.data)==='right'){inputRight=true;inputLeft=false;}
		if(JSON.parse(msg.data)==='up'){inputUp=true;inputDown=false;}
		if(JSON.parse(msg.data)==='down'){inputDown=true;inputUp=false;}
		if(JSON.parse(msg.data)==='attack'){inputAttack=true;}
		if(JSON.parse(msg.data)==='jump'){inputJump=true;}
		if(JSON.parse(msg.data)==='special'){inputSpecial=true;}
		if(JSON.parse(msg.data)==='idle'){inputRight=false;inputLeft=false;inputUp=false;inputJump=false;}
	}
	respawnItemsHandler.onmessage = function(msg) {
		var obj=JSON.parse(msg.data);
			//console.log(JSON.parse(msg.data));
			
			if(obj.name==='gem'){
						gems.create(obj.x,obj.y,'gem');  
			}
			if(obj.name==='stb'){
						items_strawberry.create(obj.x,obj.y,'strawberry_item');  
			}
			if(obj.name==='lem'){
						items_lemon.create(obj.x,obj.y,'lemon_item');  
			}
			if(obj.name==='grp'){
						items_grape.create(obj.x,obj.y,'grape_item');  
			}
			if(obj.name==='shd'){
						items_shield.create(obj.x,obj.y,'shield_item');  
			}
			if(obj.name==='spd'){
						items_speed.create(obj.x,obj.y,'speed_item');  
			}
			if(obj.name==='pow'){
						items_power.create(obj.x,obj.y,'power_item');  
			}
			if(obj.name==='amo'){
						items_ammo.create(obj.x,obj.y,'ammo_item');  
			}
			if(obj.name==='ptl'){
						items_pistol.create(obj.x,obj.y,'pistol_item');  
			}
			if(obj.name==='knf'){
						items_knife.create(obj.x,obj.y,'knife_item');  
			}

	}
	
	//Controles websockets
	if(Phaser.Input.Keyboard.JustDown(input_A)){
					movePlayer.send(JSON.stringify("left"));
	}
	if(Phaser.Input.Keyboard.JustDown(input_D)){
				movePlayer.send(JSON.stringify("right"));
	}
	if(Phaser.Input.Keyboard.JustDown(input_W)){
				movePlayer.send(JSON.stringify("up"));
	}
	/*
	if(Phaser.Input.Keyboard.JustDown(input_S)){
				console.log("Se pulsa S");
				movePlayer.send(JSON.stringify("down"));
	}*/
	if(Phaser.Input.Keyboard.JustDown(spaceBar)){
				movePlayer.send(JSON.stringify("jump"));
	}
	/*if(Phaser.Input.Keyboard.JustDown(input_Q)){
		//inputSpecial
				movePlayer.send(JSON.stringify("special"));
	}*/
	/*if(Phaser.Input.Keyboard.JustDown(input_E)){
				movePlayer.send(JSON.stringify("attack"));
	}*/
	
	if(!(input_A.isDown || input_D.isDown || input_W.isDown || spaceBar.isDown)){
					movePlayer.send(JSON.stringify("idle"));
	}
	if(cargoPj==='player1'){
					onItemRespawnEvent(this);
	}
	
	
	//Ataques especiales
if	(Phaser.Input.Keyboard.JustDown(input_Q)){
	movePlayer.send(JSON.stringify("special"));
		if(cargoPj==='player1'){
			if(chooseP1==='Chilli'){pinkSpecialAttack(player1,this);	}
    		if(chooseP1==='Bernie'){whiteSpecialAttack(player1,player2);	}
    		if(chooseP1==='Wasabi'){blueSpecialAttack(player1,this);	}
		}
    	
    	if(cargoPj==='player2'){
			if(chooseP2==='Chilli'){pinkSpecialAttack(player2,this);	}
    		if(chooseP2==='Bernie'){whiteSpecialAttack(player2,player1);	}
    		if(chooseP2==='Wasabi'){blueSpecialAttack(player2,this);	}
		}
    }
if	(inputSpecial){
	inputSpecial=false;
		if(cargoPj==='player1'){
			if(chooseP2==='Chilli'){pinkSpecialAttack(player2,this);	}
    		if(chooseP2==='Bernie'){whiteSpecialAttack(player2,player1);	}
    		if(chooseP2==='Wasabi'){blueSpecialAttack(player2,this);	}
			
		}
    	
    	if(cargoPj==='player2'){
			if(chooseP1==='Chilli'){pinkSpecialAttack(player1,this);	}
    		if(chooseP1==='Bernie'){whiteSpecialAttack(player1,player2);	}
    		if(chooseP1==='Wasabi'){blueSpecialAttack(player1,this);	}
		}
    }
	}
	
	
	///////////
	player1_name.x=player1.x-20;
	player1_name.y=player1.y-30;
	if(player1_name.text != player1.name){
		player1_name.text=player1.name;
	}
	//text_time.setText('Event.progress: ' + timedCountdown.getProgress().toString().substr(0, 4));
	checkNoLadder();
	checkTimeSpecial(player1);
    checkTimeSpecial(player2)
	checkExplosion();
	if(chooseP1==='Wasabi'){checkDelayExplosion(player1,this)}
	if(chooseP2==='Wasabi'){checkDelayExplosion(player2,this)}
	if(player1.direction!=='right') {  player1.flipX = true; }
	if(player1.direction!=='left') {  player1.flipX = false; }
	if(player2.direction!=='right') {  player2.flipX = true;}
	if(player2.direction!=='left') {  player2.flipX = false; }
	
	      this.stateMachine_player1.step();
	      this.stateMachine_player2.step();

    checkDebuffTime(player1, player2);
    checkBoosts(player1, player2)

if(!online){
				onItemRespawnEvent(this);

	if	(Phaser.Input.Keyboard.JustDown(input_Q)){
    	if(chooseP1==='Chilli'){pinkSpecialAttack(player1,this);	}
    	if(chooseP1==='Bernie'){whiteSpecialAttack(player1,player2);	}
    	if(chooseP1==='Wasabi'){blueSpecialAttack(player1,this);	}
    
    }
    
    if	(Phaser.Input.Keyboard.JustDown(input_U)){
    	if(chooseP2==='Chilli'){pinkSpecialAttack(player2,this);	}
    	if(chooseP2==='Bernie'){whiteSpecialAttack(player2,player1);	}
    	if(chooseP2==='Wasabi'){blueSpecialAttack(player2,this);	}
    
    }
}
    	
        }//update
        
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////PANTALLA ESCENARIO 2//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class PantallaEscenario2 extends Phaser.Scene{
    constructor(){
        //Escenario2--> nombre que se le da a la escena
        super({ key: "Escenario2"});
    }

    

    preload(){
    }


   create(){
    
	//Background
    this.add.image(400,300, 'bg_arboles');
    this.add.image(400,400, 'bg_tierra');

    //Pausa
    this.paus2 = this.add.image(750, 50, 'bPausa').setInteractive();
        this.paus2.setScale(0.5);

        
        this.paus2.on('pointerover', () => {
            this.paus2 = this.add.image(750, 50, 'bPausaActivado');
            this.paus2.setScale(0.5);
        });

        this.paus2.on('pointerout', () => {
            this.paus2 = this.add.image(750, 50, 'bPausa');
            this.paus2.setScale(0.5);
        });

        this.paus2.on('pointerdown', () => {
            sleepE2 = 'true';
            this.scene.sleep('Escenario2');
            this.scene.launch('Pausa');
            this.scene.moveAbove('Pausa');
        });

    /*
    //Musica
    bg_music_battleground_1 = this.sound.add('backgroundBattleMusic1');
    bg_music_battleground_1.setLoop(true);
    bg_music_battleground_1.play();
	sound_knife= this.sound.add('hit');
	sound_explosion= this.sound.add('explosion_sfx');
	sound_powerup= this.sound.add('powerUp');
	sound_shoot= this.sound.add('pistolFire');
	sound_getGem= this.sound.add('collect_gem');
	sound_pickupWeapon= this.sound.add('pickWeapon');

    //Timer
     lastTimeDebuff = 0;
    controlIimedItemRespawn_Gems=0;
    controlIimedItemRespawn_Fruits=0;
    controlIimedItemRespawn=0;
	controlIimedWeaponRespawn=0;
    text_time = this.add.text(32, 32);
    timedCountdown = this.time.delayedCall(75000, onCountDownEvent, [], this);

    timedItemRespawn = new Phaser.Time.TimerEvent({ delay: 4000 });
    this.time.addEvent(timedItemRespawn)
    
    //Plataformas
    platforms = this.physics.add.staticGroup();
	
	//Aquí van las plataformas/////////////////////////////////////////////////
	//Ejemplo-> platforms.create(720,424,'tierra_esq_sup_izq');

    
    //Escaleras
    
    ladder = this.physics.add.group();

	//Aquí van las escaleras/////////////////////////////////////////////////
	//Ejemplo-> ladder.create(80,264,'escalera');
	
     ladder.children.iterate(function (child) {
        //  Give each ladder no gravity
    child.body.setAllowGravity(false);

    });
    //Gemas
    gems = this.physics.add.group();
    
    //Items
    //item_pistol=this.physics.add.sprite(200, 450, 'pistol_item');
    //item_pistol.setCollideWorldBounds(true);
    
    //item_knife=this.physics.add.sprite(300, 450, 'knife_item');
    //item_knife.setCollideWorldBounds(true);
	items_pistol=this.physics.add.group();
	createPistol();
	items_knife=this.physics.add.group();
	createKnife();
    items_power=this.physics.add.group();
    items_speed=this.physics.add.group();
    items_shield=this.physics.add.group();
    items_lemon=this.physics.add.group();
    items_grape=this.physics.add.group();
    items_strawberry=this.physics.add.group();
    items_ammo=this.physics.add.group();
    

    //Input 
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    input_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    input_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    input_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    input_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    input_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    input_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    input_Shift= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    input_J=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    input_L=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    input_I=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    input_K=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    input_O=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    input_U=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);


    //Player 1
	respawn_P1.x=300;
	respawn_P1.y=450;
    player1 = this.physics.add.sprite(respawn_P1.x, respawn_P1.y, chooseP1+'_idl');
	player1.setBodySize(player1.width *0.5,player1.height *1);
	player1.tag=1;
	player1.name="default";
	player1.life = 20;
	player1.ammo = 10;
	player1.gemsOwned = 0;
	player1.direction='right';
	player1.hitted=false;
	player1.hasPistol=false;
	player1.hasKnife=false;
	player1.debuff=false;
	player1.strengthBoost=false;
	player1.speedBoost=false;
	player1.shieldBoost=false;
	player1.LastStrengthBoost=0;
	player1.LastSpeedBoost=0;
	player1.LastShieldBoost=0;
	player1.onLadder=false;
	player1.invisible=false;
	player1.LastTimeSpecial=0;
	player1.canSpecial=true;
    player1.setCollideWorldBounds(true);
player1_name=	this.add.text(player1.x, player1.y+20, player1.name, { font: '16px Courier', fill: '#ffffff' });
    //Player 2
	respawn_P2.x=400;
	respawn_P2.y=450;
  	player2 = this.physics.add.sprite(respawn_P2.x, respawn_P2.y, chooseP2+'_idl');
	player2.setBodySize(player2.width *0.5,player2.height *1);
	player2.tag=2;
	player2.life = 20;
	player2.ammo = 10;
	player2.gemsOwned = 0;
	player2.direction='right';
	player2.hitted=false;
	player2.hasPistol=false;
	player2.hasKnife=false;
	player2.debuff=false;
	player2.strengthBoost=false;
	player2.speedBoost=false;
	player2.shieldBoost=false;
	player2.LastStrengthBoost=0;
	player2.LastSpeedBoost=0;
	player2.LastShieldBoost=0;
	player2.onLadder=false;
	player2.invisible=false;
	player2.LastTimeSpecial=0;
	player2.canSpecial=true;
	player2.setCollideWorldBounds(true);
	
	
	player_Bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
	
	
	
	text_p1_UI = this.add.text(230, 562, '', { font: '16px Courier', fill: '#ffffff' });
	text_p1_UI.setDepth(2);
	profile_p1_UI = this.add.image(40, 510, 'j1').setScale(0.3,0.3); 
	profile_p1_UI.setDepth(1);
	var gem_Icon= this.add.image(220, 586, 'gem').setScale(0.6,0.6); 
	gem_Icon.setDepth(1);
	var ammo_Icon= this.add.image(220, 569, 'ammo_item').setScale(0.4,0.3); 
	ammo_Icon.setDepth(1);
	spAtk_p1_UI=this.add.sprite(50, 530, 'special_attack_11').setScale(0.35,0.35);
	spAtk_p1_UI.anims.create({
            key: 'charge',
            frames: [
                { key: 'special_attack_1' , duration: 1500},
                { key: 'special_attack_2' , duration: 1500},
                { key: 'special_attack_3' , duration: 1500},
                { key: 'special_attack_4' , duration: 1500},
                { key: 'special_attack_5' , duration: 1500},
                { key: 'special_attack_6' , duration: 1500},
                { key: 'special_attack_7' , duration: 1500},
                { key: 'special_attack_8' , duration: 1500},
                { key: 'special_attack_9' , duration: 1500},
                { key: 'special_attack_10', duration: 1500},
                { key: 'special_attack_11', duration: 1500 }
            ],
            frameRate: 10,
            repeat: 0
        });
	spAtk_p1_UI.setDepth(1);
	var heartsF1_p1_UI=this.add.group({key: 'life_heart',
        repeat: 9,
        setXY: { x: 20, y:570 , stepX: 20 },
		setScale: { x: 0.5, y:0.5 }
	});
	heartsF1_p1_UI.setDepth(1);
	lives_p1_UI=heartsF1_p1_UI.getChildren();
	var heartsF2_p1_UI=this.add.group({key: 'life_heart',
        repeat: 9,
        setXY: { x: 20, y:585 , stepX: 20 },
		setScale: { x: 0.5, y:0.5 }

	});
	heartsF2_p1_UI.setDepth(1);
	var auxArray=heartsF2_p1_UI.getChildren();
	for( var i=0 ; i<10;i++){
		lives_p1_UI.push(auxArray[i]);
	}
        //  Store some data about this profile:
        profile_p1_UI.setDataEnabled();

        profile_p1_UI.data.set('ammo', player1.ammo);
        profile_p1_UI.data.set('gems', player1.gemsOwned);

        text_p1_UI.setText([
         
            profile_p1_UI.data.get('ammo'),
            profile_p1_UI.data.get('gems') 
        ]);
		profile_p1_UI.on('changedata-gems', function (gameObject, value) {
                text_p1_UI.setText([
                   
            profile_p1_UI.data.get('ammo'),
           profile_p1_UI.data.get('gems') 
                ]);
        });
		profile_p1_UI.on('changedata-ammo', function (gameObject, value) {
                text_p1_UI.setText([
            profile_p1_UI.data.get('ammo'),
            profile_p1_UI.data.get('gems') 
                ]);
        });
	
    text_p2_UI = this.add.text(550, 562, '', { font: '16px Courier', fill: '#ffffff' });
	text_p2_UI.setDepth(2);
	profile_p2_UI = this.add.image(760, 510, 'j2').setScale(0.3,0.3); 
	profile_p2_UI.setDepth(1);
	var gem_Icon= this.add.image(580, 586, 'gem').setScale(0.6,0.6);
	gem_Icon.setDepth(1);
	var ammo_Icon= this.add.image(580, 569, 'ammo_item').setScale(0.4,0.3); 
	ammo_Icon.setDepth(1);
	spAtk_p2_UI=this.add.sprite(750, 530, 'special_attack_11').setScale(0.35,0.35);
	spAtk_p2_UI.anims.create({
            key: 'charge',
            frames: [
                { key: 'special_attack_1' , duration: 1500},
                { key: 'special_attack_2' , duration: 1500},
                { key: 'special_attack_3' , duration: 1500},
                { key: 'special_attack_4' , duration: 1500},
                { key: 'special_attack_5' , duration: 1500},
                { key: 'special_attack_6' , duration: 1500},
                { key: 'special_attack_7' , duration: 1500},
                { key: 'special_attack_8' , duration: 1500},
                { key: 'special_attack_9' , duration: 1500},
                { key: 'special_attack_10' , duration: 1500},
                { key: 'special_attack_11', duration: 1500 }
            ],
            frameRate: 10,
            repeat: 0
        });
	spAtk_p2_UI.setFlipX(true);
	spAtk_p2_UI.setDepth(1);
	var heartsF1_p2_UI=this.add.group({key: 'life_heart',
        repeat: 9,
        setXY: { x: 600, y:570 , stepX: 20 },
		setScale: { x: 0.5, y:0.5 }
	});
	heartsF1_p2_UI.setDepth(1);
		lives_p2_UI= heartsF1_p2_UI.getChildren();

	var heartsF2_p2_UI=this.add.group({key: 'life_heart',
        repeat: 9,
        setXY: { x: 600, y:585 , stepX: 20 },
		setScale: { x: 0.5, y:0.5 }

	});
	heartsF2_p2_UI.setDepth(1);
	var auxAr=heartsF2_p2_UI.getChildren();
	for( var i=0 ; i<10;i++){
		lives_p2_UI.push(auxAr[i]);
	}


        //  Store some data about this profile:
        profile_p2_UI.setDataEnabled();

        
        profile_p2_UI.data.set('ammo', player2.ammo);
        profile_p2_UI.data.set('gems', player2.gemsOwned);

        text_p2_UI.setText([
           
            profile_p2_UI.data.get('ammo'),
            profile_p2_UI.data.get('gems') 
        ]);
		profile_p2_UI.on('changedata-gems', function (gameObject, value) {
                text_p2_UI.setText([
	
             profile_p2_UI.data.get('ammo'),
             profile_p2_UI.data.get('gems') 
                ]);
        });
		
		profile_p2_UI.on('changedata-ammo', function (gameObject, value) {
                text_p2_UI.setText([
                    
             profile_p2_UI.data.get('ammo'),
             profile_p2_UI.data.get('gems') 
                ]);
        });
    //Knife
    knifeHitbox= this.add.rectangle(0,0,10,20, 0xffffff, 0);
    this.physics.add.existing(knifeHitbox);
    knifeHitbox.damage=3;
    knifeHitbox.body.enable=false;
    this.physics.world.remove(knifeHitbox.body);
    knifeHitbox.body.setAllowGravity(false);
    
    knifeHitbox2= this.add.rectangle(0,0,10,20, 0xffffff, 0);
    this.physics.add.existing(knifeHitbox2);
    knifeHitbox2.damage=3;
    knifeHitbox2.body.enable=false;
    this.physics.world.remove(knifeHitbox2.body);
    knifeHitbox2.body.setAllowGravity(false);
    //Circle for explosion
    blueSpecialAttack_Area=this.add.circle(90,90,90, 0xffffff,0.5);
    this.physics.add.existing(blueSpecialAttack_Area);
    blueSpecialAttack_Area.body.enable=false;
    blueSpecialAttack_Area.setVisible(false);
    blueSpecialAttack_Area.body.setAllowGravity(false);
    //Shield
    shield1=  this.physics.add.image(0, 0, 'shield_bubble').setScale(0.05,0.05).refreshBody();;
    shield1.body.enable=false;
    shield1.setVisible(false);
    shield1.body.setAllowGravity(false);
    
    shield2=  this.physics.add.image(0, 0, 'shield_bubble').setScale(0.05,0.05).refreshBody();;
    shield2.body.enable=false;
    shield2.setVisible(false);
    shield2.body.setAllowGravity(false);
    //Copia de Chilli
    if(chooseP1==='Chilli'){
    	pinkCopy= this.physics.add.sprite(0,0, chooseP1+'_idl');
    	pinkCopy.tag=1;
    	}
    else {
    	pinkCopy= this.physics.add.sprite(0,0, chooseP2+'_idl');
    	pinkCopy.tag=2;
    	}
    pinkCopy.body.enable=false;
    pinkCopy.setVisible(false);
    //Create StateMachine
    this.stateMachine_player1 = new StateMachine('idle', {
            idle: new IdleStateP1(),
            move: new MoveStateP1(),
            jump: new JumpStateP1(),
    		climb: new ClimbStateP1(),
			attack_knife: new AttackKnifeStateP1(),
            attack_pistol: new AttackPistolStateP1(),
    		getHit: new GetHitStateP1(),
    		death: new DeathStateP1(),
    		invisible: new InvisibleStateP1(),
         }, [this, player1]);

    this.stateMachine_player2 = new StateMachine('idle', {
            idle: new IdleStateP2(),
            move: new MoveStateP2(),
            jump: new JumpStateP2(),
    		climb: new ClimbStateP2(),
			attack_knife: new AttackKnifeStateP2(),
            attack_pistol: new AttackPistolStateP2(),
	   		getHit: new GetHitStateP2(),
    		death: new DeathStateP2(),
    		invisible: new InvisibleStateP2(),
          }, [this, player2]);
    
blueSpecialAttack_Explosion=this.add.sprite(0,0,'round_explosion_0');
blueSpecialAttack_Explosion.DelayTimer=0;
blueSpecialAttack_Explosion.exist=false;
blueSpecialAttack_Explosion.setVisible(false);
blueSpecialAttack_Explosion.anims.create({
	key: 'explosion',
        frames: this.anims.generateFrameNumbers('round_explosion', { start: 0, end: 71 }),
        frameRate: 20,
        repeat: 0
});
blueSpecialAttack_Explosion.anims.create({
            
	key: 'explosion',
            frames: [
                { key:'round_explosion_0', duration: 1500},
        { key:'round_explosion_1', duration: 50},
        { key:'round_explosion_2', duration: 50},
        { key:'round_explosion_3', duration: 50},
        { key:'round_explosion_4', duration: 50},
        { key:'round_explosion_5', duration: 50},
        { key:'round_explosion_6', duration: 50},
        { key:'round_explosion_7'},
        { key:'round_explosion_8'},
        { key:'round_explosion_9'},
        { key:'round_explosion_10'},
        { key:'round_explosion_11'},
        { key:'round_explosion_12'},
        { key:'round_explosion_13'},
        { key:'round_explosion_14'},
        { key:'round_explosion_15'},
        { key:'round_explosion_16'},
        { key:'round_explosion_17'},
        { key:'round_explosion_18'},
        { key:'round_explosion_19'},
        { key:'round_explosion_20'},
        //{ key:'round_explosion_21'},
        { key:'round_explosion_22'},
       // { key:'round_explosion_23'},
        { key:'round_explosion_24'},
       // { key:'round_explosion_25'},
        { key:'round_explosion_26'},
       // { key:'round_explosion_27'},
        { key:'round_explosion_28'},
       // { key:'round_explosion_29'},
        { key:'round_explosion_30'},
      //  { key:'round_explosion_31'},
        { key:'round_explosion_32'},
       // { key:'round_explosion_33'},
        { key:'round_explosion_34'},
      //  { key:'round_explosion_35'},
        { key:'round_explosion_36'},
       // { key:'round_explosion_37'},
        { key:'round_explosion_38'},
      //  { key:'round_explosion_39'},
        { key:'round_explosion_40'},
      //  { key:'round_explosion_41'},
        { key:'round_explosion_42'},
      //  { key:'round_explosion_43'},
        { key:'round_explosion_44'},
      //  { key:'round_explosion_45'},
        { key:'round_explosion_46'},
      //  { key:'round_explosion_47'},
        { key:'round_explosion_48'},
      //  { key:'round_explosion_49'},
        { key:'round_explosion_50'},
       // { key:'round_explosion_51'},
        { key:'round_explosion_52'},
      //  { key:'round_explosion_53'},
        { key:'round_explosion_54'},
      //  { key:'round_explosion_55'},
        { key:'round_explosion_56'},
     //   { key:'round_explosion_57'},
        { key:'round_explosion_58'},
       // { key:'round_explosion_59'},
        { key:'round_explosion_60'},
      //  { key:'round_explosion_61'},
        { key:'round_explosion_62'},
     //   { key:'round_explosion_63'},
        { key:'round_explosion_64'},
     //   { key:'round_explosion_65'},
        { key:'round_explosion_66'},
     //   { key:'round_explosion_67'},
        { key:'round_explosion_68'},
     //   { key:'round_explosion_69'},
        { key:'round_explosion_70'},
            ],
            frameRate: 10,
            repeat: 0
        });
    //Animaciones player1
	//Idle
	

    player1.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(chooseP1+'_idl', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
	//Run
	

    player1.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers(chooseP1+'_run', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	player1.anims.create({
        key: 'run_knife',
        frames: this.anims.generateFrameNumbers(chooseP1+'_run_knife', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	player1.anims.create({
        key: 'run_pistol',
        frames: this.anims.generateFrameNumbers(chooseP1+'_run_pistol', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	//Jump
	

    player1.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers(chooseP1+'_jump', { start: 3, end: 7 }),
        frameRate: 10,
		repeat:0
    });

	//Attack

   player1.anims.create({
        key: 'attack_knife',
        frames: this.anims.generateFrameNumbers(chooseP1+'_attack_knife', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player1.anims.create({
        key: 'attack_pistol',
        frames: this.anims.generateFrameNumbers(chooseP1+'_attack_pistol', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	 player1.anims.create({
        key: 'hurt',
        frames: this.anims.generateFrameNumbers(chooseP1+'_hurt', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player1.anims.create({
        key: 'death',
        frames: this.anims.generateFrameNumbers(chooseP1+'_death', { start: 0, end: 7 }),
        frameRate: 10,
		repeat:0
    });
	player1.anims.create({
        key: 'climb',
        frames: this.anims.generateFrameNumbers(chooseP1+'_climb', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
	player1.anims.create({
        key: 'invisible',
        frames: this.anims.generateFrameNumbers('Chilli_run_dust', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    //Animaciones player2
	//Idle
	

    player2.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(chooseP2+'_idl', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });
	//Run
    player2.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers(chooseP2+'_run', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	player2.anims.create({
        key: 'run_knife',
        frames: this.anims.generateFrameNumbers(chooseP2+'_run_knife', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	player2.anims.create({
        key: 'run_pistol',
        frames: this.anims.generateFrameNumbers(chooseP2+'_run_pistol', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

	//Jump	
    player2.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers(chooseP2+'_jump', { start: 3, end: 7 }),
        frameRate: 10,
		repeat:0
    });

	//Attack

    player2.anims.create({
        key: 'attack_knife',
        frames: this.anims.generateFrameNumbers(chooseP2+'_attack_knife', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player2.anims.create({
        key: 'attack_pistol',
        frames: this.anims.generateFrameNumbers(chooseP2+'_attack_pistol', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	 player2.anims.create({
        key: 'hurt',
        frames: this.anims.generateFrameNumbers(chooseP2+'_hurt', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player2.anims.create({
        key: 'death',
        frames: this.anims.generateFrameNumbers(chooseP2+'_death', { start: 0, end: 7 }),
        frameRate: 10,
		repeat:0
    });
	player2.anims.create({
        key: 'climb',
        frames: this.anims.generateFrameNumbers(chooseP2+'_climb', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
    player2.anims.create({
        key: 'invisible',
        frames: this.anims.generateFrameNumbers('Chilli_run_dust', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    //Copia
    if(pinkCopy.tag===1){
    pinkCopy.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(chooseP1+'_idl', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
    }else{
	pinkCopy.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(chooseP2+'_idl', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
}
    //Physics
    this.physics.add.collider(player1, platforms, null, checkUp);
    this.physics.add.collider(player2, platforms, null, checkUp);
    this.physics.add.collider(items_pistol, platforms);
    this.physics.add.collider(items_knife, platforms);
    this.physics.add.collider(gems, platforms);
    this.physics.add.collider(items_shield, platforms);
    this.physics.add.collider(items_power, platforms);
    this.physics.add.collider(items_speed, platforms);
    this.physics.add.collider(items_lemon, platforms);
    this.physics.add.collider(items_strawberry, platforms);
    this.physics.add.collider(items_grape, platforms);
    this.physics.add.collider(items_ammo, platforms);

    this.physics.add.collider(player1, player2);
    this.physics.add.overlap(player2, knifeHitbox, PlayerKnifeHitted,null, this);
    this.physics.add.overlap(player1, knifeHitbox2, PlayerKnifeHitted,null, this);
    this.physics.add.overlap(pinkCopy, knifeHitbox, CopyHitted,null, this);
    this.physics.add.overlap(pinkCopy, knifeHitbox2, CopyHitted,null, this);
	if(chooseP1==='Wasabi'){   this.physics.add.overlap(player2, blueSpecialAttack_Area, PlayerExplosionHitted,null, this);}
	else {    this.physics.add.overlap(player1, blueSpecialAttack_Area, PlayerExplosionHitted,null, this);}
    this.physics.add.overlap(player1, items_pistol, getPistol_P1, null, this);
    this.physics.add.overlap(player2, items_pistol, getPistol_P2, null, this);
    this.physics.add.overlap(player1, items_knife, getKnife_P1, null, this);
    this.physics.add.overlap(player2, items_knife, getKnife_P2, null, this);
	this.physics.add.overlap(player1, ladder, checkLadder, null, this);
	this.physics.add.overlap(player2, ladder, checkLadder, null, this);
	
	//objetos
    this.physics.add.overlap(player1, gems, collectGem, null, this);
    this.physics.add.overlap(player2, gems, collectGem, null, this);
	this.physics.add.overlap(player1, items_shield, collectShield, null, this);
    this.physics.add.overlap(player2, items_shield, collectShield, null, this);
	this.physics.add.overlap(player1, items_power, collectPower, null, this);
    this.physics.add.overlap(player2, items_power, collectPower, null, this);
	this.physics.add.overlap(player1, items_speed, collectSpeed, null, this);
    this.physics.add.overlap(player2, items_speed, collectSpeed, null, this);
	this.physics.add.overlap(player1, items_lemon, collectLemon, null, this);
    this.physics.add.overlap(player2, items_lemon, collectLemon, null, this);
	this.physics.add.overlap(player1, items_grape, collectGrape, null, this);
    this.physics.add.overlap(player2, items_grape, collectGrape, null, this);
	this.physics.add.overlap(player1, items_strawberry, collectStrawberry, null, this);
    this.physics.add.overlap(player2, items_strawberry, collectStrawberry, null, this);
	this.physics.add.overlap(player1, items_ammo, collectAmmo, null, this);
    this.physics.add.overlap(player2, items_ammo, collectAmmo, null, this);
	
	//ajax vars
	this.listaJugadores;
        this.mensajeError ;
        this.nJugadores;

    */
    }//create

  update(){
    /*
	//AJAX	
	
		if(id!=null){
			console.log("entra al if del null");

            $(document).ready(function () {

                $.ajax({

                    type: "GET",
                    url: "http://localhost:8080/player/name/"+id,
                    dataType: "text"

                }).fail(function () {
			//console.log("error get lista jugadores");

                    fallosServidor += 1;
                    if (fallosServidor > 2) {

                        errorServidor = "Servidor desconectado";
					//console.log(errorServidor);

                    }
                }).done(function (data) {
                    errorServidor = "Servidor conectado";
                    fallosServidor = 0;
                    player1.name =data;
                })

            });

        }
	///////////
	player1_name.x=player1.x-20;
	player1_name.y=player1.y-30;
	if(player1_name.text != player1.name){
		player1_name.text=player1.name;
	}
	onItemRespawnEvent(this);
	//text_time.setText('Event.progress: ' + timedCountdown.getProgress().toString().substr(0, 4));
	checkNoLadder();
	checkTimeSpecial(player1);
    checkTimeSpecial(player2)
	checkExplosion();
	if(chooseP1==='Wasabi'){checkDelayExplosion(player1,this)}
	if(chooseP2==='Wasabi'){checkDelayExplosion(player2,this)}
	if(player1.direction!=='right') {  player1.flipX = true; }
	if(player1.direction!=='left') {  player1.flipX = false; }
	if(player2.direction!=='right') {  player2.flipX = true;}
	if(player2.direction!=='left') {  player2.flipX = false; }
	      this.stateMachine_player1.step();
	      this.stateMachine_player2.step();


    if	(Phaser.Input.Keyboard.JustDown(input_Q)){
    	if(chooseP1==='Chilli'){pinkSpecialAttack(player1,this);	}
    	if(chooseP1==='Bernie'){whiteSpecialAttack(player1,player2);	}
    	if(chooseP1==='Wasabi'){blueSpecialAttack(player1,this);	}
    
    }
    
    if	(Phaser.Input.Keyboard.JustDown(input_U)){
    	if(chooseP2==='Chilli'){pinkSpecialAttack(player2,this);	}
    	if(chooseP2==='Bernie'){whiteSpecialAttack(player2,player1);	}
    	if(chooseP2==='Wasabi'){blueSpecialAttack(player2,this);	}
    
    }
    
    checkDebuffTime(player1, player2);
    checkBoosts(player1, player2)
	
    */
        }//update
        

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////PANTALLA ESCENARIO 3//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class PantallaEscenario3 extends Phaser.Scene{
    constructor(){
        //Escenario3--> nombre que se le da a la escena
        super({ key: "Escenario3"});
    }

    

    preload(){
    }


    create(){
	//Background
    this.add.image(400,300, 'bg_arboles');
    this.add.image(400,400, 'bg_tierra');

    //Pausa
    this.paus3 = this.add.image(750, 50, 'bPausa').setInteractive();
    this.paus3.setScale(0.5);

        
    this.paus3.on('pointerover', () => {
        this.paus3 = this.add.image(750, 50, 'bPausaActivado');
        this.paus3.setScale(0.5);
    });

    this.paus3.on('pointerout', () => {
        this.paus3 = this.add.image(750, 50, 'bPausa');
        this.paus3.setScale(0.5);
    });

    this.paus3.on('pointerdown', () => {
        sleepE3 = 'true';
        this.scene.sleep('Escenario3');
        this.scene.launch('Pausa');
        this.scene.moveAbove('Pausa');
    });

    /*
    //Musica
    bg_music_battleground_1 = this.sound.add('backgroundBattleMusic1');
    bg_music_battleground_1.setLoop(true);
    bg_music_battleground_1.play();
	sound_knife= this.sound.add('hit');
	sound_explosion= this.sound.add('explosion_sfx');
	sound_powerup= this.sound.add('powerUp');
	sound_shoot= this.sound.add('pistolFire');
	sound_getGem= this.sound.add('collect_gem');
	sound_pickupWeapon= this.sound.add('pickWeapon');

    //Timer
     lastTimeDebuff = 0;
    controlIimedItemRespawn_Gems=0;
    controlIimedItemRespawn_Fruits=0;
    controlIimedItemRespawn=0;
	controlIimedWeaponRespawn=0;
    text_time = this.add.text(32, 32);
    timedCountdown = this.time.delayedCall(75000, onCountDownEvent, [], this);

    timedItemRespawn = new Phaser.Time.TimerEvent({ delay: 4000 });
    this.time.addEvent(timedItemRespawn)
    
    //Plataformas
    platforms = this.physics.add.staticGroup();
	
	//Aquí van las plataformas/////////////////////////////////////////////////
	//Ejemplo-> platforms.create(720,424,'tierra_esq_sup_izq');

    
    //Escaleras
    
    ladder = this.physics.add.group();

	//Aquí van las escaleras/////////////////////////////////////////////////
	//Ejemplo-> ladder.create(80,264,'escalera');
	
     ladder.children.iterate(function (child) {
        //  Give each ladder no gravity
    child.body.setAllowGravity(false);

    });
    //Gemas
    gems = this.physics.add.group();
    
    //Items
    //item_pistol=this.physics.add.sprite(200, 450, 'pistol_item');
    //item_pistol.setCollideWorldBounds(true);
    
    //item_knife=this.physics.add.sprite(300, 450, 'knife_item');
    //item_knife.setCollideWorldBounds(true);
	items_pistol=this.physics.add.group();
	createPistol();
	items_knife=this.physics.add.group();
	createKnife();
    items_power=this.physics.add.group();
    items_speed=this.physics.add.group();
    items_shield=this.physics.add.group();
    items_lemon=this.physics.add.group();
    items_grape=this.physics.add.group();
    items_strawberry=this.physics.add.group();
    items_ammo=this.physics.add.group();
    

    //Input 
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    input_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    input_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    input_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    input_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    input_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    input_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    input_Shift= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    input_J=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    input_L=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    input_I=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    input_K=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    input_O=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    input_U=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);


    //Player 1
	respawn_P1.x=300;
	respawn_P1.y=450;
    player1 = this.physics.add.sprite(respawn_P1.x, respawn_P1.y, chooseP1+'_idl');
	player1.setBodySize(player1.width *0.5,player1.height *1);
	player1.tag=1;
	player1.name="default";
	player1.life = 20;
	player1.ammo = 10;
	player1.gemsOwned = 0;
	player1.direction='right';
	player1.hitted=false;
	player1.hasPistol=false;
	player1.hasKnife=false;
	player1.debuff=false;
	player1.strengthBoost=false;
	player1.speedBoost=false;
	player1.shieldBoost=false;
	player1.LastStrengthBoost=0;
	player1.LastSpeedBoost=0;
	player1.LastShieldBoost=0;
	player1.onLadder=false;
	player1.invisible=false;
	player1.LastTimeSpecial=0;
	player1.canSpecial=true;
    player1.setCollideWorldBounds(true);
player1_name=	this.add.text(player1.x, player1.y+20, player1.name, { font: '16px Courier', fill: '#ffffff' });
    //Player 2
	respawn_P2.x=400;
	respawn_P2.y=450;
  	player2 = this.physics.add.sprite(respawn_P2.x, respawn_P2.y, chooseP2+'_idl');
	player2.setBodySize(player2.width *0.5,player2.height *1);
	player2.tag=2;
	player2.life = 20;
	player2.ammo = 10;
	player2.gemsOwned = 0;
	player2.direction='right';
	player2.hitted=false;
	player2.hasPistol=false;
	player2.hasKnife=false;
	player2.debuff=false;
	player2.strengthBoost=false;
	player2.speedBoost=false;
	player2.shieldBoost=false;
	player2.LastStrengthBoost=0;
	player2.LastSpeedBoost=0;
	player2.LastShieldBoost=0;
	player2.onLadder=false;
	player2.invisible=false;
	player2.LastTimeSpecial=0;
	player2.canSpecial=true;
	player2.setCollideWorldBounds(true);
	
	
	player_Bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
	
	
	
	text_p1_UI = this.add.text(230, 562, '', { font: '16px Courier', fill: '#ffffff' });
	text_p1_UI.setDepth(2);
	profile_p1_UI = this.add.image(40, 510, 'j1').setScale(0.3,0.3); 
	profile_p1_UI.setDepth(1);
	var gem_Icon= this.add.image(220, 586, 'gem').setScale(0.6,0.6); 
	gem_Icon.setDepth(1);
	var ammo_Icon= this.add.image(220, 569, 'ammo_item').setScale(0.4,0.3); 
	ammo_Icon.setDepth(1);
	spAtk_p1_UI=this.add.sprite(50, 530, 'special_attack_11').setScale(0.35,0.35);
	spAtk_p1_UI.anims.create({
            key: 'charge',
            frames: [
                { key: 'special_attack_1' , duration: 1500},
                { key: 'special_attack_2' , duration: 1500},
                { key: 'special_attack_3' , duration: 1500},
                { key: 'special_attack_4' , duration: 1500},
                { key: 'special_attack_5' , duration: 1500},
                { key: 'special_attack_6' , duration: 1500},
                { key: 'special_attack_7' , duration: 1500},
                { key: 'special_attack_8' , duration: 1500},
                { key: 'special_attack_9' , duration: 1500},
                { key: 'special_attack_10', duration: 1500},
                { key: 'special_attack_11', duration: 1500 }
            ],
            frameRate: 10,
            repeat: 0
        });
	spAtk_p1_UI.setDepth(1);
	var heartsF1_p1_UI=this.add.group({key: 'life_heart',
        repeat: 9,
        setXY: { x: 20, y:570 , stepX: 20 },
		setScale: { x: 0.5, y:0.5 }
	});
	heartsF1_p1_UI.setDepth(1);
	lives_p1_UI=heartsF1_p1_UI.getChildren();
	var heartsF2_p1_UI=this.add.group({key: 'life_heart',
        repeat: 9,
        setXY: { x: 20, y:585 , stepX: 20 },
		setScale: { x: 0.5, y:0.5 }

	});
	heartsF2_p1_UI.setDepth(1);
	var auxArray=heartsF2_p1_UI.getChildren();
	for( var i=0 ; i<10;i++){
		lives_p1_UI.push(auxArray[i]);
	}
        //  Store some data about this profile:
        profile_p1_UI.setDataEnabled();

        profile_p1_UI.data.set('ammo', player1.ammo);
        profile_p1_UI.data.set('gems', player1.gemsOwned);

        text_p1_UI.setText([
         
            profile_p1_UI.data.get('ammo'),
            profile_p1_UI.data.get('gems') 
        ]);
		profile_p1_UI.on('changedata-gems', function (gameObject, value) {
                text_p1_UI.setText([
                   
            profile_p1_UI.data.get('ammo'),
           profile_p1_UI.data.get('gems') 
                ]);
        });
		profile_p1_UI.on('changedata-ammo', function (gameObject, value) {
                text_p1_UI.setText([
            profile_p1_UI.data.get('ammo'),
            profile_p1_UI.data.get('gems') 
                ]);
        });
	
    text_p2_UI = this.add.text(550, 562, '', { font: '16px Courier', fill: '#ffffff' });
	text_p2_UI.setDepth(2);
	profile_p2_UI = this.add.image(760, 510, 'j2').setScale(0.3,0.3); 
	profile_p2_UI.setDepth(1);
	var gem_Icon= this.add.image(580, 586, 'gem').setScale(0.6,0.6);
	gem_Icon.setDepth(1);
	var ammo_Icon= this.add.image(580, 569, 'ammo_item').setScale(0.4,0.3); 
	ammo_Icon.setDepth(1);
	spAtk_p2_UI=this.add.sprite(750, 530, 'special_attack_11').setScale(0.35,0.35);
	spAtk_p2_UI.anims.create({
            key: 'charge',
            frames: [
                { key: 'special_attack_1' , duration: 1500},
                { key: 'special_attack_2' , duration: 1500},
                { key: 'special_attack_3' , duration: 1500},
                { key: 'special_attack_4' , duration: 1500},
                { key: 'special_attack_5' , duration: 1500},
                { key: 'special_attack_6' , duration: 1500},
                { key: 'special_attack_7' , duration: 1500},
                { key: 'special_attack_8' , duration: 1500},
                { key: 'special_attack_9' , duration: 1500},
                { key: 'special_attack_10' , duration: 1500},
                { key: 'special_attack_11', duration: 1500 }
            ],
            frameRate: 10,
            repeat: 0
        });
	spAtk_p2_UI.setFlipX(true);
	spAtk_p2_UI.setDepth(1);
	var heartsF1_p2_UI=this.add.group({key: 'life_heart',
        repeat: 9,
        setXY: { x: 600, y:570 , stepX: 20 },
		setScale: { x: 0.5, y:0.5 }
	});
	heartsF1_p2_UI.setDepth(1);
		lives_p2_UI= heartsF1_p2_UI.getChildren();

	var heartsF2_p2_UI=this.add.group({key: 'life_heart',
        repeat: 9,
        setXY: { x: 600, y:585 , stepX: 20 },
		setScale: { x: 0.5, y:0.5 }

	});
	heartsF2_p2_UI.setDepth(1);
	var auxAr=heartsF2_p2_UI.getChildren();
	for( var i=0 ; i<10;i++){
		lives_p2_UI.push(auxAr[i]);
	}


        //  Store some data about this profile:
        profile_p2_UI.setDataEnabled();

        
        profile_p2_UI.data.set('ammo', player2.ammo);
        profile_p2_UI.data.set('gems', player2.gemsOwned);

        text_p2_UI.setText([
           
            profile_p2_UI.data.get('ammo'),
            profile_p2_UI.data.get('gems') 
        ]);
		profile_p2_UI.on('changedata-gems', function (gameObject, value) {
                text_p2_UI.setText([
	
             profile_p2_UI.data.get('ammo'),
             profile_p2_UI.data.get('gems') 
                ]);
        });
		
		profile_p2_UI.on('changedata-ammo', function (gameObject, value) {
                text_p2_UI.setText([
                    
             profile_p2_UI.data.get('ammo'),
             profile_p2_UI.data.get('gems') 
                ]);
        });
    //Knife
    knifeHitbox= this.add.rectangle(0,0,10,20, 0xffffff, 0);
    this.physics.add.existing(knifeHitbox);
    knifeHitbox.damage=3;
    knifeHitbox.body.enable=false;
    this.physics.world.remove(knifeHitbox.body);
    knifeHitbox.body.setAllowGravity(false);
    
    knifeHitbox2= this.add.rectangle(0,0,10,20, 0xffffff, 0);
    this.physics.add.existing(knifeHitbox2);
    knifeHitbox2.damage=3;
    knifeHitbox2.body.enable=false;
    this.physics.world.remove(knifeHitbox2.body);
    knifeHitbox2.body.setAllowGravity(false);
    //Circle for explosion
    blueSpecialAttack_Area=this.add.circle(90,90,90, 0xffffff,0.5);
    this.physics.add.existing(blueSpecialAttack_Area);
    blueSpecialAttack_Area.body.enable=false;
    blueSpecialAttack_Area.setVisible(false);
    blueSpecialAttack_Area.body.setAllowGravity(false);
    //Shield
    shield1=  this.physics.add.image(0, 0, 'shield_bubble').setScale(0.05,0.05).refreshBody();;
    shield1.body.enable=false;
    shield1.setVisible(false);
    shield1.body.setAllowGravity(false);
    
    shield2=  this.physics.add.image(0, 0, 'shield_bubble').setScale(0.05,0.05).refreshBody();;
    shield2.body.enable=false;
    shield2.setVisible(false);
    shield2.body.setAllowGravity(false);
    //Copia de Chilli
    if(chooseP1==='Chilli'){
    	pinkCopy= this.physics.add.sprite(0,0, chooseP1+'_idl');
    	pinkCopy.tag=1;
    	}
    else {
    	pinkCopy= this.physics.add.sprite(0,0, chooseP2+'_idl');
    	pinkCopy.tag=2;
    	}
    pinkCopy.body.enable=false;
    pinkCopy.setVisible(false);
    //Create StateMachine
    this.stateMachine_player1 = new StateMachine('idle', {
            idle: new IdleStateP1(),
            move: new MoveStateP1(),
            jump: new JumpStateP1(),
    		climb: new ClimbStateP1(),
			attack_knife: new AttackKnifeStateP1(),
            attack_pistol: new AttackPistolStateP1(),
    		getHit: new GetHitStateP1(),
    		death: new DeathStateP1(),
    		invisible: new InvisibleStateP1(),
         }, [this, player1]);

    this.stateMachine_player2 = new StateMachine('idle', {
            idle: new IdleStateP2(),
            move: new MoveStateP2(),
            jump: new JumpStateP2(),
    		climb: new ClimbStateP2(),
			attack_knife: new AttackKnifeStateP2(),
            attack_pistol: new AttackPistolStateP2(),
	   		getHit: new GetHitStateP2(),
    		death: new DeathStateP2(),
    		invisible: new InvisibleStateP2(),
          }, [this, player2]);
    
blueSpecialAttack_Explosion=this.add.sprite(0,0,'round_explosion_0');
blueSpecialAttack_Explosion.DelayTimer=0;
blueSpecialAttack_Explosion.exist=false;
blueSpecialAttack_Explosion.setVisible(false);
/*blueSpecialAttack_Explosion.anims.create({
	key: 'explosion',
        frames: this.anims.generateFrameNumbers('round_explosion', { start: 0, end: 71 }),
        frameRate: 20,
        repeat: 0
});
blueSpecialAttack_Explosion.anims.create({
            
	key: 'explosion',
            frames: [
                { key:'round_explosion_0', duration: 1500},
        { key:'round_explosion_1', duration: 50},
        { key:'round_explosion_2', duration: 50},
        { key:'round_explosion_3', duration: 50},
        { key:'round_explosion_4', duration: 50},
        { key:'round_explosion_5', duration: 50},
        { key:'round_explosion_6', duration: 50},
        { key:'round_explosion_7'},
        { key:'round_explosion_8'},
        { key:'round_explosion_9'},
        { key:'round_explosion_10'},
        { key:'round_explosion_11'},
        { key:'round_explosion_12'},
        { key:'round_explosion_13'},
        { key:'round_explosion_14'},
        { key:'round_explosion_15'},
        { key:'round_explosion_16'},
        { key:'round_explosion_17'},
        { key:'round_explosion_18'},
        { key:'round_explosion_19'},
        { key:'round_explosion_20'},
        //{ key:'round_explosion_21'},
        { key:'round_explosion_22'},
       // { key:'round_explosion_23'},
        { key:'round_explosion_24'},
       // { key:'round_explosion_25'},
        { key:'round_explosion_26'},
       // { key:'round_explosion_27'},
        { key:'round_explosion_28'},
       // { key:'round_explosion_29'},
        { key:'round_explosion_30'},
      //  { key:'round_explosion_31'},
        { key:'round_explosion_32'},
       // { key:'round_explosion_33'},
        { key:'round_explosion_34'},
      //  { key:'round_explosion_35'},
        { key:'round_explosion_36'},
       // { key:'round_explosion_37'},
        { key:'round_explosion_38'},
      //  { key:'round_explosion_39'},
        { key:'round_explosion_40'},
      //  { key:'round_explosion_41'},
        { key:'round_explosion_42'},
      //  { key:'round_explosion_43'},
        { key:'round_explosion_44'},
      //  { key:'round_explosion_45'},
        { key:'round_explosion_46'},
      //  { key:'round_explosion_47'},
        { key:'round_explosion_48'},
      //  { key:'round_explosion_49'},
        { key:'round_explosion_50'},
       // { key:'round_explosion_51'},
        { key:'round_explosion_52'},
      //  { key:'round_explosion_53'},
        { key:'round_explosion_54'},
      //  { key:'round_explosion_55'},
        { key:'round_explosion_56'},
     //   { key:'round_explosion_57'},
        { key:'round_explosion_58'},
       // { key:'round_explosion_59'},
        { key:'round_explosion_60'},
      //  { key:'round_explosion_61'},
        { key:'round_explosion_62'},
     //   { key:'round_explosion_63'},
        { key:'round_explosion_64'},
     //   { key:'round_explosion_65'},
        { key:'round_explosion_66'},
     //   { key:'round_explosion_67'},
        { key:'round_explosion_68'},
     //   { key:'round_explosion_69'},
        { key:'round_explosion_70'},
            ],
            frameRate: 10,
            repeat: 0
        });
    //Animaciones player1
	//Idle
	

    player1.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(chooseP1+'_idl', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
	//Run
	

    player1.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers(chooseP1+'_run', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	player1.anims.create({
        key: 'run_knife',
        frames: this.anims.generateFrameNumbers(chooseP1+'_run_knife', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	player1.anims.create({
        key: 'run_pistol',
        frames: this.anims.generateFrameNumbers(chooseP1+'_run_pistol', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	//Jump
	

    player1.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers(chooseP1+'_jump', { start: 3, end: 7 }),
        frameRate: 10,
		repeat:0
    });

	//Attack

   player1.anims.create({
        key: 'attack_knife',
        frames: this.anims.generateFrameNumbers(chooseP1+'_attack_knife', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player1.anims.create({
        key: 'attack_pistol',
        frames: this.anims.generateFrameNumbers(chooseP1+'_attack_pistol', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	 player1.anims.create({
        key: 'hurt',
        frames: this.anims.generateFrameNumbers(chooseP1+'_hurt', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player1.anims.create({
        key: 'death',
        frames: this.anims.generateFrameNumbers(chooseP1+'_death', { start: 0, end: 7 }),
        frameRate: 10,
		repeat:0
    });
	player1.anims.create({
        key: 'climb',
        frames: this.anims.generateFrameNumbers(chooseP1+'_climb', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
	player1.anims.create({
        key: 'invisible',
        frames: this.anims.generateFrameNumbers('Chilli_run_dust', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    //Animaciones player2
	//Idle
	

    player2.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(chooseP2+'_idl', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });
	//Run
    player2.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers(chooseP2+'_run', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	player2.anims.create({
        key: 'run_knife',
        frames: this.anims.generateFrameNumbers(chooseP2+'_run_knife', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	player2.anims.create({
        key: 'run_pistol',
        frames: this.anims.generateFrameNumbers(chooseP2+'_run_pistol', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

	//Jump	
    player2.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers(chooseP2+'_jump', { start: 3, end: 7 }),
        frameRate: 10,
		repeat:0
    });

	//Attack

    player2.anims.create({
        key: 'attack_knife',
        frames: this.anims.generateFrameNumbers(chooseP2+'_attack_knife', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player2.anims.create({
        key: 'attack_pistol',
        frames: this.anims.generateFrameNumbers(chooseP2+'_attack_pistol', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	 player2.anims.create({
        key: 'hurt',
        frames: this.anims.generateFrameNumbers(chooseP2+'_hurt', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player2.anims.create({
        key: 'death',
        frames: this.anims.generateFrameNumbers(chooseP2+'_death', { start: 0, end: 7 }),
        frameRate: 10,
		repeat:0
    });
	player2.anims.create({
        key: 'climb',
        frames: this.anims.generateFrameNumbers(chooseP2+'_climb', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
    player2.anims.create({
        key: 'invisible',
        frames: this.anims.generateFrameNumbers('Chilli_run_dust', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    //Copia
    if(pinkCopy.tag===1){
    pinkCopy.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(chooseP1+'_idl', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
    }else{
	pinkCopy.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(chooseP2+'_idl', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
}
    //Physics
    this.physics.add.collider(player1, platforms, null, checkUp);
    this.physics.add.collider(player2, platforms, null, checkUp);
    this.physics.add.collider(items_pistol, platforms);
    this.physics.add.collider(items_knife, platforms);
    this.physics.add.collider(gems, platforms);
    this.physics.add.collider(items_shield, platforms);
    this.physics.add.collider(items_power, platforms);
    this.physics.add.collider(items_speed, platforms);
    this.physics.add.collider(items_lemon, platforms);
    this.physics.add.collider(items_strawberry, platforms);
    this.physics.add.collider(items_grape, platforms);
    this.physics.add.collider(items_ammo, platforms);

    this.physics.add.collider(player1, player2);
    this.physics.add.overlap(player2, knifeHitbox, PlayerKnifeHitted,null, this);
    this.physics.add.overlap(player1, knifeHitbox2, PlayerKnifeHitted,null, this);
    this.physics.add.overlap(pinkCopy, knifeHitbox, CopyHitted,null, this);
    this.physics.add.overlap(pinkCopy, knifeHitbox2, CopyHitted,null, this);
	if(chooseP1==='Wasabi'){   this.physics.add.overlap(player2, blueSpecialAttack_Area, PlayerExplosionHitted,null, this);}
	else {    this.physics.add.overlap(player1, blueSpecialAttack_Area, PlayerExplosionHitted,null, this);}
    this.physics.add.overlap(player1, items_pistol, getPistol_P1, null, this);
    this.physics.add.overlap(player2, items_pistol, getPistol_P2, null, this);
    this.physics.add.overlap(player1, items_knife, getKnife_P1, null, this);
    this.physics.add.overlap(player2, items_knife, getKnife_P2, null, this);
	this.physics.add.overlap(player1, ladder, checkLadder, null, this);
	this.physics.add.overlap(player2, ladder, checkLadder, null, this);
	
	//objetos
    this.physics.add.overlap(player1, gems, collectGem, null, this);
    this.physics.add.overlap(player2, gems, collectGem, null, this);
	this.physics.add.overlap(player1, items_shield, collectShield, null, this);
    this.physics.add.overlap(player2, items_shield, collectShield, null, this);
	this.physics.add.overlap(player1, items_power, collectPower, null, this);
    this.physics.add.overlap(player2, items_power, collectPower, null, this);
	this.physics.add.overlap(player1, items_speed, collectSpeed, null, this);
    this.physics.add.overlap(player2, items_speed, collectSpeed, null, this);
	this.physics.add.overlap(player1, items_lemon, collectLemon, null, this);
    this.physics.add.overlap(player2, items_lemon, collectLemon, null, this);
	this.physics.add.overlap(player1, items_grape, collectGrape, null, this);
    this.physics.add.overlap(player2, items_grape, collectGrape, null, this);
	this.physics.add.overlap(player1, items_strawberry, collectStrawberry, null, this);
    this.physics.add.overlap(player2, items_strawberry, collectStrawberry, null, this);
	this.physics.add.overlap(player1, items_ammo, collectAmmo, null, this);
    this.physics.add.overlap(player2, items_ammo, collectAmmo, null, this);
	
	//ajax vars
	this.listaJugadores;
        this.mensajeError ;
        this.nJugadores;

    */
    }//create

  update(){

    /*
	//AJAX	
	
		if(id!=null){
			console.log("entra al if del null");

            $(document).ready(function () {

                $.ajax({

                    type: "GET",
                    url: "http://localhost:8080/player/name/"+id,
                    dataType: "text"

                }).fail(function () {
			//console.log("error get lista jugadores");

                    fallosServidor += 1;
                    if (fallosServidor > 2) {

                        errorServidor = "Servidor desconectado";
					//console.log(errorServidor);

                    }
                }).done(function (data) {
                    errorServidor = "Servidor conectado";
                    fallosServidor = 0;
                    player1.name =data;
                })

            });

        }
	///////////
	player1_name.x=player1.x-20;
	player1_name.y=player1.y-30;
	if(player1_name.text != player1.name){
		player1_name.text=player1.name;
	}
	onItemRespawnEvent(this);
	//text_time.setText('Event.progress: ' + timedCountdown.getProgress().toString().substr(0, 4));
	checkNoLadder();
	checkTimeSpecial(player1);
    checkTimeSpecial(player2)
	checkExplosion();
	if(chooseP1==='Wasabi'){checkDelayExplosion(player1,this)}
	if(chooseP2==='Wasabi'){checkDelayExplosion(player2,this)}
	if(player1.direction!=='right') {  player1.flipX = true; }
	if(player1.direction!=='left') {  player1.flipX = false; }
	if(player2.direction!=='right') {  player2.flipX = true;}
	if(player2.direction!=='left') {  player2.flipX = false; }
	      this.stateMachine_player1.step();
	      this.stateMachine_player2.step();


    if	(Phaser.Input.Keyboard.JustDown(input_Q)){
    	if(chooseP1==='Chilli'){pinkSpecialAttack(player1,this);	}
    	if(chooseP1==='Bernie'){whiteSpecialAttack(player1,player2);	}
    	if(chooseP1==='Wasabi'){blueSpecialAttack(player1,this);	}
    
    }
    
    if	(Phaser.Input.Keyboard.JustDown(input_U)){
    	if(chooseP2==='Chilli'){pinkSpecialAttack(player2,this);	}
    	if(chooseP2==='Bernie'){whiteSpecialAttack(player2,player1);	}
    	if(chooseP2==='Wasabi'){blueSpecialAttack(player2,this);	}
    
    }
    
    checkDebuffTime(player1, player2);
    checkBoosts(player1, player2)
	
    */
        }//update

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////FUNCIONES ///////////////////////////////////////////////////////
///Funciones de timer///
function onCountDownEvent (){

    bg_music_battleground_1.setLoop(false);
    bg_music_battleground_1.stop();
    this.scene.start('Resultados');
    
}
function onItemRespawnEvent(scene){
	 
	var progress = timedItemRespawn.getProgress();
	if(progress===1){
		controlIimedItemRespawn_Fruits+=1;
		controlIimedItemRespawn_Gems+=1;
		controlIimedItemRespawn+=1;
		controlIimedWeaponRespawn+=1;
		}
	if(controlIimedItemRespawn_Gems>300){
		controlIimedItemRespawn_Gems=0;
		createGem();
	}
	if(controlIimedItemRespawn_Fruits>700){
		controlIimedItemRespawn_Fruits=0;
		switch(Phaser.Math.Between(0, 2)){
			case 0:
			createStrawberry();
			break;
			case 1:
			createLemon();
			break;
			case 2:
			createGrape();
			break;
		}
	}
	if(controlIimedItemRespawn>900){
		controlIimedItemRespawn=0;
		switch(Phaser.Math.Between(0, 3)){
			case 0:
			createShield();
			break;
			case 1:
			createSpeed();
			break;
			case 2:
			createPower();
			break;
			case 3:
			createAmmo();
			break;
		}
	}
	
	if(controlIimedWeaponRespawn>100){
		controlIimedWeaponRespawn=0;
		scene.time.addEvent(timedItemRespawn);
		switch(Phaser.Math.Between(0, 1)){
		case 0:
		createPistol();
		break;
		case 1:
		createKnife();
		break;
		}

	}
}
//Ataques especiales//
function pinkSpecialAttack(player, gameObject){
	if(player.canSpecial&&player.invisible===false){
		if(player.tag===1){		spAtk_p1_UI.play('charge');
		}else if(player.tag===2){		spAtk_p2_UI.play('charge');}
	player.invisible=true;
	player.LastTimeSpecial=0;
	player.canSpecial=false;
	pinkCopy.setVisible(true);
	pinkCopy.body.enable=true;
	pinkCopy.x=player.x;
	pinkCopy.y=player.y;    
	pinkCopy.play('idle',true);
	gameObject.physics.add.collider(pinkCopy, platforms);	
	}
}

function whiteSpecialAttack(playerAttack, playerHurt){
	if(playerAttack.canSpecial){
		if(playerAttack.tag===1){		spAtk_p1_UI.play('charge');
		}else if(playerAttack.tag===2){		spAtk_p2_UI.play('charge');}
	playerHurt.debuff=true;
	playerHurt.setTint(0xB0BEC5);
	playerAttack.LastTimeSpecial=0;
	playerAttack.canSpecial=false;
	}
}
function blueSpecialAttack(player,scene){
	if(player.canSpecial){
		if(player.tag===1){		spAtk_p1_UI.play('charge');
		}else if(player.tag===2){		spAtk_p2_UI.play('charge');}
	//timedCharge=scene.time.delayedCall(300, blueSpecialAttack_HitBox(player), [], this);
	
	player.LastTimeSpecial=0;
	player.canSpecial=false;
	//blueSpecialAttack_Area.setVisible(true);
	blueSpecialAttack_Explosion.setVisible(true);
	blueSpecialAttack_Explosion.x=player.body.center.x;
	blueSpecialAttack_Explosion.y=player.body.center.y;
	blueSpecialAttack_Explosion.setScale(1.2,1.2);
	blueSpecialAttack_Explosion.exist=true;
	blueSpecialAttack_Explosion.anims.play('explosion');
	
	}
}
function blueSpecialAttack_HitBox(player){
	blueSpecialAttack_Area.body.enable=true;
	blueSpecialAttack_Area.x=player.body.center.x;
	blueSpecialAttack_Area.y=player.body.center.y;
}
function checkDelayExplosion(player,scene){
	if(blueSpecialAttack_Explosion.exist){
	blueSpecialAttack_Explosion.DelayTimer+=1;
	if(blueSpecialAttack_Explosion.DelayTimer>130){
		blueSpecialAttack_Explosion.DelayTimer=0;
   		 sound_explosion.play();
		blueSpecialAttack_Explosion.exist=false;
		blueSpecialAttack_HitBox(player);
	}
	}
}
function checkTimeSpecial(player){
	if(chooseP2 ==='Wasabi' && blueSpecialAttack_Explosion.visible===true){
		player2.x=blueSpecialAttack_Explosion.x;
		player2.y=blueSpecialAttack_Explosion.y;
		}
	if(chooseP1 ==='Wasabi'&& blueSpecialAttack_Explosion.visible===true){
		player1.x=blueSpecialAttack_Explosion.x;
		player1.y=blueSpecialAttack_Explosion.y;
	}

	blueSpecialAttack_Explosion.once('animationcomplete', () => {
		blueSpecialAttack_Explosion.setVisible(false);
    	});
	if(!player.canSpecial){
	player.LastTimeSpecial+=1;
	if(player.LastTimeSpecial>1000){
		player.LastTimeSpecial=0;
		player.canSpecial=true;
	}
	}
}
function checkDebuffTime(player1, player2){
	if(player1.debuff || player2.debuff){
		lastTimeDebuff+=1;
	}
	if(lastTimeDebuff>1000){
		lastTimeDebuff=0;
		player1.debuff=false;
		player2.debuff=false;
		player1.clearTint();
		player2.clearTint();
	}
}
function checkExplosion(){
	if(blueSpecialAttack_Area.body.enable){
	blueSpecialAttack_Area.body.enable=false;
	blueSpecialAttack_Area.setVisible(false);

	}
}

//Relacionadas con objetos////////////////////////
function collectGem(player, gem,scene){
    sound_getGem.play();
	gem.disableBody(true, true);

    //  Add and update the score
if(player.tag===2){
	player.gemsOwned+=1;
	profile_p2_UI.data.values.gems += 1;
}else{
	player.gemsOwned+=1;
	profile_p1_UI.data.values.gems += 1;
}
    
}


function PlayerLoseGems(player, gameObject){
gems.create(player.body.center.x+10,player.body.center.y-50,'gem');
gems.create(player.body.center.x-10,player.body.center.y-50,'gem');
gems.create(player.body.center.x,player.body.center.y-50,'gem');
if(player.tag===2){
	profile_p2_UI.data.values.gems -= 3;
	player2.gemsOwned-=3;
	}else if(player.tag===1){
	profile_p1_UI.data.values.gems -= 3;
	player1.gemsOwned-=3;
	}
			

}

function getPistol_P1(player, pistol,scene){
	//console.log("entra en getPistol_P1");
	if((online && inputDown && cargoPj !=='player1')||(online && Phaser.Input.Keyboard.JustDown(input_S)&&cargoPj ==='player1')){
if(cargoPj==='player1'){
	//console.log("send Down");
							movePlayer.send(JSON.stringify("down"));
		}   
if(cargoPj!=='player1'){
	//console.log("player1 online entra en getPistol");
						
		}  	
		sound_pickupWeapon.play();
		pistol.disableBody(true, true);
		player.hasPistol=true;
	//	console.log("player 1 pistol"+player1.hasPistol);
		player.hasKnife=false;
				if(inputDown && player.hasPistol && cargoPj !=='player1'){inputDown=false;}
	}else if(!online && Phaser.Input.Keyboard.JustDown(input_S)){
		sound_pickupWeapon.play();
		pistol.disableBody(true, true);
		player.hasPistol=true;
		player.hasKnife=false;
	}
}
function getKnife_P1(player, knife,scene){
	//	console.log("entra en getKnife_P1");
		
	if((online && inputDown && cargoPj !=='player1')||(online && Phaser.Input.Keyboard.JustDown(input_S)&&cargoPj ==='player1')){
		if(cargoPj==='player1'){
							movePlayer.send(JSON.stringify("down"));
		}
		if(cargoPj!=='player1'){
	//console.log("player1 online entra en getKnife");
						
		} 
		sound_pickupWeapon.play();
	knife.disableBody(true, true);
	player.hasPistol=false;
	player.hasKnife=true;
			//console.log("player 1 knife"+player1.hasKnife);
		if(inputDown  && player.hasKnife && cargoPj !=='player1'){inputDown=false;}
	}
	else if(!online && Phaser.Input.Keyboard.JustDown(input_S)){
		    sound_pickupWeapon.play();
	knife.disableBody(true, true);
	player.hasPistol=false;
	player.hasKnife=true;
	}
}

function getPistol_P2(player, pistol,scene){
	if((online && inputDown && cargoPj !=='player2')||(online && Phaser.Input.Keyboard.JustDown(input_S)&&cargoPj ==='player2')){
	if(cargoPj==='player2'){
							movePlayer.send(JSON.stringify("down"));
		}
	sound_pickupWeapon.play();
	pistol.disableBody(true, true);
	player.hasPistol=true;
	player.hasKnife=false;
		if(inputDown && player.hasPistol && cargoPj !=='player2'){inputDown=false;}
	}
	else if(!online && Phaser.Input.Keyboard.JustDown(input_K)){
		    sound_pickupWeapon.play();
	pistol.disableBody(true, true);
	player.hasPistol=true;
	player.hasKnife=false;
	}
}
function getKnife_P2(player, knife,scene){
	if((online && inputDown && cargoPj !=='player2')||(online && Phaser.Input.Keyboard.JustDown(input_S)&&cargoPj ==='player2'))
	{
		if(cargoPj==='player2'){
							movePlayer.send(JSON.stringify("down"));
		}
	sound_pickupWeapon.play();
	knife.disableBody(true, true);
	player.hasPistol=false;
	player.hasKnife=true;
	if(inputDown && player.hasKnife && cargoPj !=='player2'){inputDown=false;}
	}
    else if(!online && Phaser.Input.Keyboard.JustDown(input_K)){
	sound_pickupWeapon.play();
	knife.disableBody(true, true);
	player.hasPistol=false;
	player.hasKnife=true;
	}
	
}


function createPistol(){
	
            let x = Phaser.Math.Between(150, 690);
            let y = Phaser.Math.Between(0, 530);
		items_pistol.create(x,y,'pistol_item');  
		if(online){
			var aux = { name: "ptl", x: x, y: y };
			var auxJSON = JSON.stringify(aux);
			respawnItemsHandler.send(auxJSON);
		}
}
function createKnife(){
	
            let x = Phaser.Math.Between(150, 690);
            let y = Phaser.Math.Between(0, 530);
		items_knife.create(x,y,'knife_item'); 
		if(online){
			var aux = { name: "knf", x: x, y: y };
			var auxJSON = JSON.stringify(aux);
			respawnItemsHandler.send(auxJSON);
		} 
}
function createGem(){
	
            let x = Phaser.Math.Between(150, 690);
            let y = Phaser.Math.Between(0, 530);
		gems.create(x,y,'gem');  
		if(online){
			var aux = { name: "gem", x: x, y: y };
			var auxJSON = JSON.stringify(aux);
			respawnItemsHandler.send(auxJSON);
		}
}
function createShield(){
	
            let x = Phaser.Math.Between(150, 690);
            let y = Phaser.Math.Between(0, 530);
		items_shield.create(x,y,'shield_item'); 
	if(online){
			var aux = { name: "shd", x: x, y: y };
			var auxJSON = JSON.stringify(aux);
			respawnItemsHandler.send(auxJSON);
		}	 
}
function createPower(){
	
            let x = Phaser.Math.Between(150, 690);
            let y = Phaser.Math.Between(0, 530);
		items_power.create(x,y,'power_item');  
		if(online){
			var aux = { name: "pow", x: x, y: y };
			var auxJSON = JSON.stringify(aux);
			respawnItemsHandler.send(auxJSON);
		}	 
}
function createSpeed(){
	
            let x = Phaser.Math.Between(150, 690);
            let y = Phaser.Math.Between(0, 530);
		items_speed.create(x,y,'speed_item');  
		if(online){
			var aux = { name: "spd", x: x, y: y };
			var auxJSON = JSON.stringify(aux);
			respawnItemsHandler.send(auxJSON);
		}	 
}
function createLemon(){
	
            let x = Phaser.Math.Between(150, 690);
            let y = Phaser.Math.Between(0, 530);
		items_lemon.create(x,y,'lemon_item');  
		if(online){
			var aux = { name: "lem", x: x, y: y };
			var auxJSON = JSON.stringify(aux);
			respawnItemsHandler.send(auxJSON);
		}	 
}
function createGrape(){
	
            let x = Phaser.Math.Between(150, 690);
            let y = Phaser.Math.Between(0, 530);
		items_grape.create(x,y,'grape_item');  
		if(online){
			var aux = { name: "grp", x: x, y: y };
			var auxJSON = JSON.stringify(aux);
			respawnItemsHandler.send(auxJSON);
		}	 
}
function createStrawberry(){
	
            let x = Phaser.Math.Between(150, 690);
            let y = Phaser.Math.Between(0, 530);
		items_strawberry.create(x,y,'strawberry_item'); 
		if(online){
			var aux = { name: "stb", x: x, y: y };
			var auxJSON = JSON.stringify(aux);
			respawnItemsHandler.send(auxJSON);
		}	  
}
function createAmmo(){
	
            let x = Phaser.Math.Between(150, 690);
            let y = Phaser.Math.Between(0, 530);
		items_ammo.create(x,y,'ammo_item').setScale(0.3,0.3).refreshBody(); 
		if(online){
			var aux = { name: "amo", x: x, y: y };
			var auxJSON = JSON.stringify(aux);
			respawnItemsHandler.send(auxJSON);
		}	  
}

function collectLemon(player, lemon,scene){
    sound_powerup.play();
	lemon.disableBody(true, true);
	if(player.life<20){
	if(player.tag===2){
lives_p2_UI[player.life].setVisible(true);
	}else{
lives_p1_UI[player.life].setVisible(true);
	}
	player.life++;
	}	
}
function collectGrape(player, grape,scene){
	sound_powerup.play();
	grape.disableBody(true, true);
	if(player.life<20){
	if(player.tag===2){
lives_p2_UI[player.life].setVisible(true);
if(player.life<19){lives_p2_UI[player.life+1].setVisible(true);}
if(player.life<18){lives_p2_UI[player.life+2].setVisible(true);}

	}else{
lives_p1_UI[player.life].setVisible(true);
if(player.life<19){lives_p1_UI[player.life+1].setVisible(true);}
if(player.life<18){lives_p1_UI[player.life+2].setVisible(true);}

	}
	player.life+=3;
	}
}
function collectStrawberry(player, strawberry,scene){
	sound_powerup.play();
	strawberry.disableBody(true, true);
	if(player.life<20){
	if(player.tag===2){
lives_p2_UI[player.life].setVisible(true);
if(player.life<19){lives_p2_UI[player.life+1].setVisible(true);}
if(player.life<18){lives_p2_UI[player.life+2].setVisible(true);}
if(player.life<17){lives_p2_UI[player.life+3].setVisible(true);}
if(player.life<16){lives_p2_UI[player.life+4].setVisible(true);}

	}else{
lives_p1_UI[player.life].setVisible(true);
if(player.life<19){lives_p1_UI[player.life+1].setVisible(true);}
if(player.life<18){lives_p1_UI[player.life+2].setVisible(true);}
if(player.life<17){lives_p1_UI[player.life+3].setVisible(true);}
if(player.life<16){lives_p1_UI[player.life+4].setVisible(true);}

	}
		player.life+=5;
		}
}

function collectPower(player, power, scene){
	sound_powerup.play();
	power.disableBody(true, true);
	player.strengthBoost=true;

}
function collectSpeed(player, speed,scene){
	sound_powerup.play();
	speed.disableBody(true, true);
	player.speedBoost=true;
}
function collectShield(player, shield_,scene){
	sound_powerup.play();
	shield_.disableBody(true, true);
	if(player.tag===2){
	shield2.setVisible(true);
	shield2.body.enable=true;
	shield2.x=player.x;
	shield2.y=player.y;
	}else{
	shield1.setVisible(true);
	shield1.body.enable=true;
	shield1.x=player.x;
	shield1.y=player.y;
	}
	player.shieldBoost=true;
	}
	function collectAmmo(player, ammo, scene){
	sound_powerup.play();
	ammo.disableBody(true, true);
	if(player.tag===2){
	profile_p2_UI.data.values.ammo = 10;
	}else{
	profile_p1_UI.data.values.ammo = 10;
	}
	player.ammo=10;
}
function checkBoosts(player1, player2){
	
	if(player1.strengthBoost ||player2.strengthBoost){
		if(player1.strengthBoost){
		player1.LastStrengthBoost+=1;
		}
		if(player2.strengthBoost){
		player2.LastStrengthBoost+=1;
		}
		if(player1.LastStrengthBoost>1000){
		player1.LastStrengthBoost=0;
		player1.strengthBoost=false;
		}
		if(player2.LastStrengthBoost>1000){
		player2.LastStrengthBoost=0;
		player2.strengthBoost=false;
		}
	}
	if(player1.speedBoost ||player2.speedBoost){
		if(player1.speedBoost){
		player1.LastSpeedBoost+=1;
		}
		if(player2.speedBoost){
		player2.LastSpeedBoost+=1;
		}
		if(player1.LastSpeedBoost>1000){
		player1.LastSpeedBoost=0;
		player1.speedBoost=false;
		}
		if(player2.LastSpeedBoost>1000){
		player2.LastSpeedBoost=0;
		player2.speedBoost=false;
		}
	}
	if(player1.shieldBoost ||player2.shieldBoost){
		if(player1.shieldBoost){
			shield1.x=player1.x;
			shield1.y=player1.y;
		player1.LastShieldBoost+=1;
		}
		if(player2.shieldBoost){
			shield2.x=player2.x;
			shield2.y=player2.y;
		player2.LastShieldBoost+=1;
		}
		if(player1.LastShieldBoost>1000){
		player1.LastShieldBoost=0;
		player1.shieldBoost=false;
		shield1.body.enable=false;
		shield1.setVisible(false);
		}
		if(player2.LastShieldBoost>1000){
		player2.LastShieldBoost=0;
		player2.shieldBoost=false;
		shield2.body.enable=false;
		shield2.setVisible(false);
		}
	}
	
}

////////////////////////////////
function playerFire (player, direction, gameObject) {
	if(player.tag===2){
			profile_p2_UI.data.values.ammo -= 1;

	}else{
			profile_p1_UI.data.values.ammo -= 1;

	}
player.ammo--;
        // Get bullet from bullets group
        var bullet = player_Bullets.get().setActive(true).setVisible(true);
if(player.strengthBoost){bullet.damage=2; }else{bullet.damage=1; }

			bullet.body.enable=true;
        if (bullet)
        {
	
            bullet.fire(player.x,player.y, direction);
            gameObject.physics.add.collider(bullet, player2);
   		gameObject.physics.add.overlap(player2, bullet, PlayerHitted, null, this);
   		gameObject.physics.add.overlap(player1, bullet, PlayerHitted, null, this);
    	gameObject.physics.add.overlap(pinkCopy, bullet, CopyHitted, null, this);


        }
    }
//Funcion hitteado
function PlayerHitted(player,bullet){
	bullet.setActive(false);
    bullet.setVisible(false);
	//player.setTint(0xff0000);
	if	(bullet.body.enable){
		if(!player.shieldBoost){
	player.hitted=true;
	if(bullet.damage===2){	player.life-=2;
	if(player.tag===2){
	if(0<=(player.life+1) && (player.life+1)<lives_p2_UI.length){	lives_p2_UI[player.life+1].setVisible(false);	}
	if(0<=(player.life) && (player.life)<lives_p2_UI.length){lives_p2_UI[player.life].setVisible(false);}

	}else{
if(0<=(player.life+1) && (player.life+1)<lives_p1_UI.length){lives_p1_UI[player.life+1].setVisible(false);}
if(0<=(player.life) && (player.life)<lives_p1_UI.length){lives_p1_UI[player.life].setVisible(false);}
	}
	}
	else{player.life--;
		if(player.tag===2){
if(0<=(player.life) && (player.life)<lives_p2_UI.length){lives_p2_UI[player.life].setVisible(false);}
		}else{
if(0<=(player.life) && (player.life)<lives_p1_UI.length){lives_p1_UI[player.life].setVisible(false);}
	}
	}
	}
	bullet.body.enable=false;
	
	
	}
	
}
function PlayerKnifeHitted(player,rectangle){
if	(rectangle.body.enable){
		player.hitted=true;
		if(rectangle.damage===5){	player.life-=5;
			if(player.tag===2){
if(0<=(player.life+4) && (player.life+4)<lives_p2_UI.length){lives_p2_UI[player.life+4].setVisible(false);}
if(0<=(player.life+3) && (player.life+3)<lives_p2_UI.length){lives_p2_UI[player.life+3].setVisible(false);}
if(0<=(player.life+2) && (player.life+2)<lives_p2_UI.length){lives_p2_UI[player.life+2].setVisible(false);}
if(0<=(player.life+1) && (player.life+1)<lives_p2_UI.length){lives_p2_UI[player.life+1].setVisible(false);}
if(0<=(player.life) && (player.life)<lives_p2_UI.length){lives_p2_UI[player.life].setVisible(false);}
			}else{
if(0<=(player.life+4) && (player.life+4)<lives_p1_UI.length){lives_p1_UI[player.life+4].setVisible(false);}
if(0<=(player.life+3) && (player.life+3)<lives_p1_UI.length){lives_p1_UI[player.life+3].setVisible(false);}
if(0<=(player.life+2) && (player.life+2)<lives_p1_UI.length){lives_p1_UI[player.life+2].setVisible(false);}
if(0<=(player.life+1) && (player.life+1)<lives_p1_UI.length){lives_p1_UI[player.life+1].setVisible(false);}
if(0<=(player.life) && (player.life)<lives_p1_UI.length){lives_p1_UI[player.life].setVisible(false);}

			}
		}
		else{player.life-=3;
			if(player.tag===2){
if(0<=(player.life+2) && (player.life+2)<lives_p2_UI.length){lives_p2_UI[player.life+2].setVisible(false);}
if(0<=(player.life+1) && (player.life+1)<lives_p2_UI.length){lives_p2_UI[player.life+1].setVisible(false);}
if(0<=(player.life) && (player.life)<lives_p2_UI.length){lives_p2_UI[player.life].setVisible(false);}
			}else{
if(0<=(player.life+2) && (player.life+2)<lives_p1_UI.length){lives_p1_UI[player.life+2].setVisible(false);}
if(0<=(player.life+1) && (player.life+1)<lives_p1_UI.length){lives_p1_UI[player.life+1].setVisible(false);}
if(0<=(player.life) && (player.life)<lives_p1_UI.length){lives_p1_UI[player.life].setVisible(false);}
			}
		}
		rectangle.body.enable=false;
		
}
}
function PlayerExplosionHitted(player,circle){
if	(blueSpecialAttack_Area.body.enable){
		player.hitted=true;
		player.life-=3;
		if(player.tag===2){
			
if(0<=(player.life+2) && (player.life+2)<lives_p2_UI.length){lives_p2_UI[player.life+2].setVisible(false);}
if(0<=(player.life+1) && (player.life+1)<lives_p2_UI.length){lives_p2_UI[player.life+1].setVisible(false);}
if(0<=(player.life) && (player.life)<lives_p2_UI.length){lives_p2_UI[player.life].setVisible(false);}
		}else{
if(0<=(player.life+2) && (player.life+2)<lives_p1_UI.length){lives_p1_UI[player.life+2].setVisible(false);}
if(0<=(player.life+1) && (player.life+1)<lives_p1_UI.length){lives_p1_UI[player.life+1].setVisible(false);}
if(0<=(player.life) && (player.life)<lives_p1_UI.length){lives_p1_UI[player.life].setVisible(false);}
		}
}
}
function CopyHitted(copy){
	copy.disableBody(true, true);
	if(pinkCopy.tag===2){
			player2.invisible=false;
					//player2.canSpecial=true;

	}else{
			player1.invisible=false;
					//player1.canSpecial=true;

	}
	
}
function checkLadder(player, ladder)
    {
        player.onLadder=true;
    }

function checkUp(player){
	if((player.onLadder===true) && (player.body.velocity.y<0)){
		return false;
	}	
	return true;
}
function checkNoLadder(){
	if(	player1.body.touching.none){
		player1.onLadder=false;
	}
	if(	player2.body.touching.none){
		player2.onLadder=false;
	}
}

function respawnPlayer1(){
	player1.setVisible(true);
	player1.x=respawn_P1.x;
	player1.y=respawn_P1.y;
	player1.life = 20;
	player1.ammo = 10;
	player1.direction='right';
	player1.hitted=false;
	player1.hasPistol=false;
	player1.hasKnife=false;
	player1.debuff=false;
	player1.strengthBoost=false;
	player1.speedBoost=false;
	player1.shieldBoost=false;
	player1.LastStrengthBoost=0;
	player1.LastSpeedBoost=0;
	player1.LastShieldBoost=0;
	player1.onLadder=false;
	player1.invisible=false;
	profile_p1_UI.data.values.ammo=player1.ammo;
	profile_p1_UI.data.values.gems=player1.gemsOwned;

	for(var i=0; i<20;i++){
		lives_p1_UI[i].setVisible(true);
	}
}
function respawnPlayer2(){
	player2.setVisible(true);
	player2.x=respawn_P2.x;
	player2.y=respawn_P2.y;
	player2.life = 20;
	player2.ammo = 10;
	player2.direction='right';
	player2.hitted=false;
	player2.hasPistol=false;
	player2.hasKnife=false;
	player2.debuff=false;
	player2.strengthBoost=false;
	player2.speedBoost=false;
	player2.shieldBoost=false;
	player2.LastStrengthBoost=0;
	player2.LastSpeedBoost=0;
	player2.LastShieldBoost=0;
	player2.onLadder=false;
	profile_p2_UI.data.values.ammo=player2.ammo;
	profile_p2_UI.data.values.gems=player2.gemsOwned;

	for(var i=0; i<20;i++){
		lives_p2_UI[i].setVisible(true);
	}
}

///STATES P1//////////
class IdleStateP1 extends State {
  enter(scene, player1) {
    player1.setVelocityX(0);
	player1.onLadder=false;
	if(player1.invisible){
			player1.anims.play('invisible',true);

	}else{
			player1.anims.play('idle',true);

	}
  }
  
  execute(scene, player1) {
   // const {input_A, input_D, spaceBar} = scene.keys;
    
    // Transition to jump if pressing space
    if ((spaceBar.isDown)  && player1.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    // Transition to attack if pressing e
    if (input_E.isDown && player1.hasKnife===true) {
	if(online){
		movePlayer.send(JSON.stringify("attack"));
	}
			console.log("dentro de State para cuchillo");
      this.stateMachine.transition('attack_knife');
      return;
    }
	if (Phaser.Input.Keyboard.JustDown(input_E) && player1.hasPistol===true && player1.ammo>0) {
	if(online){
		movePlayer.send(JSON.stringify("attack"));
	}		console.log("dentro de State para pistola");
      this.stateMachine.transition('attack_pistol');
      return;
    }
    // Transition to move if pressing a movement key
    if ((input_A.isDown || input_D.isDown )&& !player1.invisible) {
      this.stateMachine.transition('move');
      return;
    }
	// Transition to invisible if pressing a movement key
    if ((input_A.isDown || input_D.isDown)&& player1.invisible) {
      this.stateMachine.transition('invisible');
      return;
    }
	// Transition to climb if pressing W
    if ((input_W.isDown ) && player1.onLadder) {
      this.stateMachine.transition('climb');
      return;
    }
	// Transition to hurt if getting hit
	if (player1.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
	// Transition to death if no life
	if(player1.life<=0){
	  this.stateMachine.transition('death');
      return;
    }
  }
}

class MoveStateP1 extends State {
	enter(scene, player1){
			player1.onLadder=false;

	}
  execute(scene, player1) {    
    // Transition to jump if pressing space
    if ((spaceBar.isDown) && player1.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
   // Transition to attack if pressing e
    if (input_E.isDown && player1.hasKnife===true) {
	if(online){
		movePlayer.send(JSON.stringify("attack"));
	}
			console.log("dentro de State para cuchillo"); 
      this.stateMachine.transition('attack_knife');
      return;
    }
    if (Phaser.Input.Keyboard.JustDown(input_E) && player1.hasPistol===true && player1.ammo>0) {
	if(online){
		movePlayer.send(JSON.stringify("attack"));
	}
		console.log("dentro de State para pistola"); 
 this.stateMachine.transition('attack_pistol');
      return;
    }
    // Transition to idle if not pressing movement keys
    if (!(input_A.isDown || input_D.isDown )) {

      this.stateMachine.transition('idle');
      return;
    }
	// Transition to climb if pressing W
    if ((input_W.isDown ) && player1.onLadder) {
      this.stateMachine.transition('climb');
      return;
    }
    // Transition to hurt if getting hit
	if (player1.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
    player1.setVelocityX(0);
    if (input_A.isDown ) {
      player1.setVelocityX(-100);
	  if(player1.debuff){player1.setVelocityX(-50);}
	  if(player1.speedBoost){player1.setVelocityX(-150);}
      player1.direction = 'left';
    } else if (input_D.isDown ) {
      player1.setVelocityX(100);
	  if(player1.debuff){player1.setVelocityX(50);}
	  if(player1.speedBoost){player1.setVelocityX(150);}
      player1.direction = 'right';
    }
if(player1.hasKnife){
	    player1.anims.play('run_knife', true);

}else if(player1.hasPistol){
	    player1.anims.play('run_pistol', true);
}else{
	    player1.anims.play('run', true);
}
    
  }
}
class InvisibleStateP1 extends State {
	enter(scene, player1){
			//player1.onLadder=false;

	}
  execute(scene, player1) {    
    // Transition to jump if pressing space
    if ((spaceBar.isDown||inputJump) && player1.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
   // Transition to attack if pressing e
    if (input_E.isDown && player1.hasKnife===true) {
	if(online){
		movePlayer.send(JSON.stringify("attack"));
	}
      this.stateMachine.transition('attack_knife');
      return;
    }
    if (Phaser.Input.Keyboard.JustDown(input_E) && player1.hasPistol===true && player1.ammo>0) {
	if(online){
		movePlayer.send(JSON.stringify("attack"));
	}
      this.stateMachine.transition('attack_pistol');
      return;
    }
    // Transition to idle if not pressing movement keys
    if ((!(input_A.isDown || input_D.isDown ))&& !player1.invisible) {
      this.stateMachine.transition('idle');
      return;
    }
	// Transition to climb if pressing W
    if ((input_W.isDown) && player1.onLadder) {
      this.stateMachine.transition('climb');
      return;
    }
    // Transition to hurt if getting hit
	if (player1.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
    player1.setVelocityX(0);
    if (input_A.isDown) {
      player1.setVelocityX(-100);
	  if(player1.debuff){player1.setVelocityX(-50);}
	  if(player1.speedBoost){player1.setVelocityX(-150);}
      player1.direction = 'left';
    } else if (input_D.isDown) {
      player1.setVelocityX(100);
	  if(player1.debuff){player1.setVelocityX(50);}
	  if(player1.speedBoost){player1.setVelocityX(150);}
      player1.direction = 'right';
    }

    player1.anims.play('invisible', true);
    
  }
}
class JumpStateP1 extends State {
  enter(scene, player1) {
		    player1.setVelocityY(-150);
		if( player1.invisible){player1.anims.play('invisible');}
		else{
	    player1.anims.play('jump');
		}
		player1.once('animationcomplete', () => {
			this.stateMachine.transition('idle')
    	});

    
  }
execute(scene, player1){
	if(player1.body.touching.down){
		this.stateMachine.transition('idle');
		return;
	}
	// Transition to hurt if getting hit
	if (player1.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
}
}

class AttackKnifeStateP1 extends State {
  enter(scene, player1) {
    sound_knife.play();
if(player1.strengthBoost){knifeHitbox.damage=5;}else{knifeHitbox.damage=3;}
	    player1.anims.play('attack_knife');


		if(player1.direction==='left'){
	        knifeHitbox.x= player1.x - player1.width * 0.45;

		}else{
        knifeHitbox.x= player1.x + player1.width * 0.45;
		}
		knifeHitbox.y= player1.y + player1.height * 0.1;
		knifeHitbox.body.enable=true;
		scene.physics.world.add(knifeHitbox.body);
		player1.once('animationcomplete', () => {
			this.stateMachine.transition('idle');
			knifeHitbox.body.enable=false;
					scene.physics.world.remove(knifeHitbox.body);

    	});
  }
execute(scene,player1){
	// Transition to getHit if getting hit
	if (player1.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
}

}
class AttackPistolStateP1 extends State {
  enter(scene, player1) {
	console.log("disparar");
    sound_shoot.play();
   	playerFire(player1, player1.direction, scene);
    player1.anims.play('attack_pistol');
		player1.once('animationcomplete', () => {
			this.stateMachine.transition('idle');

    	});
  }
execute(scene,player1){
	// Transition to getHit if getting hit
	if (player1.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
}

}

class GetHitStateP1 extends State {
  enter(scene, player1) {
    player1.setVelocityX(0);
	player1.anims.play('hurt');
			player1.once('animationcomplete', () => {
				player1.hitted=false;
				this.stateMachine.transition('idle');
    	});
  }
}
class DeathStateP1 extends State {
  enter(scene, player1) {
	PlayerLoseGems(player1, scene);
    player1.setVelocityX(0);
	player1.anims.play('death');
			player1.once('animationcomplete', () => {
			player1.setVisible(false);
			respawnPlayer1();
			this.stateMachine.transition('idle');
    	});
  }
}
class ClimbStateP1 extends State {
execute(scene, player1) {    
    // Transition to jump if pressing space
    if ((spaceBar.isDown) && player1.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
   // Transition to attack if pressing e
    if (input_E.isDown && player1.hasKnife===true) {
	if(online){
		movePlayer.send(JSON.stringify("attack"));
	}
      this.stateMachine.transition('attack_knife');
      return;
    }
	if (Phaser.Input.Keyboard.JustDown(input_E) && player1.hasPistol===true && player1.ammo>0) {
		if(online){
		movePlayer.send(JSON.stringify("attack"));
	}
      this.stateMachine.transition('attack_pistol');
      return;
    }    

//To idle
	if ((input_A.isDown || input_D.isDown || !player1.onLadder)) {
      this.stateMachine.transition('idle');
      return;

    }


    // Stop on ladder if not pressing movement keys
    if (!(input_A.isDown || input_D.isDown || input_W.isDown || input_S.isDown )) {
      //this.stateMachine.transition('idle');
      //return;
		player1.setVelocityY(0);
		player1.anims.stop();

    }
	
    // Transition to hurt if getting hit
	if (player1.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }

	//player1.x=ladder.body.center.x;
    player1.setVelocityX(0);
	if(input_W.isDown ){
		player1.setVelocityY(-140);
	}else if (input_S.isDown ){
			player1.setVelocityY(140);

	}
	if( player1.invisible){player1.anims.play('invisible');}
		else{player1.anims.play('climb',true);}
  }
}
///STATES P2//////////
class IdleStateP2 extends State {
  enter(scene, player2) {
	player2.onLadder=false;
    player2.setVelocityX(0);
	if(player2.invisible){
			player2.anims.play('invisible',true);

	}else{
			player2.anims.play('idle',true);

	}
  }
  
  execute(scene, player2) {    
    // Transition to jump if pressing space
    if (input_Shift.isDown  && player2.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    // Transition to attack if pressing o
    if (input_O.isDown && player2.hasKnife===true) {
      this.stateMachine.transition('attack_knife');
      return;
    }
	if (Phaser.Input.Keyboard.JustDown(input_O) && player2.hasPistol===true && player2.ammo>0) {
      this.stateMachine.transition('attack_pistol');
      return;
    }
    // Transition to move if pressing a movement key
    if ((input_J.isDown || input_L.isDown)&& !player2.invisible) {
      this.stateMachine.transition('move');
      return;
    }
	// Transition to invisible if pressing a movement key
    if ((input_J.isDown || input_L.isDown)&& player2.invisible) {
      this.stateMachine.transition('invisible');
      return;
    }
// Transition to climb if pressing W
    if (input_I.isDown && player2.onLadder) {
      this.stateMachine.transition('climb');
      return;
    }
	// Transition to hurt if getting hit
	if (player2.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
	// Transition to death if no life
	if(player2.life<=0){
	  this.stateMachine.transition('death');
      return;
    }

  }
}

class MoveStateP2 extends State {
	enter(scene,player2){
		player2.onLadder=false;
	}
  execute(scene, player2) {
   // const {input_A, input_D, spaceBar} = scene.keys;
    
    // Transition to jump if pressing space
    if (input_Shift.isDown && player2.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
   // Transition to attack if pressing space
    if (input_O.isDown && player2.hasKnife===true) {
      this.stateMachine.transition('attack_knife');
      return;
    }
    if (Phaser.Input.Keyboard.JustDown(input_O) && player2.hasPistol===true && player2.ammo>0) {
      this.stateMachine.transition('attack_pistol');
      return;
    }
    // Transition to idle if not pressing movement keys
    if (!(input_J.isDown || input_L.isDown)) {
      this.stateMachine.transition('idle');
      return;
    }
	// Transition to climb if pressing W
    if (input_I.isDown && player2.onLadder) {
      this.stateMachine.transition('climb');
      return;
    }
    // Transition to hurt if getting hit
	if (player2.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
    player2.setVelocityX(0);
    if (input_J.isDown) {
      player2.setVelocityX(-100);
	  if(player2.debuff){player2.setVelocityX(-50);}
	  if(player2.speedBoost){player2.setVelocityX(-150);}
      player2.direction = 'left';
    } else if (input_L.isDown) {
      player2.setVelocityX(100);
	  if(player2.debuff){player2.setVelocityX(50);}
	  if(player2.speedBoost){player2.setVelocityX(150);}
      player2.direction = 'right';
    }
if(player2.hasKnife){
	    player2.anims.play('run_knife', true);

}else if(player2.hasPistol){
	    player2.anims.play('run_pistol', true);
}else{
	    player2.anims.play('run', true);
}    
  }
}

class InvisibleStateP2 extends State {
	enter(scene, player2){
			//player1.onLadder=false;

	}
  execute(scene, player2) {    
    // Transition to jump if pressing space
    if (input_Shift.isDown && player2.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
   // Transition to attack if pressing e
    if (input_O.isDown && player2.hasKnife===true) {
      this.stateMachine.transition('attack_knife');
      return;
    }
    if (Phaser.Input.Keyboard.JustDown(input_O) && player2.hasPistol===true && player2.ammo>0) {
      this.stateMachine.transition('attack_pistol');
      return;
    }
    // Transition to idle if not pressing movement keys
    if ((!(input_J.isDown || input_L.isDown))&& !player2.invisible) {
      this.stateMachine.transition('idle');
      return;
    }
	// Transition to climb if pressing W
    if (input_I.isDown && player2.onLadder) {
      this.stateMachine.transition('climb');
      return;
    }
    // Transition to hurt if getting hit
	if (player2.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
    player2.setVelocityX(0);
    if (input_J.isDown) {
      player2.setVelocityX(-100);
	  if(player2.debuff){player2.setVelocityX(-50);}
	  if(player2.speedBoost){player2.setVelocityX(-150);}
      player2.direction = 'left';
    } else if (input_L.isDown) {
      player2.setVelocityX(100);
	  if(player2.debuff){player2.setVelocityX(50);}
	  if(player2.speedBoost){player2.setVelocityX(150);}
      player2.direction = 'right';
    }

    player2.anims.play('invisible', true);
    
  }
}

class JumpStateP2 extends State {
  enter(scene, player2) {
		player2.setVelocityY(-150);
		if( player2.invisible){player2.anims.play('invisible');}
		else{
	    player2.anims.play('jump');
		}
		player2.once('animationcomplete', () => {
			this.stateMachine.transition('idle')
    	});

    
  }
execute(scene, player2){
	if(player2.body.touching.down){
		this.stateMachine.transition('idle');
		return;
	}
	// Transition to hurt if getting hit
	if (player2.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }

	
}
}

class AttackKnifeStateP2 extends State {
  enter(scene, player2) {

    sound_knife.play();
		if(player2.strengthBoost){knifeHitbox2.damage=5;}else{knifeHitbox2.damage=3;}

	    player2.anims.play('attack_knife');


		if(player2.direction==='left'){
	        knifeHitbox2.x= player2.x - player2.width * 0.45;

		}else{
        knifeHitbox2.x= player2.x + player2.width * 0.45;
		}
		knifeHitbox2.y= player2.y + player2.height * 0.1;
		knifeHitbox2.body.enable=true;
				scene.physics.world.add(knifeHitbox2.body);
		player2.once('animationcomplete', () => {
			this.stateMachine.transition('idle');
			knifeHitbox2.body.enable=false;
					scene.physics.world.remove(knifeHitbox2.body);

    	});

    
  }
exectue(scene,player2){
	// Transition to hurt if getting hit
	if (player2.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
}
}
class AttackPistolStateP2 extends State {
  enter(scene, player2) {
    sound_shoot.play();
   	playerFire(player2, player2.direction, scene);
    player2.anims.play('attack_pistol');
		player2.once('animationcomplete', () => {
			this.stateMachine.transition('idle');

    	});
  }
execute(scene,player2){
	// Transition to getHit if getting hit
	if (player2.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
}

}

class GetHitStateP2 extends State {
  enter(scene, player2) {
    player2.setVelocityX(0);
	player2.anims.play('hurt');
			player2.once('animationcomplete', () => {
			player2.hitted=false;
			this.stateMachine.transition('idle');
    	});
  }
}
class DeathStateP2 extends State {
  enter(scene, player2) {
	PlayerLoseGems(player2, scene);
    player2.setVelocityX(0);
	player2.anims.play('death');
	player2.once('animationcomplete', () => {
					player2.setVisible(false);
					respawnPlayer2();
					this.stateMachine.transition('idle');	

	
    });
  }
}
class ClimbStateP2 extends State {
execute(scene, player2) {    
    // Transition to jump if pressing space
    if (spaceBar.isDown && player2.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
   // Transition to attack if pressing e
    if (input_O.isDown && player2.hasKnife===true) {
      this.stateMachine.transition('attack_knife');
      return;
    }
    if ((input_J.isDown || input_L.isDown  || !player2.onLadder )) {
      this.stateMachine.transition('idle');
      return;

    }
    // Stop on ladder if not pressing movement keys
    if (!(input_J.isDown || input_L.isDown || input_I.isDown || input_K.isDown)) {
      //this.stateMachine.transition('idle');
      //return;
		player2.setVelocityY(0);
		player2.anims.stop();

    }
	
    // Transition to hurt if getting hit
	if (player2.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
	//player2.x=ladder.body.center.x;
    player2.setVelocityX(0);
	if(input_I.isDown){
		player2.setVelocityY(-140);
	}else if (input_K.isDown){
			player2.setVelocityY(140);

	}
	player2.anims.play('climb',true);
    
  }
}
//STATES P Online
class IdleStatePOnline extends State {
  enter(scene, player) {
    player.setVelocityX(0);
	player.onLadder=false;
	if(player.invisible){
			player.anims.play('invisible',true);

	}else{
			player.anims.play('idle',true);

	}
  }
  
  execute(scene, player) {
   // const {input_A, input_D, spaceBar} = scene.keys;
    
    // Transition to jump if pressing space
    if ((inputJump)  && player.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    // Transition to attack if pressing e
    if (inputAttack && player.hasKnife===true) {
			console.log("dentro de State para cuchillo");

      this.stateMachine.transition('attack_knife');
      return;
    }
	if (inputAttack && player.hasPistol===true && player.ammo>0) {
     		console.log("dentro de State para pistola");

 this.stateMachine.transition('attack_pistol');
      return;
    }
    // Transition to move if pressing a movement key
    if (( inputLeft || inputRight)&& !player.invisible) {
      this.stateMachine.transition('move');
      return;
    }
	// Transition to invisible if pressing a movement key
    if ((inputLeft || inputRight)&& player.invisible) {
      this.stateMachine.transition('invisible');
      return;
    }
	// Transition to climb if pressing W
    if (( inputUp) && player.onLadder) {
      this.stateMachine.transition('climb');
      return;
    }
	// Transition to hurt if getting hit
	if (player.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
	// Transition to death if no life
	if(player.life<=0){
	  this.stateMachine.transition('death');
      return;
    }
  }
}

class MoveStatePOnline extends State {
	enter(scene, player){
			player.onLadder=false;

	}
  execute(scene, player) {    
    // Transition to jump if pressing space
    if ((inputJump) && player.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
   // Transition to attack if pressing e
    if (inputAttack && player.hasKnife===true) {
			console.log("dentro de State para cuchillo");
      this.stateMachine.transition('attack_knife');
      return;
    }
    if (inputAttack && player.hasPistol===true && player.ammo>0) {
		console.log("dentro de State para pistola");      
this.stateMachine.transition('attack_pistol');
      return;
    }
    // Transition to idle if not pressing movement keys
    if (!( inputLeft || inputRight)) {

      this.stateMachine.transition('idle');
      return;
    }
	// Transition to climb if pressing W
    if (( inputUp) && player.onLadder) {
      this.stateMachine.transition('climb');
      return;
    }
    // Transition to hurt if getting hit
	if (player.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
    player.setVelocityX(0);
    if ( inputLeft) {
      player.setVelocityX(-100);
	  if(player.debuff){player.setVelocityX(-50);}
	  if(player.speedBoost){player.setVelocityX(-150);}
      player.direction = 'left';
    } else if (inputRight) {
      player.setVelocityX(100);
	  if(player.debuff){player.setVelocityX(50);}
	  if(player.speedBoost){player.setVelocityX(150);}
      player.direction = 'right';
    }
if(player.hasKnife){
	    player.anims.play('run_knife', true);

}else if(player.hasPistol){
	    player.anims.play('run_pistol', true);
}else{
	    player.anims.play('run', true);
}
    
  }
}
class InvisibleStatePOnline extends State {
	enter(scene, player){
			//player.onLadder=false;

	}
  execute(scene, player) {    
    // Transition to jump if pressing space
    if ((inputJump) && player.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
   // Transition to attack if pressing e
    if (inputAttack && player.hasKnife===true) {
      this.stateMachine.transition('attack_knife');
      return;
    }
    if (inputAttack && player.hasPistol===true && player.ammo>0) {
      this.stateMachine.transition('attack_pistol');
      return;
    }
    // Transition to idle if not pressing movement keys
    if ((!( inputLeft || inputRight))&& !player.invisible) {
      this.stateMachine.transition('idle');
      return;
    }
	// Transition to climb if pressing W
    if ((inputUp) && player.onLadder) {
      this.stateMachine.transition('climb');
      return;
    }
    // Transition to hurt if getting hit
	if (player.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
    player.setVelocityX(0);
    if (inputLeft) {
      player.setVelocityX(-100);
	  if(player.debuff){player.setVelocityX(-50);}
	  if(player.speedBoost){player.setVelocityX(-150);}
      player.direction = 'left';
    } else if (inputRight) {
      player.setVelocityX(100);
	  if(player.debuff){player.setVelocityX(50);}
	  if(player.speedBoost){player.setVelocityX(150);}
      player.direction = 'right';
    }

    player.anims.play('invisible', true);
    
  }
}
class JumpStatePOnline extends State {
  enter(scene, player) {
		    player.setVelocityY(-150);
		if( player.invisible){player.anims.play('invisible');}
		else{
	    player.anims.play('jump');
		}
		player.once('animationcomplete', () => {
			if(online){
							inputJump=false;
			}
			this.stateMachine.transition('idle')
    	});

    
  }
execute(scene, player){
	if(player.body.touching.down){
		this.stateMachine.transition('idle');
		return;
	}
	// Transition to hurt if getting hit
	if (player.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
}
}

class AttackKnifeStatePOnline extends State {
  enter(scene, player) {
	inputAttack=false;
    sound_knife.play();
if(player.strengthBoost){
		if(cargoPj==='player2'){
			knifeHitbox.damage=5;
		}else{
			knifeHitbox2.damage=5;
		}
	}else{
		if(cargoPj==='player2'){
			knifeHitbox.damage=3;
		}else{
			knifeHitbox2.damage=3;
		}
	}
	    player.anims.play('attack_knife');


		if(player.direction==='left'){
			if(cargoPj==='player2'){
				knifeHitbox.x= player.x - player.width * 0.45;
			}else{
				knifeHitbox2.x= player.x - player.width * 0.45;
			}
		}else{
			if(cargoPj==='player2'){
        		knifeHitbox.x= player.x + player.width * 0.45;
			}else{
        		knifeHitbox2.x= player.x + player.width * 0.45;
			}
		}
			if(cargoPj==='player2'){
				knifeHitbox.y= player.y + player.height * 0.1;
				knifeHitbox.body.enable=true;
				scene.physics.world.add(knifeHitbox.body);
			}else{
        		knifeHitbox2.y= player.y + player.height * 0.1;
				knifeHitbox2.body.enable=true;
				scene.physics.world.add(knifeHitbox2.body);
			}
		
		player.once('animationcomplete', () => {
			if(cargoPj==='player2'){
				knifeHitbox.body.enable=false;
				scene.physics.world.remove(knifeHitbox.body);
			}else{
				knifeHitbox2.body.enable=false;
				scene.physics.world.remove(knifeHitbox2.body);
			}
			this.stateMachine.transition('idle');
			

    	});
  }
execute(scene,player){
	// Transition to getHit if getting hit
	if (player.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
}

}
class AttackPistolStatePOnline extends State {
  enter(scene, player) {
	inputAttack=false;
    sound_shoot.play();
   	playerFire(player, player.direction, scene);
    player.anims.play('attack_pistol');
		player.once('animationcomplete', () => {
			this.stateMachine.transition('idle');

    	});
  }
execute(scene,player){
	// Transition to getHit if getting hit
	if (player.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }
}

}

class GetHitStatePOnline extends State {
  enter(scene, player) {
    player.setVelocityX(0);
	player.anims.play('hurt');
			player.once('animationcomplete', () => {
				player.hitted=false;
				this.stateMachine.transition('idle');
    	});
  }
}
class DeathStatePOnline extends State {
  enter(scene, player) {
	PlayerLoseGems(player, scene);
    player.setVelocityX(0);
	player.anims.play('death');
			player.once('animationcomplete', () => {
			player.setVisible(false);
			respawnPlayer1();
			this.stateMachine.transition('idle');
    	});
  }
}
class ClimbStatePOnline extends State {
execute(scene, player) {    
    // Transition to jump if pressing space
    if ((inputJump) && player.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
   // Transition to attack if pressing e
    if (input_E.isDown && player.hasKnife===true) {
	if(online){
		movePlayer.send(JSON.stringify("attack"));
	}
      this.stateMachine.transition('attack_knife');
      return;
    }
	if (Phaser.Input.Keyboard.JustDown(input_E) && player.hasPistol===true && player.ammo>0) {
		if(online){
		movePlayer.send(JSON.stringify("attack"));
	}
      this.stateMachine.transition('attack_pistol');
      return;
    }    

//To idle
	if (( inputLeft || inputRight || !player.onLadder)) {
							//movePlayer.send(JSON.stringify("idle"));
      this.stateMachine.transition('idle');
      return;

    }


    // Stop on ladder if not pressing movement keys
    if (!( inputLeft || inputRight || input_S.isDown || inputUp || inputDown)) {
      //this.stateMachine.transition('idle');
      //return;
		player.setVelocityY(0);
		player.anims.stop();

    }
	
    // Transition to hurt if getting hit
	if (player.hitted) {
      this.stateMachine.transition('getHit');
      return;
    }

	//player.x=ladder.body.center.x;
    player.setVelocityX(0);
	if(inputUp){
		player.setVelocityY(-140);
	}else if (inputDown){
			player.setVelocityY(140);

	}
	if( player.invisible){player.anims.play('invisible');}
		else{player.anims.play('climb',true);}
  }
}

////////////////////////////////////////PANTALLA DE RESULTADOS//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var text_p1_Results;
var text_p2_Results;
var bg_music_results_screen;

class PantallaResultados extends Phaser.Scene{
    constructor(){
        //Resultado--> nombre que se le da a la escena
        super({ key: "Resultados"});
    }

    

    preload(){
    }


    create(){
updatePuntuacion();
        //Music
        bg_music_results_screen = this.sound.add('backgroundResultsMusic');
        bg_music_results_screen.setLoop(true);
        bg_music_results_screen.play();
        this.fondoRan= this.add.image(400, 300, 'fondoRanking');
        this.fondoRan.setScale(0.6);

        this.pod = this.add.image(400, 300, 'podio');
        this.pod.setScale(0.5);

        if(player1.gemsOwned > player2.gemsOwned){
            if(chooseP1 ==='Chilli'){
            this.winp1 = this.add.image(400, 145, 'selectChilli');
            }
            else if(chooseP1 ==='Bernie'){
            this.winp1 = this.add.image(400, 145, 'selectBernie');
            }
            else{
            this.winp1 = this.add.image(400, 145, 'selectWasabi');
            }


            if(chooseP2 ==='Chilli'){
            this.winp2 = this.add.image(290, 200, 'selectChilli');
            this.winp2.setScale(1.5);
            }
            else if(chooseP2 ==='Bernie'){
            this.winp2 = this.add.image(290, 200, 'selectBernie');
            }
            else{
            this.winp2 = this.add.image(290, 200, 'selectWasabi');
            }


        } else if(player1.gemsOwned < player2.gemsOwned){
            if(chooseP2 ==='Chilli'){
            this.winp2 = this.add.image(400, 145, 'selectChilli');
            this.winp2.setScale(1.5);
            }
            else if(chooseP2 ==='Bernie'){
            this.winp2 = this.add.image(400, 145, 'selectBernie');
            }
            else{
            this.winp2 = this.add.image(400, 145, 'selectWasabi');
            }


            if(chooseP1 ==='Chilli'){
            this.winp1 = this.add.image(430, 145, 'selectChilli');
            this.winp1.setScale(1.5);
            }
            else if(chooseP1 ==='Bernie'){
            this.winp1 = this.add.image(430, 145, 'selectBernie');
            }
            else{
            this.winp1 = this.add.image(430, 145, 'selectWasabi');
            }


        } else if(player1.gemsOwned === player2.gemsOwned){
            if(chooseP2 ==='Chilli'){
            this.winp2 = this.add.image(430, 145, 'selectChilli');
            
            }
            else if(chooseP2 ==='Bernie'){
            this.winp2 = this.add.image(430, 145, 'selectBernie');
            }
            else{
            this.winp2 = this.add.image(430, 145, 'selectWasabi');
            }

            if(chooseP1 ==='Chilli'){
            this.winp1 = this.add.image(370, 145, 'selectChilli');
            
            }
            else if(chooseP1 ==='Bernie'){
            this.winp1 = this.add.image(370, 145, 'selectBernie');
            }
            else{
            this.winp1 = this.add.image(370, 145, 'selectWasabi');
            }
            
        }
        
        
        this.rev = this.add.image(250, 500, 'bRevancha').setInteractive();
        this.rev.setScale(0.4);

        this.rev.on('pointerover', () => {
            this.rev = this.add.image(250, 500, 'bRevanchaActivado');
            this.rev.setScale(0.4);
        });
        
        this.rev.on('pointerout', () => {
            this.rev = this.add.image(250, 500, 'bRevancha');
            this.rev.setScale(0.4);
        });
        
        this.rev.on('pointerdown', () => {
	bg_music_results_screen.setLoop(false);
        bg_music_results_screen.stop();
            this.scene.start('MenuPrincipal');
		

        });

        this.sal = this.add.image(550, 500, 'bSalir').setInteractive();
        this.sal.setScale(0.4);

        this.sal.on('pointerover', () => {
            this.sal = this.add.image(550, 500, 'bSalirActivado');
            this.sal.setScale(0.4);
        });
        
        this.sal.on('pointerout', () => {
            this.sal = this.add.image(550, 500, 'bSalir');
            this.sal.setScale(0.4);
        });
        
        this.sal.on('pointerdown', () => {
	            this.scene.start('MenuPrincipal');

            //Para cerrar la ventana del navegador
            //window.close();
        });

    }

    update(){
    }

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////FUNCIONES PARA API REST////////////////////////////////////////////
function createProfile(id_p_){
	
		$(document).ready(function () {


                var data = {

                    name: $("#nombre").val(),
					id:id_p_,
					maxPuntuacion:0,
					 favChara:"none",
	  				usosChilli:0,
	  				usosWasabi:0,
	  				usosBernie:0,
                };
                $.ajax({
                    type: "POST",
                    url: "http://"+url+":8080/player",
                    data: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    dataType:"json"


                }).done(function (data) {
                    id=data;
					if(id_p===0){ profileExists0=true;}
					if(id_p===1){profileExists1=true; }
					if(id_p===2){ profileExists2=true;}
					if(id_p===3){ profileExists3=true;}
                }).fail(function(data, textStatus){
					console.log(textStatus);
				});
            });

}
function getPuntuacion(id_p){
	$(document).ready(function () {

                $.ajax({

                    type: "GET",
                    url: "http://"+url+":8080/player/maxpuntuacion/"+id_p,
                    dataType: "text"

                }).fail(function () {
			//console.log("error get lista jugadores");

                    fallosServidor += 1;
                    if (fallosServidor > 2) {

                        errorServidor = "Servidor desconectado";
					//console.log(errorServidor);

                    }
                }).done(function (data) {
                    errorServidor = "Servidor conectado";
                    fallosServidor = 0;
					puntuacion_profile=data;
					console.log("getPuntuacion"+puntuacion_profile);

                })

            });
}
function updatePuntuacion(){
	
console.log("getPuntuacion"+puntuacion_profile);
	if(puntuacion_profile<player1.gemsOwned){
	let text_point_aux = player1.gemsOwned.toString();
	console.log(text_point_aux);
		$(document).ready(function () {


                var data = {

                    maxPuntuacion: text_point_aux,					
                };
                $.ajax({
	
                    type: "PUT",
                    url: "http://"+url+":8080/player/maxpuntuacion/"+id,
                    data: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    dataType:"json"


                }).done(function (data) {
	console.log("puntuacion devuelto del put "+data);
		
		puntuacion_profile=data;
                }).fail(function(data, textStatus){
					console.log(textStatus);
				});
            });
	}
}
function sendMessage(){
	
	
	console.log("entra sendMessage");
	$(document).ready(function () {
		var data = {

                    sender: player_profile,
                    msg:$("#message").val(),
                };
                $.ajax({
                    type: "POST",
                    url: "http://"+url+":8080/messages",
                    data: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    dataType:"json"


                }).done(function () {
                });
	});
	updateMessage();
	
}
function updateMessage(){
	
	for(var i=0;i<5;i++){
		let t = i.toString();
		$(document).ready(function () {

                $.ajax({

                    type: "GET",
                    url: "http://"+url+":8080/messages/"+t,
                    dataType: "text"

                }).fail(function () {
			//console.log("error get lista jugadores");

                    fallosServidor += 1;
                    if (fallosServidor > 2) {

                        errorServidor = "Servidor desconectado";
					//console.log(errorServidor);

                    }
                }).done(function (data) {
                    errorServidor = "Servidor conectado";
                    fallosServidor = 0;

				document.getElementById("msj"+t).innerHTML=data;
                })

            });
	}
}
function getProfileName(id_p){
	let tt = id_p.toString();
	$(document).ready(function () {

                $.ajax({

                    type: "GET",
                    url: "http://"+url+":8080/player/name/"+id_p,
                    dataType: "text"

                }).fail(function () {
			//console.log("error get lista jugadores");
					document.getElementById("perfil"+tt).innerHTML="Vacío";
					if(id_p===0){ profileExists0=false;}
					if(id_p===1){profileExists1=false; }
					if(id_p===2){ profileExists2=false;}
					if(id_p===3){ profileExists3=false;}					
                    fallosServidor += 1;
                    if (fallosServidor > 2) {

                        errorServidor = "Servidor desconectado";
					//console.log(errorServidor);

                    }
                }).done(function (data) {
                    errorServidor = "Servidor conectado";
                    fallosServidor = 0;
					if(id_p===0){ profileExists0=true;}
					if(id_p===1){profileExists1=true; }
					if(id_p===2){ profileExists2=true;}
					if(id_p===3){ profileExists3=true;}	
                    player_profile=data;
					document.getElementById("perfil"+tt).innerHTML=data;

                })

            });
}

function usos_Chilli(){
	if(chooseP1 ==='Chilli'){
		
		$(document).ready(function () {


                var data = {

                    usosChilli: 1 ,					
                };
                $.ajax({
	
                    type: "PUT",
                    url: "http://"+url+":8080/player/usoschilli/"+id,
                    data: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    dataType:"json"


                }).done(function (data) {
	console.log("nombre devuelto del put "+data);
		//player_text.setText(data);
		//maxscorep1.setText(data);
                }).fail(function(data, textStatus){
					console.log(textStatus);
				});
            });
	}
}


function usos_Bernie(){
	if(chooseP1 ==='Bernie'){
		
		$(document).ready(function () {


                var data = {

                    usosBernie: usosBernie + 1 ,					
                };
                $.ajax({
	
                    type: "PUT",
                    url: "http://"+url+":8080/player/usosbernie/"+id,
                    data: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    dataType:"json"


                }).done(function (data) {
	//console.log("nombre devuelto del put "+data);
		//player_text.setText(data);
		//maxscorep1.setText(data);
                }).fail(function(data, textStatus){
					console.log(textStatus);
				});
            });
	}
}


function usos_Wasabi(){
	if(chooseP1 ==='Wasabi'){
		
		$(document).ready(function () {


                var data = {

                    usosBernie: usosWasabi + 1 ,					
                };
                $.ajax({
	
                    type: "PUT",
                    url: "http://"+url+":8080/player/usoswasabi/"+id,
                    data: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    dataType:"json"


                }).done(function (data) {
	//console.log("nombre devuelto del put "+data);
		//player_text.setText(data);
		//maxscorep1.setText(data);
                }).fail(function(data, textStatus){
					console.log(textStatus);
				});
            });
	}
}
function borrarPerfil(id_p){
	$(document).ready(function () {

                $.ajax({

                    type: "DELETE",
                    url: "http://"+url+":8080/player/"+id_p,
                    dataType: "json"

                }).fail(function () {
			//console.log("error get lista jugadores");
					console.log("No existe el perfil que quieres borrar")

                    fallosServidor += 1;
                    if (fallosServidor > 2) {

                        errorServidor = "Servidor desconectado";

					//console.log(errorServidor);

                    }
                }).done(function (data) {
                    errorServidor = "Servidor conectado";
                    fallosServidor = 0;
if(id_p===0){ profileExists0=false;}
					if(id_p===1){profileExists1=false; }
					if(id_p===2){ profileExists2=false;}
					if(id_p===3){ profileExists3=false;}
console.log("perfil borrado correctamente");

                })

            });
}
function checkFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
     
    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [PantallaCarga, PantallaDeInicio, SelecTipoInicio, SelecPerfil, Registro, Datos, MenuPrincipal, Controles, Creditos, PantallaModoJuego, PantallaNumeroJugadores, MenuPersonajes, MenuEscenarios, Ayuda, PantallaEscenario1, PantallaEscenario2, PantallaEscenario3, Pausa, PantallaResultados],
	audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);


