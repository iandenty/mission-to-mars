const Map = require('./js/map.js');
const Robot = require('./js/robot.js');

const missions = {
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

const missionsToMars = {
  init: function(extent, robots) {
    this.map = new Map(extent);
    this.robots = robots.map(robot => new Robot({...robot}));
    
    this.robots.forEach(robot => {
      this.landRobot([{[robot.id]: [[...robot.position]]}]);
    });

    this.robots.forEach(robot => {
      const instructions = robot.instructions.split('');
      instructions.forEach(instruction => this.instructRobot(robot, instruction.toUpperCase()));
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
    robot.position = nextPosition;
    
    this.updatePath(robot, nextPosition);
  },

  updatePath: function(robot, nextPosition) {
    const robotMission = [...this.map.missionPaths].filter(path => {
      const missionId = Number(Object.keys(path)[0]);
      return missionId === robot.id
    });

    const currentPath = robotMission[0][robot.id];
    this.map.mission = {[robot.id]: [...currentPath, [...robot.position]]};
  }
}

missionsToMars.init(missions.extent, missions.robots);

missionsToMars.robots.forEach(robot => {
  console.log(robot.position, robot.orientation);
});