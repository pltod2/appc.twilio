const test = require('tap').test
const sinon = require('sinon')

const createMethod = require('../../../lib/methods/create').create

const ENV = {}
const connectorUtils = require('../../utils/connectorUtils')
const models = connectorUtils.models
const modelFromStub = 'MyModel'
const values = {to: 'test'}

test('connect', (t) => {
  connectorUtils.test.getConnectorDynamic(connectorUtils.connectorName, env => {
    t.ok(env.container)
    t.ok(env.connector)
    ENV.container = env.container
    ENV.connector = env.connector
    ENV.connector.sdk = require('../../../src/sdkFacade')(ENV.connector.config)
    ENV.connector.tools = connectorUtils.tools
    t.end()
  })
})

test('Create Call Error Case', function (t) {
  const Model = ENV.container.getModel(models.call)
  const errorMessage = 'My error'
  const cbErrorSpy = sinon.spy()

  const sdkStubError = sinon.stub(
    ENV.connector.sdk.create,
    'call',
    // The same parameters as the real function
    (values, callback) => {
      // This is the body of the mocked function from twilio API
      // This is the anonymous function inside create.js
      callback(errorMessage)
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return {nameOnly: 'call', nameOnlyPlural: 'calls'}
    }
  )

  const toolsCIStub = sinon.stub(
    ENV.connector.tools,
    'createInstanceFromModel',
    (Model, modelsData, primaryKey) => {
      return modelFromStub
    }
  )

  createMethod.bind(ENV.connector, Model, values, cbErrorSpy)()
  t.ok(sdkStubError.calledOnce)
  t.ok(sdkStubError.calledWith(values))
  t.ok(toolsCIStub.notCalled)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbErrorSpy.calledOnce)
  t.ok(cbErrorSpy.calledWith(errorMessage))

  sdkStubError.restore()
  toolsGetNameStub.restore()
  toolsCIStub.restore()
  t.end()
})

test('Create Call Success Case', function (t) {
  const Model = ENV.container.getModel(models.call)
  const data = 'MyData'
  const cbOkSpy = sinon.spy()

  const sdkStubOk = sinon.stub(
    ENV.connector.sdk.create,
    'call',
    (values, callback) => {
      callback(null, data)
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return {nameOnly: 'call', nameOnlyPlural: 'calls'}
    }
  )

  const toolsCIStub = sinon.stub(
    ENV.connector.tools,
    'createInstanceFromModel',
    (Model, modelsData, primaryKey) => {
      return modelFromStub
    }
  )

  createMethod.bind(ENV.connector, Model, values, cbOkSpy)()
  t.ok(sdkStubOk.calledOnce)
  t.ok(sdkStubOk.calledWith(values))
  t.ok(toolsCIStub.calledOnce)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbOkSpy.calledOnce)
  t.ok(cbOkSpy.calledWith(null, modelFromStub))

  sdkStubOk.restore()
  toolsGetNameStub.restore()
  toolsCIStub.restore()
  t.end()
})

test('Create Message Error Case', function (t) {
  const Model = ENV.container.getModel(models.message)
  const errorMessage = 'My error'
  const cbErrorSpy = sinon.spy()

  const sdkStubError = sinon.stub(
    ENV.connector.sdk.create,
    'message',
    (values, callback) => {
      callback(errorMessage)
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return {nameOnly: 'message', nameOnlyPlural: 'messages'}
    }
  )

  const toolsCIStub = sinon.stub(
    ENV.connector.tools,
    'createInstanceFromModel',
    (Model, modelsData, primaryKey) => {
      return modelFromStub
    }
  )

  createMethod.bind(ENV.connector, Model, values, cbErrorSpy)()
  t.ok(sdkStubError.calledOnce)
  t.ok(sdkStubError.calledWith(values))
  t.ok(toolsCIStub.notCalled)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbErrorSpy.calledOnce)
  t.ok(cbErrorSpy.calledWith(errorMessage))

  sdkStubError.restore()
  toolsGetNameStub.restore()
  toolsCIStub.restore()
  t.end()
})

