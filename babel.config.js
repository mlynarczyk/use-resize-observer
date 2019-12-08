module.exports = function(api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { flow: false, typescript: true }],
    '@babel/preset-typescript',
  ];

  return {
    presets,
  };
};
