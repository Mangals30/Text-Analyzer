const wrapperDiv = document.querySelector('.wrapper')
const textAnalyzer = document.querySelector('#text-analyzer')
const processButton = document.querySelector('.process-text')
const divError = document.querySelector('.error-div')

const displayResults = (totalNoOfWords,noOfChar,textCount) => {
    wrapperDiv.innerHTML = ''
    wrapperDiv.innerHTML += 
    `<div class = "text-heading">Text Analysis Results </div>
     <div class = "total-words"> Total number of words: <i>${totalNoOfWords}</i></div> 
     <div class = "total-char"> Number Of Characters: <i>${noOfChar}</i></div>
     <div class = "frequent-word"> The most frequent word: <i>${textCount[0].text}</i></div>
     <div class = "results-div">
     <div class = "results-heading">
     <div class = "word">Word</div>
     <div class = "word-count">Word Count</div>
     </div
     </div>
    `
    const resultsDiv = document.querySelector('.results-div')
    for (const text of textCount) {
        resultsDiv.innerHTML+=
        `<div class = "results-display">
        <div class = "text">${text.text}</div>
        <div class = "text-count">${text.count}</div>
        </div`
    }
}
const getTextCount = (uniqueTextsArray,allTextsArray) => {
    const textCount = []
    for (const text of uniqueTextsArray) {
       const matchWords = allTextsArray.filter(arr => arr== text)
       let count = matchWords.length
       textCount.push({text,count})
    }
    textCount.sort((a,b) => {
    if(a.count < b.count) return 1
    if(a.count > b.count) return -1
    return 0 
    })

    return textCount
}
const getuniqueTexts = (clearedText,textArray) => {
    let patter2 = /[A-Z\s]/ig
    let totalChar = clearedText.match(patter2)
    let noOfChar = totalChar.length
    const allTextsArray = textArray.map(text => text.toLowerCase())
    let totalNoOfWords = allTextsArray.length
    const setText = new Set(allTextsArray)
    const uniqueTextsArray = Array.from(setText)
    const textCount = getTextCount(uniqueTextsArray,allTextsArray)
    displayResults(totalNoOfWords,noOfChar,textCount)
}
const cleanText = inputText => {
       let pattern = /[A-Z]+/ig
        let pattern1 = /[^A-z\s\.]/ig
        let clearedText = inputText.replace(pattern1,'')
        const textArray = clearedText.match(pattern)
        if(textArray) {
            //console.log(clearedText)
            getuniqueTexts(clearedText,textArray) 
            
        }
        else {
            divError.style.display = 'block'
            divError.textContent = 'No words to match'
        }
}
processButton.addEventListener('click',event => {
    const inputText = textAnalyzer.value
    if(inputText.length == 0) {
        divError.style.display = 'flex'
        let errorText = '*It cannot be empty!'
        divError.textContent = errorText
    }
    else {
        cleanText(inputText)
    }


})