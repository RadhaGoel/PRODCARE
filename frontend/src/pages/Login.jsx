import { useState } from "react";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    const res = await fetch("http://localhost:5000/api/users/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    });

    const data = await res.json();

    if(data.token){
      localStorage.setItem("token",data.token);
      window.location.href="/profile";
    }else{
      alert(data.message);
    }

  };

  return(
    <div className="container">

      <div className="card">

        <h2>ProdCare Login</h2>

        <input
        className="input"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        className="input"
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="button" onClick={handleLogin}>
          Login
        </button>

        <div
        className="link"
        onClick={()=>window.location.href="/register"}
        >
          Register
        </div>

      </div>

    </div>
  )
}