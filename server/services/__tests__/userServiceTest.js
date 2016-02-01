jest.autoMockOff()
global.dbOpts = require('memdown')

var userService = require('../userService')

describe('userService', ()=> {
  it('save', (done)=> {
    userService.put('1234', 'abcd', function(err, result) {
      expect(err).toBeNull()
      userService.get('1234', function(err1, result1) {
        expect(err1).toBeNull()
        expect(result1).toBeOK()
        done()
      })
    })
  })
})
