import { useNavigate } from "react-router-dom";

export default function Profile(){

const navigate = useNavigate();

const logout = () => {
localStorage.removeItem("token");
navigate("/");
};

return(

<div style={{padding:"40px"}}>

<h1>ProdCare</h1>

<h3>Welcome to Production Support Portal</h3>

<br/>

<button onClick={()=>navigate("/dashboard")}>
Analyze Production Error
</button>

<br/><br/>

<button onClick={()=>navigate("/logs")}>
View Logs
</button>

<br/><br/>

<button onClick={logout}>
Logout
</button>

</div>

)

}