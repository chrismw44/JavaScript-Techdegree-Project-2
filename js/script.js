/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const students = document.querySelectorAll('li.student-item.cf');
let pageNumber = 1;


// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four
const showPage = (list, page) => {
  let firstPageIndex = (page*10) - 10;
  let lastPageIndex = (page*10) - 1;
  for (let i = 0; i < list.length; i += 1) {
    if (i >= firstPageIndex && i <= lastPageIndex) {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
    }
  }
}

showPage(students, pageNumber);


// Create and append the pagination links - Creating a function that can do this is a good approach




// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
