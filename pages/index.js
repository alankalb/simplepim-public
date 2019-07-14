import { EmptyState, Layout, Page, ResourcePicker } from '@shopify/polaris';
import CreateProduct from '../components/CreateProduct';



class Index extends React.Component {
  render() {
    
    return (
      <Page fullWidth>
        <CreateProduct></CreateProduct>
      </Page>
        

    );
  }

}

export default Index;