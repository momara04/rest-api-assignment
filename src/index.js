const express = require('express');
const { randomUUID } = require('crypto');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

// In-memory storage
const users = [];

// 1) Create a User
app.post('/users', (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  const newUser = { id: randomUUID(), name, email };
  users.push(newUser);
  return res.status(201).json(newUser);
});

// 2) Retrieve a User
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json(user); // default status 200
});

// 3) Update a User
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body || {};

  // validate input
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  // find user
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // update fields
  user.name = name;
  user.email = email;

  return res.json(user); // 200 OK
});

// 4) Delete a User
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1); // remove user from array
  return res.status(204).send(); // No Content
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing