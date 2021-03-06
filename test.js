'use strict'

var test = require('tape')
var clearRequire = require('clear-require')

var isActualPR = !!(process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST !== 'false')

test('Known CI', function (t) {
  process.env.TRAVIS = 'true'

  var ci = require('./')

  t.ok(Array.isArray(ci._vendors))
  t.ok(ci._vendors.length > 0)

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, isActualPR)
  t.equal(ci.name, 'Travis CI')
  t.equal(ci.TRAVIS, true)
  assertVendorConstants('TRAVIS', ci, t)

  t.end()
})

test('Not CI', function (t) {
  delete process.env.CI
  delete process.env.CONTINUOUS_INTEGRATION
  delete process.env.BUILD_NUMBER
  delete process.env.TRAVIS

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, false)
  t.equal(ci.isPR, null)
  t.equal(ci.name, null)
  t.equal(ci.TRAVIS, false)
  assertVendorConstants(null, ci, t)

  t.end()
})

test('Unknown CI', function (t) {
  process.env.CI = 'true'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, null)
  t.equal(ci.name, null)
  t.equal(ci.TRAVIS, false)
  assertVendorConstants(null, ci, t)

  t.end()
})

test('AppVeyor - PR', function (t) {
  process.env.APPVEYOR = 'true'
  process.env.APPVEYOR_PULL_REQUEST_NUMBER = '42'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, true)
  t.equal(ci.name, 'AppVeyor')
  t.equal(ci.APPVEYOR, true)
  assertVendorConstants('APPVEYOR', ci, t)

  delete process.env.APPVEYOR
  delete process.env.APPVEYOR_PULL_REQUEST_NUMBER

  t.end()
})

test('AppVeyor - Not PR', function (t) {
  process.env.APPVEYOR = 'true'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, false)
  t.equal(ci.name, 'AppVeyor')
  t.equal(ci.APPVEYOR, true)
  assertVendorConstants('APPVEYOR', ci, t)

  delete process.env.APPVEYOR

  t.end()
})

test('Buildkite - PR', function (t) {
  process.env.BUILDKITE = 'true'
  process.env.BUILDKITE_PULL_REQUEST = '42'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, true)
  t.equal(ci.name, 'Buildkite')
  t.equal(ci.BUILDKITE, true)
  assertVendorConstants('BUILDKITE', ci, t)

  delete process.env.BUILDKITE
  delete process.env.BUILDKITE_PULL_REQUEST

  t.end()
})

test('Buildkite - Not PR', function (t) {
  process.env.BUILDKITE = 'true'
  process.env.BUILDKITE_PULL_REQUEST = 'false'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, false)
  t.equal(ci.name, 'Buildkite')
  t.equal(ci.BUILDKITE, true)
  assertVendorConstants('BUILDKITE', ci, t)

  delete process.env.BUILDKITE
  delete process.env.BUILDKITE_PULL_REQUEST

  t.end()
})

test('CircleCI - PR', function (t) {
  process.env.CIRCLECI = 'true'
  process.env.CIRCLE_PULL_REQUEST = '42'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, true)
  t.equal(ci.name, 'CircleCI')
  t.equal(ci.CIRCLE, true)
  assertVendorConstants('CIRCLE', ci, t)

  delete process.env.CIRCLECI
  delete process.env.CIRCLE_PULL_REQUEST

  t.end()
})

test('CircleCI - Not PR', function (t) {
  process.env.CIRCLECI = 'true'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, false)
  t.equal(ci.name, 'CircleCI')
  t.equal(ci.CIRCLE, true)
  assertVendorConstants('CIRCLE', ci, t)

  delete process.env.CIRCLECI

  t.end()
})

test('Cirrus CI - PR', function (t) {
  process.env.CIRRUS_CI = 'true'
  process.env.CIRRUS_PR = '42'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, true)
  t.equal(ci.name, 'Cirrus CI')
  t.equal(ci.CIRRUS, true)
  assertVendorConstants('CIRRUS', ci, t)

  delete process.env.CIRRUS_CI
  delete process.env.CIRRUS_PR

  t.end()
})

