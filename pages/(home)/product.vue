<script setup lang="ts">
    import { useProductStore } from '~/store/product'
    import ProductItem from './productItem.vue'

    const { productList } = storeToRefs(useProductStore())
</script>

<template>
    <section class="product__section">
        <div class="container container--lg">
            <header class="product__section__header">
                <h2>Featured This Week: Discover Our Best Rudraksha Collection</h2>
            </header>
            <div class="product__item__list product__item__list--grid">
                <ProductItem class="product__item" v-for="product in productList" :product="product" />
                <!-- <div class="product__item">
                    <figure class="product__item__image"><img src="/images/product02.png" alt="product image">
                    </figure>
                    <div class="product__item__detail">
                        <h3 class="h6"><a href="#">Combination of (7, 8 & 12) Mukhi</a></h3>
                        <em class="product__category">Rudraksha</em>
                        <em class="product__price">$ 200</em>
                    </div>
                    <div class="product__item__action">
                        <a class="btn btn--xs btn__primary btn--outline" href="#"><span class="icon-add"></span> Add
                            to
                            cart</a>
                    </div>
                </div>
                <div class="product__item">
                    <figure class="product__item__image"><img src="/images/product01.png" alt="product image">
                    </figure>
                    <div class="product__item__detail">
                        <h3 class="h6"><a href="#">One Mukhi Rudraksha</a></h3>
                        <em class="product__category">(1 face rudraksha)</em>
                        <em class="product__price">$ 200</em>
                    </div>
                    <div class="product__item__action">
                        <a class="btn btn--xs btn__primary btn--outline" href="#"><span class="icon-add"></span> Add
                            to
                            cart</a>
                    </div>
                </div>
                <div class="product__item">
                    <figure class="product__item__image"><img src="/images/product03.png" alt="product image">
                    </figure>
                    <div class="product__item__detail">
                        <h3 class="h6"><a href="#">Rudraksha mala</a></h3>
                        <em class="product__category">( 3 Mukhi & 5 Mukhi )</em>
                        <em class="product__price">$ 200</em>
                    </div>
                    <div class="product__item__action">
                        <a class="btn btn--xs btn__primary btn--outline" href="#"><span class="icon-add"></span> Add
                            to
                            cart</a>
                    </div>
                </div>
                <div class="product__item">
                    <figure class="product__item__image"><img src="/images/product02.png" alt="product image">
                    </figure>
                    <div class="product__item__detail">
                        <h3 class="h6"><a href="#">Combination of (7, 8 & 12) Mukhi</a></h3>
                        <em class="product__category">Rudraksha</em>
                        <em class="product__price">$ 200</em>
                    </div>
                    <div class="product__item__action">
                        <a class="btn btn--xs btn__primary btn--outline" href="#"><span class="icon-add"></span> Add
                            to
                            cart</a>
                    </div>
                </div>
                <div class="product__item">
                    <figure class="product__item__image"><img src="/images/product01.png" alt="product image">
                    </figure>
                    <div class="product__item__detail">
                        <h3 class="h6"><a href="#">One Mukhi Rudraksha</a></h3>
                        <em class="product__category">(1 face rudraksha)</em>
                        <em class="product__price">$ 200</em>
                    </div>
                    <div class="product__item__action">
                        <a class="btn btn--xs btn__primary btn--outline" href="#"><span class="icon-add"></span> Add
                            to
                            cart</a>
                    </div>
                </div>
                <div class="product__item product__item--promotion">
                    <figure class="product__item__image"><img src="/images/product04.png" alt="product image">
                    </figure>
                    <div class="product__item__detail">
                        <h3><a href="#">Promotion Block Banner</a></h3>
                        <span class="tag">Best Seller or Sale Offer</span>
                    </div>
                </div>
                <div class="product__item">
                    <figure class="product__item__image"><img src="/images/product03.png" alt="product image">
                    </figure>
                    <div class="product__item__detail">
                        <h3 class="h6"><a href="#">Rudraksha mala</a></h3>
                        <em class="product__category">( 3 Mukhi &amp; 5 Mukhi )</em>
                        <em class="product__price">$ 200</em>
                    </div>
                    <div class="product__item__action">
                        <a class="btn btn--xs btn__primary btn--outline" href="#"><span class="icon-add"></span> Add
                            to
                            cart</a>
                    </div>
                </div>
                <div class="product__item">
                    <figure class="product__item__image"><img src="/images/product01.png" alt="product image">
                    </figure>
                    <div class="product__item__detail">
                        <h3 class="h6"><a href="#">One Mukhi Rudraksha</a></h3>
                        <em class="product__category">(1 face rudraksha)</em>
                        <em class="product__price">$ 200</em>
                    </div>
                    <div class="product__item__action">
                        <a class="btn btn--xs btn__primary btn--outline" href="#"><span class="icon-add"></span> Add
                            to
                            cart</a>
                    </div>
                </div>
                <div class="product__item">
                    <figure class="product__item__image"><img src="/images/product02.png" alt="product image">
                    </figure>
                    <div class="product__item__detail">
                        <h3 class="h6"><a href="#">Combination of (7, 8 &amp; 12) Mukhi</a></h3>
                        <em class="product__category">Rudraksha</em>
                        <em class="product__price">$ 200</em>
                    </div>
                    <div class="product__item__action">
                        <a class="btn btn--xs btn__primary btn--outline" href="#"><span class="icon-add"></span> Add
                            to
                            cart</a>
                    </div>
                </div>
                <div class="product__item">
                    <figure class="product__item__image"><img src="/images/product01.png" alt="product image">
                    </figure>
                    <div class="product__item__detail">
                        <h3 class="h6"><a href="#">One Mukhi Rudraksha</a></h3>
                        <em class="product__category">(1 face rudraksha)</em>
                        <em class="product__price">$ 200</em>
                    </div>
                    <div class="product__item__action">
                        <a class="btn btn--xs btn__primary btn--outline" href="#"><span class="icon-add"></span> Add
                            to
                            cart</a>
                    </div>
                </div> -->
            </div>
        </div>
    </section>
</template>