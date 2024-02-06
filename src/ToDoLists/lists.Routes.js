const { getAddPage, addList, addTask, getAddTaskPage, getAllUserLists, toggleCheck ,deleteList, deleteTask} = require("./lists.Controller");

const ListRouter= require("express").Router();

ListRouter.post("/list",addList);// add new ToDoList
ListRouter.post("/addtask",addTask);// add new Task
ListRouter.get("lists/:username",);// get all ToDoLists of a user
ListRouter.get("/addList",getAddPage);// get add ToDoList Page 
ListRouter.get("/addTask/:listTitle",getAddTaskPage);// get add ToDoList Page 
ListRouter.get("/home",getAllUserLists);// get all ToDoList Page 
ListRouter.post("/toggleCheck/:listId",toggleCheck)// toggle the check mark of an item in a list
ListRouter.post("/deleteList/:listId",deleteList)// 
ListRouter.post("/deleteTask/:taskId",deleteTask)// 

module.exports= ListRouter