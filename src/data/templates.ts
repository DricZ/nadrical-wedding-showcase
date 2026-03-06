export interface TemplateFormData {
  id: string;
  name: string;
  category: string;
  image: string;
  aspect: string;
  demoUrl?: string;
}

export const templateCategories = [
  "Semua",
  "Premium",
  "Adat",
  "Floral",
  "Watercolor",
  "Minimalist",
  "Engagement Day",
  "Anniversary",
  "Tasmiyah - Aqiqah",
  "Khitan",
  "Birthday",
  "Elegant",
  "Others"
];

const aspectRatios = [
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-[5/4]",
  "aspect-square",
  "aspect-[3/5]",
];

let aspectIndex = 0;
const getNextAspect = () => {
  const aspect = aspectRatios[aspectIndex];
  aspectIndex = (aspectIndex + 1) % aspectRatios.length;
  return aspect;
};

export const templates: TemplateFormData[] = [
  {
    id: "luxee-premium-01",
    name: "Luxee Premium 01",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1001.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-01/"
  },
  {
    id: "luxee-premium-02",
    name: "Luxee Premium 02",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1005.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-05/"
  },
  {
    id: "luxee-premium-03",
    name: "Luxee Premium 03",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1007.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-07/"
  },
  {
    id: "luxee-premium-04",
    name: "Luxee Premium 04",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1002.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-02/"
  },
  {
    id: "luxee-premium-05",
    name: "Luxee Premium 05",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1003.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-03/"
  },
  {
    id: "luxee-premium-06",
    name: "Luxee Premium 06",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1004.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-04/"
  },
  {
    id: "luxee-premium-07",
    name: "Luxee Premium 07",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1006.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-06/"
  },
  {
    id: "luxee-premium-08",
    name: "Luxee Premium 08",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1008.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-08/"
  },
  {
    id: "luxee-premium-09",
    name: "Luxee Premium 09",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1009.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-09/"
  },
  {
    id: "luxee-premium-10",
    name: "Luxee Premium 10",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1010.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-10/"
  },
  {
    id: "luxee-premium-11",
    name: "Luxee Premium 11",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1011.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-11/"
  },
  {
    id: "luxee-premium-12",
    name: "Luxee Premium 12",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1012.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-12/"
  },
  {
    id: "luxee-premium-13",
    name: "Luxee Premium 13",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1013.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-13/"
  },
  {
    id: "luxee-premium-14",
    name: "Luxee Premium 14",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1014.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-14/"
  },
  {
    id: "luxee-premium-15",
    name: "Luxee Premium 15",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1015.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-15/"
  },
  {
    id: "luxee-premium-16",
    name: "Luxee Premium 16",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/1016.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-16/"
  },
  {
    id: "luxee-premium-fantasy-special",
    name: "Luxee Premium - Fantasy Special",
    category: "Premium",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee-premium-17.png",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/tema-17/"
  },
  {
    id: "luxee-adat-minang",
    name: "Luxee Adat Minang",
    category: "Adat",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Minang.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/adat-minang/"
  },
  {
    id: "luxee-adat-bali",
    name: "Luxee Adat Bali",
    category: "Adat",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Bali.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/adat-bali/"
  },
  {
    id: "luxee-adat-jawa",
    name: "Luxee Adat Jawa",
    category: "Adat",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Jawa.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/adat-jawa/"
  },
  {
    id: "luxee-adat-jawa-batik",
    name: "Luxee Adat Jawa - Batik",
    category: "Adat",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Jawa_Batik.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/adat-jawa-batik/"
  },
  {
    id: "luxee-adat-sunda",
    name: "Luxee Adat Sunda",
    category: "Adat",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Sunda.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/adat-sunda/"
  },
  {
    id: "luxee-adat-batak",
    name: "Luxee Adat Batak",
    category: "Adat",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Batak.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/adat-batak/"
  },
  {
    id: "luxee-adat-banjar",
    name: "Luxee Adat Banjar",
    category: "Adat",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Banjar.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/adat-banjar/"
  },
  {
    id: "luxee-adat-betawi",
    name: "Luxee Adat Betawi",
    category: "Adat",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Betawi.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/adat-betawi/"
  },
  {
    id: "luxee-adat-bugis",
    name: "Luxee Adat Bugis",
    category: "Adat",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Bugis.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/adat-bugis/"
  },
  {
    id: "luxee-adat-kalimantan",
    name: "Luxee Adat Kalimantan",
    category: "Adat",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Kalimantan.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/adat-kalimantan/"
  },
  {
    id: "luxee-adat-papua",
    name: "Luxee Adat Papua",
    category: "Adat",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Papua.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/adat-papua/"
  },
  {
    id: "luxee-floral-01",
    name: "Luxee Floral 01",
    category: "Floral",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Luxee-Floral-01.jpg",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/demo-floral-01/"
  },
  {
    id: "luxee-floral-02",
    name: "Luxee Floral 02",
    category: "Floral",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Luxee-Floral-02.jpg",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/demo-floral-02/"
  },
  {
    id: "luxee-floral-03",
    name: "Luxee Floral 03",
    category: "Floral",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Luxee-Floral-03.jpg",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/demo-floral-03/"
  },
  {
    id: "luxee-floral-04",
    name: "Luxee Floral 04",
    category: "Floral",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Luxee-Floral-04.jpg",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/demo-floral-04/"
  },
  {
    id: "luxee-floral-05",
    name: "Luxee Floral 05",
    category: "Floral",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Luxee-Floral-05.jpg",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/demo-floral-05/"
  },
  {
    id: "luxee-floral-06",
    name: "Luxee Floral 06",
    category: "Floral",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Luxee-Floral-06.jpg",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/demo-floral-06/"
  },
  {
    id: "luxee-floral-07",
    name: "Luxee Floral 07",
    category: "Floral",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Luxee-Floral-07.jpg",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/demo-floral-07/"
  },
  {
    id: "luxee-floral-08",
    name: "Luxee Floral 08",
    category: "Floral",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Luxee-Floral-08.jpg",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/demo-floral-08/"
  },
  {
    id: "luxee-floral-09",
    name: "Luxee Floral 09",
    category: "Floral",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Luxee-Floral-09.jpg",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/demo-floral-09/"
  },
  {
    id: "luxee-floral-10",
    name: "Luxee Floral 10",
    category: "Floral",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Luxee-Floral-10.jpg",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/demo-floral-10/"
  },
  {
    id: "luxee-watercolor-01",
    name: "Luxee Watercolor 01",
    category: "Watercolor",
    image: "https://luxee.net/wp-content/uploads/2024/05/1028.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/watercolor-04/"
  },
  {
    id: "luxee-watercolor-02",
    name: "Luxee Watercolor 02",
    category: "Watercolor",
    image: "https://luxee.net/wp-content/uploads/2024/05/1026.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/watercolor-02/"
  },
  {
    id: "luxee-watercolor-03",
    name: "Luxee Watercolor 03",
    category: "Watercolor",
    image: "https://luxee.net/wp-content/uploads/2024/05/1027.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/watercolor-03/"
  },
  {
    id: "luxee-watercolor-04",
    name: "Luxee Watercolor 04",
    category: "Watercolor",
    image: "https://luxee.net/wp-content/uploads/2024/05/1025.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/watercolor-01/"
  },
  {
    id: "luxee-minimalist-01",
    name: "Luxee Minimalist 01",
    category: "Minimalist",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Minimalist_01.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/minimalist-01/"
  },
  {
    id: "luxee-overlay-shadow",
    name: "Luxee Overlay Shadow",
    category: "Minimalist",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Overlay-Shadow.png",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/overlay-shadow-01/"
  },
  {
    id: "luxee-minimalist-02",
    name: "Luxee Minimalist 02",
    category: "Minimalist",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Minimalist_02.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/minimalist-02/"
  },
  {
    id: "luxee-minimalist-03",
    name: "Luxee Minimalist 03",
    category: "Minimalist",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Minimalist_03.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/minimalist-03/"
  },
  {
    id: "luxee-minimalist-04",
    name: "Luxee Minimalist 04",
    category: "Minimalist",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Minimalist_04.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/minimalist-04/"
  },
  {
    id: "luxee-minimalist-05",
    name: "Luxee Minimalist 05",
    category: "Minimalist",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Minimalist_05.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/minimalist-05/"
  },
  {
    id: "luxee-minimalist-07",
    name: "Luxee Minimalist 07",
    category: "Minimalist",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Minimalist_07.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/minimalist-07/"
  },
  {
    id: "luxee-minimalist-08",
    name: "Luxee Minimalist 08",
    category: "Minimalist",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Minimalist_08.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/minimalist-08/"
  },
  {
    id: "luxee-minimalist-09",
    name: "Luxee Minimalist 09",
    category: "Minimalist",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Minimalist_09.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/minimalist-09/"
  },
  {
    id: "luxee-minimalist-10",
    name: "Luxee Minimalist 10",
    category: "Minimalist",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Minimalist_10.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/minimalist-10/"
  },
  {
    id: "luxee-minimalist-06",
    name: "Luxee Minimalist 06",
    category: "Minimalist",
    image: "https://luxee.net/wp-content/uploads/2024/05/Luxee_Minimalist_06.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/minimalist-06/"
  },
  {
    id: "luxee-engagement-day-01",
    name: "Luxee Engagement Day 01",
    category: "Engagement Day",
    image: "https://luxee.net/wp-content/uploads/2024/05/1056.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/engagement-day/"
  },
  {
    id: "luxee-engagement-day-02",
    name: "Luxee Engagement Day 02",
    category: "Engagement Day",
    image: "https://luxee.net/wp-content/uploads/2024/05/1057.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/engagement-day-02/"
  },
  {
    id: "luxee-engagement-day-03",
    name: "Luxee Engagement Day 03",
    category: "Engagement Day",
    image: "https://luxee.net/wp-content/uploads/2024/05/1058.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/engagement-floral-01/"
  },
  {
    id: "luxee-engagement-day-04",
    name: "Luxee Engagement Day 04",
    category: "Engagement Day",
    image: "https://luxee.net/wp-content/uploads/2024/05/1059.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/engagement-floral-02/"
  },
  {
    id: "luxee-anniversary-01",
    name: "Luxee Anniversary 01",
    category: "Anniversary",
    image: "https://luxee.net/wp-content/uploads/2024/05/1060.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/anniversary-inv-01/"
  },
  {
    id: "luxee-anniversary-02",
    name: "Luxee Anniversary 02",
    category: "Anniversary",
    image: "https://luxee.net/wp-content/uploads/2024/05/1061.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/anniversary-inv-02/"
  },
  {
    id: "luxee-tasmiyah-aqiqah-01",
    name: "Luxee Tasmiyah - Aqiqah 01",
    category: "Tasmiyah - Aqiqah",
    image: "https://luxee.net/wp-content/uploads/2024/05/1054.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-tasmiyah-aqiqah-01/"
  },
  {
    id: "luxee-tasmiyah-aqiqah-02",
    name: "Luxee Tasmiyah - Aqiqah 02",
    category: "Tasmiyah - Aqiqah",
    image: "https://luxee.net/wp-content/uploads/2024/05/1055.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-tasmiyah-aqiqah-02/"
  },
  {
    id: "luxee-khitan-01",
    name: "Luxee Khitan 01",
    category: "Khitan",
    image: "https://luxee.net/wp-content/uploads/2024/05/1051.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/khitan-01/"
  },
  {
    id: "luxee-khitan-02",
    name: "Luxee Khitan 02",
    category: "Khitan",
    image: "https://luxee.net/wp-content/uploads/2024/05/1052.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/khitan-02/"
  },
  {
    id: "luxee-khitan-03",
    name: "Luxee Khitan 03",
    category: "Khitan",
    image: "https://luxee.net/wp-content/uploads/2024/05/1053.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/khitan-03/"
  },
  {
    id: "luxee-birthday-01",
    name: "Luxee Birthday 01",
    category: "Birthday",
    image: "https://luxee.net/wp-content/uploads/2024/05/1062.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-birthday-17-girl/"
  },
  {
    id: "luxee-birthday-02",
    name: "Luxee Birthday 02",
    category: "Birthday",
    image: "https://luxee.net/wp-content/uploads/2024/05/1063.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-birthday-17-boy/"
  },
  {
    id: "luxee-birthday-03",
    name: "Luxee Birthday 03",
    category: "Birthday",
    image: "https://luxee.net/wp-content/uploads/2024/05/1064.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-birthday-perempuan/"
  },
  {
    id: "luxee-birthday-04",
    name: "Luxee Birthday 04",
    category: "Birthday",
    image: "https://luxee.net/wp-content/uploads/2024/05/1065.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-birthday-pria/"
  },
  {
    id: "luxee-elegant-02",
    name: "Luxee Elegant 02",
    category: "Elegant",
    image: "https://luxee.net/wp-content/uploads/2024/05/1029.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/elegant-02"
  },
  {
    id: "bridal-shower",
    name: "Bridal Shower",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/1078.png",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/bridal-shower/"
  },
  {
    id: "luxee-walimatussafar",
    name: "Luxee Walimatussafar",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/1066.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-walimatussafar/"
  },
  {
    id: "luxee-kajian-islami",
    name: "Luxee Kajian Islami",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/1067.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-kajian-islami/"
  },
  {
    id: "luxee-pengukuhan-guru-besar",
    name: "Luxee Pengukuhan Guru Besar",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/1068.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-pengukuhan-guru-besar/"
  },
  {
    id: "luxee-wisuda-mahasiswa",
    name: "Luxee Wisuda (Mahasiswa)",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/1069.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-wisuda-mahasiswa/"
  },
  {
    id: "luxee-wisuda-kampus",
    name: "Luxee Wisuda (Kampus)",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/1070.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-wisuda-kampus/"
  },
  {
    id: "luxee-kelulusan-sekolah",
    name: "Luxee Kelulusan Sekolah",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/1071.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-kelulusan-sekolah/"
  },
  {
    id: "luxee-reuni",
    name: "Luxee Reuni",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/1072.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/reunion-invitation/"
  },
  {
    id: "luxee-kantor-formal",
    name: "Luxee Kantor - Formal",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/1073.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-kantor-formal/"
  },
  {
    id: "luxee-rapat-formal",
    name: "Luxee Rapat - Formal",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/1074.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-rapat-formal/"
  },
  {
    id: "luxee-event-formal",
    name: "Luxee Event - Formal",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/1075.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/undangan-event-formal/"
  },
  {
    id: "luxee-event-01",
    name: "Luxee Event - 01",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/1076.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/event-invitation-01/"
  },
  {
    id: "luxee-event-02",
    name: "Luxee Event - 02",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/1077.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/premium/event-invitation-02/"
  },
  {
    id: "preview-dibawah-adalah-real-animasi-bukan-gif-atau-video-anda-dapat-menggunakan-file-grafis-animasi-ini-untuk-desain-terbaik-anda-dengan-luxee-tersedia-16-kategori-files-siap-pakai-untuk-website-undangan-anda-bertemakan-floral",
    name: "Preview dibawah adalah real animasi, bukan gif atau video, anda dapat menggunakan file grafis animasi ini untuk desain terbaik anda dengan luxee. Tersedia 16 Kategori files siap pakai untuk website undangan Anda bertemakan floral.",
    category: "Floral",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/template/supersmooth-luxee-webpreview/"
  },
  {
    id: "preview-dibawah-adalah-real-animasi-bukan-gif-atau-video-anda-dapat-menggunakan-file-grafis-animasi-ini-untuk-desain-terbaik-anda-dengan-luxee-tersedia-11-kategori-files-siap-pakai-untuk-website-undangan-anda-bertemakan-floral",
    name: "Preview dibawah adalah real animasi, bukan gif atau video, anda dapat menggunakan file grafis animasi ini untuk desain terbaik anda dengan luxee. Tersedia 11 Kategori files siap pakai untuk website undangan Anda bertemakan floral.",
    category: "Floral",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/template/smooth-luxee-files/"
  },
  {
    id: "free-levidio-wedding-v2-01",
    name: "[FREE] Levidio Wedding v2 - 01",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Floral-02.png",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/demo-floral-02"
  },
  {
    id: "free-levidio-wedding-v2-02",
    name: "[FREE] Levidio Wedding v2 - 02",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Floral-04.png",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/demo-floral-04"
  },
  {
    id: "free-levidio-wedding-v2-03",
    name: "[FREE] Levidio Wedding v2 - 03",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Elegant-1.png",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/elegant-01/"
  },
  {
    id: "free-levidio-wedding-v2-04",
    name: "[FREE] Levidio Wedding v2 - 04",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/05/Mockup-Elegant-3.png",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/tema/elegant-03"
  },
  {
    id: "luxee-x-website-undangan-homepage",
    name: "Luxee x Website Undangan - Homepage",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/06/LUXEE-X-WEBUDG-HOMEPAGE.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/updates/homepage/"
  },
  {
    id: "luxee-x-website-undangan-order-page",
    name: "Luxee x Website Undangan - Order Page",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/06/LUXEE-X-WEBUDG-ORDERPAGE.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/updates/order/"
  },
  {
    id: "luxee-x-website-undangan-payment",
    name: "Luxee x Website Undangan - Payment",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/06/LUXEE-X-WEBUDG-PEMBAYARAN.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/updates/bayar/"
  },
  {
    id: "luxee-x-website-undangan-form-data",
    name: "Luxee x Website Undangan - Form Data",
    category: "Others",
    image: "https://luxee.net/wp-content/uploads/2024/06/LUXEE-X-WEBUDG-FORMDATA.webp",
    aspect: getNextAspect(),
    demoUrl: "https://luxee.net/updates/form-data-undangan/"
  },
];
