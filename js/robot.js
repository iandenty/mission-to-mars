class Robot {
  constructor({id, landingPosition, orientation, instructions}) {
    this.id = id;
    this.position = landingPosition;
    this.orientation = orientation;
    this.instructions = instructions;
  }
};

module.exports = Robot;
