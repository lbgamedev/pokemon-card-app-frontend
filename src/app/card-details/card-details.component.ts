import { Component, Input, OnInit, resolveForwardRef } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  @Input() card: any;
  userId = 1; // Simulate logged-in user
  ownership: any = { owns: false, copies: 0 };

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    const cardId = this.route.snapshot.paramMap.get('id');
    this.pokemonService.getCardOwnership(cardId!, this.userId).subscribe(data => {
      this.ownership = data;
    });
    this.pokemonService.getCardDetail(cardId!).subscribe(data => {
      this.card = data.data
    })
  }

  // Update ownership of the card
  updateOwnership(): void {
    console.log('update')
    console.log(this.card)
    this.pokemonService.updateCardOwnership(this.card.id, this.userId, this.ownership.owns, this.ownership.copies)
      .subscribe(response => {
        console.log(response)
        this.snackBar.open(response.message, 'Schliessen', {
          duration: 3000,  // duration in milliseconds
          horizontalPosition: 'right',  // options: 'start' | 'center' | 'end' | 'left' | 'right'
          verticalPosition: 'top'  // options: 'top' | 'bottom'
        });
      });
  }

    // Function to go back to the previous page
    goBack(): void {
      this.location.back();
    }
}
