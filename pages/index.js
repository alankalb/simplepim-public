import { EmptyState, Layout, Page, ResourcePicker } from '@shopify/polaris';
import CreateProduct from '../components/CreateProduct';



class Index extends React.Component {
  state = { open: false };
  render() {
    
    return (
      <Page
        title="Simple PIM Example"
        separator
      >
        <CreateProduct></CreateProduct>
      </Page>
    );
  }

}

export default Index;