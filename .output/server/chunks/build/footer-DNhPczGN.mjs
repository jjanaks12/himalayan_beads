import { _ as _imports_0, a as _sfc_main$1 } from './virtual_public-BMQFK9BB.mjs';
import { mergeProps, withCtx, createVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_1 } from './virtual_public-BuZ72MtO.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './server.mjs';
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

const _imports_2 = publicAssetsURL("/images/logo01.png");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Dropdown = _sfc_main$1;
  _push(`<footer${ssrRenderAttrs(mergeProps({ id: "footer" }, _attrs))}><div class="container"><div class="footer__bar">`);
  _push(ssrRenderComponent(_component_Dropdown, {
    as: "ul",
    class: "language"
  }, {
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
        _push2(`<li${_scopeId}><a href="#"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="us-en"${_scopeId}><span class="text"${_scopeId}>English</span></a></li><li${_scopeId}><a href="#"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="us-en"${_scopeId}><span class="text"${_scopeId}>Nepali</span></a></li>`);
      } else {
        return [
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
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<ul class="footer__links"><li><a href="#"><span class="icon-star"></span> Premium Qulity</a></li><li><a href="#"><span class="icon-check-o"></span> Fast Delivery</a></li><li><a href="#"><span class="icon-repeat"></span> Easy Exchange</a></li><li><a href="#"><span class="icon-lock"></span> Secure Payment</a></li></ul></div><div class="footer__navigation"><div class="footer__block"><div class="logo"><a href="#"><img${ssrRenderAttr("src", _imports_1)} alt="Himalayan Beads"></a></div><nav class="footer__nav"><ul><li><a href="#">About Us</a></li><li><a href="#">Testimonials</a></li><li><a href="#">Our Blogs</a></li><li><a href="#">Careers</a></li><li><a href="#">Contact Us</a></li></ul><ul><li><a href="#">Exchange/Return Order</a></li><li><a href="#">Track Order</a></li><li><a href="#">Customer Support</a></li><li><a href="#">Your Account</a></li><li><a href="#">FAQ\u2019s</a></li></ul><ul><li><a href="#">Free Consult</a></li><li><a href="#">Custom Order</a></li></ul></nav></div><div class="newsletter"><h3>Newsletter</h3><div class="text"><p><a href="#">Sign up</a> for getting the latest news from Himalayan Beads, including exclusive online pre-launches and new collections.</p></div></div><div class="contact__info"><h3>Contact Information</h3><address> 123 Himalayan Street, Kathmandu, Nepal <br><a href="mailto:info@himalayanbeads.com">info@himalayanbeads.com</a> <br><a href="tel:+977-123456789">+977-123456789</a></address></div></div><div class="footer__note"><span class="copyright">\xA9 2024 Himalayan Beads Pvt. Ltd.</span><div class="holder"><div class="logo__list"><a href="#"><img${ssrRenderAttr("src", _imports_2)} alt="image description"></a></div><span class="created_by">Created by <a href="#">Janak Shrestha</a></span></div></div></div></footer>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default/footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppFooter = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { AppFooter as default };
//# sourceMappingURL=footer-DNhPczGN.mjs.map
