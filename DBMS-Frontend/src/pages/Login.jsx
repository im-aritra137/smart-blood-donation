import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      console.log("LOGIN RESPONSE:", res.data);

      // Save JWT token
        login(res.data);

    if(res.data.user.role === "DONOR"){
    navigate("/donor/dashboard");
    }
    else if(res.data.user.role === "RECEIVER"){
    navigate("/receiver/dashboard");
    }

    } catch (error) {

      console.log("ERROR:", error);

      alert(
        error.response?.data?.message || 
        "Login failed"
      );

    }
  };


  return (
    <div>

      <h1>Blood Donation Login</h1>

      <form onSubmit={handleLogin}>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>

      </form>

      <p>
        New user? Register
      </p>

    </div>
  );
}

export default Login;