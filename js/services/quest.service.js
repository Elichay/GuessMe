'use strict'
const QUEST_KEY = 'questTreeKey'
var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
    gQuestsTree = loadFromStorage(QUEST_KEY)
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male')
        gQuestsTree.yes = createQuest('Gandhi')
        gQuestsTree.no = createQuest('Rita')
        saveToStorage(QUEST_KEY, gQuestsTree)
    }
    gCurrQuest = gQuestsTree
    gPrevQuest = null
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null,
    }
}

function isChildless(node) {
    return node.yes === null && node.no === null
}

function moveToNextQuest(res) {//res = 'yes' or 'no'
    //gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res] //go to gCurr.yes or gCurr.no in the tree
}


function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // console.log('newQuestTxt', newQuestTxt)
    // console.log('newGuessTxt', newGuessTxt)
    // console.log('lastRes', lastRes)
    //Create and Connect the 2 Quests
    //to the quetsions tree
    gPrevQuest[lastRes] = createQuest(newQuestTxt)
    gPrevQuest[lastRes].yes = createQuest(newGuessTxt)
    gPrevQuest[lastRes].no = gCurrQuest //does not work with gQuestTree. not sure why
    // console.log('gPrevQuest', gPrevQuest)
    // console.log('gQuestsTree', gQuestsTree)
    saveToStorage(QUEST_KEY, gQuestsTree)
}

function getCurrQuest() {
    return gCurrQuest
}
