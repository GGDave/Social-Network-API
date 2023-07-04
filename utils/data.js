const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Grace',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];

const thoughtsDescriptions = [
  "Embrace the journey and try to get better every day. Don't lose the passion and the love for what you do.",
  "Believe you can and you’re halfway there.",
  "Don’t wait for the perfect moment, take the moment and make it perfect.",
  "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.",
  "Start each day with a positive thought and a grateful heart.",
  "Every day may not be good, but there is something good in every day.",
  "The only difference between a good day and a bad day is your attitude.",
  "Don’t count the days, make the days count.",
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
  "Your time is limited, don’t waste it living someone else’s life.",
  "Challenges are what make life interesting. Overcoming them is what makes life meaningful.",
  "Believe in yourself, take on your challenges, dig deep within yourself to conquer fears. Never let anyone bring you down. You got this.",
  "A little progress each day adds up to big results.",
  "Believe you can and you’re halfway there.",
  "It does not matter how slowly you go, as long as you do not stop.",
  "It always seems impossible until it's done.",
  "You are never too old to set another goal or to dream a new dream.",
  "Life is what happens when you're busy making other plans.",
  "You are never too old to set another goal or to dream a new dream.",
  "Stay patient and trust your journey.",
];

const possibleTags = [
  'html',
  'css',
  'javascript',
  'typescript',
  'go',
  'cpp',
  'python',
  'rust',
  'React',
  'React Native',
  'NextJS',
  'Tailwind',
  'Vue',
  'mongodb',
  'sql',
];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random applications that we can add to the database. Includes application tags.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      published: Math.random() < 0.5,
      description: getRandomArrItem(thoughtsDescriptions),
      buildSuccess: Math.random() < 0.5,
      tags: [...getThoughtsTags(3)],
    });
  }
  return results;
};

// Create the tags that will be added to each application
const getThoughtsTags = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleTags);
  }
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      tagBody: getRandomArrItem(possibleTags),
      username: getRandomName(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts};
