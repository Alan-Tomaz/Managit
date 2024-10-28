import React from 'react'
import './MdTopProducts.css';
import TShirt from "../../assets/images/t-shirt.png";
import { useNavigate } from "react-router-dom";

function MdTopProducts({ isLast, text = "T-Shirt", img = TShirt, unity = 12 }) {

    const navigate = useNavigate()

    const handleLeaveSection = () => {
        navigate("/home/stock");
        window.location.reload();
    }

    return (
        <div className='MdTopProducts' onClick={handleLeaveSection}>
            <div className="MdTopProducts__product">
                <img src={img} alt="" />
                <p>{text}</p>
                <span>{unity} un</span>
            </div>
            <div className="MdTopProducts__line" style={{ display: isLast == true ? "none" : "inline-block" }} ></div>
        </div >
    )
}

export default MdTopProducts
