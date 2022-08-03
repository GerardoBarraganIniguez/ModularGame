import Rey from "../clases/rey.js";
import PigGroup from "../clases/pigGroup.js";
import InfoBoxGroup from "../clases/infoBoxGroup.js";

export default class Scene2 extends Phaser.Scene {
    constructor(){
        super({key: 'Scene2'});
    }

    
    
    preload(){
        //mapa
        this.load.tilemapTiledJSON('map2',"assets/maps/map2.json");
        this.load.image("TILES1", "assets/maps/TileSets/Terrain.png"); 
        //REY
        this.load.spritesheet('Rey','assets/sprites/KingHuman/Idle.png', {frameWidth: 78, frameHeight: 58});
        this.load.spritesheet('ReyC','assets/sprites/KingHuman/Run.png', {frameWidth: 78, frameHeight: 58});
        this.load.spritesheet('ReyA','assets/sprites/KingHuman/Attack.png', {frameWidth: 78, frameHeight: 58});
        //puerquitos
        this.load.spritesheet('Pig','assets/sprites/Pig/Idle.png', {frameWidth: 34, frameHeight: 28});
        this.load.spritesheet('PigM','assets/sprites/Pig/Dead.png', {frameWidth: 34, frameHeight: 28});
        this.load.spritesheet('PigG','assets/sprites/Pig/Hit.png', {frameWidth: 34, frameHeight: 28});
        //infoBox
        this.load.image("infoBoxIdle", "assets/sprites/Box/Idle.png"); 
        this.load.image("infoBox1", "assets/sprites/Box/boxPiece1.png"); 
        this.load.image("infoBox2", "assets/sprites/Box/boxPiece2.png"); 
        this.load.image("infoBox3", "assets/sprites/Box/boxPiece3.png"); 
        this.load.image("infoBox4", "assets/sprites/Box/boxPiece4.png"); 
        this.load.image("infoBoxHit", "assets/sprites/Box/Hit.png"); 
    }

    create(){
        //mapa
        const map2 = this.make.tilemap({ key: "map2", tileWidth: 32, tileHeight: 32});
        //solidos
        const tileset = map2.addTilesetImage("Terrain", "TILES1"); 
        const layer = map2.createLayer("solidos", tileset, 0,0); 
        
        //rey
        this.rey = new Rey(this, 150, 400, 'Rey'); 

        //Pigs
        this.pigGroup = new PigGroup(this.physics.world, this);
        this.pigGroup.crearPig(200,200);
        this.pigGroup.crearPig(300,200);
        this.pigGroup.crearPig(400,200);

        //infoBox
        this.infoBoxGroup = new InfoBoxGroup(this.physics.world,this);
        this.infoBoxGroup.crearBox(100,200);
        this.infoBoxGroup.crearBox(500,200);
        this.infoBoxGroup.crearBox(2000,200);
 
        //colisiones rey
        layer.setCollisionByProperty({ solido: true});
        this.physics.add.collider(this.rey, layer);

        this.physics.add.collider(this.pigGroup,layer);

        this.physics.add.overlap(this.rey, this.pigGroup, this.hitKing, null, this);
        this.physics.add.overlap(this.rey.mazoHitbox, this.pigGroup, this.hitPig, null, this);
        this.physics.add.overlap(this.rey.mazoHitbox, this.infoBoxGroup, this.hitInfoBox, null, this);
        
        //colision infoBox
        this.physics.add.collider(this.infoBoxGroup,layer);


        //camara
        this.cameras.main.setBounds(0, 0, map2.widthInPixels, map2.heightInPixels);
        this.cameras.main.startFollow(this.rey);
        //this.cameras.main.setBackgroundColor('#ccccff');      
    }

    update(){
        this.rey.update();
    }

    
    hitInfoBox(mazo,infoBox){
        //puntos centrales de la camara para poder mostrar el texto en pantalla
        const { x, y } = this.cameras.main.midPoint;
        infoBox.anims.play('destroyingInfoBox');
        //esperar un segundo y despues destruye la cajita
        this.time.addEvent({callback: () => {infoBox.destroy()}, delay: 1000, callbackScope: this, loop: true});
        this.textoPrueba = this.add.text(x-500, y-300, 'Se desplegará información a cerca del tema actual, este texto solo es una prueba para mostrar como se vería la información traida de la base de datos aquí en el juego ya no se que mas poner lorem ipsum ',{font: "25px", color: 'white', stroke: '#000', strokeThickness: 3});
        this.textoPrueba.setWordWrapWidth(1000, true);
    }

    hitKing(rey,pig){
        if(rey.body.touching.right) {
            //rey.x = rey.x - 10;
            pig.x += 10;
            pig.y -= 10;   
        }
        /*if(rey.body.touching.left) {
            rey.x = rey.x - 10;
            pig.x = pig.x + 10;   
        }*/
        
    }
    registrar_puntos(){
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", "/juego/conexiones/registrar_puntos.php");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({tipo:"Normal", puntos:"100"}));
    }
    hitPig(mazo,pig){
        pig.hitsToDie--;
        pig.anims.play('PigGolpeado');
        
        if (pig.hitsToDie == 0) {
            this.rey.enemigosEliminados++;
            this.registrar_puntos()
            pig.hitsToDie=-1;
            pig.anims.playAfterRepeat('PigMuriendo');
            //esperar un segundo y despues destruye el puerquito
            this.time.addEvent({callback: () => {pig.destroy()}, delay: 1000, callbackScope: this, loop: true});
            console.log("murio");
        }
        else{
            if (pig.hitsToDie>0){
                pig.anims.playAfterRepeat('PigEstatico');
                console.log('No murio');
            }
        }
    }
}