import React from 'react'
import './MdTopProducts.css';
import TShirt from "../../assets/images/t-shirt.png";

function MdTopProducts({ isLast }) {
    return (
        <div className='MdTopProducts'>
            <div className="MdTopProducts__product">
                <img src={TShirt} alt="" />
                <p>T-Shirt</p>
                <span>12 un</span>
            </div>
            <div className="MdTopProducts__line" style={{ display: isLast == true ? "none" : "inline-block" }} ></div>
        </div >
    )
}

export default MdTopProducts
