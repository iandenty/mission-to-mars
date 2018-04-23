class Map {
  constructor(extent) {
    this.extent = extent;
    this.missionPaths = [];
  }

  set mission(missionPath) {
    const missionPaths = [...this.missionPaths];
    const missionPathIndex = missionPaths.findIndex(path => Object.keys(path)[0] === Object.keys(missionPath)[0]);
    
    if(missionPathIndex !== -1){
      missionPaths[missionPathIndex] = missionPath;
      this.missionPaths = missionPaths;
    } else {
      this.missionPaths = [...missionPaths, ...missionPath];
    }
  }

  static isPointInBounds(point, extent) {
    const x = point[0];
    const y = point[1];

    const isXValid = x >= 0 && x <= extent[0];
    const isYValid = y >= 0 && y <= extent[1];

    return isXValid || isYValid;
  }
};

export default Map;
