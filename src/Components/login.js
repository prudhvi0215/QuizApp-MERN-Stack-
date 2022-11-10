import { React, useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [passType, setPassType] = useState("password");
  const [eyeType, setEyeType] = useState("fa-solid fa-eye-slash");


  const handlePasswordChange = ()=>{
    setEyeType(eyeType == "fa-solid fa-eye-slash"? "fa-solid fa-eye":"fa-solid fa-eye-slash"); 
    setPassType(passType == "password" ? "text" : "password");
  }

  const handleLogin = async () => {
    if (role == "user") {
      try {
        await axios
          .post("http://localhost:3001/auth/login", {
            username: username,
            password: password,
            role: role,
          })
          .then(async (loginRes) => {
            let token = loginRes.data.access_token;
            localStorage.setItem("token", JSON.stringify(token));
            await axios
              .get("http://localhost:3001/admin/questions")
              .then((res) => {
                console.log(res);
                navigate("/user/questions");
              })
              .catch((err) => {
                console.log(err);
              });
            alert("Successfully logged in!");
          })
          .catch((err) => {
            alert("Unauthorized, please try again");
            console.log(err);
          });
        setUsername("");
        setPassword("");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios
          .post("http://localhost:3001/admin/login", {
            username: username,
            password: password,
            role: role,
          })
          .then((result) => {
            let token = result.data.access_token;
            localStorage.setItem("token", JSON.stringify(token));
            alert("Successfully logged in!");
            navigate("/admin/dashboard");
          })
          .catch((err) => {
            alert("Unauthorized, please try again");
            console.log(err);
          });
        setUsername("");
        setPassword("");
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <div className="loginBox">
      <h1>Sign In</h1>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        required
      />

      <div className="passwordField">
        <input
          type={passType}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <i
          class={eyeType}
          onClick={handlePasswordChange}
        ></i>
      </div>

      <div className="radioBox">
        <input
          type="radio"
          name="role"
          value="user"
          onChange={(e) => setRole(e.target.value)}
        />{" "}
        &nbsp;
        <label for="user">user</label>
        <p>&nbsp;&nbsp;</p>
        <input
          type="radio"
          name="role"
          value="admin"
          onChange={(e) => setRole(e.target.value)}
        />
        &nbsp;
        <label for="admin">admin</label>
      </div>
      <h4 onClick={handleLogin}>Login</h4>
    </div>
  );
}

export default Login;
