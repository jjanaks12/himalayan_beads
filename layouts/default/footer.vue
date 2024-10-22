<template>
    <footer id="footer">
        <div class="container">
            <div class="footer__bar">
                <Dropdown as="ul" class="language">
                    <template v-slot:opener="{ clickHandler }">
                        <a href="#" class="dropdown__opener" @click.prevent="clickHandler">
                            <img src="/images/flag-us.png" alt="us-en">
                            <span class="text">English</span>
                        </a>
                    </template>
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
                </Dropdown>
                <ul class="footer__links">
                    <li><a href="#"><span class="icon-star"></span> Premium Qulity</a></li>
                    <li><a href="#"><span class="icon-check-o"></span> Fast Delivery</a></li>
                    <li><a href="#"><span class="icon-repeat"></span> Easy Exchange</a></li>
                    <li><a href="#"><span class="icon-lock"></span> Secure Payment</a></li>
                </ul>
            </div>
            <div class="footer__navigation">
                <div class="footer__block">
                    <div class="logo">
                        <a href="#">
                            <img src="/images/logo.svg" alt="Himalayan Beads">
                        </a>
                    </div>
                    <nav class="footer__nav">
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Testimonials</a></li>
                            <li><a href="#">Our Blogs</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">Exchange/Return Order</a></li>
                            <li><a href="#">Track Order</a></li>
                            <li><a href="#">Customer Support</a></li>
                            <li><a href="#">Your Account</a></li>
                            <li><a href="#">FAQ’s</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">Free Consult</a></li>
                            <li><a href="#">Custom Order</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="newsletter">
                    <h3>Newsletter</h3>
                    <div class="text">
                        <p><a href="#">Sign up</a> for getting the latest news from Himalayan Beads, including exclusive
                            online
                            pre-launches and new collections.</p>
                    </div>
                </div>
                <div class="contact__info">
                    <h3>Contact Information</h3>
                    <address>
                        123 Himalayan Street, Kathmandu, Nepal <br>
                        <a href="mailto:info@himalayanbeads.com">info@himalayanbeads.com</a> <br>
                        <a href="tel:+977-123456789">+977-123456789</a>
                    </address>
                </div>
            </div>
            <div class="footer__note">
                <span class="copyright">&copy; 2024 Himalayan Beads Pvt. Ltd.</span>
                <div class="holder">
                    <div class="logo__list">
                        <a href="#"><img src="/images/logo01.png" alt="image description"></a>
                    </div>
                    <span class="created_by">Created by <a href="#">Janak Shrestha</a></span>
                </div>
            </div>
        </div>
    </footer>
</template>