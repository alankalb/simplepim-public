import { EmptyState, Layout, Page, ResourcePicker } from '@shopify/polaris';
import store from 'store-js';

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