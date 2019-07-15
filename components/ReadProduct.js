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
    data: false
  };

  handleChange = field => {
    return value => this.setState({ [field]: value });
  };

  render() {
    let successCard = <Card.Section></Card.Section>
    if (this.state.loading) {
      successCard = <Card.Section>
        <Query 
          query={GET_PRODUCT_BY_ID} 
          variables={{ id: 'gid://shopify/Product/' + this.state.id }}
          onCompleted={(data) => {
            this.setState({data:true})
            this.setState({loading:false})
            
            this.setState({response_title: data.product.title})
            this.setState({response_description: data.product.description})
            var id = data.product.id.replace('gid://shopify/Product/', '')
            this.setState({response_id: id})
            this.setState({response_price: data.product.variants.edges[0].node.price})
            console.log(data.product.title)
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <div>Finding Products…</div>;
            if (error) return <div>{error.message}</div>;
            if(data) return null
          }}
        </Query>
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
          <p>Is this the product you were looking for?</p>
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
              }
            }
          }
        >
          <Card.Section>
            <p>
              The second action we will do with the API is Read. Using the Shopify API, we will Read a product using the GET endpoint. 
              Copy the ID from the product you created above and input it into the ID field. Notice the ID is inserted into the URL below. 
              For a GET request, we don't need to send Shopify a JSON body; all we need to do is provide a URL with the proper product ID. Once 
              you click 'Read Product', our app will request the product information from the GET Endpoint.
            </p>
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
      
    )
  }
}

export default CreateProduct;