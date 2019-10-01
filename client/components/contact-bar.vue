<template>
  <v-container
    fluid
    class="contact-bar pa-1 pa-sm-3"
    :class="{ static: isStatic }"
    v-if="isStatic || isActive"
  >
    <v-row class="relative" justify="space-around" align="center">
      <div
        :class="isSmAndUp ? 'close-icon-container' : 'mobile-close-icon'"
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
          class="font-weight-bold"
          cols="auto"
          :style="getCreadentialsFont"
        >
          {{ contacts.email }}
        </v-col>
        <v-col
          class="font-weight-bold"
          cols="auto"
          :style="getCreadentialsFont"
        >
          {{ contacts.phone }}
        </v-col>
      </v-row>
      <v-col cols="6" sm="7">
        <v-row class="underline mb-4 d-none d-sm-flex" justify="space-between">
          <v-col
            class="font-weight-bold"
            cols="auto"
            :style="getCreadentialsFont"
          >
            {{ contacts.email }}
          </v-col>
          <v-col
            class="font-weight-bold"
            cols="auto"
            :style="getCreadentialsFont"
          >
            {{ contacts.phone }}
          </v-col>
        </v-row>
        <v-col
          cols="12"
          class="font-weight-bold px-0 py-0 py-sm-2"
          :style="getLocationFont"
        >
          {{ contacts.street }}
        </v-col>
        <v-col
          cols="12"
          class="font-weight-bold px-0 py-0 py-sm-2"
          :style="getLocationFont"
        >
          {{ contacts.office }}
        </v-col>
      </v-col>
      <v-col cols="6" sm="2" class="pb-0">
        <v-row class="pb-0" justify="center" align="end">
          <a
            class="map"
            href="https://www.google.com.ua/maps/place/Department+of+General+and+Theoretical+Physics+of+SSU/@50.8918344,34.8410504,17z/data=!4m9!1m3!11m2!2sfL29wECLWo3E0vp-J1Rb4QPskla8Pg!3e3!3m4!1s0x0:0x33afc095aa39b815!8m2!3d50.8929585!4d34.8404856?hl=ru"
          >
            <v-img src="/map.png"></v-img>
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

@Component({})
export default class ContactBar extends Vue {
  @Getter('getContactBarVisibility') isActive;
  @Getter('getContactStage') contacts;
  @Mutation('changeContactBar') changeContactBar;

  @Prop({ default: false }) readonly isStatic: boolean;

  get isSmAndUp() {
    return this.$breakpoint ? this.$breakpoint.is.smAndUp : false;
  }
  get getCreadentialsFont() {
    return {
      fontSize: `${this.getCustomAdaptiveSize({
        xs: 10,
        sm: 15,
        md: 15,
        lg: 30,
      })}px`,
    };
  }
  get getLocationFont() {
    return {
      fontSize: `${this.getCustomAdaptiveSize({
        xs: 12,
        sm: 20,
        md: 20,
        lg: 40,
      })}px`,
    };
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
  width: 100%
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
