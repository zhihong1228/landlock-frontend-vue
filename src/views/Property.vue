<template>
  <div>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input
            v-model="searchKey"
            type="text"
            class="form-control"
            placeholder="Search .. "
            @input="searchBy"
          >
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
    <b-card
      v-if="AllProperties"
      no-body
      class="card-company-table"
    >
      <b-table
        :items="AllProperties"
        responsive
        borderless
        :fields="fields"
        class="mb-0"
        show-empty
      >
        <!-- company -->
        <template #cell(name)="data">
          <div class="d-flex align-items-center">
            <div>
              <div class="font-weight-bolder">
                {{ data.item.name }}
              </div>
              <div class="font-small-2 text-muted">
                {{ data.item.address }}
              </div>
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
            {{ '$'+data.value }}
          </div>
        </template>

        <!-- deed -->
        <template #cell(deed)="data">
          <div
            v-if="data.item.status"
            class="font-weight-bold"
          >
            Uploaded
          </div>
          <div
            v-else
            class="font-weight-bold"
            style=" cursor: pointer"
            @click="chooseFiles(data.item)"
          >
            <feather-icon
              icon="UploadIcon"
              class="mr-50"
            />
            <span>upload</span>
          </div>
          <input
            id="fileUpload"
            type="file"
            hidden
            @change="handleFileChange($event)"
          >
        </template>

        <!-- status -->
        <template #cell(status)="data">
          <template v-if="data.value && user.step3 === 'complete'">
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
              v-b-tooltip.hover.top="'Incomplete !'"
              icon="AlertCircleIcon"
              size="20"
              class="align-middle warning"
            />
          </template>
        </template>
        <!-- Column: Action -->
        <template #cell(id)="data">
          <span>
            <b-dropdown
              v-if="!(data.item.status && user.step3 === 'complete')"
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
              <span
                v-b-modal.editProperty
                data-bs-toggle="modal"
                class="card-text font-small-3 mb-0 text-danger"
                @click="getValue(data.item)"
              >
                <b-dropdown-item>
                  <feather-icon
                    icon="Edit2Icon"
                    class="mr-50"
                  />
                  <span>Edit</span>
                </b-dropdown-item>
              </span>
              <b-dropdown-item
                v-b-modal.modal-delete-one
                @click="getValue(data.item)"
              >
                <feather-icon
                  icon="TrashIcon"
                  class="mr-50"
                />
                <span>Delete</span>
              </b-dropdown-item>
              <b-dropdown-item
                @click="chooseFiles(data.item)"
              >
                <feather-icon
                  icon="UploadIcon"
                  class="mr-50"
                />
                <span>upload deed</span>
              </b-dropdown-item>
            </b-dropdown>
            <span
              v-if="data.item.status && user.step3 === 'complete'"
              style=" cursor: pointer"
            >
              <feather-icon
                icon="RefreshCcwIcon"
                class="mr-50"
              />
              <span>Certificate </span>
            </span>
          </span>
        </template>
      </b-table>
    </b-card>
    <template v-if="AllProperties.length !== 0">
      <b-button
        v-b-modal.modal-delete-all
        class="mb-1"
        variant="danger"
      >
        <div class="text-nowrap d-flex align-items-center">
          <span class="mr-1">Remove All</span>
          <feather-icon
            icon="TrashIcon"
            size="15"
          />
        </div>
      </b-button>
    </template>
    <!-- <modal-edit-property :property="property" /> -->
    <modal-confirm-delete-all-property />
    <modal-confirm-delete-one-property :property="property" />
  </div>

</template>

<script>
import {
  BCard, BTable, BDropdown, BDropdownItem, BButton, VBTooltip, BFormInput,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapGetters, mapActions, mapState } from 'vuex'
import ModalEditProperty from '@/views/components/ModalEditProperty.vue'
import ModalConfirmDeleteAllProperty from '@/views/components/ModalConfirmDeleteAllProperty.vue'
import ModalConfirmDeleteOneProperty from '@/views/components/ModalConfirmDeleteOneProperty.vue'
import PropertyService from '../services/PropertyService'
import { errMessage } from '../utils/errMessage'

export default {
  components: {
    BCard,
    BTable,
    BDropdown,
    BDropdownItem,
    BButton,
    BFormInput,
    ModalEditProperty,
    ModalConfirmDeleteAllProperty,
    ModalConfirmDeleteOneProperty,

  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
  },

  data() {
    return {
      fields: [
        { key: 'name', label: 'PROPERTY' },
        { key: 'category', label: 'CATEGORY' },
        { key: 'price', label: 'PRICE' },
        { key: 'deed', label: 'DEED' },
        { key: 'status', label: 'STATUS' },
        { key: 'id', label: 'ACTION' },
      ],
      tableData: [],
      property: null,
      searchKey: '',
      isEmpty: false,
      property1: {
        id: null,
        status: true,
      },
    }
  },
  computed: {
    AllProperties() {
      return this.$store.state.property.properties.data?.sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    },

    ...mapState({
      user: state => state.user.user,
    }),
  },

  mounted() {
    this.getResults()
    console.log(this.$refs.fileUpload)
    // console.log(this.$store.state.property.properties)
    // console.log(this.$store.state.property.properties.length)
  },
  created() {
    // this.fetchAllProperties()
  },
  methods: {
    chooseFiles(property) {
      document.getElementById('fileUpload').click()
      console.log(property)
      this.property1.id = property.id
    },
    handleFileChange(evt) {
      console.log(evt, '---')

      PropertyService.updateProp(this.property1.id, this.property1)
        .then(response => {
          console.log(response)
          this.$store.state.property.properties.data.filter(i => {
            if (i.id === this.property1.id) {
              i.status = true
            }
          })
        })
        .catch(error => {
          this.messageEr = (error.response
              && error.response.data
              && error.response.data.message)
              || error.message
              || error.toString()
          console.log(this.messageEr)
        })
    // evt.target.files contains Array-like FileList object
    },
    getValue(data) {
      // console.log(data)
      this.property = data
    },
    searchBy() {
      PropertyService.search(this.searchKey)
        .then(response => {
          console.log(response)
          this.$store.state.property.properties.data = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },

    getResults() {
      this.$store.dispatch('property/fetchAllProperties').then(
        res => {
          // console.log(res.data)
          // res.data.filter((a, b) => {
          //   console.log(new Date(a.createdAt), new Date(b.createdAt));
          // })
          console.log()
          return res.data.sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())).slice(0, 1)
        },
        error => {
          this.loading = false
          this.message = (error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString()
        },
      )
    },

    deleteProperty(id) {
      // console.log(id)
      PropertyService.deleteProp(id)
        .then(response => {
          // console.log(response)
          // console.log(this.$store.state.property.properties.data.filter(x => x.id !== id))
          this.$store.state.property.properties.data.filter(x => x.id !== id)
          this.getResults()
        })
        .catch(error => {
          this.messageEr = errMessage(error)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Error',
              icon: 'CheckIcon',
              variant: 'warning',
              text: `${this.messageEr || 'something went wrong! #878dfgh'}`,
            },
          })
        })
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

</style>
