class PromiseState {
  constructor(timeout, timeoutReason) {
    var self = this
    this.prev = null
    this.next = null
    this.promise = new Promise((resolve, reject) => {
      console.log('locking')
      self._resolve = () => {
        console.log('unlock')
        resolve()
      }
      self._reject = reject
    })
    this.timer = timeout && setTimeout(() => {
      self.reject(timeoutReason)
    }, timeout)
  }

  resolve(value) {
    this.timer && clearTimeout(this.timer)
    this._resolve(value)
  }

  reject(reason) {
    this.timer && clearTimeout(this.timer)
    this._reject(reason)
  }
}

class Queue {
  constructor () {
    this.first = null
    this.last = null
    this.point = null
  }

  push(chainable) {
    if (this.first == null) {
      this.first = chainable
      this.last = chainable
    } else {
      this.last.next = chainable
      chainable.prev = this.last
      this.last = chainable
    }
  }

  pop() {
    var first = this.first
    if (first == null) return null
    var second = first.next
    if (second) {
      this.first = second
    } else {
      this.first = null
      this.last = null
    }
    return first
  }

  next() {
    if (this.point == null) {
      this.point = this.first
      return this.point
    }
    this.point = this.point.next
    return this.point
  }
}

/**
 * var mutex = new Mutex()
 * await mutex.lock()
 * doSomething()
 * mutex.unlock()
 *
 *
 * mutex.lock().then(function() {
 *    doSomething()
 *    mutex.unlock()
 * })
 */
class Mutex {
  constructor(timeout, onRelease) {
    this.timeout = timeout
    this.onRelease = onRelease
    this.queue = new Queue()
  }

  /**
   * await mutex.lock()
   */
  lock() {
    var promiseState = this.queue.next()
    this.queue.push(new PromiseState(this.timeout, 'Mutex lock timeout'))
    return promiseState ? promiseState.promise: Promise.resolve()
  }

  unlock() {
    var promiseState = this.queue.pop()
    if (!promiseState) {
      throw new Error('Unlock multi times')
    }
    promiseState.resolve()
    if (this.queue.length === 0 && this.onRelease) {
      this.onRelease()
    }
  }
}

var mutexMap = new Map()
export const getMutex = (key, timeout) => {
  var mutex = mutexMap.get(key)
  if (mutex) {
    return mutex
  }
  mutex = new Mutex(timeout, () => {
    mutexMap.delete(key)
  })
  mutexMap.set(key, mutex)
  return mutex
}

export default Mutex
