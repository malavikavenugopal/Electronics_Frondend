import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'


//to create contextapi we use the method - createContext()
export const editProductResponseContext = createContext()

function ContextShare({children}) {


    const [editProductResponse,setEditProductResponse] = useState({})
    

  return (
    //children is a predefined props used to share data between all components

    <>
    <editProductResponseContext.Provider value={{editProductResponse,setEditProductResponse}}>
      {children}
    </editProductResponseContext.Provider>

    </>
  )
}

export default ContextShare