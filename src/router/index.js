import Vue from 'vue'
import VueRouter from 'vue-router'
import multiguard from 'vue-router-multiguard'

Vue.use(VueRouter)

const ifExpiredToken = (to, from, next) => {
  const accessToken = localStorage.getItem('token')
  if (accessToken) {
    const decodedJWT = JSON.parse(atob(accessToken.split('.')[1]))
    if (decodedJWT.exp * 1000 < Date.now()) {
      localStorage.removeItem('token')
      window.location.href = '/login-page'
    }
    next()
  }
}

const removeToken = (to, from, next) => {
  // localStorage.removeItem('token')
  // localStorage.setItem('userData', JSON.stringify({}))
  next()
}

const ifNotExistedToken = (to, from, next) => {
  const accessToken = (localStorage.getItem('token'))
  if (accessToken) {
    next()
  } else {
    localStorage.removeItem('token')
    window.location.href = '/login-page'
  }
}

const ifIdentityIsVerify = (to, from, next) => {
  const accessToken = (localStorage.getItem('token'))
  const user = JSON.parse(localStorage.getItem('userData'))
  if (accessToken) {
    if (user?.step3 === 'complete') {
      next()
    } else {
      next({ name: 'identity-verification' })
    }
  }
}

const isAdmin = (to, from, next) => {
  const accessToken = (localStorage.getItem('token'))
  const user = JSON.parse(localStorage.getItem('userData'))
  if (accessToken) {
    if (user?.role === 'super_admin') {
      next()
    } else {
    }
  }
}

