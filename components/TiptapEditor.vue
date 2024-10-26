<script lang="ts" setup>
  import Underline from '@tiptap/extension-underline'
  import HorizontalRule from '@tiptap/extension-horizontal-rule'

  interface TiptapEditorProps {
    modelValue: string
  }

  const props = defineProps<TiptapEditorProps>()
  const emit = defineEmits(['update:modelValue'])

  const editor = useEditor({
    content: props.modelValue,
    extensions: [TipTapDocument, TipTapParagraph, TipTapText, TipTapBold, TipTapItalic, TipTapStrike, TipTapBlockquote, TipTapBulletList, TipTapHeading, TipTapListItem, TipTapHistory, TipTapOrderedList, Underline, HorizontalRule],
    onUpdate: ({ editor }) => {
      emit('update:modelValue', editor.getHTML())
    }
  })

  onBeforeUnmount(() => {
    unref(editor).destroy()
  })
</script>

<template>
  <div class="editor">
    <div class="editor__menu" v-if="editor">
      <div class="editor__menu__group">
        <button @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }">
          <MdiIcon icon="mdiFormatBold" />
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }">
          <MdiIcon icon="mdiFormatItalic" />
        </button>
        <button @click="editor.chain().focus().toggleUnderline().run()"
          :disabled="!editor.can().chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }">
          <MdiIcon icon="mdiFormatUnderline" />
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }">
          <MdiIcon icon="mdiFormatStrikethrough" />
        </button>
      </div>
      <!-- <button @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        <MdiIcon icon="mdiCodeBraces" />
      </button> -->
      <div class="editor__menu__group">
        <button @click="editor.chain().focus().unsetAllMarks().run()">
          <MdiIcon icon="mdiFormatClear" />
        </button>
        <button @click="editor.chain().focus().clearNodes().run()">
          <MdiIcon icon="mdiRestart" />
        </button>
        <button @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }">
          <MdiIcon icon="mdiFormatParagraph" />
        </button>
      </div>
      <div class="editor__menu__group">
        <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
          <MdiIcon icon="mdiFormatHeader1" />
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
          <MdiIcon icon="mdiFormatHeader2" />
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
          <MdiIcon icon="mdiFormatHeader3" />
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
          <MdiIcon icon="mdiFormatHeader4" />
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
          <MdiIcon icon="mdiFormatHeader5" />
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
          <MdiIcon icon="mdiFormatHeader6" />
        </button>
      </div>
      <div class="editor__menu__group">
        <button @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }">
          <MdiIcon icon="mdiFormatListBulleted" />
        </button>
        <button @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }">
          <MdiIcon icon="mdiFormatListNumbered" />
        </button>
      </div>
      <!-- <button @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }">
        <MdiIcon icon="mdiCodeArray" />
      </button> -->
      <div class="editor__menu__group">
        <button @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }">
          <MdiIcon icon="mdiFormatQuoteOpen" />
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()">
          <MdiIcon icon="mdiLineScan" />
        </button>
        <!-- <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button> -->
      </div>
      <div class="editor__menu__group">
        <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
          <MdiIcon icon="mdiUndo" />
        </button>
        <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
          <MdiIcon icon="mdiRedo" />
        </button>
      </div>
    </div>
    <TipTapEditorContent class="editor__content" :editor="editor" />
  </div>
</template>
