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
    image: 'https://via.placeholder.com/800x500.png?text=Pad+Thai',
    // local option: image: require('../../assets/pad_thai.jpg')
  },
  {
    id: '2',
    name: 'Drunken Noodles (Pad Kee Mao)',
    price: 9.49,
    image: 'https://via.placeholder.com/800x500.png?text=Drunken+Noodles',
    // local option: image: require('../../assets/drunken_noodles.jpg')
  },
  {
    id: '3',
    name: 'Tom Yum Noodle Soup',
    price: 10.5,
    image: 'https://via.placeholder.com/800x500.png?text=Tom+Yum+Noodles',
    // local option: image: require('../../assets/tom_yum_noodles.jpg')
  },
  {
    id: '4',
    name: 'Khao Soi',
    price: 11.0,
    image: 'https://via.placeholder.com/800x500.png?text=Khao+Soi',
    // local option: image: require('../../assets/khao_soi.jpg')
  },
  {
    id: '5',
    name: 'Glass Noodles (Pad Woon Sen)',
    price: 8.5,
    image: 'https://via.placeholder.com/800x500.png?text=Pad+Woon+Sen',
    // local option: image: require('../../assets/pad_woon_sen.jpg')
  },
  {
    id: '6',
    name: 'Boat Noodles (Kuay Teow Reua)',
    price: 7.99,
    image: 'https://via.placeholder.com/800x500.png?text=Boat+Noodles',
    // local option: image: require('../../assets/boat_noodles.jpg')
  },
  {
    id: '7',
    name: 'Yen Ta Fo (Pink Noodle Soup)',
    price: 10.0,
    image: 'https://via.placeholder.com/800x500.png?text=Yen+Ta+Fo',
    // local option: image: require('../../assets/yen_ta_fo.jpg')
  },
  {
    id: '8',
    name: 'Stir-fried Rice Noodles with Beef (Rad Na)',
    price: 9.25,
    image: 'https://via.placeholder.com/800x500.png?text=Rad+Na',
    // local option: image: require('../../assets/rad_na.jpg')
  },
  {
    id: '9',
    name: 'Thai Curry Noodles (Panang Noodles)',
    price: 11.5,
    image: 'https://via.placeholder.com/800x500.png?text=Panang+Noodles',
    // local option: image: require('../../assets/panang_noodles.jpg')
  },
  {
    id: '10',
    name: 'Seafood Rice Noodle Stir-Fry',
    price: 12.0,
    image: 'https://via.placeholder.com/800x500.png?text=Seafood+Stir+Fry',
    // local option: image: require('../../assets/seafood_stirfry.jpg')
  },
];

export default dishes;
