import React from 'react'
import ItemsCard from '../cards/ItemsCard'

function Users({ handleOpenWindow }) {
    return (
        <>
            <ItemsCard option={6} handleOpenWindow={handleOpenWindow} />
        </>
    )
}

export default Users
