const { getAllLaunches, scheduleNewLaunch, existLaunchwithId,abortLaunchByID } = require('../../models/launches.models')

async function httpGetAllLaunches(req, res) {

    return res.status(200).json(await getAllLaunches())
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body
    launch, launchDate = new Date(launch.launchDate)
    if (!launch.mission || !launch.rocket || !launch.target) {
        return res.status(400).json({
            error: 'Missing Required Property'
        })
    }
    await scheduleNewLaunch(launch)
    return res.status(201).json(launch)
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    if (!existLaunchwithId(launchId)) {
        return res.status(404).json({
            error: 'Launch not found'
        })
    }
    const aborted = abortLaunchByID(launchId)
    res.status(200).json(aborted)


}



module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,

}
