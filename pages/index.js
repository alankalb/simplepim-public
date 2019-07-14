import { EmptyState, Layout, Page, ResourcePicker } from '@shopify/polaris';
import CreateProduct from '../components/CreateProduct';



class Index extends React.Component {
  render() {
    
    return (
      <Page fullWidth title="API Learning" separator>
        <CreateProduct></CreateProduct>
      </Page>
        

    );
  }

}

export default Index;