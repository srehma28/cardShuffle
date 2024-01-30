import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Card {
  value: string;
  suit: string;
  imagePath: string; // Path to the card image
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('numPlayersInput') numPlayersInput!: ElementRef;
  @ViewChild('cardsPerPlayerInput') cardsPerPlayerInput!: ElementRef;

  errorMessage: string = ""; // Initialize error message
  hands: Card[][] = [];
  suits = ['clubs', 'diamonds', 'hearts', 'spades'];
  values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

  shuffleDeck(deck: any[]) {
    return deck.sort(() => Math.random() - 0.5);
  }

  // Function to deal cards to players without duplicates
  dealCards(deck: any[], players: number, cardsPerPlayer: number) {
    const hands = [];
    const dealtCards = new Set(); // Keep track of dealt cards

    for (let i = 0; i < players; i++) {
      const hand = [];
      for (let j = 0; j < cardsPerPlayer; j++) {
        let randomCard;
        do {
          randomCard = deck[Math.floor(Math.random() * deck.length)];
        } while (dealtCards.has(randomCard)); // Ensure card is not already dealt
        hand.push(randomCard);
        dealtCards.add(randomCard);
      }
      hands.push(hand);
    }

    return hands;
  }

  shuffleCards() {
    const numPlayers = parseInt(this.numPlayersInput.nativeElement.value);
    const cardsPerPlayer = parseInt(this.cardsPerPlayerInput.nativeElement.value);

    // Check if the total number of cards exceeds 52
    const totalCards = numPlayers * cardsPerPlayer;
    if (isNaN(numPlayers) || isNaN(cardsPerPlayer) || totalCards > 52 || numPlayers < 1 || cardsPerPlayer < 1) {
      this.errorMessage = "Please enter valid numbers and ensure the total number of cards does not exceed 52.";
      return;
    }

    // Clear previous error message if any
    this.errorMessage = '';

    const deck = this.createDeck();
    const shuffledDeck = this.shuffleDeck([...deck]);
    const hands = this.dealCards(shuffledDeck, numPlayers, cardsPerPlayer);
    this.displayHands(hands);
  }

  createDeck() {
    const deck = [];
    for (let suit of this.suits) {
      for (let value of this.values) {
        const imagePath = `./assets/DeckOfCards/${value}_of_${suit}.png`;
        deck.push({ value, suit, imagePath });
      }
    }
    return deck;
  }

  displayHands(hands: any[]) {
    this.hands = hands;
  }
}
