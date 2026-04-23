import esaNdiaImg from "../assets/images/gallery/Esandidia.webp";
import afedndiaImg from "../assets/images/gallery/Afendia.webp";
import crunchiesImg from "../assets/images/gallery/crunchies.webp";
import chickenRepublicImg from "../assets/images/gallery/chickenrepublic.webp";

// ✅ Placeholder image for missing owners
import defaultOwner from "../assets/images/owners/default-owner.webp";

// ✅ Try to import actual owner images (fallback to default if missing)
let mmaekpangOwner, paulafediaOwner, mukacrunchiesOwner, republicOwner;

try {
  mmaekpangOwner = require("../assets/images/owners/mmaekpang.webp");
} catch {
  mmaekpangOwner = defaultOwner;
}

try {
  paulafediaOwner = require("../assets/images/owners/paulafedia.webp");
} catch {
  paulafediaOwner = defaultOwner;
}

try {
  mukacrunchiesOwner = require("../assets/images/owners/mukacrunchies.webp");
} catch {
  mukacrunchiesOwner = defaultOwner;
}

try {
  republicOwner = require("../assets/images/owners/republic.webp");
} catch {
  republicOwner = defaultOwner;
}

const restaurants = [
  {
    name: "Esandidia",
    tagline: "Order Now",
    description:
      "Famous for authentic Ekpang and warm hospitality, Esandidia has been serving Uyo families for years.",
    image: esaNdiaImg,
    ownerImage: mmaekpangOwner,
    link: "/order/esandidia",
    menu: [
      { name: "Ekpang Nkwukwo", price: 2500 },
      { name: "Afia Efere", price: 2000 },
    ],
    category: "Soups",
    rating: 4.6,
    distance: 2.5,
    supportsPickup: false,
  },
  {
    name: "Afedndia",
    tagline: "Order Now",
    description:
      "Known for rich coconut rice and pepper soup, Afedndia Kitchen brings comfort food to your doorstep.",
    image: afedndiaImg,
    ownerImage: paulafediaOwner,
    link: "/order/afedndia",
    menu: [
      { name: "Coconut Rice", price: 2200 },
      { name: "Pepper Soup", price: 1800 },
      { name: "Afia Efere", price: 2000 },
      { name: "Edikan Ikong", price: 2500 },
      { name: "Afang Soup", price: 2300 },
    ],
    category: "Soups",
    rating: 4.3,
    distance: 3.2,
    supportsPickup: true,
  },
  {
    name: "Crunchies",
    tagline: "Family dining with variety",
    description: "Known for Atama Soup and rice dishes.",
    image: crunchiesImg,
    ownerImage: mukacrunchiesOwner,
    link: "/order/crunchies",
    menu: [
      { name: "Atama Soup & Fufu", price: 2400 },
      { name: "Fried Rice & Chicken", price: 2800 },
      { name: "Afang Soup", price: 2300 },
    ],
    category: "Soups",
    rating: 4.2,
    distance: 3.5,
    supportsPickup: true,
  },
  {
    name: "Chicken Republic",
    tagline: "Fast food, Nigerian style",
    description: "Popular for Ekpang Nkwukwo and grilled chicken combos.",
    image: chickenRepublicImg,
    ownerImage: republicOwner,
    link: "/order/chicken-republic",
    menu: [
      { name: "Ekpang Nkwukwo", price: 2700 },
      { name: "Grilled Chicken Combo", price: 3500 },
    ],
    category: "Grills",
    rating: 4.0,
    distance: 4.0,
    supportsPickup: true,
  },
];

export default restaurants;
