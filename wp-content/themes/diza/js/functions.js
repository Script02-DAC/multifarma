'use strict';

class StickyHeader {
  constructor() {
    let _this = this;

    this.$tbayHeader = jQuery('.tbay_header-template');
    this.$tbayHeaderMain = jQuery('.tbay_header-template .header-main');

    if (this.$tbayHeader.hasClass('main-sticky-header') && this.$tbayHeaderMain.length > 0) {
      this._initStickyHeader();
    }

    jQuery('.search-min-wrapper .btn-search-min').click(this._onClickSeachMin);
    jQuery('.tbay-search-form .overlay-box').click(this._onClickOverLayBox);
    this._intSearchOffcanvas;
    let sticky_header = jQuery('.element-sticky-header');

    if (sticky_header.length > 0) {
      _this._initELementStickyheader(sticky_header);
    }
  }

  _initStickyHeader() {
    var _this = this;

    var tbay_width = jQuery(window).width();

    var header_height = _this.$tbayHeader.outerHeight();

    var headerMain_height = _this.$tbayHeaderMain.outerHeight();

    var admin_height = jQuery('#wpadminbar').length > 0 ? jQuery('#wpadminbar').outerHeight() : 0;

    var sticky = _this.$tbayHeaderMain.offset().top;

    if (tbay_width >= 1024) {
      if (sticky == 0 || sticky == admin_height) {
        if (_this.$tbayHeader.hasClass('sticky-header')) return;

        _this._stickyHeaderOnDesktop(headerMain_height, sticky, admin_height);

        _this.$tbayHeaderMain.addClass('sticky-1');

        jQuery(window).scroll(function () {
          if (jQuery(this).scrollTop() > header_height) {
            _this.$tbayHeaderMain.addClass('sticky-box');
          } else {
            _this.$tbayHeaderMain.removeClass('sticky-box');
          }
        });
      } else {
        jQuery(window).scroll(function () {
          if (!_this.$tbayHeader.hasClass('main-sticky-header')) return;

          if (jQuery(this).scrollTop() > sticky - admin_height) {
            if (_this.$tbayHeader.hasClass('sticky-header')) return;

            _this._stickyHeaderOnDesktop(headerMain_height, sticky, admin_height);
          } else {
            _this.$tbayHeaderMain.css("top", 0).css("position", "relative").removeClass('sticky-header').parent().css('padding-top', 0);

            _this.$tbayHeaderMain.prev().css('margin-bottom', 0);
          }
        });
      }
    }
  }

  _stickyHeaderOnDesktop(headerMain_height, sticky, admin_height) {
    this.$tbayHeaderMain.addClass('sticky-header').css("top", admin_height).css("position", "fixed");

    if (sticky == 0 || sticky == admin_height) {
      this.$tbayHeaderMain.parent().css('padding-top', headerMain_height);
    } else {
      this.$tbayHeaderMain.prev().css('margin-bottom', headerMain_height);
    }
  }

  _onClickSeachMin() {
    jQuery('.tbay-search-form.tbay-search-min form').toggleClass('show');
    jQuery(this).toggleClass('active');
  }

  _onClickOverLayBox() {
    jQuery('.search-min-wrapper .btn-search-min').removeClass('active');
    jQuery('.tbay-search-form.tbay-search-min form').removeClass('show');
  }

  _intSearchOffcanvas() {
    if (jQuery('#tbay-offcanvas-main').length === 0) return;
    jQuery('[data-toggle="offcanvas-main-search"]').on('click', function () {
      jQuery('#wrapper-container').toggleClass('show');
      jQuery('#tbay-offcanvas-main').toggleClass('show');
    });
    var $box_totop = jQuery('#tbay-offcanvas-main, .search');
    jQuery(window).on("click.Bst", function (event) {
      if ($box_totop.has(event.target).length == 0 && !$box_totop.is(event.target)) {
        jQuery('#wrapper-container').removeClass('show');
        jQuery('#tbay-offcanvas-main').removeClass('show');
      }
    });
  }

  _initELementStickyheader(elements) {
    var el = elements.first();

    let _this = this;

    var scroll = false,
        sum = 0,
        prev_sum = 0;
    if (el.parents('.tbay_header-template').length === 0) return;
    var adminbar = jQuery('#wpadminbar').length > 0 ? jQuery('#wpadminbar').outerHeight() : 0,
        sticky_load = el.offset().top - jQuery(window).scrollTop() - adminbar,
        sticky = sticky_load;
    el.prevAll().each(function () {
      prev_sum += jQuery(this).outerHeight();
    });
    elements.each(function () {
      if (jQuery(this).parents('.element-sticky-header').length > 0) return;
      sum += jQuery(this).outerHeight();
    });

    _this._initELementStickyheaderContent(sticky_load, sticky, sum, prev_sum, elements, el, adminbar, scroll);

    jQuery(window).scroll(function () {
      scroll = true;
      if (jQuery(window).scrollTop() === 0) sticky = 0;

      _this._initELementStickyheaderContent(sticky_load, sticky, sum, prev_sum, elements, el, adminbar, scroll);
    });
  }

  _initELementStickyheaderContent(sticky_load, sticky, sum, prev_sum, elements, el, adminbar, scroll) {
    if (jQuery(window).scrollTop() < prev_sum && scroll || jQuery(window).scrollTop() === 0 && scroll) {
      if (el.parent().children().first().hasClass('element-sticky-header')) return;
      el.css('top', '');

      if (sticky === sticky_load || sticky === 0) {
        elements.last().next().css('padding-top', '');
      } else {
        el.prev().css('margin-bottom', '');
      }

      el.parent().css('padding-top', '');
      elements.each(function () {
        jQuery(this).removeClass("sticky");

        if (jQuery(this).prev('.element-sticky-header').length > 0) {
          jQuery(this).css('top', '');
        }
      });
    } else {
      if (jQuery(window).scrollTop() < prev_sum && !scroll) return;
      elements.each(function () {
        if (jQuery(this).parents('.element-sticky-header').length > 0) return;
        jQuery(this).addClass("sticky");

        if (jQuery(this).prevAll('.element-sticky-header').length > 0) {
          let total = 0;
          jQuery(this).prevAll('.element-sticky-header').each(function () {
            total += jQuery(this).outerHeight();
          });
          jQuery(this).css('top', total + adminbar);
        }
      });
      el.css('top', adminbar);

      if (sticky === sticky_load || sticky === 0) {
        el.addClass("sticky");
        el.parent().css('padding-top', sum);
      } else {
        el.prev().css('margin-bottom', sum);
      }
    }
  }

}

const TREE_VIEW_OPTION_MEGA_MENU = {
  animated: 300,
  collapsed: true,
  unique: true,
  persist: "location"
};
const TREE_VIEW_OPTION_MOBILE_MENU = {
  animated: 300,
  collapsed: true,
  unique: true,
  hover: false
};

