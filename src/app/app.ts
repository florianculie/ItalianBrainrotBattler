import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface RoundHistory {
  round: number;
  player1Number: number;
  player2Number: number;
  winner: 'player1' | 'player2';
  damage: number;
}

interface FloatingDamage {
  player: 'player1' | 'player2';
  amount: number;
  id: number;
}

interface Character {
  name: string;
  image: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'ItalianBrainrotBattler';

  possibleHpValues = [100_000, 1_000_000, 5_000_000, 10_000_000, 50_000_000];
  selectedHp = 1_000_000;

  characters: Character[] = [
    { name: "Ballerina Cappuccina", image: "assets/Ballerina_Cappuccina.png" },
    { name: "Cappucino assasino", image: "assets/Cappucino_assasino.png" },
    { name: "Tralalero Tralala", image: "assets/Tralalero_Tralala.png" },
    { name: "Bombardiro Crocodillo", image: "assets/Bombardiro_Crocodillo.jpg" },
    { name: "Tung tung tung sahur", image: "assets/Tung_tung_tung_sahur.png" },
    { name: "ChimpanziniBananini", image: "assets/ChimpanziniBananini.png" }
  ];

  selectedPlayer1: Character;
  selectedPlayer2: Character;

  player1Hp = this.selectedHp;
  player2Hp = this.selectedHp;

  player1Number: number | null = null;
  player2Number: number | null = null;

  roundWinner: 'player1' | 'player2' | null = null;

  roundResultMessage = '';
  roundNumber = 1;

  gameStarted = false;

  rounds: RoundHistory[] = [];
  damageEffectPlayer1 = false;
  damageEffectPlayer2 = false;

  floatingDamages: FloatingDamage[] = [];
  floatingId = 0;

  constructor() {
    // Choisir deux personnages aléatoires différents
    const indices = this.getTwoRandomIndices(this.characters.length);
    this.selectedPlayer1 = this.characters[indices[0]];
    this.selectedPlayer2 = this.characters[indices[1]];
  }

  getTwoRandomIndices(max: number): [number, number] {
    const first = Math.floor(Math.random() * max);
    let second;
    do {
      second = Math.floor(Math.random() * max);
    } while (second === first);
    return [first, second];
  }

  startGame(): void {
    this.player1Hp = this.selectedHp;
    this.player2Hp = this.selectedHp;
    this.roundNumber = 1;
    this.roundResultMessage = '';
    this.player1Number = null;
    this.player2Number = null;
    this.roundWinner = null;
    this.rounds = [];
    this.damageEffectPlayer1 = false;
    this.damageEffectPlayer2 = false;
    this.floatingDamages = [];
    this.floatingId = 0;
    this.gameStarted = true;
  }

  playRound(): void {
  if (
    this.player1Number === null ||
    this.player2Number === null ||
    this.roundWinner === null
  ) {
    this.roundResultMessage = 'Please enter both numbers and select the winner.';
    return;
  }

  let damage = 0;

  if (this.roundWinner === 'player1') {
    // Joueur 1 gagne
    if (this.player2Number! > this.player1Number!) {
      // Le perdant a un nombre supérieur → aucun dégât
      damage = 0;
    } else {
      // Sinon, le perdant subit la différence
      damage = this.player1Number! - this.player2Number!;
      this.player2Hp -= damage;
      this.player2Hp = Math.max(this.player2Hp, 0);
      this.damageEffectPlayer2 = true;
      this.showFloatingDamage('player2', damage);
      setTimeout(() => (this.damageEffectPlayer2 = false), 500);
    }
  } else {
    // Joueur 2 gagne
    if (this.player1Number! > this.player2Number!) {
      damage = 0;
    } else {
      damage = this.player2Number! - this.player1Number!;
      this.player1Hp -= damage;
      this.player1Hp = Math.max(this.player1Hp, 0);
      this.damageEffectPlayer1 = true;
      this.showFloatingDamage('player1', damage);
      setTimeout(() => (this.damageEffectPlayer1 = false), 500);
    }
  }

  this.roundResultMessage = damage > 0
    ? `Round ${this.roundNumber}: ${this.roundWinner === 'player1' ? this.selectedPlayer2.name : this.selectedPlayer1.name} loses ${damage} HP.`
    : `Round ${this.roundNumber}: ${this.roundWinner === 'player1' ? this.selectedPlayer2.name : this.selectedPlayer1.name} defends and loses no HP.`;

  this.rounds.unshift({
    round: this.roundNumber,
    player1Number: this.player1Number!,
    player2Number: this.player2Number!,
    winner: this.roundWinner,
    damage: damage
  });

  this.resetRound();
}


  resetRound(): void {
    this.player1Number = null;
    this.player2Number = null;
    this.roundWinner = null;
    this.roundNumber++;
  }

  isGameOver(): boolean {
    return this.player1Hp === 0 || this.player2Hp === 0;
  }

  getWinner(): string {
    if (this.player1Hp === 0) return `${this.selectedPlayer2.name} wins the game.`;
    if (this.player2Hp === 0) return `${this.selectedPlayer1.name} wins the game.`;
    return '';
  }

  getHpPercentage(player: 'player1' | 'player2'): number {
    return player === 'player1'
      ? (this.player1Hp / this.selectedHp) * 100
      : (this.player2Hp / this.selectedHp) * 100;
  }

  getHpColor(player: 'player1' | 'player2'): string {
    const percent = this.getHpPercentage(player);
    const green = Math.floor((percent / 100) * 255);
    const red = 255 - green;
    return `rgb(${red}, ${green}, 0)`;
  }

  showFloatingDamage(player: 'player1' | 'player2', amount: number): void {
    const id = this.floatingId++;
    this.floatingDamages.push({ player, amount, id });
    setTimeout(() => {
      this.floatingDamages = this.floatingDamages.filter(f => f.id !== id);
    }, 1000);
  }
}
