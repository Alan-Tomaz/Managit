import React from 'react'
import ItemsCard from '../cards/ItemsCard'

function Users({ handleOpenWindow, handleRemoveItem, reload }) {
    return (
        <>
            <ItemsCard option={6} handleOpenWindow={handleOpenWindow} handleRemoveItem={handleRemoveItem} reload={reload} />
        </>
    )
}

export default Users
