module.exports =
    function () {
        return (req, res, next) => {
            if (req.isAuthenticated()) {
                next();

            }
            else {
                console.log(req.session);
                res.redirect("/");
            }

        }
    }