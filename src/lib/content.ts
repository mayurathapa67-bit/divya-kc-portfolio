import type { SiteContent } from "./types";

export const content: SiteContent = {
  nav: {
    logo: "Divya KC",
    logoImage: "",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Work", href: "/portfolio" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  hero: {
    title: "Divya KC",
    role: "Creative Director & Digital Marketing Specialist",
    tagline: "Creating Digital Magic",
    subtitle: "Where creativity meets strategy to build brands that matter",
    cta_primary: "See My Work",
    cta_secondary: "Let's Talk",
    image: "/images/hero-divya.jpg.svg",
  },
  about: {
    headline: "The Story",
    bio: "I'm Divya — a creative director and digital marketer who believes the best brands aren't built in boardrooms, they're built in moments. Moments of connection, of surprise, of feeling seen. I split my time between the harbour light of Sydney and the Himalayan calm of Kathmandu, and that duality shows up in everything I make: bold enough to be noticed, warm enough to be loved.",
    philosophy: "I believe in marketing that feels human.",
    story: "My journey started with a camera and a question: why does so much advertising feel like noise? Over a decade later, I've led campaigns across two continents, helped startups find their voice, and watched quiet brands become movements. I still lead with the same curiosity I had on day one — and I still think the best ideas fit on the back of a napkin before they ever touch a screen.",
    expertise: [
      "Creative Direction",
      "Brand Strategy",
      "Campaign Management",
      "Content Creation",
      "Social Media",
      "Art Direction",
      "Copywriting",
      "Audience Insight",
    ],
    experience: [
      {
        role: "Creative Director",
        company: "Studio Meraki, Sydney",
        duration: "2021 — Present",
        story:
          "Leading a small, fiercely talented team building brand worlds for clients who care about craft. We've launched products, rebranded legacy businesses, and won hearts along the way.",
      },
      {
        role: "Digital Marketing Lead",
        company: "Kathmandu Collective",
        duration: "2018 — 2021",
        story:
          "Built the digital presence for a roster of hospitality and lifestyle brands, growing one account from 4k to 400k engaged followers in eighteen months.",
      },
      {
        role: "Content & Social Strategist",
        company: "Freelance, Global",
        duration: "2015 — 2018",
        story:
          "Cut my teeth telling stories for anyone who'd let me — from local cafés to international NGOs — learning that clarity beats cleverness, every single time.",
      },
    ],
    personal: {
      hobbies: ["Photography", "Travel", "Painting", "Slow mornings with coffee"],
      photos: [
        "/images/about-1.jpg.svg",
        "/images/about-2.jpg.svg",
        "/images/about-3.jpg.svg",
      ],
    },
    image: "/images/about-divya.jpg.svg",
  },
  services: [
    {
      title: "Creative Direction",
      description:
        "I help you find the soul of your brand and translate it into visuals, words, and experiences people remember. Think of me as the director who keeps the whole story coherent and beautiful.",
      icon: "compass",
      cover: "",
      deliverables: [
        "Brand mood boards & visual identity",
        "Campaign concept & art direction",
        "Creative team coordination",
        "Style guides & tone of voice",
      ],
    },
    {
      title: "Brand Strategy & Positioning",
      description:
        "Before the pretty stuff, we need a plan. I dig into who you are, who you're for, and why you matter — then build a position that's impossible to ignore.",
      icon: "target",
      cover: "",
      deliverables: [
        "Audience & market research",
        "Brand positioning & narrative",
        "Messaging architecture",
        "Competitive audit",
      ],
    },
    {
      title: "Digital Marketing Campaigns",
      description:
        "Ideas are only magic when they reach people. I design campaigns that travel — across social, search, and screen — and actually move the numbers that matter.",
      icon: "rocket",
      cover: "",
      deliverables: [
        "Multi-channel campaign strategy",
        "Paid & organic media plans",
        "Performance tracking & reporting",
        "Creative asset production",
      ],
    },
    {
      title: "Social Media Management",
      description:
        "Social isn't a megaphone, it's a conversation. I build communities around brands by showing up consistently, honestly, and with a little delight.",
      icon: "sparkles",
      cover: "",
      deliverables: [
        "Content calendars & production",
        "Community engagement",
        "Reels, stories & short-form video",
        "Growth & analytics",
      ],
    },
    {
      title: "Content Creation",
      description:
        "Words, images, motion — the raw material of connection. I craft content that feels less like advertising and more like something you'd actually share.",
      icon: "palette",
      cover: "",
      deliverables: [
        "Photography & art direction",
        "Copywriting & storytelling",
        "Short-form video & motion",
        "Editorial & blog content",
      ],
    },
  ],
  portfolio: [
    {
      slug: "lumen-skincare-launch",
      title: "Lumen — A Skincare Launch That Glowed",
      category: "Brand Campaigns",
      client: "Lumen Beauty",
      description:
        "A full brand launch for a clean-skincare line, built around the idea that glow starts from within.",
      challenge:
        "Lumen was entering a crowded clean-beauty market with no name recognition and a modest launch budget. They needed to feel premium without feeling cold, and stand out on shelves dominated by minimalist white packaging.",
      strategy:
        "We built the brand around warmth — a coral-to-gold gradient world, real-skin photography, and a launch film that felt like a hug. Influencer seeding focused on storytellers, not just reach.",
      results: {
        engagement: "+312%",
        reach: "2.4M",
        conversions: "18k",
      },
      images: [
        "/images/work-lumen-1.jpg.svg",
        "/images/work-lumen-2.jpg.svg",
        "/images/work-lumen-3.jpg.svg",
      ],
      testimonial: {
        quote:
          "Divya didn't just launch our brand, she gave it a personality. Sales beat every forecast we made.",
        name: "Priya Raman",
        role: "Founder, Lumen Beauty",
      },
      published_date: "2024-09-12",
    },
    {
      slug: "harbour-coffee-rebrand",
      title: "Harbour Coffee — Rebrand With Heart",
      category: "Creative Direction",
      client: "Harbour Coffee Co.",
      description:
        "A beloved Sydney café chain reimagined for a new generation without losing its regulars.",
      challenge:
        "After fifteen years, Harbour's brand felt tired and the new owners worried they'd alienate loyal customers if they changed too much — but too little and they'd fade.",
      strategy:
        "We kept the warmth, refreshed the mark, and introduced a playful illustration system inspired by the harbour itself. Every touchpoint told a small story.",
      results: {
        engagement: "+148%",
        reach: "890K",
        conversions: "6.2k",
      },
      images: [
        "/images/work-harbour-1.jpg.svg",
        "/images/work-harbour-2.jpg.svg",
        "/images/work-harbour-3.jpg.svg",
      ],
      testimonial: {
        quote:
          "Our regulars love it even more now, and a whole new crowd walked through the door. Magic.",
        name: "Tom Whitfield",
        role: "Co-owner, Harbour Coffee",
      },
      published_date: "2024-06-03",
    },
    {
      slug: "wanderlust-travel-series",
      title: "Wanderlust — A Social Series That Wandered Far",
      category: "Social Media",
      client: "Wanderlust Travel",
      description:
        "A twelve-week social content series turning travel inspiration into bookings.",
      challenge:
        "Wanderlust had gorgeous destination photos but zero narrative. Their feed scrolled like a stock library and converted poorly.",
      strategy:
        "We built a character-led series — real travellers, real moments — with a consistent warm palette and a weekly 'where to next' ritual that built anticipation.",
      results: {
        engagement: "+420%",
        reach: "5.1M",
        conversions: "31k",
      },
      images: [
        "/images/work-wander-1.jpg.svg",
        "/images/work-wander-2.jpg.svg",
        "/images/work-wander-3.jpg.svg",
      ],
      testimonial: {
        quote:
          "Our feed finally feels like us. Bookings followed the feeling.",
        name: "Mei Lin",
        role: "Head of Marketing, Wanderlust",
      },
      published_date: "2024-03-21",
    },
    {
      slug: "roots-nonprofit-drive",
      title: "Roots — A Cause That Found Its Voice",
      category: "Digital Marketing",
      client: "Roots Foundation",
      description:
        "A digital fundraising drive for an education nonprofit across Nepal and Australia.",
      challenge:
        "Roots had a powerful mission but a quiet digital presence. They needed to raise funds fast without feeling transactional or guilt-driven.",
      strategy:
        "We led with hope, not pity — student stories filmed with dignity, a clear 'one child, one year' framing, and a matched-giving push timed for giving season.",
      results: {
        engagement: "+260%",
        reach: "1.8M",
        conversions: "9.4k",
      },
      images: [
        "/images/work-roots-1.jpg.svg",
        "/images/work-roots-2.jpg.svg",
        "/images/work-roots-3.jpg.svg",
      ],
      testimonial: {
        quote:
          "Divya told our story the way we always felt it. The donations spoke for themselves.",
        name: "Anita Shrestha",
        role: "Director, Roots Foundation",
      },
      published_date: "2023-12-08",
    },
    {
      slug: "aurora-fashion-film",
      title: "Aurora — A Fashion Film in Motion",
      category: "Creative Direction",
      client: "Aurora Atelier",
      description:
        "A short fashion film and campaign for a sustainable studio in Sydney.",
      challenge:
        "Aurora made beautiful slow-fashion but competed against fast-fashion noise. They needed to make 'sustainable' feel aspirational, not preachy.",
      strategy:
        "We shot a dreamlike film at golden hour, scored it like cinema, and built a campaign about permanence over trends. Less sell, more spell.",
      results: {
        engagement: "+198%",
        reach: "1.2M",
        conversions: "7.8k",
      },
      images: [
        "/images/work-aurora-1.jpg.svg",
        "/images/work-aurora-2.jpg.svg",
        "/images/work-aurora-3.jpg.svg",
      ],
      testimonial: {
        quote:
          "She understood the brand better than we did. The film still gets shared a year later.",
        name: "Elena Costa",
        role: "Creative Lead, Aurora Atelier",
      },
      published_date: "2023-10-15",
    },
    {
      slug: "pulse-fitness-challenge",
      title: "Pulse — A Challenge That Went Viral",
      category: "Social Media",
      client: "Pulse Fitness",
      description:
        "A 30-day community fitness challenge built for shareability and retention.",
      challenge:
        "Pulse had churn problems. People joined, stalled, and left. They needed a reason to show up daily.",
      strategy:
        "We gamified the journey with daily prompts, user-generated content, and a warm community host. Progress was celebrated publicly, never shamed.",
      results: {
        engagement: "+510%",
        reach: "3.3M",
        conversions: "22k",
      },
      images: [
        "/images/work-pulse-1.jpg.svg",
        "/images/work-pulse-2.jpg.svg",
        "/images/work-pulse-3.jpg.svg",
      ],
      testimonial: {
        quote:
          "Our retention doubled. The challenge became the brand.",
        name: "Jordan Blake",
        role: "CEO, Pulse Fitness",
      },
      published_date: "2023-08-02",
    },
  ],
  blog: [
    {
      slug: "why-warm-wins",
      title: "Why Warm Always Wins in a Cold Feed",
      excerpt:
        "Audiences are tired of being sold to. Here's why the brands that feel human are the ones that win — and how to get there without losing your edge.",
      content:
        "We've optimised ourselves into a corner. Every brand is 'data-driven', 'seamless', and 'best-in-class' — and every brand sounds the same. The antidote isn't louder, it's warmer. Warmth is the signal that a human made this, and humans trust humans.\n\nStart small: write like you talk. Show the mess. Celebrate a customer in public. The algorithm rewards the same thing your audience does — attention that's actually earned.",
      category: "Branding",
      featured_image: "/images/blog-warm.jpg.svg",
      published_date: "2024-10-01",
      read_time: "5 min read",
    },
    {
      slug: "story-before-strategy",
      title: "Story Before Strategy (But Never Instead Of It)",
      excerpt:
        "Strategy without story is a spreadsheet. Story without strategy is a campfire no one finds. Here's how to hold both.",
      content:
        "I get asked which comes first, the story or the strategy. The honest answer: they're the same conversation viewed from different seats. Strategy decides where you're going; story decides why anyone comes with you.\n\nSpend an afternoon with the 'why'. Then spend a week making sure the 'how' can actually deliver it. Neither survives alone.",
      category: "Strategy",
      featured_image: "/images/blog-story.jpg.svg",
      published_date: "2024-09-18",
      read_time: "6 min read",
    },
    {
      slug: "making-3d-feel-human",
      title: "Making 3D Feel Human, Not Technical",
      excerpt:
        "Three.js and WebGL are incredible — and incredibly easy to make feel cold. A few principles for warmth in interactive 3D.",
      content:
        "The trap with 3D on the web is spectacle for its own sake. Floating shapes that mean nothing. Parallax that makes people queasy. The fix is restraint and intent.\n\nUse motion to guide, not to impress. Keep a human palette. And always, always give the user a reason to feel something before you give them a reason to be impressed.",
      category: "Creativity",
      featured_image: "/images/blog-3d.jpg.svg",
      published_date: "2024-08-27",
      read_time: "7 min read",
    },
    {
      slug: "small-budgets-big-ideas",
      title: "Small Budgets, Big Ideas",
      excerpt:
        "Constraints are a creative director's best friend. A field guide to making work that punches far above its spend.",
      content:
        "Give me a tiny budget and a clear brief over a huge budget and a vague one, any day. Constraints force the idea to do the heavy lifting.\n\nBorrow attention, don't buy it. Partner with people who already have the room you need. And remember: a great idea filmed on a phone beats a mediocre one filmed on a crane.",
      category: "Tips",
      featured_image: "/images/blog-budget.jpg.svg",
      published_date: "2024-07-09",
      read_time: "4 min read",
    },
  ],
  testimonials: [
    {
      quote:
        "Divya is the rare creative who understands the spreadsheet and the soul. Our launch was the best we've ever had.",
      name: "Priya Raman",
      role: "Founder",
      company: "Lumen Beauty",
      avatar: "/images/avatar-1.jpg.svg",
    },
    {
      quote:
        "Working with her felt like brainstorming with a friend who happens to be brilliant. The work speaks for itself.",
      name: "Tom Whitfield",
      role: "Co-owner",
      company: "Harbour Coffee",
      avatar: "/images/avatar-2.jpg.svg",
    },
    {
      quote:
        "She turned our quiet little nonprofit into a story the whole world wanted to share. Pure magic.",
      name: "Anita Shrestha",
      role: "Director",
      company: "Roots Foundation",
      avatar: "/images/avatar-3.jpg.svg",
    },
    {
      quote:
        "Strategic, warm, and relentlessly talented. I'd hire Divya again in a heartbeat.",
      name: "Mei Lin",
      role: "Head of Marketing",
      company: "Wanderlust Travel",
      avatar: "/images/avatar-4.jpg.svg",
    },
  ],
  contact: {
    email: "divya.australia01@gmail.com",
    phone: "0481 614 090",
    location: "Sydney, Australia / Kathmandu, Nepal",
    socials: [
      { platform: "Instagram", url: "https://instagram.com/divya.kc" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/divya-kc" },
      { platform: "Behance", url: "https://behance.net/divyakc" },
      { platform: "Dribbble", url: "https://dribbble.com/divyakc" },
    ],
    availability: "Currently taking on select projects for Q3 2026",
  },
};
