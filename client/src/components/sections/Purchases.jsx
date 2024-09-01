import React from 'react'
import ItemsCard from '../cards/ItemsCard'

function Purchases({ handleOpenWindow }) {
    return (
        <>
            <ItemsCard option={4} handleOpenWindow={handleOpenWindow} />
        </>
    )
}

export default Purchases
