import mongoose from "mongoose";



const connecteDB = async() => {
    mongoose.connection.on('connected', () => {
        console.log('Mongodb connected');
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/food`)
}

export default connecteDB;