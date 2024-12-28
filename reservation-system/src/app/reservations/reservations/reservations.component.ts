import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule], 
  providers: [ReservationsService],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})

export class ReservationsComponent implements OnInit {
  reservationForm: FormGroup;
  reservations: any[] = [];
  filteredReservations: any[] = [];
  isEditing = false;
  selectedReservationId: number | null = null;

  filters = {
    reservationId: '',
    spaceName: '',
    userName: '',
    startDate: '',
    endDate: '',
  };

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
        this.filteredReservations = data;
      },
      (error) => {
        console.error('Error al cargar las reservas:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredReservations = this.reservations.filter((reservation) => {
      return (
        (!this.filters.reservationId ||
          reservation.reservationId
            .toString()
            .includes(this.filters.reservationId)) &&
        (!this.filters.spaceName ||
          reservation.spaceName
            .toLowerCase()
            .includes(this.filters.spaceName.toLowerCase())) &&
        (!this.filters.userName ||
          reservation.userName
            .toLowerCase()
            .includes(this.filters.userName.toLowerCase())) &&
        (!this.filters.startDate ||
          new Date(reservation.startDate).toDateString() ===
            new Date(this.filters.startDate).toDateString()) &&
        (!this.filters.endDate ||
          new Date(reservation.endDate).toDateString() ===
            new Date(this.filters.endDate).toDateString())
      );
    });
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

  deleteReservation(id: number): void {
    if (confirm('¿Está seguro de que desea cancelar esta reserva?')) {
      this.reservationsService.deleteReservation(id).subscribe(
        () => {
          console.log(`Reserva con ID ${id} cancelada exitosamente`);
          this.loadReservations();
        },
        (error) => {
          console.error('Error al cancelar la reserva:', error);
        }
      );
    }
  }
}

