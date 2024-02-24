// Writing all the words of the lists in an array for later use
// Making sure that the wordList and currentIndex are globally accessible
const wordLists = {
    'btn-1': ["A Wizard", "A Dragon", "A Knight", "Princess", "A King", "A Boy", "Monster"],
    'btn-2': ["Discovered", "Fought", "Rescued", "Explored", "Vanquished", "Encountered", "Defeated"],
    'btn-3': ["a Mysterious", "an Enchanted", "a Dark", "the Forbidden", "a Legendary", "a Hidden", "an Ancient"],
    'btn-4': ["Treasure", "Artifact", "Beast", "Realm", "Kingdom", "Chalice", "Scroll"],
    'btn-5': ["In a Cave", "At a Mountain", "In the Sea", "In a Forest", "In a Valley", "On an Island", "Near a River"]
};

// Writing a constant to keep track of the current index of each array
const currentIndex = {
    'btn-1': 0,
    'btn-2': 0,
    'btn-3': 0,
    'btn-4': 0,
    'btn-5': 0,
};

// Wait for the page to fully load before running our script to make sure everything's in place
document.addEventListener('DOMContentLoaded', function() {

    function handleButtonClick(button) {
        // Finding out which button was clicked and getting the next word
        const listKey = button.className;// differentiating the button by class name :)
        const currentWord = button.textContent;
        const words = wordLists[listKey];
        let nextIndex = (words.indexOf(currentWord) + 1) % words.length;// Updating the index
        const nextWord = words[nextIndex];
    
        // Update the button and the story text to show the new word
        button.textContent = nextWord;
        document.getElementById('storyText').textContent = nextWord;
        // Remember this spot so we can come back to it
        currentIndex[listKey] = nextIndex;
        // Let's hear it out loud for the full effect
        speak(nextWord);
    }
    

    // This magic bit makes the computer talk. I used this https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
    function speak(text) {
        window.speechSynthesis.cancel(); // Stops it from talking over itself
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }

    // Make the buttons do stuff when clicked
    document.querySelectorAll('button[class^="btn-"]').forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button));
    });

// for the generateButton
document.getElementById('generateButton').addEventListener('click', function() {
    // Grab a random word from each list for a surprise story
    function getRandomWord(words) {
        return words[Math.floor(Math.random() * words.length)];
    }

    // Mix and match words to make a sentence
    const sentence = [
        getRandomWord(wordLists['btn-1']),
        getRandomWord(wordLists['btn-2']),
        getRandomWord(wordLists['btn-3']),
        getRandomWord(wordLists['btn-4']),
        getRandomWord(wordLists['btn-5'])
    ].join(' ') + '.';

    // Show the new story and tell it too
    document.getElementById('storyText').textContent = sentence;
    speak(sentence);
});

// For the playBack button
// Play it back, the story so far
document.getElementById('playBack').addEventListener('click', function() {
    // Stitch together the current words into a sentence
    function getCurrentSentence() {
        return [
            wordLists['btn-1'][currentIndex['btn-1']],
            wordLists['btn-2'][currentIndex['btn-2']],
            wordLists['btn-3'][currentIndex['btn-3']],
            wordLists['btn-4'][currentIndex['btn-4']],
            wordLists['btn-5'][currentIndex['btn-5']],
        ].join(' ') + '.';
    }

    // Get the sentence and do the usual, show and tell
    const sentence = getCurrentSentence();
    document.getElementById('storyText').textContent = sentence;
    speak(sentence);
});
});
// I used MDN and W3School a lot for this assignment 