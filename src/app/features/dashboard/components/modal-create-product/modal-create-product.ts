import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-create-product',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
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
  `],}



)
export class ModalCreateProduct { 


   private fb = inject(FormBuilder);
  
  isOpen = signal(false);
  isSubmitting = signal(false);
  showSuccess = signal(false);

  productForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    categoria: ['Audio', Validators.required],
    precio: [null, [Validators.required, Validators.min(0.01)]],
    stock: [45], 
    valoracion: [4.9], 
    oferta: [false],
    imagen: ['', [Validators.required, Validators.pattern('https?://.+')]]
  });

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
  }
}
