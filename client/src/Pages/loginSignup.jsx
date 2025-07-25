import React,{useState} from "react";
import './CSS/LoginSignup.css';

const LoginSignup = () => {
   const [state,setState]=useState("Login");
   const [formData,setFormData]= useState({
    name:"",
    password:"",
    email:""
   })
   const changeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
   }

   const login=async()=>{
    console.log("Login Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      localStorage.setItem('userId', responseData.userId);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
   }

   const signup=async()=>{
   console.log("Signup Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      localStorage.setItem('userId', responseData.userId);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className="loginSignup">
     <div className="loginsignup-container">
        <h1>
            {state}
        </h1>
        <div className="loginsignup-fields">
         {state==="Sign Up"?  <input type="text" name="name" value={formData.name} onChange={changeHandler} id="" placeholder="Your Name" />:<></>} 
            <input type="email" name="email" value={formData.email} onChange={changeHandler}  id="" placeholder="Your email" />
            <input type="password" name="password" value={formData.password} onChange={changeHandler} id="" placeholder="Password" />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"? <p className="loginsignup-login">Already have an account <span onClick={()=>{setState("Login")}}> Login</span></p>:        <p className="loginsignup-login">Create a account <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>
}
        <a href="http://localhost:4000/auth/google">
  <button>Login with Google</button>
</a>
        <div className="loginsignup-agree">
           <input type="checkbox" name="" id="" /> 
           <p>By continuing I agree up to use the terms of privacy policy </p>
        </div>
     </div>
    </div>
  );
}
export default LoginSignup;