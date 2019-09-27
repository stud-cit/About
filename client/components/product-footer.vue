<template>
    <v-row justify="center" class="footer-section">
        <contact-bar isStatic />
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

}
</script> 

<style lang="sass">
.footer-section
    height: 75vh
</style>