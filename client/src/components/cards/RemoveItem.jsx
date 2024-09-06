import React from 'react'
import './RemoveItem.css';
import Remove from '../../assets/images/remove.png'
import { IoClose } from 'react-icons/io5';

function RemoveItem({ closeWindow }) {
    return (
        <div className="remove-item">
            <IoClose className='remove-item__close' onClick={closeWindow} />
            <img src={Remove} alt="remove" className='remove-item__img' />
            <h2 className="remove-item__title">Lorem, ipsum.</h2>
            <p className="remove-item__description">Lorem ipsum dolor sit amet:</p>
            <p className="remove-item__item">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="remove-item__buttons">
                <div className="button remove-item__button remove-item__button--remove">Delete Item</div>
                <div className="button remove-item__button" onClick={closeWindow}>Cancel</div>
            </div>
        </div>
    )
}

export default RemoveItem
