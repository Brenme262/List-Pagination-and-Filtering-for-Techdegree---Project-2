/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
const studentList = document.querySelector("ul.student-list");
const page = document.querySelector('div.page');
const length = studentList.children.length;
const pages = Math.ceil(length / 10);
const listItems = studentList.children;





// This function creates and places the search bar.

function createSearch(){
  const div = document.createElement('div');
  const input = document.createElement('input');
  const button = document.createElement('button');
  const place = document.querySelector('div.page-header');
  div.className = 'student-search';
  button.textContent = 'Search'
  input.placeholder = "Search for Students....."
  div.appendChild(input);
  div.appendChild(button);
  place.appendChild(div);
  return div;
}

let searchList = createSearch();

// This function creates the no results error message, then sets it to not display
// by setting it's display value to 'none'. Then the function is called.

function noResults(){
  let div = document.createElement('div');
  let p = document.createElement('p');
  div.className = 'results';
  p.textContent = 'No Results Found';
  div.appendChild(p);
  div.style.display = 'none';
  studentList.insertAdjacentElement('afterend', div);
}

noResults();



// This function is the search function, it gets the value from the search box Then
// runs a loop to check it against the student list. If it finds results it changes
// there display value to an emply string, any that don't match have their display
// value set to 'none'. In addition if no results are found it sets the display value
// on the no results message to an open string, unhiding it.


function getResults(){
  let input = searchList.firstElementChild.value;
  let results = false;
  for (let i = 0; i < listItems.length; i++){
    let name = input.toUpperCase();
    let email = input.toUpperCase();
    let searchName = listItems[i].querySelector('h3').textContent.toUpperCase();
    let searchEmail = listItems[i].querySelector('.email').textContent.toUpperCase();
    if (searchName.indexOf(name) === -1 || searchEmail.indexOf(email) === -1 ){
      listItems[i].style.display = 'none';
    }
    else{
      listItems[i].style.display = '';
      results = true;
    }
    if (input.length < 1){
      prepPage();
    }
  }
  if (results !== true){
      document.querySelector('div.results').style.display = '';
  }
}

// This is the event listener that calls the 'getResults()' function and hides the
// no results message if it was previously exposed. There are 2, one that is trigged
// by each key up, and one triggered if the user clicks on search

searchList.addEventListener('keyup', () =>{
  document.querySelector('div.results').style.display = 'none';
  getResults();
})

searchList.addEventListener('click', () =>{
  document.querySelector('div.results').style.display = 'none';
  getResults();
})



/***
   This function accepts a list and page argument. Where list is a list to which
   pagination will be applied, and page is the number of the page of results
   to show. Shows batches of 10. So page 1 shows entries 1 -10, page 2 Shows
   entires 11-20, etc.
***/
function showPage(list, page){
  const lis = list;
  const upper = page * 10;
  const lower = page * 10 - 10;
  for( let i = 0 ; i < lis.length; i++){
    const li = lis[i];
    if( i >= lower && i < upper){
      li.style.display = '';
    }else{
      li.style.display = 'none';
    }
  };
}


/***
This function creates the HTML and for the page links and appends it to the
bottom of the page div. It also sets the class for the div to take advantage of
the css styling.
***/

function appendPageLinks(){
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    function createLI(page){
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = page;
      li.appendChild(a);
      return li;
    }
    div.className = 'pagination';
    div.appendChild(ul);
    for (let i = 1; i <= pages; i++){
      const link = createLI(i);
      ul.appendChild(link);
    }
    page.appendChild(div);
    return div;
}

let menuListDiv = appendPageLinks();
const menuListUL = menuListDiv.firstElementChild;
const menuListLI = menuListUL.children;
/***
This event listner triggers when one of the page links is clicked. It removes the
active class from any that were showing active and then applies it to the clicked
link. In addition is triggers the showPage() function to show only the 10 results
that should be displaying.
***/

menuListUL.addEventListener('click', (e) => {
      for (let i = 0; i < menuListLI.length; i++){
      if(menuListLI[i].firstElementChild.className === 'active'){
        menuListLI[i].firstElementChild.className = '';
        }
      }
      e.target.className = 'active';
      showPage(listItems, e.target.textContent );
});

/// this function set the page to its original state. Limiting the list to the
///first 10 entires and applying the active class to the frist page link.

function prepPage(){
  showPage(listItems, 1);
  menuListLI[0].firstElementChild.className = 'active'
}

prepPage();
