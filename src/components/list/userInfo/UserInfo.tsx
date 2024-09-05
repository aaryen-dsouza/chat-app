import React from 'react'

function UserInfo() {
  return (
    <div className='p-5 flex items-center justify-between'>
      <div className='flex items-center gap-5'>
        <img className='w-[50px] h-[50px] rounded-[50%] object-cover' src="./avatar.png" alt="" />
        <h2 className='text-xl	font-medium'>Aaryen</h2>
      </div>
      <div className='flex gap-5'>
        <img className='w-5 h-5 cursor-pointer' src="./more.png" alt="" />
        <img className='w-5 h-5 cursor-pointer' src="./video.png" alt="" />
        <img className='w-5 h-5 cursor-pointer' src="./edit.png" alt="" />
      </div>
    </div>
  )
}

export default UserInfo