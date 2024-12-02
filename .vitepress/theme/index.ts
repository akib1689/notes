// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { useData, type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    const { frontmatter } = useData()

    // Extract the og:image property
    const ogImage = frontmatter.value.head?.find(
      (tag: any) => tag[1]?.property === 'og:image'
    )?.[1]?.content

    console.log('og:image:', ogImage) // Log the image source
    return h(DefaultTheme.Layout, null, {
      'doc-before': () =>
        ogImage
          ? h('div', { class: 'og-card' }, [
              h('img', {
                src: ogImage,
                alt: 'Open Graph Image',
                class: 'og-image',
              }),
            ])
          : null,
    })
  },
} satisfies Theme
