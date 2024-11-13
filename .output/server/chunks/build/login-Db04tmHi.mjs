import { _ as _sfc_main$1 } from './brand-mL1PJDNO.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Dz_gd_31.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { l as loginSchema } from './account.schema-wz7lM2NY.mjs';
import { u as useRouter, a as useRoute, b as useAuth } from './server.mjs';
import './virtual_public-BuZ72MtO.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'yup';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref(false);
    const { signIn } = useAuth();
    const formSubmit = (values) => {
      isLoading.value = true;
      signIn("credentials", {
        ...values,
        redirect: false,
        callbackUrl: "/dashboard"
      }).then(({ ok }) => {
        if (ok)
          if (route.query.callbackUrl)
            router.push(route.query.callbackUrl);
          else
            router.push("/dashboard");
      }).finally(() => {
        isLoading.value = false;
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Brand = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "account__section" }, _attrs))}><div class="account__body">`);
      _push(ssrRenderComponent(_component_Brand, null, null, _parent));
      _push(ssrRenderComponent(unref(Form), {
        class: "account__form",
        id: "login-form",
        onSubmit: formSubmit,
        validationSchema: unref(loginSchema)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="account__form__text"${_scopeId}><h1 class="h2"${_scopeId}>Login</h1><p${_scopeId}>Welcome back!!</p></div><div class="form__group"${_scopeId}><label for="lf__email"${_scopeId}>Email</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              type: "email",
              name: "email",
              id: "lf__email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              class: "input--error",
              name: "email"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form__group"${_scopeId}><label for="lf__password"${_scopeId}>Password</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              type: "password",
              name: "password",
              id: "lf__password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              class: "input--error",
              name: "password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="text--right"${_scopeId}><button type="submit" class="${ssrRenderClass({ "btn btn__primary": true, "loading": unref(isLoading) })}"${_scopeId}>Sign in</button></div>`);
          } else {
            return [
              createVNode("div", { class: "account__form__text" }, [
                createVNode("h1", { class: "h2" }, "Login"),
                createVNode("p", null, "Welcome back!!")
              ]),
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "lf__email" }, "Email"),
                createVNode(unref(Field), {
                  type: "email",
                  name: "email",
                  id: "lf__email"
                }),
                createVNode(unref(ErrorMessage), {
                  class: "input--error",
                  name: "email"
                })
              ]),
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "lf__password" }, "Password"),
                createVNode(unref(Field), {
                  type: "password",
                  name: "password",
                  id: "lf__password"
                }),
                createVNode(unref(ErrorMessage), {
                  class: "input--error",
                  name: "password"
                })
              ]),
              createVNode("div", { class: "text--right" }, [
                createVNode("button", {
                  type: "submit",
                  class: { "btn btn__primary": true, "loading": unref(isLoading) }
                }, "Sign in", 2)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="account__meta"><p>Has no account? `);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/register" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`signup`);
          } else {
            return [
              createTextVNode("signup")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(account)/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-Db04tmHi.mjs.map
