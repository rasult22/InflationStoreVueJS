<template>
  <v-container>
    <section class="product mt-3 elevation-10" v-if="!loading">
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
            <app-product-dialog :product="product" v-if="isOwner"></app-product-dialog>
            <app-buy-dialog :product="product"></app-buy-dialog>
          </div>
        </v-flex>
      </v-layout>
    </section>
    <section v-else class="text-xs-center">
       <v-progress-circular
            :size="100"
            class="mt-5"
            color="primary"
            indeterminate
        ></v-progress-circular>
    </section>
  </v-container>
</template>

<script>
import ProductDialog from './ProductDialog'
export default {
  props: ['id'],
  components: {
    appProductDialog: ProductDialog
  },
  computed: {
    productById () {
      return this.$store.getters.productById
    },
    loading () {
      return this.$store.getters.loading
    },
    product () {
      const id = this.id
      console.log(id)
      return this.$store.getters['productById'](id)
    },
    isOwner () {
      if (!this.$store.getters.isUserLoggedIn) {
        return false
      }
      return this.product.ownerId === this.$store.getters.user.id
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
  width: 100%;
  max-width: 550px;
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

@media screen and (max-width:1270px) {
    .product {
      text-align: center;
    }
    .product_info {
      margin-left: 0;
    }
}

@media screen and  (max-width: 620px) {
  .product {
    text-align: start;
  }
  .product_title {
    text-align: left;
  }
} 

@media screen and (max-width: 400px) {
  .product {
    padding: 10px;
    text-align: left;
  }
}


</style>