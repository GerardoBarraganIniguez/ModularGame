export default class PigGroup extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);
        this.animaciones();
       
    }

    crearPig(x,y){
        this.create(x,y,'Pig')
                    .setGravityY(1000) 
                    .anims.play('PigEstatico')
                    .setSize(30,30)//hitbox  
                    //.setVelocityX(30)
                    .hitsToDie = 5;   

    }

    animaciones(){
        this.scene.anims.create({
            key: 'PigEstatico',
            frames: this.scene.anims.generateFrameNumbers('Pig', { start: 0, end: 10 }),
            frameRate: 15,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'PigMuriendo',
            frames: this.scene.anims.generateFrameNumbers('PigM', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'PigGolpeado',
            frames: this.scene.anims.generateFrameNumbers('PigG', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: 0
        });
    }

   
}