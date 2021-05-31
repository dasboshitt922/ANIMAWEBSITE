const mongoose = require('mongoose');
const Manga = require('../models/mangas');
const mangas = require('./mangaseeds');
mongoose.connect('mongodb://localhost:27017/anima-db',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Mongo Database connected");
});


const seedDB = async()=>{
    await Manga.deleteMany({});
    for(let i = 0; i < mangas.manga.length; i++){
        const manga = new Manga({
            uploader:'60ace5eced42830f68d648f8',
            title:`${mangas.manga[i].title}`,
            author:`${mangas.manga[i].author}`,
            description:`${mangas.manga[i].description}`,
            genre: mangas.manga[i].genres,
            images: [
                {
                    url: 'https://res.cloudinary.com/db0i6uzat/image/upload/v1622186525/Anima/nagatoro_gus362.jpg',
                    filename: 'Anima/nagatoro_gus362'
                },
                {
                    url: 'https://res.cloudinary.com/db0i6uzat/image/upload/v1622186525/Anima/nagatoro_gus362.jpg',
                    filename: 'Anima/nagatoro_gus362'
                }
            ]          
        })
        await manga.save();      
    }
    console.log("Seeding Database Completed!")    
}

seedDB().then(()=>{
    mongoose.connection.close()
});