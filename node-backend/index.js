const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

app.use(express.static(path.join(__dirname,'..', 'public')));
app.use('/bootstrap', express.static(path.join(__dirname,'..', 'bootstrap'), {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
    secret: 'start',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'arizpe',
    password: 'arizpe123',
    database: 'nodelogin'
});

db.connect(error => {
    if (error) throw error;
    console.log("MySQL Connected...")
});

app.post('/register', (req, res) => {
    const { username, password, email, name, lastname } = req.body;

    // Validate inputs
    if (!username || !password || !email || !name || !lastname) {
        return res.status(400).send('Please provide all required fields');
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    // Start a MySQL transaction
    db.beginTransaction(err => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).send('Transaction start failed');
        }

        // Insert into person table
        db.query('INSERT INTO person (name, last_name) VALUES (?, ?)', [name, lastname], (err, result) => {
            if (err) {
                db.rollback(() => {
                    console.error('Error inserting into person table:', err);
                    return res.status(500).send('Error inserting into person table');
                });
            }

            // Retrieve the last inserted id (person_id)
            const personId = result.insertId;

            // Insert into accounts table with retrieved person_id
            db.query('INSERT INTO accounts (username, password, email, person) VALUES (?, ?, ?, ?)', [username, hashedPassword, email, personId], (err, result) => {
                if (err) {
                    db.rollback(() => {
                        console.error('Error inserting into accounts table:', err);
                        return res.status(500).send('Error inserting into accounts table');
                    });
                }

                // Commit the transaction if all queries succeed
                db.commit(err => {
                    if (err) {
                        db.rollback(() => {
                            console.error('Transaction commit failed:', err);
                            return res.status(500).send('Transaction commit failed');
                        });
                    }
                    res.send('User registered successfully');
                });
            });
        });
    });
});




app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Please provide username and password');
    }

    const sqlQuery = 'SELECT * FROM accounts WHERE username = ?';
    db.query(sqlQuery, [username], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            return res.status(500).send('Server error');
        }

        if (results.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = results[0];
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid password');
        }

        // Set session variables
        req.session.user = user.id;
        req.session.username = user.username;

        // Redirect to index.html upon successful login
        res.sendFile(path.join(__dirname, '..', 'index.html'));
        app.use(express.static(path.join(__dirname, '..', '..', 'WEB-APPS')));

    });
});


// Routes
// Register route

app.post('/register', (req, res) => {
    // Copy the corrected register route handler here
});

// Login route
app.post('/login', (req, res) => {
    // Copy the corrected login route handler here
});

// Serve static files
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});



// Redirect to login page if accessing root
app.get('/', (req, res) => {
    res.redirect('/login');
});

const PORT = process.env.PORT || 80; // Default to port 3000 if PORT environment variable is not set

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

