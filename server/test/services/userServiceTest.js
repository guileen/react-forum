import userService from 'services/userService'
import {expect} from 'chai'

describe('userService', () => {
  it('should success', async () => {
    expect(userService).to.be.ok
  })
})
