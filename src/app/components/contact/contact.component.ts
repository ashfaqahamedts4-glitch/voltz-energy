import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  showPopup = false;

  popupMessage = '';

  popupType = '';

  sendEmail() {

    this.loading = true;

    // SEND MAIL TO COMPANY
    emailjs.send(
      'service_nd49ijj',
      'template_pxrsjh4',
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

      // AUTO REPLY TO CLIENT
      emailjs.send(
        'service_nd49ijj',
        'template_9i41xj5',
        {
          to_name: this.formData.name,
          to_email: this.formData.email
        },
        'VnAz-b6ekdP_w3J_5'
      );

      this.loading = false;

      this.popupType = 'success';

      this.popupMessage =
        'Message Sent Successfully!';

      this.showPopup = true;

      // RESET FORM
      this.formData = {
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      };

      // AUTO CLOSE POPUP
      setTimeout(() => {

        this.showPopup = false;

      }, 3000);

    })

    .catch((error) => {

      console.error('EMAIL ERROR:', error);

      this.loading = false;

      this.popupType = 'error';

      this.popupMessage =
        'Failed To Send Message!';

      this.showPopup = true;

      setTimeout(() => {

        this.showPopup = false;

      }, 3000);

    });

  }

}