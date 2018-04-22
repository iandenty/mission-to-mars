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
};

module.exports = Map;
