/* eslint-disable class-methods-use-this */
import http from '@/libs/axios'

class UsersService {
  getAllUsers() {
    return http.get('admin/users')
  }

  getOneUser(userId) {
    return http.get(`admin/users/${userId}`)
  }

  getAllProperties() {
    return http.get('admin/properties')
  }

  getUser(propertyId) {
    return http.get(`admin/users/${propertyId}`)
  }

  changePassword(data) {
    return http.post('admin/changePassword', data)
  }

  searchUser(searchKey) {
    return http.post('admin/searchUser', { searchKey })
  }

  searchProp(searchKey) {
    return http.post('admin/searchProp', { searchKey })
  }

  updateUser(data) {
    console.log(data)
    return http.put('auth/updateUser', data)
  }

  updatePassword(data) {
    console.log(data)
    return http.put('auth/updatePassword', data)
  }

  verifPassword(data) {
    console.log(data)
    return http.post('auth/verifPassword', data)
  }

  deleteUser(userId) {
    return http.delete(`admin/${userId}`)
  }

  updateUserInfo(userId, data) {
    return http.put(`admin/updateUserInfo/${userId}`, data)
  }

  verifSSN(data) {
    console.log(data)
    return http.post('auth/ssnVerif', data)
  }

  updatePersona(data) {
    console.log(data)
    return http.post('auth/personaUpdate', data)
  }

  deletePersona(data) {
    console.log(data)
    return http.delete(`auth/deleteInquierie/${data.inquiryId}`)
  }

  verifUserProperty() {
    return http.post('auth/verifUserFirstProperty')
  }
}

export default new UsersService()
