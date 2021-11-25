var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Game, Gameover, Congratulations],
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
  //Personajes
  this.load.image('Chilli', 'assets/Chilli.png');
  this.load.image('Bernie', 'assets/Bernie.png');
  this.load.image('Wasabi', 'assets/Wasabi.png');

  //Escenarios
  this.load.image('escenario1', 'assets/escenario1.png');
  this.load.image('escenario2', 'assets/escenario2.png');
  this.load.image('escenario3', 'assets/escenario3.png');
}

function create ()
{
  this.add.image(400, 300, 'escenario1')
}

function update ()
{
}
