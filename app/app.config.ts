export default defineAppConfig({
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'mist'
    },
    navigationMenu: {
      slots: {
        root: 'u-navigation-menu ',
        list: 'gap-6 uppercase',
        item: 'text-xs',
        linkTrailing: 'hidden',
        viewportWrapper: 'fixed top-20 left-10 right-10 max-w-[80%] mx-auto shadow-lg',
        childList: 'lg:p-12'
      }
    }
  }
})
