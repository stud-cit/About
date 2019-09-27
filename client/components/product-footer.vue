<template>
    <v-row justify="center" align="end" class="footer-section">
        <v-col cols="10" class="d-flex d-lg-none">
            <v-row justify="center" align="center" class="return-section" @click="scollTop">
                <!-- TODO: add icon -->
                <p class="display-1">Back to the top</p>
            </v-row>

            <v-col cols="12">
                <p class="display-2">Speed, quality, simplicity</p>
            </v-col>
        </v-col>
        <p 
            class="d-none d-lg-block display-1 rotated-return-bar" 
            @click="scollTop"
        >
            Back to the top
        </p>
        <contact-bar :isStatic="true" />
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContactBar from './contact-bar';

@Component({
    components: {
        'contact-bar': ContactBar
    }
})
export default class PruductFooter extends Vue {
    scollTop() {
        window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
    }
}
</script> 

<style lang="sass">
.footer-section
    position: relative
    height: 100vh
    color: white

.return-section
    width: 100%
    height: 60vh
    background: #ffffff
    opacity: .05
    cursor: pointer

    p
        color: #2f2f2f

.rotated-return-bar
    position: absolute
    top: calc(25vh)
    right: 5vw
    writing-mode: vertical-rl
    transform: scaleX(-1) scaleY(-1)
</style>