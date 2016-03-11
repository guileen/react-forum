import {expect} from 'chai'
import Mutex from 'commons/mutex'

describe('Mutex', () => {
  it('should lock', (done) => {
    const mutex = new Mutex()
    var i = 0
    // lock 1
    mutex.lock().then(() => {
      setTimeout(() => {
        // 取锁后100ms执行，lock 2 3 无法提前执行
        expect(i).to.be.eql(0)
        i = 1
        mutex.unlock()
      }, 100)
    })
    // lock 2
    mutex.lock().then(() => {
      setTimeout(() => {
        // 取锁后50ms执行，必须等待lock 1 解锁，lock 3 无法提前执行
        expect(i).to.be.eql(1)
        i = 2
        mutex.unlock()
      }, 50)
    })
    // lock 3
    mutex.lock().then(() => {
        // 取锁后立即执行，必须等待lock 2解锁
      expect(i).to.be.eql(2)
      i = 3
      mutex.unlock()
      done()
    })
  })
})
