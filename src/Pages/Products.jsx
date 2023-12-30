import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Components/Header';
import { allProductAPI } from '../Services/allAPI';

function Products() {
  // navigation hook
  const navigate = useNavigate()


  const [allProducts, setAllProducts] = useState([])
  //to store search values from input box
  const [searchKey, setSearchKey] = useState("")

  const getAllProducts = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      console.log(token);

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await allProductAPI(searchKey, reqHeader)
      console.log(result)
      setAllProducts(result.data)
    }



  }
  console.log(searchKey);
  console.log(allProducts);


  useEffect(() => {
    getAllProducts()
  }, [searchKey])


  return (
    <div>
      <Header />

      <section className=' mt-4'>
        <div className='row '>
          <div className='col-lg-6 d-flex justify-content-center align-items-center'>
            <div>
              <button onClick={() => navigate('/listing')} style={{ fontWeight: "bold", fontFamily: "Righteous", letterSpacing: "2px" }} className='btn rounded-5 btn-success'>Start Listing products</button>
            </div>
          </div>
          <div className='col-lg-6'>
            <img className='w-100' src='https://www.pngall.com/wp-content/uploads/9/Gadget-PNG-Pic.png' />
          </div>
        </div>
      </section>
      <section className='m-5 d-flex  flex-column justify-content-center align-items-center' style={{minHeight:'500px'}}>
      <input class="form-control me-sm-2 w-25" type="search" placeholder="Search by Category" style={{ borderRadius: "35px 35px 35px 35px",backgroundColor: 'grey'  }} onChange={(e)=>setSearchKey(e.target.value)}/>

        <div className="row w-100 mt-4">

       

          {
            allProducts.length > 0 ?
              allProducts.map((items) => (
                <>
                  <div className="col-lg-3">
                    <article class="card__article">
                      <img className='w-100' height={350} src={items.img1} alt="image" class="card__img" />

                      <div class="card__data">
                        <span class="card__description">{}</span>
                        <h2 class="card__title">{items.name.slice(0,30)}...</h2>
                       <Link class="card__button" to={`/products/${items._id}`} >Read More</Link>
                      </div>
                    </article>
                  </div>
                </>

              )) : <div className='d-flex justify-content-center align-items-center' style={{minHeight:"480px",fontWeight: "bold", fontFamily: "Righteous"}}><h3>Sorry,Couldn't Find Anything</h3></div>
          }

        </div>
      </section>
      
    </div>
  )
}

export default Products