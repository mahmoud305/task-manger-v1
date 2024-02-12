module.exports =
    function () {
        return (req, res, next) => {
            console.log("in authentication");

            if (req.isAuthenticated()) {
                console.log("Here iS User\n");
                console.log(req.user);
                if(req.user.verified== false){
                    console.log("user nottttttt Verified\n");
                 
                    res.redirect("/verify/error")   ;
                }else{
                    console.log("user Verified");
                    next();
                }
            }
            else {
                console.log(req.session);
                res.redirect("/");
            }

        }
    }