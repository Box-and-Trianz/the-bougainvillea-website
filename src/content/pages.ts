// Content migrated from thebougainvilleas.com that the redesign concept did not include.

/* ---------------------------------- Packages ---------------------------------- */

export type PackageItem = { name: string; text: string; image: string; tag?: string };
export type PackageGroup = { key: string; title: string; items: PackageItem[] };

export const packageGroups: PackageGroup[] = [
  {
    key: "weddings",
    title: "Weddings & Engagements",
    items: [
      {
        name: "Silver Package",
        image: "/images/packages/silver.jpg",
        text: "For couples looking to enjoy a customizable package that includes all the essentials for a reception with the choice of hiring your own caterer, this is the ideal option.",
      },
      {
        name: "Diamond Package",
        tag: "Most Popular",
        image: "/images/packages/diamond.jpg",
        text: "Our most popular wedding package includes everything you need for your perfect wedding reception. You'll also enjoy the choice of six menus to satisfy your taste.",
      },
    ],
  },
  {
    key: "corporate",
    title: "Corporate Events",
    items: [
      {
        name: "Corporate",
        image: "/images/packages/corporate.jpg",
        text: "Perfect for seminars or workshops of any size, this package comes with custom food options and all your audio/visual needs. The flexible workspace accommodates multiple conference and networking sessions.",
      },
      {
        name: "Galas & Dinners",
        image: "/images/packages/galas-dinners.jpg",
        text: "Planning a black-tie event or a fundraiser? This package has all that you need, from modular spaces to customizable menus and decor. Go over the top with our open bar.",
      },
      {
        name: "Holiday Parties",
        image: "/images/packages/holiday-parties.jpg",
        text: "The perfect package for any holiday event comes with customizable dinner menus, our signature dessert bar, topped off with seasonal themed decor.",
      },
    ],
  },
  {
    key: "social",
    title: "Social Events",
    items: [
      {
        name: "Birthdays & Graduations",
        tag: "Most Popular",
        image: "/images/packages/birthdays-graduations.jpg",
        text: "Our most popular party package comes with a full dinner, basic linens and unlimited non-alcoholic beverages. Bring your own cake or explore our cake options today!",
      },
      {
        name: "Quinceañeras",
        image: "/images/packages/quinceaneras.jpg",
        text: "Your daughter only turns 15 once. Make the occasion unforgettable with food, music, and options guaranteed to appeal to every generation at the table.",
      },
    ],
  },
];

/* ------------------------------------ FAQ ------------------------------------ */

