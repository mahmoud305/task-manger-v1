const nodemailer = require("nodemailer");

async function sendEmail(recivers, {fullUrl,email}) {
    const fullContent =`
    <!DOCTYPE html>
<html>
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>To-Do APP</title>
       <link rel="stylesheet"
           href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
           integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
           crossorigin="anonymous">
       <link rel="stylesheet"
           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/fontawesome.min.css"
           integrity="sha512-d0olNN35C6VLiulAobxYHZiXJmq+vl+BGIgAxQtD5+kqudro/xNMvv2yIHAciGHpExsIbKX3iLg+0B6d0k4+ZA=="
           crossorigin="anonymous" referrerpolicy="no-referrer" />
       <link rel="stylesheet"
           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/brands.min.css"
           integrity="sha512-8RxmFOVaKQe/xtg6lbscU9DU0IRhURWEuiI0tXevv+lXbAHfkpamD4VKFQRto9WgfOJDwOZ74c/s9Yesv3VvIQ=="
           crossorigin="anonymous" referrerpolicy="no-referrer" />
       <link rel="stylesheet"
           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/solid.min.css"
           integrity="sha512-pZlKGs7nEqF4zoG0egeK167l6yovsuL8ap30d07kA5AJUq+WysFlQ02DLXAmN3n0+H3JVz5ni8SJZnrOaYXWBA=="
           crossorigin="anonymous" referrerpolicy="no-referrer" />
       <link rel="preconnect" href="https://fonts.gstatic.com">
       <link rel="stylesheet"
           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
       <link
           href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap"
           rel="stylesheet">
       <link rel="stylesheet"
           href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
       <link rel="stylesheet" href="/stye.css">
   </head>
   <body>
       <div style="position: fixed; top: 0; left: 0 ;width: 100%;  z-index: 3;"
           class=" p-4 pb-0 semiTrans rounded-0">
           <!-- Section: Social media -->
           <div class="d-flex justify-content-center align-items-center">
               <section class="logo text-center ">
                   <h1 class="text-center"
                       style="font-family: sans-serif;">Task Manger</h1>
               </section>

           </div>
           <!-- Section: Social media -->
       </div>


       <div style="height: 100vh !important; display: flex; justify-content: center;align-items: center;  background-color: coral;" >
           <div class="text-center ">
               <h3> One step away from managing your tasks.</h3>
               <form action="${fullUrl}verfied" method="post" >
                   <button class="btn btn-primary my-2 fs-5 fw-bold "  > Click here to verify your account </>
               </form>
           </div>
       </div>

       <!-- ///  bodyyyyyyyyyyyyyyy
-->

       <!-- Remove the container if you want to extend the Footer to full width. -->

       <div
           style="position: fixed; bottom: 0; left: 0 ;width: 100%; margin-top: 200px;"
           class="bg-warning ">

           <footer class="bg-light text-center text-white">

               <!-- Grid container -->

               <!-- Copyright -->
               <div class="text-center p-3"
                   style="background-color: rgba(0, 0, 0, 0.2);">
                   © 2024 Copyright:
                   <a class="text-white text-decoration-none fw-bold"
                       href="https://mahmoudabohgr.tech/">mahmoudabohgr.tech</a>
               </div>
               <!-- Copyright -->
           </footer>

       </div>
       <!-- End of .container -->
   </body>
</html>
    `
   console.log(fullUrl);
   console.log(email);
    let info;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        // true for 465, false for other ports
        auth: {
            user: "lenovo520pad@gmail.com", // generated ethereal user
            pass: "qjlyvqdcgthtrvpp", // generated ethereal password (process.env.EMAIL_SENDER_PASS)
        },
    });
    //  console.log(recivers.join(","));
    // send mail with defined transport object
    try {
        info = await transporter.sendMail({
            from: `"Task Manager LTD 👻" <{${process.env.EMAIL_SENDER}}>`, // sender address
            to: recivers.join(","), // list of receivers
            subject: "Task Manger Email Verifiction", // Subject line
            amp: fullContent,
            html: `<h2>  <form action="${fullUrl}/verfied/${email}" method="post" >
                <input type="hidden" name="emailval" value="${email}"/>
                <input type="hidden" id="postId" name="postId" value="34657" />
                <button  type="submit" style="padding: 10px 20px; background-color: rgb(72, 72, 204); font-size: larger; font-weight: bold;" 
                 class="btn btn-primary my-2 fs-5 fw-bold "  > Click here to verify your account </>
            </form> </h2>`,
        });
    } catch (error) {
        console.log("error in sending email ,", error);
        return null;
    }

    return info;
}
module.exports = sendEmail;