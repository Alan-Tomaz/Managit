import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './CreateProducts.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loading from '../../assets/images/loading.svg';

function CreateCategory({ closeWindow, showToastMessage }) {

    const [categoryName, setCategoryName] = useState('');
    const [categoryDesc, setCategoryDesc] = useState('');
    const [reqError, setReqError] = useState('');

    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);

    const userInfo = useSelector((state) => state.UserReducer);

    const handleCreateCategory = (e) => {
        e.preventDefault();

        const data = {
            categoryName,
            categoryDesc
        }

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        setReqError(<img src={Loading} />);

        axios.post(`${apiUrl}:${apiPort}/category/add`, data, {
            headers
        })
            .then((data) => {
                console.log(data);
                showToastMessage('success', 'Category Created Successfully');
                closeWindow();
            })
            .catch((err) => {
                console.log(err);
                if (err.response.data.status == 401) {
                    setReqError(err.response.data.msg);
                }
            })
    }

    return (
        <div className="create-products create-category" >
            <div className="create-products__container create-category__container">
                <div className="createinventory__close create-category__close create-products__close">
                    <IoClose onClick={closeWindow} />
                </div>
                <h2>Create Category</h2>
                <form className='create-products__form product__form create-categories__form' onSubmit={(e) => handleCreateCategory(e)}>
                    <input type="text" name="product__name" id="product__name" className="create-products__input product__name" placeholder='Category Name:' onChange={(e) => setCategoryName(e.target.value)} />
                    <textarea name="product__description" id="product__description" className='create-products__input product__description' placeholder='Category Description' onChange={(e) => setCategoryDesc(e.target.value)}></textarea>
                </form>
                <div className="create-products__error">
                    {reqError == '' ? '' : reqError}
                </div>
                <button className="button  create-category__button" onClick={handleCreateCategory}>Create Category</button>
            </div >
        </div>
    )
}

export default CreateCategory