export type Faq = { q: string; a: string };
export type FaqGroup = { title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "The Venue",
    items: [
      { q: "How long has The Bougainvilleas been open?", a: "The Bougainvilleas was founded in October of 2013." },
      {
        q: "What is your venue capacity?",
        a: "The Grand Ballroom (5,000 sq ft) is designed for 100 guests, up to 300 with a dance floor and 340 guests without a dance floor. The Chapel (1,728 sq ft) is used for ceremonies, smaller celebrations and workshops — 175 guests for a ceremony, 80 for a reception with a dance area and 100 without. The Wine Room seats 32 guests, or 40 cocktail style.",
      },
      { q: "Is your venue handicapped accessible?", a: "Yes, it is." },
      { q: "What is the size of the dance floor in the ballroom?", a: "The built-in dance floor in the ballroom is 20′ × 25′." },
      {
        q: "What size tables do you offer?",
        a: "We have 72″ round tables, 6 ft tables, 8 ft tables and rectangular tables in different sizes. We also have serpentine (half-moon) tables.",
      },
      {
        q: "Is décor included with the venue rental?",
        a: "Linens, candles, and non-floral centerpieces are included. Any additional décor can be rented by the client through a décor vendor.",
      },
      {
        q: "Do you host multiple events simultaneously?",
        a: "We only host one wedding per day. However, we do allow other events to book separate spaces on the same day.",
      },
      {
        q: "What days are you available for calls or meetings?",
        a: "We are closed on Sundays & Mondays unless we are hosting an event. We are also closed on Christmas Eve, New Year's Day, Thanksgiving Day, and the Fourth of July. We offer some weekday evening appointments and Saturdays, pending events.",
      },
    ],
  },
  {
    title: "Food & Drink",
    items: [
      { q: "Do you offer in-house catering?", a: "Yes. The Bougainvilleas has a fully equipped kitchen and chef onsite and offers six different menus." },
      {
        q: "Can you accommodate dietary restrictions?",
        a: "We offer halal, vegan, vegetarian, and gluten-free meals. Please ask us about any other restrictions you may have.",
      },
      {
        q: "Do you allow outside catering?",
        a: "Yes, outside catering is permitted if your caterer is licensed and insured. A $5 per person fee is assessed for associated costs.",
      },
      { q: "Is your kitchen kosher?", a: "Our kitchen is not kosher-compliant and cannot be." },
      {
        q: "Will I get to try the food?",
        a: "We offer complimentary food tastings for booked clients. Food tastings are hosted once a month, time permitting.",
      },
      { q: "Will I get a cake tasting?", a: "Yes, we will schedule a consultation to taste and choose your cake design." },
      { q: "Can I bring in my own alcohol?", a: "The Bougainvilleas is TABC licensed and cannot allow outside alcohol." },
      { q: "Do you offer kids' meals?", a: "Yes, we offer a few options at $15 per meal if the kids are not included in your guest count." },
    ],
  },
  {
    title: "Booking & Payment",
    items: [
      { q: "What is the deposit to book my event?", a: "The deposit is 30% of the package you choose and is non-refundable." },
      {
        q: "What forms of payment do you accept?",
        a: "Cash, personal checks, cashier's checks, money orders, credit cards, Zelle (QuickPay) and Venmo. All credit card transactions are subject to a 3.5% processing fee. Personal checks need a full two weeks to clear before an event.",
      },
      { q: "Do you offer a military discount?", a: "Yes — a 10% military discount with a valid military ID. It cannot be combined with any other discounts." },
      { q: "What other fees will be added?", a: "Sales tax and a service charge are added to any event package." },
      {
        q: "Why do I have to pay gratuity?",
        a: "To provide you and your guests with the best experience, we hire a team of experts to coordinate, set up, prepare your meals, serve everyone, and clean up after all the fun is over.",
      },
      { q: "Do I have to pay for kids?", a: "Kids 5 years and under are free of charge; 6 years and up are charged as an adult." },
    ],
  },
  {
    title: "Your Event Day",
    items: [
      { q: "What is the latest my event can go until?", a: "The latest is 2 AM — our permit doesn't allow us to operate beyond that point." },
      { q: "Can I add additional hours to my event?", a: "Yes, additional hours are $800 per hour." },
      {
        q: "Can I add guests after booking my event?",
        a: "Yes. Your final guest count is due 3 weeks before a wedding, and 2 weeks before other types of events.",
      },
      {
        q: "Can I bring my own vendors?",
        a: "Yes. Vendors not on our preferred list are required to fill out a vendor form that is subject to venue management approval. All vendors must carry liability insurance.",
      },
    ],
  },
];

/* --------------------------------- Our Family --------------------------------- */

export const culture = {
  title: "Nurturing a culture rooted in values and harmony.",
  paragraphs: [
    "At our core lies a rich cultural tapestry woven with deep-rooted beliefs in the essence of balance and values. Gratitude, compassion, and sincerity are not just words; they are the very fibers that compose the fabric of our operations. Our philosophy extends to our steadfast faith in the potency of family unity and the empowerment of education.",
    "Creativity is our heartbeat, and we welcome it with arms wide open. An open-door policy symbolizes our commitment to fostering an environment where ideas flow freely, unencumbered by barriers. Within our community, diversity is cherished, and differences are honored even before the echoes of our commonalities.",
    "In the face of challenges, we stand strong as a united front. Extending a hand to one another during times of crisis is not just a choice; it is the compass guiding us forward. As event planners, we carry these values close to our hearts, infusing every moment we craft with authenticity, empathy, and unity.",
  ],
  values: ["Gratitude", "Compassion", "Sincerity", "Family", "Education", "Creativity"],
};

export type TeamMember = { name: string; role: string; eyebrow: string; title: string; image: string; bio: string[]; quote: { text: string; author: string } };

