import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  formData = {
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  };

  loading = false;
  successMessage = '';

  sendEmail() {

    this.loading = true;

    // SEND MAIL TO YOUR COMPANY EMAIL
    emailjs.send(
      'service_nd49ijj',
      'template_company',
      {
        from_name: this.formData.name,
        from_email: this.formData.email,
        company: this.formData.company,
        phone: this.formData.phone,
        message: this.formData.message
      },
      'VnAz-b6ekdP_w3J_5'
    )

    .then(() => {

      // AUTO REPLY MAIL TO CLIENT
      emailjs.send(
        'service_nd49ijj',
        'template_autoreply',
        {
          to_name: this.formData.name,
          to_email: this.formData.email
        },
        'VnAz-b6ekdP_w3J_5'
      );

      this.loading = false;

      this.successMessage =
        'Thank you! Our team will contact you shortly.';

      // RESET FORM
      this.formData = {
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      };

    })

    .catch((error) => {

      this.loading = false;

      console.error('EMAIL ERROR:', error);

      alert('Something went wrong!');
    });
  }

}