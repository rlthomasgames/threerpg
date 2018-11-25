function Map()
{

}

Map.prototype.build=function(segW, segH, segDensity){
    this._segW = segW; //how many mini maps fit in the world map width wise
    this._segH = segH; //how many mini maps fit in the world map height wise
    this._segDensity = segDensity;//how many 'tiles' on the x and y of a segment
    this._localCenterPosition = {x:0,y:0};//essentially the local camera position center, from which most stuff will be defined
    this._worldCenter = {
        x:((this._segW*this._segDensity)*0.5),
        y:((this._segH*this._segDensity)*0.5)
    };
    this._worldMap = [];
    for(let i = 0; i < this._segW; i++)
    {
        this._worldMap.push([]);
        for(let j = 0; j < this._segH; j++)
        {
            this._worldMap[i].push([]);
            for(let x = 0; x < this._segDensity; x++)
            {
                this._worldMap[i][j].push([]);
                for(let y = 0; y < this._segDensity; y++)
                {
                    this._worldMap[i][j][x].push({tilName:'empty'});
                }
            }
        }
    }
    console.log('blank map == \n', this._worldMap);
};
