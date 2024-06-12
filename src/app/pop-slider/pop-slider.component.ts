import { AfterViewInit, Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Popular } from '../popular';
import { HomeService } from '../home.service';
import Splide from '@splidejs/splide';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import '@splidejs/splide/css';

@Component({
  selector: 'app-pop-slider',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './pop-slider.component.html',
  styleUrl: './pop-slider.component.scss'
})
export class PopSliderComponent{
  @Input() popular!: Popular;
  popularList: Popular[] = [];

  constructor(
    private homeService: HomeService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.popularList = this.homeService.getAllPopularList();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const splide = new Splide('.splide', {
        type: 'loop',
        perPage: 3,
        focus: 'center',
        pauseOnHover: false,
        pagination: false,
        autoplay:true
      });

      splide.mount();
    }
  }
}
