<script setup lang="ts">
</script>

<template>
    <Dropdown class="wishlist wishlist--notification">
        <template v-slot:opener="{ clickHandler }">
            <a href="#" class="dropdown__opener" @click.prevent="clickHandler">
                <span class="icon-whishlist"></span>
            </a>
        </template>
        <div class="product__item__list product__item__list--list">
            <div class="product__item">
                <figure class="product__item__image">
                    <img src="/images/product01.png" alt="product image">
                </figure>
                <div class="product__item__detail">
                    <h3><a href="#">One Mukhi Rudraksha</a></h3>
                    <em class="product__category">(1 face rudraksha)</em>
                    <em class="product__price">$ 200</em>
                </div>
                <div class="product__item__action">
                    <a class="btn btn__primary btn--outline btn--xs" href="#"><span class="icon-add"></span>
                        remove</a>
                </div>
            </div>
            <div class="product__item">
                <figure class="product__item__image"><img src="/images/product02.png" alt="product image">
                </figure>
                <div class="product__item__detail">
                    <h3><a href="#">Combination of (7, 8 & 12) Mukhi</a></h3>
                    <em class="product__category">Rudraksha</em>
                    <em class="product__price">$ 200</em>
                </div>
                <div class="product__item__action">
                    <a class="btn btn__primary btn--outline btn--xs" href="#">
                        <span class="icon-add"></span>
                        remove
                    </a>
                </div>
            </div>
        </div>
    </Dropdown>
</template>