const container=document.querySelector('.container')
const seats=document.querySelectorAll('.row .seat:not(.occupied)')
const count=document.getElementById('count')
const total=document.getElementById('total')
const movieSelect=document.getElementById('movie')

populateUI()
console.log(typeof movieSelect.value)
let ticketPrice=+movieSelect.value; //converts the string to number


//save selected movie index and price
//more info on doc 1.1
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

//updates the total no of tickets and total price
//more info on doc 1.2
function updateSelectedCountAndTotal(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected')
    const seatsIndex=[...selectedSeats].map((seat)=>{
        return [...seats].indexOf(seat)
    })

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex))

    
    const selectedSeatsCount=selectedSeats.length

    count.innerText=selectedSeatsCount;
    total.innerText=selectedSeatsCount*ticketPrice;
}

//get data from localstorage and populate UI
//more info on doc 1.3
function populateUI(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'))

    if(selectedSeats!==null && selectedSeats.length >0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex=localStorage.getItem('selectedMovieIndex')

    if(selectedMovieIndex!==null){
        movieSelect.selectedIndex=selectedMovieIndex
    }
}

//movie select event
//more info on doc 1.4
movieSelect.addEventListener('change',function(e){
    ticketPrice=+event.target.value
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCountAndTotal()
})


//seat select event
//more info on doc 1.5
container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')

        updateSelectedCountAndTotal()
    }
})


//intial count and total set
updateSelectedCountAndTotal()