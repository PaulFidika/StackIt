const palette = {
  yellow: 0xfff489,
  pink: 0xffdcfc,
  lightBlue: 0xedc6ff,
  darkBlue: 0x162d47,
  purple: 0xc4ddff,
  red: 0xffb8b8,
  white: 0xffffff,
  gray: 0xaaaaaa,
  black: 0x000000,
};

const pastelWheel = [
  0xffadad,
  0xffd6a5,
  0xfdffb6,
  0xcaffbf,
  0x9bf6ff,
  0xa0c4ff,
  0xbdb2ff,
  0xffc6ff,
];

function getWheelColor(index) {
  return pastelWheel[index % pastelWheel.length];
}

export { pastelWheel, getWheelColor };
export default palette;
