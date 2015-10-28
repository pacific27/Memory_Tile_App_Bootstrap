$('document').ready(function(){

    $('#shuffle').click(memory.shuffle);
    $('#deck').change(memory.shuffle);
});

var memory = (function() {

  var arrays = {

          linux: ['assets/img/linux/linuxDebian', 'assets/img/linux/linuxDebian',
              'assets/img/linux/linuxArch', 'assets/img/linux/linuxArch',
              'assets/img/linux/linuxUbuntu', 'assets/img/linux/linuxUbuntu',
              'assets/img/linux/linuxOpenSuse', 'assets/img/linux/linuxOpenSuse',
              'assets/img/linux/linuxNetrunner', 'assets/img/linux/linuxNetrunner',
              'assets/img/linux/linuxSliTaz', 'assets/img/linux/linuxSliTaz',
              'assets/img/linux/linuxAntiX', 'assets/img/linux/linuxAntiX',
              'assets/img/linux/linuxMint', 'assets/img/linux/linuxMint',
              'assets/img/linux/linuxKali', 'assets/img/linux/linuxKali',
              'assets/img/linux/linuxFreeBsd', 'assets/img/linux/linuxFreeBsd',
              'assets/img/linux/linuxGentoo', 'assets/img/linux/linuxGentoo',
              'assets/img/linux/linuxRedHat', 'assets/img/linux/linuxRedHat',
              'assets/img/linux/linuxBodhi', 'assets/img/linux/linuxBodhi',
              'assets/img/linux/linuxCentOS', 'assets/img/linux/linuxCentOS',
              'assets/img/linux/linuxElementary', 'assets/img/linux/linuxElementary'
          ],

          seinfeld: ['assets/img/seinfeld/seinfeldBoss', 'assets/img/seinfeld/seinfeldBoss',
              'assets/img/seinfeld/seinfeldCastanzaMom', 'assets/img/seinfeld/seinfeldCastanzaMom',
              'assets/img/seinfeld/seinfeldCastanza', 'assets/img/seinfeld/seinfeldCastanza',
              'assets/img/seinfeld/seinfeldCosmo', 'assets/img/seinfeld/seinfeldCosmo',
              'assets/img/seinfeld/seinfeldElaine', 'assets/img/seinfeld/seinfeldElaine',
              'assets/img/seinfeld/seinfeldGeorge', 'assets/img/seinfeld/seinfeldGeorge',
              'assets/img/seinfeld/seinfeldGroup', 'assets/img/seinfeld/seinfeldGroup',
              'assets/img/seinfeld/seinfeldJerry', 'assets/img/seinfeld/seinfeldJerry',
              'assets/img/seinfeld/seinfeldNewman', 'assets/img/seinfeld/seinfeldNewman',
              'assets/img/seinfeld/seinfeldNewman2', 'assets/img/seinfeld/seinfeldNewman2',
              'assets/img/seinfeld/seinfeldSoupNazi', 'assets/img/seinfeld/seinfeldSoupNazi',
              'assets/img/seinfeld/seinfeldSteinbrenner', 'assets/img/seinfeld/seinfeldSteinbrenner',
              'assets/img/seinfeld/seinfeldUncleLeo', 'assets/img/seinfeld/seinfeldUncleLeo',
              'assets/img/seinfeld/seinfeldDecider', 'assets/img/seinfeld/seinfeldDecider',
              'assets/img/seinfeld/seinfeldBabu', 'assets/img/seinfeld/seinfeldBabu'
          ],

          starTrek: ['assets/img/starTrek/starTrekWorf', 'assets/img/starTrek/starTrekWorf',
              'assets/img/starTrek/starTrekCisco', 'assets/img/starTrek/starTrekCisco',
              'assets/img/starTrek/starTrekData', 'assets/img/starTrek/starTrekData',
              'assets/img/starTrek/starTrekKirk', 'assets/img/starTrek/starTrekKirk',
              'assets/img/starTrek/starTrekSpock', 'assets/img/starTrek/starTrekSpock',
              'assets/img/starTrek/starTrekQuark', 'assets/img/starTrek/starTrekQuark',
              'assets/img/starTrek/starTrekKira', 'assets/img/starTrek/starTrekKira',
              'assets/img/starTrek/starTrekGarok', 'assets/img/starTrek/starTrekGarok',
              'assets/img/starTrek/starTrekDax', 'assets/img/starTrek/starTrekDax',
              'assets/img/starTrek/starTrekGeordi', 'assets/img/starTrek/starTrekGeordi',
              'assets/img/starTrek/starTrekKhan', 'assets/img/starTrek/starTrekKhan',
              'assets/img/starTrek/starTrekOdo', 'assets/img/starTrek/starTrekOdo',
              'assets/img/starTrek/starTrekBorgQueen', 'assets/img/starTrek/starTrekBorgQueen',
              'assets/img/starTrek/starTrekGalDukat', 'assets/img/starTrek/starTrekGalDukat',
              'assets/img/starTrek/starTrekSevenOfNine', 'assets/img/starTrek/starTrekSevenOfNine'
          ]
      };//end arrays

      /*Global Variables*/
      var card_matched = [];
      var memory_values = [];
      var memory_card_id = [];
      var card_matched = [];
      var card_previous = [];
      var cards_flipped = 0;
      var userAttempt = 0;
      var cards_flipped = 0;
      var gamesPlayed = 0;
      var userSelect = "";
      var deck = "";
      var cardBackGround = "";


      /* Randomly sort an array by calculating a value within array
       * range and then swaps values by randomly calculated value
       */
      Array.prototype.randomizeArray = function() {

              var i = this.length;
              var j = 0;
              var temp = "";

              while (--i > 0) {
                  j = Math.floor(Math.random() * (i + 1));
                  temp = this[j];
                  this[j] = this[i];
                  this[i] = temp;
              } // end while
          } //end randomizeArray

      /* Checks which deck the user has selected to play*/
      function deckSelected() {
        deck = $('#deck option:selected').val();
      } //end deckSelected

      /* Sets the deck background to user selected deck*/
      function changeBackground() {

        switch(deck) {
          case 'linux':
            $('[id^=card_]').css('background-image', 'url(assets/img/linux/linux_bg.jpg)');
            cardBackGround = 'assets/img/linux/linux_bg.jpg';
            break;

          case 'seinfeld':
            $('[id^=card_]').css('background-image', 'url(assets/img/seinfeld/seinfeldLogo.jpg)');
            cardBackGround = 'assets/img/seinfeld/seinfeldLogo.jpg';
            break;

          case 'starTrek':
            $('[id^=card_]').css('background-image', 'url(assets/img/starTrek/starTrekLogo.jpg)');
            cardBackGround = 'assets/img/starTrek/starTrekLogo.jpg';
            break;
        } // End Switch
      } // End changeBackGround

      /*Creates the cards for the memory game after randomizing array selected by user putting each card into its own <div>*/
      function shuffle() {

              var output = '';
              card_previous = [];
              card_matched = [];
              cards_flipped = 0;
              userAttempt = 0;

              //call deckSelected to find which deck to shuffle/create
              deckSelected();

              //shuffle the deck deckSelected returned
              arrays[deck].randomizeArray();

              /*Now that cards are randomized within the array create the cards for the
              game board giving each a unique id and passing (cardId,val) onClick*/
              for (var i = 0; i < arrays[deck].length; i++) {
                  output += '<div class="tile" id="card_' + i + '" onclick="memory.flipCard(this,\'' + arrays[deck][i] + '\')"></div>';
              }

              //put the newly created cards into the gameboard
              document.getElementById('memory-board').innerHTML = output;

              //Change the back of card to represent the deck that is being played
              changeBackground();
          } //End Shuffle

        function flipCard(card, val) {

                //get passed in cards id
                var userSelect = card.id;

                /*check to see if passed in card has been previously matched if so alert user to select different card.*/
                if ($.inArray(userSelect, card_matched) == -1 && $.inArray(userSelect, card_previous) == -1) {

                    if (card.innerHTML == "" && memory_values.length < 2) {

                        card.style.backgroundImage = 'url(' + val + '.jpg)';
                        card.innerHTML = "";

                        /*If this is the first card clicked push card value onto the memory_values(stack)
    		                 *and push card.id onto memory_card_id(stack)*/
                        if (memory_values.length == 0) {
                            memory_values.push(val);
                            memory_card_id.push(card.id);
    			                  card_previous.push(card.id);
                            userAttempt++;
                        } //End if

                        /*if this is the second card clicked push card value onto the memory_values(stack)
    		                 *and push card.id onto memory_card_id(stack)*/
                        else if (memory_values.length == 1) {
                            memory_values.push(val);
                            memory_card_id.push(card.id);
                            userAttempt++;

                            /*Compare card values on the stack after two have been clicked to see if they are the same card.*/
                            if (memory_values[0] == memory_values[1]) {
                                //Value used to later check if all tiles have been flipped
                                cards_flipped += 2;

                                /*Add cards matched to array used to safeguard against user picking cards previously matched*/
                                var temp1 = memory_card_id.pop();
                                var temp2 = memory_card_id.pop();
                                card_matched.push(temp1);
                                card_matched.push(temp2);
                                temp1 = "";
                                temp2 = "";

                                /*Clear out arrays(stack) because cards were a match to get array ready for next user selection*/
                                memory_values = [];
                                memory_card_id = [];

                                /*Check to see if all cards have been flipped if so alert user and generate new board*/
                                if (cards_flipped == arrays[deck].length) {
    				                        //stop timer & calculate attempts call get player score and pass (name, time , attempts)
                                    alert("Congratulations!! This round took " + userAttempt / 2 + " attempts");
                                    document.getElementById('memory-board').innerHTML = "";
                                    shuffle();
                                } //End if
                            } //End if
                            else {
                                //If cards were not a match flip them back over
                                function flipCardBack() {
                                        var card_1 = document.getElementById(memory_card_id[0]);
                                        var card_2 = document.getElementById(memory_card_id[1]);
                                        card_1.style.backgroundImage = 'url(' + cardBackGround + ')';
                                        card_1.innerHTML = "";
                                        card_2.style.backgroundImage = 'url(' + cardBackGround + ')';
                                        card_2.innerHTML = "";
    				                            card_previous = [];
                                        memory_values = [];
                                        memory_card_id = [];
                                    } //End flipCardBack
                                setTimeout(flipCardBack, 700);
                            } //End else
                        } //End else if
                    } //End if
                } //End if
                else {
                    alert("This card has previously been selected, please choose a different tile.");
                } //End else
            } //End flipCard

      var public = {
          shuffle: shuffle,
          flipCard: flipCard,
          arrays: arrays,
          deckSelected: deckSelected,
          changeBackground: changeBackground
      };

      return public;

})();
