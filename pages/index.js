import { EmptyState, Layout, Page, ResourcePicker } from '@shopify/polaris';
import CreateProduct from '../components/CreateProduct';



class Index extends React.Component {
  render() {
    
    return (
      <Page >
        <Layout>
          <Layout.Section>
          <CreateProduct></CreateProduct>
          </Layout.Section>
        </Layout>
      </Page>
 
    );
  }

}

export default Index;