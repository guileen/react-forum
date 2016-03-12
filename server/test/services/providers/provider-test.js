import maindb from 'services/datasource/maindb'
import {EntityProvider} from 'services/providers/provider'

import {expect} from 'chai'

class UserProvider extends EntityProvider {
  constructor(db) {
    super(db, 'user')
  }

  getPostVoters(postId, opts) {
    return this.rangeOneToMany('post_voters', postId, opts)
  }
}

class PostProvider extends EntityProvider {
  constructor(db) {
    super(db, 'post')
  }

  async save(post) {
    await super.save(post)
    await this.bindOneToMany('user_posts', post.userId, post.id)
    return post
  }

  async vote(voterId, postId) {
    await this.bindManyToMany('voted_posts', 'post_voters', voterId, postId)
  }

  async unvote(voterId, postId) {
    await this.unbindManyToMany('voted_posts', 'post_voters', voterId, postId)
  }

  getUserPosts(userId, opts) {
    return this.rangeOneToMany('user_posts', userId, opts)
  }

  getVotedPosts(userId, opts) {
    return this.rangeOneToMany('voted_posts', userId, opts)
  }
}

const userProvider = new UserProvider(maindb)
const postProvider = new PostProvider(maindb)

describe('Provider', () => {
  it('should bind user_posts on save', async () => {
    var user = await userProvider.save({name: 'a'})
    await Promise.all(['a', 'b', 'c'].map((s) => postProvider.save({userId: user.id, text: s})))
    const posts = await postProvider.getUserPosts(user.id, {gt: 0})
    expect(posts.map(p => p.text)).to.be.eql(['a', 'b', 'c'])
  })

  it('should not bind twice on update', async () => {
    var user = await userProvider.save({name: 'a'})
    var post = await postProvider.save({userId: user.id, text: 'a'})
    post.text = 'b'
    await postProvider.save(post)
    var posts = await postProvider.getUserPosts(user.id)
    expect(posts.length).to.be.eql(1)
    expect(posts).to.deep.eql([{id: post.id, userId: user.id, text: 'b'}])
  })

  describe('ManyToMany', () => {
    var users
    var posts
    it('should vote many to many', async () => {
      users = await Promise.all(['a', 'b', 'c'].map(name => userProvider.save({name: name})))
      posts = await Promise.all(['x', 'y', 'z'].map(
        (text, i) => postProvider.save({userId: users[i].id, text: text})))
      var voteActions = []
      users.forEach(u => {
        posts.forEach(p => {
          voteActions.push(postProvider.vote(u.id, p.id))
        })
      })
      await Promise.all(voteActions)
      var votedPosts = await Promise.all(users.map(u => postProvider.getVotedPosts(u.id)))
      expect(votedPosts).to.deep.eql([posts, posts, posts])
      var postVoters = await Promise.all(posts.map(p => userProvider.getPostVoters(p.id)))
      expect(postVoters).to.deep.eql([users, users, users])
    })

    it('should unvote', async () => {
      var unvoteActions = []
      users.forEach(u => {
        posts.forEach(p => {
          unvoteActions.push(postProvider.unvote(u.id, p.id))
        })
      })
      await Promise.all(unvoteActions)
      var votedPosts = await Promise.all(users.map(u => postProvider.getVotedPosts(u.id)))
      expect(votedPosts).to.deep.eql([[], [], []])
      var postVoters = await Promise.all(posts.map(p => userProvider.getPostVoters(p.id)))
      expect(postVoters).to.deep.eql([[], [], []])
    })

    it('should revote', async () => {
      const u = await userProvider.save({name: 'a'})
      const p = await postProvider.save({text: 'x', userId: u.id})

      // vote first
      await postProvider.vote(u.id, p.id)
      var votedPosts = await postProvider.getVotedPosts(u.id)
      expect(votedPosts).to.deep.eql([p])
      var postVoters = await userProvider.getPostVoters(p.id)
      expect(postVoters).to.deep.eql([u])

      // unvote
      await postProvider.unvote(u.id, p.id)
      votedPosts = await postProvider.getVotedPosts(u.id)
      expect(votedPosts).to.deep.eql([])
      postVoters = await userProvider.getPostVoters(p.id)
      expect(postVoters).to.deep.eql([])

      // vote again
      await postProvider.vote(u.id, p.id)
      votedPosts = await postProvider.getVotedPosts(u.id)
      expect(votedPosts).to.deep.eql([p])
      postVoters = await userProvider.getPostVoters(p.id)
      expect(postVoters).to.deep.eql([u])
    })
  })
})
