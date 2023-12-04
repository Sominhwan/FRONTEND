<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar" timeout="2000">
      {{ snackbarContent }}
    </v-snackbar>
  </div>    
</template>
<script>
export default {
    data() {
        return {
            
        }
    },   
    props: {
        snackbarValue: {
            type: Boolean,
            default: false
        },
        snackbarContent: {
            type: String,
            default: null
        }
    },
    computed: {
        snackbar: {
            get() {
                return this.snackbarValue
            },
            set() {
            
            }
        }
    }
}
</script>