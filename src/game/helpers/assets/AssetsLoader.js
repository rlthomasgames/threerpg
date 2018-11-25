function AssetsLoader()
{
  this.materials = {};
  this.complete = 0;
  this.meshes = {};
  this.colladaPaths = {};

  this.loadTextures = function(obj)
  {
    for(var i = 0; i < obj.textures.length; i++)
    {
      this.materials[obj.textures[i].name] = this.loadTexture(obj.textures[i]);
    }
  }

  this.loadTexture = function(obj)
  {
    let texture = THREE.ImageUtils.loadTexture(obj);
    return texture;
  };

  this.storeColladaPaths = function(obj)
  {
    for(var i = 0; i < obj.collada_models.length; i++)
    {
      console.log('storing collada path...', obj.collada_models[i]);
      this.colladaPaths[obj.collada_models[i].name] = obj.collada_models[i].path;
    }
  };

  this.getColladaPath = function(modelName)
  {
    return this.colladaPaths[modelName];
  };

  this.loadMeshes = function(obj)
  {
    var total = obj.simple_models.length;
    if(this.complete < total)
    {
      var loader = new THREE.JSONLoader( true );
      var name = ""+obj.simple_models[this.complete].name+"";
      var path = ""+obj.simple_models[this.complete].path+"";
      loader.load( path, function ( geometry )
      {
        var mesh = new THREE.Mesh( geometry, null);
        mesh.visible = true;
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;
        this.meshes[name] = mesh;//store them in our dictionary by name property;
        this.complete++;
        if(this.complete === total)
        {
          //assetsLoaded();
        }
        else
        {
          this.loadMeshes(obj);//load them one at a time!
        }
      });
    }
  };
}
