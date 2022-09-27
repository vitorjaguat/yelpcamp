const mongoose = require('mongoose');
const cidades = require('./cidades')
const { places, descriptors } = require('./seedHelpers-br')
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
    for(let i = 0; i < 401; i++){
        // const random1000 = Math.floor(Math.random() * 1000);
        const random5570 = Math.floor(Math.random() * 5570);
        const price = Math.floor(Math.random() * 20) + 10;
        const listaUF = {
          11: 'RO',
          12: 'AC',
          13: 'AM',
          14: 'RR',
          15: 'PA',
          16: 'AP',
          17: 'TO',
          21: 'MA',
          22: 'PI',
          23: 'CE',
          24: 'RN',
          25: 'PB',
          26: 'PE',
          27: 'AL',
          28: 'SE',
          29: 'BA',
          31: 'MG', 
          32: 'ES',
          33: 'RJ',
          35: 'SP',
          41: 'PR',
          42: 'SC',
          43: 'RS',
          50: 'MS',
          51: 'MT',
          52: 'GO',
          53: 'DF'
        };
        const camp = new Campground({ 
            author: '632258fd8d8c482a706a8c71',
            location: `${cidades[random5570].nome}, ${listaUF[cidades[random5570].codigo_uf]}`, title: `${sample(descriptors)} ${sample(places)}`, 
            geometry: {
              type: "Point",
              coordinates: [
                cidades[random5570].longitude,
                cidades[random5570].latitude
              ]
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium vero qui dolorum eius voluptate ipsam tenetur corporis, veniam, tempora quaerat voluptas ducimus? Necessitatibus molestias totam magnam officiis, dolorem quaerat debitis.',
            images: [
                {
                  url: 'https://res.cloudinary.com/dbru1wghw/image/upload/v1663615430/YelpCamp/s6jjk6vrpfj9qykxquui.jpg',
                  filename: 'YelpCamp/s6jjk6vrpfj9qykxquui'
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


