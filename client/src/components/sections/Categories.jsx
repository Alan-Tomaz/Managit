import React from 'react';
import ItemsCard from "../cards/ItemsCard.jsx";

function Categories({ handleOpenWindow }) {
    return (
        <>
            <ItemsCard option={2} handleOpenWindow={handleOpenWindow} />
        </>
    )
}

export default Categories
