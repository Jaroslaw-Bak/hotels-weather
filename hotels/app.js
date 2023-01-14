const express = require('express');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors');
const Hotel = require('./model/hotelModel')
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);
const APIKEY = process.env.APIKEY



app.get('/', async (req, res) => {
	try {
		const random = Math.floor(Math.random() * 7);
		const hotel = await Hotel.findOne({id:random})
		const weather = await axios.get(
			`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${hotel.lat}&lon=${hotel.lon}&appid=${APIKEY}`
		);
		console.log(hotel)
		res.status(200).json({hotel, weather: weather.data})
	} catch(err) {
		console.log(err)
		res.status(500).json({message: err})
	}
})

app.post('/', async (req, res) => {
	try {
		const hotel = await Hotel.create(req.body)
		res.status(201).json(hotel)
	} catch(err) {
		res.status(500).json(err)
	}
})


async function dbConnect() {
	await mongoose.set('strictQuery', true).connect(DB);
	console.log('db connection successful');
}

dbConnect().catch((err) => console.log(err));

const PORT = process.env.PORT || 3005
app.listen(PORT, '127.0.0.1', () => {
	console.log('Serwer słucha... http://localhost:' + PORT);
});
