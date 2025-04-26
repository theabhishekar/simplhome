interface VapiSDK {
  run: (config: {
    apiKey: string;
    assistant: string;
    config: any;
  }) => any;
}

declare global {
  interface Window {
    vapiSDK: VapiSDK;
    vapiInstance: any;
  }
}

export {};