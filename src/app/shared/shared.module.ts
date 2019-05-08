import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AuthService } from './services/auth.service';
import { DatabaseService } from './services/database.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './components/post/post.component';

@NgModule({
  declarations: [HeaderComponent, PostComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule
  ],
  providers: [
    DatabaseService,
    AuthService,
    AngularFireAuth,
    AngularFireDatabase,
    { provide: FunctionsRegionToken, useValue: 'us-central1' }],
  exports: [
    HeaderComponent,
    PostComponent
  ]
})
export class SharedModule { }
