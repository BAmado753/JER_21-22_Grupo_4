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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};



//constants
var PLAYER_SPEED = 1200;
var PLAYER_GRAVITY = 800;
var PLAYER_JUMP = -620;
var PLAYER_FRICTION = 0.96;
var PLAYER_MAX_SPEED = 300;
var ENEMY_SPAWN_RATE = 1000;
var ENEMY_LIFESPAN = 6500;
var ENEMY_BASE_SPEED = 300;
var TIME_SCORE_RATE = 2000;
var FLOOR_SPEED = 100;
var ENEMY_SHOOT_RATE = 1700;
var ENEMY_BULLET_SPEED = 600;
var HARD_ENEMY_SPEED = 520;
var WEAPON_BOX_SPAWN_RATE = 0.20;//probability
var HARD_SPAWN_RATE = 0.20;//probability

//weapon constants
var BULLET_SPEED = 1000;
var PISTOL_FIRE_RATE = 500;
var RIFLE_FIRE_RATE = 200;
var SHOTGUN_FIRE_RATE = 500;

var enemy_level_cap = [10000,30000,40000,99999999];
/*
{
  max speed reached,
  occasionally spawn hard enemies,
  shoot bullet forward
*/
//variables
var lastSpawnTime = 0;
var score = 0;
var lastScoreGiven = 0;
var enemy_speed = ENEMY_BASE_SPEED;
var lastEnemyShootTime = 0;
var ammo = 0;

//function
var onWeaponFire;
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
var player2;
var platforms;
var playerWeapon;
var enemies;
var scoreDisplay;
var thisOverDisplay;
var stop = false;
var deadEnemy;
var deadHardEnemy;
var emptyShell;
var emptyShotShell;
var hand;
var debugDisplay;
var ammoDisplay;
var enemyWeapon;
var weaponBox;
var backgroundMusic;

var game = new Phaser.Game(config);
var cursors;

//Inputs Player 1
var spaceBar;
var input_A;
var input_D;
var input_E;

//Inputs Player 2
var input_0;
var input_4;
var input_6;
var input_9;






// load images and resources
function preload()
{

  this.load.image('gray',             'asset/gray.jpg');
  this.load.image('platform',         'asset/platform.jpg');
  this.load.image('bullet',           'asset/bullet.png');
  /*this.load.image('man',              'asset/man.gif');
  this.load.image('redMan',           'asset/redMan.gif');
  this.load.image('red',              'asset/red.png');
  this.load.image('yellow',           'asset/particleYellow.png');
  this.load.image('shell',            'asset/shell.png');
  this.load.image('bulletHitbox',     'asset/bulletHitbox.png');*/

//Player 1
        //this.load.setPath('assets/games/bank-panic/');

  this.load.spritesheet('player1_idl_r', 'asset/Pink_Monster_Idle_Right.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player1_idl_l', 'asset/Pink_Monster_Idle_Left.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player1_run_r', 'asset/Pink_Monster_Run_Right.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player1_run_l', 'asset/Pink_Monster_Run_Left.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player1_jump_r', 'asset/Pink_Monster_Jump_Right.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player1_jump_l', 'asset/Pink_Monster_Jump_Left.png', { frameWidth: 32, frameHeight: 32 });

//Player 2
  this.load.spritesheet('player2_idl_r', 'asset/Owlet_Monster_Idle_Right.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player2_idl_l', 'asset/Owlet_Monster_Idle_Left.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player2_run_r', 'asset/Owlet_Monster_Run_Right.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player2_run_l', 'asset/Owlet_Monster_Run_Left.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player2_jump_r', 'asset/Owlet_Monster_Jump_Right.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player2_jump_l', 'asset/Owlet_Monster_Jump_Left.png', { frameWidth: 32, frameHeight: 32 });

  /*this.load.spritesheet('weaponBox',  'asset/weaponBox.png',{frameWidth:13, frameHeight:13});
  this.load.spritesheet('pistol',     'asset/pistolHand.png',{frameWidth:46, frameHeight:47});
  this.load.spritesheet('rifle',      'asset/rifleHand.png', {frameWidth:73, frameHeight:47});
  this.load.spritesheet('shotgun',    'asset/shotgunHand.png', {frameWidth:80, frameHeight:47});
  
  this.load.audio('enemyFire',        'asset/pulseGun.ogg');
  this.load.audio('pistolFire',       'asset/pistolFire.wav');
  this.load.audio('rifleFire',        'asset/rifleFire.wav');
  this.load.audio('shotgunFire',      'asset/shotgunFire.wav');
  this.load.audio('reload',           'asset/reload.wav');
  
  this.load.audio('steamTech',        'asset/Steamtech-Mayhem_Looping.mp3');*/
}

