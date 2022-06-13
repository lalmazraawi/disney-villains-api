const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it, beforeEach, afterEach } = require('mocha')
const { villains } = require('../../models')
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('../../controllers/villains')
const { milo, villainsList, scarVillain, badMilo } = require('../mock/villains')

chai.use(sinonChai)

const { expect } = chai

describe('Testing the villains controller', () => {
  let sandbox = sinon.createSandbox()
  let stubbedFindOne = sandbox.stub(villains, 'findOne')
  let stubbedFindAll = sandbox.stub(villains, 'findAll')
  let stubbedCreate = sandbox.stub(villains, 'create')
  let stubbedSend = sandbox.stub()
  let stubbedStatus = sandbox.stub()
  let stubbedSendStatus = sandbox.stub()
  let response = {
    send: stubbedSend,
    sendStatus: stubbedSendStatus,
    status: stubbedStatus,
  }

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  describe('getAllVillains', () => {
    it('gets all the villains from the database and responds with a response.send() with the list', async () => {
      stubbedFindAll.returns(villainsList)

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })

  describe('getVillainBySlug', () => {
    it('retrieves only the villain with the provided Id from the database, and responds with it', async () => {
      const request = { params: { slug: 'Scar' } }

      stubbedFindOne.returns(scarVillain)

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: 'Scar' },
      })
    })

    it('returns a 404 when no villain is found in the db,', async () => {
      const request = { params: { slug: 'villainDoesNotExist' } }

      stubbedFindOne.returns(null)

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: 'villainDoesNotExist' }
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 when the database errors out', async () => {
      const request = { params: { slug: 'Scar' } }

      stubbedFindOne.throws('ERROR!')

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: 'Scar' },
      })
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
  })


  describe('saveNewVillain', () => {
    // eslint-disable-next-line max-len
    it('accepts a new villain and saves them as a new villain, then returns a status of 201 and the new team', async () => {
      const request = { body: milo }

      stubbedCreate.returns(milo)

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(milo)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(milo)
    })

    it('returns a 400 when the user forgets to include all the required fields ', async () => {
      const request = { body: badMilo }

      await saveNewVillain(request, response)

      expect(stubbedStatus).to.have.been.calledWith(400)

      // eslint-disable-next-line max-len
      expect(stubbedSend).to.have.been.calledWith('The following fields are required: name, movie, slug')
    })
    it('returns a 500 status code if the database fails', async () => {
      const request = { body: milo }

      stubbedCreate.throws('Error!')

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(milo)
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
  })
})