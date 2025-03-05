// index.js
const fs = require('fs');
const readline = require('readline');

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Database file path
const DB_FILE = './database.json';

// Ensure database file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ movies: [] }, null, 2));
}

// Function to read database
function readDatabase() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error.message);
    return { movies: [] };
  }
}

// Function to write to database
function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to database:', error.message);
    return false;
  }
}

// Function to display all movies
function displayAllMovies() {
  const db = readDatabase();
  
  if (db.movies.length === 0) {
    console.log('\nThere are no movies in the database yet.');
    return;
  }
  
  console.log('\n=== MOVIE LIST ===');
  db.movies.forEach((movie, index) => {
    console.log(`${index + 1}. ${movie.title} (${movie.year})`);
    console.log(`   Director: ${movie.director}`);
    console.log(`   Genre: ${movie.genre}`);
    console.log(`   Rating: ${movie.rating}/10`);
    console.log('------------------------------');
  });
}

// Function to add a new movie
function addMovie() {
  rl.question('\nEnter movie title: ', (title) => {
    rl.question('Enter release year: ', (year) => {
      rl.question('Enter director name: ', (director) => {
        rl.question('Enter genre: ', (genre) => {
          rl.question('Enter rating (0-10): ', (rating) => {
            const db = readDatabase();
            
            // Add new movie
            db.movies.push({
              id: Date.now().toString(),
              title,
              year: parseInt(year),
              director,
              genre,
              rating: parseFloat(rating)
            });
            
            if (writeDatabase(db)) {
              console.log('\nMovie added successfully!');
            }
            
            showMainMenu();
          });
        });
      });
    });
  });
}

// Function to view a single movie
function viewSingleMovie() {
  const db = readDatabase();
  
  if (db.movies.length === 0) {
    console.log('\nThere are no movies in the database yet.');
    showMainMenu();
    return;
  }
  
  console.log('\n=== SELECT A MOVIE ===');
  db.movies.forEach((movie, index) => {
    console.log(`${index + 1}. ${movie.title} (${movie.year})`);
  });
  
  rl.question('\nEnter movie number to view details: ', (choice) => {
    const index = parseInt(choice) - 1;
    
    if (isNaN(index) || index < 0 || index >= db.movies.length) {
      console.log('\nInvalid selection! Please try again.');
    } else {
      const movie = db.movies[index];
      console.log('\n=== MOVIE DETAILS ===');
      console.log(`Title: ${movie.title}`);
      console.log(`Year: ${movie.year}`);
      console.log(`Director: ${movie.director}`);
      console.log(`Genre: ${movie.genre}`);
      console.log(`Rating: ${movie.rating}/10`);
    }
    
    showMainMenu();
  });
}

// Function to update a movie
function updateMovie() {
  const db = readDatabase();
  
  if (db.movies.length === 0) {
    console.log('\nThere are no movies in the database yet.');
    showMainMenu();
    return;
  }
  
  console.log('\n=== SELECT A MOVIE TO UPDATE ===');
  db.movies.forEach((movie, index) => {
    console.log(`${index + 1}. ${movie.title} (${movie.year})`);
  });
  
  rl.question('\nEnter movie number to update: ', (choice) => {
    const index = parseInt(choice) - 1;
    
    if (isNaN(index) || index < 0 || index >= db.movies.length) {
      console.log('\nInvalid selection! Please try again.');
      showMainMenu();
      return;
    }
    
    const movie = db.movies[index];
    
    rl.question(`\nEnter new title (${movie.title}): `, (title) => {
      rl.question(`Enter new release year (${movie.year}): `, (year) => {
        rl.question(`Enter new director (${movie.director}): `, (director) => {
          rl.question(`Enter new genre (${movie.genre}): `, (genre) => {
            rl.question(`Enter new rating (${movie.rating}): `, (rating) => {
              // Update movie with new values or keep old ones if empty
              db.movies[index] = {
                id: movie.id,
                title: title.trim() || movie.title,
                year: parseInt(year) || movie.year,
                director: director.trim() || movie.director,
                genre: genre.trim() || movie.genre,
                rating: parseFloat(rating) || movie.rating
              };
              
              if (writeDatabase(db)) {
                console.log('\nMovie updated successfully!');
              }
              
              showMainMenu();
            });
          });
        });
      });
    });
  });
}

