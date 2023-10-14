const content = document.getElementById("contentwrap");
let flashcards = {};
let revtitle = "";



function start (topicText) {
    if (topicText.trim().length === 0) {
        alert("Topic name can't be empty");
        return;
    }

    content.innerHTML = "";
    revtitle = topicText;

    const startTitle = document.createElement("h1");
    startTitle.textContent = `${revtitle}: Add reverse flashcards!`;
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
    
    content.appendChild(flashNamerLabel);
    content.appendChild(flashNamer);
    content.appendChild(document.createElement("br"));
    content.appendChild(flashNamerSubmit);

    const doneButton = document.createElement("button");
    doneButton.setAttribute("type", "button");
    doneButton.setAttribute("disabled", true);
    doneButton.textContent = "Done!";
    doneButton.onclick = () => done();
    content.appendChild(document.createElement("br"));
    content.appendChild(document.createElement("br"));
    content.appendChild(doneButton);

    const flashPrev = document.createElement("ul");
    content.appendChild(document.createElement("br"));
    content.appendChild(document.createElement("br"));
    content.appendChild(flashPrev);

    function createFlash (flashName) {
        if (flashName.trim().length === 0) {
            alert("Reverse flash card can't be empty");
        } else if (flashName in flashcards) {
            alert("Reverse flash already exists");
        } else {
            flashcards[flashName] = "";
            let flashcardnum = document.getElementById("flashcardnum");
            flashcardnum.textContent = `${Object.keys(flashcards).length}`;
            flashNamer.value = "";

            const entryPrev = document.createElement("li");
            entryPrev.textContent = flashName;
            flashPrev.appendChild(entryPrev);

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
        revButton.onclick = () => review();
        content.appendChild(doneTitle);
        content.appendChild(revButton);
    }
}



function review () {
    content.innerHTML = "";

    const revScrTitle = document.createElement("h1");
    revScrTitle.textContent = `Review in ${revtitle}`;
    const revScrTally = document.createElement("p");
    revScrTally.innerHTML = `<span id="flashcardnum">${Object.keys(flashcards).length}</span> reverse flash card(s) left.`;
    const flashDiv = document.createElement("div");

    content.appendChild(revScrTitle);
    content.appendChild(revScrTally);
    content.appendChild(document.createElement("br"));
    content.appendChild(flashDiv);

    generateFlash();

    function generateFlash() {
        const randomizer = Math.floor(Math.random()*Object.keys(flashcards).length);
        let flashcardPick = Object.keys(flashcards)[randomizer];

        const flashcardName = document.createElement("h1");
        flashcardName.textContent = `${flashcardPick}`;
        const flashcardDef = document.createElement("p");
        flashcardDef.textContent = `Your definition: ${Object.values(flashcards)[randomizer]}`;
        const googler = document.createElement("a");
        googler.setAttribute("target", "_blank");
        googler.href = `https://www.google.com/search?q=${Object.keys(flashcards)[randomizer]}`
        googler.textContent = `Google "${Object.keys(flashcards)[randomizer]}"`;
        const googler2 = document.createElement("a");
        googler2.setAttribute("target", "_blank");
        googler2.href = `https://www.google.com/search?q=${Object.keys(flashcards)[randomizer]}%20${revtitle}`
        googler2.textContent = `Google "${Object.keys(flashcards)[randomizer]} ${revtitle}"`;

        flashDiv.appendChild(flashcardName);
        flashDiv.appendChild(flashcardDef);
        flashDiv.appendChild(googler);
        flashDiv.appendChild(document.createElement("br"));
        flashDiv.appendChild(googler2);
    }
}