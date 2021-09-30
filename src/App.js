import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

const LIMIT = 90;
const MAXPOINTS = 210;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.verifyButton = this.verifyButton.bind(this);
    this.validationCardName = this.validationCardName.bind(this);
    this.validationCardDesc = this.validationCardDesc.bind(this);
  }

  onSaveButtonClick() {
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
    this.verifyButton();
  }

  sumAtt = (att1, att2, att3) => (Number(att1)
  + Number(att2) + Number(att3) <= MAXPOINTS);

  verifyRange = (att) => (Number(att) >= 0 && Number(att) <= LIMIT)

  verifyButton() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const { verifyRange, sumAtt } = this;
    // Recebi ajuda do felipe ventorin nessa, source = https://github.com/tryber/sd-013-b-project-tryunfo-beta/blob/felipeventorim-project-tryunfo-beta/src/App.js
    const haveToDisable = (
      this.validationCardDesc(cardDescription)
    && this.validationCardName(cardName)
     && verifyRange(cardAttr1)
    && verifyRange(cardAttr2)
    && verifyRange(cardAttr3)
    && sumAtt(cardAttr1, cardAttr2, cardAttr3)
    );
    this.setState({ isSaveButtonDisabled: !haveToDisable });
  }

  validationCardName(cardName) {
    if (cardName !== '') {
      return true;
    }
    return false;
  }

  validationCardDesc(cardDesc) {
    if (cardDesc !== '') {
      return true;
    }
    return false;
  }

  render() {
    const defaultProps = {
      ...this.state,
    };
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...defaultProps }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...defaultProps } />
      </div>
    );
  }
}

export default App;