// Function to delete a movie
function deleteMovie() {
  const db = readDatabase();
  
  if (db.movies.length === 0) {
    console.log('\nThere are no movies in the database yet.');
    showMainMenu();
    return;
  }
  
  console.log('\n=== SELECT A MOVIE TO DELETE ===');
  db.movies.forEach((movie, index) => {
    console.log(`${index + 1}. ${movie.title} (${movie.year})`);
  });
  
  rl.question('\nEnter movie number to delete: ', (choice) => {
    const index = parseInt(choice) - 1;
    
    if (isNaN(index) || index < 0 || index >= db.movies.length) {
      console.log('\nInvalid selection! Please try again.');
      showMainMenu();
      return;
    }
    
    const movie = db.movies[index];
    
    rl.question(`\nAre you sure you want to delete "${movie.title}"? (y/n): `, (confirm) => {
      if (confirm.toLowerCase() === 'y') {
        db.movies.splice(index, 1);
        
        if (writeDatabase(db)) {
          console.log('\nMovie deleted successfully!');
        }
      } else {
        console.log('\nDeletion cancelled.');
      }
      
      showMainMenu();
    });
  });
}

// Function to search movies
function searchMovies() {
  rl.question('\nEnter search term: ', (term) => {
    const db = readDatabase();
    const searchTerm = term.toLowerCase();
    
    const results = db.movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.director.toLowerCase().includes(searchTerm) ||
      movie.genre.toLowerCase().includes(searchTerm)
    );
    
    if (results.length === 0) {
      console.log(`\nNo movies found matching "${term}".`);
    } else {
      console.log(`\n=== SEARCH RESULTS FOR "${term}" ===`);
      results.forEach((movie, index) => {
        console.log(`${index + 1}. ${movie.title} (${movie.year})`);
        console.log(`   Director: ${movie.director}`);
        console.log(`   Genre: ${movie.genre}`);
        console.log(`   Rating: ${movie.rating}/10`);
        console.log('------------------------------');
      });
    }
    
    showMainMenu();
  });
}

// Function to show statistics
function showStatistics() {
  const db = readDatabase();
  
  if (db.movies.length === 0) {
    console.log('\nThere are no movies in the database yet.');
    showMainMenu();
    return;
  }
  
  // Calculate statistics
  const totalMovies = db.movies.length;
  const avgRating = db.movies.reduce((sum, movie) => sum + movie.rating, 0) / totalMovies;
  
  // Group by genre
  const genreCount = {};
  db.movies.forEach(movie => {
    genreCount[movie.genre] = (genreCount[movie.genre] || 0) + 1;
  });
  
  // Find highest rated movie
  let highestRated = db.movies[0];
  db.movies.forEach(movie => {
    if (movie.rating > highestRated.rating) {
      highestRated = movie;
    }
  });
  
  console.log('\n=== DATABASE STATISTICS ===');
  console.log(`Total movies: ${totalMovies}`);
  console.log(`Average rating: ${avgRating.toFixed(1)}`);
  console.log('\nMovies by genre:');
  Object.entries(genreCount).forEach(([genre, count]) => {
    console.log(`  ${genre}: ${count}`);
  });
  console.log(`\nHighest rated movie: ${highestRated.title} (${highestRated.rating}/10)`);
  
  showMainMenu();
}

// Main menu function
function showMainMenu() {
  console.log('\n=== MOVIEBASE ===');
  console.log('Select an option:');
  console.log('1. View all movies');
  console.log('2. Add a new movie');
  console.log('3. View movie details');
  console.log('4. Update a movie');
  console.log('5. Delete a movie');
  console.log('6. Search movies');
  console.log('7. Show statistics');
  console.log('8. Exit');
  
  rl.question('\nEnter option number: ', (choice) => {
    switch (choice) {
      case '1':
        displayAllMovies();
        showMainMenu();
        break;
      case '2':
        addMovie();
        break;
      case '3':
        viewSingleMovie();
        break;
      case '4':
        updateMovie();
        break;
      case '5':
        deleteMovie();
        break;
      case '6':
        searchMovies();
        break;
      case '7':
        showStatistics();
        break;
      case '8':
        console.log('\nThank you for using MovieBase! Goodbye.');
        rl.close();
        break;
      default:
        console.log('\nInvalid option! Please try again.');
        showMainMenu();
    }
  });
}

// Start application
console.log('\nWelcome to MovieBase - Your Personal Movie Database');
showMainMenu();
