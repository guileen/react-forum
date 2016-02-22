import {openUserProvider} from 'services/providers'
import {expect} from 'chai'

describe('openUserProvider', () => {
  it('should getOrCreateUser', async () => {
    const user1 = await openUserProvider.getOrCreateUser('github', {
      id: 123456,
      name: 'Leen Gui',
      avatar_url: 'http://test.com/test.png'
    })
    expect(user1).to.be.ok
    expect(user1.name).to.be.eql('Leen Gui')
    expect(user1.avatarUrl).to.be.eql('http://test.com/test.png')
    const user2 = await openUserProvider.getOrCreateUser('github', {
      id: 123456,
      name: 'Leen Gui',
      avatar_url: 'http://test.com/test.png'
    })
    expect(user1.id).to.be.eql(user2.id)
  })
})
