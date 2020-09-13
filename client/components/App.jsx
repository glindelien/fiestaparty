import React from 'react';
import CurrentWord from './CurrentWord.jsx';
import Input from './Input.jsx';
import Progress from './Progress.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      // index of current word to translate
      currentWord: 0,

      // words to translate for this level
      englishWords: [
        'party',
        'hello',
        'goodbye',
        'dog',
        'cat',
        'food',
        'taco',
        'beer',
        'music',
        'code'
      ],

      // translations for this level
      spanishWords: {
        party: ['fiesta'],
        hello: ['hola'],
        goodbye: ['adios', 'adiós'],
        dog: ['perro', 'perra'],
        cat: ['gato', 'gata'],
        food: ['comida'],
        taco: ['taco'],
        beer: ['cerveza'],
        music: ['música', 'musica'],
        code: ['código', 'codigo']
      },

      // value for user input field
      userAnswer: '',

      // current completion status for this level
      complete: false

    };

    // bind methods to correct context
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);

  }

  // update userAnswer in state when user types into input field
  handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
    this.checkAnswer(value);
  }

  checkAnswer(attempt) {

    // English word we're currently translating
    let current = this.state.englishWords[this.state.currentWord];
    // Array of all correct translations
    let translations = this.state.spanishWords[current];

    // If translations array includes the user's attempt, progress to next word
    if (translations.includes(attempt.toLowerCase())) {
      this.setState({
        // increment progress to next word
        currentWord: this.state.currentWord + 1,
        // reset input field to blank string
        userAnswer: '',
        // check if the current level is completed (check if it's Fiesta time!)
        complete: this.state.currentWord + 1 === this.state.englishWords.length
      });
    }

  }

  render() {

    // if level is complete, render Fiesta page
    if (this.state.complete) {
      return (
        <div className="complete">It's Fiesta Time!</div>
      );

    // if level is NOT complete, render current word challenge
    } else {
      return (
        <div className="main">

          {/* header */}
          <div className="header">Fiesta Party!</div>

          {/* current word to translate */}
          <div className="currentWord">
            <CurrentWord word={this.state.englishWords[this.state.currentWord]}/>
          </div>

          {/* input field */}
          <div className="input">
            <Input answer={this.state.userAnswer}
                   handleInputChange={this.handleInputChange}/>
          </div>

          {/* progress */}
          <div className="progress">
            <Progress progress={this.state.currentWord}
                      limit={this.state.englishWords.length}/>
          </div>

        </div>
      );
    }
  }

};

export default App;
