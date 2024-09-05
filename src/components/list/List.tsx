import React from 'react'
import UserInfo from './userInfo/UserInfo'
import ChatList from './chatList/ChatList'

function List() {
  return (
    <div className='listFlex flex flex-col'>
      <UserInfo />
      <ChatList />
    </div>
  )
}

export default List