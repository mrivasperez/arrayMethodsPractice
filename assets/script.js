// --- SELECT DOM ELEMENTS ---
const main = document.getElementById('main');
const addBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');

// --- INITIALIZE ARRAY ---
let data = [];

// --- FETCH RANDOM USER AND ADD MONEY ---
/* To get the random user information i use randomuser.me/api */
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results.[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

// --- ADD NEW USER OBJECT TO DATA ARRAY ---
function addData(obj) {
    data.push(obj);
}