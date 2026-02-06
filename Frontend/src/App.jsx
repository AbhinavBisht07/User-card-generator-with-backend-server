import { useEffect, useState } from 'react'
import axios from "axios";

function App() {
  const [users, setUsers] = useState([
    {
      name: "Aman Kumar",
      profileURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      role: "Fullstack Developer",
      bio: "saasjfaf sdnasn ddasc,mf fojqq dd",
      email: "abc@abc.com"
    },
    {
      name: "Aman Kumar",
      profileURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      role: "Fullstack Developer",
      bio: "saasjfaf sdnasn ddasc,mf fojqq dd",
      email: "abc@abc.com"
    },
  ])

  function renderUserCards() {
    axios.get("http://localhost:3000/api/users")
      .then((res) => {
        // console.log(res.data.users);
        setUsers(res.data.users)
      })
  }

  function createUserMenuAppear() {
    let userCreateMenu = document.querySelector(".userCreateMenu");
    userCreateMenu.style.display = "block"
  }
  function createUserMenuDisappear() {
    let userCreateMenu = document.querySelector(".userCreateMenu");
    userCreateMenu.style.display = "none"
  }

  function createUserHandler(e) {
    e.preventDefault();
    console.dir(e.target.elements)

    const { name, profileURL, role, bio, email } = e.target.elements;

    axios.post("http://localhost:3000/api/users", {
      name: name.value,
      profileURL: profileURL.value,
      role: role.value,
      bio: bio.value,
      email: email.value
    })
      .then((res) => {
        console.log(res.data);
        renderUserCards();
      })
  }

  function deleteUserHandler(userId) {
    // console.log(userId);
    axios.delete(`http://localhost:3000/api/users/${userId}`)
    .then((res)=>{
      console.log(res.data);
      renderUserCards();
    })
  }

  useEffect(() => {
    renderUserCards()
  }, [])

  return (
    <>
      <div className='btnContainer'>
        <button
          onClick={createUserMenuAppear}
          className='openMenu'>
          Create User Card
        </button>
      </div>

      <div className="userCreateMenu">
        <button
          onClick={createUserMenuDisappear}
          className='closeMenu'>
          Close
        </button>

        <form onSubmit={createUserHandler}>
          <input name='name' type="text" placeholder='Enter name' />
          <input name='profileURL' type="text" placeholder='Enter profileURL' />
          <input name='role' type="text" placeholder='Enter role' />
          <input name='bio' type="text" placeholder='Enter bio' />
          <input name='email' type="text" placeholder='Enter email' />
          <button onClick={createUserMenuDisappear}>Submit</button>
        </form>
      </div>

      <div className="users">
        {users.map((user) => {
          return <div className="userCard">
            <img src={user.profileURL} alt="" />
            <h1>{user.name}</h1>
            <h3>{user.role}</h3>
            <p>{user.bio}</p>
            <h3>{user.email}</h3>

            <div className="buttons">
              <button
                onClick={() => {
                  deleteUserHandler(user._id);
                }}
                className="delete">
                Delete
              </button>

              <button className="update">Update</button>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App