export const team: TeamMember[] = [
  {
    name: "Badra Andrews",
    role: "CEO & Owner",
    eyebrow: "Making Dreams Come True",
    title: "Badra Andrews",
    image: "/images/our-family/badra-andrews.jpg",
    bio: [
      "A noted businesswoman, Badra is known for exceptional customer service. She has an incredible eye for detail and the ability to transform a venue while constantly exceeding her clients' expectations. With over 30 years in the hospitality industry, Badra has become a lead mentor to everyone she meets.",
      "Badra is a proud Goldman Sachs 10,000 Small Businesses alumna and served as president of the National Association of Women Business Owners — Houston Chapter in 2020–2021.",
      "She has a smile that brightens up any room, and when she is not working she enjoys morning strolls and her three adorable grandchildren.",
    ],
    quote: { text: "Fantastic service, food was EXCELLENT, elegant environment and the value was incredible.", author: "Dan O." },
  },
  {
    name: "Javier Solis",
    role: "Executive Chef",
    eyebrow: "The Secret Ingredient Is Love",
    title: "Chef Javier Solis",
    image: "/images/our-family/chef-javier-solis.jpg",
    bio: [
      "Chef Javier has been in the industry for over 26 years. He moved to the U.S. at the age of 16 and joined the hotel industry, then worked for some of Houston's finest restaurants until he joined The Bougainvilleas family in 2014.",
      "His passion and creativity continue to amaze our clients every day. He is known for his unique food designs, working gracefully under pressure, and beautiful fruit carvings.",
      "On his day off, Javier enjoys painting, crafts, and being a loving husband and father of six.",
    ],
    quote: { text: "The real showstopper however was the food — OMG!", author: "Omar S." },
  },
];

export const designQuotes = [
  { text: "This is 100% the place to have any reception, the staff is AWESOME.", author: "Asmiria J." },
  { text: "I was impressed with the quality and the attention I got from Elisabet.", author: "Luceli L." },
  { text: "Beautiful venue in Houston! Warm, loving and caring staff.", author: "Yasmin A." },
];

/* ---------------------------------- Catering ---------------------------------- */

export const cuisines = [
  "Traditional American",
  "Cajun",
  "Barbecue",
  "Mexican",
  "Italian",
  "French",
  "Mediterranean",
  "Sushi",
  "Vegan",
];

export const cateringPartners = [
  { name: "Café Caspian", cuisine: "Persian" },
  { name: "Kim Son", cuisine: "Vietnamese" },
  { name: "Aga's", cuisine: "South Asian" },
];

export const dietaryOptions = ["Halal", "Vegan", "Vegetarian", "Gluten-free"];

export const cateringGallery = Array.from(
  { length: 16 },
  (_, i) => `/images/catering/menu/menu-${String(i + 1).padStart(2, "0")}.jpg`
);

/* ------------------------------ Corporate Events ------------------------------ */

export const corporateReasons = [
  {
    title: "Professional Impression",
    subtitle: "Host with confidence",
    text: "From polished décor to flawless service, we help you make the right impression — whether you're hosting VIPs, clients, or your internal leadership team. Your brand reputation is in good hands.",
  },
  {
    title: "Flexible Space, Seamless Flow",
    subtitle: "Built for business needs",
    text: "Whether you're organizing a panel discussion, product launch, team appreciation night, or board dinner, our adaptable rooms and clear layout ensure smooth transitions and an optimal guest experience.",
  },
  {
    title: "Full-Service Efficiency",
    subtitle: "We handle everything",
    text: "Save time and reduce stress with our all-in-one support. Catering, layout, A/V, décor, parking, staffing — it's all included or easily arranged through our trusted in-house team.",
  },
  {
    title: "Prime Location With Parking",
    subtitle: "Easy to access, easy to love",
    text: "Located in West Houston with exclusive use of surrounding parking after 5 PM, our venue offers convenience without compromise. Your guests won't struggle to park, find the space, or settle in.",
  },
];

