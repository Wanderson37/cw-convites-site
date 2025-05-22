<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar> </q-avatar>
      </q-toolbar-title>
    </q-toolbar>

    <q-tabs align="center">
      <q-route-tab to="/page1" label="Convites" />
      <q-route-tab to="/page2" label="Caixas" />
      <q-route-tab to="/page3" label="Papelaria" />
    </q-tabs>
  </q-header>

  <q-page-container>
    <router-view />
  </q-page-container>

  <q-footer elevated class="bg-grey-8 text-white">
    <q-toolbar>
      <q-toolbar-title>
        <p>&copy; 2025 CW Convites. All Rights Reserved.</p>
      </q-toolbar-title>

      <a href="https://www.wanderson37.dev" target="_blank">
        <img src="/logow37.svg" style="" />
      </a>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import horizontalLogo from '/cw-convites-horizontal.svg'
</script>
