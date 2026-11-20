// Content extracted from the original site

export type Venue = { slug: string; name: string; blurb: string; capacitySeated: number; capacityTheater: number; image: string; gallery: string[]; description: string; facts?: string[] };
export type NavLink = { label: string; path: string };
export type NavItem = NavLink & { mega?: boolean; children?: NavLink[] };

export const site = {
  "name": "The Bougainvilleas",
  "tagline": "West Houston's Premier Event Venue",
  "phone": "832-914-7844",
  "email": "info@TheBougainvilleas.com",
  "address": "12126 Westheimer Rd",
  "city": "Houston, TX 77077",
  "social": {
    "facebook": "https://www.facebook.com/BougainvilleasHouston/",
    "instagram": "https://www.instagram.com/bougainvilleas_houston/",
    "pinterest": "https://www.pinterest.com/bougainvilleas/",
    "linkedin": "https://www.linkedin.com/company/the-bougainvilleas-event-center"
  }
};

export const navItems: NavItem[] = [
  {
    "label": "Home",
    "path": "/"
  },
  {
    "label": "About",
    "path": "/our-family",
    "children": [
      { "label": "Our Family", "path": "/our-family" },
      { "label": "Testimonials", "path": "/testimonials" },
      { "label": "FAQ", "path": "/faq" },
      { "label": "Journal", "path": "/blog" }
    ]
  },
  {
    "label": "Venues",
    "path": "/gallery",
    "mega": true
  },
  {
    "label": "Packages",
    "path": "/packages"
  },
  {
    "label": "Catering",
    "path": "/catering"
  },
  {
    "label": "Corporate",
    "path": "/business-events"
  },
  {
    "label": "Contact",
    "path": "/contact"
  }
];

/** Flat list of every primary page, used by the footer and mobile menu. */
export const allPages: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "Our Family", path: "/our-family" },
  { label: "Pick Your Room", path: "/gallery" },
  { label: "Packages", path: "/packages" },
  { label: "Catering", path: "/catering" },
  { label: "Corporate Events", path: "/business-events" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "FAQ", path: "/faq" },
  { label: "Journal", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Schedule a Tour", path: "/schedule-a-tour" },
];

