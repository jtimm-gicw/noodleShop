// src/data/dishes.js
// 10 noodle dishes (id, name, price, image).
// Images below are placeholder URLs so the app shows photos immediately.
// To use local images instead, add files to /assets (project root) and
// replace image: 'https://...' with image: require('../../assets/pad_thai.jpg')
// -- adjust the relative path depending on your file structure.

const dishes = [
  {
    id: '1',
    name: 'Pad Thai',
    price: 8.99,
    image: require('../../assets/pad-thai.jpg'),
    description:
      'Thailand’s signature stir-fried rice noodles with egg, tofu, bean sprouts, and crushed peanuts in a tangy tamarind sauce.',
  },
  {
    id: '2',
    name: 'Drunken Noodles (Pad Kee Mao)',
    price: 9.49,
    image: require('../../assets/drunken-noodles.jpg'),
    description:
      'Spicy stir-fried flat noodles with fresh chili, garlic, basil, vegetables, and your choice of protein — bold and flavorful!',
  },
  {
    id: '3',
    name: 'Tom Yum Noodle Soup',
    price: 10.5,
    image: require('../../assets/tom-yum-noodles.jpg'),
    description:
      'A hot and sour noodle soup with lemongrass, lime leaves, chili paste, mushrooms, and shrimp in a rich aromatic broth.',
  },
  {
    id: '4',
    name: 'Khao Soi',
    price: 11.0,
    image: require('../../assets/khao-soi.jpg'),
    description:
      'Northern Thai curry noodle soup made with coconut milk, tender chicken, egg noodles, and crispy toppings for texture.',
  },
  {
    id: '5',
    name: 'Glass Noodles (Pad Woon Sen)',
    price: 8.5,
    image: require('../../assets/pad-woon-sen.jpg'),
    description:
      'Light and savory stir-fried glass noodles with egg, cabbage, carrots, and a hint of soy — perfect comfort food.',
  },
  {
    id: '6',
    name: 'Boat Noodles (Kuay Teow Reua)',
    price: 7.99,
    image: require('../../assets/boat-noodles.jpg'),
    description:
      'Rich, dark broth made from herbs and spices, served with rice noodles, sliced beef or pork, and fresh herbs.',
  },
  {
    id: '7',
    name: 'Yen Ta Fo (Pink Noodle Soup)',
    price: 10.0,
    image: require('../../assets/yen-ta-fo.jpg'),
    description:
      'A vibrant pink noodle soup flavored with fermented bean curd, seafood, tofu, and morning glory for a tangy twist.',
  },
  {
    id: '8',
    name: 'Stir-fried Rice Noodles with Beef (Rad Na)',
    price: 9.25,
    image: require('../../assets/rad-na.jpg'),
    description:
      'Silky wide rice noodles topped with tender beef and Chinese broccoli, covered in a thick, savory gravy sauce.',
  },
  {
    id: '9',
    name: 'Thai Curry Noodles (Panang Noodles)',
    price: 11.5,
    image: require('../../assets/panang-noodles.jpg'),
    description:
      'Creamy Panang curry sauce tossed with rice noodles, bell peppers, and basil — spicy, sweet, and full of flavor.',
  },
  {
    id: '10',
    name: 'Pad Mama',
    price: 12.0,
    image: require('../../assets/pad-mama.jpg'),
    description:
      'A fun street-style noodle dish made with instant Mama noodles stir-fried with vegetables, egg, and a savory sauce.',
  },
];



export default dishes;
