var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'this',
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

}
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

//objects
var player;
var floor;
var floor1;
var floor2;
var floor3;
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

var this = new Phaser.this(config);
var cursors;

// load images and resources
function preload()
{

  this.load.image('gray',             'asset/gray.jpg');
  this.load.image('platform',         'asset/platform.jpg');
  this.load.image('man',              'asset/man.gif');
  this.load.image('redMan',           'asset/redMan.gif');
  this.load.image('player',           'asset/capMan.png');
  this.load.image('red',              'asset/red.png');
  this.load.image('yellow',           'asset/particleYellow.png');
  this.load.image('bullet',           'asset/bullet.png');
  this.load.image('shell',            'asset/shell.png');
  this.load.image('bulletHitbox',     'asset/bulletHitbox.png')
  
  this.load.spritesheet('weaponBox',  'asset/weaponBox.png',{frameWidth:13, frameHeight:13});
  this.load.spritesheet('pistol',     'asset/pistolHand.png',{frameWidth:46, frameHeight:47});
  this.load.spritesheet('rifle',      'asset/rifleHand.png', {frameWidth:73, frameHeight:47});
  this.load.spritesheet('shotgun',    'asset/shotgunHand.png', {frameWidth:80, frameHeight:47});
  
  this.load.audio('enemyFire',        'asset/pulseGun.ogg');
  this.load.audio('pistolFire',       'asset/pistolFire.wav');
  this.load.audio('rifleFire',        'asset/rifleFire.wav');
  this.load.audio('shotgunFire',      'asset/shotgunFire.wav');
  this.load.audio('reload',           'asset/reload.wav');
  
  this.load.audio('steamTech',        'asset/Steamtech-Mayhem_Looping.mp3');
}

function create()
{


}

function update()
{
}//update

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




