document.addEventListener('DOMContentLoaded', ready())

// global vars

var calender 
var monthYearDisplay 
var daysContainer 
var prevButton 
var nextButton 


var activityModal 
var overlay 
var activityInput 
var saveActivityButton
var activityList

var addActivityButton


function ready(){
    calender = document.getElementById('calender');
    monthYearDisplay = document.getElementById('month-year');
    daysContainer = document.getElementById('days');
    prevButton = document.getElementById('prev');
    nextButton = document.getElementById('next');
    
    
    activityModal = document.getElementById('activity-modal');
    overlay = document.getElementById('overlay');
    activityInput = document.getElementById('activity-input');
    saveActivityButton = document.getElementById('save-activity');
    activityList = document.getElementById('activity-list'); 

    addActivityButton = document.getElementById('addActivityButton');
}


let currentDate = new Date();
let selectedDate = new Date();

let activies = {}

function renderCalender(date){
    daysContainer.innerHTML = '';

    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

    monthYearDisplay.textContent = `${date.toLocaleString('default', {month: 'long'})} ${year}`;

    for(let i = firstDayOfMonth; i > 0; i--){
        const day = document.createElement('div');
        day.textContent = lastDateOfMonth - i + 1;
        day.classList.add('prev-month-day');
        daysContainer.appendChild(day);
    }

    for(let i = 1; i <= lastDateOfMonth; i++ ){
        const day = document.createElement('div');
        day.textContent = i;
        // day.addEventListener('click', () => openActivityModal(year, month, i));
        if(i === selectedDate.getDate() && 
            year === selectedDate.getFullYear() && 
            month === selectedDate.getMonth()){
                day.classList.add('current-day')
        }
        daysContainer.appendChild(day);
    }

    const remainingDays = 42 - daysContainer.childElementCount;

    for(let i = 1; i <= remainingDays; i++){
        const day = document.createElement('div');
        day.textContent = i;
        day.classList.add('next-month-day');
        daysContainer.appendChild(day);
    }
}



function openActivityModal(year, month, day){
    selectedDate = new Date(year, month, day);
    activityInput.value = '';
    overlay.classList.add('active');
    activityModal.classList.add('active');
    renderActivities(selectedDate)
}

function closeActivityModal(){
    overlay.classList.remove('active');
    activityModal.classList.remove('active');
}

function saveActivity(){
    const activity = activityInput.value.trim();

    if(activity){
        const dateKey = selectedDate.toISOString().split('T')[0];
        if(!activies[dateKey]){
            activies[dateKey] = [];
        }

        activies[dateKey].push(activity);
        closeActivityModal();
        renderCalender(currentDate);
        renderActivities(selectedDate)
    }
}

function renderActivities(date) {
    const dateKey = date.toISOString().split('T')[0];
    activityList.innerHTML = '';

    if (activities[dateKey]) {
        activities[dateKey].forEach(activity => {
            const li = document.createElement('li');
            li.textContent = activity;
            activityList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No activities for this day.';
        activityList.appendChild(li);
    }
}

prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalender(currentDate);
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalender(currentDate);
});

// daysContainer.addEventListener('click', (event) => {
//     if(event.target.tagName = 'DIV' && event.target.textContent){
//         const day = parseInt(event.target.textContent);
//         const year = currentDate.getFullYear();
//         const month = currentDate.getMonth();
//         // openActivityModal(year, month, day);
//     }
// });


addActivityButton.addEventListener('click', (event) =>{
    const day = parseInt(event.target.textContent);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    openActivityModal(year, month, day);
})

overlay.addEventListener('click', closeActivityModal);
saveActivityButton.addEventListener('click', saveActivity);

renderCalender(currentDate);