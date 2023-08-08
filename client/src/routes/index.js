import { Route, Routes, BrowserRouter } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from 'axios'
/**
 * import Layouts
 */
import MainLayout from "../containers/Layouts/MainLayout";
import HomeLayout from "../containers/Layouts/HomeLayout"
// import UserLayout from "../containers/Layouts/UserLayout";
/**
 * import views
 */
import Home from "../containers/Views/Home";
import Admin from "../containers/Views/Admin";
import Student from "../containers/Views/Student";
const Router = () => {
  useEffect(() => {
    getMe()
  },[])
  const [role, setRole] = useState({});
  const getRole = (role) => {
    setRole(role);
  };
  const getMe = async () => {
    try {
      const token = localStorage.getItem("token");
      const getMe = await axios.get("http://localhost:4000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRole(getMe.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home getRole={getRole} />} />
          </Route>
          <Route path="/dashboard" element={<HomeLayout />}>
            {
              role.role == 'student' ? 
              <Route path="" element={<Student role={role} />} />
              :
            <Route path="" element={<Admin />} />
            }
            {/* <Route path="" element={<Student />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
