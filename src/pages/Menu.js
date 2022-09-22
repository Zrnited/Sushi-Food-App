import React from 'react'
import '../cssFiles/menu.css'
import { foodData } from '../components/MenuData';
import Navbar from '../components/Navbar';
import QuantityModal from '../components/QuantityModal';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import menu from '../assets/menu.svg';
import shoppingcart from '../assets/shoppingcart.svg';
import vector from '../assets/Vector.svg';

const Menu = () => {

    const [filtedArray, setFiltedArray] = React.useState(foodData.filter((current)=>{
        return current.starRating !== 4;
    }))
    // console.log(filtedArray.);

    const [hasLoad, setHasLoad] = React.useState(true);
    const [modal, setModal] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const [tempArray, setTempArray] = React.useState([])
    const [isQuantitySet, setIsQuantitySet] = React.useState(false);

    //CREATING A STATE TO HANDLE DATA ENTRY
    const [cartArray, setCartArray] = React.useState([]);

    const showModal = ()=>{
        setModal((prevState)=>{
            if(prevState === true){
                setCount(0);
                return false
            } else {
                return true
            }
        })
    }

    const increaseCount = ()=>{
        setCount((prevCount)=>{
            return prevCount + 1;
        })
    }
    // console.log(cartArray)

    const decreaseCount = ()=>{
        setCount((prevCount)=>{
            if (count <= 0){
                return 0
            } else {
                return (prevCount - 1);
            }
        })
    }


    //GET FOOD ITEM AND ADD TO CART
    const getFoodItem = (foodItem) => {
        //creating an object immediately a food item is clicked and passing in the clicked food details to the new object created.
        const selectedFood = {
            id: cartArray.length + 1,
            img: foodItem.food,
            name: foodItem.name,
            price: foodItem.price,

            //these should be subject to changes later on
            quantity: 0,
            subtotal: 0
        }
       
        //setting the object created to a temporary-already-declared array
        setTempArray(selectedFood);

        //next step for users to specify a quantity
        alert('Please specify a quantity in the next screen');

        // making the modal pop-up
        showModal()
    }
    // console.log(tempArray);

    //ADD THE ITEM TO CART
    const addToCart = ()=> {

        //check that quantity is not equal to zero. We have to reset the quantity and subsequently the sub total (cos it has to deal with the quantity, you know)
        if(count === 0){
           return alert('Kindly specify a quantity')
        } else {
            setTempArray(prevState => {
                return {
                    ...prevState,
                    quantity: count,
                    subtotal: (count * prevState.price)
                }
            })
            // console.log(tempArray);
        }
        setCount(0);
    }

    React.useEffect(()=>{
        if(tempArray.quantity === 0) {
            setIsQuantitySet(false) 
        } else {
            setIsQuantitySet(true);
        }

        // console.log(isQuantitySet);
    }, [tempArray])

    

    const setToCart = ()=> {
        setCartArray((prevState)=>{
            return [
                ...prevState,
                tempArray
            ]
        })
        setCount(0);
        setModal(false);
        alert('Order added to cart successfully');
        console.log(cartArray)
    }  

    React.useEffect(()=>{
        const data = window.sessionStorage.getItem('cart');
        if(data !== null){
            setCartArray(JSON.parse(data));
        }
    }, [])
    
    React.useEffect(()=>{
        if(cartArray.length > 0){
            window.sessionStorage.setItem('cart', JSON.stringify(cartArray));
        }
    }, [cartArray])
    
    
    
    
    const LoadMore = () =>{
        setHasLoad(!hasLoad);
        if(hasLoad){
            setFiltedArray(foodData.filter((current)=>{
                return current.starRating !== 10;
            }))
        } else {
            setFiltedArray(foodData.filter((current)=>{
                return current.starRating !== 4;
            }))
        }
    }
    

  return (
    <div className='menu'>
        
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

        <div className='top-layer'>
            <h1 className='menu-container-heading'>Sushi Foods</h1>
            <hr className='menu-hr'/>
            <div className='menu-container'>
                {
                    filtedArray && filtedArray?.map((item, index) =>{
                        return (
                            <>
                            <div onClick={()=>getFoodItem(item)} key={index} className='menu-card'>
                                <img src={item?.food} alt='food-img'/>
                                <p className='food-price'>${item?.price}.00</p>
                                <p>{item?.name}</p>
                            </div> 
                            </>
                        )
                    })
                }
            </div>
        </div>

        <div className='load-btn'>
            <button onClick={LoadMore}>{hasLoad ? 'load more' : 'collapse'}</button>
            <p className='foot-text'>Copyright © 2021 Sushi Restaurant</p>
        </div>
        

        {
            modal && (
                <QuantityModal
                    toggle={showModal}
                    increaseCount={increaseCount}
                    decreaseCount={decreaseCount}
                    count={count}
                    addToCart={addToCart}
                    setToCart={setToCart}
                    isQuantitySet={isQuantitySet}
                    disabled={isQuantitySet}
                />
            )
        }
        
    </div>
  )
}

export default Menu