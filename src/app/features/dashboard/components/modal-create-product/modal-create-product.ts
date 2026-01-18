import { ChangeDetectionStrategy, Component, inject, model, signal, effect, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-modal-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-create-product.html',
  styles: [`
    :host { display: block; }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    select { background-image: none !important; }

    @keyframes zoom-in-95 {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slide-in-from-bottom {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .animate-in { animation-fill-mode: forwards; }
  `]
})
export class ModalCreateProduct { 

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('modalOverlay') modalOverlay!: ElementRef<HTMLDivElement>;

  private fb = inject(FormBuilder);

  isOpen = model(false);
  isSubmitting = signal(false);
  showSuccess = signal(false);
  imagePreview = signal<string | null>(null);


  productForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    categoria: ['Audio', Validators.required],
    precio: [null, [Validators.required, Validators.min(0.01)]],
    stock: [45], 
    valoracion: [4.9], 
    oferta: [false],
    imagen: ['', Validators.required]
  });


  constructor() {
    effect(() => {
      const imageControl = this.productForm.get('imagen');
      if (this.imagePreview() !== null) {
        imageControl?.disable();
      } else {
        imageControl?.enable();
      }
    });
  }


  openModal() {
    this.isOpen.set(true);
  }


  closeModal() {
    if (this.isSubmitting()) return;
    this.isOpen.set(false);
    this.showSuccess.set(false);
  }


  resetForm() {
    this.productForm.reset({
      categoria: 'Audio',
      oferta: false,
      stock: 45,
      valoracion: 4.9
    });
    this.imagePreview.set(null);

    // Limpiar también el input file
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }

      // Validar tamaño (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen debe ser menor a 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        this.imagePreview.set(base64String);
        this.productForm.patchValue({ imagen: base64String });
      };
      reader.readAsDataURL(file);
    }
  }


  clearImage() {
    this.imagePreview.set(null);
    this.productForm.patchValue({ imagen: '' });

    // Limpiar el input file
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }


  toggleOferta() {
    const current = !!this.productForm.get('oferta')?.value;
    this.productForm.patchValue({ oferta: !current });
  }


  openFileDialog(event?: Event) {
    // Prevenir propagación del evento para que no cierre el modal
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Usar ViewChild para acceder al input file de forma segura
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    } else {
      console.error('fileInput ViewChild no está disponible');
    }
  }


  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar errores
      return;
    }


    this.isSubmitting.set(true);
    console.log('Formulario de producto enviado:', this.productForm.value);


    // Aquí iría la lógica para enviar los datos al backend (p.ej. a través de un servicio)
    // productsService.create(this.productForm.value).subscribe(...)


    // Simulación de llamada a API con un timeout
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.showSuccess.set(true);

      // Opcional: Resetear el formulario después de un éxito
      // this.resetForm(); 


      // Opcional: Cerrar el modal después de un tiempo
      setTimeout(() => this.closeModal(), 2000); 
    }, 1500);
  }


  testClickModal() {
    console.log('ModalCreateProduct test button clicked!');
  }
}