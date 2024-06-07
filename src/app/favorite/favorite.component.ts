import { Component, inject } from '@angular/core';
import { HomeService } from '../home.service';
import { Popular } from '../popular';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {
  route:ActivatedRoute=inject(ActivatedRoute);
  homeservice=inject(HomeService)
  popular:Popular | undefined;

  constructor(){
    const popularID=Number(this.route.snapshot.params['id']);
    this.popular=this.homeservice.getAllPopularId(popularID);
  }
}
