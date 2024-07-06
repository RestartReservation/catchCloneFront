import React from 'react';
import '../css/style.css';

const StoreMenu = ({storeMenu,isTab}) => {
    return(
        <div className='store-menu-space'> 
         <div className={`${!isTab ? 'store-menu-list-tab' : 'store-menu-list'}`} >
            <p className='menu-name'>{storeMenu.menuNm}</p> <p className='menu-price'>{storeMenu.menuPrice}</p>
        </div>
        <div className='div-space-short'></div>
        </div>     
    )
       
}

export default StoreMenu