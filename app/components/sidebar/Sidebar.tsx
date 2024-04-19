import getCurrentUser from '@/app/actions/getCurrentUser'
import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'

export default async function Sidebar({
    children
}:{children: React.ReactNode}) {
    const currentUser = await getCurrentUser()
    return (
        <div className='lg:pl-20 h-full'>  
            <DesktopSidebar currentUser={currentUser!}/> 
            <MobileFooter/>                       
            {children}
        </div>
    )
}
