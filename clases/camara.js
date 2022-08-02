export default class Camara {
    constructor(scene,map, rey){
        this.scene = scene;
        this.map = map;
        this.rey = rey;

        this.create();
    }

    create(){
        //this.scene.cameras.main.setZoom(1.5);
        this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.scene.cameras.main.startFollow(this.rey);
    }

}