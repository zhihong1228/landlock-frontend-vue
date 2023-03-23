/* eslint-disable class-methods-use-this */
import http from '@/libs/axios'

class AuthService {
  logout() {
    return http.post('auth/logout')
  }

  getUser() {
    return http.get('auth/me')
  }

  sendOTP(data) {
    return http.post('auth/sendOTP', { mobile: data })
  }

  confirmMobile(data) {
    return http.post('auth/confirmMobile', data)
  }

  isConfirmed(data) {
    return http.post('auth/confirmEmail', data)
  }

  register(data) {
    return http.post('auth/register', data)
  }

  login(data) {
    return http.post('auth/login', data)
  }

  resetPassword(data) {
    return http.post('auth/resetPassword', data)
  }

  changePassword(data) {
    const query = data.userId != null ? `?token=${data.token}&userId=${data.userId}` : ''
    return http.post(`auth/changePassword${query}`, data)
  }

  confirm(userId) {
    return http.post(`auth/confirmation?userId=${userId}`)
  }

  contact(data) {
    return http.post('auth/contact', data)
  }

  sendMail(data) {
    return http.post('auth/sendMail', { userId: data })
  }
}

export default new AuthService()
