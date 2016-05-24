import { Component, OnInit  } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Hero } from './hero';
import { HeroService } from './hero.service';
  
@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  
  constructor(
    private _heroService: HeroService,
    private _routeParams: RouteParams) {
  }
  
//  ngOnInit() {
//    let id = +this.routeParams.get('id');
//    this.heroService.getHero(id)
//      .then(hero => this.hero = hero);
//  }
  
  // si id, on appel le héro dans le web-service//Si pas id, on en créé un vide
  ngOnInit() {
    if (this._routeParams.get('id') !== null) {
      let id = +this._routeParams.get('id');
      this.navigated = true;
      this._heroService.getHero(id)
          .then(hero => this.hero = hero);
    } else {
      this.navigated = false;
      this.hero = new Hero();
    }
  }
  
  //Methode de sauvegarde du hero
  save() {
    this._heroService
        .save(this.hero)
        .then(hero => {
          this.hero = hero; // saved hero, w/ id if new
          this.goBack(hero);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  
  
  
  goBack() {
    window.history.back();
  }
  
}
