import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { allProductAPI, removeProductAPI } from '../Services/allAPI'
import Header from '../Components/Header';
import Edit from './Edit';
import { editProductResponseContext } from '../contexts/ContextShare';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function ProductbyID() {
    //destructuring id using useparams
    const { id } = useParams()
    console.log(id);
    const [allProducts, setAllProducts] = useState([])
    /*  context api  */
    const { editProductResponse, setEditProductResponse } = useContext(editProductResponseContext)


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

    console.log(allProducts);


    useEffect(() => {
        getAllProducts()
    }, [editProductResponse])

    //finding the specified product from allProducts Array by using id
    var product = allProducts?.find((items) => items._id == id)

    console.log(product);

    //modal for delete
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // navigation hook
    const navigate = useNavigate()
   //delete product by id
    const handledelete = async()=>{
        const token = sessionStorage.getItem("token")
        console.log(token);

        const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        const result = await removeProductAPI(id,reqHeader)

        console.log(result);
        if(result.status==200){
            getAllProducts()
            navigate('/products')
        }
        else{
            alert(result.response.data)
        }

    }
    return (
        <div>
            <Header />
            {product &&
                <section className='container mt-3'>
                    <div className="row container w-100 d-flex justify-content-center align-items-center">
                        <div className="col-lg-6">
                            <img height={450} className='w-100' src={product?.img1} />
                            <div className="row  ">
                                <div className="col-lg-4 mt-4 hide ">
                                    <img height={150} className='w-100' src={product?.img2} />
                                </div>
                                <div className="col-lg-4 mt-4 hide">
                                    <img height={150} className='w-100' src={product?.img3} />
                                </div>
                                <div className="col-lg-4 mt-4 hide">
                                    <img height={150} className='w-100' src={product?.img4} />
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-6 ">
                            <div className='d-flex justify-content-between mt-1'>
                                <h6 className='text-info  fw-bold'>{product?.category}</h6>
                                <div className='d-flex'>
                                    {/* edit product */}
                                    <Edit product={product} />
                                    <button onClick={handleShow} className='btn btn-danger ms-1 '>Delete</button>
                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        backdrop="static"
                                        keyboard={false}
                                    >
                                        
                                        <Modal.Body>
                                         <h6  style={{ fontFamily: "Righteous" }}> Are you sure you want to delete '{product.name.slice(0,20)}...'</h6>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="danger" onClick={handledelete}>Delete</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                            <h5 style={{ fontFamily: "Righteous" }} className='mt-1'>{product?.name}</h5>
                          
                            
                            <hr></hr>
                            
                            <h6 style={{ letterSpacing: "1px" }} >Brand</h6>
                            <p >{product?.brand}</p>
                           
                            <h6 style={{ letterSpacing: "1px" }} className='mt-5'>About this item</h6>
                            <p style={{textAlign:"justify"}} >{product?.about}</p>
                            <h6 style={{ letterSpacing: "1px" }} className='mt-5'>Color</h6>
                            <p >{product?.color}</p>
                            <h5 className='text-success fw-bold'>Rs. {product?.price}</h5>
                        </div>
                    </div>
                </section>
            }

            <div style={{ minHeight: "50px" }}>

            </div>

        </div>
    )
}

export default ProductbyID