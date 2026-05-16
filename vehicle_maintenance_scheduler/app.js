const express = require("express");

const schedulerRoutes = require("./src/routes/schedulerRoutes");

const app = express();

app.use(express.json());

app.use("/api", schedulerRoutes);

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Vehicle scheduler service running"
    });

});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});