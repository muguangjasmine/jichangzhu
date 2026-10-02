const fs = require('fs');
const filePath = 'node_modules/nextra/dist/loader.mjs';
let content = fs.readFileSync(filePath, 'utf8');

const target = "const themeConfigImport = themeConfig ? `import __nextra_themeConfig from '${slash(path.resolve(themeConfig))}'` : \"\";";
const replacement = "let relThemeConfig = slash(path.relative(path.dirname(mdxPath), path.resolve(themeConfig))); if (!relThemeConfig.startsWith('.')) relThemeConfig = './' + relThemeConfig; const themeConfigImport = themeConfig ? `import __nextra_themeConfig from '${relThemeConfig}'` : \"\";";

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully patched loader.mjs');
} else {
  console.log('Target not found in loader.mjs');
}
