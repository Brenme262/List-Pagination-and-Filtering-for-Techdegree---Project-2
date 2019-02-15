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

function resultsList(list){
  let input = searchList.firstElementChild.value;
  let name = '';
  let email = '';
  for (let i = 0; i < list.length; i++){
    name = list
  }
}

/***
   This function accespts a list and page argument. Where list is a list to which
   pagination will be applied, and page is the number of the page of results
   to show. Shows batches of 10. So page 1 shows entries 1 -10, page 2 Shows
   entires 11-20, etc.
***/
function showPage(list, page){
  const lis = list.children;
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

function appendPageLinks(list){
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

const menuListDiv = appendPageLinks(studentList);
const menuListUL = menuListDiv.firstElementChild;
const menuListLI = menuListUL.children;
/***
This even listner triggers when one of the page links is clicked. It removes the
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
      showPage(studentList, e.target.textContent );
});

/// this function set the page to its original state. Limiting the list to the
///first 10 entires and applying the active class to the frist page link.

function prepPage(){
  showPage(studentList, 1);
  menuListLI[0].firstElementChild.className = 'active'
}

prepPage();
