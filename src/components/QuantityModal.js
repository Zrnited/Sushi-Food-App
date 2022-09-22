import React from 'react'
import '../cssFiles/modal.css'

const quantityModal = ({toggle, increaseCount, decreaseCount, count, addToCart, setToCart, isQuantitySet, disabled}) => {
  return (
    <div className='modal'>
        <div className='overlay' onClick={toggle}></div>
        <div className='modal-content'>
            <h1 className='modal-content-head'>Please specify quantity</h1>
            <div className='quantity-div'>
                <button onClick={decreaseCount}> - </button>
                <h1 className='count'> {count} </h1>
                <button onClick={increaseCount}> + </button>
            </div>
            <button onClick={addToCart} disabled={disabled} className='done'>Done</button>
            { isQuantitySet && <button onClick={setToCart} className='proceed'>Set to Cart</button>}     
        </div>
    </div>
  )
}

export default quantityModal