export const corporateUses = [
  "Executive off-site retreats in the Wine Room with chef-curated lunch or dinner",
  "All-hands staff meetings or quarterly reviews in the Elegant Event Space",
  "Full-scale holiday galas or award ceremonies in the Grand Ballroom",
  "Team-building workshops or leadership training across multiple rooms",
  "Breakfast briefings or networking mixers with customizable layouts",
  "Multi-room product launches with breakout sessions and private lounges",
  "Industry panels and Q&A forums with stage lighting and A/V support",
  "VIP client appreciation dinners in the Wine Room with sommelier service",
  "Investor presentations or board meetings with private entry",
  "Company anniversary celebrations using the full facility",
  "Conference-style gatherings with guest check-in, buffet service, and breakout rooms",
  "Evening receptions or cocktail parties with indoor/outdoor flow via the courtyard",
  "Creative off-site planning days with separate zones for brainstorming, dining, and debriefs",
  "Association luncheons, nonprofit fundraisers, or brand partner recognition events",
];

export const corporateSpaces = [
  {
    name: "Wine Room",
    capacity: "30–40 guests",
    slug: "the-wine-room",
    image: "/images/venues/the-wine-room/cover.jpg",
    text: "An executive favorite for strategy retreats, team dinners, and VIP client engagements. Warm ambiance, personalized service, and culinary experiences available.",
  },
  {
    name: "Elegant Event Space",
    capacity: "Up to 220 guests",
    slug: "the-chapel",
    image: "/images/venues/the-chapel/cover.jpg",
    text: "Perfect for seminars, networking events, cocktail-style receptions, or training sessions. Flexible layouts and modern design create an elevated but functional atmosphere.",
  },
  {
    name: "Grand Ballroom",
    capacity: "Up to 350 guests",
    slug: "the-grand-ballroom",
    image: "/images/venues/the-grand-ballroom/cover.jpg",
    text: "A stunning space for galas, annual meetings, awards dinners, and large-scale celebrations. Includes stage access, dance floor, and custom lighting options.",
  },
];

export const locationPoints = [
  {
    title: "Premium Location",
    text: "Situated on Westheimer Road between Beltway 8 and Gessner — central to Houston's major business districts, hotels, and airports.",
  },
  { title: "Seamless Access", text: "Just minutes from I-10, 59, and the Westpark Tollway — perfect for guests coming from all parts of Houston and beyond." },
  { title: "Ample Parking", text: "Over 250 dedicated spaces, with overflow access after 5 PM. No shuttles, no valet stress, no circling the block." },
  {
    title: "Professional Arrival",
    text: "A clearly marked main entrance, accessible pathways, and a clean, welcoming curb appeal for daytime or evening events.",
  },
  { title: "Walkable Amenities", text: "Nearby hotels, cafés, and retail make it easy to extend your event or support out-of-town guests." },
];

export const bookingSteps = [
  { title: "Submit an Inquiry", text: "Share your preferred date, guest count, and event type. Our team responds within one business day." },
  {
    title: "Schedule a Tour",
    text: "We'll guide you through the space, discuss package options, and help you visualize the flow of your event — in person or virtually.",
  },
  {
    title: "Receive a Custom Proposal",
    text: "Based on your goals and budget, we'll craft a tailored package covering catering, room setup, A/V needs, and a timeline.",
  },
  { title: "Lock in Your Date", text: "Once you're ready, we'll finalize the agreement and secure your booking with a deposit." },
  {
    title: "Enjoy White-Glove Support",
    text: "From setup to breakdown, our team keeps your event running smoothly so you can focus on your guests rather than the details.",
  },
];

export const corporateGallery = [
  "/images/corporate/events/events-01.jpg",
  "/images/corporate/events/events-02.jpg",
  "/images/corporate/events/events-03.jpg",
  "/images/corporate/events/events-04.jpg",
  "/images/corporate/events/events-05.jpg",
  "/images/corporate/events/events-06.jpg",
  "/images/corporate/events/events-07.jpg",
  "/images/corporate/events/events-08.jpg",
];

/* ------------------------------ More testimonials ------------------------------ */

export type Review = { name: string; event: string; quote: string; avatar?: string };

