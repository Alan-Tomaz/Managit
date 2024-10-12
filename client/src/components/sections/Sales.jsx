import React from 'react'
import ItemsCard from '../cards/ItemsCard'

function Sales({ handleOpenWindow, handleRemoveItem, reload }) {
    return (
        <>
            <ItemsCard option={5} handleOpenWindow={handleOpenWindow} handleRemoveItem={handleRemoveItem} reload={reload} />
        </>
    )
}

export default Sales
