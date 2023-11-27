import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login(props) {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: '', password: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            props.showAlert(`${json.message}`, "success")
            localStorage.setItem('token', json.authtoken)
            navigate("/")
        }
        else {
            props.showAlert(`${json.error}`, "danger")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className=' container mt-2'>
            <h1 className='my-3'>Login to continue to iNoteBook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email </label>
                    <input type="email" className="form-control" id="email" name='email' autoComplete='current=email' aria-describedby="emailHelp"
                        value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name='password' className="form-control"
                        autoComplete='current-password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
