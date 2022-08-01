import React from 'react'
import Image from 'next/image'
import { MenuIcon, ChevronDownIcon, HomeIcon, SearchIcon } from '@heroicons/react/solid'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  SparklesIcon,
  PlusIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link'

function Header() {
  const { data:session } = useSession()
  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
    <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
      <Link href="/">
     <Image src="https://links.papareact.com/fqy"
     layout="fill"
     objectFit="contain"
     />
     </Link>
    </div>
    <div className="flex items-center mx-7 xl:min-w-[300px]">
      <HomeIcon className="h-5 w-5"/>
      <p className="ml-2 hidden flex-1 lg:inline">Home</p>
      <ChevronDownIcon className="h-5 w-5"/>
    </div>
    {/*Search box*/}
    <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
      <SearchIcon className="h-6 w-6 text-gray-400"/>
      <input type="text" className="flex-1 bg-transparent outline-none" placeholder="Search Reddit"/>
      <button type="submit" hidden></button>
    </form>
    <div className="flex text-gray-500 space-x-2 items-center mx-5 hidden lg:inline-flex">
      <SparklesIcon className="icon" />
      <GlobeIcon className="icon"/>
      <VideoCameraIcon className="icon"/>
      <hr className="h10 border border-gray-100"/>
      <ChatIcon className="icon" />
      <BellIcon className="icon"/>
      <SpeakerphoneIcon className="icon"/>
    </div>
    <div className="ml-5 flex items-center lg:hidden">
      <MenuIcon className="icon"/>
    </div>

    {/* Sign in/ Sign out button */}
    {session ?(
        <div onClick={() => signOut()} className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer">
        <div className="h-5 w-5 relative flex-shrink-0">
        <Image objectFit='contain' src="https://links.papareact.com/23l"
        layout='fill'
        alt=''
        />
        </div>
        <div className="flex-1 text-xs">
          <p className="truncate">{session?.user?.name}</p>
        <p className="text-gray-400">1 Karma</p>
        </div>
        <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400"/>
        </div>
    ):(
      <div onClick={() => signIn()} className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer">
      <div className="h-5 w-5 relative flex-shrink-0">
      <Image objectFit='contain' src="https://links.papareact.com/23l"
      layout='fill'
      alt=''
      />
      </div>
      <p className="text-gray-400">SignIn</p>
  
      </div>
    )}
  
    </div>
  )
}

export default Header
