/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



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
  let numOfPages = Math.ceil(list.length / 9)
  let linkList = document.querySelector('.link-list')
  linkList.innerHTML = ''
  for (let i = 1; i <= numOfPages; i ++) {
    let button = `
      <li>
        <button type="button">${i}</button>
      </li>
    `
    linkList.insertAdjacentHTML('beforeend', button)
  }
//sets up the first button to be active
  linkList.querySelector('button').className = "active"
//listens for clicks in linkList
  linkList.addEventListener('click', (event) => {
    if (event.target.tagName == "BUTTON") {
      linkList.querySelector(".active").className = ''
      event.target.className = "active"
      showPage(list, event.target.textContent)
     }
  })
}

// Call functions
showPage(data, 1)
addPagination(data)
