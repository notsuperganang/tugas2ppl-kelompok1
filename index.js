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

function viewSingleMovie() {
  const db = readDatabase();
  if (db.movies.length === 0) {
    console.log('\nNo movies found.');
    showMainMenu();
    return;
  }
  db.movies.forEach((movie, index) => console.log(`${index + 1}. ${movie.title}`));
  
  rl.question('\nSelect movie number: ', (choice) => {
    const index = parseInt(choice) - 1;
    if (db.movies[index]) {
      console.log(`\nTitle: ${db.movies[index].title}`);
      console.log(`Year: ${db.movies[index].year}`);
    } else console.log('\nInvalid selection!');
    showMainMenu();
  });
}

function updateMovie() {
  const db = readDatabase();
  if (db.movies.length === 0) return console.log('\nNo movies found.'), showMainMenu();
  
  db.movies.forEach((movie, index) => console.log(`${index + 1}. ${movie.title}`));
  rl.question('\nSelect movie number to update: ', (choice) => {
    const index = parseInt(choice) - 1;
    if (db.movies[index]) {
      rl.question(`New title (${db.movies[index].title}): `, (title) => {
        db.movies[index].title = title || db.movies[index].title;
        writeDatabase(db);
        console.log('\nMovie updated!');
        showMainMenu();
      });
    } else console.log('\nInvalid selection!'), showMainMenu();
  });
}

function deleteMovie() {
  const db = readDatabase();
  if (db.movies.length === 0) return console.log('\nNo movies found.'), showMainMenu();
  
  db.movies.forEach((movie, index) => console.log(`${index + 1}. ${movie.title}`));
  rl.question('\nSelect movie number to delete: ', (choice) => {
    const index = parseInt(choice) - 1;
    if (db.movies[index]) {
      db.movies.splice(index, 1);
      writeDatabase(db);
      console.log('\nMovie deleted!');
    } else console.log('\nInvalid selection!');
    showMainMenu();
  });
}

function showMainMenu() {
  console.log('\n1. View movies\n2. Add movie\n3. View details\n4. Update movie\n5. Delete movie\n6. Exit');
  rl.question('\nChoose option: ', (choice) => {
    if (choice === '1') displayAllMovies();
    else if (choice === '2') addMovie();
    else if (choice === '3') viewSingleMovie();
    else if (choice === '4') updateMovie();
    else if (choice === '5') deleteMovie();
    else rl.close();
  });
}