class Mobile {
  constructor() {
    this._mobileMenu();

    this._SearchFocusActive();

    this._SearchOnClickSearchHeader();

    this._PopupLoginMobile();

    this._Select_change_form();

    this._FastClicker();

    this._topBarDevice();

    jQuery(window).scroll(() => {
      this._topBarDevice();
    });
  }

  _topBarDevice() {
    var scroll = jQuery(window).scrollTop();
    var objectSelect = jQuery(".topbar-device-mobile").height();
    var scrollmobile = jQuery(window).scrollTop();
    jQuery(".topbar-device-mobile").toggleClass("active", scroll <= objectSelect);
    jQuery("#tbay-mobile-menu").toggleClass("offsetop", scrollmobile == 0);
  }

  _mobileMenu() {
    jQuery('[data-toggle="offcanvas"], .btn-offcanvas').click(function () {
      jQuery('#wrapper-container').toggleClass('active');
      jQuery('#tbay-mobile-menu').toggleClass('active');
    });
    jQuery("#main-mobile-menu .caret").click(function () {
      jQuery("#main-mobile-menu .dropdown").removeClass('open');
      jQuery(event.target).parent().addClass('open');
    });
  }

  _SearchFocusActive() {
    let search_mobile = jQuery('.tbay-search-mobile .tbay-search');
    let search_cancel = jQuery('.tbay-search-mobile .button-search-cancel');
    search_mobile.focusin(function () {
      jQuery(search_mobile.parents('#tbay-mobile-menu-navbar')).addClass('search-mobile-focus');
      search_mobile.parent().find('.button-search-cancel').addClass('cancel-active');
    });
    search_cancel.on("click", function () {
      jQuery(search_cancel.parents('#tbay-mobile-menu-navbar')).removeClass('search-mobile-focus');
      search_cancel.removeClass('cancel-active');
    });
  }

  _SearchOnClickSearchHeader() {
    let search_mobile = jQuery('.search-device .search-icon');
    let search_cancel = jQuery('.search-device .button-search-cancel');
    search_mobile.on("click", function () {
      jQuery(search_mobile.parent()).addClass('active-search-mobile');
      jQuery(search_mobile.parents('.topbar-device-mobile')).addClass('active-search');
    });
    search_cancel.on("click", function () {
      jQuery(search_cancel.parents('.search-device')).removeClass('active-search-mobile');
      jQuery(search_mobile.parents('.topbar-device-mobile')).removeClass('active-search');
      search_cancel.removeClass('cancel-active');
    });
  }

  _PopupLoginMobile() {
    let popup_login_mobile = jQuery('.mmenu-account .popup-login a, .footer-device-mobile > .device-account > a.popup-login');
    popup_login_mobile.on("click", function () {
      let api = jQuery("#tbay-mobile-menu-navbar").data("mmenu");
      jQuery('#custom-login-wrapper').modal('show');
      jQuery(popup_login_mobile.parents('#tbay-mobile-menu-navbar')).removeClass('mm-menu_opened');
      api.close();
    });
  }

  _Select_change_form() {
    jQuery('.topbar-device-mobile > form select').on('change', function () {
      this.form.submit();
    });
  }

  _FastClicker() {
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
      }, false);
    }
  }

}

class AccountMenu {
  constructor() {
    this._slideToggleAccountMenu(".tbay-login");

    this._slideToggleAccountMenu(".topbar-mobile");

    this._tbayClickNotMyAccountMenu();
  }

  _tbayClickNotMyAccountMenu() {
    var $win_my_account = jQuery(window);
    var $box_my_account = jQuery('.tbay-login .dropdown .account-menu,.topbar-mobile .dropdown .account-menu,.tbay-login .dropdown .account-button,.topbar-mobile .dropdown .account-button');
    $win_my_account.on("click.Bst", function (event) {
      if ($box_my_account.has(event.target).length == 0 && !$box_my_account.is(event.target)) {
        jQuery(".tbay-login .dropdown .account-menu").slideUp(500);
        jQuery(".topbar-mobile .dropdown .account-menu").slideUp(500);
      }
    });
  }

  _slideToggleAccountMenu(parentSelector) {
    jQuery(parentSelector).find(".dropdown .account-button").click(function () {
      jQuery(parentSelector).find(".dropdown .account-menu").slideToggle(500);
    });
  }

}

class BackToTop {
  constructor() {
    this._init();
  }

  _init() {
    jQuery(window).scroll(function () {
      var isActive = jQuery(this).scrollTop() > 400;
      jQuery('.tbay-to-top').toggleClass('active', isActive);
      jQuery('.tbay-category-fixed').toggleClass('active', isActive);
    });
    jQuery('#back-to-top-mobile, #back-to-top').click(this._onClickBackToTop);
  }

  _onClickBackToTop() {
    jQuery('html, body').animate({
      scrollTop: '0px'
    }, 800);
  }

}

class CanvasMenu {
  constructor() {
    this._init();

    this._remove_click_Outside();

    this._initCanvasMenuSidebar();

    this._initCanvasMenu();
  }

  _init() {
    jQuery("#tbay-offcanvas-main .btn-toggle-canvas").on("click", function () {
      jQuery('#wrapper-container').removeClass('active');
    });
    jQuery("#main-menu-offcanvas .caret").click(function () {
      jQuery("#main-menu-offcanvas .dropdown").removeClass('open');
      jQuery(this).parent().addClass('open');
      return false;
    });
    jQuery('[data-toggle="offcanvas-main"]').on('click', function () {
      jQuery('#wrapper-container').toggleClass('active');
      jQuery('#tbay-offcanvas-main').toggleClass('active');
    });
  }

  _remove_click_Outside() {
    let win = jQuery(window);
    win.on("click.Bst,click touchstart tap", function (event) {
      let box_popup = jQuery('#tbay-offcanvas-main, .btn-toggle-canvas');

      if (box_popup.has(event.target).length == 0 && !box_popup.is(event.target)) {
        jQuery('#wrapper-container').removeClass('active');
        return;
      }
    });
  }

  _initCanvasMenuSidebar() {
    jQuery(document).on('click', '.canvas-menu-sidebar .btn-canvas-menu', function () {
      jQuery('body').toggleClass('canvas-menu-active');
    });
    jQuery(document).on('click', '.close-canvas-menu, .bg-close-canvas-menu', function () {
      jQuery('body').removeClass('canvas-menu-active');
    });
  }

  _initCanvasMenu() {
    jQuery(".element-menu-canvas").each(function () {
      jQuery(this).find('.canvas-menu-btn-wrapper > a').on('click', function (event) {
        jQuery(this).parent().parent().addClass('open');
        event.stopPropagation();
      });
    });
    jQuery(document).on('click', '.canvas-overlay-wrapper', function (event) {
      jQuery(this).parent().removeClass('open');
      event.stopPropagation();
    });
  }

}

