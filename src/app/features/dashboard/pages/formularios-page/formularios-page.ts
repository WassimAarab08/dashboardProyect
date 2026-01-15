import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { PageHeaderService } from '../../services/page-header.service';
import DirectiveCardComponent from '../../components/explanations-card/explanations-card.component';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad: number;
  rol: string;
}

@Component({
  selector: 'app-formularios-page',
  standalone: true,
  imports: [DirectiveCardComponent, ReactiveFormsModule],
  templateUrl: './formularios-page.html',
})
export default class FormulariosPageComponent implements OnInit {
  private readonly titleService = inject(PageHeaderService);
  private readonly fb = inject(FormBuilder);

  // Signal para la lista de usuarios
  usuarios = signal<Usuario[]>([
    { id: 1, nombre: 'Ana García', email: 'ana@empresa.com', edad: 28, rol: 'admin' },
    { id: 2, nombre: 'Carlos López', email: 'carlos@empresa.com', edad: 34, rol: 'user' },
  ]);

  // Computed: estadísticas reactivas
  totalUsuarios = computed(() => this.usuarios().length);
  promedioEdad = computed(() => {
    const lista = this.usuarios();
    if (lista.length === 0) return 0;
    return Math.round(lista.reduce((sum, u) => sum + u.edad, 0) / lista.length);
  });

  // Signal para modo edición
  editandoId = signal<number | null>(null);

  // Formulario tipado con nonNullable
  userForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email, this.dominioValidator(['empresa.com', 'gmail.com'])]],
    edad: [18, [Validators.required, Validators.min(18), Validators.max(99)]],
    rol: ['user', Validators.required],
  });

  // Validador personalizado: dominio permitido
  dominioValidator(dominiosPermitidos: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (!email) return null;
      const dominio = email.split('@')[1];
      return dominiosPermitidos.includes(dominio) ? null : { dominioInvalido: { permitidos: dominiosPermitidos } };
    };
  }

  ngOnInit(): void {
    this.titleService.setPageInfo(
      'Formularios en Angular',
      'Explicación de cómo funciona la validación de formularios en Angular.'
    );
  }

  // Agregar o actualizar usuario
  guardarUsuario() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const datos = this.userForm.getRawValue();
    const idEditando = this.editandoId();

    if (idEditando !== null) {
      // Actualizar existente
      this.usuarios.update(lista =>
        lista.map(u => u.id === idEditando ? { ...u, ...datos } : u)
      );
      this.editandoId.set(null);
    } else {
      // Agregar nuevo
      const nuevoId = Math.max(0, ...this.usuarios().map(u => u.id)) + 1;
      this.usuarios.update(lista => [...lista, { id: nuevoId, ...datos }]);
    }

    this.userForm.reset({ nombre: '', email: '', edad: 18, rol: 'user' });
  }

  // Editar usuario
  editarUsuario(usuario: Usuario) {
    this.editandoId.set(usuario.id);
    this.userForm.patchValue({
      nombre: usuario.nombre,
      email: usuario.email,
      edad: usuario.edad,
      rol: usuario.rol,
    });
  }

  // Eliminar usuario
  eliminarUsuario(id: number) {
    this.usuarios.update(lista => lista.filter(u => u.id !== id));
    if (this.editandoId() === id) {
      this.cancelarEdicion();
    }
  }

  // Cancelar edición
  cancelarEdicion() {
    this.editandoId.set(null);
    this.userForm.reset({ nombre: '', email: '', edad: 18, rol: 'user' });
  }

  descriptionForms = `Angular 21 mantiene ambos enfoques: template-driven (<span class="text-sky-400 font-mono">FormsModule</span>) y reactivos/typed (<span class="text-sky-400 font-mono">ReactiveFormsModule</span>). Los forms tipados con <span class="text-sky-400 font-mono">FormBuilder.nonNullable</span> siguen siendo la opción recomendada: validadores síncronos (<span class="font-mono text-sky-400">Validators.required</span>, <span class="font-mono text-sky-400">Validators.email</span>, <span class="font-mono text-sky-400">Validators.min/max</span>), validadores personalizados, control de ciclo con <span class="font-mono text-sky-400">updateOn</span> y estados <span class="font-mono text-sky-400">invalid/touched/dirty</span> para UX.`;

  codeFormsExample = `// Formulario tipado con nonNullable (Angular 21)
import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({ selector: 'app-demo', standalone: true })
export class DemoComponent {
  private fb = inject(FormBuilder);
  usuarios = signal<Usuario[]>([]);
  totalUsuarios = computed(() => this.usuarios().length);

  // Formulario tipado con nonNullable
  userForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email, this.dominioValidator()]],
    edad: [18, [Validators.required, Validators.min(18), Validators.max(99)]],
    rol: ['user', Validators.required],
  });

  // Validador personalizado
  dominioValidator() {
    return (control: AbstractControl) => {
      const dominio = control.value?.split('@')[1];
      return ['empresa.com'].includes(dominio) ? null : { dominioInvalido: true };
    };
  }

  guardarUsuario() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const datos = this.userForm.getRawValue(); // tipado automático
    this.usuarios.update(lista => [...lista, { id: Date.now(), ...datos }]);
    this.userForm.reset();
  }
}

// HTML con control flow @if/@for
<form [formGroup]="userForm" (ngSubmit)="guardarUsuario()">
  <input formControlName="nombre" />
  @if (userForm.controls.nombre.errors?.['minlength']) {
    <small>Mínimo 3 caracteres</small>
  }
  <button [disabled]="userForm.invalid">Guardar</button>
</form>

@for (user of usuarios(); track user.id) {
  <tr><td>{{ user.nombre }}</td></tr>
}`;
}
