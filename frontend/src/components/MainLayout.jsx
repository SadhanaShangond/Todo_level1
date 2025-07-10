import React from 'react'
import Header from './Header'
import CopyRightNotice from './CopyRightNotice'

export default function MainLayout({children}) {
  return (
    <div>
        <Header/>
        {children}
        <CopyRightNotice/>
    </div>
    
  )
}
