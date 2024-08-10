import React from 'react';
import { IoIosArrowDown } from "react-icons/io";
import './NewOrder.css';
import Tshirt from "../../assets/images/t-shirt.png"

function NewOrder() {
    return (
        <div className='new-order new-item'>
            <h4>New Order</h4>
            <div className="new-order__type new-item__type">
                <p>BUY</p>
                <IoIosArrowDown />
            </div>
            <div className="new-order__container new-type__container">
                <div className="new-order__form new-type__form">
                    <div className="new-order__buyprice new-type__inputbox">
                        <span>Buy Price</span>
                        <input type="text" />
                    </div>
                    <div className="new-order__buyprice new-type__inputbox">
                        <span>Status</span>
                        <div className="new-order__status"></div>
                    </div>
                    <div className="new-order__buyprice new-type__inputbox">
                        <span>Employee</span>
                        <div className="new-order__employee"></div>
                    </div>
                    <div className="new-order__buyprice new-type__inputbox">
                        <span>Description</span>
                        <textarea></textarea>
                    </div>
                </div>
                <div className="new-type__vl"></div>
                <div className="new-type__products">
                    <div className="new-type__header">
                        <h4>Products</h4>
                        <div className="new-type__add"></div>
                    </div>
                    <div className="new-type__productslist">
                        <img src={Tshirt} alt="" className='new-type__product-img' />
                        <p className='new-type__product-name'>Example</p>
                        <p className='new-type__product-qnt'>1</p>
                        <div className="new-type__product-remove"></div>
                        <div className="new-type__product-add"></div>
                    </div>
                </div>
            </div>
            <div className="button new-order__button new-type__button">Add Order</div>
        </div>
    )
}

export default NewOrder
