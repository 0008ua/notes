import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.notes.homegames',
  appName: 'notes',
  webDir: '../public',
  server: {
    androidScheme: 'https',
  },
};

export default config;
