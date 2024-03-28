enum StorageType {
  LocalStorage,
  SessionStorage
}

class Cache{
  storage: Storage
  constructor(type: StorageType) {
    this.storage= type === StorageType.LocalStorage? localStorage : sessionStorage
  }

  getItem(key: string) {
    const val = this.storage.getItem(key)
    if(val){
      return JSON.parse(val)
    }
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  removeItem(key: string) {
    this.storage.removeItem(key)
 }
 clear() {
  this.storage.clear()
}
}

const localCache = new Cache(StorageType.LocalStorage)
const sessionCache = new Cache(StorageType.SessionStorage)

export { localCache, sessionCache }