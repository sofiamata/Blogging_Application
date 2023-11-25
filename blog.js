"use strict";

const MAX_LENGTH = 200;

const blogs = [
  {title: 'HTML Semantic Tags',
   date: new Date(2022, 7, 31),
   content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta cupiditate sint ullam fugiat fugit magni, aliquam quae voluptate, quo eos minima numquam repellendus rerum ipsa ea est. Maxime, dicta delectus eum a minus iure optio eveniet culpa, ipsum iste repellendus laudantium eos deserunt commodi animi distinctio ex hic? At amet dolore nemo accusamus nisi quae, ratione nam. Totam harum expedita temporibus dolore unde sed id debitis suscipit odio voluptates doloremque rem nobis aperiam quasi assumenda doloribus ad vero repellat, alias adipisci tenetur aspernatur vel. Culpa inventore architecto aspernatur dolor natus labore. '},
  {title: 'CSS Selectors',
  date: new Date(2022, 8, 9),
  content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, dolore? Eveniet numquam quam qui quae laboriosam maxime deleniti aperiam quasi culpa veniam, voluptatibus molestias soluta error ratione assumenda sunt. Sapiente doloribus, nulla a tempora assumenda nostrum est enim corporis fugit quasi ipsam eveniet distinctio impedit dolorum eum dolor. Distinctio, reiciendis! '},

  {title: 'Cascading',
  date: new Date(2022, 8, 12),
  content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum architecto provident exercitationem modi inventore obcaecati, fuga, fugiat vero quo iusto vitae minima perspiciatis dolorum incidunt ea dolorem laboriosam illo. Cupiditate est enim aut magni, doloribus animi, fuga inventore eveniet quaerat similique voluptate debitis ad possimus totam repellendus harum voluptatem sit adipisci velit quisquam praesentium sed corporis temporibus facere! Labore architecto deleniti deserunt voluptates velit, maxime ea nisi placeat, eius in reiciendis, saepe alias quidem dignissimos debitis quos tenetur natus. '}
]

blogs.forEach(blog=>{
  addEntry(blog);
});


function addEntry(blog) {

  const blogContainer = document.createElement('article');
  blogContainer.classList.add('post');

  const blogHeader = document.createElement('h3');
  blogHeader.classList.add('blog-header');
  blogHeader.textContent = blog.title;
  blogContainer.append(blogHeader);

  const blogDate = document.createElement('p');
  blogDate.textContent = blog.date.toLocaleDateString();
  blogContainer.append(blogDate);

  const blogContent = document.createElement('p');
  blogContainer.append(blogContent);
  
  //PART 4
  if (blog.content.length > MAX_LENGTH){
    //substring of content
    const summary = blog.content.substring(0, MAX_LENGTH);
    blogContent.textContent = summary;
    //1st span element created
    const dots = document.createElement('span');
    dots.classList.add('dots');   
    dots.textContent = '...';
    blogContent.appendChild(dots);

    //2nd span ellement created
    const remainingContent = document.createElement('span');
    blogContent.appendChild(remainingContent);
    remainingContent.textContent =  blog.content.substring(MAX_LENGTH, );
    remainingContent.className = 'hide';

    //created button
    const newButton = document.createElement('button');
    blogContent.appendChild(newButton);
    newButton.textContent = 'Read More';
    newButton.className = 'more-less-btn';

  } else{
    blogContent.textContent = blog.content;
  }

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '[x]';
  removeBtn.classList.add('delete-btn');

  blogHeader.append(removeBtn);

  document.querySelector('.posts').append(blogContainer);
}

//HIDE/SHOW NEW FORM
//grabbing the .new-btn class
const blogForm = document.querySelector('.new-btn');
blogForm.addEventListener('click', function(event){

    //grabbing the .new-section
    const newSectionClass = document.querySelector('.new-section');
    //using toggle() to hide and show the form
    newSectionClass.classList.toggle('hide');
});

//DELETE A BLOG ENTRY
//grabbing the .posts class
const postsClass = document.querySelector('.posts');

postsClass.addEventListener('click', function(e){
  // check if the event is a delete button
  if (e.target.classList.contains('delete-btn')){
    //deleting blog from the blogs array
    const deletedTitle = e.target.parentElement.textContent.split('[x]')[0];

    const blogFinder = blogs.findIndex(blog => blog.title === deletedTitle );
    if(blogFinder !== -1){
      blogs.splice(blogFinder, 1);

      //delete the closest ancestor element  that is of .post class
       const postElement = e.target.closest('.post');
  
      if (postElement){
        postElement.remove();   
      }
    }
  }
});

//DELETE A BLOG ENTRY
//grabbing the #submit-btn element
const submitButton = document.querySelector('#submit-btn');

submitButton.addEventListener('click', function(e){
  e.preventDefault();
  const form = document.querySelector('.new-form');

    if (form.reportValidity()){
      const grabbingTitle = document.querySelector('#title');
      const grabbingContent = document.querySelector('#content');

      const title = grabbingTitle.value;
      const content = grabbingContent.value;

      //setting the title and the content to empty
      grabbingTitle.value = '';
      grabbingContent.value = '';
      //storing the current time
      const date = new Date();

      //new blog object
      const blog = {title, content, date};
      //new blog object is inserted to the array
      blogs.push(blog);

      //added entry to the DOM
      addEntry(blog);
    }
});

//grabbing the .posts class
const postsClass2 = document.querySelector('.posts');

postsClass2.addEventListener('click', function(e){
    const target = e.target;                                    
  // check if the event is a more-less-btn button
  if (target.classList.contains('more-less-btn')){
    const pElement = target.previousElementSibling;
    const removeDots = target.previousElementSibling.previousElementSibling;
    pElement.classList.toggle('hide');
                                                                  
    if (target.textContent === 'Read More') {
      removeDots.className = 'hide';
      target.textContent = 'Read Less';
    } else {
      removeDots.className = 'dots';
      target.textContent = 'Read More';
    }

  }  
});