<template>
  <q-header elevated class="bg-grey-4 text-white" height-hint="98">
    <q-toolbar>
      <q-toolbar-title class="flex items-center justify-center">
        <img src="/cw-convites-horizontal.svg" alt="Logo" style="height: 4rem" />
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

  <q-footer elevated class="bg-grey-4 q-pa-md">
    <q-toolbar>
      <q-toolbar-title>
        <p class="fs12 text-black">&copy; 2025 CW Convites. All Rights Reserved.</p>
      </q-toolbar-title>

      <a href="https://www.wanderson37.dev" target="_blank">
        <img src="/logow37.svg" style="height: 2rem" />
      </a>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts"></script>
