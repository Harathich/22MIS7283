async function sendLog(
    stack,
    level,
    packageName,
    message
) {

    const logObject = {
        timestamp: new Date().toISOString(),
        stack,
        level,
        package: packageName,
        message
    };

    console.log(
        JSON.stringify(logObject, null, 2)
    );

    return logObject;
}

module.exports = sendLog;