class Map {
  constructor(extent) {
    this.extent = extent;
    this.missionPaths = [];
  }

  set mission(missionPath) {
    this.missionPaths = [...this.missionPaths, ...missionPath];
  } 
};

module.exports = Map;
