const userModel = require("./user.Model");
const https = require("https");
const { StatusCodes } = require('http-status-codes');
const localStorage = require("../../common/localStorage");
const passport = require("passport");
const e = require("express");
const bcrypt = require('bcrypt');
const sendEmail = require("../../common/SendEmail");
const { log } = require("console");
var errors = [];
var signinPageFlag = true;
var user = null;
const setErrors = function (newErrors) { errors = newErrors };



const signUp = async (req, res) => {
    // console.log(req.body);
    const { fname, lname, email, password } = req.body;
    const fullName = fname + " " + lname;
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(req.protocol+"://"+req.get('host'));
    try {
        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(StatusCodes.BAD_REQUEST).send('Email Already Exists');
        }
        const hash = bcrypt.hashSync(password, 7);
        const newUser = new userModel({ name: fullName, email, password: hash });
        newUser.save();
        console.log("user added successfully");
        signinPageFlag = true;
        // sending verification Here
         sendEmail([email],{fullUrl,email});
        const filePat= __dirname + "../../public/verfyEmail.html";
        console.log(fullUrl);
        // res.sendFile(__dirname + "../../public/verfyEmail.html");
        res.render("verfyEmail.ejs");
        // res.status(StatusCodes.CREATED).redirect("/");
    } catch (error) {
        errors.length = 0;
        errors.push(error);
        console.log("error in adding new user \n" + error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/");
    }
}
const verifyEmail = async(req,res)=>{
    const { userEmail }= req.params;
    console.log(req.params);
    console.log(userEmail);
    try {
        const result = await userModel.findOneAndUpdate({email:userEmail}, {$set :{verified:true} });
        console.log(result);
        console.log("verified successfully");
        res.status(StatusCodes.OK).redirect("/");
    } catch (error) {
        errors.length = 0;
        errors.push(error);
        console.log("error in verifing new user with email:"+email+"\n" + error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/");
    }
}
const signInFail = (req, res) => {
    errors.length = 0;
    errors.push("email or password is incorrect");
    res.status(StatusCodes.BAD_REQUEST).redirect("/");
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
                if (errors.length){
                     
                    res.status(StatusCodes.BAD_REQUEST).render("home.ejs", { quote: data[index], isSignIn: signinPageFlag, errors: errors });
                    
                }
                else {
                    console.log(req.params);
                    if (req.params.error){
                       errors.push("Verify your email to start handling your tasks 🛡️.");
                    }
                    res.status(StatusCodes.OK).render("home.ejs", { quote: data[index], isSignIn: signinPageFlag, errors: errors });
                }
                errors.length=0;
            })
            response.on("error", (er) => {
                console.log("error in quotes rendering\n" + er);
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

    res.redirect("/home");


}
module.exports = { signInFail, signOut, signUp, toggleSign, getInitialPage, setErrors, getHome,verifyEmail }

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