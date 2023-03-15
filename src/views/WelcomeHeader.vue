<template>
  <div>
    <b-row
      v-if="user"
      class="match-height"
    >
      <b-col md="4">
        <BCard class="dark-card">
          <div class="helloX">
            Hello {{ (user || {}).firstName }}
          </div>
          <div class="mt-1 card-text">
            You have {{ propertiesCount }} {{ propertiesCount === 1 ? 'property' : 'properties' }} registered with
            us
          </div>
        </BCard>
      </b-col>
      <b-col md="8">
        <b-card class="dark-card">
          <div
            class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between h-100"
          >
            <div class="d-flex align-items-center justify-content-around">
              <b-avatar
                class="mr-2"
                size="80px"
                :src="require('@/assets/images/avatars/13-small.png')"
              />
              <div>
                <h4
                  style="
                    font-family: 'Avenir', sans-serif;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 20px;
                    color: black;
                  "
                >
                  {{ toTitleCase((user || {}).firstName + ' ' + (user || {}).lastName) }}
                </h4>
                <div
                  style="
                    margin-top: 5px;
                    font-family: 'Avenir';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                  "
                >
                  {{ user.email }}
                </div>
                <div
                  style="
                    margin-top: 2px;
                    font-family: 'Avenir';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                  "
                >
                  {{ user.fullAddress }}
                </div>
              </div>
            </div>
            <div class="d-flex flex-column align-content-end flex-wrap mt-3 mt-lg-0">
              <div
                class="d-flex align-items-center text-nowrap"
                style="
                  font-family: 'Avenir',serif;
                  font-style: normal;
                  font-weight: 600;
                  font-size: 14px;
                "
              >
                Your identity is verified
                <span class="ml-1">
                  <img
                    src="../assets/images/icons/right-sign.svg"
                    alt="verified"
                  >
                </span>
              </div>
              <div class="d-flex justify-content-center justify-content-lg-end">
                <b-button
                  variant="primary"
                  size="default"
                  class="text-white mr-1 mt-2 d-inline"
                  style="
                    font-family: 'Avenir', sans-serif;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 14px;
                    color: var(--primary);
                  "
                  @click="$router.push('/profile')"
                >
                  Edit your profile
                </b-button>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {
  BCard, BButton, BRow, BCol, BAvatar,
} from 'bootstrap-vue'
import { toTitleCase } from '@/utils'

export default {
  name: 'WelcomeHeader',
  components: {
    BCard,
    BButton,
    BRow,
    BCol,
    BAvatar,
  },
  props: {
    AllProperties: {},
    user: {},
  },
  computed: {
    propertiesCount() {
      return (this.AllProperties || { length: 0 }).length
    },
  },
  methods: {
    toTitleCase,
  },
}
</script>
<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

td {
  padding: 0.72rem 1rem;
}

.helloX {
  font-family: 'Avenir', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 23.4634px;
}
</style>
