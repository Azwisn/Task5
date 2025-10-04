import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Login} from "./Pages/Login";
import Register from "./Pages/Register";
import UsersTable from "./Pages/UsersTable";
import Interval from "./Pages/Interval";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <Login/>

                                // onSuccess={() => setPage("mypage")}
                                // onSwitch={() => setPage("register")}
                            // />
                        }
                    />
                    <Route
                        path="/register"
                        element={<Register />}
                    />
                    <Route path="/interval" element={<Interval />} />
                    <Route path="/users" element={<UsersTable />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

// onSwitch={() => setPage("login")}