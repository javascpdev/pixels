export default function parseSearch(search) {
  const params = search.slice(1).split('&');

  return params.reduce((result, param) => {
    const [key, value] = param.split('=');

    result[key] = value;

    return result;
  }, {});
}
