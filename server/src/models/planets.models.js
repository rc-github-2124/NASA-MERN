const fs = require('fs');
const path = require('path')
const { parse } = require('csv-parse');
const planets = require('./planets.mongo');


function isHabitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}
async function savePlanet(planet){
  try{
    await planets.updateOne({
        kepler_name:planet.kepler_name
      },{kepler_name:planet.kepler_name},{
        upsert:true
      }
      );
  }catch(err){
    console.log('Error while Saving in DB',err)
  }
}
function loadPlanetData(){
    return new Promise((resolve,reject)=>{
        fs.createReadStream(path.join(__dirname,'..','..','data','kepler.csv'))
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', async (data) => {
        if (isHabitable(data)) {
            savePlanet(data);
        
        }
    })
    .on('error', (err) => {
        console.log('error', err);
        reject(err)
    })
    .on('end', async () => {
        const countPlanetsFound = (await getAllPlanets()).length
 
        console.log('done');
        console.log(`${countPlanetsFound} habitable planet found`)
        resolve();
    });
    })
}

async function getAllPlanets(){
    return await planets.find({})
}

    module.exports={
        loadPlanetData,
       getAllPlanets
    }