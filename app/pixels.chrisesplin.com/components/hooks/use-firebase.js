/* globals window */

export default function useFirebase() {
  return process.browser ? window.firebase : {};
}