test('Create Message Success Case', function (t) {
  const Model = ENV.container.getModel(models.message)
  const data = 'Message'
  const cbOkSpy = sinon.spy()

  const sdkStub = sinon.stub(
    ENV.connector.sdk.create,
    'message',
    (values, callback) => {
      callback(null, data)
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return {nameOnly: 'message', nameOnlyPlural: 'messages'}
    }
  )

  const toolsCIStub = sinon.stub(
    ENV.connector.tools,
    'createInstanceFromModel',
    (Model, modelsData, primaryKey) => {
      return modelFromStub
    }
  )

  createMethod.bind(ENV.connector, Model, values, cbOkSpy)()
  t.ok(sdkStub.calledOnce)
  t.ok(sdkStub.calledWith(values))
  t.ok(toolsCIStub.calledOnce)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbOkSpy.calledOnce)
  t.ok(cbOkSpy.calledWith(null, modelFromStub))

  sdkStub.restore()
  toolsGetNameStub.restore()
  toolsCIStub.restore()
  t.end()
})

test('Create Address Error Case', function (t) {
  const Model = ENV.container.getModel(models.address)
  const errorMessage = 'Error'
  const cbErrorSpy = sinon.spy()

  const sdkStub = sinon.stub(
    ENV.connector.sdk.create,
    'address',
    (values, callback) => {
      callback(errorMessage)
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return {nameOnly: 'address', nameOnlyPlural: 'addresses'}
    }
  )

  const toolsCIStub = sinon.stub(
    ENV.connector.tools,
    'createInstanceFromModel',
    (Model, modelsData, primaryKey) => {
      return modelFromStub
    }
  )

  createMethod.bind(ENV.connector, Model, values, cbErrorSpy)()
  t.ok(sdkStub.calledOnce)
  t.ok(sdkStub.calledWith(values))
  t.ok(toolsCIStub.notCalled)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbErrorSpy.calledOnce)
  t.ok(cbErrorSpy.calledWith(errorMessage))

  sdkStub.restore()
  toolsGetNameStub.restore()
  toolsCIStub.restore()
  t.end()
})

test('Create Address Success Case', function (t) {
  const Model = ENV.container.getModel(models.address)
  const data = 'Correct Data'
  const cbOkSpy = sinon.spy()

  const sdkStub = sinon.stub(
    ENV.connector.sdk.create,
    'address',
    (values, callback) => {
      callback(null, data)
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return {nameOnly: 'address', nameOnlyPlural: 'addresses'}
    }
  )

  const toolsCIStub = sinon.stub(
    ENV.connector.tools,
    'createInstanceFromModel',
    (Model, modelsData, primaryKey) => {
      return modelFromStub
    }
  )

  createMethod.bind(ENV.connector, Model, values, cbOkSpy)()
  t.ok(sdkStub.calledOnce)
  t.ok(sdkStub.calledWith(values))
  t.ok(toolsCIStub.calledOnce)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbOkSpy.calledOnce)
  t.ok(cbOkSpy.calledWith(null, modelFromStub))

  sdkStub.restore()
  toolsGetNameStub.restore()
  toolsCIStub.restore()
  t.end()
})

test('Create Queue Error Case', function (t) {
  const Model = ENV.container.getModel(models.queue)
  const errorMessage = 'Error'
  const cbErrorSpy = sinon.spy()

  const sdkStub = sinon.stub(
    ENV.connector.sdk.create,
    'queue',
    (values, callback) => {
      callback(errorMessage)
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return {nameOnly: 'queue', nameOnlyPlural: 'queues'}
    }
  )

  const toolsCIStub = sinon.stub(
    ENV.connector.tools,
    'createInstanceFromModel',
    (Model, modelsData, primaryKey) => {
      return modelFromStub
    }
  )

  createMethod.bind(ENV.connector, Model, values, cbErrorSpy)()
  t.ok(sdkStub.calledOnce)
  t.ok(sdkStub.calledWith(values))
  t.ok(toolsCIStub.notCalled)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbErrorSpy.calledOnce)
  t.ok(cbErrorSpy.calledWith(errorMessage))

  sdkStub.restore()
  toolsGetNameStub.restore()
  toolsCIStub.restore()
  t.end()
})

