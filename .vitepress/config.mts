import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Notes",
  description: "Current Notes and of my knowledge",
  head:[
    ['link', 
      { rel: 'icon', href: '/Notes/favicon_io/favicon.ico', sizes: '16x16' }
    ],
    ['link', 
      { rel: 'icon', href: '/Notes/favicon_io/favicon-32x32.png', sizes: '32x32' }
    ],
    ['link', 
      { rel: 'apple-touch-icon', href: '/Notes/favicon_io/apple-touch-icon.png' }
    ],
    ['link', 
      { rel: 'manifest', href: '/Notes/favicon_io/site.webmanifest' }
    ],
    ['meta', 
      { 
        name: 'msapplication-TileImage', 
        content: '/Notes/favicon_io/android-chrome-192x192.png' 
      }
    ],
    ['meta', 
      { name: 'msapplication-TileColor', 
        content: '#ffffff' 
      }
    ],
  ],

  base: '/Notes/',


  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Azure', link: '/azure' },
      { text: 'CI/CD', link: '/ci-cd' },
      { text: 'Kafka', link: '/kafka' },
      { text: 'Kubernetes', link: '/kubernetes' },
    ],

    search:{
      provider: 'local',
    },

    outline: [2, 4],

    sidebar: [
      {
        items: [
          {
            text: 'Android',
            items: [
              { text: 'Overview', link: '/android/' },
              { text: 'Setup Bottom Navigation', link: '/android/bottom-navigation-view-setup' },
            ]
          },
          {
            text: 'Azure',
            items: [
              { text: 'Overview', link: '/azure/' },
              { text: 'Describe Cloud Concepts', link: '/azure/part-1' },
              { text: 'Azure architecture and services', link: '/azure/part-2' },
              { text: 'Azure management and governance capabilities', link: '/azure/part-3' },
            ]
          },
          {
            text: 'CI/CD',
            items: [
              { text: 'Overview', link: '/ci-cd/' }
            ]
          },
          {
            text: 'Kafka',
            items: [
              { text: 'Overview', link: '/kafka/' },
              { text: 'Topics', link: '/kafka/topics' },
              { text: 'Producers', link: '/kafka/producers' },
              { text: 'Consumers', link: '/kafka/consumers' },
              { text: 'Deployment', items: [
                { text: 'Deploy and Initial setup', link: '/kafka/deploy-part-1' },
                { text: 'Access Kafka from outside', link: '/kafka/deploy-part-2' },
                { text: 'Attaching persistent storage', link: '/kafka/deploy-part-3' },
              ]},
            ]
          },
          {
            text: 'Kubernetes',
            items: [
              { text: 'Multinode Cluster', link: '/kubernetes/multinode-cluster' },
              { text: 'Overview', link: '/kubernetes/' }
            ]
          },
          {
            text: 'Linux Administration',
            items: [
              { text: 'Auto Mount Disk', link: '/linux-administration/auto-mount-disk' },
              { text: 'Install Docker', link: '/linux-administration/install-docker' },
              { text: 'Rename a User', link: '/linux-administration/rename-a-user' }
            ]
          },
          {
            text: 'Pi-hole',
            items: [
              { text: 'Add DNS Record', link: '/pihole/add-dns-record' },
              { text: 'Install Pi-hole', link: '/pihole/install-pihole' }
            ]
          }
        ]
      }
      
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/akib1689' }
    ],

    lastUpdated: {
      text: 'Last Updated at',
      formatOptions: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    },
  },

  rewrites: {
    // https://vitepress.dev/guide/routing#route-rewrites
    ':folder/README.md': ':folder/index.md',
  },
})
