import React, { useRef, useState } from 'react'

export const Button = ({ value, onClick, bg }) => {

    return (
        <input type={'button'} value={value} onClick={onClick} />
    )
}
