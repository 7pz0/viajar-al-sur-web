// Form Component
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact__form');
        this.submitButton = null;
        this.originalButtonText = '';
        this.emailService = null;
        
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.submitButton = this.form.querySelector('button[type="submit"]');
        if (this.submitButton) {
            this.originalButtonText = this.submitButton.textContent;
        }
        
        // Initialize EmailJS service
        this.initializeEmailService();
        
        this.bindEvents();
        this.loadSavedData();
    }

    initializeEmailService() {
        // Wait for EmailService to be available
        if (typeof EmailService !== 'undefined') {
            this.emailService = new EmailService();
            this.showConfigurationStatus();
        } else {
            // Retry initialization after a short delay
            setTimeout(() => {
                this.initializeEmailService();
            }, 100);
        }
    }

    showConfigurationStatus() {
        // Show EmailJS configuration status to developers
        if (this.emailService && this.emailService.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
            console.warn('⚠️ EmailJS no está configurado. Ver EMAILJS-SETUP.md para instrucciones.');
            this.showEmailJSStatusIndicator(false);
        } else if (this.emailService) {
            console.log('✅ EmailJS configurado correctamente para Viajar al Sur');
            this.showEmailJSStatusIndicator(true);
        }
    }

    showEmailJSStatusIndicator(isConfigured) {
        // Only show in development (when not on production domain)
        if (window.location.hostname !== 'localhost' && !window.location.hostname.includes('vercel')) {
            return;
        }

        const indicator = document.createElement('div');
        indicator.className = `emailjs-status ${isConfigured ? 'configured' : 'not-configured'}`;
        indicator.textContent = isConfigured 
            ? '✅ EmailJS configurado' 
            : '⚠️ EmailJS no configurado';
        
        document.body.appendChild(indicator);
        
        // Show indicator for 3 seconds
        setTimeout(() => {
            indicator.classList.add('show');
        }, 500);
        
        setTimeout(() => {
            indicator.classList.remove('show');
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.remove();
                }
            }, 300);
        }, 4000);
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
                this.saveFormData();
            });
        });

        // Auto-save form data
        const saveData = utils.debounce(() => {
            this.saveFormData();
        }, 500);

        inputs.forEach(input => {
            input.addEventListener('input', saveData);
        });
    }    async handleSubmit() {
        if (!this.validateForm()) {
            return;
        }

        this.setLoadingState(true);

        try {
            const formData = this.getFormData();
            
            // Send email using EmailJS
            const result = await this.submitForm(formData);
            
            if (result.success) {
                this.showSuccessMessage(result.message);
                this.resetForm();
                this.clearSavedData();
            } else {
                this.showErrorMessage(result.message);
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos por WhatsApp.');
        } finally {
            this.setLoadingState(false);
        }
    }    async submitForm(data) {
        // Use EmailJS service if available
        if (this.emailService && typeof this.emailService.sendEmail === 'function') {
            try {
                return await this.emailService.sendEmail(data);
            } catch (error) {
                console.error('EmailJS submission error:', error);
                return {
                    success: false,
                    message: 'Error al enviar el email. Por favor, intenta nuevamente o contáctanos por WhatsApp.'
                };
            }
        }
        
        // Fallback: Log form data and show instruction message
        console.log('EmailJS not configured. Form data:', data);
        return {
            success: false,
            message: 'El servicio de email aún no está configurado. Por favor, contáctanos por WhatsApp mientras configuramos este servicio.'
        };
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'Este campo es obligatorio';
            isValid = false;
        }
        // Email validation
        else if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Por favor, introduce un email válido';
                isValid = false;
            }
        }
        // Name validation
        else if (fieldName === 'name' && value) {
            if (value.length < 2) {
                errorMessage = 'El nombre debe tener al menos 2 caracteres';
                isValid = false;
            }
        }
        // Message validation
        else if (fieldName === 'message' && value) {
            if (value.length < 10) {
                errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                isValid = false;
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        
        field.parentNode.appendChild(errorElement);

        // Add error styles to field
        field.style.borderColor = '#ef4444';
    }

    clearFieldError(field) {
        field.classList.remove('error');
        field.style.borderColor = '';
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }
        
        return data;
    }

    setLoadingState(isLoading) {
        if (!this.submitButton) return;

        if (isLoading) {
            this.submitButton.disabled = true;
            this.submitButton.innerHTML = `
                <span class="spinner" style="
                    display: inline-block;
                    width: 1rem;
                    height: 1rem;
                    border: 2px solid transparent;
                    border-top: 2px solid currentColor;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-right: 0.5rem;
                "></span>
                Enviando...
            `;
        } else {
            this.submitButton.disabled = false;
            this.submitButton.textContent = this.originalButtonText;
        }
    }    showSuccessMessage(message = '¡Mensaje enviado correctamente! Te responderemos pronto.') {
        this.showMessage(message, 'success');
    }

    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-weight: 500;
            ${type === 'success' 
                ? 'background-color: #dcfce7; color: #166534; border: 1px solid #bbf7d0;' 
                : 'background-color: #fef2f2; color: #dc2626; border: 1px solid #fecaca;'
            }
        `;

        this.form.insertBefore(messageElement, this.form.firstChild);

        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }

    resetForm() {
        this.form.reset();
        
        // Clear any remaining errors
        const errorMessages = this.form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.classList.remove('error');
            field.style.borderColor = '';
        });
    }

    saveFormData() {
        const data = this.getFormData();
        utils.storage.set('contactFormData', data);
    }

    loadSavedData() {
        const savedData = utils.storage.get('contactFormData');
        if (savedData) {
            Object.keys(savedData).forEach(key => {
                const field = this.form.querySelector(`[name="${key}"]`);
                if (field && savedData[key]) {
                    field.value = savedData[key];
                }
            });
        }
    }

    clearSavedData() {
        utils.storage.remove('contactFormData');
    }
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contactForm = new ContactForm();
});
