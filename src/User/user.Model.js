const { default: mongoose, Types } = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const listSchema = require("../ToDoLists/lists.Model");

function emailValidation(email) {
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email);
}

// use Hooks to encrypt the user id to save it instead of keeoing it available in the frontend
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "username is required"] },
        email: { type: String, validate: [emailValidation, "invalid email"], required: [true, "email isss required"] },
        // password:{type :String , required:[true , "password is required"]},
        password: { type: String },
        role: { type: String, enum: ["user", "proUser", "admin"], default: "user" },
        lists: [{
            id:{type: Types.ObjectId},
            title:{ type:String},
            // date: {type:Date}, // toDo
            items: [{
                // _id:{type: Types.ObjectId},
                name: String,
                checked: { type: Boolean, default: false }
            }]
        }],
        verified:{type:Boolean,default:"false"}

    }
    ,
    {
        timestamps: true
    }
);

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(passportLocalMongoose,{usernameField:"email"});

const userModel = mongoose.model("taskuser", userSchema);

passport.use(new LocalStrategy({ usernameField: "email" }, async function (email, password, done) {
    userModel.findOne({ email }).then(user => {
        if (!user) {// no email registered
            return done(null, false, { message: "Invalid credentials" });
        }
        const passwordResult = bcrypt.compareSync(password, user.password)
        if (!passwordResult) { // password doesnot match
            return done(null, false, { message: "Invalid credentials -Password-" });
        }
        return done(null, user)
    }).catch(err => {
        return done(null, false, { message: "Internal server error in logging" });
    })
}));

passport.serializeUser((user, done) => {// called after sign in and before the cooki is created
    // console.log(user);
    return done(null, {id:user.id,email:user.email,verified:user.verified})
});
passport.deserializeUser((user, done) => {// called with every request that has a cooki 
    // console.log(user);
    return done(null, user);
});

module.exports = userModel;