import sharp from 'sharp';
import fs from 'fs';
async function main() {
  const input = 'public/images/paintings/footer-atmosphere.jpg';
  const output = 'public/images/paintings/footer-atmosphere.webp';
  if (fs.existsSync(output)) { console.log('  skipped'); return; }
  await sharp(input).webp({quality:82}).toFile(output);
  console.log('  ✓ footer-atmosphere.webp — ' + (fs.statSync(output).size/1024).toFixed(0) + 'KB');
}
main();
