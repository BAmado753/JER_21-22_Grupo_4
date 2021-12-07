

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
        loadingText.destroy();
        percentText.destroy();
        progressBar.destroy();
        progressBox.destroy();
        //this.scene.start("PantallaInicio");
         });


        this.load.image('logo', './asset/stormedialogo.png');
        //Sólo para comprobar que la barra de carga funciona bien
            for (var i = 0; i < 5000; i++) {
                this.load.image('logo'+i);
            }
        



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
        this.load.spritesheet('SelectChilli', './asset/Pink_Monster_Selection.png', { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('SelectBernie', './asset/Owlet_Monster_Selection.png', { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('SelectWasabi', './asset/Dude_Monster_Selection.png', { frameWidth: 32, frameHeight: 32});

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

        //**POR RELLENAR

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }



    create(){
        
        this.logo = this.add.image(400, 300, 'logo').setInteractive();
        this.logo.setScale(0.5);
        
        //Botón continuar (también es el logo)
        this.logo.on('pointerover', () => {
            this.logo.setScale(0.55);
        });

        this.logo.on('pointerout', () => {
            this.logo.setScale(0.5);
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
        
        //Fondo de la pantalla de selección de personaje
        this.fondoMP= this.add.image(400, 300, 'fondoMenu');
        this.fondoMP.setScale(1.6);

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

        //Texto en forma de imagen
        this.tex= this.add.image(400, 100, 'textoSelect');
        this.tex.setScale(1.2);

        //Chilli
        this.per1 = this.add.sprite(150, 300, 'selectChilli').setInteractive();
        this.per1.setScale(5);
        //Eventos del botón
        this.per1.on('pointerover', () => {
            this.per1.setFrame(3);
        });

        this.per1.on('pointerout', () => {
            this.per1.setFrame(0);
        });

        this.per1.on('pointerdown', () => {
            
        });
    

        //Bernie
        this.per2 = this.add.sprite(400, 300, 'selectBernie').setInteractive();
        this.per2.setScale(5);
        //Eventos del botón
        this.per2.on('pointerover', () => {
            this.per2.setFrame(1);
        });

        this.per2.on('pointerout', () => {
            this.per2.setFrame(0);
        });

        this.per2.on('pointerdown', () => {
            
        });

        //Wasabi
        this.per3 = this.add.sprite(650, 300, 'selectWasabi').setInteractive();
        this.per3.setScale(5);
        //Eventos del botón
        this.per3.on('pointerover', () => {
            this.per3.setFrame(1);
        });

        this.per3.on('pointerout', () => {
            this.per3.setFrame(0);
        });

        this.per3.on('pointerdown', () => {
            
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
        //Carga de fondo, titulo e imagen
        this.load.image('fondoMenu1', './asset/fondoMenu_prueba.jpg');
        this.load.image('textoSelectE', './asset/TextoEleccionEscenario.png');
        this.load.image('Campo', './asset/escenario1_prueba.png');
        this.load.image('Lava', './asset/escenario2_prueba.png');
        this.load.image('Oriental', './asset/escenario3_prueba.png');
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



/////////////////////////////////////////////Pantalla De Juego//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class PantallaJuego extends Phaser.Scene{
    constructor(){
        //MenuPersonajes--> nombre que se le da a la escena
        super({ key: "Juego"});
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
    scene: [PantallaCarga, PantallaDeInicio, MenuPersonajes, MenuEscenarios, PantallaJuego/*, Resultados*/]
};

var game = new Phaser.Game(config);


