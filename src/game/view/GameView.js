function GameView() {
  this._container = null;
  this._renderer = null;
  this._scene = null;
  this._camera = null;
}


GameView.prototype.init = function() {
  this._container = document.getElementById('mainContainer');
  this._container.style.width = window.innerWidth;
  this._container.style.height = window.innerHeight;

  this._renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
  this._renderer.setClearColor( 0xff0000, 0 );
  this._renderer.setPixelRatio( window.devicePixelRatio );
  this._renderer.setSize( window.innerWidth, window.innerHeight );
  this._container.appendChild(this._renderer.domElement);

  this._camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, this._horizonDistance );
  this._camera.position.y = 20;
  this._camera.position.z = 20;
  this._camera.lookAt(new THREE.Vector3(0,0,0));

  this._scene = new THREE.Scene();
  this._scene.add(this._camera);

  this.basicLights();
};

GameView.prototype.basicLights = function() {
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
    this._scene.add( ambientLight );
}

GameView.prototype.getScene = function() {
  return this._scene;
};

GameView.prototype.addObject = function(object) {
  this._scene.add(object);
};

GameView.prototype.render = function() {
  this._renderer.render(this._scene, this._camera);
};
