class Map {
  constructor(extent) {
    this.extent = extent;
    this.missionPaths = [];
  }

  set mission(mission) {
    this.missionPaths = [...this.missionPaths, ...mission];
  } 
};

module.exports = Map;
