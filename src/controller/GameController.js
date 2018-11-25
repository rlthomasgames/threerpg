/* eslint-disable no-console */
function GameController() {
  this._view = null;
}

GameController.prototype.init = function() {
  console.log('creating game controller....');

  //create view
  this._view = new GameView();
  this._view.init();

  //ASSETS
  this._assetsLoader = new AssetsLoader();

  var assetsList = fetchAssetsJSObject();
  this._assetsLoader.storeColladaPaths(assetsList);
  this._assetsLoader.loadTextures(assetsList);
  this._assetsLoader.loadMeshes(assetsList);

  // collada

  var loader = new THREE.ColladaLoader();
  loader.load( this._assetsLoader.getColladaPath('tree00'), function ( collada ) {
    console.log('loaded?');

    var animations = collada.animations;
    var avatar = collada.scene;
    /*
              mixer = new THREE.AnimationMixer( avatar );
              var action = mixer.clipAction( animations[ 0 ] ).play();
              */

    console.log('test', avatar);
    this._view.addObject(avatar);
    //this._view.getScene().add( avatar );

  }.bind(this) );

  this.tick();
};

GameController.prototype.destroy = function() {

};

GameController.prototype.tick = function() {

    requestAnimationFrame( this.tick.bind(this) );

    this._view.render();
    //stats.update();
};