function create()
{
//Background
this.add.image(400,300, 'gray').setScale(2,2);

//Plataformas
    platforms = this.physics.add.staticGroup();

platforms.create(150,350,'platform').setScale(10,1).refreshBody();
platforms.create(650,350,'platform').setScale(10,1).refreshBody();
platforms.create(400,580,'platform').setScale(50,3).refreshBody();

//Input 
spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
input_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
input_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
input_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

input_0= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
input_4=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
input_6=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
input_9=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

//Player 1
    player1 = this.physics.add.sprite(100, 450, 'player1_idl_r');
	player1.direction='right';
    player1.setCollideWorldBounds(true);
	player1_Bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
//Player 2
  	player2 = this.physics.add.sprite(400, 450, 'player2_idl_l');
    player2.setCollideWorldBounds(true);

//Create StateMachine
this.stateMachine = new StateMachine('idle', {
        idle: new IdleState(),
        move: new MoveState(),
        jump: new JumpState(),
      }, [this, player1]);


//Animaciones player1
	//Idle
	player1.anims.create({
        key: 'idle_left',
        frames: this.anims.generateFrameNumbers('player1_idl_l', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });

    player1.anims.create({
        key: 'idle_right',
        frames: this.anims.generateFrameNumbers('player1_idl_r', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });
	//Run
	player1.anims.create({
        key: 'run_left',
        frames: this.anims.generateFrameNumbers('player1_run_l', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    player1.anims.create({
        key: 'run_right',
        frames: this.anims.generateFrameNumbers('player1_run_r', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	//Jump
	player1.anims.create({
        key: 'jump_left',
        frames: this.anims.generateFrameNumbers('player1_jump_l', { start: 3, end: 7 }),
        frameRate: 10,
		repeat:0
    });

    player1.anims.create({
        key: 'jump_right',
        frames: this.anims.generateFrameNumbers('player1_jump_r', { start: 3, end: 7 }),
        frameRate: 10,
		repeat:0
    });

//Animaciones player2
	//Idle
	player2.anims.create({
        key: 'idle_left',
        frames: this.anims.generateFrameNumbers('player2_idl_l', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    player2.anims.create({
        key: 'idle_right',
        frames: this.anims.generateFrameNumbers('player2_idl_r', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
	//Run
	player2.anims.create({
        key: 'run_left',
        frames: this.anims.generateFrameNumbers('player2_run_l', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    player2.anims.create({
        key: 'run_right',
        frames: this.anims.generateFrameNumbers('player2_run_r', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	//Jump
	player2.anims.create({
        key: 'jump_left',
        frames: this.anims.generateFrameNumbers('player2_jump_l', { start: 0, end: 7 }),
        frameRate: 10,
		repeat:0
    });

    player2.anims.create({
        key: 'jump_right',
        frames: this.anims.generateFrameNumbers('player2_jump_r', { start: 0, end: 7 }),
        frameRate: 10,
		repeat:0
    });

//Physics
player1.play('idle_right',true);
    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player1, player2);

}

function update()
{
	      this.stateMachine.step();
if	(Phaser.Input.Keyboard.JustDown(input_E)){
	playerFire(player1, player1.direction, this);
}
	

}//update

//Funcion disparar
function playerFire (player, direction, gameObject) {
        if (player.active === false)
            return;

        // Get bullet from bullets group
        var bullet = player1_Bullets.get().setActive(true).setVisible(true);
        if (bullet)
        {
	
            bullet.fire(player.x,player.y, direction);
            gameObject.physics.add.collider(bullet, player2);
   		gameObject.physics.add.overlap(player2, bullet, PlayerHitted, null, this);


        }
    }

///STATES//////////
class IdleState extends State {
  enter(scene, player1) {
    player1.setVelocityX(0);
if(player1.direction==='left'){
	player1.anims.play('idle_left',true);
}else{
	player1.anims.play('idle_right',true);
}
   
  }
  
  execute(scene, player1) {
   // const {input_A, input_D, spaceBar} = scene.keys;
    
    // Transition to jump if pressing space
    if (spaceBar.isDown  && player1.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
    // Transition to move if pressing a movement key
    if (input_A.isDown || input_D.isDown) {
      this.stateMachine.transition('move');
      return;
    }
  }
}

class MoveState extends State {
  execute(scene, player1) {
   // const {input_A, input_D, spaceBar} = scene.keys;
    
    // Transition to jump if pressing space
    if (spaceBar.isDown && player1.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    
   
    
    // Transition to idle if not pressing movement keys
    if (!(input_A.isDown || input_D.isDown)) {
      this.stateMachine.transition('idle');
      return;
    }
    
    player1.setVelocityX(0);
    if (input_A.isDown) {
      player1.setVelocityX(-100);
      player1.direction = 'left';
	  player1.anims.play('run_left', true);
    } else if (input_D.isDown) {
      player1.setVelocityX(100);
      player1.direction = 'right';
	  player1.anims.play('run_right', true);
    }
    
    
  }
}

class JumpState extends State {
  enter(scene, player1) {
		    player1.setVelocityY(-250);

if(player1.direction==='left'){
	    player1.anims.play('jump_left');
		player1.once('animationcomplete', () => {
			this.stateMachine.transition('idle')
   		 });
}else{
	    player1.anims.play('jump_right');
		player1.once('animationcomplete', () => {
			this.stateMachine.transition('idle')
    	});
}
    
  }
execute(scene, player1){
	if(player1.body.touching.down){
		this.stateMachine.transition('idle');
		return;
	}
}
}

function PlayerHitted(player,bullet){
	bullet.setActive(false);
    bullet.setVisible(false);
	player.setTint(0xff0000);
}








/////////////////Funciones del señor///////////////
function updatePlayerWeapon()
{
  if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
  {
    playerWeapon.trackSprite(player, hand.width, -10);
    if(player.width > 0)
    {
      playerWeapon.fireAngle = 0;
    }
    else
    {
      playerWeapon.fireAngle = 180;
    }
    if(playerWeapon.fire())
    {
      onWeaponFire();
    }
  }//if
}

function movePlayer()
{
  if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
  {
    player.body.acceleration.x = -PLAYER_SPEED;
    player.width = -Math.abs(player.width);
    hand.width = -Math.abs(hand.width);
  }
  else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
  {
    player.body.acceleration.x = PLAYER_SPEED;
    player.width = Math.abs(player.width);
    hand.width = Math.abs(hand.width);
  }
  else
  {
    player.body.acceleration.x = 0;
  }

}//movePlayer

function playerCollision()
{
  if(this.physics.arcade.collide(player, floor) ||
    this.physics.arcade.collide(player, floor1) ||
    this.physics.arcade.collide(player, floor2) ||
    this.physics.arcade.collide(player, floor3) )
  {
    //jump
    if (this.input.keyboard.isDown(Phaser.Keyboard.UP) &&
        player.body.touching.down)
    {
      player.body.velocity.y = PLAYER_JUMP;
    }
  }

}

function friction()
{
  player.body.velocity.x *= PLAYER_FRICTION;
}

function speedLimit()
{
  if(Math.abs(player.body.velocity.x) >= PLAYER_MAX_SPEED)
  {
    player.body.velocity.x *= PLAYER_MAX_SPEED/Math.abs(player.body.velocity.x);
  }
}

function spawnEnemy()
{
  //if this waited ENEMY_SPAWN_RATE amount since last spawn
  if( this.time.now >= (lastSpawnTime + ENEMY_SPAWN_RATE) )
  {
    
    lastSpawnTime = this.time.now + Math.floor(Math.random()*1000%4)*200;
    
    if(getEnemyLevel() == 1)
    {
      if(Math.random() < HARD_SPAWN_RATE)
      {
        hardEnemySpawn();
        return;
      }
    }

    //gets any element of enemies that is not objectified yet
    var enemy = enemies.getFirstExists(false);

    //if 'enemy' exists (enemies have at least one un-objectified element)
    if (enemy)
    {
      enemy.reset(400, 120);//set position
      enemy.loadTexture('man');
      enemy.lifespan = ENEMY_LIFESPAN;//how long enemy lasts
      this.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.body.allowGravity = true;
      enemy.body.gravity.y = PLAYER_GRAVITY;
      enemy.width = enemy.width * (Math.floor(Math.random()*1000%2)*2-1);
      enemy.body.collideWorldBounds = true;//does enemy collided with world bound
    }//if enemy
    
  }//if thistime
  
}

function hardEnemySpawn()
{
  var enemy = enemies.getFirstExists(false);

  //if 'enemy' exists (enemies have at least one un-objectified element)
  if (enemy)
  {
    enemy.reset(400, 120);//set position
    enemy.loadTexture('redMan');
    enemy.lifespan = ENEMY_LIFESPAN;//how long enemy lasts
    this.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.body.allowGravity = true;
    enemy.body.gravity.y = PLAYER_GRAVITY;
    enemy.width = enemy.width * (Math.floor(Math.random()*1000%2)*2-1);
    enemy.body.collideWorldBounds = true;//does enemy collided with world bound
  }//if enemy
}

function enemiesMove()
{
  //collide not only work with sprites but also group of sprites
  this.physics.arcade.collide(enemies, floor);
  this.physics.arcade.collide(enemies, floor1);
  this.physics.arcade.collide(enemies, floor2);
  this.physics.arcade.collide(enemies, floor3);

  //run function called 'enemyMove' and put 
  //'for each enemy that currently is objectified'
  //as a parameter 
  enemies.forEachExists(enemyMove, this);
  if( this.time.now >= (lastEnemyShootTime + ENEMY_SHOOT_RATE) &&
      getEnemyLevel() >= 2 )
  {
    var music;
    music = this.add.audio('enemyFire');
    music.play();
    
    enemies.forEachExists(
      function(enemy)
      {
        enemyWeapon.trackSprite(enemy);
        if(enemy.width > 0)
        {
          enemyWeapon.fireAngle = 0;
        }
        else
        {
          enemyWeapon.fireAngle = 180;
        }
        enemyWeapon.fire();
      }, this);
    lastEnemyShootTime = this.time.now;
  }
}

function getEnemyLevel()
{
  for(var i = 0; i < enemy_level_cap.length; i++)
  {
    if(score < enemy_level_cap[i])
      return i;
  }
  
  return enemy_level_cap;
}

function getEnemySpeed()
{
  var speed = ENEMY_BASE_SPEED + score/60;
  if(getEnemyLevel() >= 1 )
  {
    speed = ENEMY_BASE_SPEED + parseInt(enemy_level_cap[0])/60;
  }
  return speed;
}

function enemyMove(enemy)
{
  
  if(enemy.body.onWall())
  {
    enemy.width = -enemy.width;
  }
  if(enemy.key == 'redMan')
  {
    if(enemy.width > 0)
    {
      enemy.body.velocity.x = HARD_ENEMY_SPEED;
    }
    else
    {
      enemy.body.velocity.x = -HARD_ENEMY_SPEED;
    }
  }
  else
  {
    if(enemy.width > 0)
    {
      enemy.body.velocity.x = enemy_speed;
    }
    else
    {
      enemy.body.velocity.x = -enemy_speed;
    }
  }
  playerWeapon.bullets.forEachExists(bulletHitEnemy, this, enemy);
  
  if(enemy.body.y >= 550)
  {
    hardEnemySpawn();
    enemy.kill();
  }

}

function bulletHitEnemy(bullet, enemy)
{
  if(this.physics.arcade.collide(enemy, bullet))
  {
    if(enemy.key == 'redMan')
      deadHardEnemyEffect(enemy.body.x, enemy.body.y);
    else
      deadEnemyEffect(enemy.body.x, enemy.body.y);

    bullet.kill();
    enemy.kill();
    score = score + 500;
    if(Math.random() <= WEAPON_BOX_SPAWN_RATE)
    {
      spawnWeaponBox(bullet.x, bullet.y);
    }
    enemy_speed = getEnemySpeed();
  }
}

function addScore()
{
  if( this.time.now >= (lastScoreGiven + TIME_SCORE_RATE) )
  {
    score = score + 100;
    lastScoreGiven = this.time.now;
    enemy_speed = getEnemySpeed();
  }
}

function checkthisOver()
{
  if( this.physics.arcade.collide(enemies, player) ||
      this.physics.arcade.collide(enemyWeapon.bullets, player) )
  {
    //thisover
    player.kill();
    enemies.killAll();
    playerWeapon.killAll();
    hand.kill();
    enemyWeapon.bullets.killAll();
    if(weaponBox != null)
      weaponBox.kill();
    stop = true;
    
  }
}

function deadEnemyEffect(x,y)
{
    deadEnemy.x = x
    deadEnemy.y = y;

    //  The first parameter sets the effect to 'explode' which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    deadEnemy.setYSpeed(-400, -600);
    deadEnemy.start(true, 2000, null, 1);
}

function deadHardEnemyEffect(x,y)
{
    deadHardEnemy.x = x
    deadHardEnemy.y = y;
    
    deadHardEnemy.setYSpeed(-400, -600);
    deadHardEnemy.start(true, 2000, null, 1);
}

function emptyShellEffect(x,y)
{
    emptyShell.x = x
    emptyShell.y = y;
    
    emptyShell.setYSpeed(-400, -600);
    emptyShell.start(true, 2000, null, 1);
}

function emptyShotShellEffect(x,y)
{
    emptyShotShell.x = x
    emptyShotShell.y = y;
    
    emptyShotShell.setYSpeed(-400, -600);
    emptyShotShell.start(true, 2000, null, 1);
}

function updateEffects()
{
  this.physics.arcade.collide(emptyShell, floor);
  this.physics.arcade.collide(emptyShell, floor1);
  this.physics.arcade.collide(emptyShell, floor2);
  this.physics.arcade.collide(emptyShell, floor3);
  
  this.physics.arcade.collide(emptyShotShell, floor);
  this.physics.arcade.collide(emptyShotShell, floor1);
  this.physics.arcade.collide(emptyShotShell, floor2);
  this.physics.arcade.collide(emptyShotShell, floor3);
}

function updateFloor()
{
  if(this.physics.arcade.collide(floor1, floor2))
  {
    floor1.body.velocity.x = -FLOOR_SPEED;
    floor2.body.velocity.x = FLOOR_SPEED;
  }
  
  if(floor1.body.onWall() || floor2.body.onWall())
  {
    floor1.body.velocity.x = FLOOR_SPEED;
    floor2.body.velocity.x = -FLOOR_SPEED;
  }
}

function rifleSetup()
{
  if(hand != null)
    hand.kill();
  
  hand = this.add.sprite(300, 400, 'rifle');
  this.physics.enable(hand, Phaser.Physics.ARCADE);
  hand.anchor.set(0.15, 0.4);
  hand.animations.add('shoot', [1,2,0]);
  hand.animations.add('idle', [0]);
  hand.animations.play('idle');
  
  if(player.width > 0)
    hand.width = Math.abs(hand.width);
  else
    hand.width = -Math.abs(hand.width);
  
  //weapon
  playerWeapon = this.add.weapon(20, 'bulletHitbox');
  playerWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  playerWeapon.bulletSpeed = BULLET_SPEED;
  playerWeapon.fireRate = RIFLE_FIRE_RATE;
  
  ammo = 15;
  
  onWeaponFire = function()
  {
    var music;
    music = this.add.audio('rifleFire');
    music.play();
    hand.animations.play('shoot', 10);
    emptyShellEffect(player.body.x + Math.abs(player.width/2) + player.width*6/7, player.body.y);
    ammo--;
    if(ammo <= 0)
      pistolSetup();
  }
}

function shotgunSetup()
{
  if(hand != null)
    hand.kill();
  
  hand = this.add.sprite(300, 400, 'shotgun');
  this.physics.enable(hand, Phaser.Physics.ARCADE);
  hand.anchor.set(0.15, 0.4);
  hand.animations.add('shoot', [1,2,0]);
  hand.animations.add('idle', [0]);
  hand.animations.play('idle');
  
  if(player.width > 0)
    hand.width = Math.abs(hand.width);
  else
    hand.width = -Math.abs(hand.width);
  
  //weapon
  playerWeapon = this.add.weapon(20, 'bulletHitbox');
  playerWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  playerWeapon.bulletSpeed = BULLET_SPEED;
  playerWeapon.fireRate = 0;
  playerWeapon.bulletAngleVariance = 0;
  
  ammo = 8;
  
  onWeaponFire = function()
  {
    playerWeapon.fire();
    playerWeapon.bulletAngleVariance = 20;
    playerWeapon.fire();
    playerWeapon.fire();
    playerWeapon.fireRate = SHOTGUN_FIRE_RATE;
    playerWeapon.fire();
    playerWeapon.fireRate = 0;
    playerWeapon.bulletAngleVariance = 0;
    
    var music;
    music = this.add.audio('shotgunFire');
    music.play();
    hand.animations.play('shoot', 10);
    emptyShotShellEffect(player.body.x + Math.abs(player.width/2) + player.width*6/7, player.body.y);
    ammo--;
    if(ammo <= 0)
      pistolSetup();
  }
}

function pistolSetup()
{
  if(hand != null)
    hand.kill();
  
  hand = this.add.sprite(300, 400, 'pistol');
  this.physics.enable(hand, Phaser.Physics.ARCADE);
  hand.anchor.set(-0.1, 0.5);
  hand.animations.add('shoot', [1,2,0]);
  hand.animations.add('idle', [0]);
  hand.animations.play('idle');
  
  if(player.width > 0)
    hand.width = Math.abs(hand.width);
  else
    hand.width = -Math.abs(hand.width);
  
  //weapon
  playerWeapon = this.add.weapon(20, 'bulletHitbox');
  playerWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  playerWeapon.bulletSpeed = BULLET_SPEED;
  playerWeapon.fireRate = PISTOL_FIRE_RATE;
  
  
  onWeaponFire = function()
  {
    var music;
    music = this.add.audio('pistolFire');
    music.play();
    hand.animations.play('shoot', 10);
    emptyShellEffect(player.body.x + Math.abs(player.width/2) + player.width*6/7, player.body.y);
  }
  
}

function spawnWeaponBox(x, y)
{
  if(weaponBox != null)
  {
    weaponBox.kill();
  }
  // var x = ( (Math.random()*10000)%600 )+100;
  // var y = ( (Math.random()*10000)%250 )+230;
  weaponBox = this.add.sprite(x, y, 'weaponBox');
  weaponBox.width = 26;
  weaponBox.height = 24;
  
  this.physics.enable(weaponBox, Phaser.Physics.ARCADE);
  weaponBox.anchor.set(0.5, 0.5);
  weaponBox.animations.add('idle', [0, 1, 2, 3], 2, true);
  weaponBox.animations.play('idle');
}

function updateWeaponBox()
{
  
  if(this.physics.arcade.collide(player, weaponBox))
  {
    var music;
    music = this.add.audio('reload');
    music.play();
    var numOfWeapons = 2;
    var probability = 1/numOfWeapons;
    var chance = Math.random();
    
    if(chance <= probability*1)
    {
      rifleSetup();
    }
    else if(chance <= probability*2)
    {
      shotgunSetup();
    }
    
    weaponBox.kill();
  }
}

function reinitialize()
{
  lastSpawnTime = 0;
  score = 0;
  lastScoreGiven = this.time.now;
  enemy_speed = ENEMY_BASE_SPEED;
  stop = false;
  lastEnemyShootTime = 0;
  ammo = 0;
  deadEnemy.bounce.setTo(0.5,1);
}

function goFull()
{
      if (this.scale.isFullScreen) {
          this.scale.stopFullScreen();
      }
      else {
          this.scale.startFullScreen(false);
      }
}

function debug(text)
{
  if(text == undefined)
    debugDisplay.setText('debugging');
  else
    debugDisplay.setText(text);
}




