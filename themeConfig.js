// Theme Colors
// Initially this will be blank. Later on when app is initialized we will assign bootstrap colors to this from CSS variables.
export const $themeColors = {
  success: '#12C158',
  error: '#FF4158',
};

// App Breakpoints
// Initially this will be blank. Later on when app is initialized we will assign bootstrap breakpoints to this object from CSS variables.
export const $themeBreakpoints = {};

// APP CONFIG
export const $themeConfig = {
  app: {
    appName: 'آن&zwnj;تایم 24', // Will update name in navigation menu (Branding)
    // eslint-disable-next-line global-require
    appLogoImage: require('@/assets/images/logo/logo.png'), // Will update logo in navigation menu (Branding)
    userLogo: require('@/assets/images/avatars/default.png'), // Will update logo in navigation menu (Branding)
  },
  layout: {
    isRTL: true,
    skin: 'light', // light, dark, bordered, semi-dark
    routerTransition: 'zoom-fade', // zoom-fade, slide-fade, fade-bottom, fade, zoom-out, none
    type: 'vertical', // vertical, horizontal
    contentWidth: 'full', // full, boxed
    menu: {
      hidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: '', // BS color options [primary, success, etc]
    },
    footer: {
      type: 'static', // static, sticky, hidden
    },
    customizer: true,
    enableScrollToTop: true,
  },
};
