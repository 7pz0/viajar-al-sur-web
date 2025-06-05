/**
 * EmailJS Service for Viajar al Sur
 * Handles email sending functionality through EmailJS
 */

class EmailService {
    constructor() {
        // EmailJS configuration
        this.serviceId = 'service_qofvbee';
        this.templateId = 'template_g33e509';
        this.publicKey = 'xKGDXjgj-othuhpVc'; // Replace with your actual public key
        
        // Initialize EmailJS
        this.init();
    }

    /**
     * Initialize EmailJS with public key
     */
    init() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(this.publicKey);
            console.log('EmailJS initialized for Viajar al Sur');
            
            // Test EmailJS availability
            this.testEmailJSConnection();
        } else {
            console.error('EmailJS library not loaded');
        }
    }

    /**
     * Test EmailJS connection and configuration
     */
    testEmailJSConnection() {
        if (this.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
            console.warn('EmailJS not configured. Please update the public key in emailService.js');
            return false;
        }
        
        // EmailJS is ready
        return true;
    }    /**
     * Send email using EmailJS
     * @param {Object} formData - Form data object
     * @param {string} formData.name - Sender name
     * @param {string} formData.email - Sender email
     * @param {string} formData.message - Message content
     * @returns {Promise} EmailJS send promise
     */
    async sendEmail(formData) {
        try {
            // Check if EmailJS is properly configured
            if (!this.testEmailJSConnection()) {
                throw new Error('EmailJS no está configurado correctamente');
            }

            // Validate form data
            if (!this.validateFormData(formData)) {
                throw new Error('Datos del formulario inválidos');
            }

            // Prepare template parameters
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: 'contacto@viajaralsur.cl',
                reply_to: formData.email,
                timestamp: new Date().toLocaleString('es-CL', {
                    timeZone: 'America/Santiago'
                })
            };

            // Send email
            console.log('Enviando email a través de EmailJS...');
            const response = await emailjs.send(
                this.serviceId,
                this.templateId,
                templateParams
            );

            console.log('Email sent successfully:', response);
            return {
                success: true,
                message: 'Mensaje enviado correctamente. Te responderemos pronto a tu email.',
                response: response
            };

        } catch (error) {
            console.error('Error sending email:', error);
            return {
                success: false,
                message: this.getErrorMessage(error),
                error: error
            };
        }
    }

    /**
     * Validate form data
     * @param {Object} formData - Form data to validate
     * @returns {boolean} Validation result
     */
    validateFormData(formData) {
        if (!formData) return false;
        
        const { name, email, message } = formData;
        
        // Check required fields
        if (!name || !email || !message) {
            return false;
        }

        // Validate name (at least 2 characters)
        if (name.trim().length < 2) {
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }

        // Validate message (at least 10 characters)
        if (message.trim().length < 10) {
            return false;
        }

        return true;
    }

    /**
     * Get user-friendly error message
     * @param {Error} error - Error object
     * @returns {string} User-friendly error message
     */
    getErrorMessage(error) {
        // EmailJS specific errors
        if (error.status) {
            switch (error.status) {
                case 400:
                    return 'Error en los datos del formulario. Por favor, revisa la información ingresada.';
                case 401:
                    return 'Error de autorización. Por favor, intenta nuevamente.';
                case 403:
                    return 'Acceso denegado. Contacta con el administrador.';
                case 404:
                    return 'Servicio no encontrado. Por favor, intenta más tarde.';
                case 429:
                    return 'Demasiadas solicitudes. Por favor, espera unos minutos antes de intentar nuevamente.';
                case 500:
                    return 'Error del servidor. Por favor, intenta más tarde.';
                default:
                    return 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.';
            }
        }

        // Network errors
        if (error.message && error.message.includes('network')) {
            return 'Error de conexión. Por favor, verifica tu conexión a internet.';
        }

        // Generic error
        return 'Ocurrió un error al enviar el mensaje. Por favor, intenta nuevamente o contactanos por WhatsApp.';
    }

    /**
     * Get configuration instructions for EmailJS setup
     * @returns {Object} Configuration instructions
     */
    getSetupInstructions() {
        return {
            steps: [
                '1. Crear cuenta en EmailJS (https://www.emailjs.com/)',
                '2. Crear un servicio de email (Gmail, Outlook, etc.)',
                '3. Crear un template de email',
                '4. Obtener Service ID, Template ID y Public Key',
                '5. Configurar las variables en este archivo'
            ],
            templateVariables: [
                '{{from_name}} - Nombre del remitente',
                '{{from_email}} - Email del remitente',
                '{{message}} - Mensaje del formulario',
                '{{to_email}} - Email de destino (contacto@viajaralsur.cl)',
                '{{reply_to}} - Email para responder',
                '{{timestamp}} - Fecha y hora del mensaje'
            ],
            serviceConfig: {
                serviceId: this.serviceId,
                templateId: this.templateId,
                publicKey: this.publicKey
            }
        };
    }
}

// Export for use in other modules
window.EmailService = EmailService;
