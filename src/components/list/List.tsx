import UserInfo from './userInfo/UserInfo'
import ChatList from './chatList/ChatList'

function List() {
  return (
    <div className='listFlex flex flex-col w-[25%]'>
      <UserInfo />
      <ChatList />
    </div>
  )
}

export default List