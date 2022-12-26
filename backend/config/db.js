const mongose = require('mongoose');

exports.connectDB = async function() {
    try {
        const conn = await mongose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    }
    catch(error){
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1)
    }
}