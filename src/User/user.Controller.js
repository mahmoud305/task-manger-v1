const userModel = require("./user.Model");
const https = require("https");
const { StatusCodes } = require('http-status-codes');
const localStorage = require("../../common/localStorage");
const passport = require("passport");
const e = require("express");
const bcrypt = require('bcrypt');
var errors = [];
var signinPageFlag = true;
var user = null;
const setErrors = function (newErrors) { errors = newErrors };



const signUp = async(req, res) => {
    // console.log(req.body);
    const { fname, lname, email, password } = req.body;
    const fullName = fname + " " + lname;
    try {
        const user = await userModel.findOne({ email });
        
        if (user) {
            return res.status(StatusCodes.BAD_REQUEST).send('Email Already Exists');
        }
        const hash = bcrypt.hashSync(password, 7);
        const newUser = new userModel({ name: fullName, email, password:hash });
        newUser.save();
        console.log("user added successfully");
        signinPageFlag=true;
        res.status(StatusCodes.CREATED).redirect("/");
    } catch (error) {
        errors.length = 0;
        errors.push(error);
        console.log("error in adding new user \n" + error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/");
    }
}

const signInFail = (req, res) => {
    errors.length = 0;
    errors.push("email or password is incorrect");
    return res.status(StatusCodes.BAD_REQUEST).redirect("/");
}
 


const signOut = (req, res) => {

    try {
        req.logout(function (err) {
            if (err) {
                console.log("error in logging Out \n" + error);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/");
            } else {
                res.redirect("/");
            }
        })
    } catch (error) {
        console.log("error in logging Out \n" + error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/");

    }

}

const getInitialPage = async (req, res) => {
    let data = ''; // to get the quotes

    try {
        https.get("https://type.fit/api/quotes", (response) => {
            response.on('data', (d) => {
                data = data + d;
                
            });
            response.on('end', () => {
                data = JSON.parse(data);
                let index = Math.floor(Math.random() * data.length);
                console.log(errors);
                if (errors.length)
                    res.status(StatusCodes.BAD_REQUEST).render("home.ejs", { quote: "qoutes not alawys available ", isSignIn: signinPageFlag, errors: errors });
                else
                    res.status(StatusCodes.OK).render("home.ejs", { quote: data[index], isSignIn: signinPageFlag, errors: errors });
            })
            response.on("error",(er)=>{
                console.log("error in quotes rendering\n"+er);
                res.status(StatusCodes.BAD_REQUEST).render("home.ejs", { quote: "qoutes not alawys available ", isSignIn: signinPageFlag, errors: er });


            })

        });
    } catch (error) {
        console.log("error in Home Page \n" + error);
    }

}
const toggleSign = (req, res) => {

    const { flag } = req.body;
    if (flag == "signin") {
        signinPageFlag = true;
    } else {
        signinPageFlag = false;
    }
    res.redirect("/");
}

const getHome = (req, res) => {
    
        res.render("homePage.ejs");
   

}
module.exports = { signInFail, signOut, signUp, toggleSign, getInitialPage, setErrors, getHome }

// const signIn = (req, res) => {
//     console.log(req.body);
//     const { email, password } = req.body;
//     try {
//         const isFound = userModel.find({ email, password })
//             .then((response) => {
//                 if (response.length) {
//                     const {_id,email}= response[0];
//                     console.log(_id+" "+email);
//                     localStorage.setItem("user",{_id,email});
//                     res.redirect("/list");
//                 } else {
//                     errors.length = 0;
//                     errors.push("email or password is incorrect");
//                     res.status(StatusCodes.BAD_REQUEST).redirect("/");
//                 }
//             })
//     } catch (error) {
//         console.log("error in logging user \n" + error);
//     }
// }

// const signUp = (req, res) => {
//     console.log(req.body);
//     const { fname, lname, email, password } = req.body;
//     const fullName = fname + " " + lname;
//     const newUser = new userModel({ name: fullName, email, password });
//     try {
//         newUser.save();
//         console.log("user added successfully");
//     } catch (error) {
//         errors.length = 0;
//         errors.push(error);
//         console.log("error in adding new user \n" + error);
//     }
//     res.status(StatusCodes.OK).redirect("/");
// }