const mongoose = require('mongoose');

const connection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection Successfull");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
module.exports=connection;