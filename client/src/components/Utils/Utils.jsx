/* SideMenu component */
export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "accueil",
      },
    ],
  },
  {
    title: "Apps",
    links: [
      {
        name: "products/all",
      },
      {
        name: "cart",
      },
      {
        name: "myorders",
      },
    ],
  },
];

/* Carousel Data */
export const carouselData = [
  {
    title: "NOUVEAUTÉS",
    cat: "all",
    baseline: "Découvrez les nouveaux produits disponibles chez RIDESHOP !",
    img: "https://res.cloudinary.com/dx5ip73lv/image/upload/c_scale,h_1200/v1655816095/ecommerce/campcar.jpg",
  },
  {
    title: "EQUIPEMENT SPORTIF",
    cat: "sport",
    baseline: "Tous les equipements, accessoires dont vous avez besoin...",
    img: "https://res.cloudinary.com/dx5ip73lv/image/upload/c_scale,h_1200/v1655816093/ecommerce/surfcar.jpg",
  },
  {
    title: "LE SKATE.SHOP",
    cat: "skate",
    baseline: "Visitez le Skate.Shop : skateboard, cruser, longboard...",
    img: "https://res.cloudinary.com/dx5ip73lv/image/upload/c_scale,h_1200/v1655816093/ecommerce/skatecar.jpg",
  },
];

/* Categories Data */
export const categoriesData = [
  {
    id: 1,
    img: "https://res.cloudinary.com/dx5ip73lv/image/upload/c_scale,h_1200/v1655816429/ecommerce/paddlecat_ijq9tz.jpg",
    title: "OUTDOOR",
    cat: "outdoor",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/dx5ip73lv/image/upload/c_scale,h_1200/v1655815620/ecommerce/womancat.jpg",
    title: "FEMME",
    cat: "femme",
  },

  {
    id: 3,
    img: "https://res.cloudinary.com/dx5ip73lv/image/upload/c_scale,h_1200/v1655815613/ecommerce/authbg.jpg",
    title: "TEXTILE",
    cat: "textile",
  },
  {
    id: 4,
    img: "https://res.cloudinary.com/dx5ip73lv/image/upload/c_scale,h_1200/v1655815617/ecommerce/mancat.jpg",
    title: "HOMME",
    cat: "homme",
  },
];

/* Sidebar Categories */
export const categories = [
  {
    id: 1,
    name: "Textile",
    subCat: [
      {
        id: 1,
        name: "Chaussures",
        link: "products/chaussures",
      },
      {
        id: 2,
        name: "Tshirt",
        link: "products/tshirt",
      },
    ],
    link: "products/textile",
  },
  {
    id: 2,
    name: "Equipement Outdoor",
    subCat: [
      {
        id: 1,
        name: "Paddle",
        link: "products/paddle",
      },
      {
        id: 2,
        name: "Skate",
        link: "products/skate",
      },
      {
        id: 3,
        name: "Randonnée",
        link: "products/randonnée",
      },
    ],
    link: "products/sport",
  },
];

/* Admin Page utils */
export const adminPages = [
  {
    id: 1,
    name: "Liste des produits",
    link: "admin/productlist",
  },
  {
    id: 2,
    name: "Ajouter un produit",
    link: "admin/addnew",
  },
  {
    id: 3,
    name: "Toutes les commandes",
    link: "/admin/allorders",
  },
];
export const userUtils = [
  {
    id: 1,
    name: "Panier",
    link: "cart",
  },
  {
    id: 2,
    name: "Commandes",
    link: "myOrders",
  },
  {
    id: 3,
    name: "Déconnexion",
    link: "logout",
  },
];
