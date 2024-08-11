import React from 'react';
import { IoClose } from 'react-icons/io5';
import './CreateProducts.css';

function CreateSupplier({ closeWindow }) {
    return (
        <div className="create-products create-category create-supplier" >
            <IoClose onClick={closeWindow} className='createinventory__close create-category__close' />
            <h2>Create Supplier</h2>
            <input type="text" name="product__name" id="product__name" className="create-products__input product__name" placeholder='Supplier Name:' />
            <textarea name="product__description" id="product__description" className='create-products__input product__description' placeholder='Supplier Description'></textarea>
            <button className="button  create-category__button">Create Supplier</button>
        </div >
    )
}

export default CreateSupplier
