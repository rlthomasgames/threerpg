function GameView() {
    this._container = null;
    this._renderer = null;
    this._scene = null;
    this._camera = null;
    this._cameraController = null;

    this.deltaTest = 0;
}


GameView.prototype.init = function() {
    this._container = document.getElementById('mainContainer');
    this._container.style.width = window.innerWidth;
    this._container.style.height = window.innerHeight;

    this._renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
    this._renderer.setClearColor( 0x000000, 1 );
    this._renderer.setPixelRatio( window.devicePixelRatio );
    this._renderer.setSize( window.innerWidth, window.innerHeight );
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._container.appendChild(this._renderer.domElement);

    this._camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, this._horizonDistance );
    this._camera.position.y = 45;
    this._camera.position.z = 50;

    this._scene = new THREE.Scene();
    this._scene.fog = new THREE.Fog(0x000000, 55, 65);
    this._scene.add(this._camera);

    this._cameraController = new CameraController(this._camera);


    this.basicLights();
    this._camera.lookAt(new THREE.Vector3(0,0,0));
};

GameView.prototype.basicLights = function() {
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.8 );
    this._scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.55, 100 );
    directionalLight.position.set( 100, 500, 100 ).normalize();
    directionalLight.castShadow = true;
    //directionalLight.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 700, 1000 ) );
    directionalLight.shadow.mapSize.width = 1024;  // default
    directionalLight.shadow.mapSize.height = 1024; // default
    directionalLight.shadow.camera.near = 0.5;    // default
    directionalLight.shadow.camera.far = 300;     // default
    this._scene.add( directionalLight );

    //Create a helper for the shadow camera (optional)
    //var helper = new THREE.CameraHelper( directionalLight.shadow.camera );
    //this._scene.add( helper );

};

GameView.prototype.getScene = function() {
    return this._scene;
};

GameView.prototype.addObject = function(object) {
    this._scene.add(object);
};

GameView.prototype.render = function() {
    this.deltaTest+=1;
    this._cameraController.update(this.deltaTest/5, 44);
    this._renderer.render(this._scene, this._camera);
};
