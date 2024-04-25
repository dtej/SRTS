import Tasks from "../models/TaskModel.js";
import Users from "../models/UserModel.js";
import {Op} from "sequelize";

export const getTasks = async (req,res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Tasks.findAll({
                attributes:['uuid','name','taskType'],
                include:[{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Tasks.findAll({
                attributes:['uuid','name','taskType'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: Users,
               //     attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getTasksById = async (req, res) => {
    try {
        const task = await Tasks.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!task) return res.status(404).json({msg: "User cannot access Data "});
        let response;
        if(req.role === "admin"){
            response = await Tasks.findOne({
                attributes:['uuid','name','taskType'],
                where:{
                    id: task.id
                },
                include:[{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Tasks.findOne({
                attributes:['uuid','name','taskType'],
                where:{
                    [Op.and]:[{id: task.id}, {userId: req.userId}]
                },
                include:[{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createTasks =  async (req, res) => {
    const {name, taskType} = req.body;
    try {
        await Tasks.create({
            name: name,
            taskType:taskType,
            userId: req.userId
        });
        res.status(201).json({msg: "task Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateTasks = async(req, res) =>{
    try {
        const task = await Tasks.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!task) return res.status(404).json({msg: "Data not found"});
        const {name, taskType} = req.body;
        if(req.role === "admin"){
            await Tasks.update({name, taskType},{
                where:{
                    id: task.id
                }
            });
        }else{
            if(req.userId !== task.userId) return res.status(403).json({msg: "Invalid User access"});
            await Tasks.update({name, taskType},{
                where:{
                    [Op.and]:[{id: task.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Product updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteTasks = async (req,res) => {
    try {
        const task = await Tasks.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!task) return res.status(404).json({msg: "Data not found"});
        const {name, taskType} = req.body;
        if(req.role === "admin"){
            await Tasks.destroy({
                where:{
                    id: task.id
                }
            });
        }else{
            if(req.userId !== task.userId) return res.status(403).json({msg: "Access Denied"});
            await Users.destroy({
                where:{
                    [Op.and]:[{id: task.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Product deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}