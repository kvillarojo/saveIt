<template>
  <div id="app">
    <v-app id="inspire" white>
      <v-navigation-drawer
        fixed
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
        v-model="drawer"
      >
        <v-list dense>
          <template v-for="item in items">
            <v-layout
              row
              v-if="item.heading"
              align-center
              :key="item.heading"
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
              </v-flex>
            </v-layout>
            <v-list-group
              v-else-if="item.children"
              v-model="item.model"
              :key="item.text"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile
                v-for="(child, i) in item.children"
                :key="i"
              >
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>

            <router-link :to="{name: item.to }" class="fms-link" v-else :key="item.text">
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                     {{ item.text }}
                  <!-- {{ item.text }} -->
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </router-link>

          </template>

        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        color="blue darken-3"
        dark
        app
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
           <span class="hidden-sm-and-down btn"> FMS </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn icon large>
          <v-avatar size="32px" tile>
            <img
              src="https://img.icons8.com/color/48/000000/administrator-male.png"
              alt="Vuetify"
            >
          </v-avatar>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container>
           <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
export default {
  name: 'App',
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: 'equalizer', text: 'Budgets', to: 'Bubget' },
      { icon: 'attach_money', text: 'Finances', to: 'Dashboard' },
      { icon: 'insert_comment', text: 'Remider', to: 'Dashboard' },
      { icon: 'send', text: 'Request', to: 'Dashboard' },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'More',
        model: false,
        children: [
          { text: 'Import', to: 'Dashboard' },
          { text: 'Export', to: 'Dashboard' },
          { text: 'Print', to: 'Dashboard' },
          { text: 'Undo changes', to: 'Dashboard' },
          { text: 'Other contacts', to: 'Dashboard' }
        ]
      },
      { icon: 'settings', text: 'Settings', to: 'Dashboard' },
      { icon: 'chat_bubble', text: 'Send feedback', to: 'Dashboard' },
      { icon: 'help', text: 'Help', to: 'Dashboard' }
    ]
  }),
  props: {
    source: String
  }
}
</script>
<style>
  a.fms-link {
    color: black;
    text-decoration: none;
    font-size: initial;
  }
  .v-list__tile.theme--light:hover {
    background: hsla(212, 80%, 42%, 0.15);
  }
  .fms-link.router-link-exact-active.router-link-active > div{
    background: hsla(212, 80%, 42%, 0.15);
  }
</style>
