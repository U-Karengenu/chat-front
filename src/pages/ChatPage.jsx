import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getMessages, sendMessage } from '../api/chat'
import { useAuth } from '../context/AuthContext'
import api from '../api/api'

const ChatPage = () => {
  const { roomId } = useParams()
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [file, setFile] = useState('')

  console.log(file, text)
  const loadMessages = async () => {
    const data = await getMessages(roomId)
    setMessages(data)
  }

  useEffect(() => {
    loadMessages()
  }, [roomId])

  
  const handleSend = async () =>{
    e.preventDefault
    const formData = new FormData()
    const accToken = localStorage.getItem('token')
    if (text){
      formData.append('message_type', 'text')
      formData.append('text', text)
      
      const response = await api.post(
        `/chats/msg/${roomId}/`,
        formData,{
          headers: {
            'Authorization':`Bearer ${accToken}`
          }
        }

      )
      return response.data
    }else{
      formData.append('message_type', 'image')
      formData.append('file', file)
      
      const response = await api.post(
        `/chats/msg/${roomId}/`,
        formData,{
          headers: {
            'Authorization':`Bearer ${accToken}`
          }
        }

      )
      return response.data
    }
    
  }

  return (
    <main className="chat-page">
      <div className="chat-header">
        <h2>Chat Messages </h2>
        
      </div>
    

      <div className="messages-box">
        {messages.map((message) => {
          const isMine = message.sender.id === user.id

          return (
            <div key={message.id} className={isMine ? 'message-row mine' : 'message-row'}>
              <div className={isMine ? 'message-bubble my-message' : 'message-bubble'}>
                {!isMine && <strong>{message.sender.username}</strong>}
                <p>{message.text}</p>
                {message.message_type === 'image' &&
                  
                  <img 
                    src={`http://127.0.0.1:8000/${message.file}`}
                    alt="chat" 
                    style={{width: '200px', borderRadius:'10px'}}
                  />
                }
                {message.message_type === 'video' &&
                  <video 
                    src={message.file}
                    controls
                    alt="chat" 
                    style={{width: '250px', borderRadius:'10px'}}
                  />
                }
                <small>{message.status}</small>
                <span>{new Date(message.created_at).toLocaleTimeString()}</span>
              </div>
            </div>
          )
        })}
      </div>

      <form onSubmit={handleSend} className="message-form">
        <div className="d-flex">
          <input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            className='w-10'
            type='file'
            onChange={(e) => setFile(e.target.file)}
          />
        </div>
        <button>Send</button>
      </form>
    </main>
  )
}

export default ChatPage
