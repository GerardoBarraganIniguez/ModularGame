import Scene1 from "./scenes/scene1.js";
import Scene2 from "./scenes/scene2.js";

const config = {
    type: Phaser.AUTO,
    width: innerWidth,
    height: innerHeight,
    pixelArt: true, //no perder calidad
    
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },

    scale: {
       mode: Phaser.Scale.FIT,
    },
    
    
    scene: [Scene1,Scene2]
};

const game = new Phaser.Game(config);