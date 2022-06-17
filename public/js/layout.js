(function($) {

    //init theme
    var dark = localStorage.getItem('dark');
    var headerFixed = localStorage.getItem('headerFixed');
    var footerFixed = localStorage.getItem('footerFixed');
    var smallBody = localStorage.getItem('smallBody');
    var smallNavbar = localStorage.getItem('smallNavbar');
    var smallBrand = localStorage.getItem('smallBrand');
    var smallSidebar = localStorage.getItem('smallSidebar');
    var smallFooter = localStorage.getItem('smallFooter');
    var sidebarCollapse = localStorage.getItem('sidebarCollapse');

    if (dark == "true") {
        $('body').addClass('dark-mode')
        $('nav.main-header').removeClass('navbar-light')
        $('nav.main-header').addClass('navbar-dark')
        $('aside.main-sidebar').removeClass('sidebar-light-primary')
        $('aside.main-sidebar').addClass('sidebar-dark-primary')
        $('aside.control-sidebar').removeClass('control-sidebar-light')
        $('aside.control-sidebar').addClass('control-sidebar-dark')
        $("#topLogo").attr("href", "/icons/proximus-logo.png");
        $("#logo").attr("src", "/icons/proximus-logo.png");
    } else {
        $('body').removeClass('dark-mode')
        $('nav.main-header').removeClass('navbar-dark')
        $('nav.main-header').addClass('navbar-light')
        $('aside.main-sidebar').removeClass('sidebar-dark-primary')
        $('aside.main-sidebar').addClass('sidebar-light-primary')
        $('aside.control-sidebar').removeClass('control-sidebar-dark')
        $('aside.control-sidebar').addClass('control-sidebar-light')
        $("#topLogo").attr("href", "/icons/proximus-logo-dark.png");
        $("#logo").attr("src", "/icons/proximus-logo-dark.png");
    }

    if (headerFixed == "true") {
        $('body').addClass('layout-navbar-fixed')
    } else {
        $('body').removeClass('layout-navbar-fixed')
    }

    if (footerFixed == "true") {
        $('body').addClass('layout-footer-fixed')
    } else {
        $('body').removeClass('layout-footer-fixed')
    }

    if (smallBody == "true") {
        $('body').addClass('text-sm');
    } else {
        $('body').removeClass('text-sm');
    }

    if (smallNavbar == "true") {
        $('.main-header').addClass('text-sm')
    } else {
        $('.main-header').removeClass('text-sm')
    }

    if (smallBrand == "true") {
        $('.brand-link').addClass('text-sm')
    } else {
        $('.brand-link').removeClass('text-sm')
    }

    if (smallSidebar == "true") {
        $('.nav-sidebar').addClass('text-sm')
    } else {
        $('.nav-sidebar').removeClass('text-sm')
    }

    if (smallFooter == "true") {
        $('.main-footer').addClass('text-sm')
    } else {
        $('.main-footer').removeClass('text-sm')
    }

    if (sidebarCollapse == "true") {
        $('body').addClass('sidebar-collapse')
    } else {
        $('body').removeClass('sidebar-collapse')
    }

    //toast configuration
    toastr.options = {
        "positionClass": "toast-bottom-right"
    };

    //create right sidebar
    'use strict'

    var $sidebar = $('.control-sidebar')
    var $container = $('<div />', {
        class: 'p-3 control-sidebar-content'
    })

    $sidebar.append($container)

    // Checkboxes
    $container.append(
        '<h5>Theme Configuration</h5><hr class="mb-2"/>'
    )

    var $dark_mode_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('dark-mode'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            localStorage.setItem('dark', true);
            $('body').addClass('dark-mode')
            $('nav.main-header').removeClass('navbar-light')
            $('nav.main-header').addClass('navbar-dark')
            $('aside.main-sidebar').removeClass('sidebar-light-primary')
            $('aside.main-sidebar').addClass('sidebar-dark-primary')
            $('aside.control-sidebar').removeClass('control-sidebar-light')
            $('aside.control-sidebar').addClass('control-sidebar-dark')
            $("#topLogo").attr("href", "/icons/proximus-logo.png");
            $("#logo").attr("src", "/icons/proximus-logo.png");
        } else {
            localStorage.setItem('dark', false);
            $('body').removeClass('dark-mode')
            $('nav.main-header').removeClass('navbar-dark')
            $('nav.main-header').addClass('navbar-light')
            $('aside.main-sidebar').removeClass('sidebar-dark-primary')
            $('aside.main-sidebar').addClass('sidebar-light-primary')
            $('aside.control-sidebar').removeClass('control-sidebar-dark')
            $('aside.control-sidebar').addClass('control-sidebar-light')
            $("#topLogo").attr("href", "/icons/proximus-logo-dark.png");
            $("#logo").attr("src", "/icons/proximus-logo-dark.png");
        }
        $("#control-sidebar-btn").click();
    })
    var $dark_mode_container = $('<div />', { class: 'mb-4' }).append($dark_mode_checkbox).append('<span>Dark Mode</span>')
    $container.append($dark_mode_container)

    $container.append('<h6>Header Options</h6>')
    var $header_fixed_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('layout-navbar-fixed'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            localStorage.setItem('headerFixed', true);
            $('body').addClass('layout-navbar-fixed')
        } else {
            localStorage.setItem('headerFixed', false);
            $('body').removeClass('layout-navbar-fixed')
        }
        $("#control-sidebar-btn").click();
    })
    var $header_fixed_container = $('<div />', { class: 'mb-1' }).append($header_fixed_checkbox).append('<span>Fixed</span>')
    $container.append($header_fixed_container)

    $container.append('<h6>Footer Options</h6>')
    var $footer_fixed_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('layout-footer-fixed'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            localStorage.setItem('footerFixed', true);
            $('body').addClass('layout-footer-fixed')
        } else {
            localStorage.setItem('footerFixed', false);
            $('body').removeClass('layout-footer-fixed')
        }
        $("#control-sidebar-btn").click();
    })
    var $footer_fixed_container = $('<div />', { class: 'mb-4' }).append($footer_fixed_checkbox).append('<span>Fixed</span>')
    $container.append($footer_fixed_container)

    $container.append('<h6>Small Text Options</h6>')

    var $text_sm_body_checkbox = $('<input />', {
        type: 'checkbox',
        value: 1,
        checked: $('body').hasClass('text-sm'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            localStorage.setItem('smallBody', true);
            $("#smallNavbar").attr("disabled", true);
            $("#smallBrand").attr("disabled", true);
            $("#smallSidebar").attr("disabled", true);
            $("#smallFooter").attr("disabled", true);
            $('body').addClass('text-sm')
        } else {
            localStorage.setItem('smallBody', false);
            $("#smallNavbar").attr("disabled", false);
            $("#smallBrand").attr("disabled", false);
            $("#smallSidebar").attr("disabled", false);
            $("#smallFooter").attr("disabled", false);
            $('body').removeClass('text-sm')
        }
        $("#control-sidebar-btn").click();
    })
    var $text_sm_body_container = $('<div />', { class: 'mb-1' }).append($text_sm_body_checkbox).append('<span>Body</span>')
    $container.append($text_sm_body_container)

    var $text_sm_header_checkbox = $('<input />', {
        type: 'checkbox',
        id: 'smallNavbar',
        value: 1,
        checked: $('.main-header').hasClass('text-sm'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            localStorage.setItem('smallNavbar', true);
            $('.main-header').addClass('text-sm')
        } else {
            localStorage.setItem('smallNavbar', false);
            $('.main-header').removeClass('text-sm')
        }
        $("#control-sidebar-btn").click();
    })
    var $text_sm_header_container = $('<div />', { class: 'mb-1' }).append($text_sm_header_checkbox).append('<span>Navigation bar</span>')
    $container.append($text_sm_header_container)

    var $text_sm_brand_checkbox = $('<input />', {
        type: 'checkbox',
        id: 'smallBrand',
        value: 1,
        checked: $('.brand-link').hasClass('text-sm'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            localStorage.setItem('smallBrand', true);
            $('.brand-link').addClass('text-sm')
        } else {
            localStorage.setItem('smallBrand', false);
            $('.brand-link').removeClass('text-sm')
        }
        $("#control-sidebar-btn").click();
    })
    var $text_sm_brand_container = $('<div />', { class: 'mb-1' }).append($text_sm_brand_checkbox).append('<span>Brand</span>')
    $container.append($text_sm_brand_container)

    var $text_sm_sidebar_checkbox = $('<input />', {
        type: 'checkbox',
        id: 'smallSidebar',
        value: 1,
        checked: $('.nav-sidebar').hasClass('text-sm'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            localStorage.setItem('smallSidebar', true);
            $('.nav-sidebar').addClass('text-sm')
        } else {
            localStorage.setItem('smallSidebar', false);
            $('.nav-sidebar').removeClass('text-sm')
        }
        $("#control-sidebar-btn").click();
    })
    var $text_sm_sidebar_container = $('<div />', { class: 'mb-1' }).append($text_sm_sidebar_checkbox).append('<span>Sidebar Navigation</span>')
    $container.append($text_sm_sidebar_container)

    var $text_sm_footer_checkbox = $('<input />', {
        type: 'checkbox',
        id: 'smallFooter',
        value: 1,
        checked: $('.main-footer').hasClass('text-sm'),
        class: 'mr-1'
    }).on('click', function() {
        if ($(this).is(':checked')) {
            localStorage.setItem('smallFooter', true);
            $('.main-footer').addClass('text-sm')
        } else {
            localStorage.setItem('smallFooter', false);
            $('.main-footer').removeClass('text-sm')
        }
        $("#control-sidebar-btn").click();
    })
    var $text_sm_footer_container = $('<div />', { class: 'mb-4' }).append($text_sm_footer_checkbox).append('<span>Footer</span>')
    $container.append($text_sm_footer_container)

    $("#sidebar-btn").on("click", function() {
        if ($('body').hasClass('sidebar-collapse')) {
            localStorage.setItem('sidebarCollapse', false);
        } else {
            localStorage.setItem('sidebarCollapse', true);
        }
    });

    //init checkbox
    if (smallBody == "true") {
        $("#smallNavbar").attr("disabled", true);
        $("#smallBrand").attr("disabled", true);
        $("#smallSidebar").attr("disabled", true);
        $("#smallFooter").attr("disabled", true);
    } else {
        $("#smallNavbar").attr("disabled", false);
        $("#smallBrand").attr("disabled", false);
        $("#smallSidebar").attr("disabled", false);
        $("#smallFooter").attr("disabled", false);
    }

})(jQuery)