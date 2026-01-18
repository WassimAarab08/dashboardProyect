import { Component, signal, inject, Output, EventEmitter, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
	selector: 'app-modal-create-product',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './modal-create-product.html',
})
export class ModalCreateProduct implements OnChanges {
	private fb = inject(FormBuilder);

	@Input() isOpen?: boolean;
	@Output() isOpenChange = new EventEmitter<boolean>();
	@Output() onRegister = new EventEmitter<any>();
	@Output() onClose = new EventEmitter<void>();

	isModalOpen = signal(false);
	isDragging = signal(false);
	imagePreview = signal<string | null>(null);

	categorias = ['Audio', 'Video', 'Accesorios', 'Computación', 'Gaming'];

	inventoryForm: FormGroup = this.fb.group({
		modelo: ['', [Validators.required, Validators.minLength(3)]],
		categoria: ['Audio', Validators.required],
		msrp: [null, [Validators.required, Validators.min(0)]],
		promocion: [false],
		imageUrl: ['']
	});

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['isOpen']) {
			this.isModalOpen.set(!!changes['isOpen'].currentValue);
		}
	}

	openModal() {
		this.isModalOpen.set(true);
		this.isOpenChange.emit(true);
	}

	closeModal() {
		this.isModalOpen.set(false);
		this.isOpenChange.emit(false);
		this.onClose.emit();
	}

	togglePromo() {
		const current = this.inventoryForm.get('promocion')?.value;
		this.inventoryForm.get('promocion')?.setValue(!current);
	}

	resetForm() {
		this.inventoryForm.reset({ categoria: 'Audio', promocion: false });
		this.imagePreview.set(null);
	}

	onSubmit() {
		if (this.inventoryForm.valid) {
			const result = {
				...this.inventoryForm.value,
				localImage: this.imagePreview(),
				timestamp: new Date().toISOString(),
				currency: 'EUR'
			};
			console.log('Registro completado (España):', result);
			this.onRegister.emit(result);
			this.closeModal();
			this.resetForm();
		}
	}

	onFileSelected(event: any) {
		const file = event.target.files?.[0];
		this.handleFile(file);
	}

	onDragOver(event: DragEvent) {
		event.preventDefault();
		this.isDragging.set(true);
	}

	onDragLeave(event: DragEvent) {
		event.preventDefault();
		this.isDragging.set(false);
	}

	onDrop(event: DragEvent) {
		event.preventDefault();
		this.isDragging.set(false);
		const file = event.dataTransfer?.files?.[0];
		this.handleFile(file);
	}

	private handleFile(file: File | undefined) {
		if (!file) return;

		const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
		if (!allowedTypes.includes(file.type)) return;

		const maxSize = 2 * 1024 * 1024;
		if (file.size > maxSize) return;

		const reader = new FileReader();
		reader.onload = () => this.imagePreview.set(reader.result as string);
		reader.readAsDataURL(file);
	}

	removeImage() {
		this.imagePreview.set(null);
	}
}

