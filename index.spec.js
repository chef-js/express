'use strict'

describe('GIVEN bouncer is provided', () => {
  it('THEN requiring the library does not throw an error', () => {
    require('.')
  })

  describe('WHEN it is instantiated', () => {
    it('THEN it should initialize without throwing error', () => {
      const { startServer } = require('./dist')

      expect(() => startServer({ port: 3001 })).not.toThrow()
    })

    it('THEN initialization should return a truthy instance', async () => {
      const { startServer } = require('./dist')

      expect(await startServer({ port: 3002 })).toBeTruthy()
    })
  })

  describe('WHEN bouncer is initialized in debug mode', () => {
    it('THEN it should not throw error', async () => {
      const { startServer } = require('./dist')
      const api = await startServer({ debug: true, port: 3003 })

      expect(api).toBeTruthy()
    })
  })

  describe('WHEN bouncer.serve is run on demo folder', () => {
    it('THEN it should not throw error', async () => {
      const { startServer } = require('./dist')
      const test = async () =>
        await startServer({ debug: true, folder: 'demo', port: 3004 })

      expect(test).not.toThrow()
    })
  })

  describe('WHEN bouncer is initialized on specified port', () => {
    it('THEN it should start without error', async () => {
      const { startServer } = require('./dist')
      const server = await startServer({ port: 8080 })

      expect(server).toBeTruthy()
    })
  })
})
