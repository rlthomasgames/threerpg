function AssetsLoader()
{
    this.materials = {};
    this.complete = 0;
    this.meshes = {};
    this.colladaPaths = {};
    this.colladaModels = {};
    this._loader = new THREE.ColladaLoader();
    this.loaded = false;
    this.toLoad = 0;
    this.loadedCollada = 0;

    this.loadTextures = function(obj)
    {
        for(var i = 0; i < obj.textures.length; i++)
        {
            this.materials[obj.textures[i].name] = this.loadTexture(obj.textures[i].path);
        }
    };

    this.loadTexture = function(obj)
    {
        let texture = THREE.ImageUtils.loadTexture(obj);
        return texture;
    };

    this.getTexture = function (name)
    {
        return this.materials[name];
    };

    this.getColladaModel = function(name)
    {
        return this.colladaModels[name].clone();
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
            var name = ''+obj.simple_models[this.complete].name+'';
            var path = ''+obj.simple_models[this.complete].path+'';
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

    this.storeColladaPaths = function(obj)
    {
        this.toLoad = obj.collada_models.length;
        for(var i = 0; i < obj.collada_models.length; i++)
        {
            this.colladaPaths[obj.collada_models[i].name] = obj.collada_models[i].path;
            this.storeColladaModels(obj.collada_models[i].path, obj.collada_models[i].name);
        }
    };

    this.storeColladaModels = function(path, name)
    {
        this._loader.load(path, function (collada) {
            this.colladaModels[name] = collada.scene.clone();
            this.loadedCollada++;
            if(this.loadedCollada == this.toLoad) {
                this.loaded = true;
            }
        }.bind(this));
    //done-ish
    };
}
