import { EmptyState, Layout, Page, ResourcePicker } from '@shopify/polaris';
import CreateProduct from '../components/CreateProduct';
import ReadProduct from '../components/ReadProduct';
import UpdateProduct from '../components/UpdateProduct';



class Index extends React.Component {
  render() {
    return (
      <Page >
        <Layout>
          <Layout.Section>
            <CreateProduct></CreateProduct>
            <ReadProduct></ReadProduct>
            <UpdateProduct></UpdateProduct>
          </Layout.Section>
        </Layout>
      </Page>
 
    );
  }
}

export default Index;