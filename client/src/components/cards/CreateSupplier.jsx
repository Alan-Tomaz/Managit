import React from 'react';
import { IoClose } from 'react-icons/io5';
import './CreateProducts.css';

function CreateSupplier({ closeWindow }) {
    return (
        <div className="create-products create-category create-supplier" >
            <div className="create-products__container create-category__container create-supplier__container">
                <div className="createinventory__close create-category__close create-products__close">
                    <IoClose onClick={closeWindow} />
                </div>
                <h2>Create Supplier</h2>
                <input type="text" name="product__name" id="product__name" className="create-products__input product__name" placeholder='Supplier Name:' />
                <textarea name="product__description" id="product__description" className='create-products__input product__description' placeholder='Supplier Description'></textarea>
                <button className="button  create-category__button">Create Supplier</button>
            </div>
        </div >
    )
}

export default CreateSupplier
