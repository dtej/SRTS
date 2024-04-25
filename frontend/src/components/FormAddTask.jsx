import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddTask = () => {
    const [name, setName] = useState("");
    const [taskType, settaskType] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/tasks", {
                name: name,
                taskType: taskType,
            });
            navigate("/tasks");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1 className="title">Products</h1>
            <h2 className="subtitle">Add New Product</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveProduct}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Task Name"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Task Type</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={taskType}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Task Type"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAddTask;