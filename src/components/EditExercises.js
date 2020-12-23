import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const EditExercises = () => {
    const [username,setUsername] = useState('')
    const [description,setDescription] = useState('')
    const [duration,setDuration] = useState('')
    const [date,setDate] = useState(new Date())
    const [users,setUsers] = useState([])
    //const [exercise,setExercise] = useState([])

    let{id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/'+ id)
            .then(res => {
                
                    setUsername(res.data.username)
                    setDescription(res.data.description)
                    setDuration(res.data.duration)
                    setDate(new Date(res.data.date))
                
            })
            console.log(date)
            console.log(description)

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

        axios.post('http://localhost:5000/exercises/update/'+ id,exercise)
            .then(res => console.log(res.data))

        window.location = '/'
    }


    return (
        <div>
            <h3>Update Exercise </h3>
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

export default EditExercises
