import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
checkoutForm : FormGroup;

  constructor(private fb : FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFromValues();
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        zipcode: [null, Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required]
      }),
      paymentForm: this.fb.group({
        naeOnCard: [null, Validators.required]
      })
    })
  }

  getAddressFromValues() {
    this.accountService.getUserAddress().subscribe( address => {
      if(address) {
        this.checkoutForm.get('addressForm').patchValue(address);
        this.checkoutForm.get('addressForm.zipcode').patchValue(address.zipCode);

      }
    },error => {
      console.log(error);
    });
  }

}
