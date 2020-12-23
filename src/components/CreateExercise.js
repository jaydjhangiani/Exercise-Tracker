import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

const CreateExercise = () => {
    const [username,setUsername] = useState('')
    const [description,setDescription] = useState('')
    const [duration,setDuration] = useState('')
    const [date,setDate] = useState(new Date())
    const [users,setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if(res.data.length > 0){
                    setUsers([res.data.map(user => user.username)])
                    setUsername(res.data[0].username)
                }
            })
            console.log(users)
    },[])


    const handelSubmit = (e) => {
        e.preventDefault()

        const exercise = {
            username,
            description,
            duration,
            date
        }

        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add',exercise)
            .then(res => console.log(res.data))

         window.location = '/'
    }


    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={handelSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <select  required className="form-control" value={username} onChange={e => setUsername(e.target.value)}>
                        {users.map(user => (
                            user.map( u => (
                                <option key={u} value={u}>{u}</option>
                            ))
                        )
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input id="description" required className="form-control" value={description}  onChange={e => setDescription(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duration: </label>
                    <input id="duration" required className="form-control" value={duration}  onChange={e => setDuration(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date </label>
                    <div>
                        <DatePicker selected={date} required onChange={date => setDate(date)}/>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Create Exercise Log"/>
                </div>
            </form>
        </div>
    )
}

export default CreateExercise
