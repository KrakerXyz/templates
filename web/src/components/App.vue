
<template>
   <Suspense>
      <template #default>
         <router-view></router-view>
      </template>
      <template #fallback>
         <span>Loading...</span>
      </template>
   </Suspense>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    props: {
    },
    setup() {
        return {};
    }
});

</script>
