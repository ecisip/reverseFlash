const content = document.getElementById("contentwrap");
let flashcards = {};

function start () {
    content.innerHTML = "";

    const startTitle = document.createElement("h1");
    startTitle.textContent = `Add reverse flashcards!`;
    const flashTally = document.createElement("p");
    flashTally.innerHTML = `<span id="flashcardnum">${Object.keys(flashcards).length}</span> reverse flash card(s) so far.`;
    content.appendChild(startTitle);
    content.appendChild(flashTally);

    const flashNamerLabel = document.createElement("p");
    flashNamerLabel.textContent = `Input reverse flashcard`;
    const flashNamer = document.createElement("input");
    flashNamer.setAttribute("type", "text");
    const flashNamerSubmit = document.createElement("button");
    flashNamerSubmit.setAttribute("type", "button");
    flashNamerSubmit.textContent = "Create reverse flash";
    flashNamerSubmit.onclick = () => createFlash(flashNamer.value);
    const divider = document.createElement("br");
    
    content.appendChild(flashNamerLabel);
    content.appendChild(flashNamer);
    content.appendChild(divider);
    content.appendChild(flashNamerSubmit);

    const doneButton = document.createElement("button");
    doneButton.setAttribute("type", "button");
    doneButton.setAttribute("disabled", true);
    doneButton.textContent = "Done!";
    doneButton.onclick = () => done();
    content.appendChild(divider);
    content.appendChild(doneButton);

    function createFlash (flashName) {
        if (flashName.trim().length === 0) {
            alert("Reverse flash card can't be empty");
        } else {
            flashcards[flashName] = "";
            let flashcardnum = document.getElementById("flashcardnum");
            flashcardnum.textContent = `${Object.keys(flashcards).length}`;
            flashNamer.value = "";

            doneButton.disabled = false;
        }
    }

    function done () {
        content.innerHTML = "";

        const doneTitle = document.createElement("h1");
        doneTitle.textContent = `${Object.keys(flashcards).length} reverse flashcard(s) created!`;
        const revButton = document.createElement("button");
        revButton.setAttribute("type", "button");
        revButton.textContent = "Start reviewing!";
        //revButton.onclick = () => review();
        content.appendChild(doneTitle);
        content.appendChild(revButton);
    }
}