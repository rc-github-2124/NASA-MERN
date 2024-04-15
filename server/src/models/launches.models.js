// launches.models.js
const launchModel = require('./launches.mongo')
const launches = new Map();
const planets = require('./planets.mongo');

const defaultFlightNumber = 100;
// let latestFlightNumber = 100;

async function getLatestFlightNumber(){

  const latestLaunch = await launchModel.findOne().sort('-flightNumber');

if(!latestLaunch){
  return defaultFlightNumber;
}
  return latestLaunch.flightNumber;
}
  

async function getAllLaunches() {
  return await launchModel.find({}, { '_id': 0, '__v': 0 })
}


async function scheduleNewLaunch(launch){
const newFlightNumber = await getLatestFlightNumber() + 1;
const newLaunch = Object.assign({
  customer: ['ZTM', 'NASA'],
      upcoming: true,
      success: true,
      flightNumber:newFlightNumber
});
await saveAllLaunches(newLaunch)
}

// function addNewLaunch(launch) {
//   latestFlightNumber++;
//   const newLaunch = Object.assign({}, launch, {
//     customer: ['ZTM', 'NASA'],
//     upcoming: true,
//     success: true,
//     flightNumber: latestFlightNumber,
//   });

//   launches.set(latestFlightNumber, newLaunch);
// }

// Initial launch
const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};
saveAllLaunches(launch)
function existLaunchwithId(launchId) {
  return launches.has(launchId)
}
function abortLaunchByID(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

// launches.set(launch.flightNumber, launch);
async function saveAllLaunches(launch) {
  const planet = await planets.findOne({
    kepler_name: launch.target
  });
  console.log(planet)
  if (!planet) {
    throw new Error('No matching Planet was Found');
  }
  await launchModel.updateOne({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  })
}

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchwithId,
  abortLaunchByID
};
