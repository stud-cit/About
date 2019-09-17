<template>
  <v-col class="pa-0">
    <section class="preview-wrapper">
      <div class="preview">
        <h1>{{portfolio.h1}}</h1>
        <h2>{{portfolio.h2}}</h2>
        <div class="navigation">
          <div class="arrow">&#8592;</div>
          <div class="arrow">&#8594;</div>
          <div class="square squareOne"></div>
          <div class="square squareTwo"></div>
          <div class="square squareThree"></div>
        </div>
        <p class="description">{{portfolio.description}}</p>
        <p class="scroll_text">Scroll for more information</p>
      </div>
    </section>
    <v-row v-for="(project, i) in projects" :key="i" align="center">
      <v-parallax :src="project.cover" class="fullscreen pa-0">
        <v-row justify="center" align="center" class="section">
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

              <v-card-text align="center" class="mx-5">
                <v-chip
                  v-for="(employee, j) in project.team"
                  :key="j"
                  pill
                  color="transparent"
                  class="ma-1"
                >
                  <v-avatar left>
                    <v-img :src="employee.avatar" />
                  </v-avatar>
                  <span v-text="employee.name" class="title" />
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
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

@Component({
  layout: 'immediate',
  head: {
    title: 'Portfolio',
  },
})
export default class PortfolioPage extends Vue {
  @Getter('getProjectsStage') projects;
  @Getter('getPortfolioStage') portfolio;
  @Mutation('changePageCover') changePageCover;

  created() {
    this.changePageCover('portfolio');
  }
}
</script>

<style lang="sass">
  .preview-wrapper
    width: 80vw
    height: 100vh
    display: flex
    justify-content: center
    align-items: center

  .preview
      position: relative
      display: flex
      flex-direction: column
      align-items: flex-start
      justify-content: flex-end
      color: #ffffff
  
  h1,h2
    font-size: 4rem
    color: white
  
  .navigation
    display: flex
    flex-direction: row
    color: white
    margin: 5rem 0 
  
  .navigation div
    margin-right: .8rem
  
  .arrow
    font-size: 1.8rem
    text-align: center
  
  .square
    height: 2.5rem
    width: 2.5rem
    border-radius: 20%
    border: 2px solid white
  
  .squareOne
    clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)
  
  .squareThree
    clip-path: polygon(50% 0%, 0% 0%, 0% 100%, 50% 100%)
  
  .description
    font-size: 2rem
  
  .scroll_text
    opacity: 0.5
    font-size: 1.3rem

  .bottom_card
    color: black
    font-size: 2rem
    font-weight: 100
    text-align: center
    display: flex
    justify-content: center
    flex-direction: column
    width: 25rem
    padding-top: 1rem
    padding-bottom: 1rem
    justify-self: flex-end
    align-self: flex-end
    margin-bottom: 1rem

  .bottom_card_title
    text-align: center
    justify-content: center
    font-size: 1.3rem

  .bottom_card_action
    text-decoration: underline
    font-weight: 100

  .fullscreen
    height: 100vh !important
    width: 101vw !important
    .section
      background: rgba(0,0,0,0.7)

</style>
