const memoryCache = new Map()
const CACHE_PREFIX = 'pokeapi_'
const DEFAULT_TTL = 1000 * 60 * 60 * 24 * 7

export const cacheService = {
  get(key) {
    if (memoryCache.has(key)) {
      const entry = memoryCache.get(key)
      if (Date.now() < entry.expiry) {
        return entry.data
      }
      memoryCache.delete(key)
    }

    try {
      const raw = localStorage.getItem(`${CACHE_PREFIX}${key}`)
      if (!raw) return null

      const parsed = JSON.parse(raw)
      if (Date.now() < parsed.expiry) {
        memoryCache.set(key, parsed)
        return parsed.data
      }
      localStorage.removeItem(`${CACHE_PREFIX}${key}`)
    } catch {
      return null
    }

    return null
  },

  set(key, data, ttl = DEFAULT_TTL) {
    const entry = { data, expiry: Date.now() + ttl }
    memoryCache.set(key, entry)

    try {
      localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry))
    } catch {
      // Storage quota exceeded or unavailable
    }
  }
}
