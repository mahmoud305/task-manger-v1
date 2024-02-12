const passport = require("passport");
const validateRequest = require("../../common/validateRequest");
const { signUp, signIn, getInitialPage, toggleSign, getHome, signOut, signInFail, verifyEmail } = require("./user.Controller");
const { signUpValidationSchema, signInValidationSchema } = require("./user.JoiValdationRequests");
const authenticated = require("../../common/authenticated");

const userRouter = require("express").Router();

userRouter.get("/list" ,authenticated()  , getHome);

userRouter.get("/loginFail", signInFail);
userRouter.post("/signup", signUp);
userRouter.post("/signup/verfied/:userEmail", verifyEmail);
// userRouter.post("/signup", validateRequest(signUpValidationSchema), signUp);

userRouter.post("/signin", validateRequest(signInValidationSchema),
passport.authenticate('local', { failureMessage: true, failureRedirect: "/loginFail", successRedirect: "/home" }));
userRouter.post("/signout", signOut)
userRouter.get('/', getInitialPage);
userRouter.get('/verify/:error', getInitialPage);// to handle the nonVerified emails

userRouter.post("/toggleSign", toggleSign);

module.exports = userRouter