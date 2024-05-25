import React  from 'react'
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'

function ToDo({id,text,updateMode,deleteToDo,setToDo,info,setText,classNames}) {
  // console.log(id);

  



  
  return (
    <div className='item'>
    <div className='text'>
    {text}

    </div>
<div className='icons'>
<BiEdit className='icon1' onClick={()=>updateMode(id,text,setToDo,info,setText,classNames) } />
<AiFillDelete className='icon2' onClick={()=>deleteToDo(id,setToDo)}/>
</div>
    </div>
  )
}

export default ToDo
