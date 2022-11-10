import "./App.css";
import Register from "./Components/register";
import Login from "./Components/login";
import Questions from "./Components/questions";
import AdminDashboard from "./Components/adminDashboard";
import UniqueLink from "./Components/uniqueLink";
import Chart from "./Components/chart";

import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/result/chart"
            element={
              JSON.parse(localStorage.getItem("token")) != null ? (
                <Chart />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/user/questions"
            element={
              JSON.parse(localStorage.getItem("token")) != null ? (
                <Questions />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              JSON.parse(localStorage.getItem("token")) != null ? (
                <AdminDashboard />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/admin/dashboard/uniqueLink"
            element={
              JSON.parse(localStorage.getItem("token")) != null ? (
                <UniqueLink />
              ) : (
                <Login />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
