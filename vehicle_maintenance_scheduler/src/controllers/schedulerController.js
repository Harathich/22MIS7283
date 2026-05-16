const optimizeVehicleSelection = require("../services/optimizerService");

const sendLog = require("../../../logging_middleware/src/services/logger");

const mockDepots = [
    {
        ID: 1,
        MechanicHours: 60
    },
    {
        ID: 2,
        MechanicHours: 120
    }
];

const mockVehicles = [
    {
        TaskID: "T1",
        Duration: 5,
        Impact: 10
    },
    {
        TaskID: "T2",
        Duration: 4,
        Impact: 7
    },
    {
        TaskID: "T3",
        Duration: 6,
        Impact: 12
    },
    {
        TaskID: "T4",
        Duration: 3,
        Impact: 5
    }
];

async function getDepots(req, res) {

    try {

        await sendLog(
            "backend",
            "info",
            "controller",
            "Fetching depot details"
        );

        res.json({
            success: true,
            depots: mockDepots
        });

    } catch (error) {

        await sendLog(
            "backend",
            "error",
            "controller",
            "Depot fetch failed"
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch depots"
        });

    }
}

async function getVehicles(req, res) {

    try {

        await sendLog(
            "backend",
            "info",
            "controller",
            "Fetching vehicle task details"
        );

        res.json({
            success: true,
            vehicles: mockVehicles
        });

    } catch (error) {

        await sendLog(
            "backend",
            "error",
            "controller",
            "Vehicle fetch failed"
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch vehicles"
        });

    }
}

async function optimizeSchedule(req, res) {

    try {

        const {
            mechanicHours,
            vehicles
        } = req.body;

        await sendLog(
            "backend",
            "info",
            "service",
            "Starting vehicle optimization"
        );

        const optimizedResult =
            optimizeVehicleSelection(
                mechanicHours,
                vehicles
            );

        await sendLog(
            "backend",
            "info",
            "service",
            "Optimization completed successfully"
        );

        res.json({
            success: true,
            data: optimizedResult
        });

    } catch (error) {

        await sendLog(
            "backend",
            "fatal",
            "service",
            "Vehicle optimization failed"
        );

        res.status(500).json({
            success: false,
            message: "Optimization failed"
        });

    }
}

module.exports = {
    getDepots,
    getVehicles,
    optimizeSchedule
};