export const venues: Venue[] = [
  {
    "slug": "the-grand-ballroom",
    "name": "The Grand Ballroom",
    "blurb": "Our crown jewel — a sweeping, light-filled hall engineered for the grandest celebrations Houston has to offer.",
    "capacitySeated": 300,
    "capacityTheater": 500,
    "image": "/images/venues/the-grand-ballroom/cover.jpg",
    "gallery": [
      "/images/venues/the-grand-ballroom/gallery-1.jpg",
      "/images/venues/the-grand-ballroom/gallery-2.jpg",
      "/images/venues/the-grand-ballroom/gallery-3.jpg"
    ],
    "description": "The Grand Ballroom is the heart of The Bougainvilleas — a luminous, column-free hall designed to host up to 300 seated guests or 500 in theater style. Whether you envision a lavish wedding reception, a black-tie corporate gala, or a quinceañera of unforgettable scale, the Ballroom adapts to your vision with flexible layouts, dedicated planning, and all-day access for setup.",
    "facts": ["5,000 sq ft of event space", "Built-in 20′ × 25′ dance floor", "Complimentary colored uplighting", "Stage access & custom lighting options", "Up to 340 guests without a dance floor"]
  },
  {
    "slug": "the-chapel",
    "name": "The Chapel",
    "blurb": "An intimate, signature-aesthetic sanctuary for ceremonies and gatherings that deserve a quieter kind of grandeur.",
    "capacitySeated": 90,
    "capacityTheater": 220,
    "image": "/images/venues/the-chapel/cover.jpg",
    "gallery": [
      "/images/venues/the-chapel/gallery-1.jpg",
      "/images/venues/the-chapel/gallery-2.jpg",
      "/images/venues/the-chapel/more/more-01.jpg",
      "/images/venues/the-chapel/more/more-03.jpg",
      "/images/venues/the-chapel/more/more-04.jpg",
      "/images/venues/the-chapel/more/more-05.jpg",
      "/images/venues/the-chapel/more/more-02.jpg",
      "/images/venues/the-chapel/more/more-06.jpg"
    ],
    "description": "Our signature aesthetic space, The Chapel seats 90 guests for intimate events or 220 in theater style. Suitable for all types of events — ceremonies, receptions, birthday celebrations, baby showers, and bridal showers — The Chapel brings warmth and refinement to every gathering it holds.",
    "facts": ["1,728 sq ft", "175 guests for ceremonies", "French doors & natural light", "Contemporary architecture", "Ideal for bridal & baby showers"]
  },
  {
    "slug": "the-wine-room",
    "name": "The Wine Room",
    "blurb": "A jewel-box of a room — rich, candlelit, and made for the kind of close conversation that becomes a memory.",
    "capacitySeated": 32,
    "capacityTheater": 40,
    "image": "/images/venues/the-wine-room/cover.jpg",
    "gallery": [
      "/images/venues/the-wine-room/gallery-1.jpg",
      "/images/venues/the-wine-room/gallery-2.jpg",
      "/images/venues/the-wine-room/gallery-3.jpg"
    ],
    "description": "The Wine Room is our most intimate space, seating 32 guests or hosting 40 cocktail-style. With its warm ambiance and refined detailing, it is the perfect setting for rehearsal dinners, milestone birthdays, wine tastings, and gatherings where closeness is the whole point.",
    "facts": ["32 seated · 40 cocktail style", "Executive retreats & board dinners", "Chef-curated menus & sommelier service", "Play your own music — quiet or loud"]
  },
  {
    "slug": "the-bougainvilleas",
    "name": "The Bougainvilleas",
    "blurb": "The full venue experience — every room, every detail, orchestrated into a single seamless celebration.",
    "capacitySeated": 350,
    "capacityTheater": 500,
    "image": "/images/venues/the-bougainvilleas/cover.jpg",
    "gallery": [
      "/images/venues/the-bougainvilleas/cover.jpg",
      "/images/venues/the-bougainvilleas/gallery-2.jpg",
      "/images/venues/the-bougainvilleas/gallery-3.jpg"
    ],
    "description": "When you book The Bougainvilleas in its entirety, you unlock the full canvas — the Grand Ballroom, the Chapel, and the Wine Room, woven together by our dedicated planning team. It is the choice for celebrations that deserve every room and every moment of attention.",
    "facts": ["Grand Ballroom, Chapel & Wine Room", "Indoor/outdoor flow via the courtyard", "Over 250 dedicated parking spaces", "Fully equipped kitchen & chef onsite", "Handicapped accessible"]
  },
  {
    "slug": "the-wedding-suite",
    "name": "The Wedding Suite",
    "blurb": "A private bridal retreat — quiet luxury for the moments before you walk into forever.",
    "capacitySeated": 12,
    "capacityTheater": 20,
    "image": "/images/venues/the-wedding-suite/cover.jpg",
    "gallery": [
      "/images/venues/the-wedding-suite/cover.jpg",
      "/images/venues/the-wedding-suite/gallery-2.jpg"
    ],
    "description": "The Wedding Suite is a private, light-filled retreat reserved for the couple and their closest circle — a space to breathe, prepare, and savor the quiet luxury of the hours before the celebration begins.",
    "facts": ["Private bridal retreat", "Room for the couple & their closest circle", "Light-filled & ready for photos", "Steps from the Chapel & Ballroom"]
  }
];

export const eventTypes = [
  {
    "key": "weddings",
    "title": "Weddings",
    "image": "/images/hero/hero-1.jpg",
    "text": "We know how important it is to get every detail right for your big day, and our experienced management team is ready to handle your ceremony and reception no matter how formal, lavish, or private. Our unique wedding packages are customized to fit your needs and budget, ensuring a memorable experience every time.",
    "points": [
      "Tailored, all-inclusive wedding packages",
      "In-house planning & day-of coordinator",
      "All-day access for setup",
      "Flexible payment plans"
    ]
  },
  {
    "key": "corporate",
    "title": "Corporate Events",
    "image": "/images/hero/hero-3.jpg",
    "text": "Whether you're planning a corporate workshop for your employees or want to celebrate your success with a black-tie event, we are on-hand to organize the perfect event for your business needs. Our venue is equipped to cater for corporate events and workshops, and provides a flexible space for networking and conference set-ups.",
    "points": [
      "Flexible conference & networking layouts",
      "Customizable dinner menus & decor",
      "Ideal for holiday parties & galas",
      "Free accessible parking"
    ]
  },
  {
    "key": "social",
    "title": "Social Events",
    "image": "/images/hero/hero-4.jpg",
    "text": "There's always an excuse for a party! Celebrate special occasions, birthdays, anniversaries, and graduations with our custom party packages, all tailored to incorporate those little extras to make the celebration one to remember.",
    "points": [
      "Birthdays, anniversaries & graduations",
      "Quinceañeras & milestone celebrations",
      "Personalized for every guest of honor",
      "Menus tailored to dietary needs"
    ]
  }
];

