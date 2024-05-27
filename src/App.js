import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.js';
import Adminpage from './pages/Admin/Adminpage.js';
import Userpage from './pages/User/Userpage.js';
import Navbar from './components/Navbar/Navbar.js';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const data = window.localStorage.getItem("ROLE");
    if (data!=null) setRole(data);
  },[])

  useEffect(() => {
    window.localStorage.setItem("ROLE",role);
  })

  function getRole(data){
    setRole(data);
  }

  function getName(data){
    setName(data);
  }

  function changeLoggedIn(data){
    setLoggedIn(data);
  }

  console.log("Name is" , name);
  console.log("Role is" , role);
  console.log("Logged In??", loggedIn);

  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} changeLoggedIn={changeLoggedIn} getRole={getRole} role={role} getName={getName} name={name}/>
      <Routes>
        <Route path='/' element={<Home loggedIn={loggedIn} changeLoggedIn={changeLoggedIn} getRole={getRole} />} />
        <Route path='/admin' element={<Adminpage loggedIn={loggedIn} changeLoggedIn={changeLoggedIn} role={role}/>} getRole={getRole}/>
        <Route path='/user' element={<Userpage loggedIn={loggedIn} changeLoggedIn={changeLoggedIn} role={role}/>} getRole={getRole}/>
      </Routes>
      
    </div>
  );
}

export default App;
