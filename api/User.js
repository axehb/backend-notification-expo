const express = require('express');
const router = express.Router();

const User = require('./../models/User');
const bcrypt = require('bcrypt');


//setting up hand list for sign up and sign in
//Signup
router.post('/signup', (req, res) => {
//we take the input from the body of our request
    let {name, email, password} = req.body;
    //then we trim any white spaces
    name = name.trim();
    email = email.trim();
    password = password.trim();
    //dateofBirth = dateOfBirth.trim();

    //then we check if any of the variables are empty
    if (name == "" || email == "" || password == ""){
        //if so we return a json object which will have a status or a message, this format will be used
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        })
    }
    //check if it is regular expression for name
    else if (!/^[a-zA-Z ]*$/.test(name)){
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        }) 
    }
    //Then we check for regular expression for email
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        })
    } else {
        //we check if user exists already with help of our User model with mongoose, so we immport it as User above
        User.find({email}).then(result => {
            if(result.length){
                //A user already exists
                res.json({
                    status: "FAILED",
                    message: "User with the provided email already exists"
                })
            } else{
                //Try to store data for new user

                //password handling
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    //We can now create our User with this information, and remember we are using our User model created with mongoose
                    const newUser = new User({
                        name,
                        email,
                        password : hashedPassword
                    });

                    newUser.save().then(result => {
                        res.json({
                            status: "FAILED",
                            message: "Signup succesful", 
                            data: result,
                        })
                    })
                    .catch(err=>{
                        res.json({
                            status:"FAILED",
                            message: "An error ocurred while saving user!"
                        })
                    })

                })
                .catch(err => { //for functions that return promises we attach the catch block
                    res.json({
                        status:"FAILED",
                        message: "An error ocurred while hashing password!"
                    })
                })
            }
        }).catch(err => { //for functions that return promises we attach the catch block
            console.log(err);
            res.json({
                status:"FAILED",
                message: "An error ocurred while checking for existing user!"
            })
        })
    }


})

//Signin

router.post('/signin', (req, res) => {


})

module.exports = router;