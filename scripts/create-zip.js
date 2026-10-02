const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const parentDir = path.join(projectRoot, '..');
const localZip = path.join(projectRoot, 'jichangzhu.cyou.zip');
const parentZip = path.join(parentDir, 'jichangzhu.cyou.zip');
const sourceZip = path.join(parentDir, 'jichangzhu.cyou-source.zip');

console.log('🚀 开始执行一键“生成网站”与打包全流程...\n');

// 1. 生成全站页面内容
console.log('1️⃣ 正在生成全站 MDX 页面、导航与 50 题 FAQ...');
execSync('node scripts/generate-all.js', { cwd: projectRoot, stdio: 'inherit' });

// 2. Nextra 编译与静态导出
console.log('\n2️⃣ 正在使用 Nextra 进行生产环境编译与静态导出 (next build)...');
execSync('node patch-loader.js && npx next build && node scripts/post-build.js', { cwd: projectRoot, stdio: 'inherit' });

// 3. 执行验证
console.log('\n3️⃣ 正在执行全站指标自动化核验 (verify-site)...');
execSync('node scripts/verify-site.js', { cwd: projectRoot, stdio: 'inherit' });

// 4. 打包 out 静态输出目录为部署包
console.log('\n4️⃣ 正在将 out/ 目录打包为生产部署压缩包 (jichangzhu.cyou.zip)...');
const outPath = path.join(projectRoot, 'out', '*');

[localZip, parentZip].forEach(z => {
  if (fs.existsSync(z)) {
    try { fs.unlinkSync(z); } catch (e) {}
  }
});

try {
  execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${outPath}' -DestinationPath '${parentZip}' -Force"`, {
    cwd: projectRoot,
    stdio: 'inherit'
  });
  if (fs.existsSync(parentZip)) {
    fs.copyFileSync(parentZip, localZip);
    const sizeMB = (fs.statSync(parentZip).size / (1024 * 1024)).toFixed(2);
    console.log(`✅ 生产部署压缩包生成成功:`);
    console.log(`   - ${parentZip} (${sizeMB} MB)`);
    console.log(`   - ${localZip} (${sizeMB} MB)`);
  }
} catch (e) {
  console.error('打包部署压缩包出错:', e.message);
}

// 5. 打包完整源码归档（排除 node_modules, .next, out 等）
try {
  console.log('\n5️⃣ 正在打包完整源码归档 (jichangzhu.cyou-source.zip)...');
  if (fs.existsSync(sourceZip)) {
    try { fs.unlinkSync(sourceZip); } catch (e) {}
  }
  execSync(`powershell -NoProfile -Command "Get-ChildItem -Path '${projectRoot}' -Exclude 'node_modules', '.next', 'out', '.git', '*.zip' | Compress-Archive -DestinationPath '${sourceZip}' -Force"`, {
    cwd: projectRoot,
    stdio: 'inherit'
  });
  if (fs.existsSync(sourceZip)) {
    const srcSizeMB = (fs.statSync(sourceZip).size / (1024 * 1024)).toFixed(2);
    console.log(`✅ 源码归档压缩包生成成功:`);
    console.log(`   - ${sourceZip} (${srcSizeMB} MB)`);
  }
} catch (e) {
  console.error('打包源码出错:', e.message);
}

console.log('\n🎉 网站生成与部署包打包全部顺利完成！');
