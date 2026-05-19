import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';
import { Item } from '../home/home';


@Component({
    selector: 'app-product-dt',
    imports: [],
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
  protected formatDescription(description: string, item: Item): string {
    return description
      .replace(/{{volt}}/g, item.volt.toString())
      .replace(/{{watt}}/g, item.watt.toString());
  }
}
