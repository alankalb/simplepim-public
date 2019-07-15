import { TextField, Layout, Card, FormLayout, TextContainer, Form, TextStyle, PageActions } from '@shopify/polaris';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const PROD_UPDATE = gql`
  mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) {
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

class UpdateProduct extends React.Component {
  state = {
    id: '',
    description: '',
    response_id : '',
    response_title: '',
    response_description: '',
    response_price: '',
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
          <p>Updating Product...</p>
        </TextContainer>
      </Card.Section>
    }
    if (this.state.data && !this.state.loading){
      successCard = <Card.Section>
        <TextContainer>
        <p>API Response</p>
        <p>{"{"}</p>
              <p className="indent1" >
                {'"'}id{'"'}: {this.state.response_id},
              </p>
              <p className="indent1" >
                {'"'}title{'"'}: {'"'}{this.state.response_title}{'"'},
              </p>
              <p className="indent1" >
                {'"'}body_html{'"'}: {'"'}{this.state.response_description}{'"'},
              </p>
              <p className="indent1" >
                {'"'}variants{'"'}: [
              </p>
              <p className="indent2" >
                {'{'}
              </p>
              <p className="indent3" >
                {'"'}price{'"'}: {'"'}{this.state.response_price}{'"'}
              </p>
              <p className="indent2" >
                {'}'}
              </p>
              <p className="indent1" >
                ]
              </p>
              <p className="indent0" >
                {"}"}
              </p>
              <p>{' '}</p>
              <p>Checkout the products in the admin to see if your product was updated!</p>
        </TextContainer>
      </Card.Section>
    }
    

    return (
      <Mutation 
        mutation={PROD_UPDATE}
        onCompleted={(data) => {
          console.log(data)
          this.setState({data:true})
          this.setState({loading:false})
          this.setState({response_title: data.productUpdate.product.title})
          this.setState({response_description: data.productUpdate.product.description})
          var id = data.productUpdate.product.id.replace('gid://shopify/Product/', '')
          this.setState({response_id: id})
          this.setState({response_price: data.productUpdate.product.variants.edges[0].node.price})
        }}
      >
        {(handleSubmit, {error, loading, data}) => {
        return (

        <Card
          title="Update a Product"
          sectioned
          primaryFooterAction={
            {
              content: 'Update Product',
              onAction: () => {
                this.setState({loading:true})
                const productInput = {
                  id: 'gid://shopify/Product/'+this.state.id,
                  bodyHtml: this.state.description
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
              The third action we will do with the API is Update. Using the Shopify API, we will Update the description of an existing product using the PUT endpoint. 
              Use the product ID from above and add in a new description. To update a product, we have to send a JSON object to Shopify in the correct format 
              and specify the product ID in the PUT endpoint. Once you click 'Update Product', our app will send the JSON object to the PUT enpoint and Shopify will 
              use the ID specified in the endpoint to update the correct product.
            </p>
            <p>{' '}</p>
            <p>
              Like the requests we made above, Shopify will send back a request notifying us that API call was receveived and acted upon.
            </p>
          </Card.Section>
          <Card.Section>
            <FormLayout>
              <TextField label="ID" onChange={this.handleChange('id')} value={this.state.id}/>
              <TextField label="Description" multiline onChange={this.handleChange('description')} value={this.state.description} />
            </FormLayout>
            
          </Card.Section>
          <Card.Section>
            <TextContainer>
              <p>PUT /admin/products/{this.state.id}.json</p>
              <p>{"{"}</p>
              <p className="indent1" >
                {'"'}id{'"'}: {'"'}{this.state.id}{'"'},
              </p>
              <p className="indent1" >
                {'"'}body_html{'"'}: {'"'}{this.state.description}{'"'}
              </p>
              <p className="indent0" >
                {"}"}
              </p>
              

            </TextContainer>
          </Card.Section>
          {successCard}

        </Card>

        )}}

      </Mutation>

      
    )
  }
}

export default UpdateProduct;