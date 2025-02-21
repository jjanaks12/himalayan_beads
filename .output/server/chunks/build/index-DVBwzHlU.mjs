import { useSSRContext, defineComponent, mergeProps, withCtx, createVNode, ref, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import _sfc_main$3 from './product-Bi1AkPG_.mjs';
import { u as useHead } from './index-CCqbQxu4.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './product-CB4cTNXd.mjs';
import '@prisma/client';
import './server.mjs';
import 'vue-router';
import 'pinia-plugin-persistedstate';
import './debounce-Bvemo6-u.mjs';
import './productItem-D8XyF5HL.mjs';
import './nuxt-link-BnP_J6z-.mjs';
import './Button-__geryau.mjs';
import './authorization-BlcTZSD-.mjs';
import './product-Df98zCkI.mjs';
import './cart-D1watn9y.mjs';

const _imports_0 = publicAssetsURL("/images/img01.png");
const _imports_1 = publicAssetsURL("/images/product05.png");
const _imports_2 = publicAssetsURL("/images/product06.png");
const _imports_3 = publicAssetsURL("/images/img02.png");
const _imports_4 = publicAssetsURL("/images/img03.png");
const _imports_5 = publicAssetsURL("/images/img04.png");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "accordion" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/accordion/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AccordionItem",
  __ssrInlineRender: true,
  props: {
    title: {},
    active: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    const accordionItemIndex = ref(null);
    const isActive = ref(false);
    __expose({ accordionItemIndex });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: { "accordion__block": true, "accordion__block--active": unref(isActive) }
      }, _attrs))}><a class="accordion__opener" href="#">${ssrInterpolate(_ctx.title)}</a><div class="accordion__slide"><div class="holder">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/accordion/AccordionItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Home page"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ id: "main" }, _attrs))}><section class="main__banner"><div class="main__banner__bg"><img${ssrRenderAttr("src", _imports_0)} alt="image description"></div><div class="main__banner__caption"><div class="container"><div class="holder"><h1>Discover the beauty of Himalayan Beads.</h1><p>Experience the spiritual benefits of our authentic rudraksha products.</p><div class="btn__group"><a href="#" class="btn btn__primary">explore all products</a><a href="#" class="btn btn__light">learn more</a></div></div></div></div></section><a href="#" class="flash__message"><div class="container"><span class="icon-bolt"></span><span class="text">SIGN UP Now &amp; GET 15% OFF</span><span class="icon-arrow-d"></span></div></a><section class="services__section"><div class="container"><div class="row services__list"><div class="col-tablet-3 services__item"><div class="icon__holder"></div><h3 class="h6">Shop Premium Quality Products</h3><p>L\xF6rem ipsum gr\xF6nt elcertifikat pabysade om valstuga att gensax spepuck i bloggosf\xE4r. </p></div><div class="col-tablet-3 services__item"><div class="icon__holder"></div><h3 class="h6">Energized Rudraksha</h3><p>L\xF6rem ipsum gr\xF6nt elcertifikat pabysade om valstuga att gensax spepuck i bloggosf\xE4r. </p></div><div class="col-tablet-3 services__item"><div class="icon__holder"></div><h3 class="h6">Effortless Shopping, Easy Returns</h3><p>L\xF6rem ipsum gr\xF6nt elcertifikat pabysade om valstuga att gensax spepuck i bloggosf\xE4r. </p></div><div class="col-tablet-3 services__item"><div class="icon__holder"></div><h3 class="h6">Our Speedy Shipping Promise</h3><p>L\xF6rem ipsum gr\xF6nt elcertifikat pabysade om valstuga att gensax spepuck i bloggosf\xE4r. </p></div></div></div></section>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`<div class="container container--lg"><div class="row"><div class="col-tablet-6"><div class="product__item product__item--promotion"><figure class="product__item__image"><img${ssrRenderAttr("src", _imports_1)} alt="product image"></figure><div class="product__item__detail"><h3 class="h6"><a href="#">Consultation Block Banner</a></h3><span class="tag">Astrology</span></div></div></div><div class="col-tablet-6"><div class="product__item product__item--promotion product__item--promotion--centered"><figure class="product__item__image"><img${ssrRenderAttr("src", _imports_2)} alt="product image"></figure><div class="product__item__detail"><h3 class="h6"><a href="#">Nirakar Japa mala( Rare variety) Collection Block Banner</a></h3></div></div></div></div></div><div class="container"><div class="row"><div class="col-tablet-6"><div class="faq__section"><h2>Mostly Customer Ask FAQ\u2019s</h2>`);
      _push(ssrRenderComponent(_sfc_main$2, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, { title: "What is Rudraksha used for?" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              title: "Who should wear Rudraksha?",
              active: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, { title: "How to check whether Rudraksha is original?" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, { title: "Why is Nepali Rudraksha so expensive?" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, { title: "What are the qualities of real Rudraksha?" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, { title: "Still have your questions?" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}>Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.</p>`);
                } else {
                  return [
                    createVNode("p", null, "Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, { title: "What is Rudraksha used for?" }, {
                default: withCtx(() => [
                  createVNode("p", null, "Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$1, {
                title: "Who should wear Rudraksha?",
                active: ""
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$1, { title: "How to check whether Rudraksha is original?" }, {
                default: withCtx(() => [
                  createVNode("p", null, "Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$1, { title: "Why is Nepali Rudraksha so expensive?" }, {
                default: withCtx(() => [
                  createVNode("p", null, "Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$1, { title: "What are the qualities of real Rudraksha?" }, {
                default: withCtx(() => [
                  createVNode("p", null, "Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$1, { title: "Still have your questions?" }, {
                default: withCtx(() => [
                  createVNode("p", null, "Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi commodo.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="col-tablet-6"><section class="testimonial__section"><h2>Genuine Reviews from Our Satisfied Customers</h2></section></div></div></div><div class="info__section"><div class="row align--center"><div class="col-tablet-5"><div class="holder"><h2>Buy Premium Rudraksha Beads Now! </h2><em>Experience Their Powerful Benefits</em><ul class="check__list"><li>Authentic Rudraksha Beads for Spiritual Awakening</li><li>Enhance Your Meditation Practice with Sacred Rudraksha Beads</li><li>Find Inner Peace and Balance with our Rudraksha Collection</li></ul><a href="#" class="btn btn__primary">Learn More Rudraksha</a></div></div><div class="col-tablet-7"><a href="#" class="video__block"><img${ssrRenderAttr("src", _imports_3)} alt="imaeg description"></a></div></div></div><div class="container"><div class="row"><div class="col-tablet-6"><a href="#" class="support support--success"><div class="icon__holder"><span class="icon-shipping"></span></div><div class="support__text"><h3>Worldwide Fast Shipping</h3><p>Get free access to unique experiences and hottest brands on the internet tried &amp; tested by the LBB crew</p></div></a></div><div class="col-tablet-6"><a href="#" class="support support--warning"><div class="icon__holder"><span class="icon-support"></span></div><div class="support__text"><h3>Need help? We got you</h3><p>You can find more information on the FAQs. You can also contact us for any questions you might have.</p></div></a></div></div><section class="blog__section"><div class="blog__section__header"><h2>Explore our informative and engaging blog posts</h2></div><div class="row post__list"><article class="col-tablet-4 post"><figure class="post__image"><img${ssrRenderAttr("src", _imports_4)} alt="image description"></figure><div class="post__detail"><div class="post__meta"><em class="post__category">Category</em><span class="time">5 min ago</span></div><h3><a href="#">Unveiling the Power of Rudraksha Beads</a></h3><div class="post__excerpt"><p>Discover the incredible benefits of wearing Rudraksha beads.</p></div></div><div class="post__action"><a href="#" class="btn btn__primary btn--outline">read more</a></div></article><article class="col-tablet-4 post"><figure class="post__image"><img${ssrRenderAttr("src", _imports_5)} alt="image description"></figure><div class="post__detail"><div class="post__meta"><em class="post__category">Category</em><span class="time">5 min ago</span></div><h3><a href="#">Unveiling the Power of Rudraksha Beads</a></h3><div class="post__excerpt"><p>Discover the incredible benefits of wearing Rudraksha beads.</p></div></div><div class="post__action"><a href="#" class="btn btn__primary btn--outline">read more</a></div></article><article class="col-tablet-4 post"><figure class="post__image"><img${ssrRenderAttr("src", _imports_4)} alt="image description"></figure><div class="post__detail"><div class="post__meta"><em class="post__category">Category</em><span class="time">5 min ago</span></div><h3><a href="#">Unveiling the Power of Rudraksha Beads</a></h3><div class="post__excerpt"><p>Discover the incredible benefits of wearing Rudraksha beads.</p></div></div><div class="post__action"><a href="#" class="btn btn__primary btn--outline">read more</a></div></article></div></section></div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DVBwzHlU.mjs.map