class FuncCommon {
  constructor() {
    this._progressAnimation();

    this._createWrapStart();

    jQuery('.mod-heading .widget-title > span').wrapStart();

    this._tbayActiveAdminBar();

    this._tbayResizeMegamenu();

    this._initHeaderCoverBG();

    this._initCanvasSearch();

    this._initTreeviewMenu();

    this._categoryMenu();

    this._initContentMinHeight();

    this._changeDefaultTimeago();

    jQuery(window).scroll(() => {
      this._tbayActiveAdminBar();
    });
    jQuery(window).on("resize", () => {
      this._tbayResizeMegamenu();
    });

    this._addAccordionLoginandCoupon();
  }

  _tbayActiveAdminBar() {
    var objectSelect = jQuery("#wpadminbar");

    if (objectSelect.length > 0) {
      jQuery("body").addClass("active-admin-bar");
    }
  }

  _createWrapStart() {
    jQuery.fn.wrapStart = function () {
      return this.each(function () {
        var $this = jQuery(this);
        var node = $this.contents().filter(function () {
          return this.nodeType == 3;
        }).first(),
            text = node.text().trim(),
            first = text.split(' ', 1).join(" ");
        if (!node.length) return;
        node[0].nodeValue = text.slice(first.length);
        node.before('<b>' + first + '</b>');
      });
    };
  }

  _progressAnimation() {
    jQuery("[data-progress-animation]").each(function () {
      var $this = jQuery(this);
      $this.appear(function () {
        var delay = $this.attr("data-appear-animation-delay") ? $this.attr("data-appear-animation-delay") : 1;
        if (delay > 1) $this.css("animation-delay", delay + "ms");
        setTimeout(function () {
          $this.animate({
            width: $this.attr("data-progress-animation")
          }, 800);
        }, delay);
      }, {
        accX: 0,
        accY: -50
      });
    });
  }

  _tbayResizeMegamenu() {
    var window_size = jQuery('body').innerWidth();

    if (jQuery('.tbay_custom_menu').length > 0 && jQuery('.tbay_custom_menu').hasClass('tbay-vertical-menu')) {
      if (window_size > 767) {
        this._resizeMegaMenuOnDesktop();
      } else {
        this._initTreeViewForMegaMenuOnMobile();
      }
    }

    if (jQuery('.tbay-megamenu').length > 0 && jQuery('.tbay-megamenu,.tbay-offcanvas-main').hasClass('verticle-menu') && window_size > 767) {
      this._resizeMegaMenuVertical();
    }
  }

  _resizeMegaMenuVertical() {
    var full_width = parseInt(jQuery('#main-container.container').innerWidth());
    var menu_width = parseInt(jQuery('.verticle-menu').innerWidth());
    var w = full_width - menu_width;
    jQuery('.verticle-menu').find('.aligned-fullwidth').children('.dropdown-menu').css({
      "max-width": w,
      "width": full_width - 30
    });
  }

  _resizeMegaMenuOnDesktop() {
    let maxWidth = jQuery('#main-container.container').innerWidth() - jQuery('.tbay-vertical-menu').innerWidth();
    let width = jQuery('#main-container.container').innerWidth() - 30;
    jQuery('.tbay-vertical-menu').find('.aligned-fullwidth').children('.dropdown-menu').css({
      'max-width': maxWidth,
      "width": width
    });
  }

  _initTreeViewForMegaMenuOnMobile() {
    jQuery(".tbay-vertical-menu > .widget_nav_menu >.nav > ul").each(function () {
      if (jQuery(this).hasClass('treeview')) return;
      jQuery(this).treeview(TREE_VIEW_OPTION_MEGA_MENU);
    });
  }

  _addAccordionLoginandCoupon() {
    jQuery('.showlogin, .showcoupon').click(function (event) {
      jQuery(event.currentTarget).toggleClass('active');
    });
  }

  _initHeaderCoverBG() {
    let menu = jQuery('.tbay-horizontal .navbar-nav > li,.tbay-horizontal-default .navbar-nav > li, .tbay_header-template .product-recently-viewed-header'),
        search = jQuery('.tbay-search-form .tbay-search'),
        btn_category = jQuery('.category-inside .category-inside-title'),
        cart_click = jQuery('.cart-popup');
    menu.mouseenter(function () {
      if (jQuery(this).parents('#tbay-header').length === 0) return;
      if (jQuery(this).children('.dropdown-menu, ul, .content-view').length == 0) return;
      jQuery('.tbay_header-template').addClass('nav-cover-active-1');
    }).mouseleave(function () {
      if (jQuery(this).closest('.dropdown-menu').length) return;
      jQuery('.tbay_header-template').removeClass('nav-cover-active-1');
    });
    search.focusin(function () {
      if (jQuery(this).closest('.dropdown-menu').length) return;
      if (search.parents('.sidebar-canvas-search').length > 0 || jQuery(this).closest('.tbay_header-template').length === 0) return;
      jQuery('.tbay_header-template').addClass('nav-cover-active-2');
    }).focusout(function () {
      jQuery('.tbay_header-template').removeClass('nav-cover-active-2');
    });
    cart_click.on('shown.bs.dropdown', function (event) {
      jQuery(event.target).closest('.tbay_header-template').addClass('nav-cover-active-3');
    }).on('hidden.bs.dropdown', function (event) {
      jQuery(event.target).closest('.tbay_header-template').removeClass('nav-cover-active-3');
    });

    if (btn_category.parents('.tbay_header-template')) {
      jQuery(document.body).on('tbay_category_inside_open', () => {
        jQuery('.tbay_header-template').addClass('nav-cover-active-4');
      });
      jQuery(document.body).on('tbay_category_inside_close', () => {
        jQuery('.tbay_header-template').removeClass('nav-cover-active-4');
      });
    }
  }

  _initCanvasSearch() {
    let input_search = jQuery('#tbay-search-form-canvas .sidebar-canvas-search .sidebar-content .tbay-search');
    input_search.focusin(function () {
      input_search.parent().addClass('search_cv_active');
    }).focusout(function () {
      input_search.parent().removeClass('search_cv_active');
    });
  }

  _initTreeviewMenu() {
    jQuery("#category-menu").addClass('treeview');
    jQuery(".treeview-menu .menu, #category-menu").treeview(TREE_VIEW_OPTION_MEGA_MENU);
    jQuery("#main-mobile-menu, #main-mobile-menu-xlg").treeview(TREE_VIEW_OPTION_MOBILE_MENU);
  }

