<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm-8 offset-sm2>
                <h1 class="text--secondary mb-3">New Product</h1>
                 <v-form ref="form" v-model="valid" class="mb-3">
                  <v-text-field color="#373277" 
                    name="title" 
                    label="Title" 
                    type="text"
                    :rules="[v => !!v || 'Title is require']"
                    required
                    v-model="title"
                    ></v-text-field>
                  <v-text-field color="#373277"
                    name="vendor" 
                    label="Vendor" 
                    type="text"
                    v-model="vendor"
                    ></v-text-field>
                  <v-text-field color="#373277"
                    name="color" 
                    label="Color Product" 
                    type="text"
                    v-model="color"
                  ></v-text-field>
                  <v-text-field color="#373277"
                    name="material" 
                    label="Material Product" 
                    type="text"
                    v-model="material"
                  ></v-text-field>
                  <v-text-field color="#373277"
                    name="price" 
                    label="Price Product" 
                    type="text"
                    :rules="[v => !!v || 'Price is require']"
                    required
                    v-model="price"
                  ></v-text-field>
                  <v-text-field color="#373277"
                    name="description" 
                    label="Description Product" 
                    multi-line
                    type="text"
                    v-model="description"
                  ></v-text-field>

                </v-form>
                <v-layout class="mb-3">
                    <v-flex xs12>
                        <v-btn class="warning">
                            Upload
                            <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12>
                        <img src="" alt="Uploaded photo" height="250px">
                    </v-flex>
                </v-layout>
                <v-layout class="mb-3">
                    <v-flex xs12>
                        <v-switch
                            color="primary"
                            :label="`Add to promo`"
                            v-model="promo"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout class="mb-3">
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn class="success"
                                :disabled="!valid"
                                @click="createProduct"
                        >Create product</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data (){
            return {
                title:'',
                vendor:'',
                color:'',
                material:'',
                price:0,
                description:'',
                promo:false,
                valid:false
            }
        },
        methods:{
            createProduct (){
                if(this.$refs.form.validate()){
                    const product = {
                        title: this.title,
                        vendor: this.vendor,
                        color: this.color,
                        material: this.material,
                        price: parseInt(this.price),
                        description: this.description,
                        promo: this.promo,
                        
                    }
                    console.log(product);
                }
            }
        }
    }
</script>

<style scoped>

</style>