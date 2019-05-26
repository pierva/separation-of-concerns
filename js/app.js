/*  ======== Model ========= */
var model = {
    currentBike: null,
    bikes: [

      {
        "id": 1,
        "src": "https://images.unsplash.com/photo-1508357941501-0924cf312bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "title": "Kavasaki GR-8",
        "clicks": 0
      },
      {
        "id": 2,
        "src": "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
        "title": "Yamaha R6",
        "clicks": 0
      },
      {
        "id": 3,
        "src": "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "title": "Honda Cafe Racer",
        "clicks": 0
    }
  ]
};

/* ==========  Octopus ========== */
// The octopus links the view to the model. Never have the view talking
// directly to the model

var octopus = {
  init: function() {
    // Set our current bike to be the first one of the list
    model.currentBike = model.bikes[0];

    // Tell the view to initialize
    bikeListView.init();
    bikeView.init();
    adminView.init();
  },

  getCurrentBike: function() {
    return model.currentBike;
  },

  getBikes: function() {
    return model.bikes;
  },

  // set the currently-selected bike to the object passed in
  setCurrentBike: function(bike) {
    model.currentBike = bike;
  },

  // increment the counter for the currently-selected bike
  incrementCounter: function() {
    model.currentBike.clicks++;
    bikeView.render();
  }
};

/* ==========  Views ========== */
// Views are responsible of updating the DOM elements

var bikeView = {

  init: function() {
    // store pointers to DOM elements
    this.bikeName = $('.name');
    this.bikeImage = $('#picture');
    this.countElem = $('.clicks');

    // add event listener on click
    this.bikeImage.click(function() {
      octopus.incrementCounter();
    });

    // render the view
    this.render();
  },

  render: function() {
    // update DOM elements with values from the current bike
    var currentBike = octopus.getCurrentBike();
    this.countElem.text(currentBike.clicks);
    this.bikeName.text(currentBike.title);
    this.bikeImage.attr('src', currentBike.src);
  }
};

var bikeListView = {

  init: function() {
    this.bikeListElem = $(".list");

    // render the view
    this.render();
  },

  render: function() {
    var bike, elem;
    // get the list of bikes from the Octopus to be rendered in the list
    var bikes = octopus.getBikes();

    // empty the list
    this.bikeListElem.empty();

    // update the list
    $.each(bikes, function(index, bike){

      // Create new list element
      elem = $('<button>').addClass('btn btn-primary w-100')
        .text(bike.title).data('id', bike.id);

      // on click, setCurrentBike and render the bikeView
      elem.on('click', (function(bikeCopy) {
        return function() {
          octopus.setCurrentBike(bikeCopy);
          bikeView.render();
        };
      })(bike));

      // add the element to the list
      $(".list").append(elem);

    });
  }
}

var adminView = {
  init: function () {
    this.nameElem = $('input[name="name"]');
    this.urlElem = $('input[name="url"]');
    this.clicksElem = $('input[name="clicks"]');
    $('#adminButton').on('click', function(event) {
      event.preventDefault();
      $('.admin-form-container').toggle(200);
    });
  }

};

// start the application
octopus.init();



// Old version without octopus and render function

// $(function(){
//   $.each(bikes, function(index, bike){
//     var button = $('<button>').addClass('btn btn-primary w-100')
//       .text(bike.title).data('id', bike.id);
//     $(".list").append(button);
//   });
//
//   $('.list').on('click', 'button', function(event){
//     event.preventDefault();
//     var id = $(this).data('id');
//     $('#picture').attr('src', bikes[id].src);
//     $('.name').text(bikes[id].title);
//     $('.clicks').text(bikes[id].clicks);
//     $('#picture').on('click', function(event){
//       event.preventDefault();
//       bikes[id].clicks++;
//       $('.clicks').text(bikes[id].clicks);
//     })
//   });
// });
