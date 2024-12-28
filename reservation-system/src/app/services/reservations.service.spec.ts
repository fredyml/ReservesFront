import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReservationsService } from './reservations.service';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationsService],
    });
    service = TestBed.inject(ReservationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch reservations', () => {
    const dummyReservations = [{ reservationId: 1, spaceName: 'Sala A', userName: 'Juan' }];

    service.getReservations().subscribe((reservations) => {
      expect(reservations).toEqual(dummyReservations);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReservations);
  });

  it('should create a reservation', () => {
    const newReservation = { spaceId: 1, userId: 1, startDate: '2023-12-01T10:00', endDate: '2023-12-01T12:00' };

    service.createReservation(newReservation).subscribe((response) => {
      expect(response).toEqual(newReservation);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newReservation);
    req.flush(newReservation);
  });

  it('should delete a reservation', () => {
    const reservationId = 1;

    service.deleteReservation(reservationId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${reservationId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
