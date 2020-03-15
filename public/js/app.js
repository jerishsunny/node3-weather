console.log('client side javascript')



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

const errorMessage = document.querySelector('#errorMessage')
const message = document.querySelector('#message-2')

errorMessage.textContent = ''
message.textContent = ''
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    errorMessage.textContent = ''
    message.textContent = 'Loading...'
    const  location = searchElement.value
    const url = 'http://localhost:3000/weather?address='+encodeURIComponent(location)
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                errorMessage.textContent = data.error
                message.textContent = ''
            }else{
                console.log(data.location,data.temparature,data.summary,data.probability)
                errorMessage.textContent = ''
                message.textContent = data.location +" " + data.summary
            }
        })
    })

    console.log('testing!!'+location)
})