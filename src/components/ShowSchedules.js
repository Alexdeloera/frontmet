import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const endpoint='http://localhost:8000/api'

const ShowSchedules=()=>{

    const[schedules, setSchedules] =useState([]);
    useEffect(()=>{
        getAllSchedules();
    },[]);
    const getAllSchedules = async() =>{
        const response= await axios.get(`${endpoint}/ScheduleShow`)
        setSchedules(response.data);
        console.log(response.data);
        console.log(schedules);

    }
    const deleteSchedule= async (id)=>{
         await axios.delete(`${endpoint}/ScheduleDestroy/${id}`);
         getAllSchedules();
    }
    const updateSchedules = async (id) => {
      await axios.put(`${endpoint}/ScheduleUpdate/${id}`);
      getAllSchedules();
    };
    return(
        <div class="container-fluid">
            <div className=' d-grid gap-2'>
                <Link to="/create " className='btn btn-success btn-lg mt-2 mb-2 text-white'> Create</Link>
            </div>
            <table className='table table-striped'>
            <thead className='bg-primary text-white'>
            <tr>
                <th>User</th>
                <th>Start</th>
                <th>Finish</th>
                <th>Meeting Room</th>
                <th>Options</th>
                
            </tr>

            </thead>
            <tbody>
                {schedules.map((schedule)=>(
                    <tr key ={schedule.id}>
                        <td>{schedule.user}</td>
                        <td>{schedule.start_hour}</td>
                        <td>{schedule.end_hour}</td>
                        <td>{schedule.room}</td>
                        <td>
                            <button onClick={() => updateSchedules(schedule.id)} className="btn btn-warning  m-1">Set free</button>
                            <button onClick={()=>deleteSchedule(schedule.id)} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                ))}

            </tbody>
            </table>
        </div>
    )
}

export default ShowSchedules