'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.btn-restart').click(onRestartGame)

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  //hides the game-start section:
  $('.game-start').hide()

  renderQuest()
  //show the quest section:
  $('.quest').show()

}

function renderQuest() {
  //select the <h2> inside quest and update
  // its text by the currQuest text

  // $('.quest').children('h2').text(getCurrQuest().txt + '?')
  $('.question').text(getCurrQuest().txt + '?')

}

function onUserResponse(ev) {
  console.log('ev', ev)
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      // alert('Yes, I knew it!')
      // TODO: improve UX
      $('.quest').hide()
      $('.victory').show()
      // $('.game-start').show()
      // onRestartGame()
    } else {
      // alert('I dont know...teach me!')
      //hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    //update the lastRes global var
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  //Get the inputs' values:
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()
  // console.log('newGuess', newGuess)
  // console.log('newQuest', newQuest)

  //Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame()
}

function onRestartGame() {
  $('.victory').hide()
  $('.new-quest').hide()
  $('.game-start').show()
  gLastRes = null
  init()
}
