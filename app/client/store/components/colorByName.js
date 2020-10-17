export default (text) => {
  const colors = {
    richBlack: '#011627',
    babyPowder: '#fdfffc',
    littleBoyBlue: '#72a1e5',
    cinnabar: '#e94f37',
    orange: '#ff850a',
    shamrockGreen: '#329f5b',
  };
  let color;
  switch (text) {
    case 'informed':
      color = colors.orange;
      break;
    case 'aware':
    case 'confirmed':
      color = colors.cinnabar;
      break;
    case 'proactive':
      color = colors.shamrockGreen;
      break;
    default:
      color = colors.littleBoyBlue;
      break;
  }
  return color;
};
