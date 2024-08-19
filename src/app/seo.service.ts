import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
        private readonly title:Title,
    private readonly meta:Meta
  ) { }


  initDefaultMetaInformation() {
    this.setTitle('ტენები | Tenebi | HeatFlow');
    this.setMetaTags({
      description: 'უმაღლესი ხარისხის ტენები',
      keywords: 'Tenebi, Teni, ტენი, ტენები, გამაცხელებელი, ტოსტერის გამაცხელებელი, წყლის გამაცხელებელი, გრილის გამაცხელებელი, სარეცხი მანქანის გამაცხელებელი, ვენტილაციის გამაცხელებელი, ღუბელის ტენები, ტოსტერის ტენები, გრილის ტენები, თერმოსტატები, ყავის აპარატის ტენები, სამრეწველო ტენები, სარეცხი მანქანის ტენები, ვენტილაციის ტენები',
      author: 'Tenebi',
      robots: 'index, follow',
      viewport: 'width=device-width, initial-scale=1.0',
      'og:title': 'Tenebi',
      'og:description': 'Tenebi',
      'og:image': 'Tenebi',
      'og:url': 'Tenebi',
      'og:site_name': 'Tenebi',
      'og:type': 'website'
    });
  }

  /**
   * Set the title of the page
   * @param title - The title to set
   */
  setTitle(title: string) {
    this.title.setTitle(title);
  }

  /**
   * Set multiple meta tags
   * @param tags - An object containing key-value pairs of meta tag names and their content
   */
  setMetaTags(tags: { [key: string]: string }) {
    const metaTags = Object.keys(tags).map(name => ({ name, content: tags[name] }));
    this.meta.addTags(metaTags);
  }

  /**
   * Update a specific meta tag
   * @param name - The name of the meta tag to update
   * @param content - The content to set for the meta tag
   */
  updateMetaTag(name: string, content: string) {
    this.meta.updateTag({ name, content });
  }
}
