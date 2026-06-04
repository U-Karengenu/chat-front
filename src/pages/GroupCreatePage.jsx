import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGroupChat, getContacts } from '../api/chat'

const GroupCreatePage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [contacts, setContacts] = useState([])
  const [selectedIds, setSelectedIds] = useState([])

  useEffect(() => {
    const loadContacts = async () => {
      const data = await getContacts()
      setContacts(data)
    }

    loadContacts()
  }, [])

  const toggleUser = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()

    const room = await createGroupChat(name, selectedIds)
    navigate(`/chat/${room.id}`)
  }

  return (
    <main className="page">
      <div className="page-header">
        <h1>Create Group</h1>
        <p>Create a simple group chat.</p>
      </div>

      <form onSubmit={handleCreate} className="group-form">
        <label>Group Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <h3>Select Members</h3>

        {contacts.map((contact) => (
          <label key={contact.id} className="checkbox-row">
            <input
              type="checkbox"
              checked={selectedIds.includes(contact.id)}
              onChange={() => toggleUser(contact.id)}
            />
            {contact.username}
          </label>
        ))}

        <button>Create Group</button>
      </form>
    </main>
  )
}

export default GroupCreatePage