test('Cirrus CI - Not PR', function (t) {
  process.env.CIRRUS_CI = 'true'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, false)
  t.equal(ci.name, 'Cirrus CI')
  t.equal(ci.CIRRUS, true)
  assertVendorConstants('CIRRUS', ci, t)

  delete process.env.CIRRUS_CI

  t.end()
})

test('Semaphore - PR', function (t) {
  process.env.SEMAPHORE = 'true'
  process.env.PULL_REQUEST_NUMBER = '42'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, true)
  t.equal(ci.name, 'Semaphore')
  t.equal(ci.SEMAPHORE, true)
  assertVendorConstants('SEMAPHORE', ci, t)

  delete process.env.SEMAPHORE
  delete process.env.PULL_REQUEST_NUMBER

  t.end()
})

test('Semaphore - Not PR', function (t) {
  process.env.SEMAPHORE = 'true'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, false)
  t.equal(ci.name, 'Semaphore')
  t.equal(ci.SEMAPHORE, true)
  assertVendorConstants('SEMAPHORE', ci, t)

  delete process.env.SEMAPHORE

  t.end()
})

test('Shippable - PR', function (t) {
  process.env.SHIPPABLE = 'true'
  process.env.IS_PULL_REQUEST = 'true'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, true)
  t.equal(ci.name, 'Shippable')
  t.equal(ci.SHIPPABLE, true)
  assertVendorConstants('SHIPPABLE', ci, t)

  delete process.env.SHIPPABLE
  delete process.env.IS_PULL_REQUEST

  t.end()
})

test('Semaphore - Not PR', function (t) {
  process.env.SHIPPABLE = 'true'
  process.env.IS_PULL_REQUEST = 'false'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, false)
  t.equal(ci.name, 'Shippable')
  t.equal(ci.SHIPPABLE, true)
  assertVendorConstants('SHIPPABLE', ci, t)

  delete process.env.SHIPPABLE
  delete process.env.IS_PULL_REQUEST

  t.end()
})

test('Solano CI - PR', function (t) {
  process.env.TDDIUM = 'true'
  process.env.TDDIUM_PR_ID = '42'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, true)
  t.equal(ci.name, 'Solano CI')
  t.equal(ci.SOLANO, true)
  assertVendorConstants('SOLANO', ci, t)

  delete process.env.TDDIUM
  delete process.env.TDDIUM_PR_ID

  t.end()
})

test('Solano CI - Not PR', function (t) {
  process.env.TDDIUM = 'true'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, false)
  t.equal(ci.name, 'Solano CI')
  t.equal(ci.SOLANO, true)
  assertVendorConstants('SOLANO', ci, t)

  delete process.env.TDDIUM

  t.end()
})

test('Travis CI - PR', function (t) {
  process.env.TRAVIS = 'true'
  process.env.TRAVIS_PULL_REQUEST = '42'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, true)
  t.equal(ci.name, 'Travis CI')
  t.equal(ci.TRAVIS, true)
  assertVendorConstants('TRAVIS', ci, t)

  delete process.env.TRAVIS
  delete process.env.TRAVIS_PULL_REQUEST

  t.end()
})

test('Travis CI - Not PR', function (t) {
  process.env.TRAVIS = 'true'
  process.env.TRAVIS_PULL_REQUEST = 'false'

  clearRequire('./')
  var ci = require('./')

  t.equal(ci.isCI, true)
  t.equal(ci.isPR, false)
  t.equal(ci.name, 'Travis CI')
  t.equal(ci.TRAVIS, true)
  assertVendorConstants('TRAVIS', ci, t)

  delete process.env.TRAVIS
  delete process.env.TRAVIS_PULL_REQUEST

  t.end()
})

function assertVendorConstants (expect, ci, t) {
  ci._vendors.forEach(function (constant) {
    var bool = constant === expect
    bool = (expect === 'SOLANO' && constant === 'TDDIUM') || bool // support deprecated option
    t.equal(ci[constant], bool, 'ci.' + constant)
  })
}
