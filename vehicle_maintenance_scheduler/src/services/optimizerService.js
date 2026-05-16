function optimizeVehicleSelection(
    mechanicHours,
    vehicles
) {

    const totalVehicles = vehicles.length;

    const dp = Array(totalVehicles + 1)
        .fill(null)
        .map(() =>
            Array(mechanicHours + 1).fill(0)
        );

    for (let i = 1; i <= totalVehicles; i++) {

        const currentVehicle = vehicles[i - 1];

        const duration = currentVehicle.Duration;

        const impact = currentVehicle.Impact;

        for (
            let hours = 0;
            hours <= mechanicHours;
            hours++
        ) {

            if (duration <= hours) {

                dp[i][hours] = Math.max(
                    impact + dp[i - 1][hours - duration],
                    dp[i - 1][hours]
                );

            } else {

                dp[i][hours] = dp[i - 1][hours];

            }
        }
    }

    let remainingHours = mechanicHours;

    const selectedVehicles = [];

    for (
        let i = totalVehicles;
        i > 0;
        i--
    ) {

        if (
            dp[i][remainingHours] !==
            dp[i - 1][remainingHours]
        ) {

            selectedVehicles.push(
                vehicles[i - 1]
            );

            remainingHours -=
                vehicles[i - 1].Duration;
        }
    }

    return {
        totalImpact:
            dp[totalVehicles][mechanicHours],
        selectedVehicles
    };
}

module.exports = optimizeVehicleSelection;