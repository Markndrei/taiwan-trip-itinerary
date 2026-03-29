export interface Place {
  id: string;
  name: string;
  chineseName: string;
  city: string;
  description: string;
  longDescription: string;
  category: string;
  lat: number;
  lng: number;
  image: string;
  mustTry: string[];
  tips: string;
  duration: string;
  time: string; // suggested arrival time e.g. "9:00 AM"
}

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  chineseTitle: string;
  theme: string;
  places: string[]; // place IDs in visit order
  notes: string;
  logistics: string;
}

// ─────────────────────────────────────────
// PLACES
// ─────────────────────────────────────────

export const places: Place[] = [

  // ── DAY 1: Taipei City Core ──────────────

  {
    id: "chiang-kai-shek",
    name: "Chiang Kai-shek Memorial Hall",
    chineseName: "中正紀念堂",
    city: "Taipei",
    description: "Iconic white marble monument — Taiwan's most dramatic public plaza.",
    longDescription:
      "A 70-metre white marble monument rises above Liberty Square, flanked by the National Theater and Concert Hall. The changing of the guard ceremony — a precisely choreographed ritual performed by white-uniformed soldiers — happens on the hour, every hour, from 9AM to 5PM. The lower floors hold museum exhibits tracing Taiwan's modern history.",
    category: "Culture",
    lat: 25.0339,
    lng: 121.5201,
    image: "cksmh",
    mustTry: [
      "Changing of the guard on the hour (9AM–5PM)",
      "B1 museum exhibits on Taiwan's political history",
      "Liberty Square walk — free and always open",
      "The National Theater building (equally photogenic)",
    ],
    tips:
      "The 9AM ceremony draws the smallest crowds. The plaza is gorgeous at dawn with mist. Allow time to walk the full square — it is larger than it looks on a map.",
    duration: "1.5–2 hours",
    time: "9:00 AM",
  },

  {
    id: "ximending",
    name: "Ximending",
    chineseName: "西門町",
    city: "Taipei",
    description: "Taipei's youthful pedestrian district — street art, indie shops, and energy.",
    longDescription:
      "Taiwan's answer to Harajuku, Ximending is a car-free zone of tattoo parlours, cosplay boutiques, bubble tea shops, and mural-covered alleys. The octagonal Red House theatre at its heart hosts weekend artisan markets. By evening the streets fill with buskers, food carts, and the unmistakable hum of Taipei youth culture.",
    category: "Culture",
    lat: 25.0424,
    lng: 121.5081,
    image: "ximending",
    mustTry: [
      "Red House (紅樓) artisan market — weekends only",
      "Scallion pancake (蔥抓餅) from a street cart",
      "Browse the mural lane behind the main plaza",
      "Freshly made bubble tea from a local shop",
    ],
    tips:
      "Most alive from 5PM onwards. The Red House market runs Saturday and Sunday afternoons. Vintage clothing shops are tucked in the side streets.",
    duration: "1.5–2 hours",
    time: "11:30 AM",
  },

  {
    id: "longshan-temple",
    name: "Longshan Temple",
    chineseName: "龍山寺",
    city: "Taipei",
    description: "Taipei's most atmospheric temple — gilded dragons, incense clouds, and living faith.",
    longDescription:
      "Founded in 1738, Longshan Temple is a baroque masterpiece of Taiwanese religious architecture. Gilded dragon columns rise through clouds of incense to elaborately carved rooflines. Devotees kneel at altars dedicated to dozens of deities, shaking fortune-stick tubes and placing offerings of fruit and flowers. It is a living temple, not a museum.",
    category: "Spirituality",
    lat: 25.0375,
    lng: 121.4998,
    image: "longshan",
    mustTry: [
      "Fortune sticks (求籤) divination ceremony",
      "Spot the moon gate entrance and dragon columns",
      "Huaxi Street Night Market directly adjacent",
      "Photograph the incense smoke at the main courtyard",
    ],
    tips:
      "Dress modestly (cover shoulders and knees). Photography is welcome but step aside during active prayers. The temple never closes — late evenings are surprisingly peaceful.",
    duration: "1–1.5 hours",
    time: "2:00 PM",
  },

  {
    id: "taipei-101",
    name: "Taipei 101",
    chineseName: "台北101",
    city: "Taipei",
    description: "The world's fourth-tallest building — a bamboo-shaped tower over the Xinyi skyline.",
    longDescription:
      "Standing 508 metres tall and designed to evoke a segmented bamboo stalk, Taipei 101 dominated the world as the tallest structure on earth for six years. Its indoor observatory on floor 89 gives a 360-degree panorama over the mountain-ringed city. The massive 660-tonne tuned mass damper — a golden pendulum visible from within — is an engineering spectacle in its own right.",
    category: "Architecture",
    lat: 25.0337,
    lng: 121.5645,
    image: "taipei101",
    mustTry: [
      "89F indoor observatory (open until 10PM)",
      "91F outdoor sky deck on clear days",
      "660-tonne golden damper ball exhibition",
      "Jason's Market B1 for Taiwanese snack souvenirs",
    ],
    tips:
      "Buy tickets online to skip the queue. Visit at dusk to watch the city transition from gold to neon. Clear January days offer mountain views all the way to Yangmingshan.",
    duration: "1.5–2 hours",
    time: "4:30 PM",
  },

  {
    id: "shilin-night-market",
    name: "Shilin Night Market",
    chineseName: "士林夜市",
    city: "Taipei",
    description: "Taipei's most iconic night market — 500+ stalls of street food and sensory overload.",
    longDescription:
      "Shilin is the gold standard of Taiwanese night markets — a sprawling electric maze of vendors selling oyster omelettes, XXL popcorn chicken, scallion pancakes, grilled corn, and towers of fresh-cut tropical fruit. The underground food court gives seated eating in a calmer environment. Come hungry, come late.",
    category: "Food",
    lat: 25.0878,
    lng: 121.5238,
    image: "shilin",
    mustTry: [
      "XXL Crispy Chicken (大雞排) — a full half-bird, freshly fried",
      "Oyster omelette (蚵仔煎) with sweet potato starch",
      "Taro balls on shaved ice",
      "Underground food court for seated local dishes",
    ],
    tips:
      "Best from 7PM onwards. The underground section has seating — head there first to eat properly, then browse the outdoor stalls. Weekends are very crowded.",
    duration: "2–3 hours",
    time: "7:30 PM",
  },

  // ── DAY 2: North Coast Loop ──────────────

  {
    id: "yehliu-geopark",
    name: "Yehliu Geopark",
    chineseName: "野柳地質公園",
    city: "New Taipei",
    description: "An alien coastline of mushroom rocks and sea-carved geological formations.",
    longDescription:
      "Yehliu is a 1.7km rocky cape jutting into the Pacific where the ocean has sculpted sandstone into hundreds of surreal formations over 5 million years. The Queen's Head — an impossibly slender neck topped by a weathered knob — is Taiwan's most photographed rock. Sea erosion, honeycomb weathering, and tilted strata create a landscape unlike anything else on earth.",
    category: "Nature",
    lat: 25.2048,
    lng: 121.6905,
    image: "yehliu",
    mustTry: [
      "Queen's Head (女王頭) — photograph from the marked viewpoint",
      "Fairy Shoe formation at the cape tip",
      "Mushroom rocks and cannonball rocks zone",
      "Cliffside panorama over the East China Sea",
    ],
    tips:
      "Arrive early before tour coaches. Wear non-slip shoes — the rocks are wet and uneven. The cape takes 45–60 minutes to walk end-to-end at a relaxed pace.",
    duration: "1.5–2 hours",
    time: "9:30 AM",
  },

  {
    id: "shifen-old-street",
    name: "Shifen Old Street",
    chineseName: "十分老街",
    city: "New Taipei",
    description: "A narrow lane straddling the train tracks — famous for sky lantern releases.",
    longDescription:
      "Shifen Old Street runs so close to the Pingxi Line railway that vendors pull their stalls back when trains pass — a theatrical moment every 20 minutes. The street is best known for sky lantern (天燈) releases: vendors provide lanterns painted with wishes, which are lit and sent drifting up over the valley. A genuine piece of northern Taiwan folk tradition.",
    category: "Heritage",
    lat: 25.0484,
    lng: 121.7791,
    image: "shifen",
    mustTry: [
      "Release a sky lantern (天燈) with written wishes",
      "Stand on the tracks and watch the train pass at close range",
      "Braised pork rice and sausages from street stalls",
    ],
    tips:
      "Sky lanterns cost NT$150–200 per lantern. The most photogenic moment is the lantern floating upward with the valley behind.",
    duration: "1–1.5 hours",
    time: "12:00 PM",
  },

  {
    id: "shifen-waterfall",
    name: "Shifen Waterfall",
    chineseName: "十分瀑布",
    city: "New Taipei",
    description: "Taiwan's widest waterfall — a 20m curtain of white water called 'Taiwan's Niagara'.",
    longDescription:
      "Shifen Waterfall drops 20 metres in a wide horseshoe curtain over volcanic basalt, creating permanent mist above a turquoise plunge pool. The flat trail from Shifen Old Street takes 10 minutes through a bamboo forest. In winter the surrounding canyon is brilliantly green; the falls thunder after any rain.",
    category: "Nature",
    lat: 25.0419,
    lng: 121.7789,
    image: "shifenfall",
    mustTry: [
      "Walk to the closest viewing platform for the full curtain view",
      "Rainbow in the mist on sunny mornings",
      "Bamboo forest trail from the old street (10 min walk)",
    ],
    tips:
      "Go in the morning for the best light — the sun hits the falls directly before noon. The trail is easy and paved. Waterfall entry is free.",
    duration: "45–60 minutes",
    time: "1:30 PM",
  },

  {
    id: "jiufen",
    name: "Jiufen Old Street",
    chineseName: "九份老街",
    city: "New Taipei",
    description: "A hillside lantern town of winding stairs, teahouses, and Pacific views.",
    longDescription:
      "Perched on steep mountain slopes overlooking the Pacific, Jiufen's stone-stepped lanes glow red at dusk as hundreds of paper lanterns ignite above the teahouse eaves. This former gold-mining town inspired the aesthetic of Studio Ghibli's Spirited Away. Arrive in the afternoon, eat at a cliffside teahouse, and stay until the lanterns come on.",
    category: "Heritage",
    lat: 25.1093,
    lng: 121.8441,
    image: "jiufen",
    mustTry: [
      "Taro and sweet potato balls in syrup (芋圓)",
      "Cliffside teahouse with a Pacific view — A-Mei Teahouse is the most scenic",
      "Jishan Street (基山街) lantern-lit evening walk",
      "Fish ball soup (魚丸湯) from a street stall",
    ],
    tips:
      "The most magical hour is 4:30–6PM when lanterns light up but daylight still illuminates the sea. Wear non-slip shoes — all stairs. Return bus runs until 10PM.",
    duration: "2.5–3 hours",
    time: "3:00 PM",
  },

  // ── DAY 3: Beitou + Yangmingshan + Maokong ──

  {
    id: "xinbeitou-station",
    name: "Xinbeitou Historic Station",
    chineseName: "新北投火車站",
    city: "Taipei",
    description: "A perfectly preserved 1916 Japanese wooden railway station — now a museum.",
    longDescription:
      "Built in 1916 during the Japanese colonial era to carry bathers to Beitou's hot spring resorts, Xinbeitou Station was decommissioned in 1988 and later restored in 2017 using salvaged original materials. The red-and-white gingerbread facade and wooden platform have been meticulously preserved.",
    category: "History",
    lat: 25.1357,
    lng: 121.5016,
    image: "xinbeitou",
    mustTry: [
      "Photograph the red-and-white Japanese wooden facade",
      "Read the history panels on Beitou's hot spring railway era",
      "Stroll Zhongshan Road's hot spring hotel strip nearby",
    ],
    tips:
      "Free entry. Opens at 10AM. The station is small — 15 minutes is enough. Stack with Thermal Valley and the Hot Spring Museum nearby for a complete Beitou morning.",
    duration: "20–30 minutes",
    time: "9:00 AM",
  },

  {
    id: "beitou-thermal-valley",
    name: "Beitou Thermal Valley",
    chineseName: "地熱谷",
    city: "Taipei",
    description: "A sulphurous emerald lake that boils at 98°C — Beitou's volcanic heart.",
    longDescription:
      "Direhgu — Hell Valley — is a jade-green lake of naturally boiling, acidic water at 98°C set in a wooded basin. The milky emerald colour comes from radium-bearing mineral deposits unique to this valley. Steam rises constantly from the surface, creating a misty, otherworldly atmosphere even on hot days.",
    category: "Nature",
    lat: 25.1377,
    lng: 121.5098,
    image: "thermalvalley",
    mustTry: [
      "Watch the jade-green water bubble and steam",
      "Hot spring boiled eggs from the adjacent stall",
      "Beitou Hot Spring Museum (5 min walk) — a 1913 Japanese bathhouse",
    ],
    tips:
      "Free entry. The lake is roped off but you can get very close. Combine with Xinbeitou Station and the Hot Spring Museum in a single morning walk — all within 10 minutes of each other.",
    duration: "30–45 minutes",
    time: "9:30 AM",
  },

  {
    id: "qingtiangang",
    name: "Qingtiangang Grassland",
    chineseName: "擎天崗草原",
    city: "Taipei",
    description: "A rolling alpine meadow above Yangmingshan — Taiwan's highland cattle country.",
    longDescription:
      "At 771 metres above sea level in Yangmingshan National Park, Qingtiangang is a vast circular grassland where water buffalo roam freely. On clear days you can see the entire Taipei basin below; in winter, low clouds roll in and out across the plateau. A circular boardwalk loops the meadow past grazing buffalo and panoramic viewpoints.",
    category: "Nature",
    lat: 25.1726,
    lng: 121.5603,
    image: "qingtiangang",
    mustTry: [
      "Walk the circular boardwalk (45 min)",
      "Watch water buffalo graze in the foreground",
      "Taipei basin panorama on clear days",
      "Cloud-watching when low mist rolls across the meadow",
    ],
    tips:
      "Take bus S15 from Jiantan MRT station (30 min). Bring a jacket — it is 8–10°C cooler than central Taipei in January.",
    duration: "1.5–2 hours",
    time: "11:00 AM",
  },

  {
    id: "maokong-gondola",
    name: "Maokong Gondola",
    chineseName: "貓空纜車",
    city: "Taipei",
    description: "A 4.5km cable car over forested hills to Taiwan's most famous tea country.",
    longDescription:
      "The Maokong Gondola rises 300 metres over forest and tea terraces to the hilltop neighbourhood of Maokong, historically Taiwan's most important tea-growing area. Crystal cabins with glass floors look down over Taipei Zoo, river bends, and suburban rooftops. The upper station opens onto teahouses with city panoramas and fresh tieguanyin brew.",
    category: "Nature",
    lat: 24.9705,
    lng: 121.5794,
    image: "maokong",
    mustTry: [
      "Crystal cabin with glass floor — request at the gate",
      "Taipei city panorama from the hilltop stations",
      "Tieguanyin (鐵觀音) tea at a hillside teahouse",
      "Tea egg and tea-braised dishes at summit restaurants",
    ],
    tips:
      "Gondola runs Tuesday–Sunday; opens at noon on weekdays, 9AM weekends. Round trip takes 40 minutes. Factor 1–2 hours at the top for tea and the view.",
    duration: "2.5–3 hours (round trip + tea)",
    time: "2:00 PM",
  },

  {
    id: "zhinan-temple",
    name: "Zhinan Temple",
    chineseName: "指南宮",
    city: "Taipei",
    description: "A Taoist hilltop temple complex with sweeping views over the Taipei valley.",
    longDescription:
      "Zhinan Temple is a grand Taoist complex dedicated to Lü Dongbin, one of the Eight Immortals, set on a forested hillside above Muzha. Dozens of shrine halls climb the steep slope; the main hall looks out over the entire Taipei basin. The gondola passes directly above the temple — a dramatic angle from the cable car.",
    category: "Spirituality",
    lat: 24.9769,
    lng: 121.5808,
    image: "zhinan",
    mustTry: [
      "Main hall panorama of the Taipei basin",
      "Tiered shrine halls climbing the hillside",
      "Evening incense and candle atmosphere at dusk",
    ],
    tips:
      "Walk from Maokong Gondola upper station (5 min downhill). Combine with a tea stop — teahouses are between the gondola station and the temple.",
    duration: "45–60 minutes",
    time: "2:30 PM",
  },

  {
    id: "raohe-night-market",
    name: "Raohe Night Market",
    chineseName: "饒河夜市",
    city: "Taipei",
    description: "Taipei's most local night market — a compact, intense 600m of pure street food.",
    longDescription:
      "Unlike the tourist-scaled Shilin, Raohe is where Taipei locals eat. A 600-metre straight lane is flanked by back-to-back stalls, presided over at the entrance by the red Ciyou Temple. The black pepper buns — baked in a clay tandoor, filled with pork and green onion — are the dish Raohe is famous for.",
    category: "Food",
    lat: 25.0507,
    lng: 121.5774,
    image: "raohe",
    mustTry: [
      "Black pepper bun (胡椒餅) — baked in clay oven, eat immediately",
      "Braised pork rice (滷肉飯) from stalls mid-lane",
      "Medicinal herb soup (藥燉排骨)",
      "Stinky tofu if you're feeling brave",
    ],
    tips:
      "Black pepper bun queue starts early — get in line by 6:30PM. The market is compact enough to walk end-to-end twice. MRT Songshan Station, exit 5.",
    duration: "1.5–2 hours",
    time: "6:30 PM",
  },

  // ── DAY 4: Wulai + Zhongshe + Sun Moon Lake ──

  {
    id: "wulai",
    name: "Wulai Hot Spring Village",
    chineseName: "烏來溫泉",
    city: "New Taipei",
    description: "An Atayal aboriginal village with hot springs, a waterfall, and wild boar sausages.",
    longDescription:
      "Wulai is an Atayal indigenous community an hour south of Taipei, built around the confluence of the Nanshi and Tonghou rivers in a steep forested valley. The pedestrian old street is lined with Aboriginal food stalls (wild boar sausage, mochi), hot spring foot baths, and shops selling Atayal textiles. A small tram climbs to a viewpoint overlooking the 80-metre Wulai Waterfall.",
    category: "Heritage",
    lat: 24.8680,
    lng: 121.5501,
    image: "wulai",
    mustTry: [
      "Wild boar sausage (山豬肉香腸) from Atayal stalls",
      "Roadside hot spring foot soak (泡腳) — free public pools on the riverbank",
      "Tram up to Wulai Waterfall viewpoint",
      "Mochi pounded fresh in the old street",
    ],
    tips:
      "Take bus 849 from Xindian MRT (45 min). The public foot-soak pools on the riverbank are free and genuinely delightful.",
    duration: "2.5–3 hours",
    time: "9:00 AM",
  },

  {
    id: "zhongshe-flower-market",
    name: "Zhongshe Flower Market",
    chineseName: "中社花市",
    city: "Taichung",
    description: "A sea of seasonal blooms across terraced hillside plots — the most colourful detour in Taiwan.",
    longDescription:
      "Zhongshe Flower Market is a 30-hectare floral farm in Taichung's foothills that plants seasonal blooms in mass — sunflowers, cosmos, tulips, lavender — creating extraordinary colour fields on sloped terrain. January typically has tulips and cosmos in peak colour. The viewing paths weave through the plots with mountain backdrop views.",
    category: "Nature",
    lat: 24.2441,
    lng: 120.7594,
    image: "zhongshe",
    mustTry: [
      "Walk the full loop path through the seasonal bloom zones",
      "Flower-themed ice cream and snacks at the farm shop",
      "Mountain backdrop panorama from the upper terrace",
    ],
    tips:
      "Admission NT$100–150. Best in the morning when light is low and soft. January blooms vary — check the farm's social media before visiting.",
    duration: "1–1.5 hours",
    time: "1:30 PM",
  },

  {
    id: "sun-moon-lake",
    name: "Sun Moon Lake",
    chineseName: "日月潭",
    city: "Nantou",
    description: "Taiwan's largest alpine lake — serene waters wrapped in mist and mountain.",
    longDescription:
      "Named for its twin-lobed shape — the eastern half resembling the sun, the western a crescent moon — this highland lake sits 748 metres above sea level encircled by misty forested peaks. Circumnavigate it by bicycle on a smooth dedicated path that threads through indigenous Thao villages and bamboo groves. The sunrise mist rolling off the water is otherworldly.",
    category: "Nature",
    lat: 23.8601,
    lng: 120.9179,
    image: "sunmoonlake",
    mustTry: [
      "Sunset boat cruise from Shuishe Pier",
      "Wenwu Temple panorama from the north shore",
      "Red jade tea (紅玉紅茶) at Ita Thao Village",
      "Cycling the 33km lake circumference path (next morning)",
    ],
    tips:
      "Rent bikes at Shuishe Pier (NT$200/day). Stay overnight to catch sunrise mist on the water. Book lakeside hotels 2+ months ahead.",
    duration: "Afternoon + overnight",
    time: "4:30 PM",
  },

  // ── DAY 5: Alishan + Rainbow Village ──

  {
    id: "alishan",
    name: "Alishan National Scenic Area",
    chineseName: "阿里山",
    city: "Chiayi",
    description: "Ancient red cypress forest, cloud seas, and sunrise above the clouds.",
    longDescription:
      "Alishan is Taiwan's most celebrated mountain destination — a high-altitude plateau at 2,216 metres reached by one of the world's great forest railways. Ancient red cypress trees draped in moss tower above trails through cedar groves. The park is most famous for its sunrise spectacle: a gold-orange sun rising above a sea of clouds stretching to the horizon.",
    category: "Nature",
    lat: 23.5118,
    lng: 120.8039,
    image: "alishan",
    mustTry: [
      "Sunrise at Zhushan Platform — board the forest train at 5AM",
      "Sacred Tree Trail through 2,000-year-old red cypresses",
      "Alishan Forest Railway — one of the world's great mountain trains",
      "High-mountain tea (高山茶) at the village shops",
    ],
    tips:
      "Sunrise is the main event — book the forest train online weeks ahead. Layer up: temperatures at the summit are 5–10°C year-round. Stay inside the park the night before to make the 5AM start manageable.",
    duration: "Full morning",
    time: "5:00 AM",
  },

  {
    id: "rainbow-village",
    name: "Rainbow Village",
    chineseName: "彩虹眷村",
    city: "Taichung",
    description: "A single veteran's painted universe — every surface a canvas of vivid folk art.",
    longDescription:
      "Huang Yung-fu, a former soldier known as Rainbow Grandpa, began painting his military dependents' village in 2008 to save it from demolition. Bright figures — animals, people, abstract shapes — now cover every wall, ground, roof, and alley of the compact complex. The sheer density and joy of the painting is overwhelming.",
    category: "Culture",
    lat: 24.1390,
    lng: 120.6453,
    image: "rainbow",
    mustTry: [
      "Walk every lane — the painting wraps around every surface",
      "Photograph the ground murals from the raised walkway above",
      "Find Rainbow Grandpa's self-portrait hidden in the paintings",
    ],
    tips:
      "Free entry. Takes 30–45 minutes to walk properly. Most photogenic in the afternoon with warm light. 30-minute taxi from Taichung HSR station.",
    duration: "30–45 minutes",
    time: "2:30 PM",
  },

  {
    id: "carrefour-taipei",
    name: "Souvenir Shopping (Taipei 101 B1)",
    chineseName: "台北購物",
    city: "Taipei",
    description: "Jason's Market Place and Taipei 101 B1 — the ultimate last-day souvenir sweep.",
    longDescription:
      "Jason's Market Place in the basement of Taipei 101 is the most curated supermarket stop in the city: Taiwanese pineapple cakes, sun cakes, local instant noodles, packaged high-mountain teas, beauty products, and confectionery. Pick up gifts and snacks for the journey home.",
    category: "Shopping",
    lat: 25.0338,
    lng: 121.5645,
    image: "carrefour",
    mustTry: [
      "Pineapple cake (鳳梨酥) — the essential Taiwan souvenir",
      "Sun Cake (太陽餅) from a Taichung brand stall",
      "Kavalan Whisky miniatures from the spirits section",
      "High-mountain oolong tea in gift packaging",
    ],
    tips:
      "Set a budget — it is very easy to overbuy. MRT Taipei 101/World Trade Center station is directly below. Last stop before the Airport MRT.",
    duration: "45–60 minutes",
    time: "5:30 PM",
  },
];

