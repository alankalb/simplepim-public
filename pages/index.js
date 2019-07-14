import { EmptyState, Layout, Page, ResourcePicker } from '@shopify/polaris';
import CreateProduct from '../components/CreateProduct';
import ReadProduct from '../components/ReadProduct';



class Index extends React.Component {
  render() {
    return (
      <Page >
        <Layout>
          <Layout.Section>
          
          <ReadProduct></ReadProduct>
          </Layout.Section>
        </Layout>
      </Page>
 
    );
  }
}

export default Index;