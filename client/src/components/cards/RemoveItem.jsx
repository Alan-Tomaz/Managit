import React from 'react'
import './RemoveItem.css';
import Remove from '../../assets/images/remove.png'
import { IoClose } from 'react-icons/io5';
import axios from 'axios'
import { useSelector } from 'react-redux';

function RemoveItem({ closeWindow, item, option, id, showToastMessage, setReload }) {

    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);

    const userInfo = useSelector((state) => state.UserReducer);

    const handleRemoveItem = () => {
        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        switch (option) {
            case 1:
                axios.delete(`${apiUrl}:${apiPort}/product/remove/${id}`, ({
                    headers
                }))
                    .then((data) => {
                        showToastMessage('success', data.data.msg);
                        closeWindow();
                        setReload()
                    }).catch((err) => {
                        console.log(err);
                        showToastMessage('error', err.response.data.error)
                        closeWindow();
                    })
                break;
            case 2:
                axios.delete(`${apiUrl}:${apiPort}/category/remove/${id}`, ({
                    headers
                }))
                    .then((data) => {
                        showToastMessage('success', data.data.msg);
                        closeWindow();
                        setReload()
                    }).catch((err) => {
                        console.log(err);
                        showToastMessage('error', err.response.data.error)
                        closeWindow();
                    })
                break;
            case 3:
                axios.delete(`${apiUrl}:${apiPort}/supplier/remove/${id}`, ({
                    headers
                }))
                    .then((data) => {
                        showToastMessage('success', data.data.msg);
                        closeWindow();
                        setReload()
                    }).catch((err) => {
                        console.log(err);
                        showToastMessage('error', err.response.data.error)
                        closeWindow();
                    })
                break;
            case 9:
                axios.delete(`${apiUrl}:${apiPort}/product/remove/many/`, ({
                    headers,
                    params: { idsToDelete: id }
                }))
                    .then((data) => {
                        showToastMessage('success', data.data.msg);
                        closeWindow();
                        setReload();
                    })
                    .catch((err) => {
                        showToastMessage('error', err.response.data.error)
                        closeWindow();
                    })
                break;
            case 10:
                axios.delete(`${apiUrl}:${apiPort}/category/remove/many/`, ({
                    headers,
                    params: { idsToDelete: id }
                }))
                    .then((data) => {
                        showToastMessage('success', data.data.msg);
                        closeWindow();
                        setReload();
                    })
                    .catch((err) => {
                        showToastMessage('error', err.response.data.error)
                        closeWindow();
                    })
                break;
            case 11:
                axios.delete(`${apiUrl}:${apiPort}/supplier/remove/many/`, ({
                    headers,
                    params: { idsToDelete: id }
                }))
                    .then((data) => {
                        showToastMessage('success', data.data.msg);
                        closeWindow();
                        setReload();
                    })
                    .catch((err) => {
                        showToastMessage('error', err.response.data.error)
                        closeWindow();
                    })
                break;
        }
    }

    return (
        <div className="remove-item">
            <IoClose className='remove-item__close' onClick={closeWindow} />
            <img src={Remove} alt="remove" className='remove-item__img' />
            <h2 className="remove-item__title">Remove {option == 1 ? 'Product' : option == 2 ? 'Category' : option == 3 ? "Supplier" : option == 4 ? "Order" : option == 9 ? 'Products' : option == 10 ? 'Categories' : option == 11 ? "Suppliers" : option == 12 ? "Orders" : ''}</h2>
            <p className="remove-item__description">Are you sure you want to remove the following {option == 1 ? 'product' : option == 2 ? 'category' : option == 3 ? 'supplier' : option == 4 ? 'order' : option == 9 ? 'products' : option == 10 ? 'categories' : option == 11 ? 'suppliers' : option == 12 ? 'orders' : ''}?</p>
            < p className="remove-item__item">{option == 1 ? item.productName : option == 2 ? item.categoryName : option == 3 ? item.supplierName : option == 4 ? item.uniqueId : option == 9 ? item.map((elem) => elem.productName).join(", ") : option == 10 ? item.map((elem) => elem.categoryName).join(", ") : option == 11 ? item.map((elem) => elem.supplierName).join(", ") : option == 12 ? item.map((elem) => elem.uniqueId).join(", ") : ''}</p>
            <div className="remove-item__buttons">
                <div className="button remove-item__button remove-item__button--remove" onClick={handleRemoveItem}>Remove {option == 1 ? 'Product' : option == 2 ? 'Category' : option == 3 ? "Supplier" : option == 4 ? "Order" : option == 9 ? 'Products' : option == 10 ? 'Categories' : option == 11 ? 'Suppliers' : option == 12 ? 'Orders' : ''}</div>
                <div className="button remove-item__button" onClick={closeWindow}>Cancel</div>
            </div>
        </div>
    )
}

export default RemoveItem
