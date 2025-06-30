<template>
  <q-header elevated class="bg-grey-4 text-primary" height-hint="98">
    <div>
      <q-toolbar>
        <img class="" src="/cw-convites.svg" alt="Logo" style="height: 5rem" />
        <q-space />

        <div v-if="!$q.screen.lt.sm">
          <q-tabs
            align="center"
            class="q-mr-md text-black"
            active-color="primary"
            indicator-color="primary"
          >
            <q-route-tab to="/" label="Home" />
            <q-route-tab to="/convites" label="Convites" :exact="false" />
            <q-route-tab to="/em-construcao" label="Caixas" />
            <q-route-tab to="/em-construcao" label="Papelaria" />
            <q-route-tab to="/em-construcao" label="Dicas" />
            <q-route-tab to="/em-construcao" label="Sobre Nós" />
          </q-tabs>
        </div>

        <!-- HAMBURGUER NO MOBILE -->
        <div v-else>
          <q-btn icon="menu" flat dense round v-close-popup>
            <q-menu
              anchor="bottom middle"
              self="top middle"
              transition-show="jump-down"
              transition-hide="jump-up"
            >
              <q-list style="min-width: 150px">
                <q-item clickable v-ripple to="/" exact>
                  <q-item-section>Home</q-item-section>
                </q-item>
                <q-item clickable v-ripple to="/convites">
                  <q-item-section>Convites</q-item-section>
                </q-item>
                <q-item clickable v-ripple to="/em-construcao">
                  <q-item-section>Caixas</q-item-section>
                </q-item>
                <q-item clickable v-ripple to="/em-construcao">
                  <q-item-section>Papelaria</q-item-section>
                </q-item>
                <q-item clickable v-ripple to="/em-construcao">
                  <q-item-section>Dicas</q-item-section>
                </q-item>
                <q-item clickable v-ripple to="/em-construcao">
                  <q-item-section>Sobre Nós</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <q-space />
        <BaseButton class="q-mr-lg" flat dense round to="/carrinho">
          <q-icon name="shopping_cart" size="2rem" class="text-primary" />
          <q-badge
            v-if="cartStore.items.length > 0"
            rounded
            floating
            align="top"
            class="bg-negative text-white"
            style="font-size: 0.8rem"
            :label="cartStore.items.length"
          />
        </BaseButton>
      </q-toolbar>
    </div>
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

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import BaseButton from '@/wrappers/BaseButton.vue'

const cartStore = useCartStore()
</script>
