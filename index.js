const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Book Management System API');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


const morgan = require('morgan');

// Use morgan for logging
app.use(morgan('dev'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


const books = [];

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.post('/api/books', (req, res) => {
    const book = req.body;
    books.push(book);
    res.status(201).json(book);
});

app.put('/api/books/:id', (req, res) => {
    const id = req.params.id;
    const book = req.body;
    books[id] = book;
    res.json(book);
});

app.delete('/api/books/:id', (req, res) => {
    const id = req.params.id;
    books.splice(id, 1);
    res.status(204).send();
});
