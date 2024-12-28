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
  filteredReservations: any[] = []; // Lista para manejar datos filtrados
  filters: any = {
    reservationId: '',
    spaceName: '',
    userName: '',
    startDate: '',
    endDate: '',
  };
  isEditing = false;
  selectedReservationId: number | null = null;
  showModal = false;
  errorMessages: string[] = [];

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
        this.applyFilters(); // Aplicar filtros automáticamente después de cargar
      },
      (error) => {
        console.error('Error al cargar las reservas:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredReservations = this.reservations.filter((reservation) => {
      const matchesReservationId = reservation.reservationId
        .toString()
        .includes(this.filters.reservationId);
      const matchesSpaceName = reservation.spaceName
        .toLowerCase()
        .includes(this.filters.spaceName.toLowerCase());
      const matchesUserName = reservation.userName
        .toLowerCase()
        .includes(this.filters.userName.toLowerCase());
      const matchesStartDate =
        !this.filters.startDate ||
        reservation.startDate.startsWith(this.filters.startDate);
      const matchesEndDate =
        !this.filters.endDate ||
        reservation.endDate.startsWith(this.filters.endDate);

      return (
        matchesReservationId &&
        matchesSpaceName &&
        matchesUserName &&
        matchesStartDate &&
        matchesEndDate
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
    this.errorMessages = [];
    this.reservationsService.createReservation(reservation).subscribe(
      () => {
        console.log('Reserva creada exitosamente');
        this.loadReservations();
        this.closeModal();
      },
      (error) => {
        console.error('Error al crear la reserva:', error);
        const details = error?.error?.details || 'Error inesperado.';
        this.errorMessages = details.split(',').map((msg: string) => msg.trim());
      }
    );
  }

  updateReservation(id: number, reservation: any): void {
    console.log('Actualizar reserva (función no implementada):', id, reservation);
    this.isEditing = false;
    this.closeModal();
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

  openModal(): void {
    this.showModal = true;
    this.isEditing = false;
    this.errorMessages = [];
    this.reservationForm.reset();
  }

  closeModal(): void {
    this.showModal = false;
    this.isEditing = false;
    this.errorMessages = [];
    this.reservationForm.reset();
  }
}
