export default class Rey extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite); 
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.animaciones();
        this.atributos();
        this.controles();
        
    }

    update(){
        this.body.setVelocityX(0); 

        
        if (this.izquierda.isDown){
            this.body.setVelocityX(-this.velocidadRey);
            this.flipX = true;
            if (this.body.onFloor()){
                this.anims.play('ReyCorriendo',true);
            }
        }
        else if (this.derecha.isDown){
            this.body.setVelocityX(this.velocidadRey); 
            this.flipX = false;
            if (this.body.onFloor()){
                this.anims.play('ReyCorriendo',true);
            }
        }
        else if (this.salto.isDown && this.body.onFloor()){
            this.body.setVelocityY(this.alturaSaltoRey);
        }
        else if (Phaser.Input.Keyboard.JustDown(this.ataque)){

            this.mazoHitbox.body.enable = true;
            //Si el rey se voltea la hitbox tambien  
            this.mazoHitbox.x = this.scene.rey.flipX
                ? this.scene.rey.x - this.scene.rey.width * 0.1
                : this.scene.rey.x + this.scene.rey.width * 0.1
            this.mazoHitbox.y = this.scene.rey.y;

            this.anims.play('ReyAtacando',true);
            
        }
        else{
            this.mazoHitbox.body.enable=false;

        }
    }


    atributos(){
        this.setGravityY(1000);
        this.velocidadRey = 300;
        this.alturaSaltoRey = -400;
        this.enemigosEliminados = 0;
        this.setSize(20,26);
        //this.setCircle(10,8,4); //hitbox Rey
        this.anims.play('ReyEstatico',true);
        //hitbox mazo
        this.mazoHitbox = this.scene.add.rectangle(150,350,45,20,0xffffff,0); // X,Y, ancho, largo, ultimo 0 no se ve 
        this.scene.physics.add.existing(this.mazoHitbox);
        this.mazoHitbox.body.enable = false; //se quitan las fisicas para que se activen solo cuando se activa la animacion de ataque

    }

    animaciones(){
        this.anims.create({
            key: 'ReyEstatico',
            frames: this.anims.generateFrameNumbers('Rey', { start: 0, end: 10 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'ReyCorriendo',
            frames: this.anims.generateFrameNumbers('ReyC', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'ReyAtacando',
            frames: this.anims.generateFrameNumbers('ReyA', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });

        
    }

    controles(){
        this.izquierda = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.derecha = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.ataque = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.salto = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

}