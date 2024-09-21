import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './CreateProducts.css';
import { useSelector } from 'react-redux';
import Loading from '../../assets/images/loading.svg';
import axios from 'axios';

function CreateSupplier({ closeWindow, item, option, id, showToastMessage, setReload }) {

    const [supplierName, setSupplierName] = useState(option == 1 ? item.supplierName : '');
    const [supplierDesc, setSupplierDesc] = useState(option == 1 ? item.description : '');
    const [reqError, setReqError] = useState('');

    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);

    const userInfo = useSelector((state) => state.UserReducer);

    const handleCreateSupplier = (e) => {
        e.preventDefault();

        const data = {
            supplierName,
            supplierDesc
        }

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        setReqError(<img src={Loading} />);

        axios.post(`${apiUrl}:${apiPort}/supplier/add`, data, {
            headers
        })
            .then((data) => {
                console.log(data);
                showToastMessage('success', 'Supplier Created Successfully');
                setReload();
                closeWindow();
            })
            .catch((err) => {
                console.log(err);
                setReqError(err.response.data.error);
            })
    }

    const handleUpdateSupplier = (e) => {
        e.preventDefault();

        const data = {
            supplierName,
            supplierDesc
        }

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        setReqError(<img src={Loading} />);

        axios.put(`${apiUrl}:${apiPort}/supplier/update/${id}`, data, {
            headers
        })
            .then((data) => {
                console.log(data);
                showToastMessage('success', 'Supplier Updated Successfully');
                setReload();
                closeWindow();
            })
            .catch((err) => {
                console.log(err);
                setReqError(err.response.data.error);
            })
    }

    return (
        <div className="create-products create-category create-supplier" >
            <div className="create-products__container create-category__container create-supplier__container">
                <div className="createinventory__close create-category__close create-products__close">
                    <IoClose onClick={closeWindow} />
                </div>
                <h2>{option == 0 ? 'Create Supplier' : option == 1 ? `Update Supplier` : ''}</h2>
                <form className='create-products__form product__form create-categories__form' onSubmit={(e) => option == 0 ? handleCreateSupplier(e) : option == 1 ? handleUpdateSupplier(e) : ''}>
                    <input type="text" name="product__name" id="product__name" className="create-products__input product__name" placeholder='Supplier Name:' onChange={(e) => setSupplierName(e.target.value)} value={supplierName} />
                    <textarea name="product__description" id="product__description" className='create-products__input product__description' placeholder='Supplier Description' onChange={(e) => setSupplierDesc(e.target.value)} value={supplierDesc}>{supplierDesc}</textarea>
                </form>
                <div className="create-products__error">
                    {reqError == '' ? '' : reqError}
                </div>
                <button className="button  create-category__button" onClick={(e) => option == 0 ? handleCreateSupplier(e) : option == 1 ? handleUpdateSupplier(e) : ''}>{option == 0 ? 'Create Supplier' : option == 1 ? 'Update Supplier' : ''}</button>
            </div>
        </div >
    )
}

export default CreateSupplier
