import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule,HttpClientTestingModule],
    providers: [PostService]
  });
  service = TestBed.get(PostService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should use AuthService', () => {
  //   expect(service.getValue()).toBe('real value');
  // });

});
