import React from 'react';
import { IoClose } from 'react-icons/io5';
import './CreateProducts.css';

function CreateCategory({ closeWindow }) {
    return (
        <div className="create-products create-category" >
            <IoClose onClick={closeWindow} className='createinventory__close create-category__close' />
            <h2>Create Category</h2>
            <input type="text" name="product__name" id="product__name" className="create-products__input product__name" placeholder='Category Name:' />
            <textarea name="product__description" id="product__description" className='create-products__input product__description' placeholder='Category Description'></textarea>
            <button className="button  create-category__button">Create Category</button>
        </div >
    )
}

export default CreateCategory
