import esaNdiaImg from "../assets/images/gallery/Esandidia.webp";
import afedndiaImg from "../assets/images/gallery/Afendia.webp";
import crunchiesImg from "../assets/images/gallery/crunchies.webp";
import chickenRepublicImg from "../assets/images/gallery/chickenrepublic.webp";

const restaurants = [
  {
    name: "Esandidia",
    tagline: "Order Now",
    description:
      "Famous for authentic Ekpang and warm hospitality, Esandidia has been serving Uyo families for years.",
    image: esaNdiaImg,
    link: "/order/esandidia",
    menu: ["Ekpang Nkuwo", "Afia Efere"], // ✅ aligned with dishes.js
    category: "Soups",
    rating: 4.6,
    price: 3000,
    distance: 2.5,
    supportsPickup: false,   // ✅ Delivery only
  },
  {
    name: "Afedndia",
    tagline: "Order Now",
    description:
      "Known for rich coconut rice and pepper soup, Afedndia Kitchen brings comfort food to your doorstep.",
    image: afedndiaImg,
    link: "/order/afedndia",
    menu: ["Coconut Rice", "Pepper Soup", "Afia Efere", "Edikan Ikong", "Afang"], 
    category: "Soups",
    rating: 4.3,
    price: 2500,
    distance: 3.2,
    supportsPickup: true,    // ✅ Offers both delivery and pickup
  },
  {
    name: "Crunchies",
    tagline: "Family dining with variety",
    description: "Known for Atama Soup and rice dishes.",
    image: crunchiesImg,
    link: "/order/crunchies",
    menu: ["Atama Soup", "Rice Dishes", "Afang"], 
    category: "Soups",
    rating: 4.2,
    price: 2200,
    distance: 3.5,
    supportsPickup: true,    // ✅ Offers pickup
  },
  {
    name: "Chicken Republic",
    tagline: "Fast food, Nigerian style",
    description: "Popular for Ekpang Nkuwo and grilled chicken combos.",
    image: chickenRepublicImg,
    link: "/order/chicken-republic",
    menu: ["Ekpang Nkuwo", "Grilled Chicken"], 
    category: "Grills",
    rating: 4.0,
    price: 2000,
    distance: 4.0,
    supportsPickup: true,    // ✅ Offers pickup
  },
];

export default restaurants;
