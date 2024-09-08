import React from 'react'
import ItemsCard from '../cards/ItemsCard'

function Suppliers({ handleOpenWindow, handleRemoveItem }) {
    return (
        <>
            <ItemsCard option={3} handleOpenWindow={handleOpenWindow} handleRemoveItem={handleRemoveItem} />
        </>
    )
}

export default Suppliers