export const whyUs = [
  "Experienced with Houston's diverse clientele",
  "We only book one wedding a day",
  "In-house planning & day-of coordinator",
  "Clients have all-day access for setup",
  "Flexible payment plans",
  "Convenient multipurpose rooms for intimate or large guest counts",
  "Highly flexible & customizable packages",
  "Menus tailored to your specific dietary needs",
  "Free accessible parking"
];

export const heroImages = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
  "/images/hero/hero-4.jpg",
  "/images/hero/hero-5.jpg"
];

export const storyImage = "/images/about/our-story.jpg";

export const partners = [
  {
    "name": "NAWBO Houston",
    "image": "/images/partners/nawbo-houston.jpg",
    "link": "https://nawbo.org/"
  },
  {
    "name": "Weddings in Houston",
    "image": "/images/partners/weddings-in-houston.png",
    "link": "https://www.weddingsinhouston.com/vendor/bougainvilleas-the/"
  },
  {
    "name": "NACE",
    "image": "/images/partners/nace.jpg",
    "link": "https://www.nace.net/chapters/houston"
  },
  {
    "name": "Couples Choice Awards 2019",
    "image": "/images/partners/couples-choice-awards-2019.png",
    "link": "https://www.weddingwire.com/biz/the-bougainvilleas-houston/c71c2a3708f1bec6.html"
  },
  {
    "name": "Couples Favorite",
    "image": "/images/partners/couples-favorite.png",
    "link": "https://www.weddingsinhouston.com/vendor/bougainvilleas-the/"
  },
  {
    "name": "Goldman Sachs 10KSB",
    "image": "/images/partners/goldman-sachs-10ksb.jpg",
    "link": "https://www.goldmansachs.com/community-transformation/10000-small-businesses/us"
  },
  {
    "name": "Wedding Venue Owners",
    "image": "/images/partners/wedding-venue-owners.png",
    "link": "https://weddingvenueowners.com/"
  },
  {
    "name": "2015 Couples Favorite",
    "image": "/images/partners/2015-couples-favorite.jpg",
    "link": "https://www.weddingsinhouston.com/vendor/bougainvilleas-the/"
  },
  {
    "name": "Couples Choice Awards 2017",
    "image": "/images/partners/couples-choice-awards-2017.png",
    "link": "https://www.weddingwire.com/biz/the-bougainvilleas-houston/c71c2a3708f1bec6.html"
  },
  {
    "name": "Children's Miracle Network",
    "image": "/images/partners/childrens-miracle-network.png",
    "link": "https://cmn.org/hospital/texas-childrens-hospital/"
  }
];

