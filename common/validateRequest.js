const { setErrors } = require("../src/User/user.Controller");
const  {StatusCodes} = require( 'http-status-codes' );

module.exports = (validationSchema) => {
    return (req, res, next) => {
        const { error, value } = validationSchema.body.validate(req.body);
        if (error) {
            const newErrors = [];
            error.details.forEach(err => {
                newErrors.push(err.message);
            });
            setErrors(newErrors);// to show the errors in the sign up page -home page-
            res.status(StatusCodes.BAD_REQUEST).redirect("/");
            res.s
        } else {
            next();
        }
    }
}