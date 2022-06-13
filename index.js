const express = require('express')

const { getAllVillains, getVillainBySlug, saveNewVillain } = require('./controllers/villains')


const app = express()

app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainBySlug)

app.post('/villains', express.json(), saveNewVillain)

app.all('*', (request, response) => response.sendStatus(404))



app.listen(1337, () => {
  console.log('Listening on http://localhost:1337..') // eslint-disable-line no-console
})

