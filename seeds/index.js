if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
// mongoose.connect('mongodb://localhost:27017/yelp-camp', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '60908df59659653d64e744b5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dsveume0w/image/upload/v1619923334/YelpCamp/nwmg66wl3ulzoqjk7q1e.jpg',
                  filename: 'YelpCamp/nwmg66wl3ulzoqjk7q1e'
                },
                {
                  url: 'https://res.cloudinary.com/dsveume0w/image/upload/v1619923334/YelpCamp/prkomh0u6i4kyoopixqo.jpg',
                  filename: 'YelpCamp/prkomh0u6i4kyoopixqo'
                },
                {
                  url: 'https://res.cloudinary.com/dsveume0w/image/upload/v1619923334/YelpCamp/ea8hyhfqrcpfxuxolmzz.jpg',
                  filename: 'YelpCamp/ea8hyhfqrcpfxuxolmzz'
                },
                {
                  url: 'https://res.cloudinary.com/dsveume0w/image/upload/v1619923334/YelpCamp/z52lzh7rmdhuee7h1yhy.jpg',
                  filename: 'YelpCamp/z52lzh7rmdhuee7h1yhy'
                },
                {
                  url: 'https://res.cloudinary.com/dsveume0w/image/upload/v1619923334/YelpCamp/cyvm6zipc6izifuoofe0.jpg',
                  filename: 'YelpCamp/cyvm6zipc6izifuoofe0'
                },
                {
                  url: 'https://res.cloudinary.com/dsveume0w/image/upload/v1619923334/YelpCamp/xbre5eftok2z8clntynz.jpg',
                  filename: 'YelpCamp/xbre5eftok2z8clntynz'
                },
                {
                  url: 'https://res.cloudinary.com/dsveume0w/image/upload/v1619923334/YelpCamp/bxj6rwuoxnevlq7yjn1w.jpg',
                  filename: 'YelpCamp/bxj6rwuoxnevlq7yjn1w'
                }
              ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Malesuada fames ac turpis egestas integer eget aliquet nibh. Nisi porta lorem mollis aliquam ut porttitor. Dignissim sodales ut eu sem integer vitae justo eget magna. Euismod lacinia at quis risus sed. Mi quis hendrerit dolor magna eget est lorem. Urna condimentum mattis pellentesque id nibh. Amet aliquam id diam maecenas ultricies mi eget mauris pharetra. Feugiat nisl pretium fusce id velit ut tortor.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})