test('Create Queue Success Case', function (t) {
  const Model = ENV.container.getModel(models.queue)
  const data = 'Correct Data'
  const cbOkSpy = sinon.spy()

  const sdkStub = sinon.stub(
    ENV.connector.sdk.create,
    'queue',
    (values, callback) => {
      callback(null, data)
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return {nameOnly: 'queue', nameOnlyPlural: 'queues'}
    }
  )

  const toolsCIStub = sinon.stub(
    ENV.connector.tools,
    'createInstanceFromModel',
    (Model, modelsData, primaryKey) => {
      return modelFromStub
    }
  )

  createMethod.bind(ENV.connector, Model, values, cbOkSpy)()
  t.ok(sdkStub.calledOnce)
  t.ok(sdkStub.calledWith(values))
  t.ok(toolsCIStub.calledOnce)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbOkSpy.calledOnce)
  t.ok(cbOkSpy.calledWith(null, modelFromStub))

  sdkStub.restore()
  toolsGetNameStub.restore()
  toolsCIStub.restore()
  t.end()
})

test('Create Account Error Case', function (t) {
  const Model = ENV.container.getModel(models.account)
  const errorMessage = 'Error'
  const cbErrorSpy = sinon.spy()

  const sdkStub = sinon.stub(
    ENV.connector.sdk.create,
    'account',
    (values, callback) => {
      callback(errorMessage)
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return {nameOnly: 'account', nameOnlyPlural: 'accounts'}
    }
  )

  const toolsCIStub = sinon.stub(
    ENV.connector.tools,
    'createInstanceFromModel',
    (Model, modelsData, primaryKey) => {
      return modelFromStub
    }
  )

  createMethod.bind(ENV.connector, Model, values, cbErrorSpy)()
  t.ok(sdkStub.calledOnce)
  t.ok(sdkStub.calledWith(values))
  t.ok(toolsCIStub.notCalled)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbErrorSpy.calledOnce)
  t.ok(cbErrorSpy.calledWith(errorMessage))

  sdkStub.restore()
  toolsGetNameStub.restore()
  toolsCIStub.restore()
  t.end()
})

test('Create Account Success Case', function (t) {
  const Model = ENV.container.getModel(models.account)
  const data = 'Correct Data'
  const cbOkSpy = sinon.spy()

  const sdkStub = sinon.stub(
    ENV.connector.sdk.create,
    'account',
    (values, callback) => {
      callback(null, data)
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return {nameOnly: 'account', nameOnlyPlural: 'accounts'}
    }
  )

  const toolsCIStub = sinon.stub(
    ENV.connector.tools,
    'createInstanceFromModel',
    (Model, modelsData, primaryKey) => {
      return modelFromStub
    }
  )

  createMethod.bind(ENV.connector, Model, values, cbOkSpy)()
  t.ok(sdkStub.calledOnce)
  t.ok(sdkStub.calledWith(values))
  t.ok(toolsCIStub.calledOnce)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbOkSpy.calledOnce)
  t.ok(cbOkSpy.calledWith(null, modelFromStub))

  sdkStub.restore()
  toolsGetNameStub.restore()
  toolsCIStub.restore()
  t.end()
})

test('Create With Invalid Model', function (t) {
  const Model = {name: 'appc.twilio/invalid'}
  const errorMessage = new Error()
  const cbErrorSpy = sinon.spy()

  createMethod.bind(ENV.connector, Model, {}, cbErrorSpy)()
  t.ok(cbErrorSpy.calledOnce)
  t.ok(cbErrorSpy.calledWith(errorMessage))

  t.end()
})
