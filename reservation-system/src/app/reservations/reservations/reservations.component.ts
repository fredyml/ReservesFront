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
  errorMessages: string[] = []; // Para almacenar mensajes de error
  showModal: boolean = false; // Controla la visibilidad del modal

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
    this.clearErrors();
    this.reservationsService.getReservations().subscribe(
      (data) => {
        this.reservations = data;
      },
      (error) => {
        this.handleErrors(['Error al cargar las reservas.']);
      }
    );
  }

  onSubmit(): void {
    this.clearErrors();
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
        const messages = (error.error?.details || '').split(','); // Dividir mensajes por comas
        this.handleErrors(messages);
      }
    );
  }

  updateReservation(id: number, reservation: any): void {
    console.log('Actualizar reserva (función no implementada):', id, reservation);
    this.isEditing = false;
    this.reservationForm.reset();
  }

  deleteReservation(id: number): void {
    this.clearErrors();
    if (confirm('¿Está seguro de que desea cancelar esta reserva?')) {
      this.reservationsService.deleteReservation(id).subscribe(
        () => {
          console.log(`Reserva con ID ${id} cancelada exitosamente`);
          this.loadReservations();
        },
        (error) => {
          const messages = (error.error?.details || '').split(','); 
          this.handleErrors(messages);
        }
      );
    }
  }

  handleErrors(messages: string[]): void {
    this.errorMessages = messages.map((msg) => msg.trim()); // Limpiar espacios
    this.showModal = true; // Mostrar el modal
  }

  clearErrors(): void {
    this.errorMessages = [];
    this.showModal = false;
  }
}
