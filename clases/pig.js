export default class Pig extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite); 
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.preload();
        this.create(); 
    }

    preload(){
        this.setGravityY(1000);
        this.setSize(30,30); //hitbox
        //.setBounce(0.2)
        //.setCollideWorldBounds(true)
        
        //.setDepth(2)
        //.body.setSize(35,66,35,30); // custom mask => setSize(width, height, XinSprite, YinSprite)
    }

    create(){
    
        this.anims.create({
            key: 'PigEstatico',
            frames: this.anims.generateFrameNumbers('Pig', { start: 0, end: 10 }),
            frameRate: 15
        });
    }

    update(){
        
        this.anims.play('PigEstatico',true);
        
    }
    
}