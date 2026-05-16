const optimizeVehicleSelection = require("../services/optimizerService");

const Log = require("../../../logging_middleware/src/services/logger");

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

        await Log(
            "backend",
            "info",
            "controller",
            "fetched depot data successfully"
        );

        res.json({
            success: true,
            depots: mockDepots
        });

    } catch (error) {

        await Log(
            "backend",
            "error",
            "controller",
            "failed to fetch depot data"
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch depots"
        });

    }
}

async function getVehicles(req, res) {

    try {

        await Log(
            "backend",
            "info",
            "controller",
            "fetched vehicle data successfully"
        );

        res.json({
            success: true,
            vehicles: mockVehicles
        });

    } catch (error) {

        await Log(
            "backend",
            "error",
            "controller",
            "failed to fetch vehicle data"
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch vehicles"
        });

    }
}

async function optimizeSchedule(req, res) {

    try {

        const { mechanicHours, vehicles } = req.body;

        await Log(
            "backend",
            "info",
            "service",
            "vehicle scheduling optimization started"
        );

        const optimizedResult =
            optimizeVehicleSelection(
                mechanicHours,
                vehicles
            );

        await Log(
            "backend",
            "info",
            "service",
            "vehicle scheduling optimization executed"
        );

        res.json({
            success: true,
            data: optimizedResult
        });

    } catch (error) {

        await Log(
            "backend",
            "fatal",
            "service",
            "vehicle scheduling optimization failed"
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