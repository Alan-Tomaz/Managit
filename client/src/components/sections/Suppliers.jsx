import React from 'react'
import ItemsCard from '../cards/ItemsCard'

function Suppliers({ handleOpenWindow }) {
    return (
        <>
            <ItemsCard option={3} handleOpenWindow={handleOpenWindow} />
        </>
    )
}

export default Suppliers
