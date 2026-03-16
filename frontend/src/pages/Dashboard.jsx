import { useState } from "react";

export default function Dashboard(){

const [error,setError] = useState("");
const [result,setResult] = useState("");

const analyze = async ()=>{

const token = localStorage.getItem("token");

const res = await fetch("http://localhost:5000/api/ai/analyze",{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
error
})
});

const data = await res.json();

setResult(data.analysis || JSON.stringify(data));

};

const logout = ()=>{

localStorage.removeItem("token");

window.location.href="/";

};

return(

<div className="dashboard">

<h1>ProdCare Dashboard</h1>

<button className="logout" onClick={logout}>
Logout
</button>

<br/><br/>

<input
className="input"
placeholder="Paste production error..."
onChange={(e)=>setError(e.target.value)}
/>

<button className="button" onClick={analyze}>
Analyze Error
</button>

{result && (

<div className="resultBox">

<h3>AI Analysis</h3>

<p>{result}</p>

</div>

)}

</div>

)

}