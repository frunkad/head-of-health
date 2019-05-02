import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FeedPageComponent } from './feed-page/feed-page.component';
import { BlogsPageComponent } from './blogs-page/blogs-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProfilePageComponent, FeedPageComponent, BlogsPageComponent, LoginPageComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PagesModule { }
