//Task 1 - get JSON from API's DOG + show output in console

async function start(){
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    if(!response.ok) // check if response worked (no 404 errors etc...)
      throw new Error(response.statusText);

    const data = await response.json(); // get JSON from the response
    console.log(data);
    createCanvas(data.message); // Function to create canvas, reagrding my 2 main functions
}
  start();

  // TASK 3 - image processing using option no. 2; half and half

  async function createCanvas(image){

    const begin = performance.now();
    await DispImage(image); // Display main image that was fetched
    const end = performance.now();
    console.log(`Execution time for displaying the image: ${end-begin} ms.`); // Used performance function to messure the time during proccessing each function

    const begin2 = performance.now();
    await ProcessImage(image); 
    const end2 = performance.now();
    console.log(`Execution time for processing the image: ${end2-begin2} ms.`);
    
  }
  // TASK 4 -  Display the image that was fetched with data.message as the parametre function
  async function DispImage(image){

    setTimeout(() => {
      console.log("Delayed for 1 second.");
    }, 1000);

    //Create the Canvas using the basic method implemented
    var c = document.getElementById("initialImage");
    var ctx = c.getContext("2d");
    let img = new Image();
    img.src = image;
    
    img.onload = () => {
      //Get canvas width and height from the image
      c.width = img.width/2;
      c.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
  }

  //TASK 5 - Processing the image - async
  async function ProcessImage(image){

    //Set delay to each function respecting the procedure implemented in the homework to-do's
    setTimeout(() => {
      console.log("Delayed for 1 second.");
    },1000);

    var c = document.getElementById("ProcessedImage");
    var ctx = c.getContext("2d");
    let img = new Image();
    img.src = await get_image(image);

    img.onload = () => {
      c.width= img.width;
      c.height= img.height;
      
      ctx.drawImage(img,0,0);
      
      var imageData=ctx.getImageData(0,0, img.width, img.height);
      
      for (var i=0; i<imageData.data.length; i+=4) {
        //Calculated each pixel R, G, B, then calculate the average 
          var greyscale = (imageData.data[i]*0.3 + imageData.data[i+1]+0.59 +imageData.data[i+2]*0.11);
      
          imageData.data[i] = greyscale; // R
          imageData.data[i+1] = greyscale; // G
          imageData.data[i+2] = greyscale; // B
      }
      
      ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    };

  }


  //Get the image function using proxy with blob implemented in JS
  async function get_image(url) {
    return fetch("https://api.codetabs.com/v1/proxy?quest=" + url)
        .then((response)=> {
          return response.blob();
        })
        .then((blob)=> {
          return URL.createObjectURL(blob);
        });
  }
