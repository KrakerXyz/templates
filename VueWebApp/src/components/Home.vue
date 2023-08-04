
<template>
    <div>
        Home {{ count }}
    </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
    },
    setup() {
        const count = ref(0);
        return { count };
    }
});

</script>