  _categoryMenu() {
    jQuery(".category-inside .category-inside-title").click(function () {
      jQuery(event.target).parents('.category-inside').toggleClass("open");
      if (jQuery(event.target).parents('.category-inside').hasClass('setting-open')) return;

      if (jQuery(event.target).parents('.category-inside').hasClass('open')) {
        jQuery(document.body).trigger('tbay_category_inside_open');
      } else {
        jQuery(document.body).trigger('tbay_category_inside_close');
      }
    });
    let $win = jQuery(window);
    $win.on("click.Bst,click touchstart tap", function (event) {
      let $box = jQuery('.category-inside .category-inside-title, .category-inside-content');
      if (!jQuery('.category-inside').hasClass('open') && !jQuery('.tbay_header-template').hasClass('nav-cover-active-4')) return;

      if ($box.has(event.target).length == 0 && !$box.is(event.target)) {
        let insides = jQuery('.category-inside');
        jQuery.each(insides, function (key, inside) {
          if (!jQuery(inside).hasClass('setting-open')) {
            jQuery(inside).removeClass('open');
            jQuery('.tbay_header-template').removeClass('nav-cover-active-4');
          }
        });
      }
    });
  }

  _initContentMinHeight() {
    let window_size = jQuery('body').innerWidth(),
        $screen = jQuery(window).height(),
        $header = jQuery('.tbay_header-template').outerHeight(),
        $content = jQuery('#tbay-main-content').outerHeight();

    if ($content < $screen && window_size > 1200) {
      jQuery('#tbay-main-content').css('min-height', $screen - $header);
    }
  }

  _changeDefaultTimeago() {
    if (typeof diza_settings === "undefined" || typeof jQuery.timeago === "undefined") return;
    jQuery.extend(jQuery.timeago.settings.strings, {
      suffixAgo: diza_settings.timeago.suffixAgo,
      suffixFromNow: diza_settings.timeago.suffixFromNow,
      inPast: diza_settings.timeago.inPast,
      seconds: diza_settings.timeago.seconds,
      minute: diza_settings.timeago.minute,
      minutes: diza_settings.timeago.minutes,
      hour: diza_settings.timeago.hour,
      hours: diza_settings.timeago.hours,
      day: diza_settings.timeago.day,
      days: diza_settings.timeago.days,
      month: diza_settings.timeago.month,
      months: diza_settings.timeago.months,
      year: diza_settings.timeago.year,
      years: diza_settings.timeago.years
    });
  }

}

class NewsLetter {
  constructor() {
    this._init();
  }

  _init() {
    if (jQuery('#popupNewsletterModal').length === 0) return;
    jQuery('#popupNewsletterModal').on('hidden.bs.modal', function () {
      Cookies.set('hiddenmodal', 1, {
        expires: 0.1,
        path: '/'
      });
    });
    setTimeout(function () {
      if (Cookies.get('hiddenmodal') == "" || typeof Cookies.get('hiddenmodal') === "undefined") {
        jQuery('#popupNewsletterModal').modal('show');
      }
    }, 3000);
  }

}

class Banner {
  constructor() {
    this._init();
  }

  _init() {
    let btnRemove = jQuery('.banner-remove');

    if (btnRemove.length === 0) {
      jQuery('.elementor-widget-tbay-banner-close').each(function () {
        jQuery(this).closest('section').addClass('section-banner-close');
      });
    } else {
      btnRemove.on('click', function (event) {
        let id = jQuery(this).data('id');
        jQuery(this).parents('.elementor-widget-tbay-banner-close').slideUp("slow");
        Cookies.set('banner_remove_' + id, 'hidden', {
          expires: 0.1,
          path: '/'
        });
        event.preventDefault();
      });
    }
  }

}

class Search {
  constructor() {
    this._init();
  }

  _init() {
    this._tbaySearchMobile();

    this._searchToTop();

    this._searchCanvasForm();

    this._searchCanvasFormV3();

    jQuery('.button-show-search').click(() => jQuery('.tbay-search-form').addClass('active'));
    jQuery('.button-hidden-search').click(() => jQuery('.tbay-search-form').removeClass('active'));
  }

  _tbaySearchMobile() {
    jQuery(".search-device-mobile").each(function () {
      jQuery(this).find(".show-search").click(event => {
        jQuery(this).find(".tbay-search-form .input-group .tbay-search").focus();
        jQuery(event.currentTarget).toggleClass('active');
      });
    });
    jQuery('#tbay-search-mobile-close').on("click", function () {
      jQuery(this).parent().removeClass('active-search-mobile');
    });
    jQuery(".tbay-search-mobile .searchform .button-group .tbay-preloader").on("click", function () {
      if (!jQuery(this).parents('form').hasClass('open')) return;
      jQuery(this).parents('form').find(".tbay-search").attr('value', '');
    });
  }

  _searchToTop() {
    jQuery('.search-totop-wrapper .btn-search-totop').click(function () {
      jQuery('.search-totop-content').toggleClass('active');
      jQuery(this).toggleClass('active');
    });
    var $box_totop = jQuery('.search-totop-wrapper .btn-search-totop, .search-totop-content');
    jQuery(window).on("click.Bst", function (event) {
      if ($box_totop.has(event.target).length == 0 && !$box_totop.is(event.target)) {
        jQuery('.search-totop-wrapper .btn-search-totop').removeClass('active');
        jQuery('.search-totop-content').removeClass('active');
      }
    });
  }

  _searchCanvasForm() {
    let searchform = jQuery('#tbay-search-form-canvas');
    if (searchform.length === 0) return;
    searchform.find('button.search-open').click(function () {
      jQuery(event.target).parents('#tbay-search-form-canvas').toggleClass("open");
      jQuery('body').toggleClass("active-search-canvas");
    });
    let window_searchcanvas = jQuery(window);
    let forcussidebar = jQuery('#tbay-search-form-canvas .search-open, #tbay-search-form-canvas .sidebar-content');
    window_searchcanvas.on("click.Bst", function (event) {
      if (!searchform.hasClass('open')) return;

      if (forcussidebar.has(event.target).length == 0 && !forcussidebar.is(event.target)) {
        searchform.removeClass("open");
        jQuery('body').removeClass("active-search-canvas");
      }
    });
    searchform.find('button.btn-search-close').click(function () {
      if (!searchform.hasClass('open')) return;
      searchform.removeClass("open");
      jQuery('body').removeClass("active-search-canvas");
    });
  }

  _searchCanvasFormV3() {
    let searchform = jQuery('#tbay-search-form-canvas-v3');
    if (searchform.length === 0) return;
    searchform.find('button.search-open').click(function () {
      jQuery(event.target).parents('#tbay-search-form-canvas-v3').toggleClass("open");
      jQuery('body').toggleClass("active-search-canvas");
    });
    let window_searchcanvas = jQuery(window);
    let forcussidebar = jQuery('#tbay-search-form-canvas-v3 .search-open, #tbay-search-form-canvas-v3 .sidebar-content');
    window_searchcanvas.on("click.Bst", function (event) {
      if (!searchform.hasClass('open')) return;

      if (forcussidebar.has(event.target).length == 0 && !forcussidebar.is(event.target)) {
        searchform.removeClass("open");
        jQuery('body').removeClass("active-search-canvas");
      }
    });
    searchform.find('button.btn-search-close').click(function () {
      if (!searchform.hasClass('open')) return;
      searchform.removeClass("open");
      jQuery('body').removeClass("active-search-canvas");
    });
  }

}

