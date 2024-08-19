import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Notes",
  description: "Current Notes and of my knowledge",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    outline: [2, 4],

    sidebar: [
      {
        text: 'Documentation',
        items: [
          {
            text: 'Azure',
            items: [
              { text: 'Overview', link: '/azure/' },
              { text: 'Part 1', link: '/azure/part-1' },
              { text: 'Part 2', link: '/azure/part-2' },
              { text: 'Part 3', link: '/azure/part-3' },
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
              { text: 'Overview', link: '/kafka/' }
            ]
          },
          {
            text: 'Kubernetes',
            items: [
              { text: 'Multinode Cluster', link: '/kubernetes/multinode-cluster' },
              {
                text: 'Nginx',
                items: [
                  { text: 'Nginx Deployment', link: '/kubernetes/nginx/nginx-deployment' },
                  { text: 'Nginx Service', link: '/kubernetes/nginx/nginx-service' }
                ]
              },
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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },

  rewrites: {
    // https://vitepress.dev/guide/routing#route-rewrites
    ':folder/README.md': ':folder/index.md',
  },
})
