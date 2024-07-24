import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { JobAdsFilterComponent } from './job-ads-filter.component';

describe('JobAdsFilterComponent', () => {
  let component: JobAdsFilterComponent;
  let fixture: ComponentFixture<JobAdsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        JobAdsFilterComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobAdsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.filterForm.value).toEqual({
      search: '',
      status: '',
    });
  });

  it('should emit filter changes when search input changes', fakeAsync(() => {
    spyOn(component.filterChanged, 'emit');

    component.ngOnInit();

    const searchInput = fixture.debugElement.query(
      By.css('input[formControlName="search"]')
    ).nativeElement;

    searchInput.value = 'test search';
    searchInput.dispatchEvent(new Event('input'));
    tick(500); // Wait for debounce time

    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      search: 'test search',
      status: '',
    });
  }));

  it('should emit filter changes when status select changes', fakeAsync(() => {
    spyOn(component.filterChanged, 'emit');

    component.ngOnInit();

    component.filterForm.patchValue({ status: 'published' });

    tick(600);

    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      search: '',
      status: 'published',
    });
  }));

  it('should not emit filter changes if values are the same', fakeAsync(() => {
    spyOn(component.filterChanged, 'emit');

    component.ngOnInit();

    component.filterForm.patchValue({ search: '', status: '' });
    tick(500);
    component.filterForm.patchValue({ search: '', status: '' });
    tick(500)

    expect(component.filterChanged.emit).toHaveBeenCalledTimes(1)
  }));

  it('should have correct number of status options', () => {
    expect(component.statuses.length).toBe(4);
    expect(component.statuses[0]).toEqual({ value: '', viewValue: 'All' });
    expect(component.statuses[1]).toEqual({
      value: 'draft',
      viewValue: 'Draft',
    });
    expect(component.statuses[2]).toEqual({
      value: 'published',
      viewValue: 'Published',
    });
    expect(component.statuses[3]).toEqual({
      value: 'archived',
      viewValue: 'Archived',
    });
  });

  it('should debounce search input', fakeAsync(() => {
    spyOn(component.filterChanged, 'emit');

    component.ngOnInit();

    const searchInput = fixture.debugElement.query(
      By.css('input[formControlName="search"]')
    ).nativeElement;

    searchInput.value = 'test';
    searchInput.dispatchEvent(new Event('input'));
    tick(400); // Less than debounce time

    expect(component.filterChanged.emit).not.toHaveBeenCalled();

    tick(100); // Complete debounce time

    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      search: 'test',
      status: '',
    });
  }));
});
