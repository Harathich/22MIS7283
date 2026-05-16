const optimizeVehicleSelection = require("../services/optimizerService");

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

        res.json({
            success: true,
            depots: mockDepots
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Unable to fetch depots"
        });

    }
}

async function getVehicles(req, res) {

    try {

        res.json({
            success: true,
            vehicles: mockVehicles
        });

    } catch (error) {

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

        const optimizedResult =
            optimizeVehicleSelection(
                mechanicHours,
                vehicles
            );

        res.json({
            success: true,
            data: optimizedResult
        });

    } catch (error) {

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