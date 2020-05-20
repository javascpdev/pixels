import App from '~/app/app';
import { ArrowForwardSvg } from '~/svg';
import { Button } from '@rmwc/button';
import Link from 'next/link';
import Logo from '~/top-bar/logo';
import Menu from '~/top-bar/menu';
import Title from '~/top-bar/title';
import constants from '~/constants';

export default function Index() {
  return (
    <App>
      <Logo />
      <Title />
      <Menu>
        <Link href={constants.ROUTES.LOGIN}>
          <a>
            <Button outlined>Login</Button>
          </a>
        </Link>
      </Menu>
      <p>Hey y'all</p>
    </App>
  );
}
