import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoMdArrowDropdown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import './NewOrder.css';
import Tshirt from "../../assets/images/t-shirt.png"
import { FaPlus } from "react-icons/fa6";
import { MdRemove } from "react-icons/md";

function NewOrder({ closeWindow }) {

    const productQuantity = [0, 0]

    const [showOrderTypes, setShowOrderTypes] = useState(false)
    const [showEmployees, setShowEmployees] = useState(false)
    const [showOrderStatus, setShowOrderStatus] = useState(false)
    const [orderStatus, setOrderStatus] = useState('Finished')
    const [employeesSelect, setEmployeesSelect] = useState('abc-outfits')
    const [orderType, setOrderType] = useState('buy');
    const [productQnt, setProductQnt] = useState(productQuantity);

    const handleDecreaseProduct = (index) => {

        const newProductQnt = [...productQnt];
        newProductQnt[index] -= 1;
        setProductQnt(newProductQnt);
    }

    const handleIncreaseProduct = (index) => {
        const newProductQnt = [...productQnt];
        newProductQnt[index] += 1;
        setProductQnt(newProductQnt);
    }

    useEffect(() => {
        /* CLOSE WINDOW WHEN CLICK OUTSIDE */
        const handleClickOutside = (event) => {
            if (orderTypeRef.current && !orderTypeRef.current.contains(event.target)) {
                setShowOrderTypes(false)
            }

            if (orderStatusRef.current && !orderStatusRef.current.contains(event.target)) {
                setShowOrderStatus(false)
            }

            if (employeeSelectionRef.current && !employeeSelectionRef.current.contains(event.target)) {
                setShowEmployees(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    const orderTypeRef = useRef(null);
    const orderStatusRef = useRef(null);
    const employeeSelectionRef = useRef(null);

    return (
        <div className='new-order new-item'>
            <div className="new-type__first-row">
                <h4>New Order</h4>
                <IoMdClose className='new-type__close' onClick={closeWindow} />
            </div>
            <div className={"new-order__type new-item__type" + ' ' + (orderType == 'buy' ? 'new-order__type--buy' : 'new-order__type--sale')} ref={orderTypeRef} onClick={() => setShowOrderTypes(!showOrderTypes)}>
                <p>{orderType == 'buy' ? (<>BUY</>) : (<>SALE</>)}</p>
                <IoIosArrowDown style={{ display: showOrderTypes == false ? 'inline-block' : 'none' }} />
                <IoIosArrowUp style={{ display: showOrderTypes == true ? 'inline-block' : 'none' }} />
                <div className="new-order__type-selection" style={{ display: showOrderTypes == true ? 'flex' : 'none' }} >
                    <p className='new-order__type-selection__buy' onClick={() => setOrderType('buy')}>BUY</p>
                    <IoMdArrowDropup className='new-order__type-arrow' style={{ display: showOrderTypes == true ? 'flex' : 'none' }} />
                    <p className='new-order__type-selection__sale' onClick={() => setOrderType('sale')}>SALE</p>
                </div>
            </div>


            <div className="new-order__container new-type__container">
                <div className="new-order__form new-type__form">
                    <div className="new-order__buyprice new-type__inputbox" id='new-type__input1'>
                        <span>{orderType == 'buy' ? 'Buy Price' : 'Sale Price'}</span>
                        <input type="number" className='new-type__inputbox__input' value={0} />
                    </div>
                    <div className="new-order__buyprice new-type__inputbox" id='new-type__input2'>
                        <span>Status</span>
                        <div className="new-order__status" ref={orderStatusRef} onClick={() => setShowOrderStatus(!showOrderStatus)}>
                            <span>{orderStatus}</span>
                            <IoMdArrowDropdown style={{ display: showOrderStatus == true ? 'none' : 'inline-block' }} className='new-order__status__arr' />
                            <IoMdArrowDropup style={{ display: showOrderStatus == false ? 'none' : 'inline-block' }} className='new-order__status__arr' />
                            <div className="new-order__status-selection" style={{ display: showOrderStatus == true ? 'flex' : 'none' }} >
                                <p onClick={() => setOrderStatus('Finished')}>Finished</p>
                                <p onClick={() => setOrderStatus('In Progress')}>In Progress</p>
                                <IoMdArrowDropup className='new-order__status__arrow' style={{ display: showOrderStatus == true ? 'flex' : 'none' }} />
                            </div>
                        </div>
                    </div>
                    <div className="new-order__buyprice new-type__inputbox" id='new-type__input3'>
                        <span>Employee</span>
                        <div className="new-order__status new-order__employee" ref={employeeSelectionRef} onClick={() => setShowEmployees(!showEmployees)}>
                            <span>{employeesSelect.replace('-', ' ').toUpperCase()}</span>
                            <IoMdArrowDropdown style={{ display: showEmployees == true ? 'none' : 'inline-block' }} className='new-order__status__arr' />
                            <IoMdArrowDropup style={{ display: showEmployees == false ? 'none' : 'inline-block' }} className='new-order__status__arr' />
                            <div className="new-order__status-selection" style={{ display: showEmployees == true ? 'flex' : 'none' }} >
                                <p onClick={() => setEmployeesSelect("abc-outfits")}>{employeesSelect.replace('-', ' ').toUpperCase()}</p>
                                <p onClick={() => setEmployeesSelect("abc-outfit")}>{employeesSelect.replace('-', ' ').toUpperCase()}</p>
                                <p onClick={() => setEmployeesSelect("abc-outfi")}>{employeesSelect.replace('-', ' ').toUpperCase()}</p>
                                <p onClick={() => setEmployeesSelect("abc-outf")}>{employeesSelect.replace('-', ' ').toUpperCase()}</p>
                                <IoMdArrowDropup className='new-order__status__arrow' style={{ display: showEmployees == true ? 'flex' : 'none' }} />
                            </div>
                        </div>
                    </div>
                    <div className="new-order__buyprice__textarea new-type__inputbox" id='new-type__input4'>
                        <span>Description</span>
                        <textarea className='new-type__inputbox__input' ></textarea >
                    </div>
                </div>
                <div className="new-type__vl"></div>
                <div className="new-type__products">
                    <div className="new-type__header">
                        <h4>Products</h4>
                        <div className="new-type__add">
                            <FaPlus />
                        </div>
                    </div>
                    <div className="new-type__productslist">
                        <img src={Tshirt} alt="" className='new-type__product-img' />
                        <p className='new-type__product-name'>Example</p>
                        <p className='new-type__product-qnt'>{productQnt[0]}</p>
                        <div className="new-type__product-remove new-type__product-button" onClick={() => handleDecreaseProduct(0)}>
                            <MdRemove />
                        </div>
                        <div className="new-type__product-add new-type__product-button" onClick={() => handleIncreaseProduct(0)}>
                            <FaPlus />
                        </div>
                    </div>
                    <div className="new-type__productslist">
                        <img src={Tshirt} alt="" className='new-type__product-img' />
                        <p className='new-type__product-name'>Example</p>
                        <p className='new-type__product-qnt'>{productQnt[1]}</p>
                        <div className="new-type__product-remove new-type__product-button" onClick={() => handleDecreaseProduct(1)}>
                            <MdRemove />
                        </div>
                        <div className="new-type__product-add new-type__product-button" onClick={() => handleIncreaseProduct(1)}>
                            <FaPlus />
                        </div>
                    </div>
                </div>
            </div>
            <div className="button new-order__button new-type__button">Add Order</div>
        </div >
    )
}

export default NewOrder
