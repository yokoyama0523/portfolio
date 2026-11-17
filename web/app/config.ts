export const site = {
  name: "Yuki Yokoyama",
  brand: "Saku²",
  brandMark: { base: "Saku", exponent: "²" },
  url: "https://yokoyama-dev.com",
  lang: "ja",
  locale: "ja_JP",
  country: "JP",
  icons: [
    { rel: "icon", href: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    { rel: "icon", href: "/favicon-48.png", sizes: "48x48", type: "image/png" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  ],
  ogImage: "/og/top.jpg",
  paths: {
    home: "/",
    works: "/portfolio/",
    service: "/service/",
    process: "/service/#process",
    about: "/about/",
  },
  crowdworks: "https://crowdworks.jp/public/employees/5842694",
  profiles: [
    "https://crowdworks.jp/public/employees/5842694",
    "https://github.com/yokoyama0523",
    "https://www.linkedin.com/in/yuki-yokoyama-771124414/",
    "https://zenn.dev/yokoyama0523",
    "https://qiita.com/yokoyama0523",
    "https://dribbble.com/yokoyama0523",
    "https://www.behance.net/yokoyama0523",
  ],
  message: "Creative Business Technology",
  tagline: ["さくさく、つくる", "さくさく、うごく", "さくさく、さくら"],
  analytics: {
    id: "G-CSN3EMWVDW",
    delayMs: 1200,
  },
} as const;

export const nav = [
  { label: "Works", href: site.paths.works },
  { label: "Service", href: site.paths.service },
  { label: "Process", href: site.paths.process },
  { label: "About", href: site.paths.about },
] as const;
