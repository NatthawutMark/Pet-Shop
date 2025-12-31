'use client'

import { Label, SidebarTrigger, TableCaption, TableHead, TableHeader } from '@/Meterials'
import { useState, useEffect, MouseEvent, ChangeEvent } from 'react';

function pageOrders() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(user);
        
        if (user && typeof user != 'undefined') {
            setFirstName(user?.FIRST_NAME)
            setlastName(user?.LAST_NAME)
        }
    }, [])

    return (
        <div className='flex flex-col '>
            <div className='flex flex-col justify-center items-center max-w-screen min-h-screen max-h-screen'>
                <Label className='text-2xl justify-center '>ยินดีต้อนรับ คุณ {firstName} {lastName}</Label>
            </div>
        </div>
    )
}


export default pageOrders;