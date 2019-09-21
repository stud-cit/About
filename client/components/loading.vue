<template>
  <v-container fluid class="loading" :class="{complit}">
    <section class="loader" :class="{activeLoader:isActive}">
      <p class="stud" v-show="isActive">Stud</p>
      <div class="circle" :class="{activeCircle:isActive}">
        <p>CIT</p>
      </div>
    </section>
  </v-container>
</template>


<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';

  @Component({})
  export default class Loader extends Vue {
    isActive: boolean = false;
    complit: boolean = false;
    start(): void {
      this.isActive = false
    }
    finish(): void {
      this.isActive = true
      setTimeout(() => {
        this.complit = true
      }, 3000);
    }
    mounted(){
      this.finish();
    }
  }
</script>


<style lang="sass">
.loading
    position: fixed
    top: 0
    z-index: 50
    background-color: white
    display: flex
    justify-content: center
    align-items: center
    height: 100vh

.complit
  z-index: 0
  transition: 1s 
  opacity: 0

.loader
  position: absolute
  left: calc(50% - 65px)
  background-color: #C25555
  width: 4rem
  height: 130px
  display: flex
  align-items: center

.loader:after
  width: 130px
  background-color: #C25555
  content: ''
  position: absolute
  height: 130px
  transform: translateX(-5rem)
  border-top-left-radius: 50%
  border-bottom-left-radius: 50%
  z-index: 1

.loader:before
  width: 130px
  background-color: #C25555
  content: ''
  position: absolute
  height: 130px
  transform: translateX(4rem)
  border-top-right-radius: 50%
  border-bottom-right-radius: 50%

.activeLoader, .activeLoader:after, .activeLoader:before
  background-color: #81C255 
  transition: 1s 

.stud
  font-size: 2.8rem
  color: white
  font-weight: 800
  z-index: 2
  transform: translateX(-3rem)
  transition: 1s 

.circle
    border-radius: 50%
    background-color: white  
    height: 7rem
    width: 7rem
    margin: 0 1rem
    position: absolute
    z-index: 2
    transform: translateX(-5rem)  
    display: flex
    justify-content: center
    align-items: center
    font-size: 2.8rem
    font-weight: 800
    color: #C25555

.activeCircle
    transform: translateX(3rem) 
    color: #81C255
    transition: 1s 

.loading-process
    background: green
    z-index: 1000
    top: 0
    position: absolute

  
</style>