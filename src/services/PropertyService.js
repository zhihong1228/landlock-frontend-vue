/* eslint-disable class-methods-use-this */
import http from '@/libs/axios'

class PropertyService {
  create(property) {
    return http.post('property', property)
  }

  findAlll() {
    return http.get('property')
  }

  findOne(propertyId) {
    return http.get(`property/${propertyId}`)
  }

  updateProp(propertyId, property) {
    return http.put(`property/${propertyId}`, property)
  }

  updatePropOwner(propertyId, owners) {
    return http.put(`property/owner/${propertyId}`, owners)
  }

  updatePropImage(propertyId, image) {
    return http.put(`property/image/${propertyId}`, { image })
  }

  deleteProp(propertyId) {
    return http.delete(`property/${propertyId}`)
  }

  deleteAllProp() {
    return http.delete('property')
  }

  deleteOwner(ownerId) {
    return http.delete(`property/owner/${ownerId}`)
  }

  stripe(data) {
    return http.post('stripe/charge', data)
  }

  sendMailToOwner(email) {
    return http.post('property/sendMailToOwner', { email })
  }

  search(searchKey) {
    return http.post('/property/search', { searchKey })
  }

  step1(data) {
    return http.post('/property/verifCertif/step1', data)
  }

  step2(data) {
    return http.post('/property/verifCertif/step2', data)
  }

  step3(data) {
    return http.post('/property/verifCertif/step3', data)
  }

  generateID(propertyId) {
    return http.post(`/property/generateID/${propertyId}`)
  }

  generateCertificate(propertyId, data) {
    return http.post(`/property/generateCertificate/${propertyId}`, data)
  }

  verifForm(data) {
    return http.post('/property/verifForm', data)
  }

  getPropertyByUser() {
    return http.get('/auth/getPropertyByUser')
  }

  getPropertyByGeneratedID(generatedID) {
    console.log(generatedID)
    return http.get(`/property/getPropertyByGeneratedID/${generatedID}`)
  }
}

export default new PropertyService()
