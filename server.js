//mongodb
require('./config/db');

//create server using express
const app = require('express')();
const port = 3000;

//we direct our application to use the router we just created
const UserRouter = require('./api/User');

//For accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user', UserRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})