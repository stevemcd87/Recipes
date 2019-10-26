import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { PostFormService } from './post-form.service';

describe('PostFormService', () => {
  let service: PostFormService;
  beforeEach(() => {
    TestBed.configureTestingModule({
    // imports: [RouterTestingModule],
    providers: [PostFormService]
  });
  service = TestBed.get(PostFormService);
});

  it('should be created', () => {
    console.log(service)
    expect(service).toBeTruthy();
  });

  // it('should use AuthService', () => {
  //   expect(service.getValue()).toBe('real value');
  // });

});
