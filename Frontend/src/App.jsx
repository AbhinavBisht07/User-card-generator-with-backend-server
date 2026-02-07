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

  const [showUserCreateMenu, setshowUserCreateMenu] = useState(false); //for opening and closing userCreateMenu

  const [editUser, setEditUser] = useState(null); //editUser = null means we will be creating new user and editUser = user_data_ka_object means hum iss user data ko update krna chch re hain ... to mtlbb jb bhi kisi user card ke update button pe click hoga to hum editUser ki value uss user ke data ke equal set kar denge ...

  const [formData, setFormData] = useState({
    name: "",
    profileURL: "",
    role: "",
    bio: "",
    email: ""
  })

  // synchronizing formData to editUser(user selected for updation).
  useEffect(() => {
    if (editUser) {
      setFormData({
        name: editUser.name || "",
        profileURL: editUser.profileURL || "",
        role: editUser.role || "",
        bio: editUser.bio || "",
        email: editUser.email || ""
      });
    }
  }, [editUser]);


  function renderUserCards() {
    // axios.get("http://localhost:3000/api/users")
    axios.get("https://user-card-generator-with-backend-server.onrender.com/api/users")
      .then((res) => {
        // console.log(res.data.users);
        setUsers(res.data.users)
      })
  }

  function resetForm() {
    setFormData({
      name: "",
      profileURL: "",
      role: "",
      bio: "",
      email: ""
    })
  }


  function userCreateHandler(e) {
    e.preventDefault();

    // For updating user :-
    if (editUser) {
      // axios.patch(`http://localhost:3000/api/users/${editUser._id}`, formData)
      axios.patch(`https://user-card-generator-with-backend-server.onrender.com/api/users/${editUser._id}`, formData)
        .then(() => {
          renderUserCards();
          setEditUser(null);
          setshowUserCreateMenu(false);
          resetForm();
        })
    }

    //for Creating user :-
    else {
      // axios.post("http://localhost:3000/api/users", formData)
      axios.post("https://user-card-generator-with-backend-server.onrender.com/api/users", formData)
        .then((res) => {
          // console.log(res.data);
          renderUserCards();
          setshowUserCreateMenu(false);
          resetForm();
        })
    }
  }


  function deleteUserHandler(userId) {
    // console.log(userId);
    // axios.delete(`http://localhost:3000/api/users/${userId}`)
    axios.delete(`https://user-card-generator-with-backend-server.onrender.com/api/users/${userId}`)
      .then((res) => {
        console.log(res.data);
        renderUserCards();
      })
  }

  //rendering user cards on relaod
  useEffect(() => {
    renderUserCards()
  }, [])

  return (
    <>
      <div className='btnContainer'>
        {/* Create User Card button :- */}
        <button
          onClick={() => setshowUserCreateMenu(true)}
          className='openMenu'>
          Create User Card
        </button>
      </div>

      {/* user create/update menu */}
      <div className="userCreateMenu"
        style={{ display: showUserCreateMenu ? "block" : "none" }}
      >
        {/* Close Create/update user menu button :- */}
        <button
          onClick={() => {
            setshowUserCreateMenu(false);
            setEditUser(null);
            resetForm();
          }}
          className='closeMenu'>
          Close
        </button>

        <form onSubmit={userCreateHandler}>
          <input name='name' type="text" placeholder='Enter name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input name='profileURL' type="text" placeholder='Enter profileURL'
            value={formData.profileURL}
            onChange={(e) => setFormData({ ...formData, profileURL: e.target.value })}
          />

          <input name='role' type="text" placeholder='Enter role'
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />

          <input name='bio' type="text" placeholder='Enter bio'
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />

          <input name='email' type="text" placeholder='Enter email'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          {/* Submit User details button */}
          <button type='submit'>
            {editUser ? "Update User" : "Create User"}
          </button>
        </form>
      </div>

      <div className="users">
        {users.map((user) => {
          return <div className="userCard">
            {/* <img src={user.profileURL} alt="" />
            <h1>{user.name}</h1>
            <h3>{user.role}</h3>
            <p>{user.bio}</p>
            <h3>{user.email}</h3> */}
            <div className="top">
              <img src={user.profileURL} alt="" />
              <div>
                <h1>{user.name}</h1>
                <h3>{user.role}</h3>
              </div>
            </div>

            <p>{user.bio}</p>
            <h4>{user.email}</h4>

            <div className="buttons">
              {/* Delete button */}
              <button
                onClick={() => {
                  deleteUserHandler(user._id);
                }}
                className="delete">
                Delete
              </button>


              {/* Update button does 2 things*/}
              <button
                onClick={() => {
                  setshowUserCreateMenu(true) // 1. Open editor form 
                  setEditUser(user) // 2. Set editUser equal to user data
                }}
                className="update">
                Update
              </button>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App
