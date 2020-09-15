import React from 'react';
import CurrentWord from './CurrentWord.jsx';
import Input from './Input.jsx';
import Progress from './Progress.jsx';
import Confetti from './Confetti.jsx';

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
        goodbye: ['adios'],
        dog: ['perro', 'perra'],
        cat: ['gato', 'gata'],
        food: ['comida'],
        taco: ['taco'],
        beer: ['cerveza'],
        music: ['musica'],
        code: ['codigo']
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

  checkAnswer(answer) {

    // English word we're currently translating
    let current = this.state.englishWords[this.state.currentWord];
    // Array of all correct translations
    let translations = this.state.spanishWords[current];

    translations.forEach((word) => {

    });

    // modify user answer so it is not case sensitive & ignores accents
    answer = answer.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    // set timeout if it's the last level
    let timeout = 0;
    if (this.state.currentWord === this.state.englishWords.length - 1) {
      timeout = 200;
    }

    // If translations array includes the user's answer, progress to next word
    if (translations.includes(answer)) {
      setTimeout(() => {
        this.setState({
          // increment progress to next word
          currentWord: this.state.currentWord + 1,
          // reset input field to blank string
          userAnswer: '',
          // check if the current level is completed (check if it's Fiesta time!)
          complete: this.state.currentWord + 1 === this.state.englishWords.length
        });
      }, timeout);
    }

  }

  render() {

    // if level is complete, render Fiesta page
    if (this.state.complete) {
      return (
        <div className="main">
          <Confetti />

          {/* logo image */}
          <img src="logo.png"></img>

          {/* header */}
          <div className="header">It's Fiesta Time!</div>

          {/* play again button */}
          <div id="playAgain"
            onClick={() => this.setState({
              complete: false,
              currentWord: 0
            })}>
            Play Again
          </div>

          {/* images */}
          <img className="fiestaImg" id="balloons" src="/fiesta/balloons.png"></img>
          <img className="fiestaImg" id="cerveza" src="/fiesta/cerveza.png"></img>
          <img className="fiestaImg" id="guacamole" src="/fiesta/guacamole.png"></img>
          <img className="fiestaImg" id="limes" src="/fiesta/limes.png"></img>
          <img className="fiestaImg" id="music" src="/fiesta/music.png"></img>
          <img className="fiestaImg" id="pinata" src="/fiesta/pinata.png"></img>
          <img className="fiestaImg" id="taco" src="/fiesta/taco.png"></img>
          <img className="fiestaImg" id="tequila" src="/fiesta/tequila.png"></img>

        </div>
      );

      // if level is NOT complete, render current word challenge
    } else {
      return (
        <div className="main">

          {/* logo image */}
          <img src="logo.png"></img>

          {/* header */}
          <div className="header">Fiesta Party!</div>

          {/* current word to translate */}
          <div className="currentWord">
            <CurrentWord word={this.state.englishWords[this.state.currentWord]} />
          </div>

          {/* input field */}
          <div className="input">
            <Input answer={this.state.userAnswer}
              handleInputChange={this.handleInputChange} />
          </div>

          {/* progress */}
          <div className="progress">
            <Progress current={this.state.currentWord}
              limit={this.state.englishWords.length} />
          </div>

        </div>
      );
    }
  }

};

export default App;
