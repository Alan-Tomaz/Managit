import React from 'react'
import ItemsCard from '../cards/ItemsCard'

function Products({ handleOpenWindow }) {
    return (
        <>
            <ItemsCard option={1} handleOpenWindow={handleOpenWindow} />
        </>
    )
}

export default Products
