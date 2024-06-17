const king = document.querySelector(".chess-piece");
const squares = document.querySelectorAll(".square");
const infoDisplay = document.querySelector("#info");

let beingDragged;

squares.forEach((square) => {
  square.addEventListener("dragover", dragOver);
  square.addEventListener("dragenter", dragEnter);
  square.addEventListener("dragleave", dragLeave);
  square.addEventListener("drop", dragDrop);
  square.addEventListener("dragend", dragEnd);
});

function dragStart(e) {
  beingDragged = e.target;
  console.log("dragging has started on " + beingDragged.id);
}

function dragging() {
  console.log(beingDragged.id + " is being dragged");
  infoDisplay.textContent = beingDragged.id + " is being dragged";
}

function dragOver(e) {
  e.preventDefault();
  console.log("you are dragging something over " + e.target.classList);
}

function dragEnter(e) {
  e.target.classList.add("highlight");
  console.log("you are entering the space of " + e.target.classList);
}

function dragLeave(e) {
  console.log("you are leaving the space of " + e.target.classList);
  e.target.classList.remove("highlight");
}

function dragDrop(e) {
  e.target.append(beingDragged);
  e.target.classList.remove("highlight");
}

function dragEnd(e) {
  e.target.classList.add("target");
  setTimeout(() => e.target.classList.remove("target"), 200);
  console.log("the drag has ended in " + e.target.classList);
  infoDisplay.textContent = "";
}

king.addEventListener("drag", dragging);
king.addEventListener("dragstart", dragStart);