export const moreTestimonials: Review[] = [
  { name: "Jessica J.", event: "Corporate Event — 2018", quote: "Incredible venue for any special event! Their in-house kitchen cranked out some delicious finger foods for our event. Rasha & staff have partnered with the most excellent vendors for your party planning needs. What a perfect evening at The Bougainvilleas." },
  { name: "Latasha & Wilbert", event: "Wedding — 2018", quote: "The Bougainvilleas exceeded my expectations — from the decorations and venue setting to the food presentation and taste. The customer service is top notch! I have recommended this venue to all my friends." },
  { name: "Chaniece & Anthony", event: "Wedding — 2018", quote: "I can't say enough good things about this venue and the team behind it. Everything was more beautiful than I could have ever imagined. I just showed up, got married, had a great time, and Rasha made sure everything went as I had so diligently planned. P.S. The food here is GREAT." },
  { name: "Valica & Ray", event: "Wedding — 2018", quote: "We were planning our Texas wedding from Louisiana. As soon as we walked in, everything was absolutely beautiful — we booked our wedding right then and there. People are still talking about how elegant and fun our wedding was." },
  { name: "Manal & Omar", event: "Wedding — 2018", quote: "I had the best wedding that anyone can ask for — thank you so much to Badra and Rasha! The staff is amazing and I am so blessed that I picked the right place." },
  { name: "Yasmin A.", event: "Baby Shower — 2018", quote: "Beautiful venue! Warm, loving and caring staff. They made my baby shower an unforgettable event. In one word they were PERFECT!" },
  { name: "Rosedel B.", event: "50th Birthday — 2018", quote: "I can't gush enough about this place. From the planning to execution, Rasha and team made my sister's surprise birthday party a huge success." },
  { name: "Yurika D.", event: "Corporate Events — 2017–2020", quote: "They take care of every detail for our events, from the venue settings and menu selection to our guests' special dietary needs. If you are looking for great customer service, attention to detail, delicious food and a great atmosphere, this is the place to be." },
  { name: "Ashley R.", event: "Wedding — 2018", quote: "This venue is a hidden gem! The Wine Room was just the room I had been hunting for — the perfect size for our intimate gathering. The in-house food was perfect and the culinary skills of Javier and the kitchen staff were spot on." },
  { name: "Hina S.", event: "40th Birthday — 2018", quote: "It was everything that I had envisioned and more. The food was not only beautiful to look at, but also incredibly delicious — and the dessert table was a sight to see!" },
  { name: "Idara & Dwayne", event: "Wedding — 2017", quote: "It was the best day of my life. Rasha and the rest of the staff made sure that no matter what happened during the night, my husband and I enjoyed ourselves. If you are looking for a venue for your wedding, I truly recommend The Bougainvilleas." },
  { name: "Renee & Jason", event: "Wedding — 2017", quote: "The Bougainvilleas really is a hidden gem — when you walk in, you feel like you're in a whole different city! The Chapel was perfect for our ceremony and reception for 50 guests." },
  { name: "Jenny & Luis", event: "Wedding — 2017", quote: "Badra, the owner, did everything in her power to ensure our wedding day ran smoothly. They didn't treat us as just another wedding — they knew us by first name and made sure every item on our wish list was met." },
  { name: "Angie & Froy", event: "Wedding — 2017", quote: "I didn't have to stress about anything because Rasha took care of it all. I pinched myself four times because I couldn't believe how stunning the reception room looked!" },
  { name: "Houston Area Urban League Guild", event: "Red Carpet Gala — 2017", quote: "Rasha worked diligently with us on all levels — linens, centerpieces, chair sashes and a food tasting. The staff decorated the ballroom to our specifications and the food was awesome." },
  { name: "Nadia & Moe", event: "Wedding — 2017", quote: "We had 300 guests and they were impressed. Our package included food, cake, lights and several other things, which made everything much easier. Highly recommended." },
  { name: "Carolina P.", event: "Non-Profit Gala — 2016", quote: "What a beautiful gala, splendid place, awesome food and professional service from the very beginning. Thank you for supporting our organization." },
  { name: "Rachel & Brian", event: "Wedding — 2016", quote: "When people ask me how it went, I respond with: it was absolutely perfect. Not a single thing went wrong. The venue was stunning, down to every detail." },
  { name: "Hashim Family", event: "Daughter's Wedding — 2015", quote: "We planned our daughter's wedding from Dallas with barely one month to do it. From the decor to the delicious food and outstanding service — it was immaculate. A wedding fit for a princess!" },
  { name: "Becca & Luke", event: "Wedding — 2016", quote: "Rasha made sure I could enjoy a meal at my wedding that was safe for my dietary needs AND delicious. She was so incredibly kind, and it meant the world to us." },
];
