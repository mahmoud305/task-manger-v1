const passport = require("passport");
const validateRequest = require("../../common/validateRequest");
const { signUp, signIn, getInitialPage, toggleSign, getHome, signOut, signInFail } = require("./user.Controller");
const { signUpValidationSchema, signInValidationSchema } = require("./user.JoiValdationRequests");
const authenticated = require("../../common/authenticated");

const userRouter = require("express").Router();

userRouter.get("/list"   , getHome);

userRouter.get("/loginFail", signInFail);
userRouter.post("/signup", signUp);
// userRouter.post("/signup", validateRequest(signUpValidationSchema), signUp);

userRouter.post("/signin", validateRequest(signInValidationSchema),
passport.authenticate('local', { failureMessage: true, failureRedirect: "/loginFail", successRedirect: "/home" }));
userRouter.post("/signout", signOut)
userRouter.get('/', getInitialPage);

userRouter.post("/toggleSign", toggleSign);

module.exports = userRouter