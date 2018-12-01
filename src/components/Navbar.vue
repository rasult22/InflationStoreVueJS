<template>
    <div>
        <v-navigation-drawer  app temporary v-model="sideNav">
            <v-list>
                
                <v-list-tile v-for="(item,i) in items" :key="i" :to="item.url">
                        <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                        </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="#FFFFFF" >
            <v-toolbar-side-icon 
                 @click="sideNav=!sideNav"
                 class="hidden-md-and-up"  
                    >
            </v-toolbar-side-icon>
            <v-toolbar-title><router-link class="logo" :to="{name:'home'}">Inflation</router-link> </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat
                    v-for="(item,i) in items" 
                    :key="i"
                    :to="item.url"
                    >
                    {{item.title}}
                    <v-icon right>{{item.icon}}</v-icon>
                    
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
     
            <router-view></router-view>
    
        </v-content>
    </div>
</template>

<script>
export default {
    data (){
        return {
            sideNav: false,
            items: [
                
                { title: 'New Product', icon: 'add', url: '/new' },
                { title: 'Products', icon: 'list', url: '/list' },
                { title: 'Cart', icon: 'shopping_cart', url: '/checkout' },
                { title: 'Login', icon: 'account_circle', url: '/login' },
                { title: 'Register', icon: 'face', url: '/register' },
            ]
        }
    }
}
</script>

<style scoped>
    .logo{
        color: inherit;
        text-decoration: inherit;
        text-transform:uppercase;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    }
    .logo:hover{
        color:#dddddd;
    }
    
</style>