
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ShowSchedules from './components/ShowSchedules';
import AddMeeting from './components/AddMeeting';
import EditMeeting from './components/EditMeeting';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowSchedules/>}/>
        <Route path='/create' element={<AddMeeting/>}/>
        <Route path='/edit:id' element={<EditMeeting/>}/>
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
