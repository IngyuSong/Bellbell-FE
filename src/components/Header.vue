<template>
  <header v-if="isHeaderVisible">
    <Logo></Logo>
  </header>
</template>

<script>
import Logo from "@/components/Logo.vue";
import {mapState} from 'vuex';

export default {
  components: {
    Logo
  },
  computed: {
    ...mapState('headerStore', ['isHeaderVisible']),
  }
}
</script>
