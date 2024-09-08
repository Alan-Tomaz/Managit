import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './CreateProducts.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loading from '../../assets/images/loading.svg';

function CreateCategory({ closeWindow, item, option, id, showToastMessage, setReload }) {

    const [categoryName, setCategoryName] = useState(option == 1 ? item.categoryName : '');
    const [categoryDesc, setCategoryDesc] = useState(option == 1 ? item.description : '');
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
                setReload();
                closeWindow();
            })
            .catch((err) => {
                console.log(err);
                setReqError(err.response.data.error);
            })
    }

    const handleUpdateCategory = (e) => {
        e.preventDefault();

        const data = {
            categoryName,
            categoryDesc
        }

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        setReqError(<img src={Loading} />);

        axios.put(`${apiUrl}:${apiPort}/category/update/${id}`, data, {
            headers
        })
            .then((data) => {
                console.log(data);
                showToastMessage('success', 'Category Updated Successfully');
                setReload();
                closeWindow();
            })
            .catch((err) => {
                console.log(err);
                setReqError(err.response.data.error);
            })
    }

    return (
        <div className="create-products create-category" >
            <div className="create-products__container create-category__container">
                <div className="createinventory__close create-category__close create-products__close">
                    <IoClose onClick={closeWindow} />
                </div>
                <h2>{option == 0 ? 'Create Category' : option == 1 ? `Update Category` : ''}</h2>
                <form className='create-products__form product__form create-categories__form' onSubmit={(e) => handleCreateCategory(e)}>
                    <input type="text" name="product__name" id="product__name" className="create-products__input product__name" placeholder='Category Name:' onChange={(e) => setCategoryName(e.target.value)} value={categoryName} />
                    <textarea name="product__description" id="product__description" className='create-products__input product__description' placeholder='Category Description' onChange={(e) => setCategoryDesc(e.target.value)}>{categoryDesc}</textarea>
                </form>
                <div className="create-products__error">
                    {reqError == '' ? '' : reqError}
                </div>
                <button className="button  create-category__button" onClick={option == 0 ? handleCreateCategory : option == 1 ? handleUpdateCategory : ''}>{option == 0 ? 'Create Category' : option == 1 ? 'Update Category' : ''}</button>
            </div >
        </div>
    )
}

export default CreateCategory
