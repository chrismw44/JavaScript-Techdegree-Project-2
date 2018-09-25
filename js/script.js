/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const students = document.querySelectorAll('li.student-item.cf');
const studentDetails = document.querySelectorAll('div.student-details');
const pageDiv = document.querySelector('div.page');
const pageHeaderDiv = document.querySelector('div.page-header.cf');
const itemsPerPage = 10;
let pageNumber = 1;
let results = [];
let searchCounter = 0;

// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four
const showPage = (list, page) => {
  //Find the first and last students to display on the page
  let firstPageIndex = (page*10) - 10;
  let lastPageIndex = (page*10) - 1;
  //Iterate over all of the list and hide/show the correct students
  for (let i = 0; i < list.length; i += 1) {
    if (i >= firstPageIndex && i <= lastPageIndex) {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
    }
  }
}

//Shows page 1 when the page loads
showPage(students, pageNumber);


// Create and append the pagination links - Creating a function that can do this is a good approach
const appendPageLinks = (list) => {
  //Remove any exsisting pagination
  if (document.querySelector('div.pagination') !== null) {
    let removeDiv = document.querySelector('div.pagination');
    pageDiv.removeChild(removeDiv);
  }
  //Find number of pages needed for List
  let numberOfPages = Math.ceil(list.length / itemsPerPage);
  //Create pagination div and append to page div
  let paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination';
  pageDiv.appendChild(paginationDiv);
  //Create and append ul element to pagination div
  let ul = document.createElement('ul');
  paginationDiv.appendChild(ul);
  //Add li and anchor elements for every page
  for (let i = 0; i < numberOfPages; i += 1) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.textContent = i + 1;
    ul.appendChild(li);
    li.appendChild(a);
  }
  //Give the first anchor tag the 'active' class
  if (list.length > 0) {
    let a = document.querySelectorAll('a');
    a[0].className = 'active';
  }

  //Event listener to display the correct students when anchor tags are clicked
  paginationDiv.addEventListener('click', (event) => {
    if (event.target.tagName == 'A') {
      pageNumber = parseInt(event.target.textContent);
      showPage(list, pageNumber);
      //Makes sure only the clicked anchor tag has the 'active' class
      let a = document.querySelectorAll('a');
      for (let i = 0; i < numberOfPages; i += 1) {
        a[i].classList.remove('active');
      }
      event.target.className = 'active';
    }
  });
}

appendPageLinks(students);

//Create search box and button
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
const searchInput = document.createElement('input');
searchInput.placeholder = 'Search for students...';
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
pageHeaderDiv.appendChild(searchDiv);
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
let noResults = document.createElement('p');
noResults.className = 'no-results';
noResults.textContent = '';
pageDiv.appendChild(noResults);


//Search functionality
const searchFunction = (results, students, studentDetails) => {
  results = [];
  for (let i = 0; i < students.length; i += 1) {
    if (studentDetails[i].textContent.toUpperCase().indexOf(searchInput.value.toUpperCase()) !== -1) {
      results.push(students[i]);
      students[i].style.display = 'block';
    } else {
      students[i].style.display = 'none';
    }
  }
  if (searchInput.value !== null && results.length === 0) {
    noResults.textContent = 'No results.';
  } else {
    noResults.textContent = '';
    }
  pageNumber = 1;
  showPage(results, pageNumber);
  appendPageLinks(results);
}

searchInput.addEventListener('keyup', () => {
  searchFunction(results, students, studentDetails);
});

searchButton.addEventListener('click', () => {
  searchFunction(results, students, studentDetails);
});
