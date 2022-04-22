
<template>
   <div>
      Home
      <div id="editor-ide-container" style="width:100%; height:800px"></div>
   </div>
</template>

<script lang="ts">

import { useMonacoEditor } from '@/services/monacoEditor';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {

        const { content } = useMonacoEditor(
            'editor-ide-container'
        );

        content.value = 'console.log(\'Hello World\');';

        return {};
    }
});

</script>
