import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { create } from 'express-handlebars';
import mongoose from 'mongoose';
import Routes from './routes.js';

dotenv.config();
const app = express();
// SHAARRTT
const hbs = create({ defaultLayout: 'main', extname: 'hbs' });
// Set Handlebars as the view engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Routes);

const uri = process.env.MONGO_URL;
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});

// Start the server
const port = process.env.ENV_URL || 4001;
app.listen(port, () => {
	console.log('Server is running ');
});
