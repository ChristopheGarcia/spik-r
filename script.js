// Initialiser l'API WebSpeech
const synth = window.speechSynthesis;

// Elements du DOM
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body')

// Initiatlisation du Voices Array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    console.log(voices)
    // Loop through voices and create an option for each one
    voices.forEach(voice => {
      // Create option element
      const option = document.createElement('option');
      // Fill option with voice and language
      option.textContent = voice.name + '(' + voice.lang + ')';
  
      // Set needed option attributes
      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      voiceSelect.appendChild(option);
    });
  };

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

// Go Spik
const speak = (e) => {
  console.log('click detecté')
    //Vérifier si ca parle
    if(synth.speaking){
        console.log('Already speaking...');
        return;
    }
    if(textInput.value !== ''){
        //Ajouter l'animation wave dans le background
        body.style.background = '#141414 url(assets/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

        //Récuperer le texte
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //Fin de speak
        speakText.onend = e => {
            console.log('Done speaking...');
            body.style.background = '#000';
        }

    //Erreur speak
    speakText.onerror = e => {
        console.log('Something went wrong...')
    }

    //Selection de la voix
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
        'data-name'
      );
    //Boucle sur les voix
    voices.forEach(voice => {
        if(voice.name === selectedVoice){
            speakText.voice = voice;
        }
    });

    //Set Niveau et Vitesse
    speakText.rate = rate.value;
    speakText.pitch = pitch.value

    //GoSpik
    synth.speak(speakText);
    }
}

//EVENEMENTS

// Validation du texte
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur()
})

// Changer la valeur du Niveau
rate.addEventListener('change', e => rateValue.textContent = rate.value);

// Changer la valeur de la Vitesse
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value)

// Changement de voix
voiceSelect.addEventListener('change', e => speak());