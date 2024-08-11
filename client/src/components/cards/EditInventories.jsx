import React, { useState } from 'react';
import './EditInventories.css';
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoClose, IoEnterOutline } from "react-icons/io5";

function EditInventories({ closeWindow, showCreateInv = false, showEditInv = true, showEnterInv = false }) {

    const [showEditInventory, setShowEditInventory] = useState(showEditInv);
    const [showCreateInventory, setShowCreateInventory] = useState(showCreateInv);
    const [showEnterInventory, setShowEnterInventory] = useState(showEnterInv);

    const [disableButtons, setDisableButtons] = useState(false);

    const handleShowCreateInventory = () => {
        setShowCreateInventory(true)
        setDisableButtons(true)
    }

    const handleHideCreateInventory = () => {
        setShowCreateInventory(false)
        setDisableButtons(false)
    }

    const handleShowEnterInventory = () => {
        setShowEnterInventory(true)
        setDisableButtons(true)
    }

    const handleHideEnterInventory = () => {
        setShowEnterInventory(false)
        setDisableButtons(false)
    }

    return (
        <>
            <div className="editinventories" style={{ display: showEditInventory == true ? 'flex' : 'none' }}>
                <IoClose className='editinventories__close' onClick={closeWindow} />
                <h2>Inventories</h2>
                <div className="editinventories__inventories__box">

                    <div className="editinventories__inventories editinventories__row1">
                        <div className="editinventories__row">
                            <span>Inventory 1</span>
                            <div className="editinventories__members">
                                <FaUser className='editinventories__members-icon' />
                                <span>3</span>
                            </div>
                        </div>
                        <div className="editinventories__row editinventories__row2">
                            <span>ID: 5652592995599</span>
                        </div>
                        <div className="editinventories__row editinventories__row3">
                            <div className="editinventories__details">
                                <div className="editinventories__buy editinventories__detail">
                                    <MdOutlineShoppingCart className='editinventories__detail__icon' id='editinventories__detail__icon-1' />
                                    <span>24</span>
                                </div>
                                <div className="editinventories__stock editinventories__detail">
                                    <BsBoxSeam className='editinventories__detail__icon' id='editinventories__detail__icon-2' />
                                    <span>3</span>
                                </div>
                                <div className="editinventories__sale editinventories__detail">
                                    <RiMoneyDollarCircleLine className='editinventories__detail__icon' id='editinventories__detail__icon-3' />
                                    <span>5</span>
                                </div>
                            </div>
                            <IoEnterOutline className='editinventories__enter' />
                        </div>
                    </div>
                    <div className="editinventories__inventories editinventories__row1">
                        <div className="editinventories__row">
                            <span>Inventory 1</span>
                            <div className="editinventories__members">
                                <FaUser className='editinventories__members-icon' />
                                <span>3</span>
                            </div>
                        </div>
                        <div className="editinventories__row editinventories__row2">
                            <span>ID: 5652592995599</span>
                        </div>
                        <div className="editinventories__row editinventories__row3">
                            <div className="editinventories__details">
                                <div className="editinventories__buy editinventories__detail">
                                    <MdOutlineShoppingCart className='editinventories__detail__icon' id='editinventories__detail__icon-1' />
                                    <span>24</span>
                                </div>
                                <div className="editinventories__stock editinventories__detail">
                                    <BsBoxSeam className='editinventories__detail__icon' id='editinventories__detail__icon-2' />
                                    <span>3</span>
                                </div>
                                <div className="editinventories__sale editinventories__detail">
                                    <RiMoneyDollarCircleLine className='editinventories__detail__icon' id='editinventories__detail__icon-3' />
                                    <span>5</span>
                                </div>
                            </div>
                            <IoEnterOutline className='editinventories__enter' />
                        </div>
                    </div>
                </div>
                <span>Or</span>
                <div className="editinventories__buttons">
                    <button className={"button editinventory__button" + ' ' + (disableButtons == true ? 'button--disable' : '')} onClick={disableButtons == false ? handleShowCreateInventory : ''}>Create a inventory</button>
                    <button className={"button button--outlined editinventory__button" + ' ' + (disableButtons == true ? 'button--outlineddisable' : '')} onClick={disableButtons == false ? handleShowEnterInventory : ''}>Enter in a inventory</button>
                </div>
                <div className="modal__window modal__createinventory">
                    <IoClose />
                    <h2>Inventories</h2>
                    <input type="text" name="createinvenory__name" id="createinvenory__name" className="createinvenory__name" placeholder='Name:' />
                    <input type="password" name="createinvenory__password" id="createinvenory__password" className="createinvenory__password" placeholder='Password:' />
                    <input type="password" name="createinvenory__confirmpassword" id="createinvenory__confirmpassword" className="createinvenory__confirmpassword" placeholder='Confirm Password:' />
                </div>
            </div>
            <div className="createinventory" style={{ display: showCreateInventory == true ? 'flex' : 'none' }}>
                <IoClose onClick={handleHideCreateInventory} className='createinventory__close' />
                <h2>Create a new Inventory</h2>
                <input type="text" name="createinvenory__name" id="createinvenory__name" className="createinvenory__name" placeholder='Name:' />
                <input type="password" name="createinvenory__password" id="createinvenory__password" className="createinvenory__password" placeholder='Password:' />
                <input type="password" name="createinvenory__confirmpassword" id="createinvenory__confirmpassword" className="createinvenory__confirmpassword" placeholder='Confirm Password:' />
                <button className="button  createinventory__button">Create Inventory</button>
            </div>
            <div className="enterinventory createinventory" style={{ display: showEnterInventory == true ? 'flex' : 'none' }}>
                <IoClose onClick={handleHideEnterInventory} className='createinventory__close' />
                <h2>Enter in a new inventory</h2>
                <input type="text" name="enterinventory__id" id="enterinventory__id" className="enterinventory__id" placeholder='ID:' />
                <input type="password" name="enterinventory__password" id="enterinventory__password" className="enterinventory__password" placeholder='Password:' />
                <button className="button  enterinventory__button">Enter Inventory</button>
            </div>
        </>
    )
}

export default EditInventories
