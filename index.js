class Queue {
  constructor() {
    this.items = [];
  }
  // Add an element to teh back of the queue
  enqueue(item) {
    this.items.push(item);
  }
  dequeue() {
    this.items.shift();
  }
  peek() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
}

// Queue to hold users
const queue = new Queue();


// Print form users
const sigDiv = document.querySelector('.signatures');
const signNowButton = document.getElementById("sign-now-button");

const addSignature = (person) => {
  queue.enqueue(person);
  if (queue.size() > 5) {
    queue.dequeue();
  }
  // Clear the previous content
  sigDiv.innerHTML = "";
  for (let supporter of queue.items) {
    const newSig = document.createElement('p');
    newSig.textContent = `${supporter.name} supports this cause!`;
    sigDiv.appendChild(newSig);
  }
};

// Validate form
const validateForm = () => {
  let containsErrors = false;
  var petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    name: petitionInputs[0].value // Accesses and saves values of first input
}
  
  // TODO: Loop through all inputs
  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    } else {
      petitionInputs[i].classList.remove('error');
    }
  }
  if (containsErrors == false) {
    addSignature(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}
signNowButton.addEventListener('click', validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll(".revealable");
const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight; // Save the height
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top; // Find the top of the container
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
        revealableContainers[i].classList.add('active');
    } else {
        revealableContainers[i].classList.remove('active');
    }
  }
}
window.addEventListener('scroll', reveal);


