const { StatusCodes } = require("http-status-codes");
const userModel = require("../User/user.Model");

// import 'air-datepicker/air-datepicker.css'

// new AirDatepicker('#el' [, options]);


function getAddPage(req, res) {

    res.render("addList.ejs");
}
const addList = async (req, res) => {
    const { title, date } = req.body;
    // console.log(req.user);
    // console.log("\n\n");
    // console.log(req.body);
    try {
        const list = { title: req.body.title };// CHECK CASTING THE DATE PROBLEM
        // const list= {title:req.body.title,date:req.body.date};
        const x = await userModel.updateOne({ email: req.user.email }, { $push: { "lists": list } })
        res.redirect("/home");
    } catch (error) {
        console.log("error in adding List");
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/addList");
    }
    // 1-get the loggedin user; save in currUser var
    // 2-push the list to currUser list array
    // 3-save the document;

}
async function addTask(req, res) {
    const { task, title } = req.body;
    try {
        const x = await userModel.updateOne({ email: req.user.email }, { $push: { "lists.$[e1].items": { "name": task } } },
            { arrayFilters: [{ "e1.title": title }] });
        // console.log(x);
        res.redirect("/home");
    } catch (error) {
        console.log("error in adding Task");
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/addList");
    }
}


async function toggleCheck(req, res) {
    const { taskId, checkedValue } = req.body;
    const { listId } = req.params;
    var newCheckedValue = checkedValue == "true" ? false : true;
    req.body = {};
    try {
        const x = await userModel.updateOne({ email: req.user.email }, { $set: { "lists.$[e1].items.$[e2].checked": newCheckedValue } },
            { arrayFilters: [{ "e1._id": listId }, { "e2._id": taskId }] });
        // console.log(x);
        res.redirect("/home");
    } catch (error) {
        console.log("error in toggling Check");
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/home");
    }
}
const getAddTaskPage = (req, res) => {
    console.log(req.params.listTitle);
    res.render("addtask.ejs", { title: req.params.listTitle });
}

const getAllUserLists = async (req, res) => {
    try {
        const email = req.user.email;
        console.log(email);
        const data = await userModel.findOne({ email }, { lists: 1 });
        // console.log("whay");
        // console.log(data);
        const lists = data.lists;
        // console.log(lists);
        res.status(StatusCodes.OK).render("homePage.ejs", { lists });
    } catch (error) {
        console.log("error in getting user Lists ");
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/");
    }
}

const deleteList = async (req, res) => {
    const { listId } = req.params;
    console.log(listId);
    console.log(req.user.email);
    console.log("whatttttt");
    try {
        const x = await userModel.updateOne({ email: req.user.email }, { $pull: { "lists": { _id: listId } } });
        // {arrayFilters:[{"e1._id":listId}]});
        console.log(x);
        res.status(StatusCodes.OK).redirect("/home");
    } catch (error) {
        console.log("error in deleting user List :" + listId);
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/home");
    }
}
const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const { listId } = req.body;
    console.log(listId);
    console.log(taskId);
    console.log(req.user.email);
    try {
        const result = await userModel.updateOne({ email: req.user.email },
             { $pull: { "lists.$[e1].items":{_id:taskId}  } },
        { arrayFilters: [{ "e1._id": listId }] });

        // const result = await userModel.updateOne({ email: req.user.email }, 
        //     { $pull: { "lists.$[e1].tasks": { _id: taskId } } },
        //     { arrayFilters: [{ "e1._id": listId }] });
            console.log(result);
            res.status(StatusCodes.OK).redirect("/home");
    } catch (error) {
        console.log("error in deleting user List: " + listId + " Task: " + taskId);
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/home");
    }
}
module.exports = { getAddPage, addList, addTask, getAddTaskPage, getAllUserLists, toggleCheck, deleteList,deleteTask }