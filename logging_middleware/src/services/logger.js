const axios = require("axios");

const authConfig = require("../config/auth");

const validateLogInput = require("../utils/validateLog");

async function sendLog(
    stack,
    level,
    packageName,
    message
) {

    const isValid = validateLogInput(
        stack,
        level,
        packageName
    );

    if (!isValid) {

        console.log("Invalid log details");

        return;
    }

    try {

        const requestBody = {
            stack,
            level,
            package: packageName,
            message
        };

        const response = await axios.post(
            "http://20.244.56.144/evaluation-service/logs",
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${authConfig.accessToken}`
                }
            }
        );

        console.log("Log created successfully");

        return response.data;

    } catch (error) {

        console.log("Failed to send log");

    }
}

module.exports = sendLog;