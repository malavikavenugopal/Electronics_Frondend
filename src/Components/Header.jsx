import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {

  const navigate = useNavigate()
  const handlelogout = () =>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingadmin")
    navigate("/")
  }
  return (
    <div>

  <nav class="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
  <div class="container py-3">
    <a style={{ fontWeight: "bold",fontFamily:"Righteous",letterSpacing:"2px",fontSize:"25px" }} class="navbar-brand text-info" href="/products"><i class="fa-solid fa-laptop-medical"></i> Pixel Shop</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor02">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item ">
          <a style={{letterSpacing:"2px"}} class="nav-link active" href="/products">HOME
            <span class="visually-hidden">(current)</span>
          </a>
        </li>
        <li class="nav-item ms-3 ">
          <button  style={{letterSpacing:"2px"}} className='btn btn-danger' onClick={handlelogout} >LOGOUT</button>
        </li>
      </ul>
     
    </div>
  </div>
  </nav>
    </div>
  )
}

export default Header