import { Component, inject, OnInit } from '@angular/core';
import { PageHeaderService } from '../../services/page-header.service';
import DirectiveCardComponent from '../../components/explanations-card/explanations-card.component';

@Component({
  selector: 'app-formularios-page',
  standalone: true,
  imports: [DirectiveCardComponent],
  templateUrl: './formularios-page.html',
})
export default class FormulariosPageComponent implements OnInit {
  private readonly titleService = inject(PageHeaderService);

  ngOnInit(): void {
    this.titleService.setPageInfo(
      'Formularios en Angular',
      'Explicación de cómo funciona la validación de formularios en Angular.'
    );
  }

  descriptionForms = `Angular 17+ ofrece formularios template-driven (<span class="text-sky-400 font-mono">FormsModule</span>) y reactivos/typed (<span class="text-sky-400 font-mono">ReactiveFormsModule</span>). En Angular 21, los formularios tipados siguen siendo recomendados: construye con <span class="text-sky-400 font-mono">FormBuilder.nonNullable</span> o <span class="text-sky-400 font-mono">new FormControl&lt;T&gt;()</span>, añade validadores síncronos (<span class="font-mono text-sky-400">Validators.required</span>, <span class="font-mono text-sky-400">Validators.email</span>, <span class="font-mono text-sky-400">Validators.minLength</span>) y asíncronos, y controla el ciclo con <span class="font-mono text-sky-400">updateOn: 'blur' | 'submit'</span>. Usa estados <span class="font-mono text-sky-400">invalid/touched/dirty</span> para UX y <span class="font-mono text-sky-400">statusChanges</span> para reactividad.`;

  codeFormsExample = `
// Componente standalone (Angular 17+)
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-demo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
  <form [formGroup]="form" (ngSubmit)="save()" novalidate>
    <label>Correo</label>
    <input type="email" formControlName="email" />
    <small *ngIf="email.invalid && email.touched">Correo inválido</small>

    <label>Contraseña</label>
    <input type="password" formControlName="password" />
    <small *ngIf="password.errors?.['minlength']">Mínimo 8 caracteres</small>

    <button [disabled]="form.invalid">Enviar</button>
  </form>
  \`,
})
export class DemoFormComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: this.fb.control<string>('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }),
    password: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(8)]
    })
  });

  get email() { return this.form.controls.email; }
  get password() { return this.form.controls.password; }

  save() {
    if (this.form.invalid) return;
    console.log(this.form.value); // valores tipados
  }
}

// Validador personalizado (dominio permitido)
const domainValidator = (allowed: string[]) => {
  return (control: FormControl<string>) => {
    const domain = control.value?.split('@')[1];
    return allowed.includes(domain) ? null : { domain: true };
  };
};
`;
}
