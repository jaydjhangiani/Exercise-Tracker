import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Exercise from './Exercise'

const ExcerciseList = () => {

    const[exercises,setExercises] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
            .then(res => setExercises(res.data))
            .catch(err => console.log(err))
    },[exercises])

    const deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data))
        
        setExercises(exercises.filter(el => el._id !== id))
    }

    const exercisesList = () => {
        return exercises.map(exercise => {
            //console.log(exercises._id)
            return <Exercise exercise={exercise} deleteExercise={deleteExercise} key={exercise._id} />;
            
        })
    }

    return (
        <div>
             <h3>Logged Exercises</h3>
             <table className="table">
                 <thead>
                     <tr>
                         <th>Username</th>
                         <th>Description</th>
                         <th>Duration</th>
                         <th>Date</th>
                         <th>Actions</th>
                     </tr>
                </thead>
                 <tbody>
                     {exercisesList()}
                 </tbody>

             </table>
        </div>
    )
}

export default ExcerciseList
