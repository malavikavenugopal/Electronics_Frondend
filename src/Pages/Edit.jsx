import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { editProductAPI } from '../Services/allAPI';
import { editProductResponseContext } from '../contexts/ContextShare';
function Edit({ product }) {
    console.log(product)
    /*  modal */
    const [show, setShow] = useState(false);
    const [token, setToken] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    /*  state to edit product */
    const [editProduct, setEditProduct] = useState({
        id: product._id,
        category: product.category,
        name: product.name,
        brand: product.brand,
        about: product.about,
        img1: product.img1,
        img2: product.img2,
        img3: product.img3,
        img4: product.img4,
        video: product.video,
        color: product.color,
        price: product.price


    })


    /*  context api  */
    const { editProductResponse, setEditProductResponse } = useContext(editProductResponseContext)

    /* to get the token session storage */
    useEffect(() => {

        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        else {
            setToken("")
        }


    }, [])


    console.log(editProduct);

    //update the product
    const handleUpdate = async () => {

        const { id, about, img1, img2, img3, img4, color, price } = editProduct
        if (!about || !img1 || !img2 || !img3 || !img4 || !color || !price) {
            toast.warning("Please Fill the form Completely")
        }

        else {


            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            const result = await editProductAPI(id, editProduct, reqHeader)
            console.log(result);

            if (result.status == 200) {
                console.log(result.data);
                toast.success('Updated Successfully')
                handleClose()
                setEditProductResponse(result.data)

            }
            else {
                console.log(result.response.data);
            }

        }



    }


    return (
        <div>
            <button onClick={handleShow} className='btn btn-success' >Edit</button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <h5 style={{ fontFamily: "Righteous" }}>Update the Product</h5>
                </Modal.Header>
                <Modal.Body>
                    {/*  about  */}
                    <label className='fw-bold'>About this item:</label>
                    <textarea value={editProduct.about} style={{ backgroundColor: 'grey' }} className='form-control' onChange={(e) => setEditProduct({ ...editProduct, about: e.target.value })} />
                    {/* color */}
                    <label className='fw-bold mt-2' >Color:</label>
                    <div className='d-flex mt-2'>
                        <input name='gadgets' type='radio' onChange={(e) => setEditProduct({ ...editProduct, color: e.target.value })} value="Black" /><label className='ms-2' style={{ color: "grey", fontWeight: "900" }}>Black</label>
                    </div><div className='d-flex mt-2'>
                        <input value="Red" name='gadgets' type='radio' onChange={(e) => setEditProduct({ ...editProduct, color: e.target.value })} /><label className='ms-2' style={{ fontWeight: "900", color: "red" }}  >Red</label>
                    </div><div className='d-flex mt-2'>
                        <input value="Green" name='gadgets' onChange={(e) => setEditProduct({ ...editProduct, color: e.target.value })} type='radio' /><label className='ms-2' style={{ color: "green", fontWeight: "900" }} >Green</label>
                    </div><div className='d-flex mt-2'>
                        <input value="White" name='gadgets' onChange={(e) => setEditProduct({ ...editProduct, color: e.target.value })} type='radio' /><label className='ms-2' style={{ color: "white", fontWeight: "900" }} >White</label>
                    </div>
                    {/*  images */}
                    <label className='fw-bold mt-2'>Upload the images:</label>
                    <input placeholder="URL" onChange={(e) => setEditProduct({ ...editProduct, img1: e.target.value })} value={editProduct.img1} type='text' className='form-control' style={{ borderRadius: "35px 35px 35px 35px", backgroundColor: 'grey' }} />
                    <input placeholder="URL" onChange={(e) => setEditProduct({ ...editProduct, img2: e.target.value })} type='text' value={editProduct.img2} className='form-control mt-3' style={{ borderRadius: "35px 35px 35px 35px", backgroundColor: 'grey' }} />
                    <input onChange={(e) => setEditProduct({ ...editProduct, img3: e.target.value })} placeholder="URL" value={editProduct.img3} type='text' className='form-control mt-3' style={{ borderRadius: "35px 35px 35px 35px", backgroundColor: 'grey' }} />
                    <input placeholder="URL" type='text' onChange={(e) => setEditProduct({ ...editProduct, img4: e.target.value })} value={editProduct.img4} className='form-control mt-3' style={{ borderRadius: "35px 35px 35px 35px", backgroundColor: 'grey' }} />
                    {/* price      */}
                    <label className='fw-bold mt-2'>Price:</label>
                    <input value={editProduct.price} style={{ backgroundColor: 'grey' }} placeholder='Amount' onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} type='number' className='form-control w-50' />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleUpdate} variant="success">Update</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </div>
    )
}

export default Edit