/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


//selects the header class in index.html
let searchLink = document.querySelector('.header')
//creates html string for search button
let searchButton = `
    <label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>
`
//inserts the searchbutton at the end of the searchLink header
searchLink.insertAdjacentHTML('beforeend', searchButton);

//lets users search using the input field and runs every time a key is released
function nameSearch(list) {
  //listens for keys being released in the searchLink header
  searchLink.addEventListener('keyup', (event) => {
    //creates a new empty array to append searches to
    let newList = []
    //variable to store the search after its changed to all lower case
    let lowerCaseSearch = event.target.value.toLowerCase()
    //only runs if the event is input
    if (event.target.tagName == "INPUT") {
      //loops through the list of students
      for (let i = 0; i < list.length; i++){
        //converts their first and last name from the object to a lowercase string
        let name = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`
        //if the search is included anywhere in the name it is added to the newList array
        if (name.includes(lowerCaseSearch)) {
          newList.push(list[i])
        }
      }
        //displays page and pagination with the newList array that is created through the search
        showPage(newList, 1)
        addPagination(newList)
    }
})
}

//lets users search through students via clicking the search button
function buttonSearch(list) {
  //selects the button in the search button and assigns to variable
  let searchButton = document.querySelector('button')
  //listens for click events in the button
  searchButton.addEventListener('click', (event) => {
    //sets a variable with the input field next to the search button
    let buttonValue = document.getElementById('search')
    //creates a new empty array to append searches to
    let newList = []
    //variable to store search value in lower case
    let lowerCaseSearch = buttonValue.value.toLowerCase()
    //loops through student list and if search value is included in the students name it is appended to the newList
        for (let i = 0; i < list.length; i++){
        let name = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`
        if (name.includes(lowerCaseSearch)) {
          newList.push(list[i])
        }
        //displays page and pagination with the newList array that is created through the search
        showPage(newList, 1)
        addPagination(newList)
    }
})
}





/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

//accepts list of students and a page number as a parameter and displays the appropriate 9 students
function showPage(list, page) {
  let startIndex = (page * 9) - 9;
  let endIndex = page * 9
  //selects the student-list class from the dom
  let studentList = document.querySelector('.student-list')
  //initializes the inner html of studentList as an empty variable to insert studentItems into
  studentList.innerHTML = ''
//loops through the student list, using the startIndex and endIndex to only create student items when on the 9 students of that page
  for (let i = 0; i < list.length; i ++) {
    if (i >= startIndex && i < endIndex) {
      let studentItem =
      `
        <li class="student-item cf">
        <div class="student-details">
        <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
        <h3>${list[i].name.first} ${list[i].name.last}</h3>
        <span class="email">${list[i].email}</span>
        </div>
        <div class="joined-details">
        <span class="date">Joined ${list[i].registered.date}</span>
        </div>
        </li>
      `
//inserts the student item into the studentList at the end
      studentList.insertAdjacentHTML('beforeend', studentItem);
    };
  }
}

/*
addPagination adds the appropriate amount of buttons based on the number of students
*/
function addPagination(list) {
  //checks to make sure the list is not empty
  if (list.length > 0) {
  //determines number of pages
  let numOfPages = Math.ceil(list.length / 9)
  //selects the list area and sets it up as an empty string to clear any previous data out
  let linkList = document.querySelector('.link-list')
  linkList.innerHTML = ''
  //loops through the number of pages needed and adds incremented buttons in a li element
  for (let i = 1; i <= numOfPages; i ++) {
    let button = `
      <li>
        <button type="button">${i}</button>
      </li>
    `
    //adds buttons to the DOM
    linkList.insertAdjacentHTML('beforeend', button)
  }
//sets up the first button to be active
  linkList.querySelector('button').className = "active"
//listens for clicks in linkList
  linkList.addEventListener('click', (event) => {
    //if it was a button click it activates the button that was clicked
    if (event.target.tagName == "BUTTON") {
      linkList.querySelector(".active").className = ''
      event.target.className = "active"
      //shows the page using the student list and the page number selected from clicking the pagination button
      showPage(list, event.target.textContent)
     }
  })
  //if the list is empty displays html message to user
} else {
    let studentList = document.querySelector('.student-list')
    studentList.innerHTML = ''
    let studentItem = `
      <h2>
      <span class="date">No results match your search</span>
      </h2>
    `
    //inserts message into the DOM
    studentList.insertAdjacentHTML('beforeend', studentItem);
    //selects and removes pagination buttons
    let linkList = document.querySelector('.link-list')
    linkList.innerHTML = ''
}


}

// Call functions
showPage(data, 1)
addPagination(data)
nameSearch(data)
buttonSearch(data)
