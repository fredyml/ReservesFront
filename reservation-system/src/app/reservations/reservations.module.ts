import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations/reservations.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReservationsRoutingModule,
    ReservationsComponent 
  ],
  exports: [ReservationsComponent],
})
export class ReservationsModule {} 
