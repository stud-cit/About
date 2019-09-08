<template>
    <v-row>
        <v-col class="scroll-bar">
            Please move me to right side of this page.
            I'm bad scoll bar.
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  methods: {

  }
})
export default class ScrollBar extends Vue {}
</script>

<style lang="sass">
    .scroll-bar
        width: 20px
        height: 100px
        background: red
</style>
