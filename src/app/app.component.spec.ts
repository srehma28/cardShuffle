import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();  // Check if component exists
  });


  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.input-container')).toBeTruthy(); // Check if input container is rendered
    expect(compiled.querySelector('.dealt-cards-container')).toBeTruthy(); // Check if dealt cards container is rendered
  });

  it('should display number of players input', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#numPlayers')).toBeTruthy(); // Check if number of players input is rendered
  });

  it('should display cards per player input', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#cardsPerPlayer')).toBeTruthy(); // Check if cards per player input is rendered
  });

  it('should display shuffle button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#shuffleButton')).toBeTruthy(); // Check if shuffle button is rendered
  });

  it('should display correct number of players', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.hands = [
      [{ value: '2', suit: 'hearts', imagePath: 'path_to_image' }], // Mock hands data
      [{ value: '3', suit: 'diamonds', imagePath: 'path_to_image' }, { value: '4', suit: 'spades', imagePath: 'path_to_image' }] // Mock hands data
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const playerInfoElements = compiled.querySelectorAll('.player-info');
    expect(playerInfoElements.length).toBe(app.hands.length); // Check if number of player info elements matches the number of hands
    expect(app.hands.length).toBe(2)
  });

  it('should display correct cards per player', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.hands = [
      [{ value: '2', suit: 'hearts', imagePath: 'path_to_image' }, { value: '3', suit: 'diamonds', imagePath: 'path_to_image' }], // Mock hands data
      [{ value: '4', suit: 'spades', imagePath: 'path_to_image' }],
      [{ value: '5', suit: 'spades', imagePath: 'path_to_image' }],
      [{ value: '6', suit: 'spades', imagePath: 'path_to_image' }],
      [{ value: '7', suit: 'spades', imagePath: 'path_to_image' }] // Mock hands data
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const dealtCardElements = compiled.querySelectorAll('.dealt-card');
    const totalCards = app.hands.reduce((acc, hand) => acc + hand.length, 0); // Calculate total number of cards across all hands
    expect(dealtCardElements.length).toBe(totalCards); // Check if number of dealt card elements matches the total number of cards
    expect(app.hands.length).toBe(5);
  });

  it('should display error message for invalid input', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const errorMessage = 'Please enter valid numbers and ensure the total number of cards does not exceed 52.';
    app.errorMessage = errorMessage;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-message')).toBeTruthy(); // Check if error message is displayed
    expect(compiled.querySelector('.error-message')?.textContent).toContain(errorMessage); // Check if error message text is correct
  });

  it('should not display dealt cards initially', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.dealt-card').length).toBe(0); // Check if no dealt cards are initially displayed
  });

  it('should clear error message after valid input is provided', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.errorMessage = 'Some error message';
    fixture.detectChanges();
    app.numPlayersInput.nativeElement.value = '2'; // Provide valid input
    app.cardsPerPlayerInput.nativeElement.value = '5'; // Provide valid input
    app.shuffleCards(); // Trigger shuffleCards method
    fixture.detectChanges();
    expect(app.errorMessage).toBe(''); // Check if error message is cleared after valid input is provided
  });

});
