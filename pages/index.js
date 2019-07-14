import { Page } from '@shopify/polaris';
import CreateProduct from '../components/CreateProduct';

const Index = () => (
  <div>
  <Page
    title="Simple PIM Example"
    separator
  >
    <CreateProduct></CreateProduct>
  </Page>
</div>
);

export default Index;