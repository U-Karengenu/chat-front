import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMessages, sendMessage } from '../api/chat'
import { useAuth } from '../context/AuthContext'

const ChatPage = () => {
  const { roomId } = useParams()
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')

  const loadMessages = async () => {
    const data = await getMessages(roomId)
    setMessages(data)
  }

  useEffect(() => {
    loadMessages()
  }, [roomId])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    await sendMessage(roomId, text)
    setText('')
    loadMessages()
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
                <span>{new Date(message.created_at).toLocaleTimeString()}</span>
              </div>
            </div>
          )
        })}
      </div>

      <form onSubmit={handleSend} className="message-form">
        <input
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Send</button>
      </form>
    </main>
  )
}

export default ChatPage
