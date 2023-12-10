import { MongoClient } from 'mongodb'

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      submitMessage(req, res)
      break
    default:
      res.status(400).json({ message: 'Invalid request.' })
  }
}

export const submitMessage = async (req, res) => {
  const { email, name, message } = req.body

  const userMongoDb = process.env.MONGO_USER
  const passwordMongoDb = process.env.MONGO_PASSWORD
  const clusterMongoDb = process.env.MONGO_CLUSTER
  const dbMongoDb = process.env.MONGO_DB
  if (
    !email ||
    !email.includes('@') ||
    !name ||
    name.trim() === '' ||
    !message ||
    message.trim() === ''
  ) {
    res.status(422).json({ message: 'Invalid input.' })
    return
  }
  // Store it in a database
  const newMessage = {
    email,
    name,
    message,
  }

  let client;
  try {
    client = await MongoClient.connect(`mongodb+srv://${userMongoDb}:${passwordMongoDb}@${clusterMongoDb}.xnwca09.mongodb.net/${dbMongoDb}?retryWrites=true&w=majority`)
    
  } catch (error) {
    console.log(error, 'unable to connect to database')
    return res.status(500).json({ message: 'Could not connect to DB' })
  }

  const backendDb = client.db()

  
  try {
    const result = await backendDb.collection('messages').insertOne(newMessage)
    newMessage.id = result.insertedId
  } catch (error) {
    console.log(error, 'unable to insert message')
    client.close()
    return res.status(500).json({ message: 'Storing message failed!' })
  }

  client.close()

  res.status(201).json({ message: 'Successfully stored message!', savedMessage: newMessage })
}
