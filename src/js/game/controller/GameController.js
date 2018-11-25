/* eslint-disable no-console */

function GameController() {
    this._view = null;
}

//TODO : STRIP THIS FUCKER AND ADD POINTERS FOR MENUS - OR LEAVE FOR MECHANISMS BEFORE

GameController.prototype.init = function() {
    console.log('creating game controller....');

    //TODO: REQUIRED - actual server initiation first!, if not diverted to something less involved!
    this._playerObject = {
        name: 'Rhys',
        worldTileX: 0,
        worldTileY: 0
    };

    //create view
    this._view = new GameView();
    this._view.init(this._playerObject);

    //ASSETS
    this._assetsLoader = new AssetsLoader();

    this._model = null;

    this.assetsLoaded();

    var assetsList = fetchAssetsJSObject(); //TODO : objects should be fetch by a service this includes assets!
    this._assetsLoader.storeColladaPaths(assetsList);
    this._assetsLoader.loadTextures(assetsList);
    this._assetsLoader.loadMeshes(assetsList);

    this._map = null;


    //animating TODO - need to compensate for animated type collada soon! - add to assetsloader and descriptor, animated : -true or false
    //var animations = collada.animations;
    //mixer = new THREE.AnimationMixer( avatar );
    //var action = mixer.clipAction( animations[ 0 ] ).play();


    this.tick();
};

GameController.prototype.assetsLoaded = function()
{

    //MAP TESTS!!!
    let map = new Map();
    map.build(4,4,32);
    console.log('map built == \n', map);
    this._map = map;

    //TODO : ASSETS LOADER NEEDS TO INSPECT AND BE ABLE TO RECOGNISE WHEN COMPLETED A LOAD, STAGGERING IS BEST!, HMMMMM :/
    //TODO : LOTS TO CONSIDER, BEST POSSIBLE WAY, once again!
    //comment - lolz - yup here the proper start, initiate actual stuff here, perhaps perform a correct stagnatiated load before!
    if(this._assetsLoader.loaded)
    {
        let localMap = this._map.getLocalMap(0,0);
        let mapWidth = localMap.length;
        let mapHeight = localMap[0].length;
        for(let i = 0; i < localMap.length; i++)
        {
            for(let j = 0; j < localMap[i].length; j++)
            {
                let tile = localMap[i][j];
                if(tile.tileContents)
                {
                    let sceneryObjects = tile.tileContents.sceneryObjects;
                    if(sceneryObjects && sceneryObjects.length > 0)
                    {
                        for(let k = 0; k < sceneryObjects.length; k++)
                        {
                            let sceneryObject = sceneryObjects[k];
                            if(sceneryObject.type == 'tree00')
                            {
                                let model = this._assetsLoader.getColladaModel('tree00');
                                //console.log(model.children[0]);
                                model.children[0].material.transparent = true;
                                model.children[1].material.alphaTest = 0.55;
                                model.children[1].material.side = THREE.DoubleSide;
                                model.children[1].material.shininess = 0;
                                model.children[1].material = model.children[0].material.clone();
                                let yell = Math.random()*4;
                                model.children[1].material.color.r = yell;
                                this._view.addObject(model);
                                model.position.x = ((Math.random()*1.5)-0.75) + ((3 * i) - 3*(mapWidth/2));
                                model.position.z = ((Math.random()*1.5)-0.75) +(3 * j) - 3*(mapHeight/2);
                                model.rotation.z = Math.random() * 12.5;
                                let randScale = (Math.random()*0.35)+0.8;
                                model.scale.set(1,1,randScale);
                            }
                        }
                    }
                }
                console.log(tile);
            }
        }
        /*
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
        */

    }
    else
    {
        setTimeout(this.assetsLoaded.bind(this), 1000);
    }
};

GameController.prototype.processMap = function() {

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
