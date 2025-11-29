import type { AppConfig } from './lib/types';

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Gvoice',
  pageTitle: 'Gvoice Voice Agent',
  pageDescription: 'A voice agent built with Gvoice',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/gts-logo.png',
  accent: '#002cf2',
  logoDark: '/gts-logo-dark.png',
  accentDark: '#1fd5f9',
  startButtonText: 'Start call',
};
