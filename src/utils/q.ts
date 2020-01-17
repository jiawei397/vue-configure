/**
 * Q的接口
 */
const Q: any = {};
Q.defer = function() {
  let _resolve;
  let _reject;
  const promise = new Promise(function(resolve, reject) {
    _resolve = resolve;
    _reject = reject;
  });
  return {
    resolve: _resolve,
    reject: _reject,
    promise
  };
};
Q.reject = Promise.reject;
Q.resolve = Promise.resolve;
Q.all = Promise.all;
// obj.each = Promise.each;
// obj.join = Promise.join;
Q.isPromise = function(promise: any) {
  return promise instanceof Promise;
};

export default Q;
