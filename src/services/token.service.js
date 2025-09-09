// /src/services/tokenService.js
import api from './api'

class TokenService {
  // ---- Setters ----
  setToken(token) {
    localStorage.setItem('auth_token', token)
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  setAbilities(abilities) {
    localStorage.setItem('abilities', JSON.stringify(abilities || {}))
  }

  // ---- Getters ----
  getToken() {
    return localStorage.getItem('auth_token')
  }

  getUser() {
    try {
      const userStr = localStorage.getItem('user')
      return userStr ? JSON.parse(userStr) : null
    } catch (e) {
      console.error('Error parsing user:', e)
      return null
    }
  }

  getAbilities() {
    try {
      const abilitiesStr = localStorage.getItem('abilities')
      return abilitiesStr ? JSON.parse(abilitiesStr) : {}
    } catch (e) {
      console.error('Error parsing abilities:', e)
      return {}
    }
  }

  // ---- Clear ----
  removeToken() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    localStorage.removeItem('abilities')
  }

  // ---- Helpers ----
  isAuthenticated() {
    return !!this.getToken()
  }

  hasAbility(ability) {
    const abilities = this.getAbilities()
    return abilities && abilities[ability] === true
  }

  // Load user info from backend (if you expose /api/me)
  async loadUserInfo() {
    try {
      const response = await api.get('/me')
      if (response.data && response.data.user) {
        this.setUser(response.data.user)
        this.setAbilities(response.data.abilities || {})
        return response.data
      }
      return null
    } catch (error) {
      console.error('Failed to load user info:', error)
      return null
    }
  }
}

const tokenService = new TokenService()
export default tokenService