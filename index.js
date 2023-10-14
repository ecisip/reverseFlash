const content = document.getElementById("contentwrap");
let flashcards = {};
let flashbin = {};
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
        flashDiv.innerHTML = "";

        const randomizer = Math.floor(Math.random()*Object.keys(flashcards).length);
        let cardName = Object.keys(flashcards)[randomizer];
        let cardDef = Object.values(flashcards)[randomizer];

        const flashcardName = document.createElement("h1");
        flashcardName.textContent = `${cardName}`;
        const flashcardDef = document.createElement("p");
        flashcardDef.textContent = `Your definition: ${cardDef}`;
        flashDiv.appendChild(flashcardName);
        flashDiv.appendChild(flashcardDef);

        const changeButton = document.createElement("button");
        changeButton.setAttribute("type", "button");
        changeButton.textContent = "Change definition";
        changeButton.onclick = () => change(cardName, cardDef, flashcardDef);
        const skipButton = document.createElement("button");
        skipButton.setAttribute("type", "button");
        skipButton.textContent = "Skip";
        skipButton.onclick = () => generateFlash();
        const okButton = document.createElement("button");
        okButton.setAttribute("type", "button");
        okButton.textContent = "Satisfied? Press Done!";
        okButton.disabled = (cardDef.trim().length === 0) ? true : false;
        //okButton.onclick = () => ok();

        flashDiv.appendChild(changeButton);
        flashDiv.appendChild(skipButton);
        flashDiv.appendChild(okButton);
        flashDiv.appendChild(document.createElement("br"));

        const googler = document.createElement("a");
        googler.setAttribute("target", "_blank");
        googler.href = `https://www.google.com/search?q=${cardName}`
        googler.textContent = `Google "${cardName}"`;
        const googler2 = document.createElement("a");
        googler2.setAttribute("target", "_blank");
        googler2.href = `https://www.google.com/search?q=${cardName}%20${revtitle}`
        googler2.textContent = `Google "${cardName} ${revtitle}"`;
        flashDiv.appendChild(googler);
        flashDiv.appendChild(document.createElement("br"));
        flashDiv.appendChild(googler2);
    }



    function change (cardName, cardDef, flashcardDef) {
        const window = document.createElement("div");
        flashDiv.appendChild(window);

        const defBoxLabel = document.createElement("p");
        defBoxLabel.textContent = `Change definition:`;
        const defBox = document.createElement("input");
        defBox.setAttribute("type", "text");
        defBox.value = cardDef;
        const defBoxSubmit = document.createElement("button");
        defBoxSubmit.setAttribute("type", "button");
        defBoxSubmit.textContent = "Update definition";
        defBoxSubmit.onclick = () => {
            flashcards[cardName] = defBox.value;
            window.remove();
            flashcardDef.textContent = `${defBox.value}`;
        };

        window.appendChild(document.createElement("br"));
        window.appendChild(defBoxLabel);
        window.appendChild(defBox);
        window.appendChild(defBoxSubmit);
        window.appendChild(document.createElement("br"));
    }
}