import { React, useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async () => {
    if (password != confirmPass) {
      alert("Please correct your password");
      setPassword("");
      setConfirmPass("");
      return;
    }else if(password.length < 8){
      alert("Please enter a password with atleast 8 characters");
      setPassword("");
      setConfirmPass("");
      return;
    }

    try {
      await axios
        .post("http://localhost:3001/auth/signup", {
          username: username,
          password: password,
          role: "user",
        })
        .then((res) => {
          console.log(res);
          alert("Successfully signed up!");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
      setUsername("");
      setPassword("");
      setConfirmPass("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="registerBox">
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        required
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <input
        type="password"
        placeholder="confirm password"
        onChange={(e) => setConfirmPass(e.target.value)}
        value={confirmPass}
        required
      />  
      <button onClick={handleRegistration}>Register</button>
      <h4>or</h4>
      <h3>
        Already have an account? <b><Link to="/login">Sign in</Link></b>
      </h3>
    </div>
  );
}

export default register;
