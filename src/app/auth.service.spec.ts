import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [AuthService]
  });
  service = TestBed.get(AuthService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should use AuthService', () => {
  //   expect(service.getValue()).toBe('real value');
  // });

});
