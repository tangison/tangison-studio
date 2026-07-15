import sharp from 'sharp';
import fs from 'fs';
const files = ['homepage-proavia', 'homepage-nalago', 'homepage-clusterleaf'];
async function main() {
  for (const name of files) {
    const input = 'public/images/paintings/projects/' + name + '.jpg';
    const output = input.replace('.jpg', '.webp');
    if (fs.existsSync(output)) { console.log('  skipped ' + name); continue; }
    if (!fs.existsSync(input) || fs.statSync(input).size === 0) { console.log('  SKIP ' + name); continue; }
    await sharp(input).webp({quality:82}).toFile(output);
    console.log('  ✓ ' + name + '.webp — ' + (fs.statSync(output).size/1024).toFixed(0) + 'KB');
  }
}
main();
