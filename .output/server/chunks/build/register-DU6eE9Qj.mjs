import { _ as __nuxt_component_0 } from './nuxt-link-BAlVYdW3.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { _ as _sfc_main$1, r as registerSchema } from './account.schema-DvSk6br3.mjs';
import { a as useRoute, u as useRouter } from './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'requrl';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'yup';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(false);
    const formSubmit = (values) => {
      isLoading.value = true;
      $fetch("/api/auth/register", {
        method: "POST",
        body: { ...values }
      }).then((response) => {
        if (response.status)
          if (route.query.callbackUrl)
            router.push(route.query.callbackUrl);
          else
            router.push("/dashboard");
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "account__section" }, _attrs))}><div class="account__body">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(unref(Form), {
        class: "account__form",
        "validation-schema": unref(registerSchema),
        onSubmit: formSubmit,
        id: "register-form"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="account__form__text"${_scopeId}><h1 class="h2"${_scopeId}>Welcome to our site</h1><p${_scopeId}>We are very happy to have you. I hope you would like our service</p></div><div class="form__group"${_scopeId}><label for="rf__email"${_scopeId}>Email</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              type: "email",
              name: "email",
              id: "rf__email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              class: "input--error",
              name: "email"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form__group"${_scopeId}><label for="rf__password"${_scopeId}>Password</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              type: "password",
              name: "password",
              id: "rf__password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              class: "input--error",
              name: "password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form__group"${_scopeId}><label for="rf__confirm_password"${_scopeId}>Confirm Password</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              type: "password",
              name: "password_confirmation",
              id: "rf__confirm_password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              class: "input--error",
              name: "password_confirmation"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="text--right"${_scopeId}><button type="submit" class="${ssrRenderClass({ "btn btn__primary": true, "loading": unref(isLoading) })}"${_scopeId}>Sign up</button></div>`);
          } else {
            return [
              createVNode("div", { class: "account__form__text" }, [
                createVNode("h1", { class: "h2" }, "Welcome to our site"),
                createVNode("p", null, "We are very happy to have you. I hope you would like our service")
              ]),
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "rf__email" }, "Email"),
                createVNode(unref(Field), {
                  type: "email",
                  name: "email",
                  id: "rf__email"
                }),
                createVNode(unref(ErrorMessage), {
                  class: "input--error",
                  name: "email"
                })
              ]),
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "rf__password" }, "Password"),
                createVNode(unref(Field), {
                  type: "password",
                  name: "password",
                  id: "rf__password"
                }),
                createVNode(unref(ErrorMessage), {
                  class: "input--error",
                  name: "password"
                })
              ]),
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "rf__confirm_password" }, "Confirm Password"),
                createVNode(unref(Field), {
                  type: "password",
                  name: "password_confirmation",
                  id: "rf__confirm_password"
                }),
                createVNode(unref(ErrorMessage), {
                  class: "input--error",
                  name: "password_confirmation"
                })
              ]),
              createVNode("div", { class: "text--right" }, [
                createVNode("button", {
                  type: "submit",
                  class: { "btn btn__primary": true, "loading": unref(isLoading) }
                }, "Sign up", 2)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="account__meta"><p>Already has an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`signin`);
          } else {
            return [
              createTextVNode("signin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(account)/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-DU6eE9Qj.mjs.map
