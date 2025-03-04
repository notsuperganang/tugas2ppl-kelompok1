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
  } else {
    console.log('\n=== MOVIE LIST ===');
    db.movies.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title} (${movie.year}) - Rating: ${movie.rating}/10`);
    });
  }
  showMainMenu();
}

function addMovie() {
  rl.question('\nMovie title: ', (title) => {
    if (!title.trim()) {
      console.log('\nTitle cannot be empty!');
      return showMainMenu();
    }
    rl.question('Release year: ', (year) => {
      rl.question('Rating (0-10): ', (rating) => {
        const db = readDatabase();
        db.movies.push({
          id: Date.now().toString(),
          title,
          year: parseInt(year) || 'Unknown',
          rating: parseFloat(rating) || 0
        });
        writeDatabase(db);
        console.log('\nMovie added!');
        showMainMenu();
      });
    });
  });
}

function viewSingleMovie() {
  const db = readDatabase();
  if (db.movies.length === 0) {
    console.log('\nNo movies found.');
    return showMainMenu();
  }
  db.movies.forEach((movie, index) => console.log(`${index + 1}. ${movie.title}`));
  rl.question('\nSelect movie number: ', (choice) => {
    const index = parseInt(choice) - 1;
    if (isNaN(index) || index < 0 || index >= db.movies.length) {
      console.log('\nInvalid selection!');
    } else {
      const movie = db.movies[index];
      console.log(`\nTitle: ${movie.title}\nYear: ${movie.year}\nRating: ${movie.rating}/10`);
    }
    showMainMenu();
  });
}

function updateMovie() {
  const db = readDatabase();
  if (db.movies.length === 0) return console.log('\nNo movies found.'), showMainMenu();
  
  db.movies.forEach((movie, index) => console.log(`${index + 1}. ${movie.title}`));
  rl.question('\nSelect movie number to update: ', (choice) => {
    const index = parseInt(choice) - 1;
    if (isNaN(index) || index < 0 || index >= db.movies.length) {
      console.log('\nInvalid selection!');
      return showMainMenu();
    }
    
    rl.question(`New title (${db.movies[index].title}): `, (title) => {
      db.movies[index].title = title.trim() || db.movies[index].title;
      writeDatabase(db);
      console.log('\nMovie updated!');
      showMainMenu();
    });
  });
}

function deleteMovie() {
  const db = readDatabase();
  if (db.movies.length === 0) return console.log('\nNo movies found.'), showMainMenu();
  
  db.movies.forEach((movie, index) => console.log(`${index + 1}. ${movie.title}`));
  rl.question('\nSelect movie number to delete: ', (choice) => {
    const index = parseInt(choice) - 1;
    if (isNaN(index) || index < 0 || index >= db.movies.length) {
      console.log('\nInvalid selection!');
    } else {
      db.movies.splice(index, 1);
      writeDatabase(db);
      console.log('\nMovie deleted!');
    }
    showMainMenu();
  });
}

function searchMovies() {
  rl.question('\nSearch term: ', (term) => {
    const db = readDatabase();
    const results = db.movies.filter(movie => movie.title.toLowerCase().includes(term.toLowerCase()));
    if (results.length === 0) console.log('\nNo movies found.');
    else results.forEach((movie, i) => console.log(`${i + 1}. ${movie.title} (${movie.year}) - Rating: ${movie.rating}/10`));
    showMainMenu();
  });
}

function showStatistics() {
  const db = readDatabase();
  if (db.movies.length === 0) return console.log('\nNo movies found.'), showMainMenu();

  const totalMovies = db.movies.length;
  const avgRating = (db.movies.reduce((sum, movie) => sum + (movie.rating || 0), 0) / totalMovies).toFixed(1);

  console.log(`\nTotal movies: ${totalMovies}`);
  console.log(`Average rating: ${avgRating}/10`);
  showMainMenu();
}

function showMainMenu() {
  console.log('\n1. View movies\n2. Add movie\n3. View details\n4. Update movie\n5. Delete movie\n6. Search movies\n7. Show statistics\n8. Exit');
  rl.question('\nChoose option: ', (choice) => {
    if (choice === '1') displayAllMovies();
    else if (choice === '2') addMovie();
    else if (choice === '3') viewSingleMovie();
    else if (choice === '4') updateMovie();
    else if (choice === '5') deleteMovie();
    else if (choice === '6') searchMovies();
    else if (choice === '7') showStatistics();
    else rl.close();
  });
}

console.log('\nWelcome to MovieBase!');
showMainMenu();