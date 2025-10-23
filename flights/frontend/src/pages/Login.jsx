import React, { useState } from "react";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (e) => {
e.preventDefault();
alert(`Email: ${email}\nPassword: ${password}`);
};

return (
<div style={{
display: "flex",
justifyContent: "center",
alignItems: "center",
height: "100vh",
backgroundColor: "#f2f2f2"
}}>
<form
onSubmit={handleSubmit}
style={{
backgroundColor: "#fff",
padding: "30px",
borderRadius: "10px",
boxShadow: "0 0 10px rgba(0,0,0,0.1)",
width: "300px"
}}
>
<h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

    <input 
      type="email" 
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px"
      }}
    />

    <input 
      type="password" 
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px"
      }}
    />

    <button 
      type="submit"
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Login
    </button>
  </form>
</div>


);
}

export default Login;
