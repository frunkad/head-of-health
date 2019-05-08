import { Component, OnInit, Inject, Renderer2, OnDestroy } from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(@Inject(DOCUMENT) private document: Document, private _renderer2: Renderer2) { }

  ngOnInit() {
    this.document.body.className = '';
    const s = this._renderer2.createElement('script');
    s.type = 'application/javascript';
    s.src = 'assets/portfolio.js';
    this._renderer2.appendChild(this.document.body, s);

  }

  ngOnDestroy() {
    this.document.body.className = 'is-flex';
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}
