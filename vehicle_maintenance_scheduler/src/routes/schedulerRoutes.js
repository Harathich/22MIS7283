const express = require("express");

const router = express.Router();

const {
    getDepots,
    getVehicles,
    optimizeSchedule
} = require("../controllers/schedulerController");

router.get("/depots", getDepots);

router.get("/vehicles", getVehicles);

router.post("/schedule", optimizeSchedule);

module.exports = router;