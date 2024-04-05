import React from "react";
import "./signup.css";
import { Avatar, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const image = "https://images3.alphacoders.com/132/1322308.jpeg";

function SignUp() {
  return (
    <div className="login-container">
      <img className="background" src={image} alt="Login image" />
      <div>
        <SignUpElement />
      </div>
    </div>
  );
}

const SignUpElement = () => {
  const navigate = useNavigate();
  const style = {
    padding: 20,
    width: 300,
    height: "70vh",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  };
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = () => {
    const userData = {
      email: email,
      username: userName,
      password: password,
    };

    fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User signed up successfully!");
          navigate("/login");
        } else {
          console.error("Failed to sign up:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="login-form">
      <Grid alignItems="center">
        <Paper elevation={20} style={style}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "green" }}>
              <LockOutlinedIcon />
            </Avatar>
            <h1>SIGN UP</h1>
            <TextField
              variant="filled"
              value={userName}
              label="Username"
              placeholder="Enter your user name"
              fullWidth
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              label="Email"
              placeholder="Enter your email"
              variant="filled"
              value={email}
              fullWidth
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              style={{ marginBottom: "15px" }}
              label="Password"
              placeholder="Enter your Password"
              variant="filled"
              type="password"
              value={password}
              fullWidth
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Button
            align="center"
            variant="contained"
            style={{ top: "10px" }}
            fullWidth
            onClick={handleSignUp}
          >
            Click here to Sign Up
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default SignUp;
