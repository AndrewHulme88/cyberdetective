const logs = [
  { timestamp: '2024-05-27T08:15:00', user: 'admin', action: 'login' },
  { timestamp: '2024-05-27T08:17:00', user: 'user1', action: 'login' },
  { timestamp: '2024-05-27T08:20:00', user: 'user2', action: 'login' },
  { timestamp: '2024-05-27T08:22:00', user: 'hacker', action: 'login' },
  { timestamp: '2024-05-27T08:25:00', user: 'admin', action: 'logout' },
  { timestamp: '2024-05-27T08:27:00', user: 'user1', action: 'logout' },
  { timestamp: '2024-05-27T08:30:00', user: 'user2', action: 'logout' },
  { timestamp: '2024-05-27T08:35:00', user: 'hacker', action: 'logout' }
];

function analyzeLogs() {
  console.log("Analyzing logs for suspicious activity...");
  const loginCounts = {};
  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];
    if (log.action === 'login') {
      if (!loginCounts[log.user]) {
        loginCounts[log.user] = 1;
      } else {
        loginCounts[log.user]++;
      }
    }
  }
  for (const user in loginCounts) {
    if (loginCounts[user] > 1) {
      console.log(`Suspicious activity detected for user ${user}.`);
    }
  }
}

analyzeLogs();
