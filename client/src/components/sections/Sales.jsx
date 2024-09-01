import React from 'react'
import ItemsCard from '../cards/ItemsCard'

function Sales({ handleOpenWindow }) {
    return (
        <>
            <ItemsCard option={5} handleOpenWindow={handleOpenWindow} />
        </>
    )
}

export default Sales
