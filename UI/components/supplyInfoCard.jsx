import React from 'react'
import './supplyInfoCard.css'

const SupplierInfoCard = ({name,description}) =>{
    return (<section className='supplyInfo'>
        <h3>{name}</h3>
        <p>{description}</p>
    </section>)
}

export default SupplierInfoCard