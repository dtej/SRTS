import {DataTypes, Sequelize} from "sequelize";
import db from "../config/Database.js"
import Users from "./UserModel.js";

const {Datatypes} = Sequelize; //destructure the db datatypes

const Tasks = db.define('task', {
    uuid:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3,100]
        }
    },
    taskType:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    userId:{
        type:DataTypes.INTEGER,  //association with user table where id is automatically created of type Integer
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
},{
    freezeTableName:true
});

//give one to many relationship with foreign key
Users.hasMany(Tasks);
Tasks.belongsTo(Users, {foreignKey: 'userId'});
export default  Tasks;