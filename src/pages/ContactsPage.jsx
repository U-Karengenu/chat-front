import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getContacts, startPrivateChat } from '../api/chat'

const ContactsPage = () => {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const loadContacts = async () => {
      const data = await getContacts()
      setContacts(data)
    }

    loadContacts()
  }, [])

  const handleStartChat = async (friendId) => {
    const room = await startPrivateChat(friendId)
    navigate(`/chat/${room.id}`)
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.username.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="page">
      <div className="page-header">
        <h1>Find Friend</h1>
        <p>Search users and start a private chat.</p>
      </div>

      <input
        className="search-input"
        placeholder="Search username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="contact-list">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <div className="avatar">{contact.username[0].toUpperCase()}</div>
            <div>
              <h3>{contact.username}</h3>
              <p>{contact.email || 'No email'}</p>
            </div>
            <button onClick={() => handleStartChat(contact.id)}>Message</button>
          </div>
        ))}
      </div>
    </main>
  )
}

export default ContactsPage
