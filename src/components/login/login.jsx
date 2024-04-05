import React, { useState } from "react";
import "./login.css";
import { Avatar, Grid, Paper, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const image = "https://images3.alphacoders.com/132/1322308.jpeg";

function Login() {
  return (
    <div className="login-container">
      <img className="background" src={image} alt="Login image" />
      <div>
        <LoginElement />
      </div>
    </div>
  );
}

const LoginElement = () => {
  const navigate = useNavigate();
  const style = {
    padding: 20,
    width: 300,
    height: "70vh",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/login?username=${username}&password=${password}`
      );
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      sessionStorage.setItem("username", username);
      navigate("/weather");
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };

  return (
    <div className="login-form">
      <Grid alignItems="center">
        <Paper elevation={20} style={style}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "green" }}>
              <LockOutlinedIcon />
            </Avatar>
            <h1>SIGN IN</h1>
            <TextField
              style={{ height: "10vh" }}
              variant="filled"
              value={username}
              label="User Name"
              placeholder="Enter the User Name"
              fullWidth
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              placeholder="Enter your Password"
              variant="filled"
              value={password}
              type="password"
              fullWidth
              required
              onChange={(password) => setPassword(password.target.value)}
            />
          </Grid>
          <Button
            align="center"
            variant="contained"
            style={{ top: "10px" }}
            fullWidth
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <h3 style={{ marginTop: "10px", textAlign: "center" }}>OR</h3>
          <Link to="/signUp">
            <Button className="signUpButton" variant="outlined" fullWidth>
              Sign Up
            </Button>
          </Link>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
