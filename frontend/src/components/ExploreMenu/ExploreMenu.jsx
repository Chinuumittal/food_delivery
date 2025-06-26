import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setcategory}) => {
  return (
    <div className='explore-menu' id="explore-menu">
        <h1>Explore our menu</h1>
        <p className='explore-menu-text' >Please take a moment to browse the menu and select your favorite dish. Once you're ready, just click or tap on the item you'd like to order. Enjoy your meal! 🍽️</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
             return (
                <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} key ={index} className='explore-menu-list-item'>
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
                    <p>{item.menu_name}</p>
                    </div>
             )
            })}
        </div>
      
    </div>
  )
}

export default ExploreMenu
