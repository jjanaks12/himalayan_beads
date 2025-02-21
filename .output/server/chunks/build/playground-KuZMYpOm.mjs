import { defineComponent, ref, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './TiptapEditor-uRjzH7Kj.mjs';
import './MdiIcon-DoZof0z_.mjs';
import './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'pinia-plugin-persistedstate';
import '@tiptap/extension-underline';
import '@tiptap/pm/state';
import '@tiptap/pm/model';
import '@tiptap/pm/transform';
import '@tiptap/pm/commands';
import '@tiptap/pm/schema-list';
import './debounce-Bvemo6-u.mjs';
import '@tiptap/pm/history';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "playground",
  __ssrInlineRender: true,
  setup(__props) {
    const contentEditor = ref("<h1>Heading 1</h1><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quisquam debitis quis iure eos explicabo vel quidem velit, mollitia, perferendis quia architecto dignissimos repudiandae magnam consectetur officia atque doloribus. Quod.</p><h2>Heading 2</h2><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quisquam debitis quis iure eos explicabo vel quidem velit, mollitia, perferendis quia architecto dignissimos repudiandae magnam consectetur officia atque doloribus. Quod.</p><h3>Heading 3</h3><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quisquam debitis quis iure eos explicabo vel quidem velit, mollitia, perferendis quia architecto dignissimos repudiandae magnam consectetur officia atque doloribus. Quod.</p><h4>Heading 4</h4><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quisquam debitis quis iure eos explicabo vel quidem velit, mollitia, perferendis quia architecto dignissimos repudiandae magnam consectetur officia atque doloribus. Quod.</p><h5>Heading 5</h5><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quisquam debitis quis iure eos explicabo vel quidem velit, mollitia, perferendis quia architecto dignissimos repudiandae magnam consectetur officia atque doloribus. Quod.</p><h6>Heading 6</h6><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quisquam debitis quis iure eos explicabo vel quidem velit, mollitia, perferendis quia architecto dignissimos repudiandae magnam consectetur officia atque doloribus. Quod.</p><blockquote><p>I'm <strong>running</strong> Tiptap with Vue.js. \u{1F389}</p></blockquote><p>Lorem ipsum, dolor sit amet <strong>consectetur</strong> <u>adipisicing</u> elit. Libero pariatur modi esse placeat quis perferendis dignissimos amet eveniet, eaque facere animi est dolore praesentium, quidem dolorum doloribus nostrum temporibus in?</p><ul><li><p>list 01</p></li><li><p>list 02</p></li><li><p>list 03</p></li></ul><p>Ordered list</p><ol><li><p>Ordered 1</p></li><li><p>ordered 2</p></li><li><p>ordered 3</p></li></ol>");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "content__section" }, _attrs))}><header class="content__header"><div class="content__header__holder"><h1>Playground</h1></div></header><div class="content__body"><p>This Page is for playing with components and will appear for only admins.</p><h2>Content editor</h2>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: unref(contentEditor),
        "onUpdate:modelValue": ($event) => isRef(contentEditor) ? contentEditor.value = $event : null
      }, null, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/playground.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=playground-KuZMYpOm.mjs.map
