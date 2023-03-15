<template>
  <div>
    <b-modal
      id="custom-modal"
      v-model="showModal1"
      title="Edit property image"
      size="lg"
      centered
      scrollable
      hide-headersss
    >

      <div
        slot="modal-header"
        class="d-flex p-0 w-100 item"
      >
        <div
          class="item d-flex px-1 w-100"
          style="box-shadow: rgba(0, 0, 0, 0.2) 0 calc(1px) 15px; padding-top: 1.1rem; padding-bottom: 1.1rem"
        >
          <feather-icon
            icon="XIcon"
            size="25"
            class="text-dark"
            @click="$emit('close')"
          />
          <div
            class="d-inline ml-1 font-circular text-dark"
            style="font-size: 1.3rem; white-space: nowrap; text-overflow: ellipsis; width: 85%;
                overflow: hidden;-webkit-line-clamp: 1;"
          >
            Edit property image
          </div>
        </div>
      </div>
      <div
        id="map"
        style="height: 100%;width: 100%;"
      />
      <div class="d-none"><a
        id="staticLink"
        href="/"
      >staticLink</a></div>
      <!--      footer stot with a button with spinner-->
      <div
        slot="modal-footer"
        class="d-flex p-0 w-100 item"
      >
        <div
          class="item d-flex px-1 w-100 justify-content-end"
        >
          <b-button
            id="save-btn"
            variant="primary"
            size="default"
            :disabled="loading"
            @click="uploadImage"
          >
            <b-spinner
              v-show="loading"
              variant="light"
              small
            />
            <span>
              Save
            </span>
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>

import { BModal, BSpinner, BButton } from 'bootstrap-vue'
import PropertyService from '../../../services/PropertyService'

export default {
  name: 'MapImage',
  components: {
    BModal,
    BSpinner,
    BButton,
  },
  props: {
    property: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    showModal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      showModal1: true,
      loading: false,
      image: null,
      map: null,
      zoom: 16,
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initMap()
    // })
    setTimeout(() => {
      this.initMap()
    }, 200)
    // this.initMap()
  },
  methods: {
    async uploadImage() {
      this.loading = true
      try {
        this.image = {
          width: 1280,
          height: 720,
          zoom: this.zoom,
          lat: this.map.getCenter().lat(),
          lng: this.map.getCenter().lng(),
        }
        console.log(this.image)

        const imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
          this.map.getCenter().lat()},${this.map.getCenter().lng()}&markers=${
          this.map.getCenter().lat()},${this.map.getCenter().lng()}&zoom=${this.zoom
        }&size=${1280}x${720}&maptype=default&key=AIzaSyCX5PUFP0oDSJsd_L-E80BEdRaVUkrLuEs`

        console.log(imgUrl)
        const aElem = document.getElementById('staticLink')
        aElem.setAttribute('href', imgUrl)
        aElem.style.display = 'block'
        if (!this.image) {
          return
        }
        const { data: result } = await PropertyService.updatePropImage(this.property.id, this.image)
        console.log(result)
        this.$emit('refresh')
        this.$emit('close')
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    initMap() {
      console.log('initMap')

      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 28.137208, lng: 76.347156 },
        zoom: 16,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      })
      const marker = new window.google.maps.Marker({
        position: this.map.getCenter(),
        draggable: true,
        map: this.map,
      })
      this.map.addListener('center_changed', () => {
        // move the marker to the new position
        marker.setPosition(this.map.getCenter())
      })
      this.map.addListener('zoom_changed', () => {
        this.zoom = this.map.getZoom()
      })
      /*
      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google.maps.drawing.OverlayType.RECTANGLE,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['rectangle'],
        },
      })
      drawingManager.setMap(map)

      window.google.maps.event.addListener(drawingManager, 'rectanglecomplete', rectangle => {
        this.image = null
        function distanceInPx(pos1, pos2) {
          const p1 = map.getProjection().fromLatLngToPoint(pos1)
          const p2 = map.getProjection().fromLatLngToPoint(pos2)

          const pixelSize = Math.pow(2, -map.getZoom())

          const d = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)) / pixelSize

          return Math.round(d)
        }

        const { zoom } = map
        const centre = rectangle.getBounds().getCenter() // rectangle is the shape drawn on the map
        const { spherical } = window.google.maps.geometry
        const bounds = rectangle.getBounds() // rectangle is the shape drawn on the map
        const cor1 = bounds.getNorthEast()
        const cor2 = bounds.getSouthWest()
        const cor3 = new window.google.maps.LatLng(cor2.lat(), cor1.lng())
        const cor4 = new window.google.maps.LatLng(cor1.lat(), cor2.lng())

        const width = distanceInPx(cor1, cor4)
        const height = distanceInPx(cor1, cor3)

        this.image = {
          width,
          height,
          zoom,
          centre,
          lat: centre.lat(),
          lng: centre.lng(),
        }

        const imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
          centre.lat()},${centre.lng()}&zoom=${zoom
        }&size=${width}x${height}&maptype=satellite&key=AIzaSyCX5PUFP0oDSJsd_L-E80BEdRaVUkrLuEs`

        const aElem = document.getElementById('staticLink')
        aElem.setAttribute('href', imgUrl)
        aElem.style.display = 'block'
      }) */
    },
  },
}
</script>

<style scoped>

</style>
