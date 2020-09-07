import { ArrowForwardSvg } from '~/svg';
import { Button } from '@rmwc/button';
import Landing from '~/md/landing.mdx';
import Link from 'next/link';
import Logo from '~/top-bar/logo';
import MarkdownWrapper from '~/app/markdown-wrapper';
import Menu from '~/top-bar/menu';
import Title from '~/top-bar/title';
import constants from '~/constants';

export default function Index() {
  return (
    <MarkdownWrapper>
      <Logo />
      <Title />
      <Menu>
        <Link href={constants.ROUTES.LOGIN}>
          <a>
            <Button outlined>Login</Button>
          </a>
        </Link>
      </Menu>
      <Landing />
    </MarkdownWrapper>
  );
}
