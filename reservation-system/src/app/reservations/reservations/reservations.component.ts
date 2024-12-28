import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReservationsService } from '../../services/reservations.service';


@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [ReservationsService],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
}) 
export class ReservationsComponent implements OnInit { 
  reservationForm: FormGroup;
  reservations: any[] = [];
  isEditing = false;
  selectedReservationId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private reservationsService: ReservationsService
  ) {
    this.reservationForm = this.fb.group({
      spaceId: ['', Validators.required],
      userId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationsService.getReservations().subscribe(
      (data) => {
        this.reservations = data;
      },
      (error) => {
        console.error('Error al cargar las reservas:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isEditing && this.selectedReservationId !== null) {
      this.updateReservation(this.selectedReservationId, this.reservationForm.value);
    } else {
      this.createReservation(this.reservationForm.value);
    }
  }

  createReservation(reservation: any): void {
    this.reservationsService.createReservation(reservation).subscribe(
      (response) => {
        console.log('Reserva creada exitosamente:', response);
        this.loadReservations(); 
        this.reservationForm.reset(); 
      },
      (error) => {
        console.error('Error al crear la reserva:', error);
      }
    );
  }
  

  updateReservation(id: number, reservation: any): void {
    console.log('Actualizar reserva (función no implementada):', id, reservation);
    this.isEditing = false;
    this.reservationForm.reset(); 
  }

  editReservation(reservation: any): void {
    this.isEditing = true;
    this.selectedReservationId = reservation.reservationId;
    this.reservationForm.patchValue(reservation);
  }

  deleteReservation(id: number): void {
    console.log('Eliminar reserva (función no implementada):', id);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.reservationForm.reset();
  }
}
