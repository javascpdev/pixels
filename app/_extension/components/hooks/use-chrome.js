import getEnvironment from '~/utilities/get-environment';

const { IS_SERVER } = getEnvironment();

export default function useChrome() {
  return IS_SERVER ? null : chrome || browser || null;
}
