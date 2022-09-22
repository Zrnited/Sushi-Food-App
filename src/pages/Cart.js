import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import '../cssFiles/cart.css'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import menu from '../assets/menu.svg';
import shoppingcart from '../assets/shoppingcart.svg';
import vector from '../assets/Vector.svg';


const handleFoodData = ()=>{
  const user = JSON.parse(sessionStorage.getItem('cart'));
  return user
}

const Cart = () => {

  const [foodArray, setFoodArray] = React.useState([]);
  const [formData, setFormData] = React.useState({
    bankName: '',
    bankCardNumber: '',
    cardCVV: '',
    cardPIN: ''
  })
  
  const foodItems = handleFoodData(); 

  // const [foodArray, setFoodArray] = React.useState(foodItems)
  const [isEligible, setIsEligible] = React.useState(false);

  let total = 0;

  React.useEffect(()=>{
    if(foodItems){
      setFoodArray(foodItems)
    } 
  }, []) 
  
  const subTotal = foodArray.map((item)=>{
    return item.subtotal
  })

  for(let num of subTotal){
    total = total + num;
  }
  

  //BRINGING UP THE PAYMENT DIV
  const handleEligibility = ()=>{
    if(foodArray.length !== 0){
      alert('Kindly make your payments below.')
      setIsEligible(true);
    } else {
      alert('Kindly place orders before making payments.')
      return
    }
  }

  
  const removeBtn = (item)=>{
    const selectedID = item.id
    setFoodArray((prevArray)=>{
      return prevArray.filter((current)=>{
        return (
          current.id !== selectedID
        )
      })
    })
  }

  React.useEffect(()=>{
    window.sessionStorage.setItem('cart', JSON.stringify(foodArray))
  }, [foodArray])


  const handleChange = (event)=>{
    // console.log(event.target);
    const {name, value} = event.target
    setFormData((prevState)=>{  
      return {
        ...prevState,
        [name]: value
      }
    })
  }
  // console.log(formData);

  const handleForm = (e)=>{
    e.preventDefault()
    if(formData.bankCardNumber === isNaN || formData.bankName !== '' || formData.cardCVV === isNaN || formData.cardPIN === isNaN){
      alert('Payment successful');
      setInterval(()=>{
        window.location = '/'
      }, 500)
    } else {
      alert('please input correctly')
      return
    }
  }

  return (
    <div>

      <Navbar />

      <div className='whatever'>
            <ul>
                <li>
                    <Link to={'/'}>
                        <img src={logo} alt={'logo'}/>
                    </Link>
                </li>

                <li className='home-btn'>
                    <Link to={'/'}>
                        <img src={vector} alt={'logo'}/>
                    </Link>
                </li>

                <li className='menu-list-icon'>
                    <Link to={'/menu'}>
                        <img src={menu} alt={'logo'}/>
                    </Link>
                </li>

                <li className='cart-btn'>
                    <Link to={'/cart'}>
                        <img src={shoppingcart} alt={'logo'}/>
                    </Link>
                </li>
            </ul>
        </div>

        <div className='cart'>
          
          <h1 className='cart-h1'>Cart</h1>
          <hr className='cart-hr'/>

          <div className='cart-body-div'>
            
            <div className={ foodArray.length === 0 ? 'cart-items disabled' : 'cart-items'}>
              {
                foodArray && foodArray?.map((item, index)=>{
                  return (
                    <div className={ foodArray.length === 0 ?'food-details disabled' : 'food-details'} key={index}>
                      <img src={item.img} alt='food_img' />
                      <div className='food-name'>
                        <h3>{item.name}</h3>
                        <p>${item.price}.00</p>
                      </div>
                      <div>
                        <button className='quantity'> {item.quantity} </button>
                      </div>

                      <button onClick={()=>removeBtn(item)} className='remove-btn'> 
                        <i> <AiOutlineClose /> </i>
                      </button>
                  </div>
                  )
                })
              }
              <p className={ foodArray.length === 0 ? 'no-items enabled' : 'no-items'}>Your cart items will display here as soon as it is being added.</p>
            </div>

            <div className='cart-info-div'>
              <div className='subtotal-div'>
                  <h1>Your Subtotal</h1>
                  <p>Subtotal  <strong>${total.toLocaleString(undefined, {maximumFractionDigits:2})}.00</strong></p>
                  <button onClick={handleEligibility}>Proceed to payment</button>
              </div>
              <div className='promo-code-div'>
                <h1>Promo Code</h1>
                <form>
                  <input 
                    type={'textbox'}
                    placeholder={'enter promo code'}
                    required
                  />
                  <button>Apply</button>
                </form>
              </div>
            </div>

          </div>

          {/* PAYMENT DIV */}

          { isEligible && (
            <div className='payment-div'>
              <form onSubmit={handleForm}>
                <div>
                  <div>
                    <label>Bank name*</label>
                    <input 
                      type={'textbox'}
                      placeholder={'Bank name here...'}
                      name = {'bankName'}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Card number*</label>
                    <input 
                      type={'textbox'}
                      placeholder={'Bank card number here...'}
                      name = {'bankCardNumber'}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>


                <div>
                  <div>
                    <label>Card CVV*</label>
                    <input 
                      type={'textbox'}
                      placeholder={'Card CVV here...'}
                      name = {'cardCVV'}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Card PIN*</label>
                    <input 
                      type={'password'}
                      placeholder={'PIN goes here...'}
                      name = {'cardPIN'}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button className='pay-btn'>Pay</button>
              </form>
            </div>
            ) 
          }

          <p className='foot-text'>Copyright © 2021 Sushi Restaurant</p>
        </div>
    </div>
  )
}

export default Cart