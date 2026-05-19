import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Home, Item } from './home';
import { HomeService } from '../home.service';

import { RouterModule } from '@angular/router';
import { TranslateService } from '../translate.service';
import { Popular } from '../popular';
import { ProductsComponent } from "../products/products.component";
import { PopSliderComponent } from "../pop-slider/pop-slider.component";
import { BannerComponent } from "../banner/banner.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [RouterModule, ProductsComponent, PopSliderComponent, BannerComponent]
})
export class HomeComponent{}
