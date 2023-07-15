const btn = document.querySelector('.arrow_btn');

const day = document.getElementById('day_input');
const month = document.getElementById('month_input');
const year = document.getElementById('year_input');

const dayLabel = document.querySelector('.day_label');
const monthLabel = document.querySelector('.month_label');
const yearLabel = document.querySelector('.year_label');

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

let dayRequired = document.querySelector('.day_p');
let monthRequired = document.querySelector('.month_p');
let yearRequired = document.querySelector('.year_p');

let ageResult = document.getElementById('year_number');
let monthsResult = document.getElementById('months_number');
let daysResult = document.getElementById('days_number');

let daysWord = document.getElementById('days_word');
let monthsWord = document.getElementById('months_word');
let yearsWord = document.getElementById('years_word');

// FUNCTIONS
 
function validDay(e) {
    e.innerHTML = '';
    e.classList.remove('hide');
    e.appendChild(document.createTextNode('Must be a valid day'));
}

function validMonth(e) {
    e.innerHTML = '';
    e.classList.remove('hide');
    e.appendChild(document.createTextNode('Must be a valid month'));
}

function validYear(e) {
    e.innerHTML = '';
    e.classList.remove('hide');
    e.appendChild(document.createTextNode('Must be a valid year'));
}

function inThePast(e) {
    e.innerHTML = '';
    e.classList.remove('hide');
    e.appendChild(document.createTextNode('Must be in the past'));
}

function requiredField(e) {
    e.innerHTML = '';
    e.classList.remove('hide');
    e.appendChild(document.createTextNode('This field is required'));
}

function errorStyle(e, e2) {
    e.style.borderColor = 'hsl(0, 100%, 67%)';
    e2.style.color = 'hsl(0, 100%, 67%)';
}

function resetStyle(e, e2) {
    e.style.borderColor = 'hsl(0, 0%, 86%)';
    e2.style.color = 'hsla(0, 1%, 44%, .9)';
}

function resetNumbers(e,e2,e3) {
    e.innerHTML = '';
    e.appendChild(document.createTextNode('--'));
    e2.innerHTML = '';
    e2.appendChild(document.createTextNode('--'));
    e3.innerHTML = '';
    e3.appendChild(document.createTextNode('--'));
}

// MAIN CODE

function process() {

    if ((day.value > currentDay) && (month.value >= currentMonth) && (year.value >= currentYear)) { //DATE VALIDATION

        resetNumbers(daysResult, monthsResult, ageResult);

        validDay(dayRequired);
        errorStyle(day, dayLabel);

        validMonth(monthRequired);
        errorStyle(month, monthLabel);

        inThePast(yearRequired);
        errorStyle(year, yearLabel);

    } else if (year.value > currentYear) { //YEAR VALIDATION / NO FUTURE YEARS

        resetNumbers(daysResult, monthsResult, ageResult);
        inThePast(yearRequired);
        errorStyle(year, yearLabel)

    } else if (year.value < 1) { //YEAR VALIDATION / NO BC YEARS

        resetNumbers(daysResult, monthsResult, ageResult);
        validYear(yearRequired);
        errorStyle(year, yearLabel);

    } else if ((day.value > 31) || (day.value < 1) || (day.value > 28 && month.value == 2) || (day.value > 30 && (month.value == 4 || month.value == 6 || month.value == 9 || month.value == 11))) { //MONTH DAYS VALIDATION

        resetNumbers(daysResult, monthsResult, ageResult);
        validDay(dayRequired);
        errorStyle(day, dayLabel);

    } else { //OUTPUT

        dayRequired.innerHTML = '';
        monthRequired.innerHTML = '';
        yearRequired.innerHTML = '';

        resetStyle(day, dayLabel);
        resetStyle(month, monthLabel);
        resetStyle(year, yearLabel);

        if (((day.value > currentDay) && (month.value == currentMonth)) || (month.value > currentMonth)) { //AGE ACCORDING CURRENT MONTH

            ageResult.innerHTML = '';
            ageResult.appendChild(document.createTextNode((currentYear - year.value) - 1));

        } else { //REGULAR AGE CALCULATOR

            ageResult.innerHTML = '';
            ageResult.appendChild(document.createTextNode(currentYear - year.value));
        }

        if ((day.value > currentDay) && (month.value < currentMonth)) { //MONTHS ACCORDING CURRENT DAY

            monthsResult.innerHTML = '';
            monthsResult.appendChild(document.createTextNode((currentMonth - month.value) - 1));

        } else if ((day.value <= currentDay) && (month.value > currentMonth)) {

            monthsResult.innerHTML = '';
            monthsResult.appendChild(document.createTextNode((currentMonth - month.value) + 12));

        } else if ((day.value > currentDay) && (month.value > currentMonth)) {

            monthsResult.innerHTML = '';
            monthsResult.appendChild(document.createTextNode((currentMonth - month.value) + 11));

        } else if ((day.value < currentDay) && (month.value == currentMonth)) {

            monthsResult.innerHTML = '';
            monthsResult.appendChild(document.createTextNode(0));

        } else if ((day.value > currentDay) && (month.value == currentMonth)) {
            monthsResult.innerHTML = '';
            monthsResult.appendChild(document.createTextNode(11));

        } else { //REGULAR MONTH CALCULATOR

            monthsResult.innerHTML = '';
            monthsResult.appendChild(document.createTextNode(currentMonth - month.value));

        }

        //DAYS CALCULATOR start

        if (day.value <= currentDay) {
            daysResult.innerHTML = '';
            daysResult.appendChild(document.createTextNode(currentDay - day.value));
        } else if (day.value > currentDay) {
            daysResult.innerHTML = '';
            daysResult.appendChild(document.createTextNode((currentDay - day.value) + 30));
        }

        //DAYS CALCULATOR end
    }

    // EMPTY INPUT VALIDATION start

    if (day.value == '') {
        resetNumbers(daysResult, monthsResult, ageResult);
        requiredField(dayRequired);
        errorStyle(day, dayLabel);
    }

    if (month.value == '') {
        resetNumbers(daysResult, monthsResult, ageResult);
        requiredField(monthRequired);
        errorStyle(month, monthLabel);
    } else if (month.value > 12 || month.value < 1) {
        resetNumbers(daysResult, monthsResult, ageResult);
        validMonth(monthRequired);
        errorStyle(month, monthLabel);
    }

    if (year.value == '') {
        resetNumbers(daysResult, monthsResult, ageResult);
        requiredField(yearRequired);
        errorStyle(year, yearLabel);
    }

    // EMPTY INPUT VALIDATION end

    // PLURAL / SINGULAR start

    if (daysResult.textContent == 1) {
        daysWord.textContent = daysWord.textContent.replace('days', 'day');
    } else {
        daysWord.textContent = 'days';
    }

    if (monthsResult.textContent == 1) {
        monthsWord.textContent = monthsWord.textContent.replace('months', 'month');
    } else {
        monthsWord.textContent = 'months';
    }

    if (ageResult.textContent == 1) {
        yearsWord.textContent = yearsWord.textContent.replace('years', 'year');
    } else {
        yearsWord.textContent = 'years';
    }

    // PLURAL / SINGULAR end
}


//KEYPRESS / CLICK FUNCIONALITY

document.body.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        process();
    }
});

btn.addEventListener('click', () => {
    process();
});