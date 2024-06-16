let form = document.querySelector("form");
let root = document.querySelector("ul");

// Load existing cards data from localStorage
let cardsData = JSON.parse(localStorage.getItem("cards")) || [];

// Function to create the UI
function createUI(data = cardsData, rootElement = root) {
  rootElement.innerHTML = ""; // Clear the existing content
  let fragment = new DocumentFragment();
  data.forEach((cardInfo, index) => {
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.innerText = cardInfo.category;
    p.addEventListener("dblclick", (event) =>
      handleEdit(event, cardInfo.category, index, "category")
    );
    let h2 = document.createElement("h2");
    h2.innerText = cardInfo.title;
    h2.addEventListener("dblclick", (event) =>
      handleEdit(event, cardInfo.title, index, "title")
    );
    li.append(p, h2);
    fragment.appendChild(li);
  });
  rootElement.append(fragment);
}

// Function to handle editing of a card
function handleEdit(event, info, id, label) {
  let elm = event.target;
  let input = document.createElement("input");
  input.value = info;
  input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      // Enter key
      let updatedValue = e.target.value;
      cardsData[id][label] = updatedValue;
      localStorage.setItem("cards", JSON.stringify(cardsData));
      createUI(cardsData, root);
    }
  });
  input.addEventListener("blur", (e) => {
    let updatedValue = e.target.value;
    cardsData[id][label] = updatedValue;
    localStorage.setItem("cards", JSON.stringify(cardsData));
    createUI(cardsData, root);
  });
  let parent = elm.parentElement;
  parent.replaceChild(input, elm);
  input.focus(); // Focus on the input field
}

// Event listener for the form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let title = event.target.elements.title.value;
  let category = event.target.elements.category.value;

  if (title && category) {
    // Ensure both fields are filled
    cardsData.push({ title, category });
    localStorage.setItem("cards", JSON.stringify(cardsData));
    createUI(cardsData, root);
    form.reset(); // Clear the form fields
  } else {
    alert("Please fill in both fields."); // Alert if fields are empty
  }
});

// Initial call to display existing cards
createUI(cardsData, root);
