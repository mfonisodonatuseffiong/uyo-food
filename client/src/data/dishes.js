const dishes = [
  {
    name: "Edikan Ikong",
    image: "/src/assets/images/gallery/vegetable.webp",
    description: "A rich vegetable soup made with waterleaf and fluted pumpkin.",
    price: 2500,              // ✅ default price
    rating: 4.5,              // ✅ default rating
    tag: "Chef's Choice",     // ✅ badge
    delay: 0,
    trending: true            // ✅ for carousel
  },
  {
    name: "Afia Efere",
    image: "/src/assets/images/gallery/Afiaefere.webp",
    description: "White soup delicacy, often served with swallow.",
    price: 2000,
    rating: 4.2,
    tag: "Trending",
    delay: 0.2,
    trending: true
  },
  {
    name: "Atama Soup",
    image: "/src/assets/images/gallery/Atama.webp",
    description: "Palm nut soup cooked with Atama leaves, full of flavour.",
    price: 2400,
    rating: 4.0,
    tag: "Spicy",
    delay: 0.4,
    trending: false
  },
  {
    name: "Ekpang Nkuwo",
    image: "/src/assets/images/gallery/ekpang.webp",
    description: "Cocoyam wrapped in leaves, a traditional Efik dish.",
    price: 2700,
    rating: 4.7,
    tag: "Chef's Choice",
    delay: 0.6,
    trending: true
  },
  {
    name: "Afang",
    image: "/src/assets/images/gallery/afang.webp",
    description: "Delicious vegetable soup made with okazi leaves.",
    price: 2200,
    rating: 4.3,
    tag: "Popular",
    delay: 0.8,
    trending: false
  }
];

export default dishes;
