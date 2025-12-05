/**
 * Geocoding Cache
 * Cache simple en memoria para evitar geocodificar la misma dirección múltiples veces
 * 
 * IMPORTANTE: Este cache ayuda a reducir costes de Google Maps API
 * evitando llamadas repetidas para las mismas direcciones.
 */

class GeocodingCache {
  constructor(maxSize = 100, ttl = 24 * 60 * 60 * 1000) {
    // maxSize: máximo de entradas en el cache (default: 100)
    // ttl: tiempo de vida en milisegundos (default: 24 horas)
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  /**
   * Genera una clave única para una dirección
   */
  _getKey(address) {
    return address.trim().toLowerCase();
  }

  /**
   * Verifica si una entrada del cache ha expirado
   */
  _isExpired(entry) {
    return Date.now() - entry.timestamp > this.ttl;
  }

  /**
   * Limpia entradas expiradas
   */
  _cleanExpired() {
    for (const [key, entry] of this.cache.entries()) {
      if (this._isExpired(entry)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Limpia entradas si el cache está lleno (FIFO)
   */
  _evictIfNeeded() {
    if (this.cache.size >= this.maxSize) {
      // Eliminar la entrada más antigua
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }

  /**
   * Obtiene coordenadas del cache
   * @param {string} address - Dirección a buscar
   * @returns {Object|null} - Coordenadas o null si no está en cache
   */
  get(address) {
    const key = this._getKey(address);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (this._isExpired(entry)) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Guarda coordenadas en el cache
   * @param {string} address - Dirección
   * @param {Object} data - Datos de geocodificación
   */
  set(address, data) {
    this._cleanExpired();
    this._evictIfNeeded();

    const key = this._getKey(address);
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Verifica si una dirección está en el cache
   */
  has(address) {
    const key = this._getKey(address);
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }

    if (this._isExpired(entry)) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Limpia todo el cache
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Obtiene estadísticas del cache
   */
  getStats() {
    this._cleanExpired();
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      ttl: this.ttl
    };
  }
}

// Instancia singleton del cache
export const geocodingCache = new GeocodingCache(100, 24 * 60 * 60 * 1000); // 100 entradas, 24 horas TTL

export default geocodingCache;

