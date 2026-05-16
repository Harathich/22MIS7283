const allowedStacks = [
    "backend",
    "frontend"
];

const allowedLevels = [
    "debug",
    "info",
    "warn",
    "error",
    "fatal"
];

const allowedPackages = [
    "cache",
    "controller",
    "cron_job",
    "db",
    "domain",
    "handler",
    "repository",
    "route",
    "service",
    "auth",
    "config",
    "middleware",
    "utils"
];

function validateLogInput(stack, level, packageName) {

    if (!allowedStacks.includes(stack)) {
        return false;
    }

    if (!allowedLevels.includes(level)) {
        return false;
    }

    if (!allowedPackages.includes(packageName)) {
        return false;
    }

    return true;
}

module.exports = validateLogInput;