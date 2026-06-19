import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMessages } from '../api/chat'
import { useAuth } from '../context/AuthContext'
import api from '../api/api'

const ChatPage = () => {
  const { roomId } = useParams()
  const { user } = useAuth()

  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [view, setView] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isSending, setIsSending] = useState(false)

  const loadMessages = async () => {
    const data = await getMessages(roomId)
    setMessages(data)
  }

  useEffect(() => {
    loadMessages()
  }, [roomId])


  const handleSend = async (e) => {
    e.preventDefault()

    if (!text && !file) return

    const formData = new FormData()
    const accToken = localStorage.getItem('token')

    if (text) {
      formData.append('message_type', 'text')
      formData.append('text', text)
    }

    if (file) {
      const fileType = file.type.startsWith('video') ? 'video' : 'image'

      formData.append('message_type', fileType)
      formData.append('file', file)
    }

    try{
      setIsSending(true)
      setProgress(0)

      const response = await api.post(
      `/chats/msg/${roomId}/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accToken}`,
          'Content-Type': 'multipart/form-data',
        },

        onUploadProgress:(ProgressEvent) => {
          const percent = Math.round(
            (ProgressEvent.loaded * 100) / ProgressEvent.total
          )
          setProgress(percent)
        }
      })

      setText('')
      setFile(null)
      setProgress(0)
    }catch(error){
      console.error(error)
    }finally{
      setIsSending(false)
    }
    

    setText('')
    setFile(null)

    await loadMessages()

    return response.data
  }

  return (
    <main className="chat-page">
      <div className="chat-header">
        <h2>Chat Messages</h2>
      </div>

      <div className="messages-box">
        {messages.map((message) => {
          const isMine = message.sender.id === user?.id

          return (
            <div
              key={message.id}
              className={isMine ? 'message-row mine' : 'message-row'}
            >
              <div className={isMine ? 'message-bubble my-message' : 'message-bubble'}>
                {!isMine && <strong style={{color:'powderblue'}}>{message.sender.username}</strong>}

                {message.text && <p>{message.text}</p>}

                {message.message_type === 'image' && message.file && (
                  <img
                    src={`http://127.0.0.1:8000${message.file}`}
                    alt="chat"
                    style={{ 
                      width: '200px',
                      borderRadius: '10px',
                      marginBottom: '18px',
                      height:'150px'
                    }}
                    onClick={() => {setView(`http://127.0.0.1:8000${message.file}`)}}
                  />
                )}

                {message.message_type === 'video' && message.file && (
                  <video
                    src={`http://127.0.0.1:8000${message.file}`}
                    controls
                    style={{
                      width: '250px',
                      borderRadius: '10px',
                      marginBottom:'18px'
                    }}
                  />
                )}

                <small>{message.status === 'sent' ? '//' : 'x'}</small>
                <span>{new Date(message.created_at).toLocaleTimeString()}</span>
              </div>
            </div>
          )
        })}



        {/* progress bar */}
        {isSending && (
          <div style={{
            width:"100%",
            height:'8px',
            background:'#ddd',
            borderRadius:'12px',
            overflow:'hidden',
            position:'relative'
          }}>
            <div style={{
              width: `${progress}`,
              height:'100%',
              background:'#2563',
              transition:' width 0.2 ease'
            }}></div>
            <span style={{fontSize:'12px'}}>{progress}</span>
          </div>
        )}




        {/* preview media pop up */}
        {view && (
          <div style={{
            inset:0,
            position:'fixed',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            placeItems:'center',
            zIndex:'100',
            background:'transparent',
            backdropFilter:'blur(5px)'
          }}>
            <button style={{
              position:'absolute',
              top:'0',
              right:'6px',
              fontSize:'38px',
              background:'transparent'}}

              onClick={()=>{setView('')}}
              >
              x
            </button>
            
          <img
            src={view}
            alt="chat"
            style={{ 
              width: '100%',
              borderRadius: '10px',
              margin: '6px',
              height:'500px'
            }}
            onClick={()=>{setView('')}}
          />

          </div>
        )}
      </div>


      {/* submitting form */}
      <form onSubmit={handleSend} className="message-form">
        <div style={{display:'flex'}}>
          <div style={{margin:'10px'}}>
            <input
              className="w-10"
              type="file"
              id='file-input'
              accept="image/*,video/*"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file-input">🗄️</label>
          </div>
          
          <input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{width:'80%'}}
          />
        </div>
        <button type="submit">Send</button>
      </form>
      
    </main>
  )
}

export default ChatPage