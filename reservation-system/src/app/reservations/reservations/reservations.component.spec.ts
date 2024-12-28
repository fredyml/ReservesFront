import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReservationsComponent } from './reservations.component';
import { ReservationsService } from '../../services/reservations.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('ReservationsComponent', () => {
  let component: ReservationsComponent;
  let fixture: ComponentFixture<ReservationsComponent>;
  let reservationsService: jasmine.SpyObj<ReservationsService>;

  beforeEach(async () => {
    const spyReservationsService = jasmine.createSpyObj('ReservationsService', [
      'getReservations',
      'getAvailableSpaces',
      'getAvailableUsers',
      'createReservation',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule, ReservationsComponent],
      providers: [{ provide: ReservationsService, useValue: spyReservationsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationsComponent);
    component = fixture.componentInstance;
    reservationsService = TestBed.inject(ReservationsService) as jasmine.SpyObj<ReservationsService>;

    reservationsService.getReservations.and.returnValue(of([]));
    reservationsService.getAvailableSpaces.and.returnValue(of([]));
    reservationsService.getAvailableUsers.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
 

  it('should open the modal to create a reservation', () => {
    component.openModal();
    expect(component.showModal).toBeTrue();
    expect(component.isEditing).toBeFalse();
  });

  it('should close the modal', () => {
    component.closeModal();
    expect(component.showModal).toBeFalse();
    expect(component.isEditing).toBeFalse();
  });

  it('should apply filters correctly', () => {
    component.reservations = [
      { reservationId: 1, spaceName: 'Sala A', userName: 'Juan', startDate: '2023-12-01', endDate: '2023-12-01' },
      { reservationId: 2, spaceName: 'Sala B', userName: 'Ana', startDate: '2023-12-02', endDate: '2023-12-02' },
    ];
    component.filters.spaceName = 'Sala A';
    component.applyFilters();
    expect(component.filteredReservations).toEqual([
      { reservationId: 1, spaceName: 'Sala A', userName: 'Juan', startDate: '2023-12-01', endDate: '2023-12-01' },
    ]);
  });
});
