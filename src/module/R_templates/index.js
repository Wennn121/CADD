// src/module/R_templates/index.js
const req = require.context('.', false, /\.js$/);
const scriptTemplates = {};
req.keys().forEach((file) => {
  if (file === './index.js') return; 
  const key = file.replace('./', '').replace('.js', '');
  scriptTemplates[key] = req(file).default;
});

export default scriptTemplates;

