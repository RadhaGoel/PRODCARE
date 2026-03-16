import { useState } from "react";

export default function Register(){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const register = async ()=>{

const res = await fetch("http://localhost:5000/api/users/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
email,
password
})
});

const data = await res.json();

alert(data.message);

window.location.href="/";

};

return(

<div className="container">

<div className="card">

<h2>Register</h2>

<input
className="input"
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

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

<button className="button" onClick={register}>
Register
</button>

<div
className="link"
onClick={()=>window.location.href="/"}
>
Login
</div>

</div>

</div>

)

}