// Part 1.2 - create event.js
// Part 1.3 - event constructor
class Event {
    constructor(name, description) {
      this.name = name;
      this.description = description;
      this.blurb = ""; // added blurb so as to not modify description
      this.availableTickets = [];
    }
  
    // Part 2.3 - create new ticket type w/ name and price
    addAvailableTickets(typeName, typePrice) {
      const typeObj1 = new TicketType(typeName, typePrice);
      this.availableTickets.push(typeObj1);
    }
  
    // Part 2.5 - print all tickets && Part 2.6 - display ticket types on HTML
    allTickets() {
      this.blurb += `<br><strong> - All tickets: </strong>`
      for (let i = 0; i < this.availableTickets.length; i++) {
        this.blurb += `<li>${i+1}. ${this.availableTickets[i].name} ($${this.availableTickets[i].price}) `
      }
      this.description += this.blurb;
    }
  
    // Part 2.7 - search for tickets within a lower and upper bound
    searchTickets(lower, upper) {
      let count = 0; // counts matching tickets
      this.blurb = `<br><strong> - Eligible Tickets: </strong>` ; // default
      for (let i = 0; i < this.availableTickets.length; i++) { // iterates through availableTickets
        if (this.availableTickets[i].price >= lower && this.availableTickets[i].price <= upper) { // if within range
          count++;
          this.blurb += `<li>${count}. ${this.availableTickets[i].name} ($${this.availableTickets[i].price}) `;
        } 
        else if (count === 0 && i === (this.availableTickets.length-1)) { // if no match found && at the end of array
          this.blurb = " - No tickets available." // set blurb to no tickets available
        }
      }
      this.description += this.blurb;
    }
  }
  
  // Part 2.2 - ticketType constructor
  class TicketType {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }
  }
  
  // Part 1.4 & 1.5 - creates new events with names and descriptions
  const eventObj1 = new Event('KLOS Golden Gala', 'An evening with hollywood vampires');
  const eventObj2 = new Event('Skillet & Sevendust', 'Victorious war tour');
  const eventObj3 = new Event('Jenny Lewis', 'On the line your 2019');
  
  // Part 2.4 - adding ticket types and prices
  eventObj1.addAvailableTickets("human", 299);
  eventObj1.addAvailableTickets("vampire", 99);
  eventObj2.addAvailableTickets("General Admission", 25)
  eventObj2.addAvailableTickets("Floor Seating", 80)
  eventObj3.addAvailableTickets("Orchestra", 300)
  eventObj3.addAvailableTickets("Mezzanine", 200)
  eventObj3.addAvailableTickets("Balcony", 100)
  
  
  // Part 1.6 - creates new array of events
  const eventArray = new Array();
  
  // Part 1.7 - pushes all newly created events into the event array
  eventArray.push(eventObj1, eventObj2, eventObj3);
  
  // Part 1.8 - console log event
  console.log(eventArray);
  
  eventObj1.allTickets();
  eventObj2.allTickets();
  eventObj3.allTickets();
  // Part 2.8 - display tickets with price between 0 and 100 for each event
  eventObj1.searchTickets(0, 100);
  eventObj2.searchTickets(0, 100);
  eventObj3.searchTickets(0, 100);
  eventObj1.searchTickets(0, 100);
  eventObj2.searchTickets(60, 100);
  eventObj3.searchTickets(0, 5);
  
  // Part 1.9 - load items && Part 2.1 - all items loaded
  document.addEventListener('DOMContentLoaded', () => {
    // when the page fully loads
    let html = ''; // stores each name and description
    eventArray.forEach((item) => {
      html += `<li><strong>${item.name}</strong> - ${item.description}`; // list of events
    });
    document.querySelector('#event').innerHTML = html; // adds list to event ul
  });