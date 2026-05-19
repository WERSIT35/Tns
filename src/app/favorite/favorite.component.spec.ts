import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { FavoriteComponent } from './favorite.component';

describe('FavoriteComponent', () => {
  let fixture: ComponentFixture<FavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: '301' }) },
            paramMap: of(convertToParamMap({ id: '301' })),
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(FavoriteComponent);
    fixture.detectChanges();
  });

  it('creates and resolves the requested featured item', () => {
    const cmp = fixture.componentInstance;
    expect(cmp).toBeTruthy();
    expect(cmp.product()?.id).toBe(301);
  });
});