class TreeView {
  constructor() {
    this._tbayTreeViewMenu();
  }

  _tbayTreeViewMenu() {
    if (typeof jQuery.fn.treeview === "undefined" || typeof jQuery('.tbay-treeview') === "undefined") return;
    jQuery(".tbay-treeview").each(function () {
      if (jQuery(this).find('> ul').hasClass('treeview')) return;
      jQuery(this).find('> ul').treeview({
        animated: 400,
        collapsed: true,
        unique: true,
        persist: "location"
      });
    });
  }

}

class Section {
  constructor() {
    this._tbayMegaMenu();

    this._tbayRecentlyView();
  }

  _tbayMegaMenu() {
    let menu = jQuery('.elementor-widget-tbay-nav-menu');
    if (menu.length === 0) return;
    menu.find('.tbay-element-nav-menu').each(function () {
      if (jQuery(this).data('wrapper').layout !== "horizontal") return;

      if (!jQuery(this).closest('.elementor-top-column').hasClass('tbay-column-static')) {
        jQuery(this).closest('.elementor-top-column').addClass('tbay-column-static');
      }

      if (!jQuery(this).closest('section').hasClass('tbay-section-static')) {
        jQuery(this).closest('section').addClass('tbay-section-static');
      }
    });
  }

  _tbayRecentlyView() {
    let recently = jQuery('.tbay-element-product-recently-viewed');
    if (recently.length === 0) return;
    recently.each(function () {
      if (jQuery(this).data('wrapper').layout !== "header") return;

      if (!jQuery(this).closest('.elementor-top-column').hasClass('tbay-column-static')) {
        jQuery(this).closest('.elementor-top-column').addClass('tbay-column-static');
      }

      if (!jQuery(this).closest('.elementor-top-column').hasClass('tbay-column-recentlyviewed')) {
        jQuery(this).closest('.elementor-top-column').addClass('tbay-column-recentlyviewed');
      }

      if (!jQuery(this).closest('section').hasClass('tbay-section-recentlyviewed')) {
        jQuery(this).closest('section').addClass('tbay-section-recentlyviewed');
      }

      if (!jQuery(this).closest('section').hasClass('tbay-section-static')) {
        jQuery(this).closest('section').addClass('tbay-section-static');
      }
    });
  }

}

class Preload {
  constructor() {
    this._init();
  }

  _init() {
    if (jQuery.fn.jpreLoader) {
      var $preloader = jQuery('.js-preloader');
      $preloader.jpreLoader({}, function () {
        $preloader.addClass('preloader-done');
        jQuery('body').trigger('preloader-done');
        jQuery(window).trigger('resize');
      });
    }

    jQuery('.tbay-page-loader').delay(100).fadeOut(400, function () {
      jQuery('body').removeClass('tbay-body-loading');
      jQuery(this).remove();
    });

    if (jQuery(document.body).hasClass('tbay-body-loader')) {
      setTimeout(function () {
        jQuery(document.body).removeClass('tbay-body-loader');
        jQuery('.tbay-page-loader').fadeOut(250);
      }, 300);
    }
  }

}

class Accordion {
  constructor() {
    this._init();
  }

  _init() {
    if (jQuery('.single-product').length === 0) return;
    jQuery('#accordion').on('shown.bs.collapse', function (e) {
      var offset = jQuery(this).find('.collapse.show').prev('.tabs-title');

      if (offset) {
        jQuery('html,body').animate({
          scrollTop: jQuery(offset).offset().top - 150
        }, 500);
      }
    });
  }

}

class MenuDropdownsAJAX {
  constructor() {
    this._initmenuDropdownsAJAX();
  }

  _initmenuDropdownsAJAX() {
    var _this = this;

    jQuery('body').on('mousemove', function () {
      jQuery('.menu').has('.dropdown-load-ajax').each(function () {
        var $menu = jQuery(this);

        if ($menu.hasClass('dropdowns-loading') || $menu.hasClass('dropdowns-loaded')) {
          return;
        }

        if (!_this.isNear($menu, 50, event)) {
          return;
        }

        _this.loadDropdowns($menu);
      });
    });
  }

  loadDropdowns($menu) {
    var _this = this;

    $menu.addClass('dropdowns-loading');
    var storageKey = '',
        unparsedData = '',
        menu_mobile_id = '';

    if ($menu.closest('nav').attr('id') === 'tbay-mobile-menu-navbar') {
      if (jQuery('#main-mobile-menu-mmenu-wrapper').length > 0) {
        menu_mobile_id += '_' + jQuery('#main-mobile-menu-mmenu-wrapper').data('id');
      }

      if (jQuery('#main-mobile-second-mmenu-wrapper').length > 0) {
        menu_mobile_id += '_' + jQuery('#main-mobile-second-mmenu-wrapper').data('id');
      }

      storageKey = diza_settings.storage_key + '_megamenu_mobile' + menu_mobile_id;
    } else {
      storageKey = diza_settings.storage_key + '_megamenu_' + $menu.closest('nav > ul').data('id');
    }

    unparsedData = localStorage.getItem(storageKey);
    var storedData = false;
    var $items = $menu.find('.dropdown-load-ajax'),
        ids = [];
    $items.each(function () {
      ids.push(jQuery(this).find('.dropdown-html-placeholder').data('id'));
    });

    try {
      storedData = JSON.parse(unparsedData);
    } catch (e) {
      console.log('cant parse Json', e);
    }

    if (storedData) {
      _this.renderResults(storedData, $menu);

      if ($menu.attr('id') !== 'tbay-mobile-menu-navbar') {
        $menu.removeClass('dropdowns-loading').addClass('dropdowns-loaded');
      }
    } else {
      jQuery.ajax({
        url: diza_settings.ajaxurl,
        data: {
          action: 'diza_load_html_dropdowns',
          ids: ids
        },
        dataType: 'json',
        method: 'POST',
        success: function (response) {
          if (response.status === 'success') {
            _this.renderResults(response.data, $menu);

            localStorage.setItem(storageKey, JSON.stringify(response.data));
          } else {
            console.log('loading html dropdowns returns wrong data - ', response.message);
          }
        },
        error: function () {
          console.log('loading html dropdowns ajax error');
        }
      });
    }
  }

