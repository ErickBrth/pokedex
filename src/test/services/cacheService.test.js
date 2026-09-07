import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { cacheService } from '../../services/cacheService'

describe('cacheService', () => {
  beforeEach(() => {
    localStorage.clear()
    // Reset the internal memory cache by calling get on a non-existent key
    // (side effect: ensures no stale entries exist between tests)
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('set and get', () => {
    it('stores and retrieves a value from memory cache', () => {
      cacheService.set('test-key', { name: 'pikachu' })
      const result = cacheService.get('test-key')
      expect(result).toEqual({ name: 'pikachu' })
    })

    it('persists value to localStorage', () => {
      cacheService.set('persist-key', { id: 25 })
      const raw = localStorage.getItem('pokeapi_persist-key')
      expect(raw).not.toBeNull()
      const parsed = JSON.parse(raw)
      expect(parsed.data).toEqual({ id: 25 })
    })

    it('returns null for non-existent key', () => {
      expect(cacheService.get('non-existent')).toBeNull()
    })

    it('returns null for expired entry', () => {
      const pastExpiry = Date.now() - 1000
      localStorage.setItem('pokeapi_expired', JSON.stringify({ data: 'old', expiry: pastExpiry }))
      expect(cacheService.get('expired')).toBeNull()
    })

    it('removes expired entry from localStorage', () => {
      const pastExpiry = Date.now() - 1000
      localStorage.setItem('pokeapi_expired2', JSON.stringify({ data: 'old', expiry: pastExpiry }))
      cacheService.get('expired2')
      expect(localStorage.getItem('pokeapi_expired2')).toBeNull()
    })

    it('stores different value types: string', () => {
      cacheService.set('str-key', 'hello world')
      expect(cacheService.get('str-key')).toBe('hello world')
    })

    it('stores different value types: array', () => {
      cacheService.set('arr-key', [1, 2, 3])
      expect(cacheService.get('arr-key')).toEqual([1, 2, 3])
    })

    it('stores different value types: number', () => {
      cacheService.set('num-key', 42)
      expect(cacheService.get('num-key')).toBe(42)
    })
  })

  describe('TTL', () => {
    it('accepts a custom TTL', () => {
      const shortTtl = 500
      cacheService.set('ttl-key', 'value', shortTtl)
      const raw = localStorage.getItem('pokeapi_ttl-key')
      const parsed = JSON.parse(raw)
      expect(parsed.expiry).toBeLessThanOrEqual(Date.now() + shortTtl + 5)
    })
  })

  describe('localStorage unavailability', () => {
    it('does not throw when localStorage.setItem throws', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError')
      })
      expect(() => cacheService.set('safe-key', 'data')).not.toThrow()
      Storage.prototype.setItem.mockRestore()
    })

    it('returns null gracefully when localStorage.getItem throws', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('SecurityError')
      })
      // Remove from memory to force localStorage read
      expect(cacheService.get('no-memory-key')).toBeNull()
      Storage.prototype.getItem.mockRestore()
    })
  })
})
