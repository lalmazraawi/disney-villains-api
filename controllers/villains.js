const { villains } = require('../models/index')


const getAllVillains = async (request, response) => {
  try {
    const listOfVillains = await villains.findAll()

    return response.send(listOfVillains)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const getVillainBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    if (!slug) return response.sendStatus(404)

    const foundVillain = await villains.findOne({
      where: { slug }
    })

    if (!foundVillain) return response.sendStatus(404)

    return response.status(200).send(foundVillain)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const saveNewVillain = async (request, response) => {
  try {
    const { name, movie, slug } = request.body

    if (!name || !movie || !slug) {
      return response.status(400).send('The following fields are required: name, movie, slug')
    }

    const newVillain = await villains.create({ name, movie, slug })

    return response.status(201).send(newVillain)
  } catch (error) {
    return response.sendStatus(500)
  }
}



module.exports = { getAllVillains, getVillainBySlug, saveNewVillain, }