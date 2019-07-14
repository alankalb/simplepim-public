import { TextField, Layout, Card, FormLayout, TextContainer, Form, TextStyle, PageActions } from '@shopify/polaris';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_PRODUCT_BY_ID = gql`
  query getProduct($id: ID!) {
    product(id:$id){
      id
      title
      description
      variants(first: 1) {
        edges {
          node {
            price
          }
        }
      }
    }
  }
`;

class CreateProduct extends React.Component {
  state = {
    id: '',
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
              <p>Was this the product you were looking for?</p>
        </TextContainer>
      </Card.Section>
    }
    

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
                  id: 'gid://shopify/Product/' + this.state.id,
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


     

      
    )
  }
}

export default ReadProduct;