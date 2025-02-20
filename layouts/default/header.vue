<script setup lang="ts">
    import Brand from '~/components/brand.vue'
    import Cart from './_partials/cart/index.vue'
    import Wishlist from './_partials/wishlist.vue'

    const isMenuActive = ref(false)
    const { status, signOut } = useAuth()

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
                    <template v-if="status == 'unauthenticated'">
                        <NuxtLink to="/login" class="link">sign in</NuxtLink>
                        <NuxtLink to="/register" class="link">sign up</NuxtLink>
                    </template>
                    <template v-else>
                        <NuxtLink to="/dashboard" class="link">dashboard</NuxtLink>
                        <a href="#" class="link" @click.prevent="() => { signOut() }">logout</a>
                    </template>
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
                <!-- <Dropdown direction="right" class="language">
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
                </Dropdown> -->
                <!-- <form action="#" class="search__form">
                    <fieldset class="fieldset">
                        <div class="form__group">
                            <label for="sf__search">Search</label>
                            <input type="search" name="search" id="sf__search" placeholder="Search">
                        </div>
                        <button type="submit"><span class="icon-search"></span></button>
                    </fieldset>
                </form> -->
                <div class="holder">
                    <!-- <Wishlist /> -->
                    <Cart />
                </div>
            </nav>
        </div>
    </header>
</template>