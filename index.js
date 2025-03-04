const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const DB_FILE = './database.json';

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ movies: [] }, null, 2));
}

function readDatabase() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDatabase(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function displayAllMovies() {
  const db = readDatabase();
  if (db.movies.length === 0) {
    console.log('\nNo movies found.');
    return;
  }
  console.log('\n=== MOVIE LIST ===');
  db.movies.forEach((movie, index) => {
    console.log(`${index + 1}. ${movie.title} (${movie.year})`);
  });
}

function addMovie() {
  rl.question('\nMovie title: ', (title) => {
    rl.question('Release year: ', (year) => {
      const db = readDatabase();
      db.movies.push({ title, year: parseInt(year) });
      writeDatabase(db);
      console.log('\nMovie added!');
      showMainMenu();
    });
  });
}

function showMainMenu() {
  console.log('\n1. View movies\n2. Add movie\n3. Exit');
  rl.question('\nChoose option: ', (choice) => {
    if (choice === '1') displayAllMovies();
    else if (choice === '2') addMovie();
    else rl.close();
  });
}

console.log('\nWelcome to MovieBase!');
showMainMenu();
