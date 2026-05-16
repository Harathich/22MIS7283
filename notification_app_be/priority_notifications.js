const notifications = [
  {
    id: "1",
    type: "Placement",
    message: "Microsoft Hiring",
    timestamp: "2026-04-22T17:51:30"
  },
  {
    id: "2",
    type: "Result",
    message: "Mid Sem Results",
    timestamp: "2026-04-22T17:45:30"
  },
  {
    id: "3",
    type: "Event",
    message: "Hackathon Registration",
    timestamp: "2026-04-22T17:30:30"
  },
  {
    id: "4",
    type: "Placement",
    message: "Amazon Hiring",
    timestamp: "2026-04-22T17:20:30"
  },
  {
    id: "5",
    type: "Event",
    message: "Tech Fest",
    timestamp: "2026-04-22T17:10:30"
  }
];

function getPriorityWeight(type) {
  if (type === "Placement") return 3;
  if (type === "Result") return 2;
  return 1;
}

function calculateScore(notification) {
  const priorityWeight = getPriorityWeight(notification.type);

  const currentTime = new Date();
  const notificationTime = new Date(notification.timestamp);

  const minutesDifference =
    (currentTime - notificationTime) / (1000 * 60);

  const recencyScore = Math.max(0, 100 - minutesDifference);

  return priorityWeight * 100 + recencyScore;
}

function getTopNotifications(notificationList, limit = 10) {

  const scoredNotifications = notificationList.map(notification => {
    return {
      ...notification,
      score: calculateScore(notification)
    };
  });

  scoredNotifications.sort((a, b) => b.score - a.score);

  return scoredNotifications.slice(0, limit);
}

const topNotifications = getTopNotifications(notifications);

console.log("Top Priority Notifications:");

console.log(topNotifications);