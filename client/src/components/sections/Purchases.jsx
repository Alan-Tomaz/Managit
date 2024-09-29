import React from 'react'
import ItemsCard from '../cards/ItemsCard'

function Purchases({ handleOpenWindow, handleRemoveItem, reload }) {
    return (
        <>
            <ItemsCard option={4} handleOpenWindow={handleOpenWindow} handleRemoveItem={handleRemoveItem} reload={reload} />
        </>
    )
}

export default Purchases
