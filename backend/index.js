const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./users');
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and PostgresSQL API'});
});

app.get('/api/users', db.getUsers);
app.get('/api/users/:id', db.getUserById);
app.post('/api/users', db.createUser);
app.patch('/api/users/:id', db.updateUser);
app.delete('/api/users/:id', db.deleteUser);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});