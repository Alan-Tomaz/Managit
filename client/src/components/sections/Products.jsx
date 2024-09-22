import React from 'react'
import ItemsCard from '../cards/ItemsCard'

function Products({ handleOpenWindow, handleRemoveItem, reload }) {
    return (
        <>
            <ItemsCard option={1} handleOpenWindow={handleOpenWindow} handleRemoveItem={handleRemoveItem} reload={reload} />
        </>
    )
}

export default Products
