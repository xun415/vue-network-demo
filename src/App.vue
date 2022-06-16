<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app>
        <!-- -->
        Libraries
        <ul>
          <li>
            <router-link to="/VueVis">VueVis.js</router-link>
          </li>
          <li>
            <router-link to="/D3Js">D3.js</router-link>
          </li>
          <li>
            <router-link to="/D3Vue">Vue-d3.js</router-link>
          </li>
          <li>
            <router-link to="/VisJs">Vis.js</router-link>
          </li>

        </ul>

      </v-navigation-drawer>

      <v-app-bar app>
        <!-- -->
        <h1>Network graph demo</h1>
      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-main>

        <!-- Provides the application the proper gutter -->
        <v-container fluid>

          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app>
        <!-- -->
      </v-footer>
    </v-app>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
</style>
