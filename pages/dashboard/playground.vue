<script lang="ts" setup>
  import TiptapEditor from '~/components/TiptapEditor.vue'

  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'authorization'],
    permission: '*',
    role: 'Admin'
  })

  const contentEditor = ref("<h1>Heading 1</h1><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quisquam debitis quis iure eos explicabo vel quidem velit, mollitia, perferendis quia architecto dignissimos repudiandae magnam consectetur officia atque doloribus. Quod.</p><h2>Heading 2</h2><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quisquam debitis quis iure eos explicabo vel quidem velit, mollitia, perferendis quia architecto dignissimos repudiandae magnam consectetur officia atque doloribus. Quod.</p><h3>Heading 3</h3><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quisquam debitis quis iure eos explicabo vel quidem velit, mollitia, perferendis quia architecto dignissimos repudiandae magnam consectetur officia atque doloribus. Quod.</p><h4>Heading 4</h4><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quisquam debitis quis iure eos explicabo vel quidem velit, mollitia, perferendis quia architecto dignissimos repudiandae magnam consectetur officia atque doloribus. Quod.</p><h5>Heading 5</h5><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quisquam debitis quis iure eos explicabo vel quidem velit, mollitia, perferendis quia architecto dignissimos repudiandae magnam consectetur officia atque doloribus. Quod.</p><h6>Heading 6</h6><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quisquam debitis quis iure eos explicabo vel quidem velit, mollitia, perferendis quia architecto dignissimos repudiandae magnam consectetur officia atque doloribus. Quod.</p><blockquote><p>I'm <strong>running</strong> Tiptap with Vue.js. 🎉</p></blockquote><p>Lorem ipsum, dolor sit amet <strong>consectetur</strong> <u>adipisicing</u> elit. Libero pariatur modi esse placeat quis perferendis dignissimos amet eveniet, eaque facere animi est dolore praesentium, quidem dolorum doloribus nostrum temporibus in?</p><ul><li><p>list 01</p></li><li><p>list 02</p></li><li><p>list 03</p></li></ul><p>Ordered list</p><ol><li><p>Ordered 1</p></li><li><p>ordered 2</p></li><li><p>ordered 3</p></li></ol>")
</script>

<template>
  <section class="content__section">
    <header class="content__header">
      <div class="content__header__holder">
        <h1>Playground</h1>
      </div>
    </header>
    <div class="content__body">
      <p>This Page is for playing with components and will appear for only admins.</p>
      <h2>Content editor</h2>
      <TiptapEditor v-model="contentEditor" />
    </div>
  </section>
</template>