export const testimonials = [
  {
    "name": "Vicki G.",
    "event": "Wedding",
    "quote": "The venue is beautiful inside and out, the food was delicious and I would redo my wedding over and over in this place.",
    "avatar": "/images/testimonials/vicki-g.jpg"
  },
  {
    "name": "Ginger N.",
    "event": "Wedding",
    "quote": "After marrying off 3 daughters, The Bougainvilleas was the best and easiest to work with.",
    "avatar": "/images/testimonials/ginger-n.jpg"
  },
  {
    "name": "Aubri N.",
    "event": "Catering — Mother's Day 2020",
    "quote": "I don't know what ya'll put in your food, but it was HEAVENLY!!!!! My mom, dad, and I could not stop talking about how amazing the food was. It really blew our minds! And my mom said it was the best Mother's Day ever!!",
    "avatar": "/images/testimonials/aubri-n.jpg"
  },
  {
    "name": "Tianna H.",
    "event": "Cocktail Reception — 2020",
    "quote": "Exceptional, world class accommodations and service within a beautifully appointed space that photographs like a dream tucked unobtrusively along Westheimer. Working with Rasha, Badra and the rest of the team at Bougainvilleas is always a DREAM! 5 stars and two thumbs way up!",
    "avatar": "/images/testimonials/tianna-h.jpg"
  },
  {
    "name": "Chelsea R.",
    "event": "Catering — Takeout 2020",
    "quote": "Amazing food available to order for pickup & delivery! We were amazed at the great prices for an amazing, better than restaurant quality meal. This event venue is going above and beyond to serve great food to the public every day.",
    "avatar": "/images/testimonials/chelsea-r.jpg"
  },
  {
    "name": "Melissa R.",
    "event": "Catering — Takeout 2020",
    "quote": "The Bougainvilleas has really put a bright side to today. We ordered Seafood Enchiladas for my sister's birthday since we can't do much — this was a treat to have delicious food catered. THANK YOU so much to Badra and her Staff.",
    "avatar": "/images/testimonials/melissa-r.jpg"
  },
  {
    "name": "Kendal M.",
    "event": "Senior Dance — 2020",
    "quote": "Could not have done it without Rasha! Rasha and her team were true professionals! Loved our event and highly recommend The Bougainvilleas!",
    "avatar": "/images/testimonials/kendal-m.jpg"
  },
  {
    "name": "Yolanda T.",
    "event": "Birthday Party — 2020",
    "quote": "I celebrated my milestone 40th birthday at the Bougainvilleas and it was a major success. Thank you to Rasha, event coordinator, and all the staff. People can't stop talking about the ambiance and food.",
    "avatar": "/images/testimonials/yolanda-t.jpg"
  },
  {
    "name": "Martha S.",
    "event": "Senior Dance — 2020",
    "quote": "My experience working with the event planner Rasha and Elisabet was exceptional!! They were our partners creating the space of magic for our Senior Dance. Super accommodating with what we needed. Very flexible in working with our budget. I highly recommend!",
    "avatar": "/images/testimonials/martha-s.jpg"
  },
  {
    "name": "J. Hernandez",
    "event": "Holiday Party — 2019",
    "quote": "We held our company Christmas Party at the Bougainvilleas and had just a wonderful time. Rasha and her team went above and beyond to make us and our employees feel comfortable. The food, decor and staff were amazing.",
    "avatar": "/images/testimonials/j-hernandez.jpg"
  },
  {
    "name": "Nicole M.",
    "event": "Birthday Party — 2019",
    "quote": "We celebrated my mom's 60th birthday at the Bougainvilleas and it was absolutely beautiful! Rasha and Kate were simply amazing during the planning process! They took our ideas and brought them to life. All of our guests raved about how delicious the food was and how beautiful the room looked.",
    "avatar": "/images/testimonials/nicole-m.jpg"
  },
  {
    "name": "Glenda M.",
    "event": "Holiday Party — 2019",
    "quote": "Beautiful venue inside and outside, great food, friendly and professional event planner (Rasha) and the working staff during the event. Our setup and decorations were perfection. I highly recommend The Bougainvilleas and will be having our company event again next January.",
    "avatar": "/images/testimonials/glenda-m.jpg"
  },
  {
    "name": "Natasha & Camron",
    "event": "Wedding — 2019",
    "quote": "I had my wedding reception here and it was awesome! The Bougainvilleas staff was super helpful, they explain everything that comes with their awesome packages! Rasha was and is very very helpful, she knows what she is doing! The food sooo good. Everything was beautiful and simple just how I wanted it!",
    "avatar": "/images/testimonials/vicki-g.jpg"
  },
  {
    "name": "Trey L.",
    "event": "Holiday Party — 2019",
    "quote": "Company christmas party was held there. The venue was spacious and elegant, food was good, but the real 5-star kicker was the staff — they were polite, alert, and attentive. Sometimes they would just appear with something you wanted before you even had to ask.",
    "avatar": "/images/testimonials/ginger-n.jpg"
  },
  {
    "name": "Laura & Jahan",
    "event": "Wedding — 2018",
    "quote": "We had 7 months to plan our wedding and we live over an hour away. As soon as we met Rasha, we instantly liked her. The Bougainvilleas gave us the most for our money and having Rasha with us every step of the way was a huge advantage. She made not only my wedding day, but everything leading up to it a stress-free, wonderful experience.",
    "avatar": "/images/testimonials/aubri-n.jpg"
  }
];

export const socialIcons = {
  "facebook": "/images/social/facebook.png",
  "instagram": "/images/social/instagram.png",
  "pinterest": "/images/social/pinterest.png",
  "linkedin": "/images/social/linkedin.png"
};

