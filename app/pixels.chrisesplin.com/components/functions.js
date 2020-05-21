/* globals window */
export default {
  sampleFunc: function sampleFunc(arg) {
    return functions().httpsCallable('sampleFunc')(arg);
  },
};

function functions() {
  return window.firebase.functions();
}
