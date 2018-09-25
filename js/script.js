/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//variables that store DOM elements to be referenced and/or manipulated
const students = document.querySelectorAll('li.student-item.cf');
const studentDetails = document.querySelectorAll('div.student-details');
const pageDiv = document.querySelector('div.page');
const pageHeaderDiv = document.querySelector('div.page-header.cf');
const itemsPerPage = 10;
let pageNumber = 1;

//Variables created for the search box
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
let results = [];
let noResults = document.createElement('p');



//Modification of the search box elements and adding the search box to the page
searchDiv.className = 'student-search';
searchInput.placeholder = 'Search for students...';
searchButton.textContent = 'Search';
pageHeaderDiv.appendChild(searchDiv);
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
noResults.className = 'no-results';
noResults.textContent = '';
pageDiv.appendChild(noResults);



// A function to hide all of the items in the list excpet for the ten to be shown
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



// A function to create and append the pagination links
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


//Add pagination to the page
appendPageLinks(students);



//A function to search the students
const searchFunction = (results, students, studentDetails) => {
  //Empty results array
  results = [];
  //Add students who match search criteria to results array and hide those who don't
  for (let i = 0; i < students.length; i += 1) {
    if (studentDetails[i].textContent.toUpperCase().indexOf(searchInput.value.toUpperCase()) !== -1) {
      results.push(students[i]);
      students[i].style.display = 'block';
    } else {
      students[i].style.display = 'none';
    }
  }
  //Display 'No results' message if no student matches search criteria
  if (searchInput.value !== null && results.length === 0) {
    noResults.textContent = 'No results.';
  } else {
    noResults.textContent = '';
    }
  //Add pagination to search results
  pageNumber = 1;
  showPage(results, pageNumber);
  appendPageLinks(results);
}



//listener to filter results in real time as user enters input
searchInput.addEventListener('keyup', () => {
  searchFunction(results, students, studentDetails);
});


//Listener to search when the search button is clicked
searchButton.addEventListener('click', () => {
  searchFunction(results, students, studentDetails);
});
