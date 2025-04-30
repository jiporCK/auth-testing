import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")

  const handleRegister = async () => {
    const res = await fetch('http://localhost:8080/api/v1/users/register', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password, address }),
      credentials: 'include',
    })

    const data = await res.json()
    setMessage(res.ok ? "Registered successfully ✅" : `❌ ${data.message || res.statusText}`)
  }

  const handleGetUsers = async () => {
    const res = await fetch('http://localhost:8080/api/v1/users', {
      method: 'GET',
      credentials: 'include',
    });
  
    if (res.ok) {
      const data = await res.json();
      console.log("Users:", data);
      setMessage("Fetched users ✅ Check console");
    } else {
      setMessage(`❌ ${res.statusText}`);
    }
  };
  

  const handleLogin = async () => {
    const res = await fetch('http://localhost:8080/api/v1/auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    })

    const data = await res.json()
    console.log("Data", data);
    
    setMessage(res.ok ? "Logged in ✅" : `❌ ${data.message || res.statusText}`)
  }

  const handleLogout = async () => {
    const res = await fetch('http://localhost:8080/api/v1/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })

    setMessage(res.ok ? "Logged out ✅" : `❌ ${res.statusText}`)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>JWT Auth Test</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ padding: '0.5rem', margin: '0.5rem' }}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ padding: '0.5rem', margin: '0.5rem' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ padding: '0.5rem', margin: '0.5rem' }}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        style={{ padding: '0.5rem', margin: '0.5rem' }}
      />
      <div>
        <button onClick={handleRegister} style={{ margin: '0.5rem' }}>Register</button>
        <button onClick={handleLogin} style={{ margin: '0.5rem' }}>Login</button>
        <button onClick={handleLogout} style={{ margin: '0.5rem' }}>Logout</button>
        <button onClick={handleGetUsers} style={{ margin: '0.5rem' }}>Get Users</button>
      </div>
      <p>{message}</p>
    </div>
  )
}

export default App
