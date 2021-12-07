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
var player2;
var stateMachine_pink;
var stateMachine_white;
var item_pistol;
var item_knife;
var gems;
var items_power;
var items_speed;
var items_shield;
var items_lemon;
var items_grape;
var items_strawberry;
var ladder;
var lastTimeDebuff = 0;
var knifeHitbox= Phaser.GameObjects.Rectangle;
var blueSpecialAttack_Area= Phaser.GameObjects.Circle;
var shield1;
var shield2;
var pinkCopy;
var platforms;


var game = new Phaser.Game(config);
var cursors;

//Inputs Player 1
var spaceBar;
var input_A;
var input_D;
var input_W;
var input_S;
var input_E;
var input_Q;

//Inputs Player 2
var input_N;
var input_J;
var input_I;
var input_K;
var input_L;
var input_O;






// load images and resources
function preload()
{
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


//Escenario
  this.load.image('gray',             'asset/gray.jpg');
  this.load.image('platform',         'asset/platform.jpg');
  this.load.image('bullet',           'asset/bullet.png');
  this.load.image('ladder',         'asset/ladder.jpg');


//Player 1
  this.load.image('player1_profile', 'asset/Pink_Monster_closeUp.png');
  this.load.spritesheet('player1_idl', 'asset/Pink_Monster_Idle.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player1_run', 'asset/Pink_Monster_Run.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player1_jump', 'asset/Pink_Monster_Jump.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player1_attack', 'asset/Pink_Monster_Attack1.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player1_hurt', 'asset/Pink_Monster_Hurt.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player1_death', 'asset/Pink_Monster_Death.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player1_climb', 'asset/Pink_Monster_Climb.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player1_run_dust', 'asset/Walk_Run_Push_Dust.png', { frameWidth: 32, frameHeight: 32 });


//Player 2
  this.load.image('player2_profile', 'asset/Owlet_Monster_closeUp.png');
  this.load.spritesheet('player2_idl', 'asset/Owlet_Monster_Idle.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player2_run', 'asset/Owlet_Monster_Run.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player2_jump', 'asset/Owlet_Monster_Jump.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player2_attack', 'asset/Owlet_Monster_Attack1.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player2_hurt', 'asset/Owlet_Monster_Hurt.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('player2_death', 'asset/Owlet_Monster_Death.png', { frameWidth: 32, frameHeight: 32 });  
  this.load.spritesheet('player2_climb', 'asset/Owlet_Monster_Climb.png', { frameWidth: 32, frameHeight: 32 });
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

//Escaleras

ladder = this.physics.add.image(150, 450, 'ladder').setScale(1,10).refreshBody();
ladder.body.setAllowGravity(false);

//Gemas
 gems = this.physics.add.group({
        key: 'gem',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

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


//Input 
spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
input_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
input_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
input_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
input_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
input_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
input_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

input_N= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
input_J=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
input_L=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
input_I=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
input_K=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
input_O=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);


//Player 1
    player1 = this.physics.add.sprite(100, 450, 'player1_idl');
	player1.setBodySize(player1.width *0.5,player1.height *1);
	player1.tag=1;
	player1.life = 20;
	player1.gemsOwned = 0;
	player1.direction='right';
	player1.hitted=false;
	player1.hasPistol=false;
	player1.hasKnife=false;
	player1.debuff=false;
	player1.strengthBoost=false;
	player1.speedBoost=false;
	player1.shieldBoost=false;
	player1.LastStrengthBoost=false;
	player1.LastSpeedBoost=false;
	player1.LastShieldBoost=false;
	player1.onLadder=false;
	player1.invisible=false;
    player1.setCollideWorldBounds(true);

//Player 2
  	player2 = this.physics.add.sprite(400, 450, 'player2_idl');
	player2.setBodySize(player2.width *0.5,player2.height *1);
	player2.tag=2;
	player2.life = 20;
	player2.gemsOwned = 0;
	player2.direction='right';
	player2.hitted=false;
	player2.hasPistol=false;
	player2.hasKnife=false;
	player2.debuff=false;
	player2.strengthBoost=false;
	player2.speedBoost=false;
	player2.shieldBoost=false;
	player2.LastStrengthBoost=false;
	player2.LastSpeedBoost=false;
	player2.LastShieldBoost=false;
	player2.onLadder=false;
	player2.setCollideWorldBounds(true);
	
	
	player_Bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
	
	
	//Interfaz
	text_p1_UI = this.add.text(100, 550, '', { font: '16px Courier', fill: '#00ff00' });
	profile_p1_UI = this.add.image(50, 560, 'player1_profile');

        //  Store some data about this profile:
        profile_p1_UI.setDataEnabled();

        profile_p1_UI.data.set('name', 'Chilli');
        profile_p1_UI.data.set('lives', player1.life);
        profile_p1_UI.data.set('gems', player1.gemsOwned);

        text_p1_UI.setText([
            'Name: ' + profile_p1_UI.data.get('name'),
            'Lives: ' + profile_p1_UI.data.get('lives'),
            'Gems: ' + profile_p1_UI.data.get('gems') 
        ]);
		profile_p1_UI.on('changedata-gems', function (gameObject, value) {
                text_p1_UI.setText([
                    'Name: ' + profile_p1_UI.data.get('name'),
            		'Lives: ' + profile_p1_UI.data.get('lives'),
            'Gems: ' + profile_p1_UI.data.get('gems') 
                ]);
        });
		profile_p1_UI.on('changedata-lives', function (gameObject, value) {
                text_p1_UI.setText([
                    'Name: ' + profile_p1_UI.data.get('name'),
            		'Lives: ' + profile_p1_UI.data.get('lives'),
            'Gems: ' + profile_p1_UI.data.get('gems') 
                ]);
        });

    text_p2_UI = this.add.text(600, 550, '', { font: '16px Courier', fill: '#00ff00' });
	profile_p2_UI = this.add.image(750, 560, 'player2_profile').setFlipX(true);

        //  Store some data about this profile:
        profile_p2_UI.setDataEnabled();

        profile_p2_UI.data.set('name', 'Bernie');
        profile_p2_UI.data.set('lives', player2.life);
        profile_p2_UI.data.set('gems', player2.gemsOwned);

        text_p2_UI.setText([
            'Name: ' + profile_p2_UI.data.get('name'),
            'Lives: ' + profile_p2_UI.data.get('lives'),
            'Gems: ' + profile_p2_UI.data.get('gems') 
        ]);
		profile_p2_UI.on('changedata-gems', function (gameObject, value) {
                text_p2_UI.setText([
                    'Name: ' + profile_p2_UI.data.get('name'),
            		'Lives: ' + profile_p2_UI.data.get('lives'),
            'Gems: ' + profile_p2_UI.data.get('gems') 
                ]);
        });
		profile_p2_UI.on('changedata-lives', function (gameObject, value) {
                text_p2_UI.setText([
                    'Name: ' + profile_p2_UI.data.get('name'),
            		'Lives: ' + profile_p2_UI.data.get('lives'),
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
pinkCopy= this.physics.add.sprite(0,0, 'player1_idl');
pinkCopy.body.enable=false;
pinkCopy.setVisible(false);
//Create StateMachine
this.stateMachine_pink = new StateMachine('idle', {
        idle: new IdleStatePink(),
        move: new MoveStatePink(),
        jump: new JumpStatePink(),
		climb: new ClimbStatePink(),
        attack: new AttackStatePink(),
		getHit: new GetHitStatePink(),
		death: new DeathStatePink(),
		invisible: new InvisibleStatePink(),
      }, [this, player1]);

this.stateMachine_white = new StateMachine('idle', {
        idle: new IdleStateWhite(),
        move: new MoveStateWhite(),
        jump: new JumpStateWhite(),
		climb: new ClimbStateWhite(),
        attack: new AttackStateWhite(),
		getHit: new GetHitStateWhite(),
		death: new DeathStateWhite(),
      }, [this, player2]);

//Animaciones player1
	//Idle
	

    player1.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player1_idl', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });
	//Run
	

    player1.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('player1_run', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	//Jump
	

    player1.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('player1_jump', { start: 3, end: 7 }),
        frameRate: 10,
		repeat:0
    });

	//Attack

    player1.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers('player1_attack', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	 player1.anims.create({
        key: 'hurt',
        frames: this.anims.generateFrameNumbers('player1_hurt', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player1.anims.create({
        key: 'death',
        frames: this.anims.generateFrameNumbers('player1_death', { start: 0, end: 7 }),
        frameRate: 10,
		repeat:0
    });
	player1.anims.create({
        key: 'climb',
        frames: this.anims.generateFrameNumbers('player1_climb', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
	player1.anims.create({
        key: 'invisible',
        frames: this.anims.generateFrameNumbers('player1_run_dust', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
//Animaciones player2
	//Idle
	

    player2.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player2_idl', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });
	//Run
	

    player2.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('player2_run', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
	//Jump
	

    player2.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('player2_jump', { start: 3, end: 7 }),
        frameRate: 10,
		repeat:0
    });

	//Attack

    player2.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers('player2_attack', { start: 2, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	 player2.anims.create({
        key: 'hurt',
        frames: this.anims.generateFrameNumbers('player2_hurt', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:0
    });
	player2.anims.create({
        key: 'death',
        frames: this.anims.generateFrameNumbers('player2_death', { start: 0, end: 7 }),
        frameRate: 10,
		repeat:0
    });
	player2.anims.create({
        key: 'climb',
        frames: this.anims.generateFrameNumbers('player2_climb', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
//Copia
pinkCopy.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player1_idl', { start: 0, end: 3 }),
        frameRate: 10,
		repeat:-1
    });
//Physics
player1.play('idle',true);
player2.play('idle',true);
pinkCopy.play('idle',true);
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
    


    this.physics.add.collider(player1, player2);
    this.physics.add.overlap(player2, knifeHitbox, PlayerKnifeHitted,null, this);
    this.physics.add.overlap(player1, knifeHitbox, PlayerKnifeHitted,null, this);
    this.physics.add.overlap(pinkCopy, knifeHitbox, CopyHitted,null, this);
    this.physics.add.overlap(player2, blueSpecialAttack_Area, PlayerExplosionHitted,null, this);
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




}

function update()
{
	checkNoLadder();
	checkExplosion();
	if(player1.direction!=='right') {  player1.flipX = true; }
	if(player1.direction!=='left') {  player1.flipX = false; }
	if(player2.direction!=='right') {  player2.flipX = true;}
	if(player2.direction!=='left') {  player2.flipX = false; }
	      this.stateMachine_pink.step();
	      this.stateMachine_white.step();


if	(Phaser.Input.Keyboard.JustDown(input_Q)){
	pinkSpecialAttack(player1, this);
	//whiteSpecialAttack(player2);
	//blueSpecialAttack(player1);
	/*createShield();
	createPower();
	createSpeed();
	createLemon();
	createGrape();
	createStrawberry();*/

}
if	(Phaser.Input.Keyboard.JustDown(input_E) && player1.hasPistol===true){
	playerFire(player1, player1.direction, this);
}
if	(Phaser.Input.Keyboard.JustDown(input_O)&& player2.hasPistol===true){
	playerFire(player2, player2.direction, this);
}
checkDebuffTime(player1, player2);
checkBoosts(player1, player2)
}//update


////FUNCIONES CHECKEAR//////////////////

//Ataques especiales//
function pinkSpecialAttack(player, gameObject){
	player.invisible=true;
	pinkCopy.setVisible(true);
	pinkCopy.body.enable=true;
	pinkCopy.x=player.x;
	pinkCopy.y=player.y;    
	gameObject.physics.add.collider(pinkCopy, platforms);

}
function whiteSpecialAttack(player){
	player.debuff=true;
}
function blueSpecialAttack(player){
	blueSpecialAttack_Area.body.enable=true;
	blueSpecialAttack_Area.x=player.body.center.x;
	blueSpecialAttack_Area.y=player.body.center.y;
	blueSpecialAttack_Area.setVisible(true);

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
    
    if (gems.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });


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
	console.log(player.strengthBoost);

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
	player1.invisible=false;
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

















///STATES PINK//////////
class IdleStatePink extends State {
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
	// Transition to move if pressing a movement key
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

class MoveStatePink extends State {
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
class InvisibleStatePink extends State {
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
class JumpStatePink extends State {
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

class AttackStatePink extends State {
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


class GetHitStatePink extends State {
  enter(scene, player1) {
    player1.setVelocityX(0);
	player1.anims.play('hurt');
			player1.once('animationcomplete', () => {
				player1.hitted=false;
				this.stateMachine.transition('idle');
    	});
  }
}
class DeathStatePink extends State {
  enter(scene, player1) {
	PlayerLoseGems(player1, scene);
    player1.setVelocityX(0);
	player1.body.enable=false;
	player1.anims.play('death');
			player1.once('animationcomplete', () => {
			//this.stateMachine.transition('idle');
			player1.setVisible(false);
			
    	});
  }
}
class ClimbStatePink extends State {
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
		else{
	player1.anims.play('climb',true);}
    
  }
}
///STATES White//////////
class IdleStateWhite extends State {
  enter(scene, player2) {
	player2.onLadder=false;
    player2.setVelocityX(0);
	player2.anims.play('idle',true);
  }
  
  execute(scene, player2) {    
    // Transition to jump if pressing space
    if (input_N.isDown  && player2.body.touching.down) {
      this.stateMachine.transition('jump');
      return;
    }
    // Transition to attack if pressing o
    if (input_O.isDown && player2.hasKnife===true) {
      this.stateMachine.transition('attack');
      return;
    }
    // Transition to move if pressing a movement key
    if (input_J.isDown || input_L.isDown) {
      this.stateMachine.transition('move');
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

class MoveStateWhite extends State {
	enter(scene,player2){
		player2.onLadder=false;
	}
  execute(scene, player2) {
   // const {input_A, input_D, spaceBar} = scene.keys;
    
    // Transition to jump if pressing space
    if (input_N.isDown && player2.body.touching.down) {
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

class JumpStateWhite extends State {
  enter(scene, player2) {
		player2.setVelocityY(-150);
	    player2.anims.play('jump');
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

class AttackStateWhite extends State {
  enter(scene, player2) {

		if(player2.strengthBoost){knifeHitbox.damage=5;}else{knifeHitbox.damage=3;}

	    player2.anims.play('attack');


		if(player2.direction==='left'){
	        knifeHitbox.x= player2.x - player2.width * 0.45;

		}else{
        knifeHitbox.x= player2.x + player2.width * 0.45;
		}
		knifeHitbox.y= player2.y + player2.height * 0.1;
		knifeHitbox.body.enable=true;
				scene.physics.world.add(knifeHitbox.body);
		player2.once('animationcomplete', () => {
			this.stateMachine.transition('idle');
			knifeHitbox.body.enable=false;
					scene.physics.world.remove(knifeHitbox.body);

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


class GetHitStateWhite extends State {
  enter(scene, player2) {
    player2.setVelocityX(0);
	player2.anims.play('hurt');
			player2.once('animationcomplete', () => {
			player2.hitted=false;
			this.stateMachine.transition('idle');
    	});
  }
}
class DeathStateWhite extends State {
  enter(scene, player2) {
	PlayerLoseGems(player2, scene);
    player2.setVelocityX(0);
	player2.anims.play('death');
	player2.body.enable=false;
	player2.once('animationcomplete', () => {
		//this.stateMachine.transition('idle');	
					player2.setVisible(false);
	
    });
  }
}
class ClimbStateWhite extends State {
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


