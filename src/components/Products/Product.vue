<template>
  <v-container>
    <section class="product mt-3 elevation-10">
      <v-layout class row wrap>
        <v-flex xs12 lg6>
          <img class="product_img" :src="product.imageSrc" alt>
        </v-flex>
        <v-flex xs12 lg6>
          <div class="product_info">
            <h5 class="product_title display-1 mb-3 mt-3">{{product.title}}</h5>
            <p class="product_category title">
              <span class="product_title">Vendor:</span>
              {{product.vendor.charAt(0).toUpperCase() + product.vendor.substr(1)}}
            </p>
            <p class="product_price title">
              <span class="product_title">Price:</span>
              {{product.price}}₸
            </p>
            <p class="product_color">
              <span class="product_title">Colors:</span>
              <span
                v-for="(color,index) in product.colors"
                :key="index"
                :title="color"
                :style="{backgroundColor: color}"
                class="product_color--bg"
              ></span>
            </p>
            <p class="title">
              <span class="product_title">Type:</span>
              {{product.type}}
            </p>
            <div class="title mb-5">
              <p class="product_title mb-2">Description:</p>
              {{product.description}}
            </div>
            <v-btn color="primary" class="headline">Edit</v-btn>
            <v-btn color="primary" class="headline">Buy</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['id'],
  computed: {
    ...mapGetters('products', {
      productById: 'productById'
    }),
    product () {
      const id = this.id
      return this.$store.getters['products/productById'](id)
    }
  }
}
</script>

<style scoped>
.product {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid #373277;
  padding: 30px;
  margin-bottom: 100px;
}
.product_img {
  height: 100%;
  width: 550px;
}
.product_info {
  margin-left: 50px;
}
.product_title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #1e1e1e;
  margin-bottom: 0;
}
.product_price {
  color: red;
}
.product_color--bg {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-left: 5px;
  margin-right: 5px;
  border: 1px solid #2b2b2b;
  border-radius: 24px;
}
</style>