function CameraController(camera)
{
    this._camera = camera;
}

CameraController.prototype.update = function(delta, elevation)
{
    let radius = 24;
    this._camera.position.x = ((0)+(radius+6) * Math.cos(Math.PI/180 * (delta-90)));
    this._camera.position.z =((0)+(radius+6) * Math.sin(Math.PI/180 * (delta-90)));
    this._camera.position.y = elevation;
    this._camera.lookAt(new THREE.Vector3(0,0,0));
    /*
    let computedX = delta;
    let computedZ = delta;
    let computedY = elevation;
    this._camera.position.x = computedX;
    this._camera.position.z = computedZ;
    this._camera.position.y = computedY;
    */
}
