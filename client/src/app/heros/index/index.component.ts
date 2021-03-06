import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { State, getHeros } from "../../app.reducers";
import { Hero } from "../../models/hero";
import { LoadHerosAction, RemoveHeroAction, RemoveHeroConfirmDialogOpen } from "../heros.actions";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public heros: Observable<Array<Hero>>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.heros = this.store.select(getHeros);
    this.store.dispatch(new LoadHerosAction());
  }

  public remove(hero: Hero) {
    this.store.dispatch(new RemoveHeroConfirmDialogOpen({
      delete: new RemoveHeroAction({ hero: hero }),
      text: `Are you sure you want to remove the hero <em>${hero.name}</em> from the tour of heros?`,
      title: "Remove Hero"
    }));
  }

}
