import React,{useState,useEffect} from 'react'
import queryString from 'query-string'
import './Chat.css'
import InfoBar from '../infoBar/infoBar'
import Input from '../input/input'
import Messages from '../Messages/Messages'
import io from 'socket.io-client'
let socket
const Chat=({location})=>{
    const [name,setName]=useState('')
    const [room,setRoom]=useState('')
    const [message,setMessage]=useState('')
    const [messages,setMessages]=useState([])//'localhost:5000'
    const ENDPOINT='https://prit-chat-app.herokuapp.com/'
    useEffect(()=>{
const {name,room}=queryString.parse(location.search)

socket=io(ENDPOINT)
setName(name)
setRoom(room)

socket.emit('join',{name:name,room:room},(error)=>{
//alert(error)
})
return()=>{
    socket.emit('disconnect')
    socket.off()
}
console.log(socket)
// console.log(location.search)//?name=kavita&room=room2
// console.log(data)//{name: "kavita", room: "room2"}
   console.log(name,room)//kavita room2
},[ENDPOINT,location.search]//one time..not 2 times
)
//handling message
useEffect(()=>{
    socket.on('message',(message)=>{
setMessages([...messages,message])
    })
},[messages])


const sendMessage=(event)=>{
    event.preventDefault()
    if(message){
        socket.emit('sendMessage',message,()=>setMessage(''))
    }
}
console.log(message,messages)
//functional for sending messages


    return(
        <div className="outerContainer">
            <div className="container">        
              <InfoBar room={room}/>  
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/> 
              <Messages messages={messages} name={name}/>
            </div>
        </div>    
    )
    }
export default Chat
//  <input value={message} onChange={(event)=>setMessage(event.target.value)}
//                 onKeyPress={event=>event.key==='Enter'?sendMessage(event):null}
//                 />  {/* //chat header */}
// {message display hello priya...}