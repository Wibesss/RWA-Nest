import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { RegistrationService } from 'src/app/Services/registration.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  form!: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private storage: AngularFireStorage,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      photoURL: new FormControl('', Validators.required),
    });
  }

  register(): void {
    const filePath = `profile_images/${this.selectedFile!.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(async (url) => {
            this.imageUrl = url;

            const formData = {
              ...this.form.getRawValue(),
              photoURL: this.imageUrl,
            };

            const checkRegistration: boolean =
              await this.registrationService.registerUser(formData);

            if (checkRegistration) {
              this.router.navigate(['/login']);
            } else {
              alert('Registration error');
            }
          });
        })
      )
      .subscribe();
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
