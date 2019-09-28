<template>
  <v-container fluid class="contact-bar pa-1 pa-sm-3" :class="{static: isStatic}" v-if="isStatic || isActive">
    <v-row class="relative" justify="space-around" align="center">
      <div
        :class="$vuetify.breakpoint.smAndUp ? 'close-icon-container' : 'mobile-close-icon'" 
        v-if="!isStatic" 
        class="pa-1 pa-sm-0" 
      >
        <v-btn icon @click="onCloseContactBar">
          <v-icon size="30" color="black">
            mdi-close
          </v-icon>
        </v-btn>
      </div>
      <v-row class="underline mb-4 d-flex d-sm-none" justify="space-around">
          <v-col 
            class="font-weight-bold" cols="auto" 
            :style="getCreadentialsFont"
          >
            {{contacts.email}}
          </v-col>
          <v-col 
            class="font-weight-bold"
            cols="auto"
            :style="getCreadentialsFont"
          >
            {{contacts.phone}}
          </v-col>
      </v-row>
      <v-col cols="6" sm="7">
        <v-row class="underline mb-4 d-none d-sm-flex" justify="space-between">
            <v-col 
              class="font-weight-bold"
              cols="auto"
              :style="getCreadentialsFont"
            >
              {{contacts.email}}
            </v-col>
            <v-col
              class="font-weight-bold"
              cols="auto"
              :style="getCreadentialsFont"
            >
              {{contacts.phone}}
            </v-col>
        </v-row>
        <v-col
          cols="12"
          class="font-weight-bold px-0 py-0 py-sm-2"
          :style="getLocationFont"
        >
          {{contacts.street}}
        </v-col>
        <v-col
          cols="12"
          class="font-weight-bold px-0 py-0 py-sm-2"
          :style="getLocationFont"
        >
          {{contacts.office}}
        </v-col>
      </v-col>
      <v-col cols="6" sm="2" class="pb-0">
        <v-row class="pb-0" justify="center" align="end">
          <GmapMap
            class="map"
            :center="{lat: 50.892796, lng: 34.840445}"
            :zoom="13"
            map-type-id="roadmap"
            :options="mapOptions"
          >
            <GmapMarker
              :position="{lat: 50.892796, lng: 34.840445}"
              icon="/marker.svg"
            />
          </GmapMap>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import { Getter, Mutation } from 'vuex-class';

  @Component({})
  export default class ContactBar extends Vue {
    @Getter('getContactBarVisibility') isActive;
    @Getter('getContactStage') contacts;
    @Mutation('changeContactBar') changeContactBar;

    @Prop({ default: false }) readonly isStatic: boolean


    get getCreadentialsFont() {
      return {fontSize: `${this.getCustomAdaptiveFontSize({xs: 10, sm: 15, md: 15, lg: 30})}px`};
    }
    get getLocationFont() {
      return {fontSize: `${this.getCustomAdaptiveFontSize({xs: 12, sm: 20, md: 20, lg: 40})}px`};
    }
    mapOptions = {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#212121"
              }
            ]
          },
          {
            elementType: "labels",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#212121"
              }
            ]
          },
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
              {
                color: "#757575"
              },
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "administrative.country",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#bdbdbd"
              }
            ]
          },
          {
            featureType: "administrative.neighborhood",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "poi",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#181818"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1b1b1b"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#2c2c2c"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#8a8a8a"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: "#373737"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#3c3c3c"
              }
            ]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [
              {
                color: "#4e4e4e"
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161"
              }
            ]
          },
          {
            featureType: "transit",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#000000"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#3d3d3d"
              }
            ]
          }
        ]
      }
    onCloseContactBar() {
      this.changeContactBar(false);
    }
  }
</script>

<style lang="sass"> 
  .contact-bar
    position: fixed
    bottom: 0
    background: white
    color: black
    z-index: 15


  
  .static
    position: static
  .underline
    border-bottom: 6px solid black

  .map
    width: 250px
    height: 130px

    .gmnoprint
        display: none    

    img[src="https://maps.gstatic.com/mapfiles/api-3/images/google_white5_hdpi.png"]
        display: none
 
  .close-icon-container
    position: absolute
    top: 0
    right: 10px

  .mobile-close-icon
    position: absolute
    top: -21px
    left: calc(50vw - 21px)
    
    button
      background: white

  .relative
    position: relative
</style>