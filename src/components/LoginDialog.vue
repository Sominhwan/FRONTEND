<template>
    <v-app>
        <v-row justify="center" style="position: fixed; z-index: 1002 !important;">
            <v-dialog  v-model="dialog" persistent max-width="290" retain-focus="false">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" style="width: 260px;">
                    로그인 버튼
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="text-h5">
                Use Google's location service?
                </v-card-title>
                <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                >
                    Disagree
                </v-btn>
                <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                >
                    Agree
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-row>
    </v-app>
</template>

<script>
export default {
    data () {
      return {
        dialog: false,
      }
    },    
}
</script>

<style scoped>

</style>