const http = require('http');
const app = require('./express');
const { loadPlanetData } = require('./models/planets.models');
const mongoose = require('mongoose');
const server = http.createServer(app);

const PORT = process.env.PORT || 8000;
const MONGO_URL = 'mongodb+srv://rohitchavan724:Lumia%40532@cluster0.6bwnbht.mongodb.net/NASAdataBase?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
    console.log('Mongo DB Connected');
});

async function startServer() {
    try {
        await mongoose.connect(MONGO_URL, {
        });

        await loadPlanetData();

        server.listen(PORT, function (err) {
            if (err) {
                console.log('Server not working:', err);
            } else {
                console.log(`Server is Running on Port ${PORT}`);
            }
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

startServer();
