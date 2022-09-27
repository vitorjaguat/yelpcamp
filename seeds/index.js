const mongoose = require('mongoose');
const cities = require('./cities');
// const cidades = require('./cidades')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});


////Generating random campground documents:
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({ 
            author: '632258fd8d8c482a706a8c71',
            location: `${cities[random1000].city}, ${cities[random1000].state}`, title: `${sample(descriptors)} ${sample(places)}`, 
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium vero qui dolorum eius voluptate ipsam tenetur corporis, veniam, tempora quaerat voluptas ducimus? Necessitatibus molestias totam magnam officiis, dolorem quaerat debitis.',
            images: [
                {
                  url: 'https://res.cloudinary.com/dbru1wghw/image/upload/v1663615430/YelpCamp/s6jjk6vrpfj9qykxquui.jpg',
                  filename: 'YelpCamp/s6jjk6vrpfj9qykxquui'
                },
                {
                  url: 'https://res.cloudinary.com/dbru1wghw/image/upload/v1663615430/YelpCamp/g36jpkmgxgpqfn5t7bwm.jpg',
                  filename: 'YelpCamp/g36jpkmgxgpqfn5t7bwm'
                },
                {
                  url: 'https://res.cloudinary.com/dbru1wghw/image/upload/v1663615430/YelpCamp/ujsacvjxnqoqju1m5sfh.jpg',
                  filename: 'YelpCamp/ujsacvjxnqoqju1m5sfh'
                },
                {
                  url: 'https://res.cloudinary.com/dbru1wghw/image/upload/v1663615430/YelpCamp/ouhwegwp7hht3olad7ez.jpg',
                  filename: 'YelpCamp/ouhwegwp7hht3olad7ez'
                },
                {
                  url: 'https://res.cloudinary.com/dbru1wghw/image/upload/v1663615431/YelpCamp/pfuzslk5m3ltd9tliyfe.jpg',
                  filename: 'YelpCamp/pfuzslk5m3ltd9tliyfe'
                }
              ], 
            price: price})
        await camp.save();
    };
}

/////Calling the function and closing connection afterwards (so we don`t have to write "Ctrl+c" everytime we execute "node seeds/index.js")
seedDB().then(() => {
    mongoose.connection.close();
});