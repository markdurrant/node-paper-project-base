var thick = {
  black:       {strokeColor: '#333333'},
  grey:        {strokeColor: '#d2dcdd'},
  brown:       {strokeColor: '#563333'},
  red:         {strokeColor: '#fc384b'},
  orange:      {strokeColor: '#fe8e2c'},
  yellow:      {strokeColor: '#ffff8b'},
  lightGreen:  {strokeColor: '#91f269'},
  darkGreen:   {strokeColor: '#1a924d'},
  lightBlue:   {strokeColor: '#1598e9'},
  darkBlue:    {strokeColor: '#3740ae'},
  purple:      {strokeColor: '#7a27a8'},
  pink:        {strokeColor: '#f02dab'}
};

Object.keys(thick).forEach(function(color) {
  thick[color].strokeWidth = 1.5;
  thick[color].strokeCap = 'round';
});

var thin = {
  black:       {strokeColor: '#333333'},
  darkGrey:    {strokeColor: '#6f6b78'},
  lightGrey:   {strokeColor: '#d8dfea'},
  yellow:      {strokeColor: '#ffff7d'},
  brown:       {strokeColor: '#503032'},
  brownOrange: {strokeColor: '#b5683d'},
  orange:      {strokeColor: '#fe9b41'},
  red:         {strokeColor: '#fd4f64'},
  lightPink:   {strokeColor: '#f33bab'},
  darkPink:    {strokeColor: '#e14970'},
  lightPurple: {strokeColor: '#e933ca'},
  darkPurple:  {strokeColor: '#8b46b9'},
  darkBlue:    {strokeColor: '#1b5dc2'},
  midBlue:     {strokeColor: '#239cee'},
  lightBlue:   {strokeColor: '#239cee'},
  cyan:        {strokeColor: '#9cfdf5'},
  lightGreen:  {strokeColor: '#8ff360'},
  darkGreen:   {strokeColor: '#22a05c'},
  greenBrown:  {strokeColor: '#76844e'}
};

Object.keys(thin).forEach(function(color) {
  thin[color].strokeWidth = 0.5;
  thin[color].strokeCap = 'round';
});

exports.thick = thick;
exports.thin = thin;