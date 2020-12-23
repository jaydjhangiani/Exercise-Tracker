import React, { useState } from 'react'
import axios from 'axios'

const CreateUser = () => {

    const [username,setUsername] = useState('');

    const handelSubmit = (e) => {
        e.preventDefault()

        const user = {
            username:username,
        }

        console.log(user);  

        setUsername('');

        axios.post('http://localhost:5000/users/add',user)
            .then(res => console.log(res.data))

    }

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={handelSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input id="username"  required className="form-control" value={username}  onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Create Exercise Log"/>
                </div>
            </form>
        </div>
    )
}

export default CreateUser
