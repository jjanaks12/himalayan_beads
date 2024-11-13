import { _ as __nuxt_component_0 } from './nuxt-link-Dz_gd_31.mjs';
import { _ as _sfc_main$2 } from './Dropdown-DwiPMNDY.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-_VIYiGwf.mjs';
import { _ as _imports_1, a as _imports_2 } from './virtual_public-CRxQYefw.mjs';
import { _ as _sfc_main$1 } from './brand-mL1PJDNO.mjs';
import { b as useAuth } from './server.mjs';
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
import './virtual_public-BuZ72MtO.mjs';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    const isMenuActive = ref(false);
    const { status } = useAuth();
    watch(isMenuActive, () => {
      if (isMenuActive.value) {
        (void 0).body.style.overflow = "hidden";
        (void 0).body.classList.add("nav--active");
      } else {
        (void 0).body.style.overflow = "";
        (void 0).body.classList.remove("nav--active");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Dropdown = _sfc_main$2;
      _push(`<header${ssrRenderAttrs(mergeProps({ id: "header" }, _attrs))}><div class="container container--lg"><a href="#" class="nav__opener"><span class="icon-add"></span><span class="icon-menu"></span></a>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<nav id="nav"><ul class="main__menu"><li><a href="#">Rudraksha</a></li><li><a href="#">Custom Order</a></li><li><a href="#">Blog</a></li></ul><div class="nav__drop"><a href="#" class="nav__opener"><span class="icon-add"></span></a><strong class="greetings"><span>Heya!</span> Welcome to Himalayan Beads </strong>`);
      if (unref(status) == "unauthenticated") {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "register",
          class: "link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`sign in`);
            } else {
              return [
                createTextVNode("sign in")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "dashboard",
          class: "link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`dashboard`);
            } else {
              return [
                createTextVNode("dashboard")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`<ul class="secondary__menu"><li><a href="#">Track order</a></li><li><a href="#">HB Perks</a></li><li><span class="text">More on HB</span></li><li><a href="#">Contact Us</a></li><li><a href="#">Careers</a></li><li><a href="#">Sell on HB</a></li><li><a href="#">Advertise on HB</a></li><li><a href="#">Terms</a></li></ul></div>`);
      _push(ssrRenderComponent(_component_Dropdown, { class: "language" }, {
        opener: withCtx(({ clickHandler }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a href="#" class="dropdown__opener"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="us-en"${_scopeId}><span class="text"${_scopeId}>English</span></a>`);
          } else {
            return [
              createVNode("a", {
                href: "#",
                class: "dropdown__opener",
                onClick: withModifiers(clickHandler, ["prevent"])
              }, [
                createVNode("img", {
                  src: _imports_0,
                  alt: "us-en"
                }),
                createVNode("span", { class: "text" }, "English")
              ], 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="language__menu"${_scopeId}><li${_scopeId}><a href="#"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="us-en"${_scopeId}><span class="text"${_scopeId}>English</span></a></li><li${_scopeId}><a href="#"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="us-en"${_scopeId}><span class="text"${_scopeId}>Nepali</span></a></li></ul>`);
          } else {
            return [
              createVNode("ul", { class: "language__menu" }, [
                createVNode("li", null, [
                  createVNode("a", { href: "#" }, [
                    createVNode("img", {
                      src: _imports_0,
                      alt: "us-en"
                    }),
                    createVNode("span", { class: "text" }, "English")
                  ])
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "#" }, [
                    createVNode("img", {
                      src: _imports_0,
                      alt: "us-en"
                    }),
                    createVNode("span", { class: "text" }, "Nepali")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<form action="#" class="search__form"><fieldset class="fieldset"><div class="form__group"><label for="sf__search">Search</label><input type="search" name="search" id="sf__search" placeholder="Search"></div><button type="submit"><span class="icon-search"></span></button></fieldset></form><div class="holder">`);
      _push(ssrRenderComponent(_component_Dropdown, { class: "wishlist wishlist--notification" }, {
        opener: withCtx(({ clickHandler }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a href="#" class="dropdown__opener"${_scopeId}><span class="icon-whishlist"${_scopeId}></span></a>`);
          } else {
            return [
              createVNode("a", {
                href: "#",
                class: "dropdown__opener",
                onClick: withModifiers(clickHandler, ["prevent"])
              }, [
                createVNode("span", { class: "icon-whishlist" })
              ], 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="product__item__list product__item__list--list"${_scopeId}><div class="product__item"${_scopeId}><figure class="product__item__image"${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="product image"${_scopeId}></figure><div class="product__item__detail"${_scopeId}><h3${_scopeId}><a href="#"${_scopeId}>One Mukhi Rudraksha</a></h3><em class="product__category"${_scopeId}>(1 face rudraksha)</em><em class="product__price"${_scopeId}>$ 200</em></div><div class="product__item__action"${_scopeId}><a class="btn btn__primary btn--outline btn--xs" href="#"${_scopeId}><span class="icon-add"${_scopeId}></span> remove</a></div></div><div class="product__item"${_scopeId}><figure class="product__item__image"${_scopeId}><img${ssrRenderAttr("src", _imports_2)} alt="product image"${_scopeId}></figure><div class="product__item__detail"${_scopeId}><h3${_scopeId}><a href="#"${_scopeId}>Combination of (7, 8 &amp; 12) Mukhi</a></h3><em class="product__category"${_scopeId}>Rudraksha</em><em class="product__price"${_scopeId}>$ 200</em></div><div class="product__item__action"${_scopeId}><a class="btn btn__primary btn--outline btn--xs" href="#"${_scopeId}><span class="icon-add"${_scopeId}></span> remove </a></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "product__item__list product__item__list--list" }, [
                createVNode("div", { class: "product__item" }, [
                  createVNode("figure", { class: "product__item__image" }, [
                    createVNode("img", {
                      src: _imports_1,
                      alt: "product image"
                    })
                  ]),
                  createVNode("div", { class: "product__item__detail" }, [
                    createVNode("h3", null, [
                      createVNode("a", { href: "#" }, "One Mukhi Rudraksha")
                    ]),
                    createVNode("em", { class: "product__category" }, "(1 face rudraksha)"),
                    createVNode("em", { class: "product__price" }, "$ 200")
                  ]),
                  createVNode("div", { class: "product__item__action" }, [
                    createVNode("a", {
                      class: "btn btn__primary btn--outline btn--xs",
                      href: "#"
                    }, [
                      createVNode("span", { class: "icon-add" }),
                      createTextVNode(" remove")
                    ])
                  ])
                ]),
                createVNode("div", { class: "product__item" }, [
                  createVNode("figure", { class: "product__item__image" }, [
                    createVNode("img", {
                      src: _imports_2,
                      alt: "product image"
                    })
                  ]),
                  createVNode("div", { class: "product__item__detail" }, [
                    createVNode("h3", null, [
                      createVNode("a", { href: "#" }, "Combination of (7, 8 & 12) Mukhi")
                    ]),
                    createVNode("em", { class: "product__category" }, "Rudraksha"),
                    createVNode("em", { class: "product__price" }, "$ 200")
                  ]),
                  createVNode("div", { class: "product__item__action" }, [
                    createVNode("a", {
                      class: "btn btn__primary btn--outline btn--xs",
                      href: "#"
                    }, [
                      createVNode("span", { class: "icon-add" }),
                      createTextVNode(" remove ")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Dropdown, { class: "cart cart--notification" }, {
        opener: withCtx(({ clickHandler }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a href="#" class="dropdown__opener"${_scopeId}><span class="icon-cart"${_scopeId}></span></a>`);
          } else {
            return [
              createVNode("a", {
                href: "#",
                class: "dropdown__opener",
                onClick: withModifiers(clickHandler, ["prevent"])
              }, [
                createVNode("span", { class: "icon-cart" })
              ], 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="product__item__list product__item__list--list"${_scopeId}><div class="product__item"${_scopeId}><figure class="product__item__image"${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="product image"${_scopeId}></figure><div class="product__item__detail"${_scopeId}><h3 class="h6"${_scopeId}><a href="#"${_scopeId}>One Mukhi Rudraksha</a></h3><em class="product__category"${_scopeId}>(1 face rudraksha)</em><em class="product__price"${_scopeId}>$ 200</em></div><div class="product__item__action"${_scopeId}><a class="btn btn__primary btn--outline btn--xs" href="#"${_scopeId}><span class="icon-add"${_scopeId}></span> remove</a></div></div><div class="product__item"${_scopeId}><figure class="product__item__image"${_scopeId}><img${ssrRenderAttr("src", _imports_2)} alt="product image"${_scopeId}></figure><div class="product__item__detail"${_scopeId}><h3 class="h6"${_scopeId}><a href="#"${_scopeId}>Combination of (7, 8 &amp; 12) Mukhi</a></h3><em class="product__category"${_scopeId}>Rudraksha</em><em class="product__price"${_scopeId}>$ 200</em></div><div class="product__item__action"${_scopeId}><a class="btn btn__primary btn--outline btn--xs" href="#"${_scopeId}><span class="icon-add"${_scopeId}></span> remove</a></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "product__item__list product__item__list--list" }, [
                createVNode("div", { class: "product__item" }, [
                  createVNode("figure", { class: "product__item__image" }, [
                    createVNode("img", {
                      src: _imports_1,
                      alt: "product image"
                    })
                  ]),
                  createVNode("div", { class: "product__item__detail" }, [
                    createVNode("h3", { class: "h6" }, [
                      createVNode("a", { href: "#" }, "One Mukhi Rudraksha")
                    ]),
                    createVNode("em", { class: "product__category" }, "(1 face rudraksha)"),
                    createVNode("em", { class: "product__price" }, "$ 200")
                  ]),
                  createVNode("div", { class: "product__item__action" }, [
                    createVNode("a", {
                      class: "btn btn__primary btn--outline btn--xs",
                      href: "#"
                    }, [
                      createVNode("span", { class: "icon-add" }),
                      createTextVNode(" remove")
                    ])
                  ])
                ]),
                createVNode("div", { class: "product__item" }, [
                  createVNode("figure", { class: "product__item__image" }, [
                    createVNode("img", {
                      src: _imports_2,
                      alt: "product image"
                    })
                  ]),
                  createVNode("div", { class: "product__item__detail" }, [
                    createVNode("h3", { class: "h6" }, [
                      createVNode("a", { href: "#" }, "Combination of (7, 8 & 12) Mukhi")
                    ]),
                    createVNode("em", { class: "product__category" }, "Rudraksha"),
                    createVNode("em", { class: "product__price" }, "$ 200")
                  ]),
                  createVNode("div", { class: "product__item__action" }, [
                    createVNode("a", {
                      class: "btn btn__primary btn--outline btn--xs",
                      href: "#"
                    }, [
                      createVNode("span", { class: "icon-add" }),
                      createTextVNode(" remove")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></nav></div></header>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default/header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=header-BUQ-2Ra1.mjs.map
