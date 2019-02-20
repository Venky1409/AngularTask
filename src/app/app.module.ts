import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ExampleComponent } from './example/ex.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { AppService } from './app.service';
import { PdfService } from './pdf.service';
import { SafePipe } from './pipe';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'example', component: ExampleComponent },
  { path: 'order', component: OrderComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    HeaderComponent,
    SearchComponent,
    OrderComponent,
    LoginComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppService, PdfService],
  bootstrap: [AppComponent]
})
export class AppModule { }
