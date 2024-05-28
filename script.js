const readline = require('readline');

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

const suspects = [
  { name: 'admin', motive: 'Has access to sensitive data' },
  { name: 'user1', motive: 'Has a history of suspicious activity' },
  { name: 'user2', motive: 'Has been acting strangely around the office' },
  { name: 'hacker', motive: 'Unknown entity with malicious intent' }
];

const clues = [
  { description: 'A suspicious login from an unknown IP address', pointsTo: 'hacker' },
  { description: 'A large amount of data was transferred to a personal device', pointsTo: 'user1' },
  { description: 'A login attempt with an incorrect password', pointsTo: 'user2' }
];

const gameState = {
  currentTask: 'investigateLogs',
  logs: logs,
  suspects: suspects,
  clues: clues,
  score: 0
};

const choices = {
  investigateLogs: {
    description: 'Investigate the logs to find suspicious activity.',
    options: ['Investigate logs', 'Ignore logs', 'Search for specific log entries'],
    nextTask: 'analyzeLogs'
  },
  analyzeLogs: {
    description: 'Analyze the logs to identify potential suspects.',
    options: ['Analyze logs', 'Skip analysis', 'Look for patterns in the logs'],
    nextTask: 'followLeads'
  },
  followLeads: {
    description: 'Follow leads to gather more information about the suspects.',
    options: ['Follow leads', 'Ignore leads', 'Go back to analyzing logs'],
    nextTask: 'crackPassword'
  },
  crackPassword: {
    description: 'Crack the password to access a suspect\'s computer.',
    options: ['Crack password', 'Skip cracking', 'Try to guess the password'],
    nextTask: 'decodeMessage'
  },
  decodeMessage: {
    description: 'Decode a cryptic message to uncover a hidden clue.',
    options: ['Decode message', 'Ignore message', 'Look for a hidden key'],
    nextTask: 'confrontSuspect'
  },
  confrontSuspect: {
    description: 'Confront the suspect and gather evidence.',
    options: ['Confront suspect', 'Let suspect go', 'Gather more evidence before confronting'],
    nextTask: 'winGame'
  }
};

function playGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askQuestion(question) {
    return new Promise(resolve => {
      rl.question(question, answer => {
        resolve(answer);
      });
    });
  }

  async function gameLoop() {
    while (true) {
      const currentTask = gameState.currentTask;
      console.log(`\nCurrent Task: ${choices[currentTask].description}\n`);
      console.log('Options:');
      for (let i = 0; i < choices[currentTask].options.length; i++) {
        console.log(`${i + 1}. ${choices[currentTask].options[i]}`);
      }
      let choice;
      while (true) {
        try {
          choice = await askQuestion('What do you want to do? (type the number of your chosen action) ');
          choice = parseInt(choice);
          if (isNaN(choice) || choice < 1 || choice > choices[currentTask].options.length) {
            throw new Error('Invalid choice. Please try again.');
          }
          break;
        } catch (error) {
          console.log(error.message);
        }
      }
      const chosenOption = choices[currentTask].options[choice - 1];
      if (currentTask === 'investigateLogs') {
        if (chosenOption === 'Investigate logs') {
          console.log('You find some suspicious activity in the logs...');
          console.log('It looks like someone logged in from an unknown IP address.');
          gameState.score += 10;
          gameState.currentTask = choices[currentTask].nextTask;
        } else if (chosenOption === 'Search for specific log entries') {
          console.log('You search for specific log entries...');
          console.log('You find a log entry that suggests a suspect has been trying to cover their tracks.');
          gameState.score += 20;
          gameState.currentTask = choices[currentTask].nextTask;
        } else {
          console.log('You ignore the logs and move on.');
          gameState.currentTask = choices[currentTask].nextTask;
        }
      } else if (currentTask === 'analyzeLogs') {
        if (chosenOption === 'Analyze logs') {
          console.log('You analyze the logs and find some interesting information...');
          console.log('It looks like one of the suspects has been acting strangely around the office.');
          gameState.score += 30;
          gameState.currentTask = choices[currentTask].nextTask;
        } else if (chosenOption === 'Look for patterns in the logs') {
          console.log('You look for patterns in the logs...');
          console.log('You find a pattern that suggests a suspect has been trying to hack into the system.');
          gameState.score += 40;
          gameState.currentTask = choices[currentTask].nextTask;
        } else {
          console.log('You skip the analysis and move on.');
          gameState.currentTask = choices[currentTask].nextTask;
        }
      } else if (currentTask === 'followLeads') {
        if (chosenOption === 'Follow leads') {
          console.log('You follow the leads and gather more information about the suspects...');
          console.log('It looks like one of the suspects has a history of suspicious activity.');
          gameState.score += 50;
          gameState.currentTask = choices[currentTask].nextTask;
        } else if (chosenOption === 'Go back to analyzing logs') {
          console.log('You go back to analyzing logs...');
          console.log('You find some new information that helps you identify a suspect.');
          gameState.score += 60;
          gameState.currentTask = choices[currentTask].nextTask;
        } else {
          console.log('You ignore the leads and move on.');
          gameState.currentTask = choices[currentTask].nextTask;
        }
      } else if (currentTask === 'crackPassword') {
        if (chosenOption === 'Crack password') {
          console.log('You crack the password and gain access to the suspect\'s computer...');
          console.log('It looks like you found some incriminating evidence.');
          gameState.score += 70;
          gameState.currentTask = choices[currentTask].nextTask;
        } else if (chosenOption === 'Try to guess the password') {
          console.log('You try to guess the password...');
          console.log('You guess the password correctly and gain access to the suspect\'s computer.');
          gameState.score += 80;
          gameState.currentTask = choices[currentTask].nextTask;
        } else {
          console.log('You skip cracking the password and move on.');
          gameState.currentTask = choices[currentTask].nextTask;
        }
      } else if (currentTask === 'decodeMessage') {
        if (chosenOption === 'Decode message') {
          console.log('You decode the message and uncover a hidden clue...');
          console.log('It looks like you found the culprit!');
          gameState.score += 90;
          gameState.currentTask = choices[currentTask].nextTask;
        } else if (chosenOption === 'Look for a hidden key') {
          console.log('You look for a hidden key...');
          console.log('You find a hidden key that helps you decode the message.');
          gameState.score += 100;
          gameState.currentTask = choices[currentTask].nextTask;
        } else {
          console.log('You ignore the message and move on.');
          gameState.currentTask = choices[currentTask].nextTask;
        }
      } else if (currentTask === 'confrontSuspect') {
        if (chosenOption === 'Confront suspect') {
          console.log('You confront the suspect and gather evidence...');
          console.log(' Congratulations, you won the game!');
          console.log(`Final Score: ${gameState.score}`);
          process.exit(0);
        } else if (chosenOption === 'Gather more evidence before confronting') {
          console.log('You gather more evidence before confronting the suspect...');
          console.log('You find some new evidence that helps you build a stronger case against the suspect.');
          gameState.score += 110;
          gameState.currentTask = choices[currentTask].nextTask;
        } else {
          console.log('You let the suspect go and end the game.');
          console.log(`Final Score: ${gameState.score}`);
          process.exit(0);
        }
      }
    }
  }

  gameLoop();
}

playGame();
