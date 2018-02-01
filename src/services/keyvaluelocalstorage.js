// FIXME review this interface, some method may not be used or other's parameters might not be useful

export default class KeyValueLocalStorage {
  constructor (name) {
    const stored = window.localStorage[`ganancias:${name}:values`]
    this.name = name
    try {
      this._storage = JSON.parse(stored)
    } catch (e) {
      this._storage = {}
    }
    this.currentKey = window.localStorage[`ganancias:${name}:currentKey`] || this._DEFAULT_KEY
  }

  _DEFAULT_KEY = '$$$default$$$'

  _storage = {}

  _persist = (currentKey) => {
    window.localStorage[`ganancias:${this.name}:values`] = JSON.stringify(this._storage)
    window.localStorage[`ganancias:${this.name}:currentKey`] = currentKey
    this.currentKey = currentKey
    return this.getInitial()
  }

  // FIXME return only keys that changed
  getInitial = () => {
    // return () => {
    return {
      keys: this.getKeys(),
      currentKey: this.getCurrentKey(),
      value: this._storage[this.currentKey],
    }
    // }
  }

  getCurrentKey = () => {
    return this.currentKey !== this._DEFAULT_KEY ? this.currentKey : null
  }

  set = (key, value) => {
    key = key || this._DEFAULT_KEY
    this._storage[key] = value
    return this._persist(key)
  }

  setCurrent = (value) => {
    return this.set(this.currentKey, value)
  }

  get = (key) => {
    key = key || this._DEFAULT_KEY
    return this._persist(key)
  }

  getCurrent = () => {
    return this.get(this.currentKey)
  }

  delete = (key) => {
    key = key || this._DEFAULT_KEY
    delete this._storage[key]
    return this._persist(this._DEFAULT_KEY)
  }

  copy = (key, toKey) => {
    key = key || this._DEFAULT_KEY
    toKey = toKey || this._DEFAULT_KEY
    let value = JSON.parse(JSON.stringify(this._storage[key]))
    this._storage[toKey] = value
    return this._persist(toKey)
  }

  rename = (key, newKey) => {
    key = key || this._DEFAULT_KEY
    newKey = newKey || this._DEFAULT_KEY
    if (key !== newKey) {
      this._storage[newKey] = this._storage[key] || null
      delete this._storage[key]
    }
    return this._persist(newKey)
  }

  getKeys = () => {
    return Object.keys(this._storage).filter((value) => {
      return value !== this._DEFAULT_KEY
    })
  }
}
