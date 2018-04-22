class Robot {
  constructor({id, landingPosition, orientation, instructions}) {
    this.id = id;
    this._position = landingPosition;
    this._orientation = this.constructor.orientationInDegrees(orientation);
    this.instructions = instructions;
  }

  set postion(nextPosition) {
    this._position = nextPosition;
  }

  get orientation() {
    return this._orientation;
  }

  set orientation(nextPosition) {
    this._orientation = nextPosition;
  }

  static orientationInDegrees(orientation){
    const lookup = {
      N: 0,
      E: 90,
      S: 180,
      W: 270
    };

    return lookup[orientation.toUpperCase()];
  }

  static nextOrientation(orientation, rotation) {
    // Reset North to 0
    return orientation + rotation === 360 ? 0 : orientation + rotation;
  }
};

module.exports = Robot;
