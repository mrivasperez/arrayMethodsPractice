// --- SELECT DOM ELEMENTS ---
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');

// --- INITIALIZE ARRAY ---
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

/*  --- FETCH RANDOM USER (USING ASYNC FUNCTION!) AND ADD MONEY ---
To get the random user information I used randomuser.me/api */
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

/* --- DOUBLE MONEY FUNCTION
Here I used the map() method. The map() method creates a new array populated with
the results of calling a provided function on every element in the calling array.  */

function doubleMoney() {
    data = data.map((user) => {
        return {...user, money: user.money * 2 };
    });
    updateDOM();
}

// ONLY SHOW MILLIONAIRES
function showMillionaires() {
    data = data.filter(user => user.money >= 1000000);
    updateDOM();
}

// SORT BY WEALTH (DESCENDING)
function sortByWealth() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

// --- ADD NEW USER OBJECT TO DATA ARRAY ---
function addData(obj) {
    data.push(obj);
    updateDOM();
}

/* CALCULATE TOTAL WEALTH 
The reduce method goes over every element and collects some information about each element, and then finally returns the collective result.
*/
function calculateTotal(){
    const wealth = data.reduce((acc, user) => (acc += user.money),0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);

}

// --- DISPLAY USERS IN THE DOM ---
function updateDOM(providedData = data){
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    // Loop through data array
    providedData.forEach(person => {
        // Out persons to DOM
        const element = document.createElement('div');
        element.classList.add('person')
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
        main.appendChild(element);
    });
}

// --- FORMAT NUMBER AS MONEY --- 
function formatMoney(x) {
    return '$' + x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, `$&,`);
}

// --- EVENT LISTENERS ---
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByWealth);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateBtn.addEventListener('click', calculateTotal);