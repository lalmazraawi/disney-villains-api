const { villains } = require('../models/index')


const getAllVillains = async (request, response) => {
  const listOfVillains = await villains.findAll()

  return response.send(listOfVillains)
}

const getVillainBySlug = async (request, response) => {
  const { searchTerm } = request.params

  const foundVillain = await villains.findOne({
    where: { slug: searchTerm }
  })

  return response.status(200).send(foundVillain)
}

const saveNewVillain = async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response.status(400).send('The following fields are required: name, movie, slug')
  }

  const newVillain = await villains.create({ name, movie, slug })

  return response.status(201).send(newVillain)
}



module.exports = { getAllVillains, getVillainBySlug, saveNewVillain, }