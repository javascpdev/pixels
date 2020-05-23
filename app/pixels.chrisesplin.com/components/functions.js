/* globals window */
export default {
  imgurRefreshOAuth2: function imgurRefreshOAuth2(arg) {
    return functions().httpsCallable('imgurRefreshOAuth2')(arg);
  },
};

function functions() {
  return window.firebase.functions();
}
