<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm-8 offset-sm2>
        <h1 class="text--secondary mb-3">New Product</h1>
        <v-form ref="form" v-model="valid" class="mb-3">
          <v-text-field
            color="#373277"
            name="title"
            label="Title"
            type="text"
            :rules="[v => !!v || 'Title is require']"
            required
            v-model="title"
          ></v-text-field>
          <v-text-field color="#373277" name="vendor" label="Vendor" type="text" v-model="vendor"></v-text-field>
          <v-text-field
            color="#373277"
            name="color"
            label="Color Product"
            type="text"
            @input="handleColors($event)"
          ></v-text-field>
          <v-text-field
            color="#373277"
            name="type"
            label="Product Type"
            type="text"
            v-model="type"
          ></v-text-field>
          <v-text-field
            color="#373277"
            name="price"
            label="Price Product"
            type="text"
            :rules="[v => !!v || 'Price is require']"
            required
            v-model="price"
          ></v-text-field>
          <v-text-field
            color="#373277"
            name="description"
            label="Description Product"
            multi-line
            type="text"
            v-model="description"
          ></v-text-field>
        </v-form>
        <v-layout class="mb-3">
          <v-flex xs12>
            <v-btn 
              @click="uploadFile"
              class="warning">Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input 
              @change="onFileChange"
              ref="fileInput" type="file" style="display:none" accept="image/*">
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <img :src="imageSrc" v-if="imageSrc" alt="Uploaded photo" height="250px">
          </v-flex>
        </v-layout>
        <v-layout class="mb-3">
          <v-flex xs12>
            <v-switch color="primary" :label="`Add to promo`" v-model="promo"></v-switch>
          </v-flex>
        </v-layout>
        <v-layout class="mb-3">
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn class="success" :loading="loading" :disabled="!valid || loading || !image" @click="createProduct">Create product</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      title: '',
      vendor: '',
      colors: [],
      type: '',
      price: 0,
      description: '',
      promo: false,
      valid: false,
      imageSrc: '',
      image: this.image
    }
  },
  methods: {
    ...mapActions('products', {
      asyncCreateProduct: 'createProduct'
    }),
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    },
    uploadFile () {
      this.$refs.fileInput.click()
    },
    handleColors (value) {
      this.colors = value.split(' ')
      console.log(this.colors)
    },
    createProduct () {
      if (this.$refs.form.validate() && this.image) {
        const product = {
          title: this.title,
          vendor: this.vendor,
          colors: this.colors,
          type: this.type,
          price: parseInt(this.price),
          description: this.description,
          promo: this.promo,
          image: this.image
        }
        this.asyncCreateProduct(product)
        .then(() => {
          this.$router.push('/list')
        })
        .catch(() => {
          return {}
        })
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
</style>