<script setup lang="ts">
    import Brand from '~/components/brand.vue'

    const isMenuActive = ref(false)
    const { status } = useAuth()

    const toggleMenu = () => {
        isMenuActive.value = !isMenuActive.value
    }

    watch(isMenuActive, () => {
        if (isMenuActive.value) {
            document.body.style.overflow = 'hidden'
            document.body.classList.add('nav--active')
        } else {
            document.body.style.overflow = ''
            document.body.classList.remove('nav--active')
        }
    })
</script>

<template>
    <header id="header">
        <div class="container container--lg">
            <a href="#" class="nav__opener" @click.prevent="toggleMenu">
                <span class="icon-add"></span>
                <span class="icon-menu"></span>
            </a>
            <Brand />
            <nav id="nav">
                <ul class="main__menu">
                    <li><a href="#">Rudraksha</a></li>
                    <li><a href="#">Custom Order</a></li>
                    <li><a href="#">Blog</a></li>
                </ul>
                <div class="nav__drop">
                    <a href="#" class="nav__opener" @click.prevent="toggleMenu"><span class="icon-add"></span></a>
                    <strong class="greetings">
                        <span>Heya!</span>
                        Welcome to Himalayan Beads
                    </strong>
                    <NuxtLink to="/register" class="link" v-if="status == 'unauthenticated'">sign in</NuxtLink>
                    <NuxtLink to="/dashboard" class="link" v-else>dashboard</NuxtLink>
                    <ul class="secondary__menu">
                        <li><a href="#">Track order</a></li>
                        <li><a href="#">HB Perks</a></li>
                        <li>
                            <span class="text">More on HB</span>
                        </li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Sell on HB</a></li>
                        <li><a href="#">Advertise on HB</a></li>
                        <li><a href="#">Terms</a></li>
                    </ul>
                </div>
                <Dropdown class="language">
                    <template v-slot:opener="{ clickHandler }">
                        <a href="#" class="dropdown__opener" @click.prevent="clickHandler">
                            <img src="/images/flag-us.png" alt="us-en">
                            <span class="text">English</span>
                        </a>
                    </template>
                    <ul class="language__menu">
                        <li>
                            <a href="#">
                                <img src="/images/flag-us.png" alt="us-en">
                                <span class="text">English</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="/images/flag-us.png" alt="us-en">
                                <span class="text">Nepali</span>
                            </a>
                        </li>
                    </ul>
                </Dropdown>
                <form action="#" class="search__form">
                    <fieldset class="fieldset">
                        <div class="form__group">
                            <label for="sf__search">Search</label>
                            <input type="search" name="search" id="sf__search" placeholder="Search">
                        </div>
                        <button type="submit"><span class="icon-search"></span></button>
                    </fieldset>
                </form>
                <div class="holder">
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
                                    <a class="btn btn__primary btn--outline btn--xs" href="#"><span
                                            class="icon-add"></span>
                                        remove</a>
                                </div>
                            </div>
                            <div class="product__item">
                                <figure class="product__item__image"><img src="/images/product02.png"
                                        alt="product image">
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
                    <Dropdown class="cart cart--notification">
                        <template v-slot:opener="{ clickHandler }">
                            <a href="#" class="dropdown__opener" @click.prevent="clickHandler">
                                <span class="icon-cart"></span>
                            </a>
                        </template>
                        <div class="product__item__list product__item__list--list">
                            <div class="product__item">
                                <figure class="product__item__image"><img src="/images/product01.png"
                                        alt="product image">
                                </figure>
                                <div class="product__item__detail">
                                    <h3 class="h6"><a href="#">One Mukhi Rudraksha</a></h3>
                                    <em class="product__category">(1 face rudraksha)</em>
                                    <em class="product__price">$ 200</em>
                                </div>
                                <div class="product__item__action">
                                    <a class="btn btn__primary btn--outline btn--xs" href="#"><span
                                            class="icon-add"></span>
                                        remove</a>
                                </div>
                            </div>
                            <div class="product__item">
                                <figure class="product__item__image"><img src="/images/product02.png"
                                        alt="product image">
                                </figure>
                                <div class="product__item__detail">
                                    <h3 class="h6"><a href="#">Combination of (7, 8 & 12) Mukhi</a></h3>
                                    <em class="product__category">Rudraksha</em>
                                    <em class="product__price">$ 200</em>
                                </div>
                                <div class="product__item__action">
                                    <a class="btn btn__primary btn--outline btn--xs" href="#"><span
                                            class="icon-add"></span>
                                        remove</a>
                                </div>
                            </div>
                        </div>
                    </Dropdown>
                </div>
            </nav>
        </div>
    </header>
</template>