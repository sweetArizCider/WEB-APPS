//12a//
const add = function(){
  console.log(2 + 3);
}

for (let i = 0; i <= 1; i++){
  add();
};

//12b

function runTwice(fun){
  for (let i = 0; i <= 1; i++){
    fun();
  };
}

runTwice(function(){
  console.log('12b');
});

runTwice(add);

function displayMessage(){
  let intervalId1

  const p = document.querySelector('.js-addParagraph');
  p.innerHTML = 'Added';

  clearInterval(intervalId1)

  
}


function changeText(){
  const button = document.querySelector('.js-startButton')
  button.innerHTML = 'Loading...'
  
  setTimeout(function (){
    button.innerHTML = 'Finished'
    }, 1000
  )};


  let timeoutId;

function addToCart() {
    const paragraph = document.querySelector('.js-addParagraph');
    paragraph.innerHTML = 'Added';
    clearTimeout(timeoutId);

    timeoutId = setTimeout(function() {
        paragraph.innerHTML = '';
    }, 2000);
}

let intervalId2, number = 0;

function message(){
  clearInterval(intervalId2)
  if(number > 0){
    intervalId2 = setInterval(function() {
      if (document.title === 'App') {
        document.title = `(${number}) New messages`;
      } else {
        document.title = 'App';
      }
    }, 1000);
  }else{
    document.title = 'App';
    number = 0;
    return number;
  }
   
}





