const en = {
  meta: {
    title: "WebKadr — websites, automation and content for business",
    description:
      "Web studio. We build websites and online stores, automate requests and routine work with Telegram bots, and edit your photos and videos for social media.",
  },
  header: {
    language: "Language",
    theme: "Switch theme",
  },
  hero: {
    title: "Websites, automation and content for your business",
    lead: "Website, request handling and content from your photos and videos, from idea to launch.",
    cta: "Discuss your project",
  },
  mock: {
    formTitle: "Order form",
    fieldName: "Name",
    fieldPhone: "Phone",
    submit: "Send request",
    orderTitle: "New order",
    client: "Client",
    items: "Items",
    total: "Total",
    reviewTitle: "New review",
  },
  services: {
    title: "What we do",
    sites: {
      title: "Websites",
      text: "Landing pages and multi-page sites, menus and order forms.",
    },
    automation: {
      title: "Automation",
      text: "Requests and orders land straight in your messenger.",
    },
    content: {
      title: "Content",
      text: "Editing your photos and videos for your site and social media.",
    },
  },
  packages: {
    title: "Packages",
    lead: "A fixed price and a clear scope.",
    siteLabel: "Website",
    contentLabel: "Content, from your photos and videos",
    choose: "Choose package",
    pilot:
      "Our first three clients get a discount in exchange for a review and permission to show the work.",
    plans: {
      site: {
        name: "Website",
        term: "from 5 days",
        site: [
          "Landing page: one page about your business",
          "Domain for the first year",
        ],
      },
      start: {
        name: "Start",
        term: "from 7 days",
        site: [
          "Landing page: one page about your business",
          "Domain for the first year",
        ],
        content: ["3 photos edited", "One 30-second clip edited"],
      },
      business: {
        name: "Business",
        term: "from 14 days",
        site: [
          "Website with a request form or order menu",
          "Requests land in your messenger",
          "Domain for the first year",
        ],
        content: ["7 photos edited", "2 clips edited, 1 minute in total"],
      },
    },
    builder: {
      name: "Builder",
      text: "Put together your own set of services.",
      items: [
        "Websites",
        "Automation",
        "Photo editing and video",
        "Filming in Astana",
        "Website support",
      ],
      cta: "Choose services",
    },
  },
  builder: {
    title: "Builder",
    lead: "Tick the services you need and the total adds itself up.",
    groups: { web: "Web services", content: "Content" },
    items: {
      landing: { name: "Landing page", desc: "One page about your business" },
      multi: {
        name: "Multi-page website",
        desc: "Services, prices and contacts on separate pages",
      },
      catalog: {
        name: "Website with an order menu or catalogue",
        desc: "Customers pick items and send you the order",
      },
      automation: {
        name: "Automation",
        desc: "Requests and orders land in your messenger",
      },
      hosting: {
        name: "Domain and hosting",
        desc: "Your site live at your own address",
      },
      support: {
        name: "Website support",
        desc: "Renewals, backups, small edits",
      },
      edits: { name: "Changes", desc: "An edit or a new page on a live site" },
      photo: { name: "Photo editing", desc: "From your own shots" },
      video: { name: "Video editing", desc: "From your own footage" },
      shootPhoto: { name: "Photo shoot", desc: "On site in Astana" },
      shootVideo: { name: "Video shoot", desc: "On site in Astana" },
    },
    from: "from {n} ₸",
    units: {
      year: "per year",
      edit: "per change",
      photo: "per photo",
      clip: "per clip",
      visit: "per visit",
      request: "price after the brief",
    },
    qty: "Quantity",
    less: "Fewer",
    more: "More",
    estimate: "Estimate",
    emptyEstimate: "Nothing yet: tick services in the list.",
    totalFrom: "Total, from",
    yearly: "Plus {p} per year",
    supportNote: "Support is priced after the brief",
    note: "We confirm the exact price after a short brief.",
    contact: "How should we contact you",
    tgLabel: "Telegram username",
    waLabel: "WhatsApp number",
    tgBad: "Username: 5 to 32 Latin letters, digits or _",
    waBad: "Number: 10 to 15 digits",
    send: "Send request",
    empty: "Tick at least one service.",
    sent: "Request copied. Paste it into the chat and send.",
    copyFail: "Could not copy. Tell us in the chat what you picked.",
    done: "Request sent. We will reply in the messenger you chose.",
    failed: "It did not go through. Try again in a minute.",
    toSummary: "To request",
    message: {
      hello: "Hello! I'd like to discuss these services from the WebKadr site:",
      total: "Total: {p} one-time",
      yearly: "and {p} per year",
      contact: "Contact: {c}",
    },
  },
};

export type Dictionary = typeof en;

export default en;
