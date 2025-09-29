import Image from 'next/image'
import React from 'react'

function Intro() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex flex-col items-center px-4 pt-4 pb-[10vh]">
            <div className="flex flex-col items-center text-center">
              {/* لوگو یا آیکون */}
              <div className="flex justify-center mb-8">
                         <Image
                           src="/images/images/logos/eghlym.png"
                           alt="Logo"
                           width={200}
                           height={60}
                           className="object-contain"
                           
                         />
                       </div>
    
              {/* متن خوشامد */}
              <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">
                خوش آمدید 👋
              </h1>
              <p className="text-white/90 mt-2 text-sm md:text-base">
                به برنامه حضور و غیاب اقلیم
              </p>
            </div>
          </div>
  )
}

export default Intro