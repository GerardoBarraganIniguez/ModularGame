export default class InfoBoxGroup extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);
        this.animaciones();
       
    }

    crearBox(x,y){
        this.create(x,y,'infoBoxIdle').setGravityY(1000);
    }

    animaciones(){
        this.scene.anims.create({
            key: 'destroyingInfoBox',
            frames: [
                { key: 'infoBoxIdle' },
                { key: 'infoBoxHit' },
            ],
            frameRate: 8,
            repeat: 3
        });

        // this.add.sprite(400, 300, 'cat1')
        //     .play('snooze');
    }
    

}