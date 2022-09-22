import React from 'react'
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import '../cssFiles/homepage.css'

const Homepage = () => {
  return (
    <div className='home'>
        <div className='home-image'>
            {/* <img className='image' src={restaurant} alt='home-img'/> */}
        </div>

        <div className='home-text'>
            <h1>Welcome to <strong>Sushi</strong> Restaurant</h1>
            <p className='welcome-text'>People eat with their eyes and Sushi creates an easy way for customers to order when they can see beautiful photos of your food.</p>

            <div className='home-text-action'>
                <Link to='/menu'><Button text={'Menu'}/></Link>
                <Link to='/cart'><Button text={'Cart'}/></Link>
            </div>
        </div>
    </div>
  )
}

export default Homepage