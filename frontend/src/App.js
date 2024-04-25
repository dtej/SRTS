import { BrowserRouter, Routes, Route } from "react-router-dom";
import {MdAddTask} from "react-icons/md";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";
import AddUser from "./pages/AddTask";
import EditUser from "./pages/EditUser";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Login/>}/>
                  <Route path="/dashboard" element={<Dashboard/>}/>
                  <Route path="/users" element={<Users/>}/>
                  <Route path="/users/add" element={<AddUser/>}/>
                  <Route path="/users/edit/:id" element={<EditUser/>}/>
                  <Route path="/products" element={<Tasks/>}/>
                  <Route path="/products/add" element={<AddTask/>}/>
                  <Route path="/products/edit/:id" element={<EditTask/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;