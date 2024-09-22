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
            <h2 className="remove-item__title">Remove {option == 2 ? 'Category' : option == 3 ? "Supplier" : option == 10 ? 'Categories' : option == 11 ? "Suppliers" : ''}</h2>
            <p className="remove-item__description">Are you sure you want to remove the following {option == 2 ? 'category' : option == 3 ? 'supplier' : option == 10 ? 'categories' : option == 11 ? 'suppliers' : ''}?</p>
            < p className="remove-item__item">{option == 2 ? item.categoryName : option == 3 ? item.supplierName : option == 10 ? item.map((elem) => elem.categoryName).join(", ") : option == 11 ? item.map((elem) => elem.supplierName).join(", ") : ''}</p>
            <div className="remove-item__buttons">
                <div className="button remove-item__button remove-item__button--remove" onClick={handleRemoveItem}>Remove {option == 2 ? 'Category' : option == 3 ? "Supplier" : option == 10 ? 'Categories' : option == 11 ? 'Suppliers' : ''}</div>
                <div className="button remove-item__button" onClick={closeWindow}>Cancel</div>
            </div>
        </div>
    )
}

export default RemoveItem
