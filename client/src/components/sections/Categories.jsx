import React from 'react';
import ItemsCard from "../cards/ItemsCard.jsx";

function Categories({ handleOpenWindow, handleRemoveItem, reload }) {
    return (
        <>
            <ItemsCard option={2} handleOpenWindow={handleOpenWindow} handleRemoveItem={handleRemoveItem} reload={reload} />
        </>
    )
}

export default Categories
