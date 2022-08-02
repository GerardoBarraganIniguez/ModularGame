export default class Scene1 extends Phaser.Scene {
    constructor(){
        super({key: 'Scene1'});
    }

    
    preload(){
        
        //Mapa
        this.load.image("TILES1", "assets/maps/TileSets/Terrain.png"); 
        this.load.image("TILES2", "assets/maps/TileSets/Decorations.png"); 
        this.load.tilemapTiledJSON("map","assets/maps/map1.json");
        this.load.spritesheet('botonStart','assets/sprites/botones/All-in-one.png', {frameWidth: 27, frameHeight: 10});

        //REY
        this.load.spritesheet('ReyEstatico','assets/sprites/KingHuman/Idle.png', {frameWidth: 78, frameHeight: 58});
        
        //puerquitos
        this.load.spritesheet('PuercoConCerillo','assets/sprites/PigWithaMatch/MatchOn.png', {frameWidth: 26, frameHeight: 18});
        this.load.spritesheet('PuercoRey','assets/sprites/KingPig/Idle.png', {frameWidth: 38, frameHeight: 28});
        this.load.spritesheet('PuercoBomba','assets/sprites/PigBomb/Idle.png', {frameWidth: 26, frameHeight: 26});
        this.load.spritesheet('PuercoCargandoCaja','assets/sprites/PigThrowingaBox/Idle.png', {frameWidth: 26, frameHeight: 30});
        this.load.spritesheet('cajaPig','assets/sprites/PigHideintheBox/LookingOut.png', {frameWidth: 26, frameHeight: 20});

        //Titulo, cajas, armas, dialogos
        this.load.image("title", "assets/sprites/KingsAndPigs.png"); 
        this.load.image("cannon", "assets/sprites/Cannon/Idle.png"); 
        this.load.image("caja", "assets/sprites/Box/Idle.png"); 
        this.load.image("puerta", "assets/sprites/Door/Idle.png");
        this.load.image("bomba", "assets/sprites/Bomb/bomb.png");
        this.load.spritesheet('DialAtaque','assets/sprites/DialogueBoxes/Out.png', {frameWidth: 24, frameHeight: 8});

        //musica
        this.load.audio("MusicBackground", "assets/music/MainMenu.wav");
        
        
    }

    create(){

        //musica
        this.MusicBackground = this.sound.add("MusicBackground", {loop: true});
        this.MusicBackground.volume = 0.1;
        this.MusicBackground.play();
        //mapa 
        const map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32}); //mapa
        
        //solidos
        const tileset = map.addTilesetImage("tiles1", "TILES1"); 
        const layer = map.createLayer("solidos", tileset, 0,0); 
        
        //decoraciones
        const tileset2 = map.addTilesetImage("tiles2", "TILES2"); 
        const layer2 = map.createLayer("decoraciones", tileset2, 0,0); 

        //rey
        this.rey = this.physics.add.sprite(150, 387, 'ReyEstatico', 0); 
        this.rey.scale = 2; //tamaño del personaje
        

        //Puerquitos
        this.puercoCerillo = this.physics.add.sprite(960, 303, 'PuercoConCerillo');
        this.puercoCerillo.scale = 2;
        this.puercoRey = this.physics.add.sprite(1100, 187, 'PuercoRey');
        this.puercoRey.scale = 2;
        this.puercoBomba = this.physics.add.sprite(650, 230, 'PuercoBomba');
        this.puercoBomba.scale = 2;
        this.cajaPig = this.physics.add.sprite(1290, 430, 'cajaPig');
        this.cajaPig.scale = 2;
        this.puercoConCaja = this.physics.add.sprite(800, 387, 'PuercoCargandoCaja');
        this.puercoConCaja.scale = 2;
        

        //Titulo, cañon, cajas, dialogos
        this.add.image(550,187, 'title').scale = 3;
        this.add.image(900,298, 'cannon').scale = 2;
        this.add.image(1100,249, 'caja').scale = 1.5;
        this.add.image(1120,249, 'caja').scale = 1.5;
        this.add.image(1100,225, 'caja').scale = 1.5;
        this.add.image(1150,390, 'puerta').scale = 2;
        this.add.image(1250,425, 'bomba').scale = 2;
        
        this.dialogoAtaque = this.add.sprite(1050, 210, 'DialAtaque');

        //boton start
        this.btnStart = this.add.sprite(550, 430, 'botonStart', 3).setInteractive(); //posicion e interactivo con el mouse
        this.btnStart.scale = 6;
        this.btnStart.on('pointerover', () => {
            this.btnStart.setFrame(4);
        });
        this.btnStart.on('pointerout', () => {
            this.btnStart.setFrame(3);
        });
        this.btnStart.on('pointerdown', () => {
            this.scene.start('Scene2');
        });

        //animaciones
        this.anims.create({
            key: 'KingEstatico',
            frames: this.anims.generateFrameNumbers('ReyEstatico', { start: 0, end: 10 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'cerillo',
            frames: this.anims.generateFrameNumbers('PuercoConCerillo', { start: 0, end: 2 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'KingPEstatico',
            frames: this.anims.generateFrameNumbers('PuercoRey', { start: 0, end: 11 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'DiAtaque',
            frames: this.anims.generateFrameNumbers('DialAtaque', { start: 0, end: 1 }),
            frameRate: 1
        });

        this.anims.create({
            key: 'PigAsomandose',
            frames: this.anims.generateFrameNumbers('cajaPig', { start: 0, end: 2 }),
            frameRate: 2
        });

        this.anims.create({
            key: 'CargandoBomba',
            frames: this.anims.generateFrameNumbers('PuercoBomba', { start: 0, end: 2 }),
            frameRate: 7
        });

        this.anims.create({
            key: 'CargandoCaja',
            frames: this.anims.generateFrameNumbers('PuercoCargandoCaja', { start: 0, end: 8 }),
            frameRate: 7
        });
        //colisiones
        layer.setCollisionByProperty({ solido: true});
        this.physics.add.collider(this.rey, layer);
    }

    update(){
        this.rey.anims.play('KingEstatico',true);
        this.puercoCerillo.anims.play('cerillo',true);
        this.puercoRey.anims.play('KingPEstatico',true);
        this.dialogoAtaque.anims.play('DiAtaque',true);
        this.cajaPig.anims.play('PigAsomandose',true);
        this.puercoBomba.anims.play('CargandoBomba',true);
        this.puercoConCaja.anims.play('CargandoCaja',true);
    }

}