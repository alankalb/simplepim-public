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

class ReadProduct extends React.Component {
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
          <p>Finding Product...</p>
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
          title="Read a Product"
          sectioned
          primaryFooterAction={
            {
              content: 'Read Product',
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
              <p>GET /admin/products/{this.state.id}.json</p>

            </TextContainer>
          </Card.Section>
          {successCard}

        </Card>

        )}}

      </Mutation>

      
    )
  }
}

export default ReadProduct;