import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'liya-rn-app',
  slug: 'liya-rn-app',
  entryPoint: "./src/index.ts"
});