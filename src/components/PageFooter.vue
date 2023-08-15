<template>
  <v-footer padless color="white">
      <v-card-text class="text-center mx-5">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px" color="#333">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="black--text pt-5 text-center">
        Phasellus feugiat arcu sapien, etconsectetur dignMoripsum ultrice tempor vel ut orci.
      </v-card-text>
      <v-card-text class="black--text text-center">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>