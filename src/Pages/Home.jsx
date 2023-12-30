import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { loginAPI } from '../Services/allAPI';
import {useNavigate}from'react-router-dom'

function Home() {
 
    //state to store admin username and password
    const [admin,setAdmin] = useState({
            email:"",
            password:""
    })
   console.log(admin);
   // navigation hook
   const navigate = useNavigate()
    const handleLogin = async(e)=>{

    //to avoid reload (otherwise data will be loses before saved)
    e.preventDefault()
    const { email, password } = admin
    if (!email || !password) {
        toast.info("Please Fill Form Completely")
      }

    else {
        const result = await loginAPI(admin)
        console.log(result);
        if (result.status === 200) {
          toast.success(`Login Successfull`)
          navigate('/products')
          //to store existingadmin and token , we take in to sessionStorage
          sessionStorage.setItem('existingadmin', JSON.stringify(result.data.existingadmin))
          sessionStorage.setItem('token', result.data.token)
          //after login make empty the state
          setAdmin({
            email: "",
            password: ""
          })
         
        }
        else {
          toast.error(`${result.response.data}`)
        }
  
    }
  

    }
    return (
        <div>

            {/* title part */}
            <section style={{ background: "url(https://images.pexels.com/photos/10418017/pexels-photo-10418017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)" }}>

                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-3 d-flex justify-content-center flex-column align-items-center">
                        <h1 style={{ fontWeight: "bold",fontFamily:"Righteous",letterSpacing:"2px" }}>Welcome to</h1>
                        <h1 style={{ fontWeight: "bold",fontFamily:"Righteous",letterSpacing:"2px" }}>Pixel Shop</h1>
                    </div>
                    <div className="col-lg-3"></div>
                    <div className="col-lg-5">
                    {/* login section */}

                            <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-4 pt-5 pt-xl-0 mt-xl-n5">

                                <form class=" mt-5" style={{ width: "23rem" }}>

                                    <h3 class="fw-normal mt-5" style={{ letterSpacing: "2px" }}>Log in</h3>
                               {/*  email id */}
                                    <div class="form-outline mb-2">
                                        <label class="form-label mt-2" for="form2Example18">Email address</label>
                                        <input type="email" id="form2Example18" 
                                        value={admin.email}
                                        onChange={(e)=>setAdmin({...admin,email:e.target.value})}class="form-control form-control-lg" />
                                    </div>
                               {/*  password */}
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form2Example28">Password</label>
                                        <input type="password" id="form2Example28" 
                                        value={admin.password}
                                        onChange={(e)=>setAdmin({...admin,password:e.target.value})}
                                        class="form-control form-control-lg" />
                                    </div>
                                {/* login button */}
                                    <div class="pt-1 mb-4">
                                        <button onClick={handleLogin} class="btn btn-dark btn-lg btn-block  " type="button"
                                         >Login</button>
                                    </div>

                                    <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Forgot password?</a></p>
                                </form>
                        </div>

                    </div>
                </div>

            </section>
           
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </div>
    )
}

export default Home