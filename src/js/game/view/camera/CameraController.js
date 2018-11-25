function CameraController(camera)
{
    this._camera = camera;
}

CameraController.prototype.update = function(delta, elevation, player, directionalLight)
{
    let radius = 24;
    this._camera.position.x =0+ ((0)+(radius+6) * Math.cos(Math.PI/180 * (delta-90)));
    this._camera.position.z =0+ ((0)+(radius+6) * Math.sin(Math.PI/180 * (delta-90)));
    this._camera.position.y = elevation;
    this._camera.lookAt(new THREE.Vector3(player.worldTileX,0,player.worldTileY));
    //directionalLight.lookAt(new THREE.Vector3(0,0,0));
    //directionalLight.position.y = Math.random()*1;
    //directionalLight.position.z = Math.random()*1;
    console.log(directionalLight);
    /*
    directionalLight.position.x = this._camera.x*0.05;
    directionalLight.position.y = this._camera.y*0.05;
    directionalLight.position.z = this._camera.z*0.25;
    directionalLight.lookAt(new THREE.Vector3(0,0,0));
    */
    //directionalLight.position.set(this._camera.position);
    /*
    let computedX = delta;
    let computedZ = delta;
    let computedY = elevation;
    this._camera.position.x = computedX;
    this._camera.position.z = computedZ;
    this._camera.position.y = computedY;
    */
}
