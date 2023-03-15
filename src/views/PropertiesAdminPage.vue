<template>
    <b-card
      v-if="AllProperties"
      no-body
      class="card-company-table text-center"
    >

    <div class="list row center-search-bar">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input @input="searchBy" type="text" class="form-control" placeholder="Search .. "
            v-model="searchKey"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchBy"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>

      <b-table
        :items="AllProperties"
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
              <strong>Name : </strong>{{ row.item.name }}
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
        <template #cell(name)="data">
          <div class="d-flex align-items-center">
              <div class="font-weight-bolder">
                {{ data.value }}
              </div>
          </div>
        </template>

        <!-- category -->
        <template #cell(category)="data">
          <div class="d-flex align-items-center font-weight-bold">
            <span>{{ data.value }}</span>
          </div>
        </template>

        <!-- revenue -->
        <template #cell(price)="data">
          <div class="font-weight-bold">
            <span>{{ data.value }}</span>
          </div>
        </template>

        <!-- deed -->
        <template #cell(status)="data">
         <b-form-checkbox @input="changeStatusProperty(data)" v-model="data.value" name="check-button" switch style="margin-right: 20px;">
            <b v-if="data.value"> Active </b>
            <b v-if="!data.value"> Deactive </b>
          </b-form-checkbox>
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
            v-b-modal.modal-delete-one
            @click='getValue(data.item)'
          >
            <feather-icon
              icon="UploadIcon"
              class="mr-50"
            />
            <span>Delete</span>
          </b-dropdown-item>

          <b-dropdown-item
            @click='redirectEditProperty(data.value)'
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
    <modal-confirm-delete-one-property :property="selectedProperty" />
    </b-card>
</template>

<script>
import {
  BCard, BTable, BPagination, VBTooltip, BFormCheckbox, BButton, BRow, BCol,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import { mapState } from 'vuex'
import ModalConfirmDeleteOneProperty from '@/views/components/ModalConfirmDeleteOneProperty.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import UsersService from '../services/UsersService'
import property from '@/store/property'
import PropertyService from '../services/PropertyService'

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
    ModalConfirmDeleteOneProperty,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      fields: [
        'show_details',
        { key: 'name', label: 'PROPERTY' },
        { key: 'category', label: 'CATEGORY' },
        { key: 'price', label: 'PRICE' },
        { key: 'deed', label: 'DEED' },
        { key: 'status', label: 'STATUS' },
        { key: 'id', label: 'ACTION' },
      ],
      tableData: [],
      searchKey: '',
      selectedProperty: null,
      statusProperty: null,
    }
  },

  computed: {
    rows() {
      return this.$store.state.user.properties.data.length
    },
    AllProperties() {
      return this.$store.state.user.properties.data?.sort((a, b) => {
            return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          })
    },
    ...mapState({
      user: state => state.user.user,
    }),
  },

  mounted() {
    this.getResults()
  },

  methods: {
    changeStatusProperty(data) {
      let prop = data.item
      prop.status = data.value
      console.log(prop)
      PropertyService.updateProp(data.item.id, prop)
        .then(response => {
          console.log(this.$store.state.user.properties)
          this.$store.state.user.properties.data.filter(i => {
            if (i.id === prop.id) {
              // eslint-disable-next-line no-param-reassign
              i = prop
              console.log(i)
            }
          })
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'status property has changed successfully',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.hideModal()
          this.messageEr = ''
          this.isLoadingSubmit = false
        })
        .catch((error) => {
          this.messageEr =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          console.log(this.messageEr)
        })
    },
    getValue(data) {
      this.selectedProperty = data
    },
    redirectEditProperty(id) {
      this.$router.push({ path: `/edit-property?id=${id}` })
    },
    getResults() {
      this.$store.dispatch('user/fetchAllProperties').then(
        (res) => {
          // console.log(res.data)
          // res.data.filter((a, b) => {
          //   console.log(new Date(a.createdAt), new Date(b.createdAt));
          // })
          console.log()
          return res.data.sort((a, b) => {
            return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          }).slice(0, 1)
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        },
      )
    },
    searchBy() {
      UsersService.searchProp(this.searchKey)
        .then(response => {
          console.log(response)
          this.$store.state.user.properties.data = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
  }
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
