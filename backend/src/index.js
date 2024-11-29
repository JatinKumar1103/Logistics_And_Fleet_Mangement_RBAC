import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';
import seedDatabase from './db/seed.js';

dotenv.config({
    path: './.env'
})

// seedDatabase().then(()=> {
//     console.log("Databse seeded successfully")
// }).catch((err) => {
//     console.log("Error occurred during seeding",err);
// })

connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at ${process.env.PORT}`);
    })   
})
.catch((err) => {
    console.log("MongoDB connection failed !!!", err)
})