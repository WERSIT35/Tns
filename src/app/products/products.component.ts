import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Home, Item } from '../home/home';
import { Popular } from '../popular';
import { HomeService } from '../home.service';
import { TranslateService } from '../translate.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  @Input() categories!: Home;
  @Input() popular!:Popular;

  selectedCategoryIndex = 0;
  selectedSubCategoryIndex = 0;

  categoriesList: Home[] = [];

  popularList:Popular[]=[];

  selectedItems: Item[] = [];

  constructor(
    private homeService: HomeService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadCategories(); 
  }

  loadCategories(): void {
    this.popularList=this.homeService.getAllPopularList();
    this.categoriesList = this.homeService.getAllCategoryList();
    if (
      this.categoriesList.length > 0 &&
      this.categoriesList[0].categorys.length > 0
    ) {
      this.categoryChange(0);
    }
  }

  categoryChange(index: number): void {
    this.selectedCategoryIndex = index;
    this.selectedItems = this.homeService.getItemsForCategory(index);
  }

  onLanguageChanged(newLang: string): void {
    this.homeService
      .updateCategoryList(newLang)
      .subscribe((updatedCategories) => {
        this.categoriesList = updatedCategories;
        if (this.categoriesList.length > 0) {
          this.categoryChange(0);
        }
      });
  }
}
