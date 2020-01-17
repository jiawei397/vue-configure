export const snackbar = function(eventName: string, message: string, isNoAlert: boolean = false) {
  if (isNoAlert) {
    if (eventName in console) {
      (console as any)[eventName](message);
    } else {
      console.error(message);
    }
    return;
  }
  if (parent !== window) {
    const msg = {
      eventName,
      message
    };
    parent.postMessage(JSON.stringify(msg), '*'); // 传递给复组件处理
    return;
  }
  (window as any).vm.$Message[eventName](message);
};
export const success = function(message: string, isNoAlert = false) {
  snackbar('success', message, isNoAlert);
};

export const warn = function(message: string, isNoAlert = false) {
  snackbar('warning', message, isNoAlert);
};

export const error = function(message: string, isNoAlert = false) {
  snackbar('error', message, isNoAlert);
};

export const info = function(message: string, isNoAlert = false) {
  snackbar('info', message, isNoAlert);
};
