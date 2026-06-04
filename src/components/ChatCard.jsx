import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ChatCard = ({ chat }) => {
  const { user } = useAuth()

  const otherMembers = chat.members.filter((member) => member.id !== user.id)

  const chatName = chat.room_type === 'group'
    ? chat.name
    : otherMembers[0]?.username || 'Unknown user'

  return (
    <Link to={`/chat/${chat.id}`} className="chat-card">
      <div className="avatar">{chatName?.[0]?.toUpperCase()}</div>

      <div className="chat-info">
        <div className="chat-top-row">
          <h3>{chatName}</h3>
          {chat.unread_count > 0 && <span className="badge">{chat.unread_count}</span>}
        </div>

        <p>{chat.last_message ? chat.last_message.text : 'No messages yet'}</p>
      </div>
    </Link>
  )
}

export default ChatCard
