console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')

messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch(`http://127.0.0.1:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return console.log(data.error)
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
})