var currentIndex = 0;
var profiles = [];
var isPaused = false

$( document ).ready( function(){

//INPUT//
    $.ajax({
      url: "http://devjana.net/support/tau_students.json",
      dataType: 'JSON',
      success: function( data ){
        // console log out returned data
        console.log( 'in ajax success, data:' , data );

        for (var i = 0; i < data.tau.length; i++) {
          profiles.push(data.tau[i]);
        }
        console.log('created array:', profiles);
        displayIndexNav(profiles);
        displayProfile(currentIndex);
      }// end success
    }); // end ajax

//TIMED ACTION//
  var autoNext = setInterval( function(){
    if(!isPaused){
      currentIndex++;
      if (currentIndex > profiles.length-1){currentIndex = 0;}
      displayProfile(currentIndex);
    } //end (first) if
  }, 1000);

//BUTTON LISTENERS//
    $('.navigate-buttons').on('click', clickedNextOrPrevious);
    $('#index-nav').on('click', '.name-button', clickedIndex);
    $('#pause-button').on('click', clickedpauseAuto);


//LOGIC//

    function clickedIndex(){
      console.log('clicked index');
      var currentIndex = Number($(this).attr("name") );
      displayProfile(currentIndex);
    } //end clickedIndex

    function clickedpauseAuto (){
      console.log('stop/continue clicked: ', $('#pause-button').attr('name') );
      if ( !isPaused ){
        isPaused = true;
        $('#pause-button').attr('name', 'continue');
        $('#pause-button').text('Continue Auto Advance')
      } else {
        isPaused = false;
        $('#pause-button').attr('name', 'stop');
        $('#pause-button').text('Stop Auto Advance')
      }
    } //end clickedpauseAuto

    function clickedNextOrPrevious(){
      console.log('click!');
       if ($(this).attr("id") == "next"){
         currentIndex++;
       } else {
         currentIndex--;
       }
       if (currentIndex > profiles.length-1){
         currentIndex = 0;
       } else if (currentIndex < 0 ){
         currentIndex = profiles.length-1;
       }
       console.log('currentIndex', currentIndex);
       displayProfile(currentIndex);
    } // end clickedNextOrPrevious

//TO THE DOM//
    function displayProfile(index){
      console.log("in displayProfiles",index, profiles[index]);
      var person = profiles[index];
      var name = person.first_name + ' ' + person.last_name;
      var profilePic = '<img id="profile-pic" src="'+ person.picUrl +'" alt="'+ name +'">';
      profilePic += '<p>'+ (Number(index)+1) +'/'+ profiles.length +'</p>';
      $('#profile-pic').html(profilePic);
      $('#profile-name').text(name);
      $('#profile-info').text(person.info);
    }; // end displayProfiles

    function displayIndexNav(array){
      for(var i = 0; i < array.length; i++){
        var person = array[i];
        $("#index-nav").append("<div class='name-button'></div>");
        var $el = $("#index-nav").children().last();
        $el.append("<button>" + person.first_name + "</button>");
        $el.attr('name', i );
      }// end for
    } // end displayIndexNav


}); // end doc ready
