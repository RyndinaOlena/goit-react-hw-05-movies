import React from 'react'
import Headers from './pages/Header/Headers'
import { Outlet } from 'react-router-dom'
const Layout = () => {
    return (
        <>
            <Headers />
            <Outlet />
        </>
    )
}
export default Layout
