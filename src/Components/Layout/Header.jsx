import React from 'react'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
const Header = () => {
  return (
    <React.Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton/>
        </header>
        <div className={classes['main-image']}>
            <img src="https://cdn.vox-cdn.com/thumbor/3omm7pVNMn5yMH7LQQWGYTfvnhY=/125x0:2125x1500/1200x900/filters:focal(125x0:2125x1500):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/62559443/HanDynasty_MarketingAerial-0011__1_.0.0.0.jpeg" alt="" />
        </div>
    </React.Fragment>
  )
}

export default Header 