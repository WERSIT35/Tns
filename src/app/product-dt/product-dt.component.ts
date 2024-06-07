import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';
import { Item } from '../home/home';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-dt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-dt.component.html',
  styleUrl: './product-dt.component.scss'
})
export class ProductDtComponent {
  route:ActivatedRoute =inject(ActivatedRoute);
  teniID=0;

  homeService=inject(HomeService);
  teni:Item |undefined;

  constructor(){
    const teniID = Number(this.route.snapshot.params['id']);
    this.teni=this.homeService.getAllCategoryId(teniID);
  }
}
