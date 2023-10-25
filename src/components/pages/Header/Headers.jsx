import React from 'react'
import { NavLink } from 'react-router-dom'

const Headers = () => {
    return (
        <div>
            <NavLink to='/'>Home
            </NavLink>
            <NavLink to='movies'>Movies
            </NavLink>
        </div>
    )
}

export default Headers
