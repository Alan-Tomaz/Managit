import React from 'react'
import ItemsCard from '../cards/ItemsCard'

function Suppliers({ handleOpenWindow, handleRemoveItem, reload }) {
    return (
        <>
            <ItemsCard option={3} handleOpenWindow={handleOpenWindow} handleRemoveItem={handleRemoveItem} reload={reload} />
        </>
    )
}

export default Suppliers
