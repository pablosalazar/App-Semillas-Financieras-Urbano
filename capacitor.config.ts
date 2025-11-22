import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.semillasfinancieras.urbano',
  appName: 'Semillas Financieras Urbano',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    // Optimize for tablets
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;
