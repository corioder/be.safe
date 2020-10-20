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
    case 'Aktywne przypadki':
    case 'Osoby na kwarantannie':
    case 'Osoby pod nadzorem epidemiologicznym':
    case 'Liczba aktywnych na 100 000 osób':
      color = colors.orange;
      break;
    case 'aware':
    case 'Potwierdzone przypadki':
    case 'Hospitalizowani':
      color = colors.cinnabar;
      break;
    case 'proactive':
    case 'Wyzdrowieli':
      color = colors.shamrockGreen;
      break;
    case 'Zgony':
    case 'Zajęte respiratory':
      color = colors.richBlack;
      break;
    default:
      color = colors.littleBoyBlue;
      break;
  }
  return color;
};
