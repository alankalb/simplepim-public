import { TextField, Layout, Card, FormLayout, TextContainer, Form, TextStyle, PageActions } from '@shopify/polaris';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const PROD_DELETE = gql`
  mutation productDelete($input: ProductDeleteInput!) {
  productDelete(input: $input) {
    deletedProductId
  }
}
`

class DeleteProduct extends React.Component {
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
                {'"'}deleted_id{'"'}: {this.state.response_id}
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
          var id = data.productDelete.deletedProductId.replace('gid://shopify/Product/', '')
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
            The final action we will do with the API is Delete. Using the Shopify API, we will delete an existing product. 
            Use the product ID you created above and input into the ID field. Like the GET endpoint, the DELETE endpoint does 
            not require a JSON object to be sent with the request. All that is needed is a product ID in the url.
            </p>
            <p>{' '}</p>
            <p>
            Once the DELETE request is sent, Shopify will send a response confirming the ID of the product that was deleted.
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