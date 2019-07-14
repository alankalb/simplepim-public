import { TextField, Layout, Card, FormLayout, TextContainer, Form, TextStyle, PageActions } from '@shopify/polaris';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const PROD_CREATE = gql`
  mutation productCreate($input: ProductInput!) {
  productCreate(input: $input) {
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

class CreateProduct extends React.Component {
  state = {
    title: '',
    description: '',
    price: '0.00',
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
          <p>Creating Product...</p>
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
              <p>Checkout the products in the admin to see if your product was created!</p>
        </TextContainer>
      </Card.Section>
    }
    

    return (
      <Mutation 
        mutation={PROD_CREATE}
        onCompleted={(data) => {
          this.setState({data:true})
          this.setState({loading:false})
          this.setState({response_title: data.productCreate.product.title})
          this.setState({response_description: data.productCreate.product.description})
          var id = data.productCreate.product.id.replace('gid://shopify/Product/', '')
          this.setState({response_id: id})
          this.setState({response_price: data.productCreate.product.variants.edges[0].node.price})
        }}
      >
        {(handleSubmit, {error, loading, data}) => {
        return (

        <Card
          title="Create a Product"
          sectioned
          primaryFooterAction={
            {
              content: 'Create Product',
              onAction: () => {
                this.setState({loading:true})
                const productInput = {
                  title: this.state.title,
                  bodyHtml: this.state.description,
                  variants: {
                    price: this.state.price
                  }
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
              The first action we will do with the API is Create. Using the Shopify API, we will Create a product using the POST endpoint. 
              Fill in the fields with some product information. As you fill out the form, our app will translate your production information 
              into the JSON format that is required by the Shopify API. Once you click 'Create Product', our app will send the JSON object to the 
              POST endpoint to create a product in our store. 
            </p>
            <p>
              After we send our API request, Shopify will send back a response notifying us 
              that the API call was received and acted upon. In this case, Shopify will send a JSON object with our product information and a newly 
              created Product ID. Copy this ID as we will be using it in the next section.
            </p>
          </Card.Section>
          <Card.Section>
            <FormLayout>
              <TextField label="Title" onChange={this.handleChange('title')} value={this.state.title}/>
              <TextField label="Description" multiline onChange={this.handleChange('description')} value={this.state.description} />
              <TextField label="Price" type="number" onChange={this.handleChange('price')} value={this.state.price} />
            </FormLayout>
            
          </Card.Section>
          <Card.Section>
            <TextContainer>
              <p>POST /admin/products.json</p>
              <p>{"{"}</p>
              <p className="indent1" >
                {'"'}title{'"'}: {'"'}{this.state.title}{'"'},
              </p>
              <p className="indent1" >
                {'"'}body_html{'"'}: {'"'}{this.state.description}{'"'},
              </p>
              <p className="indent1" >
                {'"'}variants{'"'}: [
              </p>
              <p className="indent2" >
                {'{'}
              </p>
              <p className="indent3" >
                {'"'}price{'"'}: {'"'}{this.state.price}{'"'}
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
              

            </TextContainer>
          </Card.Section>
          {successCard}

        </Card>

        )}}

      </Mutation>

      
    )
  }
}

export default CreateProduct;