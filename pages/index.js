import { EmptyState, Layout, Page, ResourcePicker } from '@shopify/polaris';
import CreateProduct from '../components/CreateProduct';



class Index extends React.Component {
  render() {
    
    return (
      <Page fullWidth >
        <Layout>
          <CreateProduct></CreateProduct>
        </Layout>
      </Page>
    );
  }

}

export default Index;