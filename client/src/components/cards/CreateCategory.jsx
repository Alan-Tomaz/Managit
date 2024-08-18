import React from 'react';
import { IoClose } from 'react-icons/io5';
import './CreateProducts.css';

function CreateCategory({ closeWindow }) {
    return (
        <div className="create-products create-category" >
            <div className="create-products__container create-category__container">
                <div className="createinventory__close create-category__close create-products__close">
                    <IoClose onClick={closeWindow} />
                </div>
                <h2>Create Category</h2>
                <input type="text" name="product__name" id="product__name" className="create-products__input product__name" placeholder='Category Name:' />
                <textarea name="product__description" id="product__description" className='create-products__input product__description' placeholder='Category Description'></textarea>
                <button className="button  create-category__button">Create Category</button>
            </div >
        </div>
    )
}

export default CreateCategory
