/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const students = document.querySelectorAll('li.student-item.cf');
const itemsPerPage = 10;
let pageNumber = 1;


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
  let pageDiv = document.querySelectorAll('div.page');
  let paginationDiv = document.querySelectorAll('div.pagination');
  pageDiv.removeChild(paginationDiv);
  //Find number of pages needed for List
  let numberOfPages = math.ciel(list.length / itemsPerPage);
  //Create pagination div and append to page div
  paginationDiv = document.createElement('div');
  paginationDiv.setAttribute('class', 'pagination');
  pageDiv.appendChild(paginationDiv);
  //Create and append ul element to pagination div
  let ul = document.createElement('ul');
  paginationDiv.appendChild(ul);
  //Add li and a elements for every page
  for (let i = 0; i < numberOfPages; i += 1) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    ul.appendChild(li);
    li.appendChild(a);
  }
}



// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
