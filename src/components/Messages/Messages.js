import React from 'react'
import SchollToButtom from 'react-scroll-to-bottom'
import Message from '../Message/Message'

import './Messages.css'

const Messages=({messages,name})=>(
<SchollToButtom className="messages">
{messages.map((message,i)=><div key={i}><Message message={message} name={name}/></div>)}
</SchollToButtom>
)

export default Messages