import { build } from 'vite';

async function runBuild() {
  try {
    await build();
    console.log('Build completed successfully.');
  } catch (e) {
    console.error('Build failed:', e);
    process.exit(1);
  }
}

runBuild();
