<template>
  <v-container>
    <v-row justify="space-around">
      <v-col 
        v-for="person in $store.state.ourStaff"
        :key="person.id"
        lg="4"
        sm="6"
        xs="12"
      >
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text"
            height="200px"
            src="https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg"
          >
          </v-img>
        </v-card>
        <div class="card-addition">
          <p class="employee-name">{{person.name}}</p>
          <p class="employee-position">{{person.position}}</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'

@Component({
  layout: 'immediate',
  head: {
    title: 'Our staff'
  },
})
export default class OurStaffPage extends Vue {
  @Mutation('changePageCover') changePageCover

  created() {
    this.changePageCover('our-staff')
  }
}
</script>

<style lang="sass">
  .card-addition
    display: flex
    flex-direction: column
    color: #ffffff
    margin-top: 25px

  .employee-name
    font-size: 1.5rem
    font-weight: 900
    text-align: center
    margin-bottom: 0

  .employee-position
    font-size: .9rem
    font-weight: 400
    text-align: center

</style>