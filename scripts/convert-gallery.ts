import sharp from 'sharp';
import fs from 'fs';
const files = ['contact-gallery-01', 'contact-gallery-02', 'contact-gallery-03'];
async function main() {
  for (const name of files) {
    const input = 'public/images/paintings/' + name + '.jpg';
    const output = input.replace('.jpg', '.webp');
    if (fs.existsSync(output)) { console.log('  skipped ' + name); continue; }
    await sharp(input).webp({quality:82}).toFile(output);
    console.log('  ✓ ' + name + '.webp — ' + (fs.statSync(output).size/1024).toFixed(0) + 'KB');
  }
}
main();
