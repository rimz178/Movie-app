const isDev = __DEV__;

export const logger = {
  log: (message, ...optionalParams) => {
    if (isDev) {
      console.log(message, ...optionalParams);
    }
  },
  
  error: (message, ...optionalParams) => {
    if (isDev) {
      console.error(message, ...optionalParams);
    }
  }
};