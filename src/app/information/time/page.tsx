import ClientOnly from '@/app/_components/ClentOnly'
import TakeWorkTime from '@/app/_components/informationScreenCm/TakeWorkTime'
import React from 'react'

export default function page() {
  return (
    <div>
      <ClientOnly>
      <TakeWorkTime />
      </ClientOnly>
    </div>
  )
}
