const AddUser = () => {
    return ( 
        <div className="addUser w-max h-max p-7 bg-background rounded-md absolute top-0 bottom-0 left-0 right-0 m-auto">
            <form action="" className="flex gap-5">
                <input type="text" placeholder="Username" name="username" className="px-5 text-black rounded-lg border-none outline-none" />
                <button className="px-5 py-2 rounded-lg bg-blue-600 text-white border-none cursor-pointer">Search</button>
            </form>
            <div className="user mt-8 flex items-center justify-between">
                <div className="detail flex items-center gap-5">
                    <img className="w-[50px] h-[50px] rounded-full object-cover" src="./avatar.png" alt="" />
                    <span>Sharan S</span>
                </div>
                <button className="px-3 py-1 rounded-lg bg-blue-600 text-white border-none cursor-pointer">Add User</button>
            </div>
        </div>
     );
}
 
export default AddUser;