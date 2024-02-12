const authenticated = require("../../common/authenticated");
const { getAddPage, addList, addTask, getAddTaskPage, getAllUserLists, toggleCheck ,deleteList, deleteTask} = require("./lists.Controller");

const ListRouter= require("express").Router();

ListRouter.post("/list",authenticated(),addList);// add new ToDoList
ListRouter.post("/addtask",authenticated(),addTask);// add new Task
ListRouter.get("lists/:username",);// get all ToDoLists of a user
ListRouter.get("/addList",authenticated(),getAddPage);// get add ToDoList Page 
ListRouter.get("/addTask/:listTitle",authenticated(),getAddTaskPage);// get add ToDoList Page 
ListRouter.get("/home",authenticated(),getAllUserLists);// get all ToDoList Page 
ListRouter.post("/toggleCheck/:listId",authenticated(),toggleCheck)// toggle the check mark of an item in a list
ListRouter.post("/deleteList/:listId",authenticated(),deleteList)// 
ListRouter.post("/deleteTask/:taskId",authenticated(),deleteTask)// 

module.exports= ListRouter