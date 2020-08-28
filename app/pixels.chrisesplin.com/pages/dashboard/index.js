import App from '~/app/app';
import Logo from '~/top-bar/logo';
import Menu from '~/top-bar/menu';
import Title from '~/top-bar/title';
import ToolkitsGrid from "~/toolkit/toolkits-grid";

export default function Index() {
  return (
    <App secure>
      <Logo />
      <Title />
      <Menu />
      <ToolkitsGrid />
    </App>
  );
}
