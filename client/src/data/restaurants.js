import esaNdiaImg from "../assets/images/gallery/Esandidia.webp";
import afedndiaImg from "../assets/images/gallery/Afendia.webp";
import crunchiesImg from "../assets/images/gallery/crunchies.webp";
import chickenRepublicImg from "../assets/images/gallery/chickenrepublic.webp";

/* =============================
   PRODUCTION RESTAURANT DATA
   (BACKEND READY STRUCTURE)
============================= */

const restaurants = [
  {
    id: "rest_001",
    name: "Esandidia",
    tagline: "Order Now",
    description:
      "Famous for authentic Ekpang and warm hospitality, Esandidia has been serving Uyo families for years.",

    image: esaNdiaImg,

    // GEO (needed for real delivery apps)
    lat: 5.0377,
    lng: 7.9128,

    // BUSINESS LOGIC (backend will control this later)
    isOpen: true,
    openingTime: "08:00",
    closingTime: "22:00",

    // DELIVERY BASE TIME (REALISTIC)
    baseDeliveryTime: 25,

    link: "/order/esandidia",

    menu: [
      { id: "m1", name: "Ekpang Nkwukwo", price: 2500 },
      { id: "m2", name: "Afia Efere", price: 2000 },
    ],

    category: "Soups",
    rating: 4.6,
    supportsPickup: false,
  },

  {
    id: "rest_002",
    name: "Afedndia",
    tagline: "Order Now",
    description:
      "Known for rich coconut rice and pepper soup, Afedndia Kitchen brings comfort food to your doorstep.",

    image: afedndiaImg,
    lat: 5.0412,
    lng: 7.9251,

    isOpen: true,
    openingTime: "09:00",
    closingTime: "23:00",

    baseDeliveryTime: 30,

    link: "/order/afedndia",

    menu: [
      { id: "m1", name: "Coconut Rice", price: 2200 },
      { id: "m2", name: "Pepper Soup", price: 1800 },
      { id: "m3", name: "Afia Efere", price: 2000 },
      { id: "m4", name: "Edikan Ikong", price: 2500 },
      { id: "m5", name: "Afang Soup", price: 2300 },
    ],

    category: "Soups",
    rating: 4.3,
    supportsPickup: true,
  },

  {
    id: "rest_003",
    name: "Crunchies",
    tagline: "Family dining with variety",
    description: "Known for Atama Soup and rice dishes.",

    image: crunchiesImg,
    lat: 5.0332,
    lng: 7.9001,

    isOpen: true,
    openingTime: "08:00",
    closingTime: "21:00",

    baseDeliveryTime: 20,

    link: "/order/crunchies",

    menu: [
      { id: "m1", name: "Atama Soup & Fufu", price: 2400 },
      { id: "m2", name: "Fried Rice & Chicken", price: 2800 },
      { id: "m3", name: "Afang Soup", price: 2300 },
    ],

    category: "Soups",
    rating: 4.2,
    supportsPickup: true,
  },

  {
    id: "rest_004",
    name: "Chicken Republic",
    tagline: "Fast food, Nigerian style",
    description:
      "Popular for grilled chicken combos and fast meals.",

    image: chickenRepublicImg,
    lat: 5.0455,
    lng: 7.8952,

    isOpen: true,
    openingTime: "09:00",
    closingTime: "23:00",

    baseDeliveryTime: 18,

    link: "/order/chicken-republic",

    menu: [
      { id: "m1", name: "Ekpang Nkwukwo", price: 2700 },
      { id: "m2", name: "Grilled Chicken Combo", price: 3500 },
    ],

    category: "Grills",
    rating: 4.0,
    supportsPickup: true,
  },
];

export default restaurants;