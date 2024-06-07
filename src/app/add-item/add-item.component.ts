import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Item } from '../home/home';
import { HomeService } from '../home.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemFilterPipe } from "../item-filter.pipe";
import { TranslateService } from '../translate.service';
import { CommonEngine } from '@angular/ssr';

@Component({
    selector: 'app-add-item',
    standalone: true,
    templateUrl: './add-item.component.html',
    styleUrl: './add-item.component.scss',
    imports: [FormsModule, CommonModule, ItemFilterPipe]
})
export class AddItemComponent implements OnInit{
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  categoriesList = this.homeService.getAllCategoryList();
  existingItems: Item[] = [];
  newItem: Item = {
    category: '',
    name: '',
    price: 0,
    description: '',
    image: '',
    id: 0,
    code: ''
  };

  items: Item[] = [];
  filteredItems: Item[] = [];
  categoryFilter: string = '';
  nameFilter: string = '';
  codeFilter: string = '';
  priceFilter: number | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  onSubmit(): void {
    const selectedCategoryIndex = Number(this.newItem.category);
    const selectedCategory = this.categoriesList[0]?.categorys[selectedCategoryIndex];
    this.newItem.category = selectedCategory;

    this.homeService.addItem(this.newItem);
    this.sortItemsById();

    this.resetForm();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.newItem.image = reader.result as string;  // Save the base64 image string
      };
      reader.readAsDataURL(file);
    }
  }

  resetForm(): void {
    this.newItem = {
      category: '',
      name: '',
      price: 0,
      description: '',
      image: '',
      id: 0,
      code: ''
    };
    this.imagePreview = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  private sortItemsById(): void {
    this.existingItems.sort((a, b) => a.id - b.id);
  }
  //translate functionality
  isGeorgian: boolean;

  constructor(private homeService: HomeService,private translateService: TranslateService) {
    this.isGeorgian = false; // Default value
  }

  ngOnInit(): void {
    this.translateService.currentLanguage$.subscribe(language => {
      this.isGeorgian = language === 'ka';
      console.log(`Current language is ${language}, isGeorgian: ${this.isGeorgian}`);
    });
    this.existingItems = this.homeService.getAllCategoryList()[0].items;
    this.sortItemsById();
  }
}
