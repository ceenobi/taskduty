import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  EditTask,
  Error,
  HomeIndex,
  MyTasks,
  NewTask,
  Login,
  Signup,
} from "./index";
import Navbar from "./components/Navbar/Navbar";
import { useState, useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { authenticateUser } from "./config/api";

let initialUser = "";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(initialUser);
  const token = JSON.parse(localStorage.getItem("accesstoken"));

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("userdata"));
    if (getUser) {
      setLoggedInUser(getUser);
    }
  }, []);

  useEffect(() => {
    // Persist state changes to localStorage
    if (loggedInUser !== initialUser) {
      localStorage.setItem("userdata", JSON.stringify(loggedInUser));
    }
  }, [loggedInUser]);

  const getUser = useCallback(async () => {
    if (!token) return;
    try {
      const { data } = await authenticateUser();
      setLoggedInUser(data);
    } catch (error) {
      console.log(error);
    }
  }, [token, setLoggedInUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Navbar loggedInUser={loggedInUser} />
        <Routes>
          <Route path="/" element={<HomeIndex />}></Route>
          <Route path="mytasks" element={<MyTasks />}></Route>
          <Route path="newtask" element={<NewTask />}></Route>
          <Route path="edittask" element={<EditTask />}></Route>
          <Route path="login" element={<Login loggedInUser={loggedInUser} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
