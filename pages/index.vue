<script lang="ts" setup>
    import Accordion from '@/components/accordion/index.vue'
    import AccordionItem from '~/components/accordion/AccordionItem.vue'

    import ProductSection from './_home/product.vue'

    useHead({
        title: 'Home page'
    })
</script>

<template>
    <main id="main">
        <section class="main__banner">
            <div class="main__banner__bg">
                <img src="/images/img01.png" alt="image description">
            </div>
            <div class="main__banner__caption">
                <div class="container">
                    <div class="holder">
                        <h1>Discover the beauty of Himalayan Beads.</h1>
                        <p>Experience the spiritual benefits of our authentic rudraksha products.</p>
                        <div class="btn__group">
                            <a href="#" class="btn btn__primary">explore all products</a>
                            <a href="#" class="btn btn__light">learn more</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <a href="#" class="flash__message">
            <div class="container">
                <span class="icon-bolt"></span>
                <span class="text">SIGN UP Now & GET 15% OFF</span>
                <span class="icon-arrow-d"></span>
            </div>
        </a>
        <section class="services__section">
            <div class="container">
                <div class="row services__list">
                    <div class="col-tablet-3 services__item">
                        <div class="icon__holder"></div>
                        <h3 class="h6">Shop Premium Quality Products</h3>
                        <p>Lörem ipsum grönt elcertifikat pabysade om valstuga att gensax spepuck i bloggosfär. </p>
                    </div>
                    <div class="col-tablet-3 services__item">
                        <div class="icon__holder"></div>
                        <h3 class="h6">Energized Rudraksha</h3>
                        <p>Lörem ipsum grönt elcertifikat pabysade om valstuga att gensax spepuck i bloggosfär. </p>
                    </div>
                    <div class="col-tablet-3 services__item">
                        <div class="icon__holder"></div>
                        <h3 class="h6">Effortless Shopping, Easy Returns</h3>
                        <p>Lörem ipsum grönt elcertifikat pabysade om valstuga att gensax spepuck i bloggosfär. </p>
                    </div>
                    <div class="col-tablet-3 services__item">
                        <div class="icon__holder"></div>
                        <h3 class="h6">Our Speedy Shipping Promise</h3>
                        <p>Lörem ipsum grönt elcertifikat pabysade om valstuga att gensax spepuck i bloggosfär. </p>
                    </div>
                </div>
            </div>
        </section>
        <ProductSection />
        <div class="container container--lg">
            <div class="row">
                <div class="col-tablet-6">
                    <div class="product__item product__item--promotion">
                        <figure class="product__item__image"><img src="/images/product05.png" alt="product image">
                        </figure>
                        <div class="product__item__detail">
                            <h3 class="h6"><a href="#">Consultation Block Banner</a></h3>
                            <span class="tag">Astrology</span>
                            <!-- <strong>Purpose Method</strong> -->
                        </div>
                    </div>
                </div>
                <div class="col-tablet-6">
                    <div class="product__item product__item--promotion product__item--promotion--centered">
                        <figure class="product__item__image"><img src="/images/product06.png" alt="product image">
                        </figure>
                        <div class="product__item__detail">
                            <h3 class="h6"><a href="#">Nirakar Japa mala( Rare variety) Collection Block Banner</a></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-tablet-6">
                    <div class="faq__section">
                        <h2>Mostly Customer Ask FAQ’s</h2>
                        <Accordion>
                            <AccordionItem title="What is Rudraksha used for?">
                                <p>Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi
                                    commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi
                                    commodo.</p>
                            </AccordionItem>
                            <AccordionItem title="Who should wear Rudraksha?" active>
                                <p>Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi
                                    commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi
                                    commodo.</p>
                            </AccordionItem>
                            <AccordionItem title="How to check whether Rudraksha is original?">
                                <p>Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi
                                    commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi
                                    commodo.</p>
                            </AccordionItem>
                            <AccordionItem title="Why is Nepali Rudraksha so expensive?">
                                <p>Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi
                                    commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi
                                    commodo.</p>
                            </AccordionItem>
                            <AccordionItem title="What are the qualities of real Rudraksha?">
                                <p>Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi
                                    commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi
                                    commodo.</p>
                            </AccordionItem>
                            <AccordionItem title="Still have your questions?">
                                <p>Lorem ipsum dolor sit amet consectetur. Sed risus vitae dui quisque dolor neque morbi
                                    commodo. Lorem ipsum dolor sit amet ed risus vitae dui quisque dolor neque morbi
                                    commodo.</p>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div class="col-tablet-6">
                    <section class="testimonial__section">
                        <h2>Genuine Reviews from Our Satisfied Customers</h2>
                    </section>
                </div>
            </div>
        </div>
        <div class="info__section">
            <div class="row align--center">
                <div class="col-tablet-5">
                    <div class="holder">
                        <h2>Buy Premium Rudraksha Beads Now! </h2>
                        <em>Experience Their Powerful Benefits</em>
                        <ul class="check__list">
                            <li>Authentic Rudraksha Beads for Spiritual Awakening</li>
                            <li>Enhance Your Meditation Practice with Sacred Rudraksha Beads</li>
                            <li>Find Inner Peace and Balance with our Rudraksha Collection</li>
                        </ul>
                        <a href="#" class="btn btn__primary">Learn More Rudraksha</a>
                    </div>
                </div>
                <div class="col-tablet-7">
                    <a href="#" class="video__block">
                        <img src="/images/img02.png" alt="imaeg description">
                    </a>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-tablet-6">
                    <a href="#" class="support support--success">
                        <div class="icon__holder">
                            <span class="icon-shipping"></span>
                        </div>
                        <div class="support__text">
                            <h3>Worldwide Fast Shipping</h3>
                            <p>Get free access to unique experiences and hottest brands on the internet tried & tested
                                by the LBB crew</p>
                        </div>
                    </a>
                </div>
                <div class="col-tablet-6">
                    <a href="#" class="support support--warning">
                        <div class="icon__holder">
                            <span class="icon-support"></span>
                        </div>
                        <div class="support__text">
                            <h3>Need help? We got you</h3>
                            <p>You can find more information on the FAQs. You can also contact us for any questions you
                                might have.</p>
                        </div>
                    </a>
                </div>
            </div>
            <section class="blog__section">
                <div class="blog__section__header">
                    <h2>Explore our informative and engaging blog posts</h2>
                </div>
                <div class="row post__list">
                    <article class="col-tablet-4 post">
                        <figure class="post__image">
                            <img src="/images/img03.png" alt="image description">
                        </figure>
                        <div class="post__detail">
                            <div class="post__meta">
                                <em class="post__category">Category</em>
                                <span class="time">5 min ago</span>
                            </div>
                            <h3><a href="#">Unveiling the Power of Rudraksha Beads</a></h3>
                            <div class="post__excerpt">
                                <p>Discover the incredible benefits of wearing Rudraksha beads.</p>
                            </div>
                        </div>
                        <div class="post__action">
                            <a href="#" class="btn btn__primary btn--outline">read more</a>
                        </div>
                    </article>
                    <article class="col-tablet-4 post">
                        <figure class="post__image">
                            <img src="/images/img04.png" alt="image description">
                        </figure>
                        <div class="post__detail">
                            <div class="post__meta">
                                <em class="post__category">Category</em>
                                <span class="time">5 min ago</span>
                            </div>
                            <h3><a href="#">Unveiling the Power of Rudraksha Beads</a></h3>
                            <div class="post__excerpt">
                                <p>Discover the incredible benefits of wearing Rudraksha beads.</p>
                            </div>
                        </div>
                        <div class="post__action">
                            <a href="#" class="btn btn__primary btn--outline">read more</a>
                        </div>
                    </article>
                    <article class="col-tablet-4 post">
                        <figure class="post__image">
                            <img src="/images/img03.png" alt="image description">
                        </figure>
                        <div class="post__detail">
                            <div class="post__meta">
                                <em class="post__category">Category</em>
                                <span class="time">5 min ago</span>
                            </div>
                            <h3><a href="#">Unveiling the Power of Rudraksha Beads</a></h3>
                            <div class="post__excerpt">
                                <p>Discover the incredible benefits of wearing Rudraksha beads.</p>
                            </div>
                        </div>
                        <div class="post__action">
                            <a href="#" class="btn btn__primary btn--outline">read more</a>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    </main>
</template>