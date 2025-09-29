'use client';
import React from 'react'
import ConditionalBottunBar from './_components/ConditionalBottunBar'
import ServiceWorkerRegister from './_components/ServiceWorkerRegister'

function AppProvider({children}:{children:React.ReactNode}) {
  return (
              <div>
                <div className="flex flex-col min-h-screen">
                  {children}
                  <ConditionalBottunBar />
                </div>
                <ServiceWorkerRegister />
             </div>
  )
}

export default AppProvider