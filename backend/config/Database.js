import {Sequelize} from "sequelize";

const db = new Sequelize('user', 'root','admin', {
    host: "localhost",
    dialect: "mysql"
});

export default db;
