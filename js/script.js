/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
const studentList = document.querySelector("ul.student-list");
const page = document.querySelector('div.page');
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

showPage(studentList, 6);



/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/

function appendPageLinks(list){
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    const length = list.children.length;
    const pages = Math.ceil(length / 10);
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
}

appendPageLinks(studentList);

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/





// Remember to delete the comments that came with this file, and replace them with your own code comments.
