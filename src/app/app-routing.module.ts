import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { PeopleComponent } from './pages/people/people.component';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';
import { AnonComponent } from './pages/anon/anon.component';
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  },
  {
    path: 'people',
    component: PeopleComponent
  },
  {
    path: 'feed',
    component: FeedPageComponent
  },
  {
    path: 'blog',
    component: BlogsPageComponent
  },
  {
    path: 'anonymous',
    component: AnonComponent
  },
  {
    path: '**',
    redirectTo: 'profile'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
