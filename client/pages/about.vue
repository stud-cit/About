<template>
  <v-container>
    <v-window v-model="model" continuous dark>
      <v-window-item>
        <v-row align="stretch">
          <v-col md="8" class="font-weight-bold white--text">
            <v-row class="display-2 text-uppercase">
              Student centr of information technology
            </v-row>
            <v-row class="title mt-5">
              We can make this world better.
            </v-row>
            <v-row class="body-2">
              Scroll for more information
            </v-row>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item>
        <v-col md="8">
          <v-row class="font-weight-bold ma-2 white--text">
            Student centr of information technology
          </v-row>
          <v-textarea
            outlined
            disabled
            auto-grow
            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          />
        </v-col>
      </v-window-item>

      <v-window-item>
        <v-col md="8">
          <v-row class="font-weight-bold ma-2 white--text">
            Student centr of information technology
          </v-row>
          <v-textarea
            outlined
            disabled
            auto-grow
            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          />
        </v-col>
      </v-window-item>
    </v-window>

    <v-footer absolute color="transparent">
      <v-col md="8">
        <v-slider
          v-model="model"
          :max="3"
          step="1"
          ticks="always"
          tick-size="4"
          dark
        />
      </v-col>
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';

@Component({
  layout: 'immediate',
  head: {
    title: 'About us',
  },
})
export default class AboutPage extends Vue {
  @Mutation('changePageCover') changePageCover;
  model: number = 0;

  created() {
    this.changePageCover('about');
  }
}
</script>
