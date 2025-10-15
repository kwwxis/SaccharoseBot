import { runEtsc } from './src/pipeline/esbuild-tsc';

(async () => {
  console.time('Build completed');
  await runEtsc('etsc.config.cjs');
  console.timeEnd('Build completed');
})();
