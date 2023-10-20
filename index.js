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

    const flashDefinerLabel = document.createElement("p");
    flashDefinerLabel.textContent = `Input the CORRECT definition`;
    const flashDefiner = document.createElement("textarea");
    const flashNamerSubmit = document.createElement("button");
    flashNamerSubmit.setAttribute("type", "button");
    flashNamerSubmit.textContent = "Create reverse flash";
    flashNamerSubmit.onclick = () => createFlash(flashNamer.value, flashDefiner.value);
    
    content.appendChild(flashNamerLabel);
    content.appendChild(flashNamer);
    content.appendChild(flashDefinerLabel);
    content.appendChild(flashDefiner);
    content.appendChild(document.createElement("br"));
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

    const flashPrevTxt = document.createElement("p");
    flashPrevTxt.textContent = "Reverse flashcard(s) created:"
    const flashPrev = document.createElement("ul");
    content.appendChild(document.createElement("br"));
    content.appendChild(document.createElement("br"));
    content.appendChild(flashPrevTxt);
    content.appendChild(flashPrev);



    function createFlash (flashName, flashDef) {
        if (flashName.trim().length === 0) {
            alert("Reverse flash card can't be empty");
        } else if (flashDef.trim().length === 0) {
            alert("Reverse flash card definition can't be empty");
        } else if (flashName in flashcards) {
            alert("Reverse flash already exists");
        } else {
            flashcards[flashName] = [flashDef, ""];
            let flashcardnum = document.getElementById("flashcardnum");
            flashcardnum.textContent = `${Object.keys(flashcards).length}`;
            flashNamer.value = "";
            flashDefiner.value = "";

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



    function generateFlash () {
        flashDiv.innerHTML = "";

        const randomizer = Math.floor(Math.random()*Object.keys(flashcards).length);
        let cardName = Object.keys(flashcards)[randomizer];
        let cardDef = Object.values(flashcards)[randomizer][1];

        const flashcardName = document.createElement("h1");
        flashcardName.textContent = `${cardName}`;
        const flashcardDef = document.createElement("p");
        flashcardDef.textContent = `Your definition: ${cardDef}`;
        flashDiv.appendChild(flashcardName);
        flashDiv.appendChild(flashcardDef);

        const changeButton = document.createElement("button");
        changeButton.setAttribute("type", "button");
        changeButton.textContent = "Change definition";
        changeButton.onclick = () => change(randomizer, flashcardDef, nextButton, changeButton, okButton);
        const nextButton = document.createElement("button");
        nextButton.setAttribute("type", "button");
        nextButton.textContent = "Next/Skip";
        nextButton.onclick = () => generateFlash();
        nextButton.disabled = (cardDef.trim().length === 0) ? true : false;
        const okButton = document.createElement("button");
        okButton.setAttribute("type", "button");
        okButton.textContent = "Satisfied? Press Done!";
        okButton.disabled = (cardDef.trim().length === 0) ? true : false;
        okButton.onclick = () => ok(randomizer);

        flashDiv.appendChild(changeButton);
        flashDiv.appendChild(nextButton);
        flashDiv.appendChild(okButton);
        flashDiv.appendChild(document.createElement("br"));
    }



    function change (randomizer, flashcardDef, nextButton, changeButton, okButton) {
        nextButton.disabled = true;
        changeButton.disabled = true;
        okButton.disabled = true;

        const window = document.createElement("div");
        flashDiv.appendChild(window);

        const defBoxLabel = document.createElement("p");
        defBoxLabel.textContent = `Change definition:`;
        const defBox = document.createElement("textarea");
        defBox.value = Object.values(flashcards)[randomizer][1]; //cardDef
        const defBoxSubmit = document.createElement("button");
        defBoxSubmit.setAttribute("type", "button");
        defBoxSubmit.textContent = "Update definition";
        defBoxSubmit.onclick = () => {
            if (defBox.value.trim().length === 0) {
                alert("Definition can't be empty");
                return;
            }

            flashcards[Object.keys(flashcards)[randomizer]][1] = defBox.value; //cardName
            window.remove();

            nextButton.disabled = false;
            changeButton.disabled = false;
            flashcardDef.textContent = `Your defnition: ${defBox.value}`;
        };

        window.appendChild(document.createElement("br"));
        window.appendChild(defBoxLabel);
        window.appendChild(defBox);
        window.appendChild(document.createElement("br"));
        window.appendChild(defBoxSubmit);
    }



    function ok (randomizer) {
        flashbin[Object.keys(flashcards)[randomizer]] = Object.values(flashcards)[randomizer];
        delete flashcards[Object.keys(flashcards)[randomizer]];
        if (Object.keys(flashcards).length !== 0) {
            generateFlash();
        } else {
            congratsu();
        }
    }
}





function congratsu () {
    content.innerHTML = "";

    const congTitle = document.createElement("h1");
    congTitle.textContent = "Well done!";
    const congText = document.createElement("p");
    congText.textContent = "Here is a summary of what you've reviewed.";
    const sumText = document.createElement("h2");
    sumText.textContent = `${revtitle}`;
    content.appendChild(congTitle);
    content.appendChild(congText);
    content.appendChild(sumText);

    const sumCards = document.createElement("dl");
    content.appendChild(sumCards);

    for (const card in flashbin) {
        const sumCardName = document.createElement("dt");
        sumCardName.textContent = `${card}`;
        const sumCardDef = document.createElement("dd");
        sumCardDef.innerHTML = `Correct definition: <span id="defTxt"> ${flashbin[card][0]} </span> </br> </br> Your definition: <span id="defTxt"> ${flashbin[card][1]} </span> </br> </br>`;

        sumCards.appendChild(sumCardName);
        sumCards.appendChild(sumCardDef);
    }

    const homeButton = document.createElement("button");
    homeButton.setAttribute("type", "button");
    homeButton.textContent = "HOME (permanently deletes the flashcards)"
    homeButton.onclick = () => home();
    content.appendChild(homeButton);

    const repeatButton = document.createElement("button");
    repeatButton.setAttribute("type", "button");
    repeatButton.textContent = "Review again?"
    repeatButton.onclick = () => {
        flashcards = flashbin;
        flashbin = {};
        review();
    };
    content.appendChild(repeatButton);
}





function home () {
    content.innerHTML = "";
    flashcards = {};
    flashbin = {};
    revtitle = "";

    const homeTitle = document.createElement("h1");
    homeTitle.textContent = "Reverse Flash";
    const homeText = document.createElement("p");
    homeText.textContent = "Review using reverse flash cards!";

    const inputText = document.createElement("p");
    inputText.textContent = "Input topic:";
    const topicText = document.createElement("input");
    topicText.setAttribute("type", "text");
    const inputButton = document.createElement("button");
    inputButton.setAttribute("type", "button");
    inputButton.textContent = "Start!";
    inputButton.onclick = () => start(topicText.value);

    content.appendChild(homeTitle);
    content.appendChild(homeText);
    content.appendChild(inputText);
    content.appendChild(topicText);
    content.appendChild(inputButton);
}