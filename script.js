const formText = document.querySelector(".from-text"),
    toText = document.querySelector(".to-text"),
    selectTag = document.querySelectorAll("select"),
    exchangeIcon = document.querySelector(".exchange"),
    translateBtn = document.querySelector("button"),
    icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    // console.log(tag);
    for (const country_code in countries) {

        let selected; //default
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";  //for english
        }
        else if (id == 1 && country_code == "hi-IN") {
            selected = "selected";   //for hindi
        }

        //   console.log(countries[country_code]);
        let option = `<option value ="${country_code}"${selected}>${countries[country_code]}<option>`;

        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchangeIcon.addEventListener("click", () => {
    // exhange of text area & select tag value
    let tempText = formText.value,
        tempLang = selectTag[0].value;
    formText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;


});

translateBtn.addEventListener("click", () => {
    let text = formText.value,
        translateForm = selectTag[0].value,  //getting fromSelect tag value 
        translateTo = selectTag[1].value;    //getting to Select tag value 
    //    console.log(text, translateForm , translateTo);

    if (!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateForm}|${translateTo}`;

    //fetching api responce and returning it with parsing into js obj
    // and in another then methodd reciving that obj

    fetch(apiUrl).then(res => res.json()).then(data => {
        // console.log(data);
        toText.value = data.responseData.translatedText;

        toText.setAttribute("placeholder", "Translation");
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        //    console.log(target)
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                //   console.log("From copy icon clicked")
                navigator.clipboard.writeText(formText.value);
            } else {
                // console.log("To copy icon clicked")
                // toText = document.querySelector(".to-text"),
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(formText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance); //speak the passed utterance
        }
    });
});