  renderResults(data, $menu) {
    var _this = this;

    Object.keys(data).forEach(function (id) {
      _this.removeDuplicatedStylesFromHTML(data[id], function (html) {
        let html2 = html;
        const regex1 = '<li[^>]*><a[^>]*href=["]' + window.location.href + '["]>.*?<\/a><\/li>';
        let content = html.match(regex1);

        if (content !== null) {
          let $url = content[0];
          let $class = $url.match(/(?:class)=(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/g)[0].split('"')[1];
          let $class_new = $class + ' active';
          let $url_new = $url.replace($class, $class_new);
          html2 = html2.replace($url, $url_new);
        }

        $menu.find('[data-id="' + id + '"]').replaceWith(html2);

        if ($menu.attr('id') !== 'tbay-mobile-menu-navbar') {
          $menu.addClass('dropdowns-loaded');
          setTimeout(function () {
            $menu.removeClass('dropdowns-loading');
          }, 1000);
        }
      });
    });
  }

  isNear($element, distance, event) {
    var left = $element.offset().left - distance,
        top = $element.offset().top - distance,
        right = left + $element.width() + 2 * distance,
        bottom = top + $element.height() + 2 * distance,
        x = event.pageX,
        y = event.pageY;
    return x > left && x < right && y > top && y < bottom;
  }

  removeDuplicatedStylesFromHTML(html, callback) {
    if (diza_settings.combined_css) {
      callback(html);
      return;
    } else {
      const regex = /<style>.*?<\/style>/mg;
      let output = html.replace(regex, "");
      callback(output);
      return;
    }
  }

}

class MenuClickAJAX {
  constructor() {
    if (typeof diza_settings === "undefined") return;

    this._initmenuClickAJAX();
  }

  _initmenuClickAJAX() {
    jQuery('.element-menu-ajax.ajax-active').each(function () {
      var $menu = jQuery(this);
      $menu.find('.menu-click').off('click').on('click', function (e) {
        e.preventDefault();
        var $this = jQuery(this);
        if (!$this.closest('.element-menu-ajax').hasClass('ajax-active')) return;
        var element = $this.closest('.tbay-element'),
            type_menu = element.data('wrapper')['type_menu'],
            layout = element.data('wrapper')['layout'];

        if (type_menu === 'toggle') {
          var nav = element.find('.category-inside-content > nav');
        } else {
          var nav = element.find('.menu-canvas-content > nav');
        }

        var slug = nav.data('id');
        var storageKey = diza_settings.storage_key + '_' + slug + '_' + layout;
        var storedData = false;
        var unparsedData = localStorage.getItem(storageKey);

        try {
          storedData = JSON.parse(unparsedData);
        } catch (e) {
          console.log('cant parse Json', e);
        }

        if (storedData) {
          nav.html(storedData);
          element.removeClass('load-ajax');
          $this.closest('.element-menu-ajax').removeClass('ajax-active');

          if (layout === 'treeview') {
            jQuery(document.body).trigger('tbay_load_html_click_treeview');
          } else {
            jQuery(document.body).trigger('tbay_load_html_click');
          }
        } else {
          jQuery.ajax({
            url: diza_settings.ajaxurl,
            data: {
              action: 'diza_load_html_click',
              slug: slug,
              type_menu: type_menu,
              layout: layout
            },
            dataType: 'json',
            method: 'POST',
            beforeSend: function (xhr) {
              element.addClass('load-ajax');
            },
            success: function (response) {
              if (response.status === 'success') {
                nav.html(response.data);
                localStorage.setItem(storageKey, JSON.stringify(response.data));

                if (layout === 'treeview') {
                  jQuery(document.body).trigger('tbay_load_html_click_treeview');
                } else {
                  jQuery(document.body).trigger('tbay_load_html_click');
                }
              } else {
                console.log('loading html dropdowns returns wrong data - ', response.message);
              }

              element.removeClass('load-ajax');
              $this.closest('.element-menu-ajax').removeClass('ajax-active');
            },
            error: function () {
              console.log('loading html dropdowns ajax error');
            }
          });
        }
      });
    });
  }

}

class SumoSelect {
  constructor() {
    if (typeof jQuery.fn.SumoSelect === "undefined") return;
    if (typeof diza_settings === "undefined") return;

    this._init();
  }

  _init() {
    jQuery(document).ready(function () {
      jQuery('.woocommerce-currency-switcher,.woocommerce-fillter >.select, .woocommerce-ordering > .orderby, .tbay-filter select').SumoSelect({
        csvDispCount: 3,
        captionFormatAllSelected: "Yeah, OK, so everything."
      });
      let search_form = jQuery('.tbay-search-form');
      search_form.each(function () {
        if (jQuery(this).hasClass('tbay-search-mobile')) return;
        jQuery(this).find('select').SumoSelect({
          forceCustomRendering: true
        });
      });
    });
  }

}

class AutoComplete {
  constructor() {
    if (typeof jQuery.Autocomplete === "undefined") return;
    if (typeof diza_settings === "undefined") return;

    this._callAjaxSearch();
  }

  _callAjaxSearch() {
    var _this = this,
        url = diza_settings.ajaxurl + '?action=diza_autocomplete_search',
        form = jQuery('form.searchform.diza-ajax-search'),
        RegEx = function (value) {
      return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };

    form.each(function () {
      var _this2 = jQuery(this),
          autosearch = _this2.find('input[name=s]'),
          image = Boolean(_this2.data('thumbnail')),
          price = Boolean(_this2.data('price'));

      autosearch.devbridgeAutocomplete({
        serviceUrl: _this._AutoServiceUrl(autosearch, url),
        minChars: _this._AutoMinChars(autosearch),
        appendTo: _this._AutoAppendTo(autosearch),
        width: '100%',
        maxHeight: 'initial',
        onSelect: function (suggestion) {
          if (suggestion.link.length > 0) window.location.href = suggestion.link;
        },
        onSearchStart: function (query) {
          let form = autosearch.parents('form');
          form.addClass('tbay-loading');
        },
        beforeRender: function (container, suggestion) {
          if (typeof suggestion[0].result != 'undefined') {
            jQuery(container).prepend('<div class="list-header"><span>' + suggestion[0].result + '</span></div>');
          }

          if (suggestion[0].view_all) {
            jQuery(container).append('<div class="view-all-products"><span>' + diza_settings.show_all_text + '</span><i class="tb-icon tb-icon-chevron-right"></i></div>');
          }
        },
        onSearchComplete: function (query, suggestions) {
          form.removeClass('tbay-loading');
          jQuery(this).parents('form').addClass('open');
          jQuery(document.body).trigger('tbay_searchcomplete');
        },
        formatResult: (suggestion, currentValue) => {
          let returnValue = _this._initformatResult(suggestion, currentValue, RegEx, image, price);

          return returnValue;
        },
        onHide: function (container) {
          if (jQuery(this).parents('form').hasClass('open')) jQuery(this).parents('form').removeClass('open');
        }
      });
      jQuery('body').click(function () {
        if (autosearch.is(":focus")) {
          return;
        }

        autosearch.each(function () {
          jQuery(this).devbridgeAutocomplete('hide');
        });
      });
    });
    var cat_change = form.find('[name="product_cat"], [name="category"]');

    if (cat_change.length) {
      cat_change.change(function (e) {
        let se_input = jQuery(e.target).parents('form').find('input[name=s]'),
            ac = se_input.devbridgeAutocomplete();
        ac.hide();
        ac.setOptions({
          serviceUrl: _this._AutoServiceUrl(se_input, url)
        });
        ac.onValueChange();
      });
    }

    jQuery(document.body).on('tbay_searchcomplete', function () {
      jQuery(".view-all-products").on("click", function () {
        jQuery(this).parents('form').submit();
        e.stopPropagation();
      });
    });
  }

