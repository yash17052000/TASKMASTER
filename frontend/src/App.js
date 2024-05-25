
import './index.css';
import ToDo from './components/ToDo';
import { useEffect, useState } from 'react';
import { getAllToDo ,addToDo} from './utils/HandleApi';
import { deleteToDo,updateMode} from './utils/HandleApi';

function App() {
  const [toDo, setToDo] = useState([]);
  const [text,setText]=useState("")
 const [btn,chbtnname]=useState("add") 
 // console.log(toDo);
const changeButtonName= (newName)  =>{
  chbtnname(newName);
  
}
  
  useEffect(()=>{
getAllToDo(setToDo)

  },[])
  return (
    <div className="App">
      <div className='container'>
            <h1>TO DO APP</h1>
            <div className='top'>
              <input type='text' placeholder='Write the text' value={text} className='info' onChange={(e)=>setText(e.target.value)}/>
              
                            <div className='add'   onClick={()=>addToDo(text,setText,setToDo)} onChange={changeButtonName}>{btn}</div>
            </div>
<div className='list'>
{
  
  toDo.data?.map((item)=><ToDo key={item._id}  text={item.text} id={item._id} deleteToDo={deleteToDo}  setToDo={setToDo} updateMode={updateMode} className ="info" classNames="info add" setText={setText} changeButtonName={changeButtonName}/>)}

</div>
      </div>
    </div>
  );
}

export default App;
