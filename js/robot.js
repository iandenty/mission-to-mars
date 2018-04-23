class Robot {
  constructor(id, landingPosition, orientation, instructions) {
    this.id = id;
    this._position = landingPosition;
    this._orientation = this.constructor.orientationToDegrees(orientation);
    this.instructions = instructions;
    this._isLost = false;
  }

  get position() {
    return this._position;
  }

  set updatePosition(nextPosition) {
    this._position = nextPosition;
  }

  get orientation() {
    return this._orientation;
  }

  set orientation(nextPosition) {
    this._orientation = nextPosition;
  }

  get isLost() {
    return this._isLost;
  }

  set isLost(isLost) {
    this._isLost = isLost;
  }

  static orientationToDegrees(orientation){
    const lookup = {
      N: 0,
      E: 90,
      S: 180,
      W: -90
    };

    return lookup[orientation.toUpperCase()];
  }

  static nextOrientation(orientation, rotation) {
    // Reset North to 0
    return orientation + rotation === 360 || orientation + rotation === -360 ? 0 : orientation + rotation;
  }

  static nextPosition(position, orientation, distance=1, direction=1) {
    const movement = distance * direction;
    
    switch (Number(orientation)) {
      case 0: // North
        return [position[0], position[1] = position[1] + movement]; // (x, y + 1)
      case 360: // North
        return [position[0], position[1] = position[1] + movement]; // (x, y + 1)
      case 180: // South
        return [position[0], position[1] = position[1] - movement]; // (x, y - 1)
      case -180: // South
        return [position[0], position[1] = position[1] - movement]; // (x, y - 1)
      case 90: // East
        return [position[0] = position[0] + movement, position[1]]; // (x + 1, y)
      case -270: // East
        return [position[0] = position[0] + movement, position[1]]; // (x + 1, y)
      case -90: // West
        return [position[0] = position[0] - movement, position[1]]; // (x - 1, y)
      case 270: // West
        return [position[0] = position[0] - movement, position[1]]; // (x - 1, y)
    }
  }
};

// module.exports = Robot;
export default Robot;
