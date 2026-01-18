import { Component, signal, model, output, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Producto, { ProductoService } from '../../../../core/services/products.service';

export interface ProductRegistration {
	modelo: string;
	categoria: string;
	msrp: number | null;
	descuento: number;
	stock: number;
	imageUrl?: string;
	localImage?: string | null;
	timestamp: string;
	currency: string;
}

@Component({
	selector: 'app-modal-create-product',
	standalone: true,
	imports: [ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './modal-create-product.html',
})
export class ModalCreateProduct {
  readonly  productService = inject(ProductoService)

	// Properties
	readonly isOpen = model<boolean>(false);
	readonly onRegister = output<ProductRegistration>();
	readonly onClose = output<void>();

	readonly isDragging = signal(false);
	readonly imagePreview = signal<string | null>(null);
	readonly categorias = ['Audio', 'Video', 'Accesorios', 'Computación', 'Gaming'];

	readonly inventoryForm = new FormGroup({
		modelo: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
		categoria: new FormControl('Audio', { nonNullable: true, validators: [Validators.required] }),
		msrp: new FormControl<number >( 10,{nonNullable: true, validators: [Validators.required, Validators.min(10)] }),
		descuento: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(0), Validators.max(100)] }),
		stock: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
		imageUrl: new FormControl('', { nonNullable: true })
	});


	openModal(): void {
		this.isOpen.set(true);
	}

	closeModal(): void {
		this.isOpen.set(false);
		this.onClose.emit();
	}

	resetForm(): void {
		this.inventoryForm.reset({ categoria: 'Audio', descuento: 0, stock: 0 });
		this.imagePreview.set(null);
	}

	onSubmit(): void {
		if (this.inventoryForm.invalid) {
			this.inventoryForm.markAllAsTouched();
			return;
		}

		const formValue = this.inventoryForm.getRawValue();

		const result: Producto = {
			id: new Date().getTime().toString(), // More robust id
			nombre: formValue.modelo,
			categoria: formValue.categoria,
      precio: formValue.msrp ?? 0,
      oferta: formValue.descuento > 0,
      stock: formValue.stock,
      valoracion: 0,
  
      imagen_base64: this.imagePreview() ?? undefined,
		};

    console.log(result)
    console.log(this.imagePreview())
	  this.productService.createProduct(result);
		this.closeModal();
		this.resetForm();
	}

	async onFileSelected(event: Event): Promise<void> {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		await this.handleFile(file);
		target.value = ''; // Allow selecting the same file again
	}

	onDragOver(event: DragEvent): void {
		event.preventDefault();
		this.isDragging.set(true);
	}

	onDragLeave(event: DragEvent): void {
		event.preventDefault();
		this.isDragging.set(false);
	}

	async onDrop(event: DragEvent): Promise<void> {
		event.preventDefault();
		this.isDragging.set(false);
		const file = event.dataTransfer?.files?.[0];
		await this.handleFile(file);
	}

	removeImage(): void {
		this.imagePreview.set(null);
	}

	// Private Methods
	private async handleFile(file: File | undefined): Promise<void> {
		if (!file) return;

		const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
		if (!allowedTypes.includes(file.type)) {
			console.error('Error: Tipo de archivo no soportado.');
			return;
		}

		const maxSize = 2 * 1024 * 1024; // 2MB
		if (file.size > maxSize) {
			console.error('Error: El archivo supera el límite de 2MB.');
	
			return;
		}

		try {
			const dataUrl = await this.readFileAsDataUrl(file);
			this.imagePreview.set(dataUrl);
		} catch (error) {
			console.error('Error al leer el archivo:', error);
		}
	}

	private readFileAsDataUrl(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}
}

