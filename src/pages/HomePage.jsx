import { useEffect, useState } from 'react'
import ChatCard from '../components/ChatCard'
import { getChats } from '../api/chat'

const HomePage = () => {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await getChats()
        setChats(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    loadChats()
  }, [])

  return (
    <main className="page">
      <div className="page-header">
        <h1>Chats</h1>
        <p>See your private and group chats here.</p>
      </div>

      {loading ? (
        <p>Loading chats...</p>
      ) : chats.length === 0 ? (
        <div className="empty-box">
          <h2>No chats yet</h2>
          <p>Go to Find Friend and start a conversation.</p>
        </div>
      ) : (
        <div className="chat-list">
          {chats.map((chat) => <ChatCard key={chat.id} chat={chat} />)}
        </div>
      )}
    </main>
  )
}

export default HomePage
