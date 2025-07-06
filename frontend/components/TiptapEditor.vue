<script lang="ts" setup>
  import Underline from '@tiptap/extension-underline'
  import HorizontalRule from '@tiptap/extension-horizontal-rule'
  import { BoldIcon, Heading1Icon, Heading2Icon, Heading3Icon, Heading4Icon, Heading5Icon, Heading6Icon, ItalicIcon, ListIcon, ListOrderedIcon, MinusIcon, QuoteIcon, RedoIcon, RotateCcwIcon, StrikethroughIcon, UnderlineIcon, UndoIcon, WrapTextIcon, XIcon } from 'lucide-vue-next'

  import { debounce } from '~/lib/filters'

  interface TiptapEditorProps {
    modelValue: string
    disabled?: boolean
  }

  const props = defineProps<TiptapEditorProps>()
  const emit = defineEmits(['update:modelValue'])

  const editor = useEditor({
    content: props.modelValue,
    extensions: [TiptapDocument, TiptapParagraph, TiptapText, TiptapBold, TiptapItalic, TiptapStrike, TiptapBlockquote, TiptapBulletList, TiptapHeading, TiptapListItem, TiptapHistory, TiptapOrderedList, Underline, HorizontalRule],
    onUpdate: ({ editor }) => {
      debounce(() => {
        emit('update:modelValue', editor.getHTML())
      }, 5000)
    }
  })

  onBeforeUnmount(() => {
    // @ts-expect-error
    unref(editor).destroy()
  })

  watch(() => props.modelValue, () => {
    editor.value?.commands.setContent(props.modelValue)
  })

  onMounted(() => {
    if (props.modelValue)
      editor.value?.commands.setContent(props.modelValue)
  })
</script>

<template>
  <div :class="{ 'editor': true, 'editor--disabled': disabled }">
    <div class="flex bg-gray-200 gap-1 p-1 rounded-sm mb-2" v-if="editor">
      <div class="bg-gray-300 p-1">
        <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }">
          <BoldIcon />
        </Button>
        <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }">
          <ItalicIcon />
        </Button>
        <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleUnderline().run()"
          :disabled="!editor.can().chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }">
          <UnderlineIcon />
        </Button>
        <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }">
          <StrikethroughIcon />
        </Button>
      </div>
      <!-- <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        <MdiIcon icon="mdiCodeBraces" />
      </Button> -->
      <div class="bg-gray-300 p-1">
        <Button size="sm" variant="ghost" @click="editor.chain().focus().unsetAllMarks().run()">
          <XIcon />
        </Button>
        <Button size="sm" variant="ghost" @click="editor.chain().focus().clearNodes().run()">
          <RotateCcwIcon />
        </Button>
        <Button size="sm" variant="ghost" @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }">
          <WrapTextIcon />
        </Button>
      </div>
      <div class="bg-gray-300 p-1">
        <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
          <Heading1Icon />
        </Button>
        <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
          <Heading2Icon />
        </Button>
        <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
          <Heading3Icon />
        </Button>
        <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
          <Heading4Icon />
        </Button>
        <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
          <Heading5Icon />
        </Button>
        <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
          <Heading6Icon />
        </Button>
      </div>
      <div class="bg-gray-300 p-1">
        <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }">
          <ListIcon />
        </Button>
        <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }">
          <ListOrderedIcon />
        </Button>
      </div>
      <!-- <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }">
        <MdiIcon icon="mdiCodeArray" />
      </Button> -->
      <div class="bg-gray-300 p-1">
        <Button size="sm" variant="ghost" @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }">
          <QuoteIcon />
        </Button>
        <Button size="sm" variant="ghost" @click="editor.chain().focus().setHorizontalRule().run()">
          <MinusIcon />
        </Button>
        <!-- <Button size="sm" variant="ghost" @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </Button> -->
      </div>
      <div class="bg-gray-300 p-1">
        <Button size="sm" variant="ghost" @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()">
          <UndoIcon />
        </Button>
        <Button size="sm" variant="ghost" @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()">
          <RedoIcon />
        </Button>
      </div>
    </div>
    <TiptapEditorContent class="content_editor p-3 bg-gray-100 rounded-sm focus:outline-0"
      :editor="editor" />
  </div>
</template>

<style lang="css">
  .ProseMirror {
    min-height: 200px;
    outline: none;
  }
</style>