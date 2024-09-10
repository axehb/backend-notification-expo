
require('dotenv').config(); //To access environmental variables in .env file
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
})
.then(() => {
    console.log("DB Connected");
})
.catch((err) => console.log(err));