

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
        /*//Sólo para comprobar que la barra de carga funciona bien
            for (var i = 0; i < 5000; i++) {
                this.load.image('logo'+i);
            }*/
        



        ////////////////////////////Carga de assets de Pantalla de Inicio//////////////////////////////////

        //Carga de fondo, título e imagen
        this.load.image('fondoInicio', './asset/fondoInicio_prueba.jpg');
        this.load.image('title', './asset/title_prueba.png');
        this.load.spritesheet('botonPlay', './asset/button-start-prueba.png', { frameWidth: 200, frameHeight: 70 });

        ///////////////////////////////////////////////////////////////////////////////////////////////////


        ////////////////////////////Carga de assets de Pantalla Selección de Personajes////////////////////

        //Carga de fondo y selección de personajes
        this.load.image('fondoMenu', './asset/fondoMenu_prueba.jpg');
        this.load.image('textoSelect', './asset/TextoEleccionPersonaje.png');
        this.load.image('BContinuar1', './asset/BotonContinuar_prueba.png');
        this.load.image('selectChilli', './asset/Pink_Monster.png');
        this.load.image('selectBernie', './asset/Owlet_Monster.png');
        this.load.image('selectWasabi', './asset/Dude_Monster.png');

        ///////////////////////////////////////////////////////////////////////////////////////////////////  

        ////////////////////////////Carga de assets de Pantalla Selección de Escenario/////////////////////

        //Carga de fondo, titulo e imagen
        this.load.image('fondoMenu1', './asset/fondoMenu_prueba.jpg');
        this.load.image('textoSelectE', './asset/TextoEleccionEscenario.png');
        this.load.image('Campo', './asset/escenario1_prueba.png');
        this.load.image('Lava', './asset/escenario2_prueba.png');
        this.load.image('Oriental', './asset/escenario3_prueba.png');
        this.load.image('BContinuar2', './asset/BotonContinuar_prueba.png');

        /////////////////////////////////////////////////////////////////////////////////////////////////// 

        ///////////////////////////Carga de assets del Juego///////////////////////////////////////////////

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
        this.load.image('gray',             'asset/gray.jpg');
        this.load.image('platform',         'asset/platform.jpg');
        this.load.image('bullet',           'asset/bullet.png');
        this.load.image('ladder',         'asset/ladder.jpg');


        //Chilli
        this.load.image('Chilli_profile', 'asset/Pink_Monster_closeUp.png');
        this.load.spritesheet('Chilli_idl', 'asset/Pink_Monster_Idle.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Chilli_run', 'asset/Pink_Monster_Run.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Chilli_jump', 'asset/Pink_Monster_Jump.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Chilli_attack', 'asset/Pink_Monster_Attack1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Chilli_hurt', 'asset/Pink_Monster_Hurt.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Chilli_death', 'asset/Pink_Monster_Death.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Chilli_climb', 'asset/Pink_Monster_Climb.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Chilli_run_dust', 'asset/Walk_Run_Push_Dust.png', { frameWidth: 32, frameHeight: 32 });


        //Bernie
        this.load.image('Bernie_profile', 'asset/Owlet_Monster_closeUp.png');
        this.load.spritesheet('Bernie_idl', 'asset/Owlet_Monster_Idle.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Bernie_run', 'asset/Owlet_Monster_Run.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Bernie_jump', 'asset/Owlet_Monster_Jump.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Bernie_attack', 'asset/Owlet_Monster_Attack1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Bernie_hurt', 'asset/Owlet_Monster_Hurt.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Bernie_death', 'asset/Owlet_Monster_Death.png', { frameWidth: 32, frameHeight: 32 });  
        this.load.spritesheet('Bernie_climb', 'asset/Owlet_Monster_Climb.png', { frameWidth: 32, frameHeight: 32 });

        //Wasabi
        this.load.image('Wasabi_profile', 'asset/Dude_Monster_closeUp.png');
        this.load.spritesheet('Wasabi_idl', 'asset/Dude_Monster_Idle.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Wasabi_run', 'asset/Dude_Monster_Run.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Wasabi_jump', 'asset/Dude_Monster_Jump.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Wasabi_attack', 'asset/Dude_Monster_Attack1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Wasabi_hurt', 'asset/Dude_Monster_Hurt.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Wasabi_death', 'asset/Dude_Monster_Death.png', { frameWidth: 32, frameHeight: 32 });  
        this.load.spritesheet('Wasabi_climb', 'asset/Dude_Monster_Climb.png', { frameWidth: 32, frameHeight: 32 });

        //Audio
        this.load.audio('pistolFire',       'asset/pistolFire.wav');

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }



    create(){
        
        this.logo = this.add.image(400, 400, 'logo').setInteractive();
        this.logo.setScale(0.3);
        
        //Botón continuar (también es el logo)
        this.logo.on('pointerover', () => {
            this.logo.setScale(0.35);
        });

        this.logo.on('pointerout', () => {
            this.logo.setScale(0.3);
        });

        this.logo.on('pointerdown', () => {
            this.scene.start('Inicio');
        });
        
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////Pantalla de Inicio////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class PantallaDeInicio extends Phaser.Scene{
    constructor(){
        //Inicio--> nombre que se le da a la escena
        super({ key: "Inicio"});
    }

    preload(){

        
    }

    create(){
        
        //Fondo de la pantalla de inicio
        this.fondoIni= this.add.image(400, 300, 'fondoInicio');
        this.fondoIni.setScale(1.6);

        //Título del juego
        this.tit=this.add.image(400, 250, 'title');

        //Botón de jugar
        this.play = this.add.sprite(390, 530, 'botonPlay').setInteractive();
        //Eventos del botón
        this.play.on('pointerover', () => {
            this.play.setFrame(1);
        });

        this.play.on('pointerout', () => {
            this.play.setFrame(0);
        });

        this.play.on('pointerdown', () => {
            this.play.setFrame(2);
            this.scene.start('MenuPersonajes');
        });
    }

    update(){

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////Variables Selección de personajes//////
var chooseP1;
var chooseP2;

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
        chooseP1='null';
		chooseP2='null';
        //Fondo de la pantalla de selección de personaje
        this.fondoMP= this.add.image(400, 300, 'fondoMenu');
        this.fondoMP.setScale(1.6);

       

        //Texto en forma de imagen
        this.tex= this.add.image(400, 100, 'textoSelect');
        this.tex.setScale(1.2);

        //Chilli
        this.per1 = this.add.image(150, 300, 'selectChilli').setInteractive();
        this.per1.setScale(1.5);
        //Eventos del botón
        this.per1.on('pointerover', () => {
            this.per1.setScale(2);
        });

        this.per1.on('pointerout', () => {
            this.per1.setScale(1.5);
        });

        this.per1.on('pointerdown', () => {
            if(chooseP1==='null'&&chooseP2==='null'){
				chooseP1='Chilli';
				this.per1.setTint(0x3F51B5);
			}
			if(chooseP2==='null'&&chooseP1!=='Chilli'){
				chooseP2='Chilli';
				this.per1.setTint(0xD32F2F);
                //Botón continuar
                this.bcont1=this.add.image(400, 500, 'BContinuar1').setInteractive();
                this.bcont1.setScale(0.2);
                this.bcont1.on('pointerover', () => {
                    this.bcont1.setScale(0.25);
                });
        
                this.bcont1.on('pointerout', () => {
                    this.bcont1.setScale(0.2);
                });
        
                this.bcont1.on('pointerdown', () => {
                    this.scene.start('MenuEscenarios');
                });
			}
        });
    

        //Bernie
        this.per2 = this.add.image(400, 300, 'selectBernie').setInteractive();
        this.per2.setScale(1.5);
        //Eventos del botón
        this.per2.on('pointerover', () => {
            this.per2.setScale(2);
        });

        this.per2.on('pointerout', () => {
            this.per2.setScale(1.5);
        });

        this.per2.on('pointerdown', () => {
            if(chooseP1==='null'&&chooseP2==='null'){
				chooseP1='Bernie';
				this.per2.setTint(0x3F51B5);
			}
			if(chooseP2==='null'&&chooseP1!=='Bernie'){
				chooseP2='Bernie';
				this.per2.setTint(0xD32F2F);

                //Botón continuar
                this.bcont1=this.add.image(400, 500, 'BContinuar1').setInteractive();
                this.bcont1.setScale(0.2);
                this.bcont1.on('pointerover', () => {
                    this.bcont1.setScale(0.25);
                });
        
                this.bcont1.on('pointerout', () => {
                    this.bcont1.setScale(0.2);
                });
        
                this.bcont1.on('pointerdown', () => {
                    this.scene.start('MenuEscenarios');
                });
		  	}
         });

        //Wasabi
        this.per3 = this.add.image(650, 300, 'selectWasabi').setInteractive();
        this.per3.setScale(1.5);
        //Eventos del botón
        this.per3.on('pointerover', () => {
            this.per3.setScale(2);
        });

        this.per3.on('pointerout', () => {
            this.per3.setScale(1.5);
        });

        this.per3.on('pointerdown', () => {
            if(chooseP1==='null'&&chooseP2==='null'){
				chooseP1='Wasabi';
				this.per3.setTint(0x3F51B5);
			}
			if(chooseP2==='null'&&chooseP1!=='Wasabi'){
				chooseP2='Wasabi';
				this.per3.setTint(0xD32F2F);
                //Botón continuar
                this.bcont1=this.add.image(400, 500, 'BContinuar1').setInteractive();
                this.bcont1.setScale(0.2);
                this.bcont1.on('pointerover', () => {
                    this.bcont1.setScale(0.25);
                });
        
                this.bcont1.on('pointerout', () => {
                    this.bcont1.setScale(0.2);
                });
        
                this.bcont1.on('pointerdown', () => {
                    this.scene.start('MenuEscenarios');
                });
			}
        });
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////Pantalla de Selección de Escenario///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class MenuEscenarios extends Phaser.Scene{
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
        this.tex1.setScale(1.2);

        this.es1 = this.add.image(150, 300, 'Campo').setInteractive();
        this.es1.setScale(0.5);
        this.es1.on('pointerover', () => {
            this.es1.setScale(0.55);
        });

        this.es1.on('pointerout', () => {
            this.es1.setScale(0.5);
        });

        this.es1.on('pointerdown', () => {
            this.scene.start('Escenario1');
        });



        this.es2 = this.add.image(400, 300, 'Lava').setInteractive();
        this.es2.setScale(0.5);
        this.es2.on('pointerover', () => {
            this.es2.setScale(0.55);
        });

        this.es2.on('pointerout', () => {
            this.es2.setScale(0.5);
        });

        this.es2.on('pointerdown', () => {
            this.scene.start('Escenario2');
        });


        this.es3 = this.add.image(650, 300, 'Oriental').setInteractive();
        this.es3.setScale(0.5);
        this.es3.on('pointerover', () => {
            this.es3.setScale(0.55);
        });

        this.es3.on('pointerout', () => {
            this.es3.setScale(0.5);
        });

        this.es3.on('pointerdown', () => {
            this.scene.start('Escenario3');
        });


        //Botón continuar
        this.bcont2=this.add.image(400, 500, 'BContinuar2').setInteractive();
        this.bcont2.setScale(0.2);
        this.bcont2.on('pointerover', () => {
            this.bcont2.setScale(0.25);
        });

        this.bcont2.on('pointerout', () => {
            this.bcont2.setScale(0.2);
        });

        this.bcont2.on('pointerdown', () => {
            this.scene.start('Juego');
        });

    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////VARIABLES PANTALLA DE JUEGO////////////////////

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
var text_p1_UI;
var profile_p1_UI;
var text_p2_UI;
var profile_p2_UI;
var player2;
var player_Bullets
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
var shield1;
var shield2;
var pinkCopy;
var platforms;

var text_time;
var timedCountdown;
var controlIimedItemRespawn_Gems;
var controlIimedItemRespawn_Fruits;
var controlIimedItemRespawn;

var timedItemRespawn;
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



/////////////////////////////////////////////Pantalla De Juego//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class PantallaJuego extends Phaser.Scene{
    constructor(){
        //Juego--> nombre que se le da a la escena
        super({ key: "Juego"});
    }

    

    preload(){
    }


    create(){
	//Background
    this.add.image(400,300, 'gray').setScale(2,2);
    
    //Timer
     lastTimeDebuff = 0;
    controlIimedItemRespawn_Gems=0;
    controlIimedItemRespawn_Fruits=0;
    controlIimedItemRespawn=0;
    text_time = this.add.text(32, 32);
    timedCountdown = this.time.delayedCall(180000, onCountDownEvent, [], this);
    timedItemRespawn = new Phaser.Time.TimerEvent({ delay: 4000 });
    this.time.addEvent(timedItemRespawn)
    
    //Plataformas
    platforms = this.physics.add.staticGroup();

    platforms.create(150,350,'platform').setScale(10,1).refreshBody();
    platforms.create(650,350,'platform').setScale(10,1).refreshBody();
    platforms.create(400,580,'platform').setScale(50,3).refreshBody();
    
    //Escaleras
    
    ladder = this.physics.add.image(150, 450, 'ladder').setScale(1,10).refreshBody();
    ladder.body.setAllowGravity(false);
    
    //Gemas
    gems = this.physics.add.group();
    
    //Items
    item_pistol=this.physics.add.sprite(200, 450, 'pistol_item');
    item_pistol.setCollideWorldBounds(true);
    
    item_knife=this.physics.add.sprite(300, 450, 'knife_item');
    item_knife.setCollideWorldBounds(true);

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
	respawn_P1.x=100;
	respawn_P1.y=450;
    player1 = this.physics.add.sprite(respawn_P1.x, respawn_P1.y, chooseP1+'_idl');
	player1.setBodySize(player1.width *0.5,player1.height *1);
	player1.tag=1;
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
	
	
	//Interfaz
	text_p1_UI = this.add.text(100, 535, '', { font: '16px Courier', fill: '#00ff00' });
	profile_p1_UI = this.add.image(50, 560, chooseP1+'_profile');

        //  Store some data about this profile:
        profile_p1_UI.setDataEnabled();

        profile_p1_UI.data.set('name', chooseP1);
        profile_p1_UI.data.set('lives', player1.life);
        profile_p1_UI.data.set('ammo', player1.ammo);
        profile_p1_UI.data.set('gems', player1.gemsOwned);

        text_p1_UI.setText([
            'Name: ' + profile_p1_UI.data.get('name'),
            'Lives: ' + profile_p1_UI.data.get('lives'),
            'Ammo: ' + profile_p1_UI.data.get('ammo'),
            'Gems: ' + profile_p1_UI.data.get('gems') 
        ]);
		profile_p1_UI.on('changedata-gems', function (gameObject, value) {
                text_p1_UI.setText([
                    'Name: ' + profile_p1_UI.data.get('name'),
            		'Lives: ' + profile_p1_UI.data.get('lives'),
            'Ammo: ' + profile_p1_UI.data.get('ammo'),
            'Gems: ' + profile_p1_UI.data.get('gems') 
                ]);
        });
		profile_p1_UI.on('changedata-lives', function (gameObject, value) {
                text_p1_UI.setText([
                    'Name: ' + profile_p1_UI.data.get('name'),
            		'Lives: ' + profile_p1_UI.data.get('lives'),
            'Ammo: ' + profile_p1_UI.data.get('ammo'),
            'Gems: ' + profile_p1_UI.data.get('gems') 
                ]);
        });
		profile_p1_UI.on('changedata-ammo', function (gameObject, value) {
                text_p1_UI.setText([
                    'Name: ' + profile_p1_UI.data.get('name'),
            		'Lives: ' + profile_p1_UI.data.get('lives'),
            'Ammo: ' + profile_p1_UI.data.get('ammo'),
            'Gems: ' + profile_p1_UI.data.get('gems') 
                ]);
        });
    text_p2_UI = this.add.text(600, 535, '', { font: '16px Courier', fill: '#00ff00' });
	profile_p2_UI = this.add.image(750, 560, chooseP2+'_profile').setFlipX(true);

        //  Store some data about this profile:
        profile_p2_UI.setDataEnabled();

        profile_p2_UI.data.set('name', chooseP2);
        profile_p2_UI.data.set('lives', player2.life);
        profile_p2_UI.data.set('ammo', player2.ammo);
        profile_p2_UI.data.set('gems', player2.gemsOwned);

        text_p2_UI.setText([
            'Name: ' + profile_p2_UI.data.get('name'),
            'Lives: ' + profile_p2_UI.data.get('lives'),
            'Ammo: ' + profile_p2_UI.data.get('ammo'),
            'Gems: ' + profile_p2_UI.data.get('gems') 
        ]);
		profile_p2_UI.on('changedata-gems', function (gameObject, value) {
                text_p2_UI.setText([
                    'Name: ' + profile_p2_UI.data.get('name'),
            		'Lives: ' + profile_p2_UI.data.get('lives'),
            'Ammo: ' + profile_p2_UI.data.get('ammo'),
            'Gems: ' + profile_p2_UI.data.get('gems') 
                ]);
        });
		profile_p2_UI.on('changedata-lives', function (gameObject, value) {
                text_p2_UI.setText([
                    'Name: ' + profile_p2_UI.data.get('name'),
            		'Lives: ' + profile_p2_UI.data.get('lives'),
            'Ammo: ' + profile_p2_UI.data.get('ammo'),
            'Gems: ' + profile_p2_UI.data.get('gems') 
                ]);
        });
		profile_p2_UI.on('changedata-ammo', function (gameObject, value) {
                text_p1_UI.setText([
                    'Name: ' + profile_p2_UI.data.get('name'),
            		'Lives: ' + profile_p2_UI.data.get('lives'),
            'Ammo: ' + profile_p2_UI.data.get('ammo'),
            'Gems: ' + profile_p2_UI.data.get('gems') 
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
    blueSpecialAttack_Area=this.add.circle(120,120,120, 0xffffff,0.5);
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
            attack: new AttackStateP1(),
    		getHit: new GetHitStateP1(),
    		death: new DeathStateP1(),
    		invisible: new InvisibleStateP1(),
         }, [this, player1]);

    this.stateMachine_player2 = new StateMachine('idle', {
            idle: new IdleStateP2(),
            move: new MoveStateP2(),
            jump: new JumpStateP2(),
    		climb: new ClimbStateP2(),
            attack: new AttackStateP2(),
    		getHit: new GetHitStateP2(),
    		death: new DeathStateP2(),
    		invisible: new InvisibleStateP2(),
          }, [this, player2]);
    
    //Animaciones player1
	//Idle
	

    player1.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers(chooseP1+'_idl', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });
	//Run
	

    player1.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers(chooseP1+'_run', { start: 0, end: 5 }),
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
        key: 'attack',
        frames: this.anims.generateFrameNumbers(chooseP1+'_attack', { start: 2, end: 3 }),
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
	//Jump
	

    player2.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers(chooseP2+'_jump', { start: 3, end: 7 }),
        frameRate: 10,
		repeat:0
    });

	//Attack

    player2.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers(chooseP2+'_attack', { start: 2, end: 3 }),
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
    this.physics.add.collider(item_pistol, platforms);
    this.physics.add.collider(item_knife, platforms);
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
    this.physics.add.overlap(player1, item_pistol, getPistol_P1, null, this);
    this.physics.add.overlap(player2, item_pistol, getPistol_P2, null, this);
    this.physics.add.overlap(player1, item_knife, getKnife_P1, null, this);
    this.physics.add.overlap(player2, item_knife, getKnife_P2, null, this);
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
	
    }//create

  update(){
	onItemRespawnEvent(this);
	text_time.setText('Event.progress: ' + timedCountdown.getProgress().toString().substr(0, 4));
	checkNoLadder();
	checkTimeSpecial(player1);
    checkTimeSpecial(player2)
	checkExplosion();
	if(player1.direction!=='right') {  player1.flipX = true; }
	if(player1.direction!=='left') {  player1.flipX = false; }
	if(player2.direction!=='right') {  player2.flipX = true;}
	if(player2.direction!=='left') {  player2.flipX = false; }
	      this.stateMachine_player1.step();
	      this.stateMachine_player2.step();


    if	(Phaser.Input.Keyboard.JustDown(input_Q)){
    	if(chooseP1==='Chilli'){pinkSpecialAttack(player1,this);	}
    	if(chooseP1==='Bernie'){whiteSpecialAttack(player1,player2);	}
    	if(chooseP1==='Wasabi'){blueSpecialAttack(player1);	}
    
    }
    if	(Phaser.Input.Keyboard.JustDown(input_E) && player1.hasPistol===true){
    	if(player1.ammo>0){
    		var sfx;
    		sfx = this.sound.add('pistolFire');
        	sfx.play();
    			playerFire(player1, player1.direction, this);
    	}
    }
    if	(Phaser.Input.Keyboard.JustDown(input_U)){
    	if(chooseP2==='Chilli'){pinkSpecialAttack(player2,this);	}
    	if(chooseP2==='Bernie'){whiteSpecialAttack(player2,player1);	}
    	if(chooseP2==='Wasabi'){blueSpecialAttack(player2);	}
    
    }
    if	(Phaser.Input.Keyboard.JustDown(input_O)&& player2.hasPistol===true){
    		if(player2.ammo>0){
    	playerFire(player2, player2.direction, this);
    	}
    }
    checkDebuffTime(player1, player2);
    checkBoosts(player1, player2)
        }//update
        
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////PANTALLA ESCENARIO 1//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class PantallaEscenario1 extends Phaser.Scene{
    constructor(){
        //Escenario1--> nombre que se le da a la escena
        super({ key: "Escenario1"});
    }

    

    preload(){
    }


    create(){
    }

    update(){
    }

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
    }

    update(){
    }

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
    }

    update(){
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////FUNCIONES ///////////////////////////////////////////////////////
///Funciones de timer///
function onCountDownEvent ()
{
    this.scene.start('Resultados');
    text_time.setText('SE ACABÓ EL TIEMPO');
}
function onItemRespawnEvent(scene){
	 
	var progress = timedItemRespawn.getProgress();
	if(progress===1){
		controlIimedItemRespawn_Fruits+=1;
		controlIimedItemRespawn_Gems+=1;
		controlIimedItemRespawn+=1;
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
	if(controlIimedItemRespawn>1000){
		controlIimedItemRespawn=0;
		scene.time.addEvent(timedItemRespawn);
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
}
//Ataques especiales//
function pinkSpecialAttack(player, gameObject){
	if(player.canSpecial){
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
	if(player.canSpecial){
	playerHurt.debuff=true;
	playerAttack.LastTimeSpecial=0;
	playerAttack.canSpecial=false;
	}
}
function blueSpecialAttack(player){
	if(player.canSpecial){
	blueSpecialAttack_Area.body.enable=true;
	blueSpecialAttack_Area.x=player.body.center.x;
	blueSpecialAttack_Area.y=player.body.center.y;
	player.LastTimeSpecial=0;
	player.canSpecial=false;
	blueSpecialAttack_Area.setVisible(true);
}
}
function checkTimeSpecial(player){
	if(!player.canSpecial){
	player.LastTimeSpecial+=1;
	if(player.LastTimeSpecial>2000){
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
	}
}
function checkExplosion(){
	if(blueSpecialAttack_Area.body.enable){
	blueSpecialAttack_Area.body.enable=false;
	blueSpecialAttack_Area.setVisible(false);

	}
}

//Relacionadas con objetos////////////////////////
function collectGem(player, gem){
	gem.disableBody(true, true);

    //  Add and update the score
if(player.tag===2){
	player.GemsOwned+=1;
	profile_p2_UI.data.values.gems += 1;
}else{
	player.GemsOwned+=1;
	profile_p1_UI.data.values.gems += 1;
}
    
}


function PlayerLoseGems(player, gameObject){
gems.create(player.body.center.x+10,player.body.center.y-50,'gem');
gems.create(player.body.center.x-10,player.body.center.y-50,'gem');
gems.create(player.body.center.x,player.body.center.y-50,'gem');
if(player.tag===2){
	profile_p2_UI.data.values.gems -= 3;
	}else{
	profile_p1_UI.data.values.gems -= 3;
	}
			

}

function getPistol_P1(player, pistol){
	if(Phaser.Input.Keyboard.JustDown(input_S)){
	pistol.disableBody(true, true);
	player.setTint(0xFFEE58);
	player.hasPistol=true;
	player.hasKnife=false;
	}
}
function getKnife_P1(player, knife){
	if(Phaser.Input.Keyboard.JustDown(input_S)){
	knife.disableBody(true, true);
	player.setTint(0xB0BEC5);
	player.hasPistol=false;
	player.hasKnife=true;
	}
}
function getPistol_P2(player, pistol){
	if(Phaser.Input.Keyboard.JustDown(input_K)){
	pistol.disableBody(true, true);
	player.setTint(0xFFEE58);
	player.hasPistol=true;
	player.hasKnife=false;
	}
}
function getKnife_P2(player, knife){
	if(Phaser.Input.Keyboard.JustDown(input_K)){
	knife.disableBody(true, true);
	player.setTint(0xB0BEC5);
	player.hasPistol=false;
	player.hasKnife=true;
	}
}
function createGem(){
	
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(0, 600);
		gems.create(x,y,'gem');  
}
function createShield(){
	
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(0, 600);
		items_shield.create(x,y,'shield_item');  
}
function createPower(){
	
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(0, 600);
		items_power.create(x,y,'power_item');  
}
function createSpeed(){
	
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(0, 600);
		items_speed.create(x,y,'speed_item');  
}
function createLemon(){
	
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(0, 600);
		items_lemon.create(x,y,'lemon_item');  
}
function createGrape(){
	
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(0, 600);
		items_grape.create(x,y,'grape_item');  
}
function createStrawberry(){
	
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(0, 600);
		items_strawberry.create(x,y,'strawberry_item');  
}
function createAmmo(){
	
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(0, 600);
		items_ammo.create(x,y,'ammo_item').setScale(0.3,0.3).refreshBody();  
}

function collectLemon(player, lemon){
	lemon.disableBody(true, true);
	if(player.tag===2){
	profile_p2_UI.data.values.lives += 1;
	}else{
	profile_p1_UI.data.values.lives += 1;
	}
	player.life++;
}
function collectGrape(player, grape){
	grape.disableBody(true, true);
	if(player.tag===2){
	profile_p2_UI.data.values.lives += 3;
	}else{
	profile_p1_UI.data.values.lives += 3;
	}
	player.life+=3;
}
function collectStrawberry(player, strawberry){
	strawberry.disableBody(true, true);
	if(player.tag===2){
	profile_p2_UI.data.values.lives += 5;
	}else{
	profile_p1_UI.data.values.lives += 5;
	}
		player.life+=5;
}

function collectPower(player, power){
	power.disableBody(true, true);
		player.setTint(0xFF0909);
	player.strengthBoost=true;

}
function collectSpeed(player, speed){
	speed.disableBody(true, true);
		player.setTint(0x5BF0FF);
	player.speedBoost=true;
}
function collectShield(player, shield_){
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
	function collectAmmo(player, ammo){
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
	profile_p2_UI.data.values.lives -= 2;
	}else{
	profile_p1_UI.data.values.lives -= 2;
	}
	}
	else{player.life--;
		if(player.tag===2){
		profile_p2_UI.data.values.lives -= 1;
		}else{
		profile_p1_UI.data.values.lives -= 1;
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
			profile_p2_UI.data.values.lives -= 5;
			}else{
			profile_p1_UI.data.values.lives -= 5;
			}
		}
		else{player.life-=3;
			if(player.tag===2){
			profile_p2_UI.data.values.lives -= 3;
			}else{
			profile_p1_UI.data.values.lives -= 3;
			}
		}
		rectangle.body.enable=false;
		
}
}
function PlayerExplosionHitted(player,circle){
if	(blueSpecialAttack_Area.body.enable){
		player.hitted=true;
		if(player.tag===2){
		profile_p2_UI.data.values.lives -= 1;
		}else{
		profile_p1_UI.data.values.lives -= 1;
		}
}
}
function CopyHitted(copy){
	copy.disableBody(true, true);
	if(pinkCopy.tag===2){
			player2.invisible=false;
					player2.canSpecial=true;

	}else{
			player1.invisible=false;
					player1.canSpecial=true;

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
	profile_p1_UI.data.values.lifes=player1.life; 
	profile_p1_UI.data.values.gems=player1.gemsOwned;
	profile_p1_UI.data.values.ammo=player1.ammo;
}
function respawnPlayer2(){
	player2.setVisible(true);
	player2.x=respawn_P2.x;
	player2.y=respawn_P2.y;
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
	profile_p2_UI.data.values.lifes=player2.life; 
	profile_p2_UI.data.values.gems=player2.gemsOwned;
	profile_p2_UI.data.values.ammo=player2.ammo;
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
    if (spaceBar.isDown  && player1.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    // Transition to attack if pressing e
    if (input_E.isDown && player1.hasKnife===true) {
      this.stateMachine.transition('attack');
      return;
    }
    // Transition to move if pressing a movement key
    if ((input_A.isDown || input_D.isDown)&& !player1.invisible) {
      this.stateMachine.transition('move');
      return;
    }
	// Transition to invisible if pressing a movement key
    if ((input_A.isDown || input_D.isDown)&& player1.invisible) {
      this.stateMachine.transition('invisible');
      return;
    }
	// Transition to climb if pressing W
    if (input_W.isDown && player1.onLadder) {
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
    if (spaceBar.isDown && player1.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
   // Transition to attack if pressing e
    if (input_E.isDown && player1.hasKnife===true) {
      this.stateMachine.transition('attack');
      return;
    }
    
    // Transition to idle if not pressing movement keys
    if (!(input_A.isDown || input_D.isDown)) {
      this.stateMachine.transition('idle');
      return;
    }
	// Transition to climb if pressing W
    if (input_W.isDown && player1.onLadder) {
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

    player1.anims.play('run', true);
    
  }
}
class InvisibleStateP1 extends State {
	enter(scene, player1){
			//player1.onLadder=false;

	}
  execute(scene, player1) {    
    // Transition to jump if pressing space
    if (spaceBar.isDown && player1.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
   // Transition to attack if pressing e
    if (input_E.isDown && player1.hasKnife===true) {
      this.stateMachine.transition('attack');
      return;
    }
    
    // Transition to idle if not pressing movement keys
    if ((!(input_A.isDown || input_D.isDown))&& !player1.invisible) {
      this.stateMachine.transition('idle');
      return;
    }
	// Transition to climb if pressing W
    if (input_W.isDown && player1.onLadder) {
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

class AttackStateP1 extends State {
  enter(scene, player1) {
if(player1.strengthBoost){knifeHitbox.damage=5;}else{knifeHitbox.damage=3;}
	    player1.anims.play('attack');


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
    if (spaceBar.isDown && player1.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
   // Transition to attack if pressing e
    if (input_E.isDown && player1.hasKnife===true) {
      this.stateMachine.transition('attack');
      return;
    }
    
	if ((input_A.isDown || input_D.isDown || !player1.onLadder)) {
      this.stateMachine.transition('idle');
      return;

    }


    // Stop on ladder if not pressing movement keys
    if (!(input_A.isDown || input_D.isDown || input_W.isDown || input_S.isDown)) {
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
	player1.x=ladder.body.center.x;
    player1.setVelocityX(0);
	if(input_W.isDown){
		player1.setVelocityY(-100);
	}else if (input_S.isDown){
			player1.setVelocityY(100);

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
      this.stateMachine.transition('attack');
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
      this.stateMachine.transition('attack');
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
    player2.anims.play('run', true);
    
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
      this.stateMachine.transition('attack');
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

	if( player2.invisible){player2.anims.play('invisible');}
		else{player2.anims.play('climb',true);}
}
}

class AttackStateP2 extends State {
  enter(scene, player2) {

		if(player2.strengthBoost){knifeHitbox2.damage=5;}else{knifeHitbox2.damage=3;}

	    player2.anims.play('attack');


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
      this.stateMachine.transition('attack');
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
	player2.x=ladder.body.center.x;
    player2.setVelocityX(0);
	if(input_I.isDown){
		player2.setVelocityY(-100);
	}else if (input_K.isDown){
			player2.setVelocityY(100);

	}
	player2.anims.play('climb',true);
    
  }
}


////////////////////////////////////////PANTALLA DE RESULTADOS//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class PantallaResultados extends Phaser.Scene{
    constructor(){
        //Resultado--> nombre que se le da a la escena
        super({ key: "Resultados"});
    }

    

    preload(){
    }


    create(){

        text_p1_Results.setText([
            'Name: ' + profile_p2_UI.data.get('name'),
            'Gems: ' + profile_p2_UI.data.get('gems') 
        ]);

        text_p2_Results.setText([
            'Name: ' + profile_p2_UI.data.get('name'),
            'Gems: ' + profile_p2_UI.data.get('gems') 
        ]);
    }

    update(){
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
    scene: [PantallaCarga, PantallaDeInicio, MenuPersonajes, MenuEscenarios, PantallaJuego/*, PantallaEscenario1, PantallaEscenario2, PantallaEscenario3, PantallaResultados*/],
	audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);


