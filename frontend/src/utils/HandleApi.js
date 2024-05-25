import axios from "axios";

const baseUrl="http://localhost:5000"

const getAllToDo=(setToDo)=>{
axios
.get(baseUrl)
.then((data)=>{
// console.log(Q"data.....",data);
setToDo(data)
}
)
.catch((err) => { console.log(err) })
}
const addToDo=(text,setText,setToDo)=>{

    axios
    .post(`${baseUrl}/save`,{text})
    .then((data)=>{
    
    setText("")
    getAllToDo(setToDo)
    }
    )
    .catch((err) => { console.log(err) })
    alert("data is added")
    }
    const deleteToDo=(id,setToDo)=>{
        console.log("*****************",id);
       
       try {
         axios.post(`${baseUrl}/delete`,{ data: { id } });
        getAllToDo(setToDo)
       } catch (error) {
        console.log(error);
       }
    }
   
    const updateMode=async(id,text,setToDo,info,setText,classNames)=>{
        console.log("*****************",id);

        const inputField = document.getElementsByClassName(info)[0];
         console.log("apply");
        const arr=classNames.split(" ")

        const btnname=document.getElementsByClassName(arr[1])[0].textContent;
        
        console.log(btnname);
            if (inputField) {
        inputField.value = text;  // Set the input field's value to the current text
    }

    // Delete the old item
    deleteToDo(id, setToDo);
   
   
   
setText(text)
alert("UPDATEd THE DATA")
      //  addToDo(document.getElementsByClassName(info).value,,setToDo)
      
       try {
        
       await axios.post(`${baseUrl}/update`,{ id,text });
   
         
        await getAllToDo(setToDo)
        
       
       

       } catch (error) {
        console.log(error);
       }
       
    }
 

export {getAllToDo,addToDo,deleteToDo,updateMode}