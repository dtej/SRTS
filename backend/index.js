//index.js is the entry point
import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import TaskRoute from "./routes/TaskRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

//import connection here so that we can sync the model to generate the table automatically
//comment the below import because database operations are done
//import db from "./config/Database.js";

dotenv.config();

const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});
//sync database. Run the code. After tables have been created
//in the database comment the below 3 lines. (already commented)
//(async()=>{
 //   await db.sync();
//})();

//define session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:true,
    store:store,
    cookie:{
        secure: 'auto'   //if we use http set it to false, if we use https set it to true
    }

}));
//adding middleware
app.use(cors({
    // for frontend to send requests along with cookies by  including credentials
    credentials: true,
    origin: 'http://localhost:3000' //domain to access our API. can be single or array of domains
    //React as front end
}));
//middleware to receive data in json format
//entry point
app.use(express.json());
app.use(UserRoute);
app.use(TaskRoute);
app.use(AuthRoute);

//store.sync();

//get port number from .env file
app.listen(process.env.APP_PORT,() =>{
    //if server is able to access port and run
    console.log('Server up and running....');
});
