<template>
  <div class="navbar-container d-flex align-items-center justify-content-between px-md-3 px-lg-3">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav  <!-- d-xl-none--> align-self-center" style="display: none;">
      <!--      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>-->

      <li
        v-hide="!$route.meta.backButton"
        class="nav-item"
        style="width: 40px;"
      >
        <feather-icon
          class="cursor-pointer ml-md-1"
          :style="{
            color: 'var(--primary)',
          }"
          style="margin-left: 6px;"
          icon="ArrowLeftCircleIcon"
          size="30"
          @click="$router.back()"
        />
      </li>
    </ul>

    <!--center -->
    <ul
      class="nav navbar-nav"
    >
      <li
        v-if="!$route.meta.backButton"
        class="nav-item "
      >
        <b-link
          class="navbar-brand"
          to="/"
        >
          <span class="brand-logo">
            <b-img
              :src="appLogoImage"
              alt="logo"
            />
          </span>
          <h2 class="brand-text mb-0">
            {{ appName }}
          </h2>
        </b-link>
      </li>
      <li
        v-else
        class="nav-item"
      >
        <b-link
          class="navbar-brand d-flex flex-row align-items-center"
          to="/"
        >
          <span
            class="d-flex align-items-center justify-content-center"
            style="background-color: #F8F8F8; border-radius: 99px; width: 62px; height: 48px; margin-right: 20px;"
          >
            <b-img
              style="width: 30px; height: 30px;"
              src="../../assets/images/icons/back-dark.png"
              alt="back"
            />
          </span>
          <h2 class="brand-text mb-0 color-dark">
            {{ $route.meta.pageTitle }}
          </h2>
        </b-link>
      </li>

    </ul>

    <!-- Left Col -->
    <!-- <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div> -->

    <b-navbar-nav class="nav align-items-center justify-content-end">
      <div
        v-if="user && user.id && !$route.meta.hideLogout && token"
        class="d-flex align-items-center justify-content-end cursor-pointer"
        title="Logout"
        style="width: 40px"
        @click="logout"
      >
        <b-spinner
          v-if="loggingOut"
          variant="primary"
          style="width: 25px; height: 25px;"
        />
        <feather-icon
          v-else
          size="25"
          icon="LogOutIcon"
          class=" mr-md-1 cursor-pointer"
          style="color: var(--primary);margin-right: 6px;"
        />
        <!--          <span style="color: black">Logout</span>-->
      </div>
      <div
        v-if="$route.meta.hideLogout && $route.meta.xButton"
        class="d-flex align-items-center cursor-pointer"
        title="Back"
        style="width: 40px"
        @click="back()"
      >
        <feather-icon
          size="39"
          icon="XIcon"
          class=" mr-md-1 cursor-pointer"
          style="color: var(--primary); margin-right: 6px;"
        />
        <!--          <span style="color: black">Logout</span>-->
      </div>
      <b-nav-item-dropdown
        v-if="user.id"
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-flex user-nav">
            <!--            <p
              v-if="currentUser"
              class="user-name font-weight-bolder mb-0"
            >
              {{ currentUser.firstName + ' ' + currentUser.lastName }}
            </p>
            <span
              v-if="currentUser"
              class="user-status"
            >
              {{ currentUser.email }}
            </span>-->
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            :src="require('@/assets/images/avatars/13-small.png')"
          />
          <!--          badge-->
          <!--          class="badge-minimal"-->
          <!--          badge-variant="success"-->
        </template>
        <!--

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="UserIcon"
            class="mr-50"
          />
          <span>Profile</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="MailIcon"
            class="mr-50"
          />
          <span>Inbox</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="CheckSquareIcon"
            class="mr-50"
          />
          <span>Task</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="MessageSquareIcon"
            class="mr-50"
          />
          <span>Chat</span>
        </b-dropdown-item>

        <b-dropdown-divider />
-->

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout"
        >
          <b-spinner
            v-if="loggingOut"
            variant="primary"
            small
          />
          <feather-icon
            v-else
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <!--      <div v-else-if="$route.path.endsWith('login-page')">
        <router-link
          :to="{ name: 'register-page' }"
          style="font-family:Avenir,sans-serif;font-weight: bold; font-size:20px; color:white; margin-right:20px"
        > Register
        </router-link>
      </div>
      <div v-else-if="$route.path.endsWith('register-page')">
        <router-link
          :to="{ name: 'login-page' }"
          style="font-family:Avenir,sans-serif;font-weight: bold; font-size:20px; color:white; margin-right:20px"
        > Login
        </router-link>
      </div>-->
    </b-navbar-nav>
  </div>
</template>

<script>
// import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import { mapMutations, mapState } from 'vuex'
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BAvatar, BImg, BSpinner,
} from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'
import AuthService from '../../services/AuthService'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,
    BImg,
    BSpinner,
    // Navbar Components
    // DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      loggingOut: false,
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
    appName() {
      return $themeConfig.app.appName
    },
    appLogoImage() {
      return $themeConfig.app.appLogoImage
    },
    token() {
      return localStorage.getItem('token')
    },
  },
  mounted() {
    if (this.token !== null) this.getUser()
  },
  methods: {
    ...mapMutations({
      updateUser: 'user/UPDATE_USER',
    }),
    ...mapMutations({
      logoutUser: 'user/LOGOUT_USER',
    }),
    // logout() {
    //   console.log(this.$store.state.user.user)

    //   this.deleteToken()
    // },
    getUser() {
      AuthService.getUser()
        .then(response => {
          this.updateUser(response.data.userData.user)
        })
        .catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('token')
            // window.location.href = '/login-page' // Can't use it because it will redirect to the login page even on pages which don't require login.
            // window.location.replace(process.env.VUE_APP_BACKOFFICE_MAIN === window.location.href ? process.env.VUE_APP_FRONT_MAIN : process.env.VUE_APP_FRONT_LOCAL)
          }
        })
    },
    logout() {
      console.log("route meta: ", this.$route.meta)
      return
      this.loggingOut = true
      AuthService.logout()
        .then(() => {
          this.loggingOut = false
          this.logoutUser()
          window.location.href = '/login-page'
        })
        .catch(error => {
          this.loggingOut = false
          const messageEr = (error.response
                && error.response.data
                && error.response.data.message)
                || error.message
                || error.toString()
          console.log(messageEr)
        })
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
