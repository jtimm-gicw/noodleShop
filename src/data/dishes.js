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
    
  },
  {
    id: '2',
    name: 'Drunken Noodles (Pad Kee Mao)',
    price: 9.49,
    image: require('../../assets/drunken-noodles.jpg'),
    
  },
  {
    id: '3',
    name: 'Tom Yum Noodle Soup',
    price: 10.5,
    image: require('../../assets/tom-yum-noodles.jpg')
  },
  {
    id: '4',
    name: 'Khao Soi',
    price: 11.0,
    image: require('../../assets/khao-soi.jpg')
  },
  {
    id: '5',
    name: 'Glass Noodles (Pad Woon Sen)',
    price: 8.5,
    image: require('../../assets/pad-woon-sen.jpg')
  },
  {
    id: '6',
    name: 'Boat Noodles (Kuay Teow Reua)',
    price: 7.99,
    image: require('../../assets/boat-noodles.jpg')
  },
  {
    id: '7',
    name: 'Yen Ta Fo (Pink Noodle Soup)',
    price: 10.0,
    image: require('../../assets/yen-ta-fo.jpg')
  },
  {
    id: '8',
    name: 'Stir-fried Rice Noodles with Beef (Rad Na)',
    price: 9.25,
    image: require('../../assets/rad-na.jpg')
  },
  {
    id: '9',
    name: 'Thai Curry Noodles (Panang Noodles)',
    price: 11.5,
    image: require('../../assets/panang-noodles.jpg')
  },
  {
    id: '10',
    name: 'Pad Mama',
    price: 12.0,
    image: require('../../assets/pad-mama.jpg')
  },
];

export default dishes;
