import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const endpoint = "http://localhost:8000/api"; 
const AddMeeting = () => {
  const [room, setRoom] = useState("");
  const [user, setUser]= useState("");
  const [start_hour, setStart_hour]= useState("");
  const [end_hour, setEnd_hour] = useState("");
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    const micSec=1000*60;
    let end = new Date(end_hour);
    let start = new Date(start_hour);
    let diff =( Math.round(Math.abs(end-start) / (micSec)));
    console.log("min:" + diff);
    let vari=[];

    if (start > end) {
      alert("your end hour its wrong.");
    } else if (diff > 120) {
      alert("you pass the time limit.");
    } else {
      const response = await axios.get(`${endpoint}/ScheduleShow`);
      setSchedule(response.data);
      
      vari.push=(response.data);
      console.log(vari);
      
      var val = 0;
      schedule.forEach(async(schedule)=>{
        console.log('hola');
        let getRoom= schedule.room;
        console.log(getRoom);
      }
      );
        //Si no interviene se reserva la sala.
      if (val === 0) {
        await axios.post(endpoint + "/ScheduleStore", {
          room: room,
          user: user, 
          start_hour: start_hour,
          end_hour: end_hour,
          available:false
        });
        navigate("/");
        alert("Sala apartada correctamente.");
      }
    }
  };
  return (
    <div className="container col-6" bg-color="">
      <form onSubmit={store}>
        <div className="mb-3">
          <label className="form-label">Sala</label>
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Hora inicial</label>
          <input
            value={start_hour}
            onChange={(e) => setStart_hour(e.target.value)}
            className="form-control"
            placeholder="Select time"
            type="datetime-local"
            step="900"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Hora final</label>
          <input
            value={end_hour}
            onChange={(e) => setEnd_hour(e.target.value)}
            className="form-control"
            placeholder="Select time"
            type="datetime-local"
            step="900"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Confirmar apartado
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
        
          onClick={() => navigate(-1)}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default AddMeeting;