  _AutoServiceUrl(autosearch, url) {
    let form = autosearch.parents('form'),
        number = parseInt(form.data('count')),
        postType = form.data('post-type'),
        product_cat = form.find('[name="product_cat"], [name="category"]').val();

    if (number > 0) {
      url += '&number=' + number;
    }

    url += '&post_type=' + postType;

    if (product_cat) {
      url += '&product_cat=' + product_cat;
    }

    return url;
  }

  _AutoAppendTo(autosearch) {
    let form = autosearch.parents('form'),
        appendTo = typeof form.data('appendto') !== 'undefined' ? form.data('appendto') : form.find('.diza-search-results');
    return appendTo;
  }

  _AutoMinChars(autosearch) {
    let form = autosearch.parents('form'),
        minChars = parseInt(form.data('minchars'));
    return minChars;
  }

  _initformatResult(suggestion, currentValue, RegEx, image, price) {
    if (suggestion.no_found) return '<div class="suggestion-title no-found-msg">' + suggestion.value + '</div>';
    if (currentValue == '&') currentValue = "&#038;";
    var pattern = '(' + RegEx(currentValue) + ')',
        returnValue = '';

    if (image && suggestion.image && suggestion.image.length > 0) {
      returnValue += ' <div class="suggestion-thumb">' + suggestion.image + '</div>';
    }

    returnValue += '<div class="suggestion-group">';
    returnValue += '<div class="suggestion-title product-title">' + suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/&lt;(\/?strong)&gt;/g, '<$1>') + '</div>';

    if (suggestion.sku && suggestion.sku.length > 0) {
      returnValue += '<div class="suggestion-sku product-sku"><span>' + suggestion.sku.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/&lt;(\/?strong)&gt;/g, '<$1>') + '</span></div>';
    }

    if (price && suggestion.price && suggestion.price.length > 0) {
      returnValue += ' <div class="suggestion-price price">' + suggestion.price + '</div>';
    }

    returnValue += '</div>';
    return returnValue;
  }

}

class OnePageNav {
  constructor() {
    if (typeof jQuery.fn.onePageNav === "undefined") return;
    if (typeof diza_settings === "undefined") return;

    this._productSingleOnepagenav();
  }

  _productSingleOnepagenav() {
    if (jQuery('#sticky-menu-bar').length > 0) {
      let offset_adminbar = 0;

      if (jQuery('#wpadminbar').length > 0) {
        offset_adminbar = jQuery('#wpadminbar').outerHeight();
      }

      let offset = jQuery('#sticky-menu-bar').outerHeight() + offset_adminbar;
      jQuery('#sticky-menu-bar').onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        scrollOffset: offset,
        filter: '',
        easing: 'swing',
        begin: function () {},
        end: function () {},
        scrollChange: function () {}
      });
    }

    var onepage = jQuery('#sticky-menu-bar');

    if (onepage.length > 0) {
      var tbay_width = jQuery(window).width();
      jQuery('.tbay_header-template').removeClass('main-sticky-header');
      var btn_cart_offset = jQuery('.single_add_to_cart_button').length > 0 ? jQuery('.single_add_to_cart_button').offset().top : 0;
      var out_of_stock_offset = jQuery('div.product .out-of-stock').length > 0 ? jQuery('div.product .out-of-stock').offset().top : 0;

      if (jQuery('.by-vendor-name-link').length > 0) {
        out_of_stock_offset = jQuery('.by-vendor-name-link').offset().top;
      }

      var sum_height = jQuery('.single_add_to_cart_button').length > 0 ? btn_cart_offset : out_of_stock_offset;

      this._checkScroll(tbay_width, sum_height, onepage);

      jQuery(window).scroll(() => {
        this._checkScroll(tbay_width, sum_height, onepage);
      });
    }

    if (onepage.hasClass('active') && jQuery('#wpadminbar').length > 0) {
      onepage.css('top', jQuery('#wpadminbar').height());
    }
  }

  _checkScroll(tbay_width, sum_height, onepage) {
    if (tbay_width >= 768) {
      var NextScroll = jQuery(window).scrollTop();

      if (NextScroll > sum_height) {
        onepage.addClass('active');

        if (jQuery('#wpadminbar').length > 0) {
          onepage.css('top', jQuery('#wpadminbar').height());
        }
      } else {
        onepage.removeClass('active');
      }
    } else {
      onepage.removeClass('active');
    }
  }

}

class CountDownTimer {
  constructor() {
    if (typeof jQuery.fn.tbayCountDown === "undefined") return;
    if (typeof diza_settings === "undefined") return;
    jQuery('[data-time="timmer"]').each((index, el) => {
      let date = jQuery(el).data('date').split("-"),
          days = jQuery(el).data('days') ? jQuery(el).data('days') : '',
          hours = jQuery(el).data('hours') ? jQuery(el).data('hours') : '',
          mins = jQuery(el).data('mins') ? jQuery(el).data('mins') : '',
          secs = jQuery(el).data('secs') ? jQuery(el).data('secs') : '';
      jQuery(el).tbayCountDown({
        TargetDate: date[0] + "/" + date[1] + "/" + date[2] + " " + date[3] + ":" + date[4] + ":" + date[5],
        DisplayFormat: "<div class=\"times\"><div class=\"day\">%%D%%" + days + "</div><span>:</span><div class=\"hours\">%%H%%" + hours + "</div><span>:</span><div class=\"minutes\">%%M%%" + mins + "</div><span>:</span><div class=\"seconds\">%%S%%" + secs + "</div></div>",
        FinishMessage: ""
      });
    });
    jQuery('[data-countdown="countdown"]').each((index, el) => {
      let date = jQuery(el).data('date').split("-"),
          days = jQuery(el).data('days') ? jQuery(el).data('days') : '',
          hours = jQuery(el).data('hours') ? jQuery(el).data('hours') : '',
          mins = jQuery(el).data('mins') ? jQuery(el).data('mins') : '',
          secs = jQuery(el).data('secs') ? jQuery(el).data('secs') : '';
      jQuery(el).tbayCountDown({
        TargetDate: date[0] + "/" + date[1] + "/" + date[2] + " " + date[3] + ":" + date[4] + ":" + date[5],
        DisplayFormat: "<div class=\"times\"><div class=\"day\">%%D%%" + days + " </div><span>:</span><div class=\"hours\">%%H%%" + hours + " </div><span>:</span><div class=\"minutes\">%%M%%" + mins + " </div><span>:</span><div class=\"seconds\">%%S%%" + secs + " </div></div>",
        FinishMessage: ""
      });
    });
  }

}

class MMenu {
  constructor() {
    if (typeof jQuery.fn.mmenu === "undefined") return;
    if (typeof diza_settings === "undefined") return;

    this._initMmenu();
  }

