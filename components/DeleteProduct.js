import { TextField, Layout, Card, FormLayout, TextContainer, Form, TextStyle, PageActions } from '@shopify/polaris';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const PROD_DELETE = gql`
  mutation productDelete($input: ProductDeleteInput!) {
  productDelete(input: $input) {
    product {
      id
      title
      description
      variants (first:1) {
        edges {
          node {
            id
            price
          }
        }
      } 
    }
  }
}
`

class ReadProduct extends React.Component {
  state = {
    id: '',
    response_id : '',
    loading: false,
    displaySuccess: false
  };

  handleChange = field => {
    return value => this.setState({ [field]: value });
  };


  render() {
    let successCard = <Card.Section></Card.Section>
    if (this.state.loading){
      successCard = <Card.Section>
        <TextContainer>
          <p>Deleting Product...</p>
        </TextContainer>
      </Card.Section>
    }
    if (this.state.data && !this.state.loading){
      successCard = <Card.Section>
        <TextContainer>
        <p>API Response</p>
        <p>{"{"}</p>
              <p className="indent1" >
                {'"'}deleted_id{'"'}: {this.state.response_id},
              </p>
              <p className="indent0" >
                {"}"}
              </p>
              <p>{' '}</p>
              <p>Has your product been deleted from the admin?</p>
        </TextContainer>
      </Card.Section>
    }
    

    return (
      <Mutation 
        mutation={PROD_DELETE}
        onCompleted={(data) => {
          console.log(data)
          this.setState({data:true})
          this.setState({loading:false})
          var id = data.productUpdate.product.id.replace('gid://shopify/Product/', '')
          this.setState({response_id: id})
        }}
      >
        {(handleSubmit, {error, loading, data}) => {
        return (

        <Card
          title="Delete a Product"
          sectioned
          primaryFooterAction={
            {
              content: 'Delete Product',
              onAction: () => {
                this.setState({loading:true})
                const productInput = {
                  id: 'gid://shopify/Product/'+this.state.id
                };
                handleSubmit({
                  variables: {input: productInput}
                });
              }
            }
          }
        >
          <Card.Section>
            <p>
            The second action we will do with the API is Read. Using the Shopify API, we will Read a product using the GET endpoint. Copy the ID from the product you created above and input it into the ID field. Notice the ID is inserted into the URL below. For a GET request, we don't need to send Shopify a JSON body; all we need to do is provide a URL with the proper product ID. Once you click 'Read Product', our app will request the product information from the GET Endpoint.
            </p>
            <p>{' '}</p>
            <p>
            After we send our API request, Shopify will send back a response with our requested product information.
            </p>
          </Card.Section>
          <Card.Section>
            <FormLayout>
              <TextField label="ID" onChange={this.handleChange('id')} value={this.state.id}/>
            </FormLayout>
            
          </Card.Section>
          <Card.Section>
            <TextContainer>
              <p>DELETE /admin/products/{this.state.id}.json</p>

            </TextContainer>
          </Card.Section>
          {successCard}

        </Card>

        )}}

      </Mutation>

      
    )
  }
}

export default DeleteProduct;