const verifStep3 = (to, from, next) => {
  const accessToken = (localStorage.getItem('token'))
  const user = JSON.parse(localStorage.getItem('userData'))
  console.log('user:', user, user.step2)
  if (accessToken) {
    if (user?.confirmedEmail !== true || user?.confirmedMobile !== true) {
      next({ name: 'register-page' })
    } else if (user?.step2 === 'complete' && to && to.name === 'identity-verification') {
      next('verif-persona')
    } else if (user?.step3 === 'incomplete') {
      next()
    } else {
      next({ name: 'home' })
    }
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      beforeEnter: multiguard([
        ifNotExistedToken,
        ifExpiredToken,
        ifIdentityIsVerify,
        /* , ifUserFirstProperty */
      ]),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login-page',
      name: 'login-page',
      component: () => import('@/views/LoginPage.vue'),
      beforeEnter: removeToken,
      meta: {
        pageTitle: 'Login Page',
        breadcrumb: [
          {
            text: 'Login Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/register-page',
      name: 'register-page',
      component: () => import('@/views/RegisterPage.vue'),
      meta: {
        pageTitle: 'Register Page',
        breadcrumb: [
          {
            text: 'Register Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/forget-password-page',
      name: 'forget-password-page',
      component: () => import('@/views/ForgetPasswordPage.vue'),
      meta: {
        pageTitle: 'Forget Password Page',
        breadcrumb: [
          {
            text: 'Forget Password Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/recover-password-page/',
      name: 'recover-password-page',
      component: () => import('@/views/RecoverPasswordPage.vue'),
      meta: {
        pageTitle: 'Recover Password Page',
        breadcrumb: [
          {
            text: 'Recover Password Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/property',
      name: 'property',
      component: () => import('@/views/Property.vue'),
      beforeEnter: multiguard([ifNotExistedToken, ifExpiredToken, ifIdentityIsVerify]),
      meta: {
        pageTitle: 'Property',
        breadcrumb: [
          {
            text: 'Property',
            active: true,
          },
        ],
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/UsersPage.vue'),
      beforeEnter: multiguard([ifNotExistedToken, ifExpiredToken, isAdmin]),
      meta: {
        pageTitle: 'Users',
        breadcrumb: [
          {
            text: 'Users',
            active: false,
          },
        ],
      },
    },

    {
      path: '/properties',
      name: 'properties',
      component: () => import('@/views/PropertiesAdminPage.vue'),
      beforeEnter: multiguard([ifNotExistedToken, ifExpiredToken, isAdmin]),
      meta: {
        pageTitle: 'Properties',
        breadcrumb: [
          {
            text: 'Properties',
            active: false,
          },
        ],
      },
    },
    {
      path: '/properties/:id',
      name: 'view-property',
      component: () => import('@/views/ViewProperty.vue'),
      beforeEnter: multiguard([ifNotExistedToken, ifExpiredToken]),
      meta: {
        pageTitle: 'Property details',
        breadcrumb: [
          {
            text: 'Properties',
            active: false,
          },
        ],
        backButton: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/account-setting/AccountSetting.vue'),
      beforeEnter: multiguard([ifNotExistedToken, ifExpiredToken]),
      meta: {
        pageTitle: 'Profile',
        breadcrumb: [
          {
            text: 'Profile',
            active: false,
          },
        ],
        backButton: true,
      },
    },

    {
      path: '/add/:id',
      name: 'add',
      component: () => import('@/views/components/register-property/AddProperty.vue'),
      beforeEnter: multiguard([ifNotExistedToken, ifExpiredToken]),
      meta: {
        pageTitle: 'Add/Edit Property',
        // layout: 'full',
        backButton: false,
        hideLogout: true,
        xButton: true,
      },
    },
    {
      path: '/verif-cert/:id',
      name: 'verif-cert',
      component: () => import('@/views/components/certificate/ModalVerifCert.vue'),
      props: true,
      beforeEnter: multiguard([ifNotExistedToken, ifExpiredToken]),
      meta: {
        // layout: 'full',
        xButton: true,
        hideLogout: true,
      },
    },
    {
      path: '/verif-persona',
      name: 'verif-persona',
      component: () => import('@/views/components/verify-identity/VerifyPersona.vue'),
      beforeEnter: multiguard([ifNotExistedToken, ifExpiredToken, verifStep3]),
      meta: {
        pageTitle: 'verif-persona',
        layout: 'full',
        breadcrumb: [
          {
            text: 'verif-persona',
            active: false,
          },
        ],
      },
    },
    // {
    //   path: '/verif-id',
    //   name: 'verif-id',
    //   component: () => import('@/views/components/verify-identity/VerifyIdentity.vue'),
    //   beforeEnter: multiguard([ifExpiredToken, ifNotExistedToken]),
    //   meta: {
    //     pageTitle: 'verif-id',
    //     breadcrumb: [
    //       {
    //         text: 'verif-id',
    //         active: false,
    //       },
    //     ],
    //   },
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/identity-verification',
      name: 'identity-verification',
      component: () => import('@/views/Identity.vue'),
      beforeEnter: multiguard([ifNotExistedToken, ifExpiredToken, verifStep3]),
      meta: {
        // layout: 'full',
      },
    },
    {
      path: '/verif-form/:id',
      name: 'verif-form',
      component: () => import('@/views/VerifUserQrcode.vue'),
      // beforeEnter: multiguard([ifNotExistedToken, ifExpiredToken]),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/edit-property',
      name: 'edit-property',
      component: () => import('@/views/AdminEditProperty.vue'),
      beforeEnter: multiguard([ifNotExistedToken, ifExpiredToken, isAdmin]),
      meta: {
        pageTitle: 'Edit Property',
        breadcrumb: [
          {
            text: 'Edit Property',
            active: false,
          },
        ],
      },
    },
    {
      path: '/edit-user',
      name: 'edit-user',
      component: () => import('@/views/AdminEditUser.vue'),
      beforeEnter: multiguard([ifNotExistedToken, ifExpiredToken, isAdmin]),
      meta: {
        pageTitle: 'Edit User',
        breadcrumb: [
          {
            text: 'Edit User',
            active: false,
          },
        ],
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
