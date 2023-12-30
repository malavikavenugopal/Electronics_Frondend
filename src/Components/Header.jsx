import React from 'react'

function Header() {
  return (
    <div>

  <nav class="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
  <div class="container py-3">
    <a style={{ fontWeight: "bold",fontFamily:"Righteous",letterSpacing:"2px",fontSize:"25px" }} class="navbar-brand text-info" href="/products"><i class="fa-solid fa-laptop-medical"></i> Pixel Shop</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor02">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a style={{letterSpacing:"2px"}} class="nav-link active" href="/products">HOME
            <span class="visually-hidden">(current)</span>
          </a>
        </li>
        
        {/* <li class="nav-item dropdown">
          <a  style={{letterSpacing:"2px"}}  class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">PRODUCTS</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">HeadPhones</a>
            <a class="dropdown-item" href="#">Mobiles & Tablets</a>
            <a class="dropdown-item" href="#">Cameras and Photography</a>
            <a class="dropdown-item" href="#">GPS & Accessories</a>
          </div>
        </li> */}
      </ul>
     
    </div>
  </div>
  </nav>
    </div>
  )
}

export default Header