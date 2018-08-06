import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAQRoutingModule } from './faq-routing.module';
import { FAQComponent } from './faq.component';

@NgModule({
  imports: [
    CommonModule,
    FAQRoutingModule
  ],
  declarations: [FAQComponent]
})
export class FAQModule { }