// ─────────────────────────────────────────
// ITINERARY — 5 DAYS
// ─────────────────────────────────────────

export const itinerary: ItineraryDay[] = [
  {
    day: 1,
    date: "January 11, 2027",
    title: "Taipei — City at First Light",
    chineseTitle: "台北初見",
    theme: "arrival",
    places: [
      "chiang-kai-shek",
      "ximending",
      "longshan-temple",
      "taipei-101",
      "shilin-night-market",
    ],
    notes:
      "08:00 — Arrive at Taoyuan Airport (TPE) and take the Airport MRT to Taipei Main Station (35 min, NT$160). Check into your hotel and rest. 09:00 — Walk to Chiang Kai-shek Memorial Hall for the first guard change of the day; the marble plaza is quietest in the morning. Allow time for the B1 museum and a stroll around Liberty Square. 11:30 — Stroll to Ximending (15 min walk) for lunch — scallion pancake and bubble tea from the street carts. Browse the mural lanes and the Red House at your own pace. 14:00 — Afternoon visit to Longshan Temple, just a short taxi or 2-stop MRT ride. Light incense, try the fortune sticks, and explore the Huaxi Street area nearby. 16:30 — Head to Xinyi district for Taipei 101. Buy observatory tickets online in advance and time your visit for dusk — the city-to-neon transition from floor 89 is spectacular. 19:30 — MRT Red Line to Jiantan Station for Shilin Night Market. Start underground for a seated meal, then explore the outdoor stalls. Wrap up by 10PM.",
    logistics:
      "Airport MRT: TPE → Taipei Main Station (NT$160, 35 min). MRT Blue/Green Line → Chiang Kai-shek Memorial Hall Station. MRT Red Line → Taipei 101/World Trade Center (observatory). MRT Red Line → Jiantan (Shilin Night Market). All central Taipei legs are 1–2 MRT stops or a short walk.",
  },

  {
    day: 2,
    date: "January 12, 2027",
    title: "North Coast — Rocks, Rails & Lanterns",
    chineseTitle: "北海岸一日遊",
    theme: "heritage",
    places: [
      "yehliu-geopark",
      "shifen-old-street",
      "shifen-waterfall",
      "jiufen",
    ],
    notes:
      "08:00 — Depart from Taipei Bus Station (near Zhongxiao Fuxing MRT) on Bus 1815 toward Yehliu. 09:30 — Arrive Yehliu Geopark before the tour coaches. Walk the full 1.7km cape to photograph the Queen's Head and mushroom rocks. 12:00 — Taxi from Yehliu to Shifen (~45 min, NT$500). Release a sky lantern on the railway tracks at Shifen Old Street — time it so a train passes for the dramatic stall-clearing moment. Lunch from the street stalls. 13:30 — Walk the 10-minute paved trail to Shifen Waterfall. Best light is before 2PM on the falls. 15:00 — Taxi up to Jiufen (~25 min, NT$350). Settle into a cliffside teahouse for afternoon tea with Pacific views. 17:00 — Walk the lantern-lit Jishan Street steps as dusk falls and the red lanterns ignite — the most atmospheric hour in Jiufen. 19:00 — Board the return bus to Taipei (Zhongxiao Fuxing). Back by 20:30. Easy evening — rest up.",
    logistics:
      "Bus 1815: Taipei Bus Station → Yehliu (NT$96, 70 min, departs every 30 min). Taxi Yehliu → Shifen ~NT$500. Taxi Shifen → Jiufen ~NT$350. Bus Jiufen → Taipei (Zhongxiao Fuxing): NT$96, last bus ~22:00.",
  },

  {
    day: 3,
    date: "January 13, 2027",
    title: "Hot Springs, Heights & Tea Country",
    chineseTitle: "溫泉山茶夜市",
    theme: "nature",
    places: [
      "xinbeitou-station",
      "beitou-thermal-valley",
      "qingtiangang",
      "maokong-gondola",
      "zhinan-temple",
      "raohe-night-market",
    ],
    notes:
      "09:00 — Take the MRT Red Line to Xinbeitou Station (branch line). Start at the 1916 Japanese wooden station building, then walk 5 minutes to the Beitou Thermal Valley. Watch the jade-green lake bubble and collect a hot-spring boiled egg from the adjacent stall. 10:30 — Return to Jiantan MRT and board Bus S15 to Qingtiangang Grassland in Yangmingshan (30 min). Walk the circular boardwalk at 771m elevation, watch water buffalo graze, and take in the Taipei basin panorama. 13:00 — Descend back to the city and grab lunch near MRT Taipei Zoo. 14:00 — Board the Maokong Gondola (3-min walk from MRT Taipei Zoo). Request a crystal glass-floor cabin. Ride up 25 minutes to the hilltop tea country. 14:30 — Walk 5 minutes down to Zhinan Temple for the hillside panorama and incense atmosphere. Then settle at a teahouse for tieguanyin tea and the city view. 17:30 — Descend by gondola and MRT to Songshan. 18:30 — Raohe Night Market: queue for the black pepper bun before the line grows, then work your way down the full 600-metre lane.",
    logistics:
      "MRT Red Line → Xinbeitou (Qiyan branch, runs every 12 min). Bus S15: Jiantan MRT → Qingtiangang (NT$30, 30 min — runs hourly). MRT → Taipei Zoo → Maokong Gondola (NT$50 one-way / NT$100 return). MRT → Songshan → Raohe Night Market (exit 5).",
  },

  {
    day: 4,
    date: "January 14, 2027",
    title: "Valleys, Flowers & the Lake",
    chineseTitle: "峽谷花海湖光",
    theme: "nature",
    places: [
      "wulai",
      "zhongshe-flower-market",
      "sun-moon-lake",
    ],
    notes:
      "08:00 — Bus 849 from Xindian MRT to Wulai (45 min, NT$45). 09:00 — Arrive Wulai village. Eat wild boar sausage and fresh-pounded mochi from the Atayal stalls on the old street. Soak your feet in the free riverside hot spring pools. Ride the small tram to the waterfall viewpoint. Back to the MRT by 12:00. 12:30 — HSR from Taipei to Taichung (40 min, NT$375 — book ahead). Taxi from Taichung HSR to Zhongshe Flower Market (30 min, ~NT$600). 13:30 — Walk the terraced bloom fields at Zhongshe and have a light lunch at the farm cafe. 15:30 — Taxi south to Sun Moon Lake (~45 min, ~NT$700). 16:30 — Check in to your lakeside hotel, then head straight to Shuishe Pier for the sunset boat cruise. 19:00 — Dinner at Ita Thao Village — red jade tea, indigenous Thao cuisine, and a lakeside evening stroll. Overnight at the lake.",
    logistics:
      "Bus 849: Xindian MRT → Wulai (NT$45, 45 min). HSR: Taipei → Taichung (NT$375, 40 min). Taxi: Taichung HSR → Zhongshe ~NT$600. Taxi: Zhongshe → Sun Moon Lake ~NT$700. Book lakeside hotel 2+ months ahead — January books out fast.",
  },

  {
    day: 5,
    date: "January 15, 2027",
    title: "Alishan Sunrise & Painted Walls",
    chineseTitle: "阿里山晨曦彩虹村",
    theme: "nature",
    places: [
      "alishan",
      "rainbow-village",
      "carrefour-taipei",
    ],
    notes:
      "05:00 — Board the Alishan Forest Train (Zhushan branch) for the 30-minute ride up to Zhushan Sunrise Platform. Watch the sun emerge from a sea of clouds at 2,451m — one of the most celebrated natural spectacles in Asia. 07:00 — Return to the village and walk the Sacred Tree Trail through 2,000-year-old red cypresses. Buy high-mountain tea at the village shops. Rest and have breakfast. 10:00 — Descend from Alishan to Chiayi by the forest train or bus (~2.5 hrs). 12:30 — HSR from Chiayi to Taichung (20 min, NT$240). Lunch near the station. 14:30 — Short taxi to Rainbow Village (~NT$200, 10 min). Walk every painted alley — the ground murals, the wrapped rooflines, Rainbow Grandpa's hidden self-portrait. 16:00 — HSR Taichung → Taipei (40 min, NT$375). 17:30 — Final souvenir run at Jason's Market Place, Taipei 101 B1. Pineapple cakes, oolong tea, Kavalan miniatures. 19:00 — Airport MRT from Taipei Main Station → TPE (35 min, NT$160). Arrive at least 2 hours before departure.",
    logistics:
      "Alishan Forest Train (Zhushan branch): departs ~05:10AM — book online weeks ahead (NT$100). Bus: Alishan → Chiayi (NT$231, ~2.5 hrs). HSR: Chiayi → Taichung (NT$240, 20 min). Taxi: Taichung HSR → Rainbow Village (~NT$200). HSR: Taichung → Taipei (NT$375, 40 min). Airport MRT: Taipei Main Station → TPE (NT$160, 35 min).",
  },
];

// ─────────────────────────────────────────
// TRIP STATS
// ─────────────────────────────────────────

export const tripStats = {
  duration: "5 Days",
  cities: "7 Cities",
  places: "17 Destinations",
  dates: "January 11–15, 2027",
};