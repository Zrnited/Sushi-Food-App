import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import menu from '../assets/menu.svg';
import shoppingcart from '../assets/shoppingcart.svg';
import vector from '../assets/Vector.svg';
import '../cssFiles/menu.css'


const Navbar = () => {

  return (
        <div className='navbar'>
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
  )
}

export default Navbar