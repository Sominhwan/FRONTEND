<template>
    <div>
        <v-row justify="center" align="center" style="margin: 200px 0 250px;">
            <v-col cols="6" md="4" offset="0">
                <v-card class="pa-0 mx-auto" elevation="0" height="600">
                    <v-toolbar elevation="0" height="100">
                        <v-spacer></v-spacer>
                        <v-img class="ma-3" :src="require('@/assets/signUp/signUpLogo.png')" max-width="40" height="40"></v-img>
                        <v-toolbar-title class="text-h4" style="font-weight: bold;">회원가입</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-col cols="12" md="8" offset="2">
                        <v-card-text>
                            <v-text-field
                                dense
                                label="Outlined"
                                outlined
                                required
                            ></v-text-field>
                            <v-text-field
                                dense
                                label="Outlined"
                                outlined
                                counter="25"
                                required
                            ></v-text-field>
                            <v-text-field
                                dense
                                label="Outlined"
                                outlined
                                required
                            ></v-text-field>
                            <v-text-field
                                dense
                                label="Outlined"
                                outlined
                                required
                            ></v-text-field>
                        </v-card-text>
                    </v-col>
                    <v-text-field
                        class="sign-loading"
                        color="primary"
                        loading
                        disabled
                    ></v-text-field>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .sign-loading {
        position: absolute; 
        width: 100%;
        bottom: 0px;
    }
</style>