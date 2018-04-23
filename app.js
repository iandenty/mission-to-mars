'use strict';

import Map from './js/map.js';
import Robot from './js/robot.js';

const missionsToMarsData = {
  extent: [5, 3],
  robots: [
    {
      id: 1,
      landingPosition: [1, 1],
      orientation: 'E',
      instructions: 'RFRFRFRF'
    },
    {
      id: 2,
      landingPosition: [3, 2],
      orientation: 'N',
      instructions: 'FRRFLLFFRRFLL'
    },
    {
      id: 3,
      landingPosition: [0, 3],
      orientation: 'W',
      instructions: 'LLFFFLFLFL'
    }
  ]
};

const missionsToMarsControl = {
  init: function(extent, robots) {
    this.map = new Map(extent);
    this.robots = robots.map(robot => new Robot(robot.id, robot.landingPosition, robot.orientation, robot.instructions));
    missionsToMarsView.init(document.getElementById('mars'));

    this.robots.forEach(robot => {
      this.validateRobotMove([...robot.position]);
      this.landRobot([{[robot.id]: [[...robot.position]]}]);

      missionsToMarsView.addRobotLanding(...robot.position);

      const instructions = robot.instructions.split('');
      instructions.forEach((instruction, index) => {
        this.instructRobot(robot, instruction.toUpperCase());
        if ((instructions.length - 1) === index) missionsToMarsView.drawPath();
      });
    });
  },

  landRobot: function(mission) {
    this.map.mission = mission;
  },

  instructRobot: function(robot, instruction) {
    if(instruction === 'L' || instruction === 'R') {
      this.rotateRobot(robot, instruction);
    } else if (instruction === 'F') {
      this.moveRobot(robot);
    }
  },

  rotateRobot: function(robot, direction) {
    const rotation = direction === 'R' ? 90: -90;

    robot.orientation = Robot.nextOrientation(robot.orientation, rotation);
  },

  moveRobot: function(robot) {
    const nextPosition = Robot.nextPosition(robot.position, robot.orientation);
    robot.updatePosition = nextPosition;
    
    const isInBounds = this.validateRobotMove(nextPosition);
    if(!isInBounds) robot.lost = !isInBounds;

    missionsToMarsView.addPathSegment(...robot.position);
    this.updatePath(robot, nextPosition);
  },

  validateRobotMove: function(position) {
    return Map.isPointInBounds(position, this.map.extent);
  },

  updatePath: function(robot, nextPosition) {
    const robotMission = [...this.map.missionPaths].filter(path => {
      const missionId = Number(Object.keys(path)[0]);
      return missionId === robot.id;
    });

    const currentPath = robotMission[0][robot.id];
    this.map.mission = {[robot.id]: [...currentPath, [...robot.position]]};
  }
}

const missionsToMarsView = {
  init: function(canvas) {
    this.ratio = 100;

    if(canvas.getContext) {
      this.ctx = canvas.getContext('2d');
      this.ctx.lineWidth = 10;
      this.ctx.lineJoin = "round";
      this.ctx.strokeStyle = "black";

      this.ctx.transform(1, 0, 0, -1, 0, canvas.height)
    }
  },

  addRobotLanding: function(x, y) {
    this.ctx.beginPath();
    this.ctx.moveTo(x * this.ratio, y * this.ratio);
  },

  addPathSegment: function(x, y) {
    this.ctx.lineTo(x * this.ratio, y * this.ratio);
  },

  drawPath: function() {
    this.ctx.stroke();
  }
};

missionsToMarsControl.init(missionsToMarsData.extent, missionsToMarsData.robots);

missionsToMarsControl.robots.forEach(robot => {
  console.log(`Final position: ${robot.position}, Final orientation: ${robot.orientation}`);
  if(robot.lost) console.log('LOST');
});
