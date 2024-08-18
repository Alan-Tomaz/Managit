import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './CreateProducts.css';
import Product from '../../assets/images/product.png';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

function CreateProducts({ closeWindow }) {

    const [showCategories, setShowCategories] = useState(false);
    const [showEmployees, setShowEmployees] = useState(false);
    const [employee, setEmployee] = useState('abc outfits')
    const [category, setCategory] = useState('t-shirt')

    const categorySelectionRef = useRef(null);
    const employeeSelectionRef = useRef(null);

    const handleEditProduct = () => {
        document.getElementById('product__img').click();
    }

    useEffect(() => {
        /* CLOSE WINDOW WHEN CLICK OUTSIDE */
        const handleClickOutside = (event) => {
            if (categorySelectionRef.current && !categorySelectionRef.current.contains(event.target)) {
                setShowCategories(false)
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

    return (
        <div className="create-products" >
            <div className="create-products__container">
                <div className="create-products__close">
                    <IoClose onClick={closeWindow} />
                </div>
                <h2>Create Product</h2>
                <div className="create-products__img-box">
                    <img src={Product} alt="" className="create-products__img" />
                    <FaRegEdit className='create-products__changeimg' onClick={handleEditProduct} />
                    <input type="file" name="product__img" id="product__img" className='create-products__img-input' />
                </div>
                <div className="create-products__form">
                    <input type="text" name="product__name" id="product__name" className="create-products__input product__name" placeholder='Product Name:' />
                    <div className="product__category" id='product__category' ref={categorySelectionRef} onClick={() => setShowCategories(!showCategories)}>
                        <span>{category.toUpperCase()}</span>
                        <IoMdArrowDropdown style={{ display: showCategories == false ? 'flex' : 'none' }} className='product__category-icon' />
                        <IoMdArrowDropup style={{ display: showCategories == true ? 'flex' : 'none' }} className='product__category-icon' />
                        <div className="product__category__options" style={{ display: showCategories == true ? 'flex' : 'none' }}>
                            <p onClick={() => setCategory('t-shirt')}>T-SHIRT</p>
                            <IoMdArrowDropup className='product__category__options-arrow' />
                            <p onClick={() => setCategory('shoes')}>SHOES</p>
                        </div>
                    </div>
                    <div className="product__suppliers product__category" id='product__supplier' ref={employeeSelectionRef} onClick={() => setShowEmployees(!showEmployees)}>
                        <span>{employee.toUpperCase()}</span>
                        <IoMdArrowDropdown style={{ display: showEmployees == false ? 'flex' : 'none' }} className='product__category-icon' />
                        <IoMdArrowDropup style={{ display: showEmployees == true ? 'flex' : 'none' }} className='product__category-icon' />
                        <div className="product__suppliers__options product__category__options" style={{ display: showEmployees == true ? 'flex' : 'none' }}>
                            <p onClick={() => setEmployee('abc outfits')}>ABC OUTFITS</p>
                            <IoMdArrowDropup className='product__category__options-arrow' />
                            <p onClick={() => setEmployee('007 shoes')}>007 SHOES</p>
                        </div>
                    </div>
                    <div className="product__vl"></div>
                    <input type="number" name="" id="product__sellprice" className="product__sellprice create-products__input" placeholder='Sell Price' />
                    <textarea name="product__description" id="product__description" className='create-products__input product__description' placeholder='Product Description'></textarea>
                </div>
                <button className="button  create-products__button">Create Product</button>
            </div>
        </div>
    )
}

export default CreateProducts
