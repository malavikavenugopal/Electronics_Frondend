import React from 'react'
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { addProductAPI } from '../Services/allAPI';
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header';
function Listing() {
    //state to store values from input box
    const [product, setProduct] = useState({
        category: "",
        name: "",
        brand: "",
        about: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        video: "",
        color: "",
        price: ""

    })
    console.log(product);

    //to store token from sessionstorage
    const [token, setToken] = useState("")

   
    
    //get token from sessionstorage
    useEffect(() => {

        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        else {
            setToken("")
        }

    }, [])
    console.log(token);

    // navigation hook
    const navigate = useNavigate()

    //add product api
    const handleSubmit = async (e) => {
        e.preventDefault()

        const { category, name, brand, about, img1, img2, img3, img4, video, color, price } = product
        if (!category || !name || !brand || !about || !img1 || !img2 || !img3 || !img4 || !video || !color || !price) {
            toast.info("Please fill the form completely")
        }
        else {

            if (token) {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

                const result = await addProductAPI(product, reqHeader)
                console.log(result);
                if (result.status === 200) {
                    toast.success('Product Added  Successfully')

                    setTimeout(() => {
                        navigate('/products')
                    }, 2000);
                }
                else {
                    console.log(result);
                    toast.error(result.response.data)
                }

            }

        }
    }

    return (
        <div>
            {
                token &&
                <>
                    <Header />
                    <section className='container mt-3' >
                        <img style={{ height: "500px", opacity: "60%" }} className='w-100' src='https://img.freepik.com/free-photo/new-smartwatch-balancing-with-cliff_23-2150296475.jpg?w=1060&t=st=1703741847~exp=1703742447~hmac=3896c98f397d290e30ebecd34f8ffc43fd30d9ca523a43daecf163dbec017296' />
                    </section>
                    <section className='text-light mt-5'>
                        <h3 className='align-text-center d-flex justify-content-center' style={{ fontWeight: "600", fontFamily: "Righteous" }}>Product Listing Form </h3>
                        <div className='container mt-4 '>
                            {/* category */}
                            <h6 style={{ fontFamily: "Righteous" }}>What product would you like to list?</h6>

                            <div className='row w-100'>
                                {/* headphone */}
                                <div className='col-lg-3 '>
                                    <img height={200} className='w-100 rounded' src='https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
                                    <div className='d-flex mt-2'>
                                        <input id='hp' value="HeadPhones" onChange={(e) => setProduct({ ...product, category: e.target.value })} name='gadgets' type='radio' /><label className='ms-2' style={{ color: "white", fontWeight: "900" }} htmlFor='hp'>HeadPhones</label>
                                    </div>
                                </div>
                                {/* cameras and photographs */}
                                <div className='col-lg-3'>
                                    <img height={200} className='w-100 rounded' src='https://images.pexels.com/photos/3497126/pexels-photo-3497126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
                                    <div className='d-flex mt-2'>
                                        <input id='hp' value="Cameras and Photography" onChange={(e) => setProduct({ ...product, category: e.target.value })} name='gadgets' type='radio' /><label className='ms-2' style={{ color: "white", fontWeight: "900" }} htmlFor='hp'>Cameras and Photography</label>
                                    </div>
                                </div>
                                {/* Mobiles & Tablets */}
                                <div className='col-lg-3'>
                                    <img height={200} className='w-100 rounded' src='https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
                                    <div className='d-flex mt-2'>
                                        <input id='hp' value="Mobiles & Tablets" onChange={(e) => setProduct({ ...product, category: e.target.value })} name='gadgets' type='radio' /><label className='ms-2' style={{ color: "white", fontWeight: "900" }} htmlFor='hp'>Mobiles & Tablets</label>
                                    </div>
                                </div>
                                {/* GPS & Accessories */}
                                <div className='col-lg-3'>
                                    <img height={200} className='w-100 rounded' src='https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
                                    <div className='d-flex mt-2'>
                                        <input id='hp' value="GPS & Accessories" onChange={(e) => setProduct({ ...product, category: e.target.value })} name='gadgets' type='radio' /><label className='ms-2' style={{ color: "white", fontWeight: "900" }} htmlFor='hp'>GPS & Accessories</label>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-5'>
                                <div className='col-lg-6'>
                                    {/*  name     */}
                                    <h6 className='mt-4' style={{ fontFamily: "Righteous" }}>Name of the product</h6>
                                    <input placeholder="Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} type='text' className='form-control' style={{ borderRadius: "35px 35px 35px 35px", backgroundColor: 'grey' }} />
                                    {/* about */}
                                    <h6 className='mt-4' style={{ fontFamily: "Righteous" }}>About the product</h6>
                                    <textarea placeholder="About" value={product.about} onChange={(e) => setProduct({ ...product, about: e.target.value })} type='text' className='form-control' style={{ backgroundColor: 'grey', height: "130px" }} />
                                </div>
                                <div className='col-lg-6'>
                                    {/* brand  */}
                                    <h6 className='mt-4' style={{ fontFamily: "Righteous" }}>Brand Name of the product</h6>
                                    <input placeholder="Brand" type='text' value={product.brand} onChange={(e) => setProduct({ ...product, brand: e.target.value })} className='form-control' style={{ borderRadius: "35px 35px 35px 35px", backgroundColor: 'grey' }} />

                                    {/* color */}
                                    <h6 className='mt-4' style={{ fontFamily: "Righteous" }}>Color of the product</h6>
                                    <div className='d-flex mt-2'>
                                        <input name='colors' type='radio' value="Black" onChange={(e) => setProduct({ ...product, color: e.target.value })} /><label className='ms-2' style={{ color: "grey", fontWeight: "900" }} >Black</label>
                                    </div>
                                    <div className='d-flex mt-2'>
                                        <input value="Red" onChange={(e) => setProduct({ ...product, color: e.target.value })} name='colors' type='radio' /><label className='ms-2' style={{ fontWeight: "900", color: "red" }} >Red</label>
                                    </div>
                                    <div className='d-flex mt-2'>
                                        <input value="Green" onChange={(e) => setProduct({ ...product, color: e.target.value })} name='colors' type='radio' /><label className='ms-2' style={{ color: "green", fontWeight: "900" }} >Green</label>
                                    </div>
                                    <div className='d-flex mt-2'>
                                        <input value="White" onChange={(e) => setProduct({ ...product, color: e.target.value })} name='colors' type='radio' /><label className='ms-2' style={{ color: "white", fontWeight: "900" }} >White</label>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <h6 className='mt-4' style={{ fontFamily: "Righteous" }}>Upload the images of the product</h6>
                                    {/* images */}
                                    <div className='row'>
                                        <div className='col-lg-4'>
                                            <input placeholder="URL" value={product.img1} onChange={(e) => setProduct({ ...product, img1: e.target.value })} type='text' className='form-control' style={{ borderRadius: "35px 35px 35px 35px", backgroundColor: 'grey' }} />

                                            <input placeholder="URL" value={product.img2} onChange={(e) => setProduct({ ...product, img2: e.target.value })} type='text' className='form-control mt-3' style={{ borderRadius: "35px 35px 35px 35px", backgroundColor: 'grey' }} />

                                            <input placeholder="URL" value={product.img3} onChange={(e) => setProduct({ ...product, img3: e.target.value })} type='text' className='form-control mt-3' style={{ borderRadius: "35px 35px 35px 35px", backgroundColor: 'grey' }} />

                                            <input placeholder="URL" value={product.img4} onChange={(e) => setProduct({ ...product, img4: e.target.value })} type='text' className='form-control mt-3' style={{ borderRadius: "35px 35px 35px 35px", backgroundColor: 'grey' }} />
                                        </div>
                                        <div className='col-lg-8'>
                                           {/*  displaying images from taking values from state */}
                                            <div className='row'>
                                                <div className='col-lg-3'>
                                                    {product.img1 &&
                                                        <img className='w-100' height={180} src={product.img1} />
                                                    }
                                                </div>
                                                <div className='col-lg-3'>
                                                    {product.img2 &&
                                                        <img className='w-100' height={180} src={product.img2} />
                                                    }
                                                </div>
                                                <div className='col-lg-3'>
                                                    {product.img3 &&
                                                        <img className='w-100' height={180} src={product.img3} />
                                                    }
                                                </div>
                                                <div className='col-lg-3'>
                                                    {product.img4 &&
                                                        <img className='w-100' height={180} src={product.img4} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className='col-lg-3'>
                                    {/* price */}
                                    <h6 className='mt-4' style={{ fontFamily: "Righteous" }}>Price of the product</h6>
                                    <input value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} placeholder="Amount" type='number' className='form-control' style={{ backgroundColor: 'grey' }} />
                                </div>
                                <div className='col-lg-6'>
                                    {/* video */}
                                    <h6 className='mt-4' style={{ fontFamily: "Righteous" }}>Upload the video of the product</h6>
                                    <input value={product.video} onChange={(e) => setProduct({ ...product, video: e.target.value })} placeholder="Youtube Video URL" type='text' className='form-control' style={{ borderRadius: "35px 35px 35px 35px", backgroundColor: 'grey' }} />

                                </div>
                                <div className='col-lg-3'>


                                    <iframe width="408" height="209" src=
                                        {`https://www.youtube.com/embed/${product.video.slice(-11)}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                </div>

                                <div className='mt-5'>
                                    {/* submit button */}
                                    <button onClick={handleSubmit} style={{ width: "120px" }} className='btn  btn-success '>Submit</button>
                                </div>

                            </div>
                        </div>
                    </section>

                </>
            }

            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </div>
    )
}

export default Listing