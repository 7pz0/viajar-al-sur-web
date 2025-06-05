// Email Configuration Tester for Viajar al Sur
// Use this in the browser console to test your email setup

class EmailTester {
    constructor() {
        this.results = [];
    }

    // Test 1: Check if EmailJS is loaded
    testEmailJSLibrary() {
        const test = {
            name: "EmailJS Library",
            status: typeof emailjs !== 'undefined' ? 'PASS' : 'FAIL',
            message: typeof emailjs !== 'undefined' ? 
                'EmailJS library is loaded correctly' : 
                'EmailJS library not found. Check if script is included in HTML.'
        };
        this.results.push(test);
        return test;
    }

    // Test 2: Check if EmailService is initialized
    testEmailService() {
        const test = {
            name: "EmailService Class",
            status: typeof EmailService !== 'undefined' ? 'PASS' : 'FAIL',
            message: typeof EmailService !== 'undefined' ? 
                'EmailService class is available' : 
                'EmailService class not found. Check if emailService.js is loaded.'
        };
        this.results.push(test);
        return test;
    }

    // Test 3: Check form integration
    testFormIntegration() {
        const form = document.querySelector('.contact__form');
        const test = {
            name: "Contact Form",
            status: form ? 'PASS' : 'FAIL',
            message: form ? 
                'Contact form found on page' : 
                'Contact form not found. Check if form exists.'
        };
        this.results.push(test);
        return test;
    }

    // Test 4: Check if form has EmailService instance
    testFormEmailService() {
        const hasEmailService = window.contactForm && window.contactForm.emailService;
        const test = {
            name: "Form EmailService Integration",
            status: hasEmailService ? 'PASS' : 'WARN',
            message: hasEmailService ? 
                'Form is connected to EmailService' : 
                'Form EmailService not initialized. May still work with fallback.'
        };
        this.results.push(test);
        return test;
    }

    // Test 5: Check EmailJS configuration
    testEmailJSConfig() {
        let status = 'FAIL';
        let message = 'Cannot check configuration - EmailService not available';
        
        if (typeof EmailService !== 'undefined') {
            try {
                const service = new EmailService();
                const hasValidConfig = service.serviceId !== 'service_viajaralsur' && 
                                     service.templateId !== 'template_contacto' && 
                                     service.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY';
                
                status = hasValidConfig ? 'PASS' : 'FAIL';
                message = hasValidConfig ? 
                    `Configuration appears valid:
                    - Service ID: ${service.serviceId}
                    - Template ID: ${service.templateId}
                    - Public Key: ${service.publicKey.substring(0, 8)}...` :
                    'Configuration uses default placeholder values. Update serviceId, templateId, and publicKey in emailService.js';
            } catch (error) {
                message = `Error checking configuration: ${error.message}`;
            }
        }

        const test = { name: "EmailJS Configuration", status, message };
        this.results.push(test);
        return test;
    }

    // Run all tests
    runAllTests() {
        console.log('🧪 Running Email Configuration Tests...\n');
        
        this.results = [];
        this.testEmailJSLibrary();
        this.testEmailService();
        this.testFormIntegration();
        this.testFormEmailService();
        this.testEmailJSConfig();

        this.displayResults();
        return this.results;
    }

    // Display results in console
    displayResults() {
        console.log('\n📊 Email Configuration Test Results:\n');
        console.log('='.repeat(50));
        
        this.results.forEach(test => {
            const icon = test.status === 'PASS' ? '✅' : test.status === 'WARN' ? '⚠️' : '❌';
            console.log(`${icon} ${test.name}: ${test.status}`);
            console.log(`   ${test.message}\n`);
        });

        const passCount = this.results.filter(t => t.status === 'PASS').length;
        const warnCount = this.results.filter(t => t.status === 'WARN').length;
        const failCount = this.results.filter(t => t.status === 'FAIL').length;

        console.log('='.repeat(50));
        console.log(`📈 Summary: ${passCount} passed, ${warnCount} warnings, ${failCount} failed`);
        
        if (failCount === 0 && warnCount === 0) {
            console.log('🎉 All tests passed! Your email setup looks good.');
        } else if (failCount === 0) {
            console.log('✨ Tests passed with minor warnings. Should work fine.');
        } else {
            console.log('🔧 Some tests failed. Check the issues above and fix them.');
        }

        console.log('\n💡 Next steps:');
        if (failCount > 0) {
            console.log('1. Fix the failed tests above');
            console.log('2. Reload the page and run tests again');
        } else {
            console.log('1. Test the contact form by filling it out');
            console.log('2. Check if emails arrive at your destination');
        }
        console.log('3. See EMAILJS-SETUP.md for configuration help');
    }

    // Test email sending (use carefully - this actually sends an email!)
    async testEmailSending() {
        console.log('📧 Testing actual email sending...');
        console.log('⚠️  WARNING: This will send a real test email!');
        
        if (!window.contactForm || !window.contactForm.emailService) {
            console.log('❌ Cannot test - EmailService not available');
            return false;
        }

        const testData = {
            name: 'Email Test System',
            email: 'test@viajaralsur.cl',
            message: 'This is a test message from the email configuration tester. If you receive this, your EmailJS setup is working correctly!'
        };

        try {
            const result = await window.contactForm.emailService.sendEmail(testData);
            console.log(result.success ? '✅ Test email sent successfully!' : '❌ Test email failed:', result.message);
            return result.success;
        } catch (error) {
            console.log('❌ Test email error:', error.message);
            return false;
        }
    }
}

// Create global instance
window.emailTester = new EmailTester();

// Auto-run tests when script loads
console.log('🔧 Email Tester loaded! Use these commands:');
console.log('📋 emailTester.runAllTests() - Run all configuration tests');
console.log('📧 emailTester.testEmailSending() - Send actual test email (careful!)');
console.log('\nRunning automatic tests now...\n');

// Run tests automatically
window.emailTester.runAllTests();
