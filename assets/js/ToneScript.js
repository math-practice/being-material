/******************** 
       TONE JS 
*********************/


Site.chords = {
  Cmajor : ["C", "E", "G"],
  Dminor : ["D", "F", "A"],
  Eminor: ["E", "G", "G"],
  Fmajor: ["F", "A", "C"],
  Gmajor: ["G", "B", "D"],
  Aminor: ["A", "C", "E"],
  Bdiminshed : ["B", "D", "F"]
};


Site.chordArray = [
  "Cmajor",
  "Dminor",
  "Eminor",
  "Fmajor",
  "Gmajor",
  "Aminor",
  "Bdiminshed"
];


Site.moveChord = (direction) => {
  // direction false = down
  // direction true = up
  var targetChord,
  indexToAdd,
  targetChordIndex,
  regions = document.querySelector("#regions"),
  insertPlacement = (direction === true) ? 'afterbegin' : 'beforeend',
  allRegions = document.querySelectorAll(".region");
  if(allRegions === undefined){return;}

  // check direction, and remove elements
  if(direction === true){
    targetChord = regions.lastElementChild.getAttribute("data-chord");

    allRegions.forEach(function(thisRegion){
      if(thisRegion.classList.contains(targetChord)){
        thisRegion.remove();
      }
    });

    targetChordIndex = Site.chordArray.indexOf(targetChord);

    indexToAdd = (targetChordIndex - 3 >= 0) ? targetChordIndex - 3 : Site.chordArray.length + (targetChordIndex - 3);


  }else{
    targetChord = regions.firstElementChild.getAttribute("data-chord");

    
    allRegions.forEach(function(thisRegion){

      if(thisRegion.classList.contains(targetChord)){
        thisRegion.remove();
      }
    });

    targetChordIndex = Site.chordArray.indexOf(targetChord);  

    indexToAdd = (targetChordIndex + 3 <= Site.chordArray.length - 1) ? targetChordIndex + 3 : (targetChordIndex + 3) - (Site.chordArray.length);
  }


  var newChords = `
    <button data-chord="${Site.chordArray[indexToAdd]}" class="region ${Site.chordArray[indexToAdd]}" onclick="Site.tones('${Site.chordArray[indexToAdd]}', 1)">${Site.chordArray[indexToAdd]}</button>
    <button data-chord="${Site.chordArray[indexToAdd]}" class="region ${Site.chordArray[indexToAdd]}" onclick="Site.tones('${Site.chordArray[indexToAdd]}', 2)">${Site.chordArray[indexToAdd]}</button>
    <button data-chord="${Site.chordArray[indexToAdd]}" class="region ${Site.chordArray[indexToAdd]}" onclick="Site.tones('${Site.chordArray[indexToAdd]}', 3)">${Site.chordArray[indexToAdd]}</button>
    <button data-chord="${Site.chordArray[indexToAdd]}" class="region ${Site.chordArray[indexToAdd]}" onclick="Site.tones('${Site.chordArray[indexToAdd]}', 4)">${Site.chordArray[indexToAdd]}</button>
    <button data-chord="${Site.chordArray[indexToAdd]}" class="region ${Site.chordArray[indexToAdd]}" onclick="Site.tones('${Site.chordArray[indexToAdd]}', 5)">${Site.chordArray[indexToAdd]}</button>
  `;

  regions.insertAdjacentHTML(insertPlacement, newChords);

}

Site.tones = (chord, note) => {

  //create a synth and connect it to the master output (your speakers)
  var synth = new Tone.Synth().toMaster();

  synth.triggerAttackRelease(`${Site.chords[chord][0]}${note}`, '1n');
  
  setTimeout(function(){
    synth.triggerAttackRelease(`${Site.chords[chord][1]}${(note < 3) ? note + 1 : note - 1}`, '1n');
  }, 150)

  setTimeout(function(){
    synth.triggerAttackRelease(`${Site.chords[chord][2]}${(note < 3) ? note + 2 : note - 2}`, '1n');
  }, 300)
  
}