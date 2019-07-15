import { EmptyState, Layout, Page, ResourcePicker } from '@shopify/polaris';
import CreateProduct from '../components/CreateProduct';
import ReadProduct from '../components/ReadProduct';
import UpdateProduct from '../components/UpdateProduct';
import DeleteProduct from '../components/DeleteProduct';



class Index extends React.Component {
  render() {
    return (
      <Page >
        <Layout>
          <Layout.Section>
            This is an unlisted public app!
          </Layout.Section>
        </Layout>
      </Page>
 
    );
  }
}

export default Index;