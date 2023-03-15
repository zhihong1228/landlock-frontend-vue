<template>
  <b-card
    v-if="AllUsers"
    no-body
    class="card-company-table text-center"
  >
    <div class="list row center-search-bar">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input @input="searchBy" type="text" class="form-control" placeholder="Search .. " v-model="searchKey"/>
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="searchBy"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>

    <b-table
      :items="AllUsers"
      :per-page="perPage"
      :current-page="currentPage"
      responsive
      borderless
      :fields="fields"
      class="mb-0"
      show-empty
    >
      <template #cell(show_details)="row">
        <b-form-checkbox
          v-model="row.detailsShowing"
          plain
          class="vs-checkbox-con"
          @change="row.toggleDetails"
        >
          <span class="vs-checkbox">
            <span class="vs-checkbox--check">
              <i class="vs-icon feather icon-check" />
            </span>
          </span>
          <span class="vs-label">{{ row.detailsShowing ? 'Hide' : 'Show' }}</span>
        </b-form-checkbox>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="">
            <b-col
              md="3"
              class=""
            >
              <strong>Full Name : </strong>{{ row.item.firstName }} {{ row.item.lastName }}
            </b-col>

            <b-col
              md="3"
              class=""
            >
              <strong>Email : </strong>{{ row.item.email }}
            </b-col>
            <b-col
              md="3"
              class=""
            >
              <strong>City : </strong>{{ row.item.city }}
            </b-col>

            <b-col
              md="3"
              class=""
            >
              <strong>Date of Birth : </strong>{{ row.item.dob }}
            </b-col>
          </b-row>

          <b-button
            size="sm"
            variant="outline-secondary"
            @click="row.toggleDetails"
          >
            Hide Details
          </b-button>
        </b-card>
      </template>

      <!-- company -->
      <template #cell(firstName)="data">
        <div class="d-flex align-items-center">
          <div class="font-weight-bolder">
            {{ data.value }}
          </div>
        </div>
      </template>

      <!-- category -->
      <template #cell(lastName)="data">
        <div class="d-flex align-items-center font-weight-bold">
          <span>{{ data.value }}</span>
        </div>
      </template>

      <!-- revenue -->
      <template #cell(email)="data">
        <div class="font-weight-bold">
          <span>{{ data.value }}</span>
        </div>
      </template>

      <!-- deed -->
      <template #cell(step3)="data">
        <template v-if="data.value === 'complete'">
          <feather-icon
            v-b-tooltip.hover.top="'Completed'"
            icon="CheckCircleIcon"
            size="20"
            class="align-middle"
            style="color: green"
          />
        </template>
        <template v-else>
          <feather-icon
            v-b-tooltip.hover.top="'Pending !'"
            icon="AlertCircleIcon"
            size="20"
            class="align-middle warning"
          />
        </template>
      </template>

      <!-- status -->
      <template #cell(ssn)="data">
        <span>{{ data.value }}</span>
      </template>

      <!-- Column: Action -->
      <template #cell(id)="data">
        <b-dropdown
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
        >
          <template v-slot:button-content>
            <feather-icon
              icon="MoreVerticalIcon"
              size="16"
              class="text-body align-middle mr-25"
            />
          </template>
          <b-dropdown-item
            v-b-modal.modal-change-password
            @click="getValue(data.item)"
          >
            <feather-icon
              icon="UploadIcon"
              class="mr-50"
            />
            <span>Change Password</span>
          </b-dropdown-item>

          <b-dropdown-item
            v-b-modal.modal-delete-one-user
            @click="getValue(data.item)"
          >
            <feather-icon
              icon="UploadIcon"
              class="mr-50"
            />
            <span>Delete</span>
          </b-dropdown-item>

          <b-dropdown-item
            @click="redirectEditUser(data.value)"
          >
            <feather-icon
              icon="UploadIcon"
              class="mr-50"
            />
            <span>Edit</span>
          </b-dropdown-item>

        </b-dropdown>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
    ></b-pagination>
    <modale-reset-password :user="selectedUser" />
    <modal-confirm-delete-one-user :user="selectedUser" />
  </b-card>
</template>

<script>
import {
  BCard,
  BTable,
  BPagination,
  VBTooltip,
  BFormCheckbox,
  BButton,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapState } from 'vuex'
import ModaleResetPassword from '@/views/components/ModaleResetPassword.vue'
import ModalConfirmDeleteOneUser from '@/views/components/ModalConfirmDeleteOneUser.vue'
import UsersService from '../services/UsersService'
import { errMessage } from '../utils/errMessage'

export default {
  components: {
    BCard,
    BTable,
    BPagination,
    BFormCheckbox,
    BButton,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    ModaleResetPassword,
    ModalConfirmDeleteOneUser,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        'show_details',
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'LAST NAME' },
        { key: 'email', label: 'EMAIL' },
        { key: 'step3', label: 'STATUS' },
        { key: 'ssn', label: 'SSN' },
        { key: 'id', label: 'ACTION' },
      ],
      tableData: [],
      selectedUser: null,
      ID: null,
      searchKey: '',
      isEmpty: false,
      property1: {
        id: null,
        status: true,
      },
      qrValue: 'My secret value',
    }
  },

  computed: {
    rows() {
      return this.$store.state.user.users.data.length
    },
    AllUsers() {
      return this.$store.state.user.users.data
    },
    ...mapState({
      user: state => state.user.user,
    }),
  },

  mounted() {
    this.getResults()
  },

  methods: {
    getValue(data) {
      // console.log(data)
      this.selectedUser = data
    },

    getResults() {
      this.$store.dispatch('user/fetchAllUsers').then(
        // eslint-disable-next-line arrow-parens
        (res) => {
          console.log()
          return res.data
        },
        // eslint-disable-next-line arrow-parens
        (error) => {
          this.loading = false
          this.messageEr = null
          this.messageEr = errMessage(error)
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Error!',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
              text: `${this.messageEr || 'something went wrong! #878dfgh'}`,
            },
          })
        },
      )
    },

    searchBy() {
      UsersService.searchUser(this.searchKey)
        .then(response => {
          console.log(response)
          this.$store.state.user.users.data = response.data
        })
        .catch(e => {
          this.messageEr = errMessage(e)
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Error!',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
              text: `${this.messageEr || 'something went wrong! #878dfgh'}`,
            },
          })
        })
    },

    redirectEditUser(id) {
      this.$router.push({ path: `/edit-user?id=${id}` })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.card-company-table ::v-deep td .b-avatar.badge-light-company {
  .dark-layout & {
    background: $theme-dark-body-bg !important;
  }
}
.warning{
  color: #FFCC00;
}

.center-search-bar{
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
