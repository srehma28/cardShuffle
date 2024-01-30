import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cardShuffle';
  hands: any[] = []; // Define hands property as an empty array
  @ViewChild('numPlayersInput') numPlayersInput!: ElementRef;
  @ViewChild('cardsPerPlayerInput') cardsPerPlayerInput!: ElementRef;

  // Define card elements
  suits = ["Spades", "Diamonds", "Club", "Heart"];
  values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

  // Function to create a deck of cards
  createDeck() {
    return this.suits.flatMap(suit => this.values.map(value => ({ Value: value, Suit: suit })));
  }

  // Function to shuffle the deck
  shuffleDeck(deck: any[]) {
    return deck.sort(() => Math.random() - 0.5);
  }

  // Function to deal cards to players
  dealCards(deck: any[], players: number, cardsPerPlayer: number) {
    const hands = [];
    for (let i = 0; i < players; i++) {
      hands.push(deck.splice(0, cardsPerPlayer));
    }
    return hands;
  }

// Function to display hands
displayHands(hands: any[]) {
  this.hands = hands;
}

getPlayerNumber(index: number): number {
  return index + 1;
}

  // Event listener for shuffling cards
  shuffleCards() {
    console.log("Shuffle button clicked"); // Add console log statement
    const numPlayers = parseInt(this.numPlayersInput.nativeElement.value);
    const cardsPerPlayer = parseInt(this.cardsPerPlayerInput.nativeElement.value);
    if (isNaN(numPlayers) || isNaN(cardsPerPlayer) || numPlayers < 1 || cardsPerPlayer < 1) {
      alert("Please enter valid numbers.");
      return;
    }
    const deck = this.createDeck();
    const shuffledDeck = this.shuffleDeck([...deck]);
    const hands = this.dealCards(shuffledDeck, numPlayers, cardsPerPlayer);
    this.displayHands(hands);
  }
  
}
