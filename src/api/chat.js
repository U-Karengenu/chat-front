import api from './api'

export const getContacts = async () => {
  const response = await api.get('/contacts/')
  return response.data
}

export const getChats = async () => {
  const response = await api.get('/chats/')
  return response.data
}

export const startPrivateChat = async (friendId) => {
  const response = await api.post('/chats/private/start/', { friend_id: friendId })
  return response.data
}

export const createGroupChat = async (name, memberIds) => {
  const response = await api.post('/chats/group/create/', {
    name,
    member_ids: memberIds,
  })
  return response.data
}

export const getMessages = async (roomId) => {
  const response = await api.get(`/chats/${roomId}/messages/`)
  return response.data
}

export const sendMessage = async (roomId, text) => {
  const response = await api.post(`/chats/msg/${roomId}/`, { text })
  return response.data
}

export const sendFileMessage = async (roomId, file) => {
  const res = await api.post(`/chats/msg/${roomId}/`, {file})
}
