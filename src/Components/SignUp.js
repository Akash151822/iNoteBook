import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp(props) {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    name: '', email: '', password: '', cPassword: ''
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/auth/add", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, cPassword: credentials.cPassword })
    })
    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authtoken)
      props.showAlert("signUp successfull", "success")
      navigate('/')
    }
    else {
      props.showAlert(`${json.error}`, "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className=' conatiner mt-2'>
      <h1 className='my-3'>Signup to continue to iNoteBook </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" id="name" name='name' className="form-control"
            value={credentials.name} onChange={onChange} required
          />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"
            autoComplete='current-email' value={credentials.email} onChange={onChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" name='password' className="form-control" autoComplete="current-password" value={credentials.password} onChange={onChange} required minLength={8}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
          <input type="password" id="cPassword" name='cPassword' className="form-control" autoComplete="current-cPassword" value={credentials.cPassword} onChange={onChange} required
          />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default SignUp