  _initMmenu() {
    if (jQuery('body').hasClass('admin-bar')) {
      jQuery('html').addClass('html-mmenu');
    }

    var text_cancel = typeof diza_settings !== "undefined" ? diza_settings.cancel : '';
    var _PLUGIN_ = 'mmenu';

    jQuery[_PLUGIN_].i18n({
      'cancel': text_cancel
    });

    var mmenu = jQuery("#tbay-mobile-smartmenu");
    if (jQuery(mmenu).length === 0) return;
    var themes = mmenu.data('themes');
    var enablesearch = Boolean(mmenu.data("enablesearch"));
    var menu_title = mmenu.data('title');
    var searchcounters = Boolean(mmenu.data('counters'));
    var enabletabs = Boolean(mmenu.data("enabletabs"));
    var tabone = enabletabs ? mmenu.data('tabone') : '';
    var taboneicon = enabletabs ? mmenu.data('taboneicon') : '';
    var tabsecond = enabletabs ? mmenu.data('tabsecond') : '';
    var tabsecondicon = enabletabs ? mmenu.data('tabsecondicon') : '';
    var enablesocial = Boolean(mmenu.data("enablesocial"));
    var socialjsons = '';
    var enablebottom = Boolean(mmenu.data("enablebottom"));
    var enableeffects = Boolean(mmenu.data("enableeffects"));
    var effectspanels = enableeffects ? mmenu.data('effectspanels') : '';
    var effectslistitems = enableeffects ? mmenu.data('effectslistitems') : '';
    var mmenuOptions = {
      offCanvas: true,
      navbar: {
        title: menu_title
      },
      counters: searchcounters,
      extensions: [themes, effectspanels, effectslistitems]
    };
    var mmenuOptionsAddition = {
      navbars: [],
      searchfield: {}
    };

    if (enablesearch) {
      mmenuOptionsAddition.navbars.push({
        position: ['top'],
        content: ['searchfield']
      });
      mmenuOptionsAddition.searchfield = {
        panel: {
          add: true
        }
      };
    }

    if (enabletabs) {
      mmenuOptionsAddition.navbars.push({
        type: 'tabs',
        content: ['<a href="#main-mobile-menu-mmenu"><i class="' + taboneicon + '"></i> <span>' + tabone + '</span></a>', '<a href="#mobile-menu-second-mmenu"><i class="' + tabsecondicon + '"></i> <span>' + tabsecond + '</span></a>']
      });
    }

    var content = '';

    if (enablesocial) {
      if (typeof mmenu.data("socialjsons") !== "undefined") {
        socialjsons = JSON.parse(mmenu.data("socialjsons").replace(/'/g, '"'));
        content = jQuery.map(socialjsons, function (value) {
          return `<a class="mmenu-icon" href="${value.url}" target="_blank"><i class="${value.icon}"></i></a>`;
        });
      }
    }

    if (enablebottom) {
      mmenuOptionsAddition.navbars.push({
        position: 'bottom',
        content: content
      });
    }

    mmenuOptions = _.extend(mmenuOptionsAddition, mmenuOptions);
    var mmenuConfigurations = {
      offCanvas: {
        pageSelector: "#tbay-main-content"
      },
      searchfield: {
        clear: true
      }
    };
    jQuery("#tbay-mobile-menu-navbar").mmenu(mmenuOptions, mmenuConfigurations);
    let search = jQuery('#mm-searchfield');

    if (search.length > 0) {
      search.prependTo(jQuery("#tbay-mobile-menu-navbar .mm-navbars_bottom"));
    }

    if (!enablesocial) {
      jQuery('.mm-navbars_bottom .mm-navbar').hide();
    }

    jQuery('.mm-panels').css('top', jQuery('.mm-navbars_top').outerHeight());
  }

}

class TimeTo {
  constructor() {
    if (typeof jQuery.fn.timeTo === "undefined") return;
    if (typeof diza_settings === "undefined") return;

    this._init();
  }

  _init() {
    jQuery('[data-time="timmer"], [data-countdown="countdown"]').each(function (index, el) {
      let id = jQuery(this).data('id');
      let date = jQuery(this).data('date').split("-");
      var futureDate = new Date('' + date[2] + '-' + date[0] + '-' + date[1] + 'T' + date[3] + ':' + date[4] + ':' + date[5] + '');
      jQuery("#countdown-" + id + "").timeTo({
        timeTo: new Date(futureDate)
      });
    });
  }

}

jQuery(document).ready(() => {
  new MenuDropdownsAJAX(), new MenuClickAJAX(), new StickyHeader(), new AccountMenu(), new BackToTop(), new CanvasMenu(), new FuncCommon(), new NewsLetter(), new Banner(), new Preload(), new Search(), new TreeView(), new Accordion(), new Section(), new SumoSelect(), new OnePageNav(), new CountDownTimer(), new MMenu(), new TimeTo(), new AutoComplete();

  if (jQuery.browser.mobile || jQuery(window).width() < 1200) {
    var mobile = new Mobile();

    mobile._topBarDevice();

    jQuery(window).scroll(() => {
      mobile._topBarDevice();
    });
  }

  jQuery(document).on("woof_ajax_done", woof_ajax_done_handler2);

  function woof_ajax_done_handler2(e) {
    new SumoSelect();
  }
});
setTimeout(function () {
  jQuery(document.body).on('tbay_load_html_click_treeview', () => {
    new TreeView();
  });
}, 2000);
jQuery(window).on("resize", () => {
  if (jQuery.browser.mobile || jQuery(window).width() < 1200) {
    var mobile = new Mobile();

    mobile._topBarDevice();

    jQuery(window).scroll(() => {
      mobile._topBarDevice();
    });
  }
});

var CanvasMenuHandler = function ($scope, $) {
  var Canvasmenu = new CanvasMenu();

  Canvasmenu._initCanvasMenu();
};

jQuery(window).on('elementor/frontend/init', function () {
  elementorFrontend.hooks.addFilter('frontend/element_ready/tbay-nav-menu.default', CanvasMenuHandler);
});

var AutoCompleteHandler = function ($scope, $) {
  new AutoComplete();
};

jQuery(window).on('elementor/frontend/init', function () {
  elementorFrontend.hooks.addAction('frontend/element_ready/tbay-search-form.default', AutoCompleteHandler);
});

var CountDownTimerHandler = function ($scope, $) {
  new CountDownTimer();
};

jQuery(document.body).on('tbay_quick_view', () => {
  new CountDownTimer();
});
jQuery(window).on('elementor/frontend/init', function () {
  if (typeof diza_settings !== "undefined" && Array.isArray(diza_settings.elements_ready.countdowntimer)) {
    jQuery.each(diza_settings.elements_ready.countdowntimer, function (index, value) {
      elementorFrontend.hooks.addAction('frontend/element_ready/tbay-' + value + '.default', CountDownTimerHandler);
    });
  }
});
