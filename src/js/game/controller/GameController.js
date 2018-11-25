/* eslint-disable no-console */

function GameController() {
    this._view = null;
}

//TODO : STRIP THIS FUCKER AND ADD POINTERS FOR MENUS - OR LEAVE FOR MECHANISMS BEFORE

GameController.prototype.init = function() {
    console.log('creating game controller....');

    //TODO: REQUIRED - actual server initiation first!, if not diverted to something less involved!

    //create view
    this._view = new GameView();
    this._view.init();

    //ASSETS
    this._assetsLoader = new AssetsLoader();

    this._model = null;

    this.assetsLoaded();

    var assetsList = fetchAssetsJSObject(); //TODO : objects should be fetch by a service this includes assets!
    this._assetsLoader.storeColladaPaths(assetsList);
    this._assetsLoader.loadTextures(assetsList);
    this._assetsLoader.loadMeshes(assetsList);


    //animating TODO - need to compensate for animated type collada soon! - add to assetsloader and descriptor, animated : -true or false
    //var animations = collada.animations;
    //mixer = new THREE.AnimationMixer( avatar );
    //var action = mixer.clipAction( animations[ 0 ] ).play();


    this.tick();
};

GameController.prototype.assetsLoaded = function()
{
    //TODO : ASSETS LOADER NEEDS TO INSPECT AND BE ABLE TO RECOGNISE WHEN COMPLETED A LOAD, STAGGERING IS BEST!, HMMMMM :/
    //TODO : LOTS TO CONSIDER, BEST POSSIBLE WAY, once again!
    //comment - lolz - yup here the proper start, initiate actual stuff here, perhaps perform a correct stagnatiated load before!
    if(this._assetsLoader.loaded)
    {
        let mapWidth = 32;
        let mapHeight = 32;
        let centerX = 16;//half of 32, making it centered
        let centerY = 16;//half of 32, making it centered
        let radius = 2.37;//radious of circle
        let HEX = false;//TODO: - remove hex is unnecessary with the local position location im implementing for scenery within a tiles space
        for(let j = 0; j < mapWidth; j++) {
            for (let i = 0; i < mapHeight; i++) {
                if(!(((i-centerX)*(i-centerX)) + ((j-centerY)*(j-centerY)) <= radius*radius)) {
                    let model = this._assetsLoader.getColladaModel('tree00');
                    //console.log(model.children[0]);
                    model.children[0].material.transparent = true;
                    model.children[1].material.alphaTest = 0.55;
                    model.children[1].material.side = THREE.DoubleSide;
                    model.children[1].material.shininess = 0;
                    //TO VIEW WIREFRAME, UN-COMMENT BELOW
                    /*
                    model.children[1].material.wireframe = true;
                    model.children[0].material = new THREE.MeshBasicMaterial({color:0xFFFFFF, wireframe:true});
                    model.children[0].material.map = null;
                    model.children[1].material.texture = null;
                    */
                    model.children[1].material = model.children[0].material.clone();
                    let yell = Math.random()*4;
                    model.children[1].material.color.r = yell;
                    //model.children[1].material.color.b = 0;
                    console.log('check..', model.children);
                    //TODO: - work out why light creating shadows isn't working for collada models
                    /*
                    model.children[1].castShadows = true;
                    model.children[1].receiveShadow = true;
                    model.traverse(function(child){
                        child.castShadows = true;
                        child.receiveShadow = true;
                    });
                    */
                    this._view.addObject(model);
                    let offsetX = 0;
                    //TODO: remove hexmap idea, not good!
                    if(HEX) {
                        if (j % 2 == 0) {
                            offsetX = 1.5;//makes trees appear to be hex, there seven sided so not hex anyway
                        }
                    }
                    model.position.x = ((Math.random()*1.5)-0.75) + ((3 * i) - 3*(mapWidth/2))+offsetX;
                    model.position.z = ((Math.random()*1.5)-0.75) +(3 * j) - 3*(mapWidth/2);
                    model.rotation.z = Math.random() * 12.5;
                    let randScale = (Math.random()*0.35)+0.8;
                    model.scale.set(1,1,randScale);
                }
            }
        }

        //TODO: make animated char
        let char = this._assetsLoader.getColladaModel('char00');
        char.castShadows = true;
        this._view.addObject(char);
        char.position.y = 0;
        console.log(char);
        char.scale.set(1.5,1.5,1.5);
        char.rotation.z = 3.13;
        this._model = char;

        let ground_geom = new THREE.PlaneGeometry(100,100,100,100);
        let ground_mat = new THREE.MeshStandardMaterial({color:0x66480c});
        let mesh = new THREE.Mesh(ground_geom, ground_mat);
        mesh.receiveShadow = true;
        mesh.rotation.x = THREE.Math.degToRad(-90);
        mesh.needsUpdate = true;
        this._view.addObject(mesh);

        //MAP TESTS!!!
        let map = new Map();
        map.build(4,4,32);
        console.log('map built == \n', map);

    }
    else
    {
        setTimeout(this.assetsLoaded.bind(this), 1000);
    }
};

GameController.prototype.destroy = function() {

};

GameController.prototype.tick = function() {

    requestAnimationFrame( this.tick.bind(this) );

    if(this._model) {
        this._model.rotation.z= -((THREE.Math.degToRad(this._view.deltaTest*0.2)));
    }

    this._view.render();
    //stats.update();
};
