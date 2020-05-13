const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const PORT = process.env.port || 3000;
const knex = require('knex');
const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: '031899',
		database: 'smartbrain',
	},
});

const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const image = require('./controllers/image');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json(database.users);
});
app.get('/profile/:id', profile.handleProfile(db));
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
});
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
