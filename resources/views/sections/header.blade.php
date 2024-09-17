<header id="header">
    <div class="header__holder">
        <a href="#" class="nav__opener"><span></span></a>
        <div class="logo">
            {{ the_custom_logo() }}
        </div>
    </div>
    @if (has_nav_menu('primary_navigation'))
    <nav id="nav" aria-label="{{ wp_get_nav_menu_name('primary_navigation') }}">
        {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'main__menu', 'echo' => false]) !!}
    </nav>
        @php(dynamic_sidebar('sidebar-header'))
    @endif
</header>
