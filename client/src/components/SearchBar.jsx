import React from 'react';
import {Input, Button} from 'semantic-ui-react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
  }
  
  searchTerm(event) {
    this.setState({
      term: event.target.value
    }, () => {
      console.log(this.state.term);
    });
  }

  render() {
    return (
      <div style={{margin: '10px'}}>
        <Input style={{width: '600px', marginRight: '1px'}} onChange={this.searchTerm.bind(this)}></Input>
        <Button onClick={() => this.props.searchStocks(this.state.term)}>Search</Button>
      </div>
    );
  }
}

export default SearchBar;