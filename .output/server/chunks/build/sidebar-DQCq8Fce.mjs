import { _ as _sfc_main$1 } from './brand-mL1PJDNO.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Dz_gd_31.mjs';
import { _ as __nuxt_component_2 } from './MdiIcon-DU05I9i6.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { b as useAuth, a as useRoute } from './server.mjs';
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
import 'vue-router';

const menus = [{
  title: "Dashboard",
  path: "/dashboard",
  icon: "mdiViewDashboard",
  permission: "*"
}, {
  title: "Product",
  path: "/dashboard/product",
  icon: "mdiFileTree",
  permission: "manage_product"
}, {
  title: "Category",
  path: "/dashboard/category",
  icon: "mdiShape",
  permission: "manage_category"
}, {
  title: "Users",
  path: "/dashboard/user",
  icon: "mdiAccountGroup",
  permission: "manage_user"
}, {
  title: "Settings",
  path: "/dashboard/settings",
  icon: "mdiCogOutline",
  permission: "*",
  sub_menu: [{
    title: "Roles",
    path: "/dashboard/settings/role",
    icon: "mdiAccountMultiple",
    permission: "manage_roles"
  }, {
    title: "Permissions",
    path: "/dashboard/settings/permission",
    icon: "mdiAccountLock",
    permission: "manage_permission"
  }]
}, {
  title: "Playground",
  path: "/dashboard/playground",
  icon: "mdiPlayNetwork",
  permission: "*"
}];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const route = useRoute();
    const currentIndex = ref(0);
    const updateMenuIndex = () => {
      let index = 0;
      const menu = menus.find((menu2, i) => menu2.path == route.path ? i : menu2.sub_menu && menu2.sub_menu.find((submenu) => submenu.path == route.path) ? i : null);
      if (menu)
        index = menus.indexOf(menu);
      currentIndex.value = index;
    };
    watch(route, () => {
      updateMenuIndex();
    }, {
      deep: true,
      immediate: true
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Brand = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_MdiIcon = __nuxt_component_2;
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<aside${ssrRenderAttrs(mergeProps({ id: "admin-sidebar" }, _attrs))}><div class="sidebar__header">`);
      _push(ssrRenderComponent(_component_Brand, null, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "menu__link",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_MdiIcon, { icon: "mdiOpenInNew" }, null, _parent2, _scopeId));
            _push2(` To site `);
          } else {
            return [
              createVNode(_component_MdiIcon, { icon: "mdiOpenInNew" }),
              createTextVNode(" To site ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><ul class="admin__main__menu"><!--[-->`);
      ssrRenderList(unref(menus), (menu, index) => {
        var _a;
        _push(`<li class="${ssrRenderClass({
          "has--children": menu.sub_menu && menu.sub_menu.length > 0,
          "show-children": index == unref(currentIndex)
        })}">`);
        if (!(menu.sub_menu && menu.sub_menu.length > 0)) {
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: menu.path
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_MdiIcon, {
                  icon: menu.icon
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(menu.title)}`);
              } else {
                return [
                  createVNode(_component_MdiIcon, {
                    icon: menu.icon
                  }, null, 8, ["icon"]),
                  createTextVNode(" " + toDisplayString(menu.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<a href="#">`);
          _push(ssrRenderComponent(_component_MdiIcon, {
            icon: menu.icon
          }, null, _parent));
          _push(` ${ssrInterpolate(menu.title)}</a>`);
        }
        if (menu.sub_menu && ((_a = menu.sub_menu) == null ? void 0 : _a.length) > 0) {
          _push(`<ul><!--[-->`);
          ssrRenderList(menu.sub_menu, (submenu) => {
            _push(`<li>`);
            _push(ssrRenderComponent(_component_nuxt_link, {
              to: submenu.path
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_MdiIcon, {
                    icon: submenu.icon
                  }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(submenu.title)}`);
                } else {
                  return [
                    createVNode(_component_MdiIcon, {
                      icon: submenu.icon
                    }, null, 8, ["icon"]),
                    createTextVNode(" " + toDisplayString(submenu.title), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul><a href="#" class="menu__link">`);
      _push(ssrRenderComponent(_component_MdiIcon, { icon: "mdiLogout" }, null, _parent));
      _push(` Logout </a></aside>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin/sidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sidebar-DQCq8Fce.mjs.map
