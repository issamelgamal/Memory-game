let nums = document.querySelector(".score .num-blocks") 
// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
   // Prompt Window To Ask For Name
   let yourName = prompt("Whats Your Name?");
   // If Name Is Empty
   if (yourName == null || yourName == "") {
      // Set Name To Unknown
      document.querySelector(".name span").innerHTML = 'Unknown';
      //Name Is Not Empty
   } else {
      // Set Name To Your Name
      document.querySelector(".name span").innerHTML = yourName;
   }
   // Remove Splash Screen
   document.querySelector(".control-buttons").remove();
};
let duration = 1000 ; 
let blockscontainer = document.querySelector(".memory-game-blocks")
let blocks = Array.from(blockscontainer.children);

let orderRange = [...Array(blocks.length).keys()];
////////////////or
// // // let orderRange =Array.from(Array(blocks.length).keys());
shuffle(orderRange);


// add order css property to game blocks 
blocks.forEach((block , index) =>{
   block.style.order = orderRange[index];
   // Add Click Event
   block.addEventListener('click', function () {
      // Trigger The Flip Block Function
      flipBlock(block);
   });
})


// Flip Block Function
function flipBlock(selectedBlock) {

   // Add Class is-flipped
   selectedBlock.classList.add('is-flipped');
   
   // Collect All Flipped Cards
   let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

   // If Theres Two Selected Blocks
   if (allFlippedBlocks.length === 2) {

      // Stop Clicking Function
      stopClicking();

      // Check Matched Block Function
      checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
   }
}
let score = document.querySelector(".score span")
// Check Matched Block Function
function checkMatchedBlocks(firstBlock, secondBlock){
   let triesElement = document.querySelector(".tries span")
   if(firstBlock.dataset.technology ===secondBlock.dataset.technology){
      firstBlock.classList.remove("is-flipped")
      secondBlock.classList.remove("is-flipped")
      
      firstBlock.classList.add("has-match")
      secondBlock.classList.add("has-match")
      score.innerHTML = parseInt(score.innerHTML) +1;
      if (score.innerHTML == 10){
         document.getElementById('final').play();
      } else{
         document.getElementById('success').play();
      }

   }else {
      triesElement.innerHTML = parseInt(triesElement.innerHTML) +1;
      if (triesElement.innerHTML == 10){
         document.getElementById("lose").play()
      } else {
         document.getElementById('wrong').play();
      }
      setTimeout(()=>{
         firstBlock.classList.remove("is-flipped")
         secondBlock.classList.remove("is-flipped")
      },1000)
   }
   if (triesElement.innerHTML == 10 || score.innerHTML == 10){
      setTimeout(function(){
         location.reload();
      },1000)
   }
}
//shuffle function randmoize the numbers o
function shuffle(array){
   //settings Vars 
   let current = array.length,
   temp,
   random;
   while (current>0){
      // Get Random Number 
      random = Math.floor(Math.random()*current);
      
      //decrease length one 
      current--;
      //save current element in stash 
      temp = array[current];
      //current element = random element
      array[current] = array[random];
      //random element = get element from stash 
      array[random] = temp;
   }
   return array;
   
}
//stopClicking function
function stopClicking(){
   // add class no Clicking on main container 
   blockscontainer.classList.add('no-clicking');
   setTimeout(() => {
      // remove class no clicking after duration
      blockscontainer.classList.remove('no-clicking');
   }, duration)
}
nums.innerHTML = parseInt((blocks.length)/2)


document.querySelector(".toggle-settings .fa-gear").onclick = function (){
   // toggle class fa-spin for rotation
   this.classList.toggle("fa-spin");
   
   // toggle class fa-spin for rotation
   document.querySelector(".setting-box").classList.toggle("open");
   
}
// Get the volume span elements
let volumeYes = document.querySelector('.vloume .yes');
let volumeNo = document.querySelector('.vloume .no');

// Get all audio elements
let audios = document.querySelectorAll('audio');

// Click event for 'No' in volume
volumeNo.addEventListener('click', function() {
   // Mute all audio elements
   audios.forEach(audio => {
      audio.muted = true;
   });

   // Add 'active' class to the clicked span
   volumeYes.classList.remove('active');
   volumeNo.classList.add('active');

   // Show the setting box
   document.querySelector('.setting-box').classList.add('open');
});

// Click event for 'Yes' in volume
volumeYes.addEventListener('click', function() {
   // Unmute all audio elements
   audios.forEach(audio => {
      audio.muted = false;
   });

   // Add 'active' class to the clicked span
   volumeNo.classList.remove('active');
   volumeYes.classList.add('active');

   // Hide the setting box
   document.querySelector('.setting-box').classList.remove('open');
});

