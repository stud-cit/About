<template>
  <v-col class="pa-0">
    <v-row v-for="(project, i) in projects" :key="i" align="center">
      <v-parallax
        :src="project.cover"
        class="fullscreen pa-0"
      >
        <v-row
          justify="center"
          align="center"
          class="section"
        >
          <v-col md="4">
            <v-card dark flat color="transparent">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="project.title"
                    class="display-3 text-center mb-5"
                  />
                  <v-btn :to="project.link" target="_blank" large dark text>
                    <v-icon left>mdi-open-in-app</v-icon> View project
                  </v-btn>
                  <v-divider />
                  <v-list-item-title class="headline mt-5">
                    Team:
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-card-text align="center" class="mx-5" >
                <v-chip
                  v-for="(employee, j) in project.team" :key="j"
                  pill color="transparent" class="ma-1"
                >
                  <v-avatar left>
                    <v-img :src="employee.avatar"/>
                  </v-avatar>
                  <span v-text="employee.name" class="title"/>
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-parallax>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  layout: 'immediate',
  head: {
    title: 'Portfolio'
  }
})
export default class PortfolioPage extends Vue {
  @Getter('getProjectsStage') projects;
}
</script>

<style lang="sass">
  .fullscreen
    height: 100vh !important
    width: 101vw !important
    .section
      background: rgba(0,0,0,0.7)
</style>
