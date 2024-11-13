const express = require('express');
const router = express.Router();

let books = []; // Temporary in-memory storage

// Get all books
router.get('/', (req, res) => {
    res.json(books);
});

// Add a new book
router.post('/', (req, res) => {
    const book = req.body;
    books.push(book);
    res.status(201).json(book);
});

// Get a book by ID
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) res.json(book);
    else res.status(404).json({ error: 'Book not found' });
});

// Update a book by ID
router.put('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        Object.assign(book, req.body);
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Delete a book by ID
router.delete('/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index !== -1) {
        books.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

module.exports = router;
