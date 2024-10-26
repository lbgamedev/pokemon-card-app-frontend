import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  cards: any[] = [];
  searchTerm: string = '';
  filterOwnership: string = 'all';
  userId = 1; // Simulate logged-in user

  constructor(private pokemonService: PokemonService, private router: Router, private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.pokemonService.getCards().subscribe(data => {
      this.cards = data; // Access the 'data' array returned from the API
    });
  }

  openCardDetails(card: any): void {
    this.router.navigate(['/cards', card.id]);
  }

  // Method to filter cards based on search term and ownership
  filteredCards(): any[] {
    return this.cards
      .filter(card => 
        card.name.toLowerCase().includes(this.searchTerm.toLowerCase())  // Filter by search term
      )
      .filter(card => {
        if (this.filterOwnership === 'owned') {
          return card.owns === true;  // Show only owned cards
        } else if (this.filterOwnership === 'not-owned') {
          return card.owns === false;  // Show only not-owned cards
        }
        return true;  // Show all cards if 'all' is selected
      });
  }

  toggleCardOwnership(card: any, owned: boolean){
    let copies = card.copies
    if (owned == true && card.copies == 0) {
      copies = 1
    }
    this.pokemonService.updateCardOwnership(card.id, this.userId, owned, copies)
    .subscribe(response => {
      this.loadCards();
      this.snackBar.open(response.message, 'Schliessen', {
        duration: 3000,  // duration in milliseconds
        horizontalPosition: 'right',  // options: 'start' | 'center' | 'end' | 'left' | 'right'
        verticalPosition: 'top'  // options: 'top' | 'bottom'
      });
    });
  }
}
